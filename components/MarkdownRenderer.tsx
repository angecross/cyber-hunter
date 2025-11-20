import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // This is a simplified renderer. For production, use 'react-markdown'.
  // We parse code blocks and headers manually for visual structure.

  const renderContent = () => {
    const lines = content.split('\n');
    let inCodeBlock = false;
    const elements: React.ReactNode[] = [];
    let codeBuffer: string[] = [];
    let language = '';

    lines.forEach((line, index) => {
      // Code Block Start/End
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // End of block
          elements.push(
            <div key={`code-${index}`} className="my-4 rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
              <div className="bg-slate-900 px-3 py-1 text-xs text-slate-400 flex justify-between items-center">
                <span>{language || 'TERMINAL'}</span>
                <div className="flex gap-1">
                   <div className="w-2 h-2 rounded-full bg-red-500"></div>
                   <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                   <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
              <pre className="p-4 overflow-x-auto text-sm font-mono text-green-400 leading-relaxed">
                {codeBuffer.join('\n')}
              </pre>
            </div>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          // Start of block
          inCodeBlock = true;
          language = line.replace('```', '').trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(<h3 key={index} className="text-xl font-bold text-blue-300 mt-6 mb-3">{line.replace('### ', '')}</h3>);
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-2xl font-bold text-blue-400 mt-8 mb-4 border-b border-slate-700 pb-2">{line.replace('## ', '')}</h2>);
      } else if (line.startsWith('# ')) {
        elements.push(<h1 key={index} className="text-3xl font-bold text-white mt-6 mb-6">{line.replace('# ', '')}</h1>);
      } 
      // Lists
      else if (line.trim().startsWith('- ')) {
         elements.push(<li key={index} className="ml-4 text-slate-300 list-disc mb-1">{line.replace('- ', '')}</li>);
      }
      else if (line.match(/^\d+\. /)) {
         elements.push(<li key={index} className="ml-4 text-slate-300 list-decimal mb-1">{line.replace(/^\d+\. /, '')}</li>);
      }
      // Empty lines
      else if (line.trim() === '') {
        elements.push(<div key={index} className="h-2"></div>);
      } 
      // Paragraphs
      else {
        // Simple bold parsing
        const parts = line.split(/(\*\*.*?\*\*)/g);
        const parsedLine = parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
        elements.push(<p key={index} className="text-slate-300 leading-7 mb-2">{parsedLine}</p>);
      }
    });

    return elements;
  };

  return <div className="space-y-1">{renderContent()}</div>;
};

export default MarkdownRenderer;