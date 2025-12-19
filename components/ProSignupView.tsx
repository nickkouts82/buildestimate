
import React, { useState } from 'react';

interface ProSignupViewProps {
  onBack: () => void;
}

const ProSignupView: React.FC<ProSignupViewProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    proType: 'Conveyancer',
    postcode: '',
    name: '',
    company: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/bcartysalmon@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: "New Professional Application - Home Pathway",
          _template: "table"
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error sending your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-20 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-icons text-4xl text-primary">verified_user</span>
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">Application Sent!</h2>
        <p className="text-text-muted-light dark:text-text-muted-dark mb-8">
          Thank you for your interest. Your details have been sent to bcartysalmon@gmail.com. Our onboarding team will review your details and reach out to discuss the next steps.
        </p>
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 animate-in fade-in duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-primary mb-8 hover:translate-x-[-4px] transition-transform"
      >
        <span className="material-icons text-sm">arrow_back</span>
        Back to home
      </button>

      <div className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-4">
            <span className="material-icons text-xs text-primary">handshake</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Partner with us</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-text-main-light dark:text-text-main-dark mb-4">
            Grow your practice with us
          </h2>
          <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
            We're building our panel of top-tier property specialists. If you pride yourself on excellence and client success, we'd be keen to have you join.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-main-light dark:text-text-main-dark ml-1">I'm a professional...</label>
              <select 
                name="proType"
                value={formData.proType}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
              >
                <option>Conveyancer</option>
                <option>Mortgage Broker</option>
                <option>Real Estate Agent</option>
                <option>Building Inspector</option>
                <option>Property Lawyer</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-main-light dark:text-text-main-dark ml-1">Located in (Postcode)</label>
              <input 
                required
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                placeholder="e.g. 3000"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-main-light dark:text-text-main-dark ml-1">Your Name</label>
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-main-light dark:text-text-main-dark ml-1">Company</label>
              <input 
                required
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Legal Firm / Agency Name"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-main-light dark:text-text-main-dark ml-1">Email Address</label>
            <input 
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="work@example.com"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Processing...
              </>
            ) : (
              <>
                Apply to Join Panel
                <span className="material-icons text-sm">send</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProSignupView;
