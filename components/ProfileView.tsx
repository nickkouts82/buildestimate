
import React, { useState, useEffect } from 'react';
import { Professional } from '../types';
import { getProSummary } from '../services/geminiService';

interface ProfileViewProps {
  pro: Professional;
}

const ProfileView: React.FC<ProfileViewProps> = ({ pro }) => {
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  useEffect(() => {
    getProSummary(pro).then(summary => setAiSummary(summary));
  }, [pro]);

  return (
    <div className="w-full h-full flex flex-col bg-gray-50 dark:bg-black overflow-hidden">
      {/* Header Buttons */}
      <div className="absolute top-12 w-full h-14 z-20 flex justify-between items-center px-4">
        <button className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 text-text-main-light dark:text-text-main-dark backdrop-blur-sm">
          <span className="material-icons">arrow_back</span>
        </button>
        <div className="flex gap-2">
          <button className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 text-text-main-light dark:text-text-main-dark backdrop-blur-sm">
            <span className="material-icons">favorite_border</span>
          </button>
          <button className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 text-text-main-light dark:text-text-main-dark backdrop-blur-sm">
            <span className="material-icons">ios_share</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto hide-scrollbar pt-28 pb-32">
        <div className="px-5 flex flex-col items-center text-center">
          <div className="relative mb-4">
            <div className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-800 shadow-md overflow-hidden bg-gray-200">
              <img alt="Profile" className="w-full h-full object-cover" src={pro.avatar}/>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 py-1.5 px-3 rounded-full shadow-sm flex items-center gap-1 border border-gray-100 dark:border-gray-700">
              <span className="material-icons text-secondary text-sm">verified</span>
              <span className="text-xs font-bold text-text-main-light dark:text-text-main-dark">{pro.score}</span>
            </div>
          </div>
          
          <h2 className="text-xl font-display font-bold text-text-main-light dark:text-text-main-dark flex items-center justify-center gap-1.5">
            {pro.name}
            <span className="material-icons text-yellow-500 text-base">verified</span>
          </h2>
          <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">{pro.title} • {pro.location}</p>

          <div className="flex justify-between w-full mt-6 gap-3">
            {pro.metrics.map((m, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 p-3 rounded-2xl flex-1 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1">
                  <span className="material-icons text-secondary text-xs">{m.icon}</span>
                  <span className="text-[10px] uppercase font-semibold text-gray-400">{m.label}</span>
                </div>
                <span className="font-bold text-text-main-light dark:text-text-main-dark">{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight Section */}
        <div className="px-5 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 p-4 rounded-2xl border border-blue-100 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-icons text-primary text-sm">auto_awesome</span>
              <span className="text-xs font-bold text-primary uppercase">AI Insight</span>
            </div>
            <p className="text-xs italic text-text-muted-light dark:text-text-muted-dark">
              {aiSummary || "Generating helpful summary..."}
            </p>
          </div>
        </div>

        <div className="px-5 mt-8">
          <h3 className="text-lg font-bold font-display text-text-main-light dark:text-text-main-dark mb-3">About</h3>
          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-relaxed">
              {pro.about}
            </p>
            <button className="text-primary text-sm font-semibold mt-2">Read more</button>
          </div>
        </div>

        <div className="px-5 mt-8">
          <h3 className="text-lg font-bold font-display text-text-main-light dark:text-text-main-dark mb-3">Performance</h3>
          <div className="grid grid-cols-2 gap-3">
            {pro.performance.map((p, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${p.colorClass.split(' ')[0]}`}>
                  <span className={`material-symbols-rounded ${p.colorClass.split(' ')[1]}`}>{p.icon}</span>
                </div>
                <span className="text-xl font-bold text-text-main-light dark:text-text-main-dark">{p.value}</span>
                <span className="text-xs text-text-muted-light dark:text-text-muted-dark">{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 mt-8">
          <h3 className="text-lg font-bold font-display text-text-main-light dark:text-text-main-dark mb-3">Services</h3>
          {pro.services.map((s, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-3 relative">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-text-main-light dark:text-text-main-dark">{s.name}</h4>
                <span className="font-bold text-lg text-text-main-light dark:text-text-main-dark">${s.price}</span>
              </div>
              <p className="text-xs text-text-muted-light dark:text-text-muted-dark leading-relaxed pr-8 mb-3">{s.description}</p>
              <div className="flex items-center justify-between">
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold ${idx === 0 ? 'bg-teal-50 text-teal-600' : 'bg-gray-100 text-gray-500'}`}>
                  <span className="material-icons text-[12px]">{idx === 0 ? 'bolt' : 'schedule'}</span> {s.tag}
                </div>
                <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-text-main-light dark:text-text-main-dark hover:bg-gray-200 dark:hover:bg-gray-700">
                  <span className="material-icons text-sm">add</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 mt-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold font-display text-text-main-light dark:text-text-main-dark">Availability</h3>
            <div className="flex items-center gap-1 text-[10px] font-medium text-secondary">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              Available Now
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <p className="text-xs text-text-muted-light dark:text-text-muted-dark mb-4">Select a preferred consultation time</p>
            <div className="flex justify-between gap-2 mb-4 overflow-x-auto hide-scrollbar">
              {pro.availability.map((a, idx) => (
                <div key={idx} className={`min-w-[56px] h-16 rounded-xl flex flex-col items-center justify-center transition-colors ${idx === 0 ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-400'}`}>
                  <span className="text-[10px] font-medium opacity-80">{a.day}</span>
                  <span className="text-xl font-bold">{a.date}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex-1 py-2.5 rounded-lg border border-gray-100 dark:border-gray-700 text-center text-xs font-semibold text-text-main-light dark:text-text-main-dark">09:00 AM</div>
              <div className="flex-1 py-2.5 rounded-lg bg-secondary text-white text-center text-xs font-semibold shadow-sm">10:30 AM</div>
              <div className="flex-1 py-2.5 rounded-lg border border-gray-100 dark:border-gray-700 text-center text-xs font-semibold text-text-main-light dark:text-text-main-dark">02:00 PM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="absolute bottom-0 w-full px-5 py-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-30 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">Starting from</p>
          <p className="text-xl font-bold text-text-main-light dark:text-text-main-dark">${pro.services[0].price}</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-transform active:scale-95">
          Book Consultation <span className="material-icons text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
