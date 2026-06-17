import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CaseStudyData } from '@/lib/content';
import { ArrowRight, Quote } from 'lucide-react';
import Link from 'next/link';

export function CaseStudyTemplate({ data }: { data: CaseStudyData }) {
  return (
    <div className="bg-[#0e0918] min-h-screen text-white pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="text-purple-400 font-bold tracking-widest uppercase mb-4 text-sm">
            Case Study {data.client && `• ${data.client}`}
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            {data.title}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            {data.description}
          </p>
        </div>

        {/* Metrics Highlight Bar */}
        {data.metrics && data.metrics.length > 0 && (
          <div className="max-w-5xl mx-auto mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.metrics.map((metric, i) => (
                <div key={i} className="bg-[#160f24] rounded-2xl p-6 border border-purple-900/30 text-center">
                  <div className="text-3xl font-black text-purple-400 mb-2">{metric.value}</div>
                  <div className="text-sm text-gray-400 font-bold uppercase tracking-wider">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenge & Solution */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {data.problem && (
            <div className="bg-[#160f24] rounded-3xl p-8 md:p-10 border border-purple-900/30">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">The Challenge</h3>
              <p className="text-gray-300 leading-relaxed">{data.problem}</p>
            </div>
          )}
          {data.solution && (
            <div className="bg-[#160f24] rounded-3xl p-8 md:p-10 border border-purple-900/30">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">Our Solution</h3>
              <p className="text-gray-300 leading-relaxed">{data.solution}</p>
            </div>
          )}
        </div>

        {/* Testimonial */}
        {data.testimonial && (
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-gradient-to-br from-purple-900/40 to-[#160f24] rounded-3xl p-10 md:p-14 border border-purple-500/30 text-center relative overflow-hidden">
              <Quote className="absolute top-4 left-4 w-24 h-24 text-purple-500/10" />
              <p className="text-2xl md:text-3xl font-medium italic mb-8 relative z-10 leading-relaxed text-gray-200">
                "{data.testimonial.quote}"
              </p>
              <div className="relative z-10">
                <div className="font-bold text-lg">{data.testimonial.author}</div>
                <div className="text-purple-400">{data.testimonial.role}</div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Content */}
        {data.content && (
          <div className="max-w-4xl mx-auto bg-[#160f24] rounded-3xl p-8 md:p-12 border border-purple-900/30 mb-20">
            <h3 className="text-2xl font-bold mb-8 text-purple-300">Technical Implementation</h3>
            <div className="prose prose-invert prose-purple max-w-none prose-headings:font-bold prose-a:text-purple-400">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {data.content}
              </ReactMarkdown>
            </div>
            
            {data.technologies && data.technologies.length > 0 && (
              <div className="mt-10 pt-10 border-t border-purple-900/30">
                <h4 className="font-bold mb-4 text-gray-400">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {data.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm border border-purple-800/50">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 transition-colors rounded-full font-bold text-lg"
          >
            Start Your Project <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
