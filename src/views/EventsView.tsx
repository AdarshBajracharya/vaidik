import React, { useState } from 'react';
import { EventItem } from '../types';
import { SectionHeader } from '../components/SectionHeader';
import { EventCard } from '../components/EventCard';
import { EVENTS_DATA } from '../data/schoolData';
import { Calendar, Filter, Search } from 'lucide-react';

interface EventsViewProps {
  onSelectEvent: (event: EventItem) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ onSelectEvent }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Academic', 'Sports', 'Cultural', 'Activities'];

  const filteredEvents = EVENTS_DATA.filter((event) => {
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
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#d91f26]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                School Calendar & Gatherings
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              School Events
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Moments that bring our school community together—celebrating academic discovery, athletic achievement, cultural celebrations, and arts.
            </p>
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
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
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
