'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Project } from '@/constants/portfolioData';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { ShinyButton } from './ShinyButton';
import gsap from 'gsap';

interface ProjectInquiryModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectInquiryModal: React.FC<ProjectInquiryModalProps> = ({ project, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectRequirements: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const useNodemailer = process.env.NEXT_PUBLIC_USE_NODEMAILER === 'true';

    try {
      if (useNodemailer) {
        // Nodemailer / Custom API route
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, formName: 'project-inquiry', projectName: project.name })
        });
        if (!res.ok) throw new Error('API response not ok');
      } else {
        // Netlify Forms
        const netlifyData = new URLSearchParams();
        netlifyData.append('form-name', 'project-inquiry');
        netlifyData.append('projectName', project.name);
        Object.entries(formData).forEach(([key, value]) => netlifyData.append(key, value as string));

        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: netlifyData.toString()
        });
        if (!res.ok) throw new Error('Netlify form submission failed');
      }

      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', projectRequirements: '' });
      setTimeout(() => {
        setStatus('idle');
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  useEffect(() => {
    setMounted(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';

    // Random rotation between -12 and -4 OR 4 and 12
    const randomRotationIn = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 8 + 4);

    // Animate in
    gsap.fromTo(
      '.inquiry-modal-overlay',
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    gsap.fromTo(
      '.inquiry-modal-content',
      { opacity: 0, y: -150, rotation: randomRotationIn, scale: 0.85 },
      { opacity: 1, y: 0, rotation: 0, scale: 1, duration: 0.8, ease: 'back.out(1.5)', delay: 0.05 }
    );

    return () => {
      // Re-enable body scroll when modal unmounts
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    // Random rotation between -25 and -10 OR 10 and 25
    const randomRotationOut = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 15 + 10);

    // Physics-based fall animation
    gsap.to('.inquiry-modal-overlay', { opacity: 0, duration: 0.4, delay: 0.15, ease: 'power2.in' });
    gsap.to('.inquiry-modal-content', {
      y: typeof window !== 'undefined' ? window.innerHeight : 1000, // Fall below screen
      rotation: randomRotationOut, // Random tilt left or right
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.in', // Accelerates like gravity
      onComplete: onClose
    });
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="inquiry-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="inquiry-modal-content relative w-full max-w-2xl bg-[#09090b] border border-[var(--border)] rounded-xl p-6 md:p-8 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <span className="font-[family:var(--font-mono)] text-[0.7rem] uppercase tracking-widest text-[var(--primary)] mb-4 block">
          PROJECT INQUIRY
        </span>
        <h3 className="text-[1.5rem] md:text-[2rem] font-bold tracking-[-0.02em] mb-2 leading-tight">
          Inquire about <span className="text-(--primary)">{project.name}</span>
        </h3>
        <p className="text-(--text-soft) text-[0.95rem] mb-6 md:mb-8">
          Interested in a similar project? Fill out the form below and I'll get back to you within 24 hours.
        </p>

        <form name="project-inquiry" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleFormSubmit} className="flex flex-col gap-2.5 md:gap-4">
          <input type="hidden" name="form-name" value="project-inquiry" />
          <input type="hidden" name="projectName" value={project.name} />
          <p className="hidden">
            <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-4">
            <Input name="firstName" value={formData.firstName} onChange={handleChange} label="FIRST NAME *" type="text" placeholder="Anna" required />
            <Input name="lastName" value={formData.lastName} onChange={handleChange} label="LAST NAME *" type="text" placeholder="Smith" required />
          </div>

          <Input name="email" value={formData.email} onChange={handleChange} label="EMAIL *" type="email" placeholder="anna@company.com" required />
          <Input name="phone" value={formData.phone} onChange={handleChange} label="PHONE NUMBER *" type="tel" placeholder="+1 555 1234567" required />

          <Textarea name="projectRequirements" value={formData.projectRequirements} onChange={handleChange} label="PROJECT REQUIREMENTS *" rows={4} placeholder="What specific features or customizations are you looking for?" required />

          <div className="mt-4">
            <ShinyButton type="submit" animatedBorder={true} customLineWidth={700} className="w-full">
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent Successfully!' : status === 'error' ? 'Error Sending' : 'Send Inquiry \u2192'}
            </ShinyButton>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
