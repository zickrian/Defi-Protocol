"use client";

import { Copy, Terminal } from "lucide-react";

const codeSnippet = `import { AunoSDK } from '@auno/sdk';

// Initialize SDK
const auno = new AunoSDK({
  network: 'arbitrum',
  apiKey: process.env.AUNO_KEY
});

// Create Position
const tx = await auno.vault.create({
  asset: 'TSLA',
  amount: '10.0',
  borrow: 'USDC'
});

console.log(\`Vault created: \${tx.hash}\`);`;

export function CodeWindow() {
    return (
        <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-[#0d1117] border border-zinc-800 font-mono text-sm relative group">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-zinc-500 text-xs flex items-center gap-2">
                    <Terminal size={12} />
                    idx.ts
                </div>
            </div>

            {/* Code Body */}
            <div className="p-6 overflow-x-auto">
                <pre className="text-zinc-300 leading-relaxed">
                    <code dangerouslySetInnerHTML={{
                        __html: codeSnippet
                            .replace(/import|const|await|new|from/g, '<span class="text-purple-400">$2</span>')
                            .replace(/'[^']*'/g, '<span class="text-green-400">$&</span>')
                            .replace(/\/\/.*/g, '<span class="text-zinc-500">$&</span>')
                            .replace(/AunoSDK/g, '<span class="text-yellow-400">AunoSDK</span>')
                            .replace(/console.log/g, '<span class="text-blue-400">console.log</span>')
                    }} />
                </pre>
            </div>

            {/* Copy Button */}
            <button
                className="absolute top-14 right-4 p-2 bg-zinc-800 rounded-md text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white hover:bg-zinc-700"
            >
                <Copy size={14} />
            </button>
        </div>
    );
}
