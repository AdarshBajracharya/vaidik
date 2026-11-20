import React, { useState } from 'react';
import { GalleryPhoto } from '../types';
import { SectionHeader } from '../components/SectionHeader';
import { Image as ImageIcon, ZoomIn } from 'lucide-react';

interface GalleryViewProps {
  photos: GalleryPhoto[];
  onSelectPhoto: (photo: GalleryPhoto) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ photos, onSelectPhoto }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'School',
    'Classroom',
    'Events',
    'Sports',
    'Arts & Culture',
    'Pre-School',
  ];

  const filteredPhotos = photos.filter((photo) => {
    if (selectedCategory === 'All') return true;
    return photo.category === selectedCategory;
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
                  Visual Archive
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-[#164287]">
                School Photo{' '}
                <span className="text-[#c62828]">
                  Gallery
                </span>
              </h1>

              <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Experience the vibrant academic atmosphere, school life,
                athletic meets, and creative expressions at
                Vaidik Vidyapeeth, Gothatar.
              </p>

              <div className="mt-6 flex items-center gap-2">
                <span className="h-1 w-10 rounded-full bg-[#164287]" />
                <span className="h-1 w-5 rounded-full bg-[#d91f26]" />
              </div>
            </div>

            {/* RIGHT: Gallery highlights */}
            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <div className="w-full max-w-sm rounded-2xl border border-blue-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm">

                <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#c62828]">
                  Capturing School Life
                </p>

                {[
                  "Campus & Classroom",
                  "Events & Celebrations",
                  "Sports & Activities",
                  "Arts & Culture",
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
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
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
