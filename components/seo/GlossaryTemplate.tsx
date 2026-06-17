import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { GlossaryData } from '@/lib/content';
import { BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function GlossaryTemplate({ data }: { data: GlossaryData }) {
  return (
    <div className="bg-[#0e0918] min-h-screen text-white pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        
        {/* Breadcrumb / Back */}
        <div className="mb-12">
          <Link href="/services/ai-development" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Tech Glossary
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-purple-500" />
            <span className="text-purple-400 font-bold uppercase tracking-wider text-sm">Definition</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            {data.title}
          </h1>
        </header>

        {/* TL;DR Box (Optimized for Featured Snippet) */}
        <div className="bg-gradient-to-br from-[#160f24] to-purple-900/20 rounded-2xl p-8 border-l-4 border-l-purple-500 border-y border-r border-y-purple-900/30 border-r-purple-900/30 mb-16 shadow-lg shadow-purple-900/10">
          <h2 className="text-xl font-bold mb-4 text-purple-300">The Short Answer</h2>
          <p className="text-xl text-gray-200 leading-relaxed font-medium">
            {data.tldr}
          </p>
        </div>

        {/* Detailed Content */}
        <article className="prose prose-invert prose-purple max-w-none prose-lg
          prose-headings:font-bold prose-headings:text-gray-100
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:mt-8
          prose-p:text-gray-300 prose-p:leading-relaxed
          prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300 hover:prose-a:underline
          prose-ul:text-gray-300 prose-li:marker:text-purple-500"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {data.content}
          </ReactMarkdown>
        </article>

        {/* CTA to Related Service */}
        {data.relatedServiceUrl && data.relatedServiceLabel && (
          <div className="mt-20 pt-12 border-t border-purple-900/30">
            <div className="bg-[#160f24] rounded-3xl p-8 md:p-12 border border-purple-500/30 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">Looking to implement {data.title.replace('What is ', '').replace('?', '')}?</h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto relative z-10">
                Xonit Space engineers specialize in building production-grade infrastructure using this technology.
              </p>
              <Link 
                href={data.relatedServiceUrl}
                className="inline-flex relative z-10 items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 transition-colors rounded-full font-bold text-lg"
              >
                {data.relatedServiceLabel} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
