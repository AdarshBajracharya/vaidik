import React, { useState } from 'react';

import { PageId, EventItem, GalleryPhoto } from '../types';

import { SectionHeader } from '../components/SectionHeader';



import { GoogleMapSection } from '../components/GoogleMapSection';

import {

  SCHOOL_INFO,

  QUICK_STATS,

  PRINCIPAL_INFO,

  CHAIRMAN_INFO,

  WHY_CHOOSE_ITEMS,

  FACILITIES_DATA,

} from '../data/schoolData';

import {

  ArrowRight,

  ShieldCheck,

  GraduationCap,

  BookOpen,

  Users,

  Trophy,

  Building2,

  CheckCircle2,

  Phone,

  Mail,

  MapPin,

  Clock,

  Library,

  Monitor,

  HeartPulse,

  Bus,

  Baby,

  Activity,

  Music,

  Palette,

  Dribbble,
  CalendarDays,
  CalendarCheck2,
  History,
  Sparkles,

} from 'lucide-react';

interface HomeViewProps {

  events: EventItem[];

  photos: GalleryPhoto[];

  onNavigate: (page: PageId) => void;

  onSelectEvent: (event: EventItem) => void;

  onSelectPhoto: (photo: GalleryPhoto) => void;

}

// Compare date-only event values in Nepal time, regardless of visitor location.
const nepalToday = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kathmandu',
    year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const part = (name: string) => parts.find((p) => p.type === name)?.value || '';
  return `${part('year')}-${part('month')}-${part('day')}`;
};

const eventDateKey = (date: string) => String(date || '').slice(0, 10);

const eventDateLabel = (value: string) => {
  const date = new Date(`${eventDateKey(value)}T12:00:00Z`);
  return Number.isNaN(date.getTime())
    ? 'Date to be announced'
    : date.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      day: 'numeric', month: 'short', year: 'numeric',
    });
};

const eventEndKey = (event: EventItem) => {
  const start = eventDateKey(event.date);
  const match = (event.time || '').match(/(?:^|\|\s*)END:(\d{4}-\d{2}-\d{2})\s*$/i);
  return match && match[1] >= start ? match[1] : start;
};
const eventStatus = (event: EventItem, today: string) => {
  if (today < eventDateKey(event.date)) return 'Upcoming' as const;
  if (today > eventEndKey(event)) return 'Past' as const;
  return 'Ongoing' as const;
};
const eventDateRangeLabel = (event: EventItem) => {
  const start = eventDateLabel(event.date);
  const end = eventEndKey(event);
  return end !== eventDateKey(event.date) ? `${start} – ${eventDateLabel(end)}` : start;
};

type HomeEventTab = 'upcoming' | 'ongoing' | 'past';

const HomeEventCard: React.FC<{
  event: EventItem;
  status: 'Upcoming' | 'Ongoing' | 'Past';
  onSelect: (event: EventItem) => void;
}> = ({ event, status, onSelect }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = Boolean(event.coverImage?.trim()) && !imageFailed;
  const CategoryIcon = event.category === 'Sports'
    ? Trophy
    : event.category === 'Academic'
      ? BookOpen
      : event.category === 'Cultural'
        ? Palette
        : Sparkles;

  return (
    <button
      type="button"
      onClick={() => onSelect(event)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164287] motion-reduce:transform-none"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eff5fc]">
        {hasImage ? (
          <img
            src={event.coverImage}
            alt={event.title}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none"
          />
        ) : (
          <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#edf4ff] via-white to-[#dfeafd]">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[22px] border-blue-100/60" />
            <div className="absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-blue-100/60 blur-xl" />
            <div className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-sm transition-transform duration-500 group-hover:scale-110 motion-reduce:transform-none">
              <CategoryIcon className="h-8 w-8 text-[#164287]" />
            </div>
            <span className="relative text-[10px] font-bold uppercase tracking-[0.18em] text-[#c62828]">Vaidik Vidyapeeth</span>
            <span className="relative mt-2 font-serif text-lg font-bold text-[#164287]">{event.category} Event</span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-md bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#164287] shadow-sm">
          {eventDateRangeLabel(event)}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm">
          {status === 'Past' ? 'Past Event' : status}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#c62828]">{event.category}</span>
        <h3 className="font-serif text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#164287]">{event.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">{event.summary}</p>
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-sm font-semibold text-[#164287]">View Event Details</span>
          <ArrowRight className="h-4 w-4 text-[#164287] transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
        </div>
      </div>
    </button>
  );
};

export const HomeView: React.FC<HomeViewProps> = ({

  onNavigate,

  events,

  photos,

  onSelectEvent,

  onSelectPhoto,

}) => {

  const iconMap: Record<string, React.ReactNode> = {

    GraduationCap: <GraduationCap className="w-5 h-5 text-[#164287]" />,

    BookOpen: <BookOpen className="w-5 h-5 text-[#164287]" />,

    Users: <Users className="w-5 h-5 text-[#164287]" />,

    ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#164287]" />,

    Trophy: <Trophy className="w-5 h-5 text-[#164287]" />,

    Building2: <Building2 className="w-5 h-5 text-[#164287]" />,

  };

  const [homeEventTab, setHomeEventTab] = useState<HomeEventTab>('upcoming');
  const today = nepalToday();
  const ongoing = [...events]
    .filter((event) => eventStatus(event, today) === 'Ongoing')
    .sort((a, b) => eventDateKey(a.date).localeCompare(eventDateKey(b.date)));
  const upcoming = [...events]
    .filter((event) => eventStatus(event, today) === 'Upcoming')
    .sort((a, b) => eventDateKey(a.date).localeCompare(eventDateKey(b.date)));
  const past = [...events]
    .filter((event) => eventStatus(event, today) === 'Past')
    .sort((a, b) => eventDateKey(b.date).localeCompare(eventDateKey(a.date)));
  const featuredEvents = (homeEventTab === 'upcoming' ? upcoming : homeEventTab === 'ongoing' ? ongoing : past).slice(0, 3);

  const homepageGallery = photos.slice(0, 6);

  return (

    <div className="w-full">

      {/*==================================================

          1. HERO SECTION

          ================================================== */}

      <section
        id="hero-section"
        className="relative overflow-hidden bg-[#f6f8fc]"
      >
        <div className="grid min-h-[580px] lg:min-h-[640px] grid-cols-1 lg:grid-cols-[46%_54%]">
          {/* Soft, readable introduction — no overlay on the school photograph. */}
          <div className="relative z-10 flex items-center order-1 px-6 py-16 sm:px-12 lg:py-20 lg:pl-[max(2rem,calc((100vw-1280px)/2))] lg:pr-10 bg-[#f6f8fc]">
            <div className="w-full max-w-xl space-y-6">
              <div className="inline-flex max-w-full items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-[#164287]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#c52731]" />
                Vaidik Vidyapeeth · Gothatar, Kathmandu
              </div>

              <h1 className="font-serif text-[2.6rem] leading-[1.15] sm:text-5xl xl:text-[3.45rem] font-bold tracking-tight text-[#173d76]">
                Learning With Values.
                <span className="mt-2 block text-[#b92b35]">Leading With Character.</span>
              </h1>

              <div className="h-1 w-14 rounded-full bg-[#c52731]" />

              <p className="max-w-lg text-base leading-8 text-slate-600">
                A welcoming school community where academic excellence,
                creativity and character grow together. Discover an
                inspiring place for every child to learn and thrive.
              </p>

              <div className="pt-2">
                <button
                  id="hero-explore-btn"
                  onClick={() => {
                    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-3 rounded-md bg-[#164287] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#12376f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164287]"
                >
                  Explore Our School
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Keep the school building prominent and naturally colored. */}
          <div className="group relative order-2 h-[310px] overflow-hidden bg-slate-200 sm:h-[420px] lg:h-auto lg:min-h-[640px]">
            <img
              src="/vaidik.jpg"
              alt="Vaidik Vidyapeeth school building in Gothatar, Kathmandu"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045] motion-reduce:transform-none"
              style={{ objectPosition: 'center 35%' }}
              fetchPriority="high"
            />
            <div className="pointer-events-none absolute inset-0 bg-[#164287]/0 transition-colors duration-700 group-hover:bg-[#164287]/[0.045] motion-reduce:transition-none" />
          </div>
        </div>
      </section>

      {/*==================================================

          2. QUICK SCHOOL INFORMATION

          ================================================== */}

      <section

        className="bg-[#f8fafc] border-y border-slate-200 py-6"

        id="quick-info-bar"

      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-200">

            {QUICK_STATS.map((stat, idx) => (

              <div

                key={idx}

                className={`pt-3 md:pt-0 ${idx > 0 ? 'md:pl-6' : ''

                  } flex flex-col justify-center`}

              >

                <div className="flex items-center gap-2 mb-1">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#d91f26] shrink-0" />

                  <span className="font-serif font-bold text-sm text-[#164287] leading-tight">

                    {stat.label}

                  </span>

                </div>

                <span className="text-xs text-slate-500 pl-3.5">

                  {stat.sublabel}

                </span>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/*==================================================

          3. ABOUT VAIDIK VIDYAPEETH

          ================================================== */}

      <section

        className="py-20 md:py-24 bg-white"

        id="about-section"

      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            <div className="lg:col-span-6 space-y-6">

              <SectionHeader

                eyebrow="About Vaidik"

                title="About Vaidik Vidyapeeth"

                className="mb-6"

              />

              <p className="text-slate-700 text-base md:text-lg leading-relaxed">

                Vaidik Vidyapeeth is committed to providing a nurturing,

                disciplined and inspiring learning environment where every

                student has the opportunity to discover their potential. Our

                educational approach combines strong academic foundations with

                creativity, physical development, social responsibility and

                character building.

              </p>

              <p className="text-slate-600 text-sm md:text-base leading-relaxed">

                Through dedicated educators, meaningful learning experiences

                and a supportive school community, we aim to prepare students

                not only for examinations but also for life beyond the

                classroom. Situated in the peaceful surroundings of Gothatar,

                Kathmandu, our School allows children to focus, explore, and

                flourish in a secure academic atmosphere.

              </p>

              <div className="pt-2">

                <button

                  id="about-learn-more-btn"

                  onClick={() => onNavigate('about')}

                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#164287] hover:text-[#d91f26] transition-colors cursor-pointer group"

                >

                  <span>Learn More About Us</span>

                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />

                </button>

              </div>

            </div>

            <div className="lg:col-span-6">

              <div className="relative">

                <div className="aspect-4/3 rounded-sm overflow-hidden border border-slate-200 shadow-sm bg-slate-100">

                  <img

                    src="/home1.jpg"

                    alt="Students actively engaged in classroom learning at Vaidik Vidyapeeth"

                    className="w-full h-full object-contain hover:scale-102 transition-transform duration-500"

                  />

                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">

                  <span>Student-Centred Academic Engagement</span>

                  <span className="text-[#164287] font-medium">

                    Gothatar School

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/*==================================================

          5. MESSAGE FROM THE CHAIRMAN

          ================================================== */}

      <section

        className="py-20 bg-white border-b border-slate-200"

        id="chairman-section"

      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            <div className="lg:col-span-7 space-y-5 order-2 lg:order-1">

              <div className="inline-flex items-center gap-2">

                <span className="w-5 h-[2px] bg-[#d91f26]" />

                <span className="text-xs font-semibold uppercase tracking-wider text-[#d91f26]">

                  Leadership

                </span>

              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#164287] leading-tight">

                Message from the Chairman

              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">

                At Vaidik Vidyapeeth, our vision is to build an educational

                institution that nurtures knowledge, character, discipline and

                responsibility. Education must prepare students not only for

                academic success but also for the challenges and opportunities

                of an ever-changing world.

              </p>

              <p className="text-slate-600 text-sm leading-relaxed">

                We remain committed to providing students with a supportive

                learning environment, dedicated educators and meaningful

                opportunities that help them grow into confident, capable and

                responsible individuals.

              </p>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">

                <div>

                  <h4 className="font-serif font-bold text-slate-900 text-base">

                    {CHAIRMAN_INFO.name}

                  </h4>

                  <p className="text-xs text-slate-500">

                    Chairman, Vaidik Vidyapeeth

                  </p>

                </div>

                <span className="hidden sm:block text-slate-300">

                  |

                </span>

                <button

                  onClick={() => onNavigate('chairman')}

                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#164287] hover:text-[#d91f26] transition-colors cursor-pointer group"

                >

                  <span>Read Full Message</span>

                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

                </button>

              </div>

            </div>

            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">

              <div className="relative max-w-sm w-full">

                <div className="aspect-4/5 rounded-sm overflow-hidden border border-slate-200 shadow-sm bg-slate-200">

                  <img

                    src={CHAIRMAN_INFO.photo}

                    alt={`${CHAIRMAN_INFO.name} - Chairman of Vaidik Vidyapeeth`}

                    className="w-full h-full object-cover object-top"

                  />

                </div>

                <div className="mt-3 text-center">

                  <p className="font-serif font-bold text-slate-900 text-base">

                    {CHAIRMAN_INFO.name}

                  </p>

                  <p className="text-xs text-slate-600">

                    {CHAIRMAN_INFO.title}, {CHAIRMAN_INFO.institution}

                  </p>

                  <p className="text-xs text-[#d91f26] font-medium">

                    {CHAIRMAN_INFO.location}, Nepal

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/*==================================================

          4. MESSAGE FROM THE PRINCIPAL

          ================================================== */}

      <section

        className="py-20 bg-slate-50 border-y border-slate-200"

        id="principal-section"

      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            <div className="lg:col-span-5 flex justify-center">

              <div className="relative max-w-sm w-full">

                <div className="aspect-4/5 rounded-sm overflow-hidden border border-slate-200 shadow-sm bg-slate-200">

                  <img

                    src={PRINCIPAL_INFO.photo}

                    alt={`${PRINCIPAL_INFO.name} - Principal of Vaidik Vidyapeeth`}

                    className="w-full h-full object-cover object-top"

                  />

                </div>

                <div className="mt-3 text-center">

                  <p className="font-serif font-bold text-slate-900 text-base">

                    {PRINCIPAL_INFO.name}

                  </p>

                  <p className="text-xs text-slate-600">

                    {PRINCIPAL_INFO.title}, {PRINCIPAL_INFO.institution}

                  </p>

                  <p className="text-xs text-[#d91f26] font-medium">

                    {PRINCIPAL_INFO.location}, Nepal

                  </p>

                </div>

              </div>

            </div>

            <div className="lg:col-span-7 space-y-5">

              <div className="inline-flex items-center gap-2">

                <span className="w-5 h-[2px] bg-[#d91f26]" />

                <span className="text-xs font-semibold uppercase tracking-wider text-[#d91f26]">

                  Leadership

                </span>

              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#164287] leading-tight">

                Message from the Principal

              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">

                We believe that schools must be places of joy, purposeful

                inquiry, and moral grounding. When parents and teachers

                collaborate with shared values, children develop the

                self-belief required to navigate an evolving world with

                dignity and intellect.

              </p>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">

                <div>

                  <h4 className="font-serif font-bold text-slate-900 text-base">

                    {PRINCIPAL_INFO.name}

                  </h4>

                  <p className="text-xs text-slate-500">

                    Principal, Vaidik Vidyapeeth

                  </p>

                </div>

                <span className="hidden sm:block text-slate-300">

                  |

                </span>

                <button

                  onClick={() => onNavigate('principal')}

                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#164287] hover:text-[#d91f26] transition-colors cursor-pointer group"

                >

                  <span>Read Full Message</span>

                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>



      {/*==================================================

          6. WHY VAIDIK VIDYAPEETH

          ================================================== */}

      <section

        className="py-20 md:py-24 bg-white"

        id="why-vaidik-section"

      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeader

            eyebrow="Our Commitment"

            title="Why Vaidik Vidyapeeth?"

            description="We combine timeless academic discipline with contemporary educational best practices, ensuring students thrive in a safe and supportive scholastic atmosphere."

          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 pt-4">

            {WHY_CHOOSE_ITEMS.map((item, index) => (

              <div

                key={index}

                className="space-y-3 pb-6 border-b border-slate-100 last:border-b-0 md:last:border-b"

              >

                <div className="w-10 h-10 rounded bg-blue-50/80 flex items-center justify-center text-[#164287] border border-blue-100/50">

                  {iconMap[item.iconName] || (

                    <CheckCircle2 className="w-5 h-5 text-[#164287]" />

                  )}

                </div>

                <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug">

                  {item.title}

                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">

                  {item.description}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/*==================================================

          7. SCHOOL INFRASTRUCTURE

          ================================================== */}

      <section

        className="py-20 bg-slate-50 border-y border-slate-200 relative overflow-hidden"

        id="infrastructure-section"

      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7">

              <div className="aspect-16/10 rounded-sm overflow-hidden border border-slate-200 shadow-sm bg-white">

                <img

                  src="facility.jpg"

                  alt="Vaidik Vidyapeeth School Infrastructure and Learning Environment in Gothatar"

                  className="w-full h-full object-cover"

                />

              </div>

            </div>

            <div className="lg:col-span-5 space-y-6">

              <div className="inline-flex items-center gap-2">

                <span className="w-5 h-[2px] bg-[#d91f26]" />

                <span className="text-xs font-semibold uppercase tracking-wider text-[#d91f26]">

                  School & Facilities

                </span>

              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#164287] leading-tight">

                A Learning Environment Built for Growth

              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">

                Vaidik Vidyapeeth's School at Gothatar is purposefully

                designed to promote academic focus, physical vitality, and

                student security. Our bright classrooms, structured play

                areas, and quiet reading commons provide children with the

                ideal setting to learn and collaborate comfortably.

              </p>

              <div className="space-y-3 pt-2 text-sm text-slate-600">

                <div className="flex items-start gap-2.5">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#d91f26] shrink-0 mt-2" />

                  <span>

                    Well-ventilated classrooms with ergonomic desks and

                    natural sunlight.

                  </span>

                </div>

                <div className="flex items-start gap-2.5">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#d91f26] shrink-0 mt-2" />

                  <span>

                    Dedicated science, computer, and arts learning spaces.

                  </span>

                </div>

                <div className="flex items-start gap-2.5">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#d91f26] shrink-0 mt-2" />

                  <span>

                    Monitored entry points and high standards of School

                    hygiene.

                  </span>

                </div>

              </div>

              <div className="pt-2">

                <button

                  onClick={() => onNavigate('facilities')}

                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#164287] hover:text-[#d91f26] transition-colors cursor-pointer group"

                >

                  <span>Explore All School Facilities</span>

                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/*==================================================

          8. FACILITIES & EXTRACURRICULAR ACTIVITIES

          ================================================== */}

      <section

        className="py-20 md:py-24 bg-white"

        id="facilities-section"

      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeader

            eyebrow="Facilities & ECA"

            title="Facilities Designed for Better Learning"

            description="From rigorous scholastic spaces to expansive athletic grounds, our facilities empower students to explore their intellectual and extracurricular talents."

          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">

            <div className="lg:col-span-5">

              <div className="aspect-4/5 rounded-sm overflow-hidden border border-slate-200 shadow-sm sticky top-28">

                <img

                  src="piano.jpg"

                  alt="Students in the school library at Vaidik Vidyapeeth"

                  className="w-full h-full object-cover"

                />

                <div className="p-4 bg-slate-50 border-t border-slate-200">

                  <p className="text-xs font-semibold text-[#164287] uppercase tracking-wider">

                    School Feature

                  </p>

                  <p className="text-sm font-medium text-slate-800">

                    Resourceful Library & Digital Research Terminals

                  </p>

                </div>

              </div>

            </div>

            <div className="lg:col-span-7 space-y-8">

              <div>

                <h3 className="font-serif text-xl font-bold text-[#164287] pb-3 border-b border-slate-200 flex items-center gap-2">

                  <span className="w-2 h-2 rounded-full bg-[#164287]" />

                  Academic & Student Facilities

                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5">

                  <div className="space-y-1.5">

                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">

                      <Library className="w-4 h-4 text-[#164287]" />

                      <span>Library</span>

                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">

                      Rich repository of fiction, reference volumes, and quiet

                      study alcoves.

                    </p>

                  </div>

                  <div className="space-y-1.5">

                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">

                      <Monitor className="w-4 h-4 text-[#164287]" />

                      <span>Computer Lab</span>

                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">

                      Modern computing terminals fostering digital literacy and

                      fundamental coding.

                    </p>

                  </div>

                  <div className="space-y-1.5">

                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">

                      <HeartPulse className="w-4 h-4 text-[#d91f26]" />

                      <span>Infirmary</span>

                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">

                      Clean first-aid station staffed for immediate student

                      health care.

                    </p>

                  </div>

                  <div className="space-y-1.5">

                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">

                      <Bus className="w-4 h-4 text-[#164287]" />

                      <span>Transportation</span>

                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">

                      Safe, escorted school bus fleet serving routes across

                      Gothatar and neighboring areas.

                    </p>

                  </div>

                  <div className="space-y-1.5">

                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">

                      <Clock className="w-4 h-4 text-[#164287]" />

                      <span>After School Program</span>

                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">

                      Supervised homework completion, remedial assistance, and

                      enrichment clubs.

                    </p>

                  </div>

                  <div className="space-y-1.5">

                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">

                      <Baby className="w-4 h-4 text-[#d91f26]" />

                      <span>Pre-School Wing</span>

                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">

                      Child-safe sensory spaces designed specifically for early

                      learners.

                    </p>

                  </div>

                </div>

              </div>

              <div className="pt-4">

                <h3 className="font-serif text-xl font-bold text-[#164287] pb-3 border-b border-slate-200 flex items-center gap-2">

                  <span className="w-2 h-2 rounded-full bg-[#d91f26]" />

                  Extracurricular Activities (ECA)

                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-5">

                  <div className="space-y-1.5">

                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">

                      <Activity className="w-4 h-4 text-[#d91f26]" />

                      <span>Taekwondo</span>

                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">

                      Certified martial arts training emphasizing discipline,

                      focus, and self-defense.

                    </p>

                  </div>

                  <div className="space-y-1.5">

                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">

                      <Music className="w-4 h-4 text-[#164287]" />

                      <span>Dance</span>

                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">

                      Folk and contemporary choreography cultivating poise and

                      cultural expression.

                    </p>

                  </div>

                  <div className="space-y-1.5">

                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">

                      <Palette className="w-4 h-4 text-[#164287]" />

                      <span>Arts & Craft</span>

                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">

                      Drawing, painting, and sculpting studios inspiring

                      creative imagination.

                    </p>

                  </div>

                  <div className="space-y-1.5">

                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">

                      <Dribbble className="w-4 h-4 text-[#164287]" />

                      <span>Basketball</span>

                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">

                      Full-size court coaching that builds endurance, agility,

                      and team tactics.

                    </p>

                  </div>

                  <div className="space-y-1.5">

                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">

                      <Trophy className="w-4 h-4 text-[#164287]" />

                      <span>Futsal</span>

                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">

                      All-weather turf supporting active football drills and

                      teamwork.

                    </p>

                  </div>

                  <div className="space-y-1.5">

                    <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">

                      <Music className="w-4 h-4 text-[#164287]" />

                      <span>Music & Vocals</span>

                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">

                      Vocal and instrumental practice fostering rhythmic and

                      choral harmony.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/*==================================================

          9. PRE-SCHOOL WING

          ================================================== */}

      <section

        className="py-20 bg-[#fdfcfb] border-y border-slate-200"

        id="preschool-section"

      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-6 space-y-6">

              <div className="inline-flex items-center gap-2">

                <span className="w-5 h-[2px] bg-[#d91f26]" />

                <span className="text-xs font-semibold uppercase tracking-wider text-[#d91f26]">

                  Early Childhood Education

                </span>

              </div>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#164287] leading-tight">

                Vaidik Pre-School Wing

              </h2>

              <p className="text-slate-700 text-base leading-relaxed">

                The foundation of a child’s lifelong relationship with learning

                begins in their earliest years. Our Pre-School Wing provides a

                warm, safe, and cheerful atmosphere where curiosity is gently

                guided through play-based discovery and social engagement.

              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

                <div className="p-4 bg-white border border-slate-200 rounded">

                  <h4 className="font-semibold text-sm text-slate-900 mb-1 flex items-center gap-1.5">

                    <CheckCircle2 className="w-4 h-4 text-[#164287]" />

                    Learning Approach

                  </h4>

                  <p className="text-xs text-slate-600">

                    Montessori-inspired sensorial tools, phonics readiness, and

                    storytelling.

                  </p>

                </div>

                <div className="p-4 bg-white border border-slate-200 rounded">

                  <h4 className="font-semibold text-sm text-slate-900 mb-1 flex items-center gap-1.5">

                    <ShieldCheck className="w-4 h-4 text-[#d91f26]" />

                    Safe Environment

                  </h4>

                  <p className="text-xs text-slate-600">

                    Child-proofed soft flooring, hygienic play areas, and

                    attentive caregivers.

                  </p>

                </div>

              </div>

              <div className="pt-2">

                <a

                  id="preschool-explore-btn"

                  href="https\://eurostarschool.edu.np/"

                  target="_blank"

                  rel="noopener noreferrer"

                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#164287] hover:text-[#d91f26] transition-colors cursor-pointer group"

                >

                  <span>

                    Explore Pre-School Wing Curriculum & Facilities

                  </span>

                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

                </a>

              </div>

            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">

              <div className="aspect-4/5 rounded overflow-hidden border border-slate-200 shadow-xs bg-slate-100">

                <img

                  src="eurostar.jpg"

                  alt="Young children engaged in sensory learning at Vaidik Pre-School Wing"

                  className="w-full h-full object-cover"

                />

              </div>

              <div className="aspect-4/5 rounded overflow-hidden border border-slate-200 shadow-xs bg-slate-100 mt-6">

                <img

                  src="euro.jpg"

                  alt="Classroom play and discovery at Vaidik Pre-School"

                  className="w-full h-full object-cover"

                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/*==================================================

          10. SCHOOL EVENTS

          ================================================== */}

      <section

        className="py-20 md:py-24 bg-white"

        id="events-section"

      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">

            <SectionHeader

              eyebrow="School Life"

              title="School Events"

              description="Moments that bring our school community together."

              className="mb-0"

            />

            <button

              id="view-all-events-btn"

              onClick={() => onNavigate('events')}

              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#164287] hover:text-[#d91f26] transition-colors cursor-pointer group shrink-0"

            >

              <span>View All Events</span>

              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

            </button>

          </div>

          <div className="mb-7 flex flex-wrap items-center gap-2" role="group" aria-label="Filter homepage events">
            <button type="button" onClick={() => setHomeEventTab('upcoming')} aria-pressed={homeEventTab === 'upcoming'}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${homeEventTab === 'upcoming' ? 'border-[#164287] bg-[#164287] text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-blue-50'}`}>
              <CalendarCheck2 className="h-4 w-4" /> Upcoming <span className="text-xs opacity-75">({upcoming.length})</span>
            </button>
            <button type="button" onClick={() => setHomeEventTab('ongoing')} aria-pressed={homeEventTab === 'ongoing'}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${homeEventTab === 'ongoing' ? 'border-[#164287] bg-[#164287] text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-blue-50'}`}>
              <CalendarDays className="h-4 w-4" /> Ongoing <span className="text-xs opacity-75">({ongoing.length})</span>
            </button>
            <button type="button" onClick={() => setHomeEventTab('past')} aria-pressed={homeEventTab === 'past'}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${homeEventTab === 'past' ? 'border-[#164287] bg-[#164287] text-white' : 'border-slate-200 bg-white text-slate-700 hover:bg-blue-50'}`}>
              <History className="h-4 w-4" /> Past Events <span className="text-xs opacity-75">({past.length})</span>
            </button>
          </div>

          {featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {featuredEvents.map((event) => (
                <HomeEventCard
                  key={event.id}
                  event={event}
                  status={eventStatus(event, today)}
                  onSelect={onSelectEvent}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-blue-100 bg-[#f7faff] px-6 py-12 text-center">
              <CalendarDays className="mx-auto h-9 w-9 text-[#164287]" />
              <h3 className="mt-3 font-serif text-xl font-bold text-[#164287]">
                {homeEventTab === 'upcoming' ? 'No Upcoming Events' : homeEventTab === 'ongoing' ? 'No Ongoing Events' : 'No Past Events Yet'}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {homeEventTab === 'upcoming'
                  ? 'New school activities will be announced here.'
                  : homeEventTab === 'ongoing' ? 'There are no activities taking place today.'
                    : 'Previous school events will appear here.'}
              </p>
              <button type="button" onClick={() => onNavigate('events')} className="mt-4 text-sm font-semibold text-[#164287] hover:underline">
                Explore All School Events
              </button>
            </div>
          )}

        </div>

      </section>

      {/*==================================================

          11. PHOTO GALLERY

          ================================================== */}

      <section

        className="py-20 bg-slate-50 border-t border-slate-200"

        id="gallery-section"

      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">

            <SectionHeader

              eyebrow="Gallery"

              title="Life at Vaidik"

              description="Snapshots of classroom discovery, sports tournaments, arts, and vibrant celebrations at our Gothatar School."

              className="mb-0"

            />

            <button

              id="view-full-gallery-btn"

              onClick={() => onNavigate('gallery')}

              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#164287] hover:text-[#d91f26] transition-colors cursor-pointer group shrink-0"

            >

              <span>View Full Photo Gallery</span>

              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

            </button>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

            {homepageGallery.map((photo) => (

              <div

                key={photo.id}

                onClick={() => onSelectPhoto(photo)}

                className="group relative aspect-4/3 rounded-sm overflow-hidden bg-slate-200 border border-slate-300/80 cursor-pointer shadow-xs"

              >

                <img

                  src={photo.image}

                  alt={photo.title}

                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"

                  loading="lazy"

                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">

                  <span className="text-[10px] uppercase font-semibold text-red-300 tracking-wider">

                    {photo.category}

                  </span>

                  <p className="text-sm font-serif font-bold text-white leading-tight">

                    {photo.title}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/*==================================================

          14. CONTACT & MAP

          ================================================== */}

      <section

        className="py-20 bg-white border-t border-slate-200"

        id="contact-section"

      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            <div className="lg:col-span-5 space-y-6">

              <SectionHeader

                eyebrow="School Location"

                title="Contact Vaidik Vidyapeeth"

                description="We welcome parents, guardians, and prospective students to visit our School in Gothatar."

                className="mb-6"

              />

              <div className="space-y-4 text-sm text-slate-700">

                <div className="p-4 bg-slate-50 border border-slate-200 rounded flex items-start gap-3">

                  <MapPin className="w-5 h-5 text-[#d91f26] shrink-0 mt-0.5" />

                  <div>

                    <strong className="block text-slate-900 font-serif">

                      Vaidik Vidyapeeth

                    </strong>

                    <span>{SCHOOL_INFO.location}</span>

                    <p className="text-xs text-slate-500 mt-0.5">

                      Kageshwori Manohara Municipality, Kathmandu, Nepal

                    </p>

                  </div>

                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded flex items-start gap-3">

                  <Phone className="w-5 h-5 text-[#164287] shrink-0 mt-0.5" />

                  <div>

                    <strong className="block text-slate-900">

                      Telephone & Mobile

                    </strong>

                    <span>{SCHOOL_INFO.phone}</span>

                    <span className="block text-slate-500 text-xs">

                      {SCHOOL_INFO.secondaryPhone}

                    </span>

                  </div>

                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded flex items-start gap-3">

                  <Mail className="w-5 h-5 text-[#164287] shrink-0 mt-0.5" />

                  <div>

                    <strong className="block text-slate-900">

                      Email Address

                    </strong>

                    <span>{SCHOOL_INFO.email}</span>

                  </div>

                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded flex items-start gap-3">

                  <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />

                  <div>

                    <strong className="block text-slate-900">

                      School Office Hours

                    </strong>

                    <span>{SCHOOL_INFO.officeHours}</span>

                  </div>

                </div>

              </div>

            </div>

            <div className="lg:col-span-7">

              <GoogleMapSection />

            </div>

          </div>

        </div>

      </section>

    </div>

  );

};