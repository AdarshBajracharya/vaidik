import React from 'react';
import { PageId } from '../types';
import { SectionHeader } from '../components/SectionHeader';
import { FACILITIES_DATA } from '../data/schoolData';
import {
  Library,
  Monitor,
  HeartPulse,
  Bus,
  Clock,
  Activity,
  Music,
  Palette,
  Dribbble,
  Trophy,
  Baby,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

interface FacilitiesViewProps {
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: () => void;
}

export const FacilitiesView: React.FC<FacilitiesViewProps> = ({ onNavigate, onOpenEnquiry }) => {
  const learningFacilities = FACILITIES_DATA.filter((f) => f.category === 'Learning Facilities');
  const studentSupport = FACILITIES_DATA.filter((f) => f.category === 'Student Support');
  const ecaFacilities = FACILITIES_DATA.filter((f) => f.category === 'Extracurricular Activities');
  const earlyYears = FACILITIES_DATA.filter((f) => f.category === 'Early Years');

  const renderFacilityRow = (item: (typeof FACILITIES_DATA)[0], index: number) => {
    const isEven = index % 2 === 0;

    return (
      <div
        key={item.id}
        id={`facility-${item.id}`}
        className="py-12 border-b border-slate-200 last:border-b-0"
      >
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
          {/* Photo */}
          <div className={`lg:col-span-6 ${isEven ? '' : 'lg:order-2'}`}>
            {item.image && (
              <div className="aspect-16/10 rounded-sm overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          {/* Editorial Content */}
          <div className={`lg:col-span-6 space-y-4 ${isEven ? '' : 'lg:order-1'}`}>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#d91f26]">
              {item.category}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#164287]">
              {item.name}
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {item.description}
            </p>

            {/* Highlights bullet list */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
              {item.highlights.map((highlight, hIdx) => (
                <div key={hIdx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#164287] shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#d91f26]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                Campus Infrastructure
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              School Facilities & ECA
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Carefully planned learning spaces, student care services, and athletic grounds supporting intellectual development and extracurricular passions in Gothatar.
            </p>
          </div>
        </div>
      </section>

      {/* Facilities Navigation Shortcuts */}
      <div className="bg-slate-50 border-b border-slate-200 sticky top-20 z-20 py-3 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-medium text-slate-600">
          <span className="text-slate-400 uppercase tracking-wider text-[11px]">Jump to Category:</span>
          <div className="flex items-center gap-6">
            <a href="#section-learning" className="hover:text-[#164287] transition-colors">Learning Facilities</a>
            <span className="text-slate-300">•</span>
            <a href="#section-support" className="hover:text-[#164287] transition-colors">Student Support</a>
            <span className="text-slate-300">•</span>
            <a href="#section-eca" className="hover:text-[#164287] transition-colors">Extracurricular Activities (ECA)</a>
            <span className="text-slate-300">•</span>
            <a href="#section-early-years" className="hover:text-[#164287] transition-colors">Early Years Wing</a>
          </div>
          <button
            onClick={onOpenEnquiry}
            className="text-xs font-semibold text-[#164287] hover:text-[#d91f26] transition-colors cursor-pointer"
          >
            Visit Campus →
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category 1: Learning Facilities */}
        <section id="section-learning" className="pt-6 mb-12">
          <SectionHeader
            eyebrow="Scholastic Spaces"
            title="Learning Facilities"
            description="Modern, clean, and resource-rich environments designed to foster focus, research, and collaborative mastery."
          />
          <div className="space-y-4">
            {learningFacilities.map((facility, idx) => renderFacilityRow(facility, idx))}
          </div>
        </section>

        {/* Category 2: Student Support */}
        <section id="section-support" className="pt-12 mb-12 border-t border-slate-200">
          <SectionHeader
            eyebrow="Welfare & Safety"
            title="Student Support Facilities"
            description="Comprehensive on-campus health care, safe transportation routes across Gothatar, and dedicated after-school programs."
          />
          <div className="space-y-4">
            {studentSupport.map((facility, idx) => renderFacilityRow(facility, idx))}
          </div>
        </section>

        {/* Category 3: Extracurricular Activities (ECA) */}
        <section id="section-eca" className="pt-12 mb-12 border-t border-slate-200">
          <SectionHeader
            eyebrow="Athletics & Creativity"
            title="Extracurricular Activities (ECA)"
            description="Dedicated coaching in Taekwondo, classical & modern dance, fine arts, basketball, futsal, and musical performance."
          />
          <div className="space-y-4">
            {ecaFacilities.map((facility, idx) => renderFacilityRow(facility, idx))}
          </div>
        </section>

        {/* Category 4: Early Years Wing */}
        <section id="section-early-years" className="pt-12 mb-12 border-t border-slate-200">
          <SectionHeader
            eyebrow="Foundational Years"
            title="Early Years Pre-School Wing"
            description="Child-friendly, safe, and sensory-rich rooms designed exclusively for early development."
          />
          <div className="space-y-4">
            {earlyYears.map((facility, idx) => renderFacilityRow(facility, idx))}
          </div>
          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('preschool')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-[#164287] text-white text-sm font-medium hover:bg-[#0f2e60] transition-colors cursor-pointer"
            >
              <span>Visit the Dedicated Pre-School Wing Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
