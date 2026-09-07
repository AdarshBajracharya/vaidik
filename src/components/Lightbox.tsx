import React from 'react';
import { GalleryPhoto } from '../types';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  photo: GalleryPhoto | null;
  photos: GalleryPhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: GalleryPhoto) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photo,
  photos,
  onClose,
  onSelectPhoto,
}) => {
  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % photos.length;
    onSelectPhoto(photos[nextIndex]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
      id="gallery-lightbox"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      {photos.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer hidden sm:flex items-center justify-center"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next button */}
      {photos.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 z-20 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer hidden sm:flex items-center justify-center"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Container */}
      <div
        className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.image}
          alt={photo.title}
          className="max-h-[72vh] w-auto max-w-full object-contain rounded-sm shadow-2xl"
        />

        {/* Caption bar */}
        <div className="mt-4 text-center text-white max-w-2xl px-4">
          <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-[#d91f26] text-white mb-1.5">
            {photo.category}
          </span>
          <h3 className="font-serif text-lg font-bold">{photo.title}</h3>
          <p className="text-xs text-slate-300 mt-1">{photo.caption}</p>
          <p className="text-[11px] text-slate-400 mt-1">
            Photo {currentIndex + 1} of {photos.length}
          </p>
        </div>
      </div>
    </div>
  );
};
