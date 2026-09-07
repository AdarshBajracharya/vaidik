import React from 'react';
import { PageId } from '../types';
import { SectionHeader } from '../components/SectionHeader';
import { ShieldCheck, Sparkles, Heart, Smile, CheckCircle2, ArrowRight, BookOpen, Music, Palette } from 'lucide-react';

interface PreSchoolViewProps {
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: () => void;
}

export const PreSchoolView: React.FC<PreSchoolViewProps> = ({ onNavigate, onOpenEnquiry }) => {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1600&q=80"
            alt="Pre-school classroom"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#d91f26]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                Early Childhood Development
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Vaidik Pre-School Wing
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              A warm, secure, and nurturing foundational space where Playgroup, Nursery, LKG, and UKG children discover the joyful rhythm of learning.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Introduction & Philosophy */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionHeader
                eyebrow="Early Years Philosophy"
                title="Gentle Foundations for Lifelong Curiosity"
                className="mb-4"
              />
              <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                At Vaidik Vidyapeeth, we view the early childhood years as a precious window of wonder. Our dedicated Pre-School Wing is intentionally separated from the senior academic blocks to provide our youngest learners with a calm, child-scaled haven tailored to their developmental needs.
              </p>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                Rather than imposing premature academic pressure, we cultivate language readiness, early mathematical sensibility, social kindness, and fine-motor coordination through rich sensory exploration, guided storytelling, and imaginative play.
              </p>
              <div className="p-4 bg-slate-50 border-l-3 border-[#164287] rounded-xs text-xs sm:text-sm text-slate-700">
                <strong>Levels Welcomed:</strong> Playgroup (Ages 2–3), Nursery (Ages 3–4), Lower Kindergarten (LKG, Ages 4–5), and Upper Kindergarten (UKG, Ages 5–6).
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-4/3 rounded-sm overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80"
                  alt="Pre-school children engaged in collaborative play"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2 text-center">Constructive sensory play and early peer socialization</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Learning Approach & Early Development */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            eyebrow="Pedagogical Core"
            title="Our Learning Approach"
            description="A thoughtful synthesis of sensory inquiry, language immersion, and gentle routine."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            <div className="bg-white p-6 rounded-sm border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded bg-blue-50 text-[#164287] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Phonics & Early Literacy</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Multisensory phonics, rhyming verses, and interactive picture-book reading that instill joyful phonemic awareness and conversational fluency.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded bg-red-50 text-[#d91f26] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Numeracy & Spatial Sense</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Concrete tactile manipulatives—blocks, beads, sorting puzzles—that build an intuitive understanding of numbers, patterns, and geometric dimensions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-sm border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded bg-blue-50 text-[#164287] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Social-Emotional Care</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Gentle routines that teach sharing, patience, empathetic conflict resolution, and self-help skills under affectionate adult supervision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Safe Environment & Dedicated Facilities */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="aspect-4/3 rounded-sm overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80"
                  alt="Child-safe indoor learning environment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <SectionHeader
                eyebrow="Child Safety"
                title="A Safe & Protective Environment"
                className="mb-4"
              />
              <p className="text-slate-700 text-base leading-relaxed">
                Parents entrust us with what is most precious to them. We maintain uncompromising safety protocols to ensure that every corner of our Pre-School Wing is secure, hygienic, and child-safe.
              </p>
              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#d91f26] shrink-0 mt-0.5" />
                  <div>
                    <strong>Child-Proofed Infrastructure:</strong> Rounded desk edges, cushioned flooring in play zones, and child-height sanitary facilities.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#164287] shrink-0 mt-0.5" />
                  <div>
                    <strong>High Caregiver-to-Child Ratio:</strong> Dedicated early childhood teachers supported by attentive classroom assistants and ayas.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#d91f26] shrink-0 mt-0.5" />
                  <div>
                    <strong>Hygienic Dining & Refreshments:</strong> Clean filtered drinking water, monitored handwashing routines, and clean snack areas.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pre-School Activities */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            eyebrow="Daily Rhythms"
            title="Pre-School Activities"
            description="Wholesome physical, musical, and artistic experiences woven into each school morning."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            <div className="p-5 bg-white border border-slate-200 rounded text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#164287] mx-auto flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900">Sensory Art & Craft</h4>
              <p className="text-xs text-slate-600">Finger painting, clay rolling, tear-and-paste collage work.</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-red-50 text-[#d91f26] mx-auto flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900">Rhythm & Rhymes</h4>
              <p className="text-xs text-slate-600">Choral nursery chants, clapping games, and musical movement.</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-[#164287] mx-auto flex items-center justify-center">
                <Smile className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900">Outdoor Motor Play</h4>
              <p className="text-xs text-slate-600">Balancing beams, ball tossing, hopscotch, and obstacle tracks.</p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-red-50 text-[#d91f26] mx-auto flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900">Story Circle</h4>
              <p className="text-xs text-slate-600">Interactive folklore, moral parables, and picture exploration.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-2 px-7 py-3 rounded bg-[#164287] text-white text-sm font-medium hover:bg-[#0f2e60] transition-colors cursor-pointer"
            >
              <span>Enquire for Pre-School Admission (Playgroup – UKG)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
