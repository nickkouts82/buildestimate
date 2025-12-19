
import React, { useState } from 'react';
import { MOCK_PROS } from './data';
import PhoneFrame from './components/PhoneFrame';
import ProfileView from './components/ProfileView';
import AIChat from './components/AIChat';
import LeadFormView from './components/LeadFormView';
import ProSignupView from './components/ProSignupView';
import HowItWorksView from './components/HowItWorksView';
import { View } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<View>('LANDING');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark transition-colors duration-300">
      {/* Navigation */}
      <nav className="w-full py-6 px-6 lg:px-12 flex justify-between items-center z-20 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('LANDING')}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg">H</div>
          <span className="text-xl font-display font-bold">Home Pathway</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted-light dark:text-text-muted-dark">
          <button onClick={() => setView('LEAD_FORM')} className="hover:text-primary transition-colors">Find Pros</button>
          <button onClick={() => setView('HOW_IT_WORKS')} className="hover:text-primary transition-colors">How it Works</button>
          <button onClick={() => setView('PRO_SIGNUP')} className="hover:text-primary transition-colors">For Professionals</button>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:block px-5 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Log in</button>
          <button 
            onClick={() => setView('LEAD_FORM')}
            className="px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow relative overflow-hidden">
        {/* Background Blobs (Global) */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-100/40 dark:bg-teal-900/20 rounded-full blur-3xl -z-10"></div>

        {view === 'LANDING' && (
          <div className="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-12 py-12 lg:py-8 h-full">
            {/* Left Side: Copy */}
            <div className="w-full lg:w-1/2 max-w-2xl lg:pr-16 z-10 mb-12 lg:mb-0 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 w-fit mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">Premium Marketplace</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-display font-bold leading-[1.15] mb-6">
                Find trusted <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-400">property professionals</span> <br/>
                for your next move.
              </h1>
              
              <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-10 leading-relaxed max-w-lg">
                Connect with verified conveyancers, brokers, and agents. We curate the best local experts to ensure your property journey is seamless and stress-free.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow max-w-md">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 material-icons">search</span>
                  <input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && setView('LEAD_FORM')}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark text-text-main-light dark:text-text-main-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-soft transition-all" 
                    placeholder="Try 'Conveyancer in Melbourne'..." 
                    type="text"
                  />
                </div>
                <button 
                  onClick={() => setView('LEAD_FORM')}
                  className="px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 whitespace-nowrap"
                >
                  Search Now
                </button>
              </div>

              <div className="mt-12 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <img key={i} alt={`User ${i}`} className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark shadow-sm" src={`https://picsum.photos/seed/user${i}/100/100`}/>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-background-dark bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">+2k</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-secondary mb-0.5">
                    <span className="material-icons text-base">verified</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">Verified Network</span>
                  </div>
                  <p className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">
                    Trusted panel from across Australia
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Device Interaction */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center relative z-10 h-[650px] sm:h-[750px] lg:h-auto overflow-visible cursor-pointer" onClick={() => setView('PROFILE')}>
              <PhoneFrame>
                <ProfileView pro={MOCK_PROS[0]} />
              </PhoneFrame>

              {/* Floating Info Cards */}
              <div className="absolute -right-8 top-1/4 hidden xl:block animate-float">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3 w-52">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <span className="material-icons text-green-600 dark:text-green-400">check_circle</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Status</p>
                    <p className="font-bold text-sm">Verified Pro</p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-12 bottom-1/4 hidden xl:block animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex items-center gap-3 w-48">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                    <span className="material-icons text-blue-600 dark:text-blue-400">trending_up</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Accuracy</p>
                    <p className="font-bold text-sm">98% Success</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'LEAD_FORM' && (
          <LeadFormView onBack={() => setView('LANDING')} />
        )}

        {view === 'PRO_SIGNUP' && (
          <ProSignupView onBack={() => setView('LANDING')} />
        )}

        {view === 'HOW_IT_WORKS' && (
          <HowItWorksView onBack={() => setView('LANDING')} onGetStarted={() => setView('LEAD_FORM')} />
        )}

        {view === 'PROFILE' && (
          <div className="flex justify-center py-10">
            <PhoneFrame>
              <ProfileView pro={MOCK_PROS[0]} />
            </PhoneFrame>
            <button 
              onClick={() => setView('LANDING')}
              className="fixed top-24 left-10 p-3 bg-white dark:bg-surface-dark rounded-full shadow-lg border border-gray-100 dark:border-gray-800 flex items-center justify-center material-icons z-50 hover:scale-110 transition-transform"
            >
              close
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-text-muted-light dark:text-text-muted-dark border-t border-gray-100 dark:border-gray-800 mt-auto">
        <p>© 2024 Home Pathway. All rights reserved.</p>
      </footer>

      {/* AI Assistant */}
      <AIChat />
    </div>
  );
};

export default App;
