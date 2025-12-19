
import React, { useState } from 'react';

interface LeadFormViewProps {
  onBack: () => void;
}

const LeadFormView: React.FC<LeadFormViewProps> = ({ onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    postcode: '',
    professionalType: 'Conveyancers',
    name: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using FormSubmit.co as an easy way to send emails from frontend
      const response = await fetch("https://formsubmit.co/ajax/bcartysalmon@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: "New Property Pro Request - Home Pathway",
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
      alert("There was an error sending your request. Please try again.");
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
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="material-icons text-4xl text-green-600 dark:text-green-400">check_circle</span>
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">Request Received!</h2>
        <p className="text-text-muted-light dark:text-text-muted-dark mb-8">
          Your details have been sent to our matching team. We've got your details. Our team is manually vetting the best professionals in your area and will be in touch shortly.
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
        Back to search
      </button>

      <div className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-4">
            <span className="material-icons text-xs text-primary">construction</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Building our panel</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-text-main-light dark:text-text-main-dark mb-4">
            We're still growing our network
          </h2>
          <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
            While we finalize our full panel of verified professionals, we can still manually find the perfect match for your specific property needs today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-main-light dark:text-text-main-dark ml-1">Postcode</label>
              <input 
                required
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                placeholder="e.g. 3000"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-main-light dark:text-text-main-dark ml-1">Professional Type</label>
              <select 
                name="professionalType"
                value={formData.professionalType}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
              >
                <option>Conveyancers</option>
                <option>Mortgage Brokers</option>
                <option>Real Estate Agents</option>
                <option>Building Inspectors</option>
                <option>Property Lawyers</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-main-light dark:text-text-main-dark ml-1">Your Full Name</label>
            <input 
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-text-main-light dark:text-text-main-dark ml-1">Email Address</label>
            <input 
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
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
                Sending...
              </>
            ) : (
              <>
                Find me a professional
                <span className="material-icons text-sm">arrow_forward</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeadFormView;
