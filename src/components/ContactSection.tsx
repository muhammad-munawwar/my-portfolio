'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShinyButton } from './ShinyButton';
import { Input } from './Input';
import { Textarea } from './Textarea';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const useNodemailer = process.env.NEXT_PUBLIC_USE_NODEMAILER === 'true';

    try {
      if (useNodemailer) {
        // Nodemailer / Custom API route
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, formName: 'contact' })
        });
        if (!res.ok) throw new Error('API response not ok');
      } else {
        // Netlify Forms
        const netlifyData = new URLSearchParams();
        netlifyData.append('form-name', 'contact');
        Object.entries(formData).forEach(([key, value]) => netlifyData.append(key, value as string));

        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: netlifyData.toString()
        });
        if (!res.ok) throw new Error('Netlify form submission failed');
      }

      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', website: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column (contact info) timeline
      const leftTl = gsap.timeline({
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      });

      leftTl
        .fromTo('.contact-tag', { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.6 })
        .fromTo('.contact-title-line', { y: '110%', opacity: 0 }, { y: '0%', opacity: 1, duration: 0.8, stagger: 0.15 }, '-=0.3')
        .fromTo('.contact-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
        .fromTo('.contact-info', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.05 }, '-=0.3');

      // Right column (form) timeline
      const rightTl = gsap.timeline({
        scrollTrigger: {
          trigger: rightColRef.current,
          start: 'top 80%',
          toggleActions: 'play reverse play reverse',
        },
      });

      rightTl.fromTo(
        rightColRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-8">
      <div className="custom-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24">
          {/* Left Column: Contact Info */}
          <div ref={leftColRef} className="flex flex-col">
            <span className="contact-tag font-[family:var(--font-mono)] text-[0.7rem] uppercase tracking-widest text-[#666] mb-8">
              [05] <span className="text-[var(--primary)] ml-2">CONTACT</span>
            </span>

            <h2 className="contact-title-line font-[family:var(--font-display)] text-[clamp(3.5rem,6vw,5rem)] font-extrabold tracking-[-0.03em] leading-[1.1] mb-8">
              Let&apos;s <span className="text-[var(--primary)]">talk.</span>
            </h2>

            <p className="contact-desc text-[var(--text-soft)] text-[1rem] leading-[1.6] mb-16 max-w-[90%]">
              Direct line to Muhammad Munawwar — no account managers and no briefing phone-tag between departments. Tell me about your next project for ambitious digital products, and I&apos;ll reply within 24 hours with concrete next steps.
            </p>

            <div className="contact-info flex flex-col border-t border-[var(--border)]">
              <div className="flex justify-between py-6 border-b border-[var(--border)]">
                <span className="font-[family:var(--font-mono)] text-[0.7rem] uppercase tracking-widest text-[#666]">EMAIL</span>
                <span className="text-[0.95rem] font-medium tracking-wide">muhammadmunawwar124@gmail.com</span>
              </div>
              <div className="flex justify-between py-6 border-b border-[var(--border)]">
                <span className="font-[family:var(--font-mono)] text-[0.7rem] uppercase tracking-widest text-[#666]">PHONE</span>
                <span className="text-[0.95rem] font-medium tracking-wide">+92 314 1304783</span>
              </div>
              <div className="flex justify-between py-6 border-b border-[var(--border)]">
                <span className="font-[family:var(--font-mono)] text-[0.7rem] uppercase tracking-widest text-[#666]">LOCATION</span>
                <span className="text-[0.95rem] font-medium tracking-wide">Karachi, Pakistan</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="font-[family:var(--font-mono)] text-[0.6rem] uppercase tracking-widest text-[#666]">REPLY WITHIN 24H</span>
              <span className="w-1 h-1 rounded-full bg-[#333]"></span>
              <span className="font-(--font-mono) text-[0.6rem] uppercase tracking-widest text-[#666]">AVAILABLE FOR FREELANCE</span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div ref={rightColRef} className="border border-(--border) rounded-xl p-6 xl:p-8 2xl:p-10  bg-[#09090b]">
            <span className="font-(--font-mono) text-[0.7rem] uppercase tracking-widest text-(--primary) mb-4 block">
              BRIEFING
            </span>
            <h3 className="text-[2rem] font-bold tracking-[-0.02em] mb-5 lg:mb-6 xl:mb-8">
              Send a <span className="text-(--primary)">short briefing.</span>
            </h3>

            <form name="contact" onSubmit={handleSubmit} className="flex flex-col gap-2.5 md:gap-3 2xl:gap-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3 2xl:gap-5">
                <Input name="firstName" value={formData.firstName} onChange={handleChange} label="FIRST NAME *" type="text" placeholder="Anna" required />
                <Input name="lastName" value={formData.lastName} onChange={handleChange} label="LAST NAME *" type="text" placeholder="Smith" required />
              </div>

              <Input name="email" value={formData.email} onChange={handleChange} label="EMAIL *" type="email" placeholder="anna@company.com" required />

              <Input name="phone" value={formData.phone} onChange={handleChange} label="PHONE NUMBER *" type="tel" placeholder="+1 555 1234567" required />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 md:gap-3 2xl:gap-5">
                <Input name="company" value={formData.company} onChange={handleChange} label="COMPANY NAME - optional" type="text" placeholder="Studio Inc." />
                <Input name="website" value={formData.website} onChange={handleChange} label="CURRENT WEBSITE - optional" type="url" placeholder="https://your-domain.com" />
              </div>

              <Textarea name="message" value={formData.message} onChange={handleChange} label="MESSAGE - optional" rows={4} placeholder="Idea, industry, timeline — what we should know." />

              <div className="mt-2">
                <ShinyButton type="submit" animatedBorder={true} customLineWidth={800} className="w-full">
                  {status === 'loading' ? 'Sending...' : status === 'success' ? 'Sent Successfully!' : status === 'error' ? 'Error Sending' : 'Send request \u2192'}
                </ShinyButton>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
