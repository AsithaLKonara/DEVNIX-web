import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogData } from '@/lib/content';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function BlogTemplate({ data }: { data: BlogData }) {
  return (
    <div className="bg-[#0e0918] min-h-screen text-white pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        
        {/* Back Link */}
        <Link href="/resources" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-12 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Resources
        </Link>

        {/* Header */}
        <header className="mb-12 border-b border-purple-900/30 pb-12">
          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {data.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-xs font-bold uppercase tracking-wider border border-purple-800/50">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            {data.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-500" />
              <span>{data.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>{data.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-500" />
              <span>{data.readTime}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <article className="prose prose-invert prose-purple max-w-none prose-lg
          prose-headings:font-bold prose-headings:text-gray-100
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-purple-900/20
          prose-h3:text-2xl prose-h3:mt-8
          prose-p:text-gray-300 prose-p:leading-relaxed
          prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300 hover:prose-a:underline
          prose-code:text-purple-300 prose-code:bg-purple-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-[#160f24] prose-pre:border prose-pre:border-purple-900/30
          prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-900/10 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-gray-300
          prose-strong:text-white"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {data.content}
          </ReactMarkdown>
        </article>

        {/* Footer CTA */}
        <div className="mt-20 pt-12 border-t border-purple-900/30 text-center">
          <h3 className="text-2xl font-bold mb-4">Need help implementing this architecture?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Our engineering team specializes in building exactly what we write about. Let's discuss how we can accelerate your project.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 transition-colors rounded-full font-bold text-lg"
          >
            Speak with an Engineer
          </Link>
        </div>

      </div>
    </div>
  );
}
