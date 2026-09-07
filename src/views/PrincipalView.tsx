import React from 'react';
import { PageId } from '../types';
import { PRINCIPAL_INFO, SCHOOL_INFO } from '../data/schoolData';
import { SectionHeader } from '../components/SectionHeader';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

interface PrincipalViewProps {
  onNavigate: (page: PageId) => void;
}

export const PrincipalView: React.FC<PrincipalViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-white">
      {/* Editorial Banner */}
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#d91f26]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                School Leadership
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Message from the Principal
            </h1>
          </div>
        </div>
      </section>

      {/* Main Editorial Article */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Left Sidebar Profile */}
            <div className="md:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div className="aspect-4/5 rounded-sm overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                  <img
                    src={PRINCIPAL_INFO.photo}
                    alt={`${PRINCIPAL_INFO.name} - Principal, Vaidik Vidyapeeth`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="border-b border-slate-200 pb-4">
                  <h3 className="font-serif font-bold text-xl text-slate-900">
                    {PRINCIPAL_INFO.name}
                  </h3>
                  <p className="text-sm font-medium text-[#164287]">
                    {PRINCIPAL_INFO.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {PRINCIPAL_INFO.institution}, {PRINCIPAL_INFO.location}
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#d91f26]" />
                    <span>{SCHOOL_INFO.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#164287]" />
                    <span>{SCHOOL_INFO.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{SCHOOL_INFO.phone}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onNavigate('contact')}
                    className="w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider rounded border border-[#164287] text-[#164287] hover:bg-blue-50/50 transition-colors cursor-pointer text-center"
                  >
                    Schedule a Campus Meeting
                  </button>
                </div>
              </div>
            </div>

            {/* Right Full Text Article */}
            <div className="md:col-span-8 space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">

              {PRINCIPAL_INFO.fullMessage.map((para, index) => (
                <p key={index} className="text-justify sm:text-left text-slate-700 leading-relaxed">
                  {para}
                </p>
              ))}

              <div className="pt-8 mt-8 border-t border-slate-200">
                <p className="font-serif text-slate-900 font-bold text-lg">With warm regards,</p>
                <div className="mt-4 font-serif text-2xl text-[#164287] italic tracking-wide">
                  {PRINCIPAL_INFO.name}
                </div>
                <p className="text-sm font-semibold text-slate-700 mt-1">Principal</p>
                <p className="text-xs text-slate-500">Vaidik Vidyapeeth, Gothatar, Kathmandu</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
