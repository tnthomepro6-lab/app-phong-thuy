
import React, { useState } from 'react';
import { FengShuiInput, Gender, HouseDirection, HouseType } from '../types';
import { DIRECTIONS, HOUSE_TYPES } from '../constants';

interface Props {
  onSubmit: (data: FengShuiInput) => void;
}

const FengShuiForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FengShuiInput>({
    dob: '1990-01-01',
    gender: 'male',
    houseDirection: 'N',
    houseType: 'Apartment'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      {/* Date of Birth */}
      <div className="glass-card p-6 rounded-3xl shadow-2xl transition-all hover:border-white/10">
        <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Ngày tháng năm sinh (Dương lịch)</label>
        <input
          type="date"
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          className="w-full p-5 bg-black/40 border border-white/10 rounded-2xl focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all text-xl font-bold text-white"
          required
        />
      </div>

      {/* Gender */}
      <div className="glass-card p-6 rounded-3xl shadow-2xl">
        <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Giới tính chủ nhà</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, gender: 'male' })}
            className={`flex items-center justify-center gap-3 p-5 rounded-2xl border transition-all ${
              formData.gender === 'male' ? 'bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/10'
            }`}
          >
            <i className="fa-solid fa-mars text-xl"></i>
            <span className="font-bold">Nam</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, gender: 'female' })}
            className={`flex items-center justify-center gap-3 p-5 rounded-2xl border transition-all ${
              formData.gender === 'female' ? 'bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-500/20' : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/10'
            }`}
          >
            <i className="fa-solid fa-venus text-xl"></i>
            <span className="font-bold">Nữ</span>
          </button>
        </div>
      </div>

      {/* House Direction */}
      <div className="glass-card p-6 rounded-3xl shadow-2xl">
        <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-4">Hướng nhà chính</label>
        <div className="grid grid-cols-4 gap-3">
          {DIRECTIONS.map((dir) => (
            <button
              key={dir.value}
              type="button"
              onClick={() => setFormData({ ...formData, houseDirection: dir.value })}
              className={`flex flex-col items-center gap-2 py-4 rounded-2xl border transition-all ${
                formData.houseDirection === dir.value ? 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-inner' : 'bg-white/5 border-white/5 text-slate-500 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <i className={`fa-solid ${dir.icon} text-lg`}></i>
              <span className="text-[10px] font-black uppercase tracking-tighter">{dir.label}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-6 rounded-full font-black text-lg shadow-2xl shadow-orange-600/40 hover:brightness-110 active:scale-[0.95] transition-all flex items-center justify-center gap-4 group animate-intense-pulse border-[3px] border-white/20 hover:border-white/50"
      >
        <span className="tracking-widest uppercase">XEM NGAY KẾT QUẢ TƯ VẤN</span>
        <i className="fa-solid fa-arrow-right-long group-hover:translate-x-2 transition-transform"></i>
      </button>
    </form>
  );
};

export default FengShuiForm;
