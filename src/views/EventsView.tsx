

import React, { useMemo, useState } from 'react';

import type { EventItem } from '../types';

import {

  CalendarDays,

  Clock3,

  MapPin,

  Search,

  ArrowRight,

  CalendarCheck2,

  History,

  CalendarRange,

  BookOpen,

  Trophy,

  Palette,

  Sparkles,

  X,

} from 'lucide-react';



interface EventsViewProps {

  events: EventItem[];

  onSelectEvent: (event: EventItem) => void;

}



type EventPeriod = 'all' | 'upcoming' | 'ongoing' | 'past';



const categories = [

  'All',

  'Academic',

  'Sports',

  'Cultural',

  'Activities',

];



// Encoded in the existing time field; no database migration needed.
// Examples: END:2026-11-28 or 10:00 AM | END:2026-11-28
const getEndDate = (event: EventItem): string => {
  const match = (event.time || '').match(/(?:^|\|\s*)END:(\d{4}-\d{2}-\d{2})\s*$/i);
  const start = event.date.slice(0, 10);
  return match && match[1] >= start ? match[1] : start;
};

const getDisplayTime = (event: EventItem): string =>
  (event.time || '').replace(/\s*\|?\s*END:\d{4}-\d{2}-\d{2}\s*$/i, '').trim();

const getNepalToday = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kathmandu', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const part = (name: string) => parts.find((p) => p.type === name)?.value || '';
  return `${part('year')}-${part('month')}-${part('day')}`;
};

const getEventStatus = (event: EventItem, today: string = getNepalToday()) => {
  const start = event.date.slice(0, 10);
  const end = getEndDate(event);
  if (today < start) return 'Upcoming' as const;
  if (today > end) return 'Past' as const;
  return 'Ongoing' as const;
};

const formatEventDate = (event: EventItem) => {
  const start = formatDate(event.date);
  const end = getEndDate(event);
  return end !== event.date.slice(0, 10) ? `${start} – ${formatDate(end)}` : start;
};

const categoryIcons: Record<

  string,

 React.ElementType

> = {

  Academic: BookOpen,

  Sports: Trophy,

  Cultural: Palette,

  Activities: Sparkles,

};





const dateKey = (value: string) => {

  return String(value || '').slice(0, 10);

};



const todayKey = () => {

  const now = new Date();

  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, '0');

  const day = String(now.getDate()).padStart(2, '0');



  return `${year}-${month}-${day}`;

};



const formatDate = (value: string) => {

  const key = dateKey(value);

  const date = new Date(`${key}T12:00:00Z`);



  if (Number.isNaN(date.getTime())) {

    return value || 'Date to be announced';

  }



  return date.toLocaleDateString('en-US', {

    month: 'short',

    day: 'numeric',

    year: 'numeric',

    timeZone: 'UTC',

  });

};



const getDateParts = (value: string) => {

  const key = dateKey(value);

  const date = new Date(`${key}T12:00:00Z`);



  if (Number.isNaN(date.getTime())) {

    return { day: '--', month: 'TBA' };

  }



  return {

    day: date.toLocaleDateString('en-US', {

      day: '2-digit',

      timeZone: 'UTC',

    }),

    month: date.toLocaleDateString('en-US', {

      month: 'short',

      timeZone: 'UTC',

    }),

  };

};





interface SchoolEventCardProps {

  event: EventItem;

  status: 'Upcoming' | 'Ongoing' | 'Past';

  onSelectEvent: (event: EventItem) => void;

}



const SchoolEventCard: React.FC<SchoolEventCardProps> = ({

  event,

  status,

  onSelectEvent,

}) => {

  const [imageError, setImageError] = useState(false);



  const hasImage = Boolean(

    event.coverImage && event.coverImage.trim() && !imageError

  );



  const CategoryIcon =

    categoryIcons[event.category] || CalendarDays;



  const { day, month } = getDateParts(event.date);



  return (

    <button

      type="button"

      onClick={() => onSelectEvent(event)}

      className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164287] motion-reduce:transform-none"

    >


      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f0f5fc]">



        {hasImage ? (

          <img

            src={event.coverImage}

            alt={event.title}

            loading="lazy"

            onError={() => setImageError(true)}

            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"

          />

        ) : (

          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#f1f6ff] via-white to-[#e3edfc]">




            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full border-[24px] border-blue-100/50" />



            <div className="absolute -bottom-16 -left-12 h-40 w-40 rounded-full bg-blue-100/60 blur-2xl" />



            <div

              className="absolute inset-0 opacity-[0.04]"

              style={{

                backgroundImage:

                  'radial-gradient(#164287 1px, transparent 1px)',

                backgroundSize: '22px 22px',

              }}

            />




            <div className="relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-sm transition-transform duration-500 group-hover:scale-110 motion-reduce:transform-none">

              <CategoryIcon className="h-8 w-8 text-[#164287]" />

            </div>



            <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c62828]">

              Vaidik Vidyapeeth

            </span>



            <span className="relative z-10 mt-2 font-serif text-lg font-bold text-[#164287]">

              {event.category} Event

            </span>



            <div className="relative z-10 mt-4 flex items-center gap-2">

              <span className="h-[2px] w-8 bg-[#164287]" />

              <span className="h-[2px] w-4 bg-[#d91f26]" />

            </div>

          </div>

        )}




        <div className="absolute left-4 top-4 flex w-14 flex-col items-center overflow-hidden rounded-lg border border-slate-100 bg-white shadow-md">

          <span className="w-full bg-[#164287] py-1 text-center text-[10px] font-bold uppercase tracking-wider text-white">

            {month}

          </span>



          <span className="py-1.5 font-serif text-xl font-bold text-[#164287]">

            {day}

          </span>

        </div>




        <div className="absolute right-4 top-4">

          <span

            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold shadow-sm ${status === 'Past'

              ? 'border-slate-200 bg-white text-slate-600'

              : 'border-blue-100 bg-white text-[#164287]'

              }`}

          >

            <span

              className={`h-1.5 w-1.5 rounded-full ${status === 'Past' ? 'bg-slate-400' : status === 'Ongoing' ? 'bg-emerald-500' : 'bg-blue-500'

                }`}

            />

            {status === 'Past' ? 'Past Event' : status}

          </span>

        </div>

      </div>




      <div className="flex flex-1 flex-col p-5">



        <span className="mb-3 inline-flex w-fit items-center rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#164287]">

          {event.category}

        </span>



        <h3 className="font-serif text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#164287]">

          {event.title}

        </h3>



        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">

          {event.summary}

        </p>




        <div className="mt-5 space-y-2.5 border-t border-slate-100 pt-4">



          <div className="flex items-center gap-2 text-xs text-slate-600">

            <CalendarDays className="h-4 w-4 shrink-0 text-[#164287]" />

            <span>{formatEventDate(event)}</span>

          </div>



          {getDisplayTime(event) && (

            <div className="flex items-center gap-2 text-xs text-slate-600">

              <Clock3 className="h-4 w-4 shrink-0 text-[#164287]" />

              <span>{getDisplayTime(event)}</span>

            </div>

          )}



          {event.location && (

            <div className="flex items-center gap-2 text-xs text-slate-600">

              <MapPin className="h-4 w-4 shrink-0 text-[#d91f26]" />

              <span>{event.location}</span>

            </div>

          )}

        </div>




        <div className="mt-auto flex items-center justify-between pt-5">

          <span className="text-sm font-semibold text-[#164287]">

            View Event Details

          </span>



          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-[#164287] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#164287] group-hover:text-white motion-reduce:transform-none">

            <ArrowRight className="h-4 w-4" />

          </span>

        </div>

      </div>

    </button>

  );

};





export const EventsView: React.FC<EventsViewProps> = ({

  events,

  onSelectEvent,

}) => {

  const [selectedCategory, setSelectedCategory] =

    useState<string>('All');



  const [searchQuery, setSearchQuery] = useState('');

  const [selectedPeriod, setSelectedPeriod] =

    useState<EventPeriod>('all');



  const today = getNepalToday();





const sortedEvents = useMemo(() => {

    return [...events].sort((a, b) =>

      dateKey(b.date).localeCompare(dateKey(a.date))

    );

  }, [events]);



  const upcomingEvents = sortedEvents
    .filter((event) => getEventStatus(event, today) === 'Upcoming')
    .sort((a, b) => dateKey(a.date).localeCompare(dateKey(b.date)));
  const ongoingEvents = sortedEvents
    .filter((event) => getEventStatus(event, today) === 'Ongoing')
    .sort((a, b) => dateKey(a.date).localeCompare(dateKey(b.date)));
  const pastEvents = sortedEvents.filter(
    (event) => getEventStatus(event, today) === 'Past'
  );

const filteredEvents = (

    selectedPeriod === 'upcoming'

      ? upcomingEvents

      : selectedPeriod === 'ongoing'
        ? ongoingEvents

      : selectedPeriod === 'past'

        ? pastEvents

        : [...ongoingEvents, ...upcomingEvents, ...pastEvents]

  ).filter((event) => {

    const matchesCategory =

      selectedCategory === 'All' ||

      event.category === selectedCategory;



    const query = searchQuery.toLowerCase().trim();



    const matchesSearch =

      !query ||

      event.title.toLowerCase().includes(query) ||

      event.summary.toLowerCase().includes(query) ||

      (event.location || '').toLowerCase().includes(query);



    return matchesCategory && matchesSearch;

  });



  const periodTabs = [

    {

      id: 'all' as EventPeriod,

      label: 'All Events',

      count: events.length,

      icon: CalendarRange,

    },

    {

      id: 'upcoming' as EventPeriod,

      label: 'Upcoming',

      count: upcomingEvents.length,

      icon: CalendarCheck2,

    },

    {
      id: 'ongoing' as EventPeriod,
      label: 'Ongoing',
      count: ongoingEvents.length,
      icon: Clock3,
    },
    {

      id: 'past' as EventPeriod,

      label: 'Past Events',

      count: pastEvents.length,

      icon: History,

    },

  ];



  return (

    <div className="w-full bg-white">






      <section className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-[#f4f8ff] via-white to-[#eaf2ff]">



        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />



        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-red-50/60 blur-3xl" />



        <div

          className="pointer-events-none absolute inset-0 opacity-[0.03]"

          style={{

            backgroundImage:

              'linear-gradient(#164287 1px, transparent 1px), linear-gradient(90deg, #164287 1px, transparent 1px)',

            backgroundSize: '45px 45px',

          }}

        />



        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-12 lg:px-8">



          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">




            <div className="lg:col-span-7">



              <div className="mb-4 inline-flex items-center gap-3">

                <span className="h-[2px] w-6 bg-[#d91f26]" />



                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#164287]">

                  School Calendar & Gatherings

                </span>

              </div>



              <h1 className="font-serif text-3xl font-bold leading-tight tracking-tight text-[#164287] sm:text-4xl md:text-5xl">

                School{' '}

                <span className="text-[#c62828]">

                  Events

                </span>

              </h1>



              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">

                Moments that bring our school community

                together—celebrating academic discovery,

                athletic achievement, cultural celebrations,

                and arts.

              </p>



              <div className="mt-6 flex items-center gap-2">

                <span className="h-1 w-10 rounded-full bg-[#164287]" />

                <span className="h-1 w-5 rounded-full bg-[#d91f26]" />

              </div>

            </div>




            <div className="hidden justify-end lg:col-span-5 lg:flex">



              <div className="w-full max-w-sm rounded-2xl border border-blue-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm">



                <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#c62828]">

                  Life Beyond the Classroom

                </p>



                {[

                  'Academic Activities',

                  'Sports & Competitions',

                  'Cultural Celebrations',

                  'Arts & Performances',

                ].map((item, index) => (

                  <div

                    key={item}

                    className={`flex items-center gap-4 py-2.5 ${index !== 3

                      ? 'border-b border-slate-100'

                      : ''

                      }`}

                  >

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xs font-semibold text-[#164287]">

                      {String(index + 1).padStart(2, '0')}

                    </span>



                    <span className="text-sm font-medium text-slate-700">

                      {item}

                    </span>

                  </div>

                ))}



              </div>

            </div>



          </div>

        </div>

      </section>






      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">



          <div className="flex gap-2 overflow-x-auto py-4 sm:gap-3">



            {periodTabs.map((tab) => {

              const active = selectedPeriod === tab.id;

              const Icon = tab.icon;



              return (

                <button

                  key={tab.id}

                  type="button"

                  onClick={() => setSelectedPeriod(tab.id)}

                  aria-pressed={active}

                  className={`flex shrink-0 items-center gap-2 rounded-lg border px-4 py-3 text-xs font-semibold transition-all sm:text-sm ${active

                    ? 'border-[#164287] bg-[#164287] text-white shadow-sm'

                    : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50'

                    }`}

                >

                  <Icon className="h-4 w-4" />



                  {tab.label}



                  <span

                    className={`rounded-md px-2 py-0.5 text-[11px] ${active

                      ? 'bg-white/20 text-white'

                      : 'bg-slate-100 text-slate-600'

                      }`}

                  >

                    {tab.count}

                  </span>

                </button>

              );

            })}



          </div>



        </div>

      </section>






      <section className="sticky top-20 z-20 border-b border-slate-200 bg-slate-50/95 py-4 shadow-sm backdrop-blur-md">



        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">




          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">



            {categories.map((cat) => {

              const active = selectedCategory === cat;



              return (

                <button

                  key={cat}

                  type="button"

                  onClick={() => setSelectedCategory(cat)}

                  aria-pressed={active}

                  className={`shrink-0 whitespace-nowrap rounded-md px-4 py-2 text-xs font-medium transition-colors sm:text-sm ${active

                    ? 'bg-[#164287] text-white'

                    : 'border border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50'

                    }`}

                >

                  {cat}

                </button>

              );

            })}



          </div>




          <div className="relative w-full md:w-72">



            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />



            <input

              type="search"

              value={searchQuery}

              onChange={(e) => setSearchQuery(e.target.value)}

              placeholder="Search school events..."

              aria-label="Search school events"

              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[#164287] focus:ring-2 focus:ring-blue-100"

            />



          </div>



        </div>

      </section>






      <section className="min-h-[350px] bg-white py-12 md:py-16">



        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">




          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">



            <div>

              <div className="mb-2 flex items-center gap-2">

                <span className="h-[2px] w-5 bg-[#d91f26]" />



                <span className="text-xs font-bold uppercase tracking-wider text-[#c62828]">

                  Discover School Life

                </span>

              </div>



              <h2 className="font-serif text-2xl font-bold text-[#164287] sm:text-3xl">

                {selectedPeriod === 'upcoming'

                  ? 'Upcoming Events'
                  : selectedPeriod === 'ongoing' ? 'Ongoing Events'

                  : selectedPeriod === 'past'

                    ? 'Past Events'

                    : 'All School Events'}

              </h2>



              <p className="mt-2 text-sm text-slate-500">

                {selectedPeriod === 'upcoming'

                  ? 'Explore events and activities coming up at our school.'
                  : selectedPeriod === 'ongoing' ? 'Events taking place at our school now.'

                  : selectedPeriod === 'past'

                    ? 'Look back at important moments and celebrations.'

                    : 'Explore upcoming activities and memorable school moments.'}

              </p>

            </div>



            <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-[#164287]">

              {filteredEvents.length}{' '}

              {filteredEvents.length === 1

                ? 'Event'

                : 'Events'}

            </span>



          </div>




          {filteredEvents.length > 0 ? (

            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">



              {filteredEvents.map((event) => (

                <SchoolEventCard

                  key={event.id}

                  event={event}

                  status={getEventStatus(event, today)}

                  onSelectEvent={onSelectEvent}

                />

              ))}



            </div>

          ) : (

            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-[#f8fbff] to-white px-6 py-16 text-center">



              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-white shadow-sm">

                <CalendarDays className="h-8 w-8 text-[#164287]" />

              </div>



              <h3 className="font-serif text-xl font-bold text-[#164287]">

                {selectedPeriod === 'upcoming'

                  ? 'No Upcoming Events'
                  : selectedPeriod === 'ongoing' ? 'No Ongoing Events'

                  : selectedPeriod === 'past'

                    ? 'No Past Events Found'

                    : 'No Events Found'}

              </h3>



              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-600">

                {searchQuery || selectedCategory !== 'All'

                  ? 'No events match your current search or category. Try adjusting your filters.'

                  : selectedPeriod === 'upcoming'

                    ? 'There are no upcoming events announced at the moment. Check back for new school activities.'
                    : selectedPeriod === 'ongoing' ? 'There are no events taking place today.'

                    : selectedPeriod === 'past'

                      ? 'There are no past events available yet.'

                      : 'School events and activities will appear here once they are published.'}

              </p>



              <button

                type="button"

                onClick={() => {

                  setSelectedCategory('All');

                  setSearchQuery('');

                  setSelectedPeriod('all');

                }}

                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#164287] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#10346c]"

              >

                <X className="h-4 w-4" />

                View All Events

              </button>



            </div>

          )}



        </div>

      </section>



    </div>

  );

};