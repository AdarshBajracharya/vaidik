import React from 'react';
import { PageId } from '../types';
import { SectionHeader } from '../components/SectionHeader';
import { BookOpen, Lightbulb, Compass, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface AcademicsViewProps {
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: () => void;
}

export const AcademicsView: React.FC<AcademicsViewProps> = ({ onNavigate, onOpenEnquiry }) => {
  return (
    <div className="w-full bg-white">
      {/* Page Header */}
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#d91f26]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                Scholastic Philosophy
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Our Academic Approach
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              At Vaidik Vidyapeeth, academic progress is anchored in intellectual rigor, active student engagement, foundational understanding, and positive discipline.
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Learning With Purpose */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionHeader
                eyebrow="Educational Framework"
                title="Learning With Purpose"
                className="mb-4"
              />
              <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                We believe that learning is most potent when students understand the 'why' behind the knowledge they acquire. Rather than passive memorization, our instructional framework centers on active student inquiry, logical reasoning, and real-world connection.
              </p>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Whether exploring linguistic nuance in Nepali and English, uncovering scientific principles through lab experiments, or tackling mathematical problem-solving, our teachers cultivate curiosity, confidence, and methodical study habits in every student.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded">
                  <h4 className="font-serif font-bold text-sm text-[#164287] mb-1">Inquiry & Questioning</h4>
                  <p className="text-xs text-slate-600">Students are encouraged to formulate questions, test hypotheses, and verify concepts.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded">
                  <h4 className="font-serif font-bold text-sm text-[#164287] mb-1">Structured Continuity</h4>
                  <p className="text-xs text-slate-600">Foundational concepts are carefully reinforced across sequential learning years.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-4/3 rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80"
                  alt="Students engaged in purposeful academic study"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Student Development */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            eyebrow="Holistic Growth"
            title="Student Development"
            description="Developing confident, ethical, and articulate young scholars through four key pillars of character."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            <div className="p-6 bg-white border border-slate-200 rounded-sm space-y-3">
              <div className="w-10 h-10 rounded bg-blue-50 text-[#164287] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Critical Thinking</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Analyzing evidence objectively, questioning assumptions, and synthesizing logical arguments.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-sm space-y-3">
              <div className="w-10 h-10 rounded bg-red-50 text-[#d91f26] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Communication & Poise</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Articulating thoughts persuasively in both written prose and spoken presentations.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-sm space-y-3">
              <div className="w-10 h-10 rounded bg-blue-50 text-[#164287] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Confidence & Resilience</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Embracing challenges, learning with humility from mistakes, and striving for steady self-improvement.
              </p>
            </div>

            <div className="p-6 border border-slate-200 rounded-sm space-y-3">
              <div className="w-10 h-10 rounded bg-red-50 text-[#d91f26] flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Discipline & Integrity</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Respecting institutional codes, maintaining punctuality, and honoring ethical principles in all pursuits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Teaching & Learning */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#d91f26]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#d91f26]">
                Pedagogical Standards
              </span>
              <span className="w-5 h-[2px] bg-[#d91f26]" />
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#164287]">
              Teaching & Learning in the Classroom
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our faculty members undergo continuous professional development to integrate practical activities, multimedia teaching aids, and regular diagnostic assessments that help identify every student's learning pace.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-slate-200 p-6 rounded-sm space-y-2">
              <h4 className="font-serif font-bold text-base text-slate-900">Continuous Assessment</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Regular formative feedback through quizzes, projects, and classroom presentations alongside formal term evaluations.
              </p>
            </div>
            <div className="border border-slate-200 p-6 rounded-sm space-y-2">
              <h4 className="font-serif font-bold text-base text-slate-900">Remedial Mentorship</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated extra support sessions for students requiring reinforcement in foundational mathematics and language mechanics.
              </p>
            </div>
            <div className="border border-slate-200 p-6 rounded-sm space-y-2">
              <h4 className="font-serif font-bold text-base text-slate-900">Regular Parent Dialogues</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transparent parent-teacher meetings to review progress reports and coordinate home-school learning alignment.
              </p>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-16 p-8 bg-slate-50 border border-slate-200 rounded text-center max-w-2xl mx-auto space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#164287]">
              Learn More About Our Academic Levels
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Contact our academic admissions counselor to discuss grade placement, curriculum details, or schedule an academic consultation.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <button
                onClick={onOpenEnquiry}
                className="px-6 py-2.5 rounded bg-[#164287] text-white text-sm font-medium hover:bg-[#0f2e60] transition-colors cursor-pointer"
              >
                Submit Academic Enquiry
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
