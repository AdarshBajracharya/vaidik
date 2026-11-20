import React, { useState } from 'react';
import { EventItem } from '../types';
import { SectionHeader } from '../components/SectionHeader';
import { EventCard } from '../components/EventCard';
import { Calendar, Filter, Search } from 'lucide-react';

interface EventsViewProps {
  events: EventItem[];
  onSelectEvent: (event: EventItem) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ events, onSelectEvent }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Academic', 'Sports', 'Cultural', 'Activities'];

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-white">
      {/* Header Banner */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#f4f8ff] via-white to-[#eaf2ff] border-b border-blue-100">

        {/* Soft background decoration */}
        <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

        <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-red-50/60 blur-3xl pointer-events-none" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#164287 1px, transparent 1px), linear-gradient(90deg, #164287 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* LEFT: Heading and description */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-6 h-[2px] bg-[#d91f26]" />

                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#164287]">
                  School Calendar & Gatherings
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-[#164287]">
                School <span className="text-[#c62828]">Events</span>
              </h1>

              <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Moments that bring our school community together—celebrating
                academic discovery, athletic achievement, cultural
                celebrations, and arts.
              </p>

              <div className="mt-6 flex items-center gap-2">
                <span className="h-1 w-10 rounded-full bg-[#164287]" />
                <span className="h-1 w-5 rounded-full bg-[#d91f26]" />
              </div>
            </div>

            {/* RIGHT: Event categories */}
            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <div className="w-full max-w-sm rounded-2xl border border-blue-100 bg-white/75 p-6 shadow-sm backdrop-blur-sm">

                <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#c62828]">
                  Life Beyond the Classroom
                </p>

                {[
                  "Academic Activities",
                  "Sports & Competitions",
                  "Cultural Celebrations",
                  "Arts & Performances",
                ].map((item, index) => (
                  <div
                    key={item}
                    className={`flex items-center gap-4 py-2.5 ${index !== 3 ? "border-b border-slate-100" : ""
                      }`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-semibold text-xs text-[#164287]">
                      {String(index + 1).padStart(2, "0")}
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


      {/* Filter & Search Bar */}
      <section className="border-b border-slate-200 bg-slate-50 py-5 sticky top-20 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${isActive
                      ? 'bg-[#164287] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search school events..."
              className="w-full pl-9 pr-3.5 py-1.5 text-xs sm:text-sm rounded border border-slate-300 bg-white focus:outline-hidden focus:border-[#164287] focus:ring-1 focus:ring-[#164287]"
            />
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onReadMore={onSelectEvent}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-md">
              <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-slate-800">No Events Found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No events matched your current category and search criteria. Please choose a different category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-[#164287] hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
