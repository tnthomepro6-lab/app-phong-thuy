
import React, { useState } from 'react';
import { FengShuiResult, FengShuiInput } from '../types';
import { ELEMENT_COLORS, DIRECTIONS } from '../constants';

interface Props {
  result: FengShuiResult;
  input: FengShuiInput;
  onBack: () => void;
}

const FengShuiResultView: React.FC<Props> = ({ result, input, onBack }) => {
  const [activeTab, setActiveTab] = useState<'kitchen' | 'altar' | 'bedroom' | 'toilet' | 'colors'>('kitchen');

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const tabContent = {
    kitchen: (
      <div className="space-y-5 animate-fadeIn">
        <div className="bg-orange-500/5 p-5 rounded-2xl border border-orange-500/20">
          <h4 className="font-bold text-orange-400 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
            <i className="fa-solid fa-compass"></i> Hướng tốt đặt bếp
          </h4>
          <div className="flex flex-wrap gap-2">
            {result.kitchen.bestDirections.map(d => (
              <span key={d} className="bg-orange-500/10 px-4 py-2 rounded-xl text-sm border border-orange-500/30 text-orange-200 font-bold">Hướng {d}</span>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {result.kitchen.notes.map((note, i) => (
            <div key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
              <i className="fa-solid fa-circle-check text-orange-500 mt-1"></i>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    altar: (
      <div className="space-y-5 animate-fadeIn">
        <div className="bg-amber-500/5 p-5 rounded-2xl border border-amber-500/20">
          <h4 className="font-bold text-amber-400 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
            <i className="fa-solid fa-hands-praying"></i> Hướng đặt Ban thờ
          </h4>
          <p className="text-white font-bold text-lg">Nên quay về: {result.altar.bestDirections.join(", ")}</p>
        </div>
        <div className="space-y-3">
          {result.altar.notes.map((note, i) => (
            <div key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
              <i className="fa-solid fa-circle-check text-amber-500 mt-1"></i>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    bedroom: (
      <div className="space-y-5 animate-fadeIn">
        <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
          <h4 className="font-bold text-white mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
            <i className="fa-solid fa-bed"></i> Hướng đầu giường
          </h4>
          <p className="text-orange-400 font-bold">Hướng tốt: {result.bedroom.bedHeadDirections.join(", ")}</p>
        </div>
        <div className="space-y-3">
          {result.bedroom.notes.map((note, i) => (
            <div key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
              <i className="fa-solid fa-circle-check text-orange-500 mt-1"></i>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    toilet: (
      <div className="space-y-5 animate-fadeIn">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <h4 className="font-black text-slate-500 text-[10px] mb-3 uppercase tracking-widest">Nên đặt</h4>
            <div className="flex flex-wrap gap-2">
              {result.toilet.recommendedZones.slice(0, 3).map(d => <span key={d} className="text-[10px] bg-white/10 px-2 py-1 rounded-lg border border-white/10 font-bold text-white">{d}</span>)}
            </div>
          </div>
          <div className="bg-red-500/5 p-4 rounded-2xl border border-red-500/20">
            <h4 className="font-black text-red-500 text-[10px] mb-3 uppercase tracking-widest">Tránh đặt</h4>
            <div className="flex flex-wrap gap-2">
              {result.toilet.avoidZones.slice(0, 3).map(d => <span key={d} className="text-[10px] bg-red-500/10 px-2 py-1 rounded-lg border border-red-500/20 font-bold text-red-200">{d}</span>)}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {result.toilet.notes.map((note, i) => (
            <div key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
              <i className="fa-solid fa-triangle-exclamation text-slate-600 mt-1"></i>
              <p>{note}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    colors: (
      <div className="space-y-6 animate-fadeIn">
        <h4 className="font-black text-white text-sm uppercase tracking-widest">Bảng màu hợp mệnh {result.summary.fateElement}</h4>
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-3">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Chủ đạo</p>
            <div className="flex gap-3">
              {result.colors.primary.map(c => (
                <div key={c} className="flex-1 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-xs font-black bg-white/5 shadow-inner text-white uppercase tracking-tighter">{c}</div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Tương sinh</p>
            <div className="flex gap-3">
              {result.colors.secondary.map(c => (
                <div key={c} className="flex-1 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-xs font-black bg-white/5 shadow-inner text-white/60 uppercase tracking-tighter">{c}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-orange-500/10 p-5 rounded-2xl border border-orange-500/20">
          <p className="text-sm italic text-orange-200 leading-relaxed">"{result.colors.notes[0]}"</p>
        </div>
      </div>
    )
  };

  return (
    <div className="animate-slideUp pb-20 relative z-10">
      <button onClick={onBack} className="mb-8 flex items-center gap-3 text-slate-500 hover:text-orange-500 font-black uppercase text-[10px] tracking-[0.2em] transition-all group">
        <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> Quay lại nhập liệu
      </button>

      {/* Summary Banner */}
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-[2rem] p-8 mb-10 shadow-3xl border border-white/5 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white mb-1">Gia chủ {formatDate(input.dob)}</h2>
              <p className="text-orange-500 text-xs font-black uppercase tracking-[0.1em]">{input.gender === 'male' ? 'Nam' : 'Nữ'} • Hướng {DIRECTIONS.find(d => d.value === input.houseDirection)?.label}</p>
            </div>
            <div className={`px-5 py-2.5 rounded-2xl text-[10px] font-black border uppercase tracking-[0.2em] shadow-lg ${ELEMENT_COLORS[result.summary.fateElement]}`}>
              Mệnh {result.summary.fateElement}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-5 rounded-3xl border border-white/5 shadow-inner">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Cung Phi</p>
              <p className="font-black text-2xl text-white tracking-tighter">{result.summary.cungPhi}</p>
            </div>
            <div className="bg-white/5 p-5 rounded-3xl border border-white/5 shadow-inner">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Nhóm mệnh</p>
              <p className="font-black text-sm text-white leading-tight mt-1">{result.summary.group}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
      </div>

      {/* AI Advice */}
      {result.aiAdvice && (
        <div className="bg-black/40 p-8 rounded-[2rem] shadow-2xl border border-white/10 mb-10 relative group overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-amber-600"></div>
           <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-500 shadow-lg shadow-orange-500/10">
              <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
            </div>
            <div>
               <h3 className="font-black text-white text-sm uppercase tracking-widest">Phân tích chuyên sâu</h3>
               <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest">BỞI THÁI VUA NỘI THẤT</p>
            </div>
          </div>
          <p className="text-slate-300 text-base leading-[1.8] font-normal text-justify indent-8 tracking-tight">
            {result.aiAdvice}
          </p>
        </div>
      )}

      {/* Tabs with Neon Effect */}
      <div className="bg-[#0a0a0a] rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden">
        <div className="flex border-b border-white/5 p-2.5 gap-2 overflow-x-auto scrollbar-hide bg-black/40 flex-nowrap">
          {['kitchen', 'altar', 'bedroom', 'toilet', 'colors'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)} 
              className={`flex-1 min-w-max px-5 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${
                activeTab === tab 
                ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.6)] border border-orange-400/50 scale-[1.02]' 
                : 'text-slate-500 hover:text-orange-400 hover:bg-orange-500/5'
              }`}
            >
              {tab === 'kitchen' && 'Bếp'}
              {tab === 'altar' && 'Ban thờ'}
              {tab === 'bedroom' && 'Phòng ngủ'}
              {tab === 'toilet' && 'Vệ sinh'}
              {tab === 'colors' && 'Màu sắc'}
            </button>
          ))}
        </div>
        <div className="p-8">
          {tabContent[activeTab]}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center bg-gradient-to-br from-orange-600 to-amber-700 text-white p-10 rounded-[3rem] shadow-3xl shadow-orange-900/40 relative overflow-hidden group">
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-3 tracking-tight">Kích hoạt vượng khí cho tổ ấm?</h3>
          <p className="text-orange-100 text-sm mb-10 font-medium leading-relaxed opacity-90">Đặt lịch hẹn cùng chuyên gia Thái Vua Nội Thất để hiện thực hóa bản vẽ phong thủy tối ưu nhất.</p>
          <a 
            href="https://zalo.me/g/swovff602" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-white text-orange-700 px-12 py-6 rounded-full font-black shadow-2xl hover:scale-110 active:scale-90 transition-all text-sm uppercase tracking-[0.2em] animate-intense-pulse border-[3px] border-white"
          >
            Đăng ký tư vấn miễn phí
          </a>
        </div>
        <i className="fa-solid fa-kaaba absolute top-0 left-0 text-[12rem] text-white/10 -ml-16 -mt-16 rotate-12 group-hover:rotate-45 transition-transform duration-1000"></i>
      </div>
    </div>
  );
};

export default FengShuiResultView;
