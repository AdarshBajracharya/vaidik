
import React, { useEffect, useState } from 'react';
import type { EventItem } from '../types';
import {
  X,
  CalendarDays,
  MapPin,
  Clock3,
  Images,
  BookOpen,
  Trophy,
  Palette,
  Sparkles,
  CalendarCheck2,
} from 'lucide-react';

interface EventModalProps {
  event: EventItem | null;
  onClose: () => void;
}

type EventStatus = 'Upcoming' | 'Ongoing' | 'Past';

const categoryIcons: Record<string, React.ElementType> = {
  Academic: BookOpen,
  Sports: Trophy,
  Cultural: Palette,
  Activities: Sparkles,
};

const getDateKey = (value?: string | null) =>
  String(value || '').slice(0, 10);

const getTodayNepal = () => {
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

// Reads the optional end date stored in the existing time field.
// Examples:
// END:2026-12-04
// 10:00 AM | END:2026-12-04
const getEndDate = (event: EventItem): string => {
  const match = String(event.time || '').match(
    /(?:^|\|)\s*END:(\d{4}-\d{2}-\d{2})\s*(?:$|\|)/
  );

  return match ? match[1] : getDateKey(event.date);
};

const getEventTime = (event: EventItem): string =>
  String(event.time || '')
    .replace(/(?:^|\|)\s*END:\d{4}-\d{2}-\d{2}\s*(?=\||$)/g, '')
    .replace(/^\s*\|\s*|\s*\|\s*$/g, '')
    .trim();

const formatDate = (value: string) => {
  const key = getDateKey(value);
  const date = new Date(`${key}T12:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return value || 'Date to be announced';
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
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

  const startDate = new Date(`${start}T12:00:00Z`);
  const endDate = new Date(`${end}T12:00:00Z`);

  if (
    !Number.isNaN(startDate.getTime()) &&
    !Number.isNaN(endDate.getTime()) &&
    start.slice(0, 7) === end.slice(0, 7)
  ) {
    const month = startDate.toLocaleDateString('en-US', {
      month: 'long',
      timeZone: 'UTC',
    });

    return `${month} ${startDate.getUTCDate()}–${endDate.getUTCDate()}, ${startDate.getUTCFullYear()}`;
  }

  return `${formatDate(start)} – ${formatDate(end)}`;
};

const getEventStatus = (event: EventItem): EventStatus => {
  const today = getTodayNepal();
  const start = getDateKey(event.date);
  const end = getEndDate(event);

  if (today < start) return 'Upcoming';
  if (today > end) return 'Past';

  return 'Ongoing';
};

const statusStyles: Record<EventStatus, string> = {
  Upcoming: 'bg-blue-50 text-[#164287] border-blue-100',
  Ongoing: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Past: 'bg-slate-100 text-slate-600 border-slate-200',
};

export const EventModal: React.FC<EventModalProps> = ({
  event,
  onClose,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [event?.id, event?.coverImage]);

  useEffect(() => {
    if (!event) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [event, onClose]);

  if (!event) return null;

  const hasImage = Boolean(
    event.coverImage?.trim() && !imageFailed
  );

  const CategoryIcon =
    categoryIcons[event.category] || CalendarCheck2;

  const status = getEventStatus(event);
  const eventTime = getEventTime(event);

  const summary = (event.summary || '').trim();
  const description = (event.fullDescription || '').trim();

  const showDescription =
    description &&
    description.toLowerCase() !== summary.toLowerCase();

  const gallery = (event.gallery || []).filter(Boolean);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      role="presentation"
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-[#102b55]/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* MODAL */}
      <div
        id="event-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-modal-title"
        className="relative z-10 flex max-h-[90dvh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
      >
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-sm transition-colors hover:bg-slate-100 hover:text-[#164287]"
          aria-label="Close event details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-y-auto">

          {/* IMAGE / NO-IMAGE HEADER */}
          {hasImage ? (
            <div className="relative h-48 overflow-hidden bg-slate-100 sm:h-64">
              <img
                src={event.coverImage}
                alt={event.title}
                className="h-full w-full object-cover"
                onError={() => setImageFailed(true)}
              />

              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#102b55]/40 to-transparent" />

              <span className="absolute bottom-4 left-5 rounded-md bg-[#164287] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm sm:left-7">
                {event.category}
              </span>
            </div>
          ) : (
            <div className="relative flex min-h-[145px] items-center gap-5 overflow-hidden border-b border-blue-100 bg-gradient-to-br from-[#f3f7ff] via-white to-[#e9f1ff] px-6 py-8 sm:px-8">
              <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border-[26px] border-blue-100/60" />

              <div className="absolute -bottom-12 right-16 h-32 w-32 rounded-full bg-red-50 blur-2xl" />

              <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-white text-[#164287] shadow-sm">
                <CategoryIcon className="h-8 w-8" />
              </div>

              <div className="relative z-10 pr-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#c62828]">
                  Vaidik Vidyapeeth
                </p>

                <p className="mt-1 font-serif text-xl font-bold text-[#164287] sm:text-2xl">
                  {event.category} Event
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  School Events & Activities
                </p>
              </div>
            </div>
          )}

          {/* EVENT CONTENT */}
          <div className="px-5 py-6 sm:px-8 sm:py-7">

            {/* CATEGORY + STATUS */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[#164287] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                {event.category}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${statusStyles[status]}`}
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
                {status === 'Past' ? 'Past Event' : status}
              </span>
            </div>

            {/* TITLE */}
            <h2
              id="event-modal-title"
              className="font-serif text-2xl font-bold leading-tight text-[#164287] sm:text-3xl"
            >
              {event.title}
            </h2>

            {/* DATE / TIME / LOCATION */}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm text-slate-700">
              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#c62828]" />
                <span className="font-medium">
                  {formatEventDates(event)}
                </span>
              </div>

              {eventTime && (
                <div className="flex items-start gap-2">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-[#164287]" />
                  <span>{eventTime}</span>
                </div>
              )}

              {event.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#164287]" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            {/* DESCRIPTION */}
            {(summary || showDescription) && (
              <div className="mt-6 space-y-4">
                {summary && (
                  <p className="text-sm font-medium leading-7 text-slate-800 sm:text-base">
                    {summary}
                  </p>
                )}

                {showDescription && (
                  <p className="whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* PHOTO GALLERY */}
            {gallery.length > 0 && (
              <div className="mt-7 border-t border-slate-100 pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <Images className="h-4 w-4 text-[#c62828]" />

                  <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#164287]">
                    Event Moments
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {gallery.map((img, idx) => (
                    <div
                      key={`${img}-${idx}`}
                      className="aspect-[4/3] overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                    >
                      <img
                        src={img}
                        alt={`${event.title} highlight ${idx + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FOOTER */}
            <div className="mt-7 flex justify-end border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-[#164287] transition-colors hover:border-[#164287] hover:bg-blue-50"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
