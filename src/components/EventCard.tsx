
import React, { useState } from 'react';
import type { EventItem } from '../types';
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  BookOpen,
  Trophy,
  Palette,
  Sparkles,
  CalendarCheck2,
} from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  onReadMore: (event: EventItem) => void;
}

type EventStatus = 'Upcoming' | 'Ongoing' | 'Past';

const categoryIcons: Record<string, React.ElementType> = {
  Academic: BookOpen,
  Sports: Trophy,
  Cultural: Palette,
  Activities: Sparkles,
};

const getDateKey = (value?: string | null): string =>
  String(value || '').slice(0, 10);

const getTodayNepal = (): string => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kathmandu',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const part = (type: string) =>
    parts.find((item) => item.type === type)?.value || '';

  return `${part('year')}-${part('month')}-${part('day')}`;
};

// Supports END:2026-12-04 and 10:00 AM | END:2026-12-04.
const getEndDate = (event: EventItem): string => {
  const match = String(event.time || '').match(
    /(?:^|\|)\s*END:(\d{4}-\d{2}-\d{2})\s*(?:$|\|)/
  );

  return match ? match[1] : getDateKey(event.date);
};

const getEventStatus = (event: EventItem): EventStatus => {
  const today = getTodayNepal();
  const start = getDateKey(event.date);
  const end = getEndDate(event);

  if (today < start) return 'Upcoming';
  if (today > end) return 'Past';

  return 'Ongoing';
};

const formatDate = (value: string): string => {
  const key = getDateKey(value);
  const date = new Date(`${key}T12:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return value || 'Date TBA';
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

const formatEventDates = (event: EventItem): string => {
  const start = getDateKey(event.date);
  const end = getEndDate(event);

  if (start === end || end < start) {
    return formatDate(start);
  }

  return `${formatDate(start)} – ${formatDate(end)}`;
};

const statusClasses: Record<EventStatus, string> = {
  Upcoming: 'bg-blue-50 text-[#164287] border-blue-100',
  Ongoing: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Past: 'bg-slate-100 text-slate-600 border-slate-200',
};

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onReadMore,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  const hasImage = Boolean(
    event.coverImage?.trim() && !imageFailed
  );

  const CategoryIcon =
    categoryIcons[event.category] || CalendarCheck2;

  const status = getEventStatus(event);

  return (
    <article
      id={`event-card-${event.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg motion-reduce:transform-none"
    >
      {/* EVENT IMAGE OR PLACEHOLDER */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#f0f5fc]">
        {hasImage ? (
          <img
            src={event.coverImage}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#f1f6ff] via-white to-[#e4edfc]">
            {/* Decorative shapes */}
            <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full border-[22px] border-blue-100/50" />
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

            <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.18em] text-[#c62828]">
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

        {/* Category */}
        <div className="absolute left-3 top-3">
          <span className="rounded-md bg-[#164287] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            {event.category}
          </span>
        </div>

        {/* Status */}
        <div className="absolute right-3 top-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold shadow-sm ${statusClasses[status]}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                status === 'Ongoing'
                  ? 'bg-emerald-500'
                  : status === 'Upcoming'
                    ? 'bg-blue-500'
                    : 'bg-slate-400'
              }`}
            />
            {status}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex-1">
          {/* Event dates */}
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#c62828]">
              <CalendarDays className="h-4 w-4 shrink-0" />
              {formatEventDates(event)}
            </span>

            {event.location && (
              <span className="inline-flex min-w-0 items-center gap-1.5 text-slate-500">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="truncate">{event.location}</span>
              </span>
            )}
          </div>

          <h3 className="mb-3 font-serif text-lg font-bold leading-snug text-[#164287] sm:text-xl">
            {event.title}
          </h3>

          <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-slate-600">
            {event.summary}
          </p>
        </div>

        {/* READ MORE */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => onReadMore(event)}
            className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#164287] transition-colors hover:text-[#d91f26] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#164287]"
          >
            <span>View Event Details</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-[#164287] transition-colors group-hover:bg-[#164287] group-hover:text-white" aria-hidden="true">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </article>
  );
};
