import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ServiceData } from '@/lib/content';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export function ServicePageTemplate({ data }: { data: ServiceData }) {
  // Generate FAQ Schema
  const faqSchema = data.faqs && data.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="bg-[#0e0918] min-h-screen text-white pt-32 pb-24">
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      
      <div className="container mx-auto px-6 lg:px-12">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            {data.title}
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            {data.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              href="/contact"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 transition-colors rounded-full font-bold text-lg flex items-center gap-2"
            >
              Book a Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto bg-[#160f24] rounded-3xl p-8 md:p-12 border border-purple-900/30 mb-20">
          <div className="prose prose-invert prose-purple max-w-none prose-headings:font-bold prose-a:text-purple-400">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {data.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Process, Industries, Tech (if available) */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
          {data.process && data.process.length > 0 && (
            <div className="bg-[#160f24] rounded-3xl p-8 border border-purple-900/30">
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Our Process</h3>
              <ul className="space-y-4">
                {data.process.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 bg-purple-600/20 p-1 rounded text-purple-400 text-sm font-bold">0{i+1}</div>
                    <div>
                      <h4 className="font-bold">{p.step}</h4>
                      <p className="text-sm text-gray-400">{p.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.technologies && data.technologies.length > 0 && (
            <div className="bg-[#160f24] rounded-3xl p-8 border border-purple-900/30">
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {data.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm border border-purple-800/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.industries && data.industries.length > 0 && (
            <div className="bg-[#160f24] rounded-3xl p-8 border border-purple-900/30">
              <h3 className="text-2xl font-bold mb-6 text-purple-300">Industries We Serve</h3>
              <ul className="space-y-3 text-gray-300">
                {data.industries.map((industry, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-500" /> {industry}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* FAQs */}
        {data.faqs && data.faqs.length > 0 && (
          <div className="max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl font-black mb-10 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {data.faqs.map((faq, i) => (
                <div key={i} className="bg-[#160f24] rounded-2xl p-6 border border-purple-900/30">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
