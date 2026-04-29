"use client";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, Minus, Zap, Command, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getSystemContext } from "@/lib/chatbot/context";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { CSSProperties } from "react";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function ChatWidget({
    defaultOpen = false,
    primaryColor = "#7BA4D0" // Sapphire
}: {
    defaultOpen?: boolean,
    primaryColor?: string
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const widgetStyle: CSSProperties & { "--primary": string } = { "--primary": primaryColor };

    useEffect(() => {
        const key = "xonit_session_id";
        const existing = localStorage.getItem(key);
        if (existing) {
            setSessionId(existing);
            return;
        }

        const created = typeof crypto.randomUUID === "function" 
            ? crypto.randomUUID() 
            : Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem(key, created);
        setSessionId(created);
    }, []);

    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, loading]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;
        const userMsg = input.trim();
        const newMsgs = [...messages, { role: "user", content: userMsg }];
        setMessages(newMsgs); 
        setInput(""); 
        setLoading(true);
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    messages: newMsgs, 
                    context: getSystemContext(), 
                    session_id: sessionId || undefined,
                    userId: "guest" 
                }),
            });
            const returnedSessionId = res.headers.get("X-Session-Id");
            if (returnedSessionId && returnedSessionId !== sessionId) {
                localStorage.setItem("xonit_session_id", returnedSessionId);
                setSessionId(returnedSessionId);
            }

            if (!res.body) return;
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let assistantContent = "";
            setMessages([...newMsgs, { role: "assistant", content: "" }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                assistantContent += decoder.decode(value, { stream: true });
                setMessages((prev) => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    if (last?.role === "assistant") {
                        updated[updated.length - 1] = { ...last, content: assistantContent };
                    }
                    return updated;
                });
            }
        } catch (e) {
            console.error("Neural link error:", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] font-sans selection:bg-primary/20" style={widgetStyle}>
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 24, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.9, y: 24, filter: "blur(10px)" }}
                        className="chatbot-window w-[380px] md:w-[420px] h-[600px] flex flex-col overflow-hidden relative shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] border border-white/10"
                        style={{
                            background: "rgba(5, 5, 5, 0.8)",
                            backdropFilter: "blur(40px) saturate(180%)",
                            borderRadius: "32px",
                        }}
                    >
                        {/* Status bar */}
                        <div className="px-5 py-2 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse shadow-[0_0_8px_#00F2FF]" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Secure Neural Link Active</span>
                            </div>
                            <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest font-display">X-Neural v1.0</span>
                        </div>

                        {/* Header */}
                        <div className="p-6 flex justify-between items-center border-b border-white/5 bg-gradient-to-b from-primary/5 to-transparent">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group shadow-2xl">
                                    <Bot size={24} className="group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(123,164,208,0.5)]" />
                                </div>
                                <div>
                                    <h3 className="font-black text-white text-base leading-tight uppercase tracking-tighter font-display">Xonit AI Assistant</h3>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className="w-1 h-1 rounded-full bg-aqua" />
                                        <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Sapphire Cluster</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsOpen(false)} className="p-2.5 hover:bg-white/5 rounded-2xl transition-all text-white/40 hover:text-white">
                                    <Minus size={20} />
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-2.5 hover:bg-white/5 rounded-2xl transition-all text-white/40 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide scroll-smooth">
                            {messages.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center p-10 opacity-20 space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-2 animate-pulse">
                                        <Command size={32} className="text-primary" />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] leading-loose text-white">X-Neural Core Online.<br/>Awaiting Identity Handshake...</p>
                                </div>
                            )}
                            {messages.map((m, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    key={i}
                                    className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                                >
                                    <div
                                        className={cn(
                                            "max-w-[90%] px-5 py-4 text-sm leading-[1.6]",
                                            m.role === "user"
                                                ? "bg-primary text-deep font-bold rounded-[24px] rounded-tr-sm shadow-xl"
                                                : "bg-white/[0.03] border border-white/5 text-white/80 rounded-[24px] rounded-tl-sm backdrop-blur-sm prose-invert"
                                        )}
                                    >
                                        <ReactMarkdown 
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                p: (props) => <p className="mb-2 last:mb-0" {...props} />,
                                                ul: (props) => <ul className="list-disc ml-4 mb-2" {...props} />,
                                                ol: (props) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                                                li: (props) => <li className="mb-1" {...props} />,
                                                h1: (props) => <h1 className="text-lg font-black uppercase tracking-tight mb-2 font-display" {...props} />,
                                                h2: (props) => <h2 className="text-base font-black uppercase tracking-tight mb-2 font-display" {...props} />,
                                                code: (props) => <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono" {...props} />,
                                                pre: (props) => <pre className="bg-white/5 p-3 rounded-xl overflow-x-auto text-[13px] font-mono mb-2 border border-white/5" {...props} />,
                                            }}
                                        >
                                            {m.content}
                                        </ReactMarkdown>
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/[0.03] border border-white/5 px-5 py-3 rounded-2xl flex gap-1.5 items-center">
                                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-gradient-to-t from-primary/5 to-transparent border-t border-white/5">
                            <div className="relative flex items-center gap-3 bg-white/[0.02] border border-white/10 rounded-[28px] p-2 pr-2.5 shadow-2xl focus-within:border-primary/40 focus-within:bg-white/[0.05] transition-all group">
                                <input
                                    className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder-white/20 outline-none font-medium"
                                    placeholder="Type neural signal..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || loading}
                                    className="w-12 h-12 bg-primary text-deep rounded-[22px] hover:scale-105 active:scale-95 transition-all disabled:opacity-20 disabled:scale-100 flex items-center justify-center shadow-lg hover:shadow-[0_0_20px_rgba(123,164,208,0.4)]"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <div className="mt-4 flex justify-center items-center gap-2 opacity-10 cursor-default hover:opacity-20 transition-opacity">
                                <Zap size={8} className="fill-current text-aqua" />
                                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white">Neural Engine by Xonit</span>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(true)}
                        className="w-16 h-16 bg-primary text-deep rounded-[24px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] flex items-center justify-center group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                        <MessageCircle size={28} className="relative z-10" />
                        <div className="absolute top-3 right-3 w-3 h-3 bg-aqua border-2 border-deep rounded-full z-20 shadow-[0_0_8px_#00F2FF]" />
                    </motion.button>
                )}
            </AnimatePresence>
            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}
