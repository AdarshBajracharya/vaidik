import React from 'react';
import { EventItem } from '../types';
import { X, Calendar, MapPin, Clock, Tag } from 'lucide-react';

interface EventModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        id="event-detail-modal"
        className="relative bg-white rounded-md shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 border border-slate-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-slate-700 hover:bg-white hover:text-slate-900 shadow-sm transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Photo */}
        <div className="relative aspect-16/9 bg-slate-100 overflow-hidden">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-4">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded bg-[#164287] text-white">
              {event.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 mb-2">
              <span className="flex items-center gap-1.5 font-medium text-[#d91f26]">
                <Calendar className="w-4 h-4" />
                {event.date}
              </span>
              {event.time && (
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {event.time}
                </span>
              )}
              {event.location && (
                <span className="flex items-center gap-1.5 text-slate-600">
                  <MapPin className="w-4 h-4 text-[#164287]" />
                  {event.location}
                </span>
              )}
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              {event.title}
            </h2>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
            <p className="font-medium text-slate-800">
              {event.summary}
            </p>
            <p>
              {event.fullDescription}
            </p>
          </div>

          {/* Photo Gallery if available */}
          {event.gallery && event.gallery.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#d91f26]" />
                Event Moments
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                {event.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-4/3 rounded overflow-hidden bg-slate-100 border border-slate-200">
                    <img
                      src={img}
                      alt={`${event.title} highlight ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium rounded border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
