import React from 'react';
import { EventItem } from '../types';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  onReadMore: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onReadMore }) => {
  return (
    <article
      id={`event-card-${event.id}`}
      className="bg-white border border-slate-200 rounded-md overflow-hidden flex flex-col transition-all duration-300 hover:border-slate-300 hover:shadow-sm"
    >
      {/* Event Image */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase rounded bg-[#164287] text-white shadow-xs">
            {event.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Date & Location */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-2.5">
            <span className="flex items-center gap-1 font-medium text-[#d91f26]">
              <Calendar className="w-3.5 h-3.5" />
              {event.date}
            </span>
            {event.location && (
              <>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 truncate text-slate-600">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {event.location}
                </span>
              </>
            )}
          </div>

          <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug mb-2 hover:text-[#164287] transition-colors">
            {event.title}
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
            {event.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => onReadMore(event)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#164287] hover:text-[#d91f26] transition-colors cursor-pointer group"
          >
            <span>Read More</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};
