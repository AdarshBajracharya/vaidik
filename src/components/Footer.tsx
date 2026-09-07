import React from 'react';
import { Logo } from './Logo';
import { PageId } from '../types';
import { SCHOOL_INFO } from '../data/schoolData';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEnquiry }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b1a30] text-slate-300 border-t-4 border-[#164287]" id="site-footer">
      {/* Top Banner / Subtle Accent strip */}
      <div className="h-1.5 bg-gradient-to-r from-[#164287] via-[#d91f26] to-[#164287]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* COLUMN 1: Logo & Mission Statement (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="dark" size="md" onClick={() => handleNav('home')} />
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm pt-2">
              Vaidik Vidyapeeth is committed to nurturing confident, capable and responsible learners through quality education and holistic development.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-white transition-colors cursor-pointer group"
              >
                <span>Request Admission Details</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* COLUMN 2: Quick Links (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white font-serif text-base font-semibold tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d91f26]" />
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Us' },
                { id: 'facilities', label: 'Facilities' },
                { id: 'admissions', label: 'Admissions' },
                { id: 'events', label: 'Events' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id as PageId)}
                    className="hover:text-white hover:translate-x-1 transition-all text-slate-300 text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: School Programmes (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-white font-serif text-base font-semibold tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#164287]" />
              School Life
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'preschool', label: 'Pre-School Wing' },
                { id: 'academics', label: 'Academics & Curriculum' },
                { id: 'facilities', label: 'Extracurricular Activities (ECA)' },
                { id: 'gallery', label: 'Life at Vaidik (Gallery)' },
                { id: 'principal', label: "Message from the Principal" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleNav(item.id as PageId)}
                    className="hover:text-white hover:translate-x-1 transition-all text-slate-300 text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Contact Information (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-white font-serif text-base font-semibold tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d91f26]" />
              School Campus
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d91f26] shrink-0 mt-1" />
                <div>
                  <p className="text-white font-medium">Vaidik Vidyapeeth</p>
                  <p className="text-xs text-slate-300">{SCHOOL_INFO.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{SCHOOL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="break-all">{SCHOOL_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2.5 pt-1 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Office: {SCHOOL_INFO.officeHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider & row */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Vaidik Vidyapeeth. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Gothatar, Kathmandu, Nepal</span>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleNav('about')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              School Policies
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Privacy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
