
import React from 'react';

interface HowItWorksViewProps {
  onBack: () => void;
  onGetStarted: () => void;
}

const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onBack, onGetStarted }) => {
  const steps = [
    {
      title: '1. Tell us what you need',
      description: 'Buying or selling? We guide you through your next steps.',
      icon: 'contact_support',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: '2. Get matched with verified professionals',
      description: 'Conveyancers, inspectors, stylists, trades & more.',
      icon: 'verified',
      color: 'bg-teal-100 text-teal-600'
    },
    {
      title: '3. Compare trusted providers — backed by real performance data',
      description: 'We don’t use subjective reviews. We measure results.',
      icon: 'insights',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      title: '4. Book with confidence',
      description: 'Clear pricing. Clear timelines. Trusted outcomes.',
      icon: 'event_available',
      color: 'bg-green-100 text-green-600'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-primary mb-8 hover:translate-x-[-4px] transition-transform"
      >
        <span className="material-icons text-sm">arrow_back</span>
        Back to home
      </button>

      <div className="text-center mb-12">
        <h2 className="text-4xl font-display font-extrabold text-text-main-light dark:text-text-main-dark mb-4">
          How It Works
        </h2>
        <p className="text-text-muted-light dark:text-text-muted-dark text-lg">
          Your property journey, simplified through data and expertise.
        </p>
      </div>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className="group bg-white dark:bg-surface-dark p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex gap-6 items-start hover:shadow-xl hover:border-primary/20 transition-all duration-300"
          >
            <div className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center ${step.color} group-hover:scale-110 transition-transform duration-300`}>
              <span className="material-icons text-2xl">{step.icon}</span>
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-text-main-light dark:text-text-main-dark mb-2">
                {step.title}
              </h3>
              <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button 
          onClick={onGetStarted}
          className="px-12 py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:scale-105 transition-all active:scale-95"
        >
          Ready to get started?
        </button>
      </div>
    </div>
  );
};

export default HowItWorksView;
