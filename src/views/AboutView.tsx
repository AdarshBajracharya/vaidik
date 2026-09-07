import React from 'react';

import { PageId } from '../types';

import { SectionHeader } from '../components/SectionHeader';

import { PRINCIPAL_INFO, WHY_CHOOSE_ITEMS, SCHOOL_INFO } from '../data/schoolData';

import {
  ArrowRight,
  Compass,
  Target,
  Heart,
  Award,
  Shield,
  CheckCircle2,
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (page: PageId) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">

      {/* Page Banner */}
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80"
            alt="School Campus"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#d91f26]" />

              <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                Institutional Profile
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              About Vaidik Vidyapeeth
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Located in Gothatar, Kathmandu, Vaidik Vidyapeeth is dedicated
              to fostering intellectual clarity, emotional maturity, and civic
              responsibility through balanced schooling.
            </p>

          </div>
        </div>
      </section>

      {/* Main Narrative & Philosophy */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7 space-y-6">

              <SectionHeader
                eyebrow="Educational Philosophy"
                title="Rooted in Tradition, Prepared for Tomorrow"
                className="mb-4"
              />

              <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                Vaidik Vidyapeeth was established with the vision of providing
                an education that harmonizes sound scholarship, moral
                integrity, and modern competence. The name "Vaidik" evokes deep
                reverence for knowledge, discipline, and truthful inquiry,
                while our contemporary curriculum ensures students are fully
                equipped for modern higher education and global citizenship.
              </p>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                We believe that education must not reduce childhood to
                mechanical test performance. In our Gothatar campus, students
                are encouraged to ask thoughtful questions, engage in hands-on
                experiments, cultivate artistic sensibilities, and practice
                teamwork through sports and martial arts.
              </p>

              <div className="p-4 bg-slate-50 border-l-3 border-[#164287] text-slate-700 text-sm italic">
                "Our guiding responsibility is to prepare students not only to
                pass examinations with distinction, but to live purposeful,
                empathetic, and courageous lives."
              </div>

            </div>

            <div className="lg:col-span-5">

              <div className="aspect-4/3 rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80"
                  alt="Students learning at Vaidik Vidyapeeth"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs text-slate-500 mt-2 text-center">
                Classroom collaboration and teacher mentorship at Gothatar
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission Split */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Vision */}
            <div className="p-8 bg-white border border-slate-200 rounded-sm space-y-4">

              <div className="w-12 h-12 rounded bg-blue-50 text-[#164287] flex items-center justify-center">
                <Compass className="w-6 h-6 text-[#164287]" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#164287]">
                Our Vision
              </h3>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                To provide progressive education that empowers learners to
                think independently, embrace innovation, and adapt confidently
                to a changing world. We attempt to cultivate academic
                excellence, creativity, ethical leadership, and global
                awareness thorugh inclusive, leader-centered education.
              </p>

            </div>

            {/* Mission */}
            <div className="p-8 bg-white border border-slate-200 rounded-sm space-y-4">

              <div className="w-12 h-12 rounded bg-red-50 text-[#d91f26] flex items-center justify-center">
                <Target className="w-6 h-6 text-[#d91f26]" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#164287]">
                Our Mission
              </h3>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                To nurture intellectual curiosity and academic achievement
                through high-quality teaching, innovative learning practices,
                and a supportive environment that prepares students for higher
                education and lifelong learning.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* Core Institutional Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeader
            align="center"
            eyebrow="Guiding Principles"
            title="Core Values"
            description="The foundational principles that guide our teaching, learning, relationships, and school community."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">

            {/* Excellence */}
            <div className="p-6 border border-slate-200 rounded-sm bg-white space-y-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#164287] inline-block" />

              <h4 className="font-serif font-bold text-lg text-slate-900">
                Excellence
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Striving for the highest standards in learning, personal, and
                social development.
              </p>
            </div>

            {/* Integrity */}
            <div className="p-6 border border-slate-200 rounded-sm bg-white space-y-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d91f26] inline-block" />

              <h4 className="font-serif font-bold text-lg text-slate-900">
                Integrity
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Acting with honesty, ethics, transparency, and accountability
                in every aspect of school life.
              </p>
            </div>

            {/* Respect */}
            <div className="p-6 border border-slate-200 rounded-sm bg-white space-y-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#164287] inline-block" />

              <h4 className="font-serif font-bold text-lg text-slate-900">
                Respect
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Promoting the value of diversity, empathy, tolerance,
                acceptance, and mutual understanding.
              </p>
            </div>

            {/* Innovation */}
            <div className="p-6 border border-slate-200 rounded-sm bg-white space-y-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d91f26] inline-block" />

              <h4 className="font-serif font-bold text-lg text-slate-900">
                Innovation
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Encouraging creativity, critical thinking, problem-solving,
                discovery, and modern learning approaches.
              </p>
            </div>

            {/* Responsibility */}
            <div className="p-6 border border-slate-200 rounded-sm bg-white space-y-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#164287] inline-block" />

              <h4 className="font-serif font-bold text-lg text-slate-900">
                Responsibility
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Developing a sense of responsibility, encouraging students to
                take ownership of their actions, and fostering self-discipline.
              </p>
            </div>

            {/* Collaboration */}
            <div className="p-6 border border-slate-200 rounded-sm bg-white space-y-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d91f26] inline-block" />

              <h4 className="font-serif font-bold text-lg text-slate-900">
                Collaboration
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Promoting teamwork, cooperation, and meaningful partnership
                within the school community.
              </p>
            </div>

            {/* Lifelong Learning */}
            <div className="p-6 border border-slate-200 rounded-sm bg-white space-y-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#164287] inline-block" />

              <h4 className="font-serif font-bold text-lg text-slate-900">
                Lifelong Learning Environment
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Inspiring curiosity, a love of learning, and continuous
                personal and intellectual growth.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Leadership Preview with CTA to Principal Page */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">

          <p className="text-xs font-semibold uppercase tracking-wider text-[#d91f26]">
            From the Leadership
          </p>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#164287]">
            Words From Our Principal
          </h2>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('principal')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded text-sm font-medium bg-[#164287] text-white hover:bg-[#0f2e60] transition-colors cursor-pointer"
            >
              <span>Read the Full Principal's Message</span>

              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </section>

    </div>
  );
};