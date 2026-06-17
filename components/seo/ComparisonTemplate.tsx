import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CompareData } from '@/lib/content';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export function ComparisonTemplate({ data }: { data: CompareData }) {
  return (
    <div className="bg-[#0e0918] min-h-screen text-white pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Executive Summary */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            {data.title}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            {data.description}
          </p>
        </div>

        {/* TL;DR Winner */}
        {data.winner && (
          <div className="max-w-4xl mx-auto mb-16 bg-purple-900/20 border border-purple-500/50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-purple-300 mb-2">The Verdict</h2>
            <p className="text-xl">{data.winner}</p>
          </div>
        )}

        {/* Feature Comparison Table */}
        {data.features && data.features.length > 0 && (
          <div className="max-w-5xl mx-auto mb-20 overflow-x-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Feature Comparison</h3>
            <table className="w-full text-left border-collapse border border-purple-900/30">
              <thead>
                <tr className="bg-[#160f24]">
                  <th className="p-4 border border-purple-900/30 text-purple-300 font-bold">Feature</th>
                  <th className="p-4 border border-purple-900/30 font-bold">Option A</th>
                  <th className="p-4 border border-purple-900/30 font-bold">Option B</th>
                </tr>
              </thead>
              <tbody>
                {data.features.map((f, i) => (
                  <tr key={i} className="hover:bg-purple-900/10 transition-colors">
                    <td className="p-4 border border-purple-900/30 font-semibold">{f.feature}</td>
                    <td className="p-4 border border-purple-900/30 text-gray-300">{f.optionA}</td>
                    <td className="p-4 border border-purple-900/30 text-gray-300">{f.optionB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pros and Cons */}
        {(data.pros?.length || data.cons?.length) ? (
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {data.pros && data.pros.length > 0 && (
              <div className="bg-[#160f24] p-8 rounded-3xl border border-green-900/30">
                <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
                  <CheckCircle /> Advantages
                </h3>
                <ul className="space-y-4 text-gray-300">
                  {data.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">•</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {data.cons && data.cons.length > 0 && (
              <div className="bg-[#160f24] p-8 rounded-3xl border border-red-900/30">
                <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
                  <XCircle /> Disadvantages
                </h3>
                <ul className="space-y-4 text-gray-300">
                  {data.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto bg-[#160f24] rounded-3xl p-8 md:p-12 border border-purple-900/30 mb-20">
          <div className="prose prose-invert prose-purple max-w-none prose-headings:font-bold prose-a:text-purple-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data.content}
            </ReactMarkdown>
          </div>
        </div>

        <div className="text-center">
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 transition-colors rounded-full font-bold text-lg"
          >
            Need help choosing? Talk to an expert <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
