import React, { useState } from 'react';
import { GalleryPhoto } from '../types';
import { GALLERY_PHOTOS } from '../data/schoolData';
import { SectionHeader } from '../components/SectionHeader';
import { Image as ImageIcon, ZoomIn } from 'lucide-react';

interface GalleryViewProps {
  onSelectPhoto: (photo: GalleryPhoto) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onSelectPhoto }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Campus',
    'Classroom',
    'Events',
    'Sports',
    'Arts & Culture',
    'Pre-School',
  ];

  const filteredPhotos = GALLERY_PHOTOS.filter((photo) => {
    if (selectedCategory === 'All') return true;
    return photo.category === selectedCategory;
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
                Visual Archive
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              School Photo Gallery
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Experience the vibrant academic atmosphere, campus life, athletic meets, and creative expressions at Vaidik Vidyapeeth, Gothatar.
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="border-b border-slate-200 bg-slate-50 py-4 sticky top-20 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
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
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className="group relative aspect-4/3 rounded-sm overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer shadow-xs"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                  <div className="flex justify-end">
                    <span className="p-1.5 rounded-full bg-white/20 backdrop-blur-xs text-white">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-red-300">
                      {photo.category}
                    </span>
                    <h3 className="font-serif font-bold text-sm leading-tight mt-0.5">
                      {photo.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-md">
              <ImageIcon className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-slate-800">No Photos Found</h3>
              <p className="text-xs text-slate-500 mt-1">Please choose another gallery category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
