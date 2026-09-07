import React from 'react';
import { SCHOOL_INFO } from '../data/schoolData';
import { MapPin, Navigation, Compass, ExternalLink } from 'lucide-react';

export const GoogleMapSection: React.FC = () => {
  // Google Maps search query URL directly targeting Gothatar, Kathmandu, Nepal
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=Vaidik+Vidyapeeth+Gothatar+Kathmandu+Nepal`;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-md overflow-hidden" id="school-location-map">
      {/* Top Header */}
      <div className="p-4 sm:p-5 bg-white border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-blue-50 text-[#164287] flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-[#d91f26]" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-slate-900 text-base">
              Vaidik Vidyapeeth Campus
            </h4>
            <p className="text-xs text-slate-600">
              Gothatar, Kathmandu, Nepal (Kageshwori Manohara)
            </p>
          </div>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded bg-[#164287] text-white hover:bg-[#0f2e60] transition-colors cursor-pointer w-fit"
          id="get-directions-btn"
        >
          <Navigation className="w-3.5 h-3.5 text-white" />
          <span>Get Directions</span>
          <ExternalLink className="w-3 h-3 text-slate-300" />
        </a>
      </div>

      {/* Clean Interactive Map Embed for Gothatar, Kathmandu */}
      <div className="relative w-full h-[320px] sm:h-[400px] bg-slate-200">
        <iframe
          title="Vaidik Vidyapeeth School Location in Gothatar Kathmandu Nepal"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=Gothatar%2C%20Kathmandu%2C%20Nepal&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full grayscale-[15%] contrast-[105%]"
        />

        {/* Floating Minimal Badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs border border-slate-200 rounded px-3 py-2 shadow-sm text-xs text-slate-700 hidden sm:flex items-center gap-2 pointer-events-none">
          <Compass className="w-4 h-4 text-[#164287]" />
          <span>
            <strong>Location:</strong> Gothatar, Kathmandu, Nepal
          </span>
        </div>
      </div>
    </div>
  );
};
