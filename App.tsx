
import React, { useState } from 'react';
import FengShuiForm from './components/FengShuiForm';
import FengShuiResultView from './components/FengShuiResultView';
import { FengShuiInput, FengShuiResult } from './types';
import { calculateFengShui } from './utils/fengShuiEngine';
import { getAIFengShuiSummary } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<'form' | 'loading' | 'result'>('form');
  const [inputData, setInputData] = useState<FengShuiInput | null>(null);
  const [result, setResult] = useState<FengShuiResult | null>(null);

  const handleFormSubmit = async (data: FengShuiInput) => {
    setInputData(data);
    setStep('loading');

    setTimeout(async () => {
      const basicResult = calculateFengShui(data);
      const aiAdvice = await getAIFengShuiSummary(data, basicResult);
      setResult({ ...basicResult, aiAdvice });
      setStep('result');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col selection:bg-orange-500/30">
      {/* Header */}
      <header className="bg-[#0a0a0a]/90 backdrop-blur-xl py-6 px-6 border-b border-orange-500/10 sticky top-0 z-50">
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
          <div className="flex flex-col items-center">
            <h1 className="font-black text-2xl tracking-tighter text-white uppercase leading-none whitespace-nowrap neon-text-white">
              Thái Vua Nội Thất
            </h1>
            <p className="text-[10px] uppercase tracking-[0.5em] text-orange-500 font-black mt-2 opacity-90 text-center w-full">
              App Phong Thủy
            </p>
          </div>
          
          <a 
            href="https://zalo.me/g/swovff602" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[11px] text-white font-black uppercase tracking-widest px-6 py-4 rounded-xl border border-orange-500/40 neon-border-orange bg-orange-600/10 transition-all duration-300 hover:bg-orange-600/30 hover:scale-105 active:scale-95 whitespace-nowrap group"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500 shadow-[0_0_8px_#f97316]"></span>
            </span>
            Nhóm tư vấn hỗ trợ miễn phí
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-xl mx-auto p-6 relative">
        {/* Glow Effects */}
        <div className="fixed top-1/4 -left-20 w-64 h-64 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="fixed bottom-1/4 -right-20 w-64 h-64 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        {step === 'form' && (
          <div className="space-y-8 relative z-10">
            <div className="space-y-3">
              <h2 className="text-4xl font-extrabold text-white leading-[1.1] tracking-tight">
                Kiến tạo không gian <br/>
                <span className="text-gradient">Sống hạnh phúc</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">Cùng "Thái Vua Nội Thất Phong Thủy" tìm lại sự cân bằng và năng lượng tích cực cho tổ ấm của bạn.</p>
            </div>
            <FengShuiForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {step === 'loading' && (
          <div className="h-full flex flex-col items-center justify-center py-24 animate-fadeIn">
            <div className="relative w-28 h-28 mb-10">
              <div className="absolute inset-0 border-4 border-white/5 rounded-full"></div>
              <div className="absolute inset-0 border-t-4 border-orange-500 rounded-full animate-spin glow-orange"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="fa-solid fa-compass text-4xl text-orange-500 animate-pulse"></i>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Đang phân tích bát trạch...</h3>
            <p className="text-slate-500 text-sm uppercase tracking-widest font-medium">Bát Trạch • Cung Phi • Thiên Can Địa Chi</p>
          </div>
        )}

        {step === 'result' && result && inputData && (
          <FengShuiResultView 
            result={result} 
            input={inputData} 
            onBack={() => setStep('form')} 
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-10 px-6 text-center border-t border-white/5 bg-[#0a0a0a]">
        <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-[0.2em] max-w-xs mx-auto font-bold">
          © {new Date().getFullYear()} Thái Vua Nội Thất Phong Thủy. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
