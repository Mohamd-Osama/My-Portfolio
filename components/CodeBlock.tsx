'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language: 'sql' | 'python';
  label?: string;
}

export default function CodeBlock({ code, language, label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{
        borderColor: 'rgba(0,212,255,0.2)',
        boxShadow: '0 0 30px rgba(0,0,0,0.3)',
        background: '#0d1117',
      }}
    >
      {/* IDE Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ background: '#161b22', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="font-mono text-xs ml-2" style={{ color: '#6e7681' }}>
            {label || `snippet.${language}`}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{
              background: language === 'sql' ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)',
              color: language === 'sql' ? '#10b981' : '#3b82f6',
              border: `1px solid ${language === 'sql' ? 'rgba(16,185,129,0.3)' : 'rgba(59,130,246,0.3)'}`,
            }}
          >
            {language.toUpperCase()}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-md transition-all"
            style={{
              color: copied ? '#10b981' : '#6e7681',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            aria-label="Copy code"
          >
            {copied ? <Check size={11} /> : <Copy size={11} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="overflow-auto max-h-[480px] text-[13px] leading-relaxed">
        <SyntaxHighlighter
          language={language === 'sql' ? 'sql' : 'python'}
          style={vscDarkPlus}
          showLineNumbers
          lineNumberStyle={{
            color: '#3d444d',
            minWidth: '3em',
            fontSize: '12px',
            paddingRight: '12px',
            userSelect: 'none',
          }}
          customStyle={{
            margin: 0,
            padding: '16px 20px',
            background: '#0d1117',
            fontSize: '13px',
            lineHeight: '1.65',
          }}
          wrapLongLines={false}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
