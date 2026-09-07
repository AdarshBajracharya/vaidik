import React, { useState, useEffect } from 'react';
import { PageId, EventItem, GalleryPhoto } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EventModal } from './components/EventModal';
import { Lightbox } from './components/Lightbox';
import { GALLERY_PHOTOS } from './data/schoolData';

// Page Views
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { PrincipalView } from './views/PrincipalView';
import { AcademicsView } from './views/AcademicsView';
import { FacilitiesView } from './views/FacilitiesView';
import { PreSchoolView } from './views/PreSchoolView';
import { EventsView } from './views/EventsView';
import { GalleryView } from './views/GalleryView';
import { AdmissionsView } from './views/AdmissionsView';
import { ContactView } from './views/ContactView';
import { EnquiryForm } from './components/EnquiryForm';
import { X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Scroll to top on page navigation
  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEnquiry = () => {
    if (currentPage === 'home') {
      const elem = document.getElementById('enquiry-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    // Otherwise open the full modal or switch to admissions
    setIsEnquiryModalOpen(true);
  };

  // Render appropriate view
  const renderView = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomeView
            onNavigate={handleNavigate}
            onSelectEvent={(event) => setSelectedEvent(event)}
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
          />
        );
      case 'about':
        return <AboutView onNavigate={handleNavigate} />;
      case 'principal':
        return <PrincipalView onNavigate={handleNavigate} />;
      case 'academics':
        return (
          <AcademicsView
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        );
      case 'facilities':
        return (
          <FacilitiesView
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        );
      case 'preschool':
        return (
          <PreSchoolView
            onNavigate={handleNavigate}
            onOpenEnquiry={handleOpenEnquiry}
          />
        );
      case 'events':
        return <EventsView onSelectEvent={(event) => setSelectedEvent(event)} />;
      case 'gallery':
        return <GalleryView onSelectPhoto={(photo) => setSelectedPhoto(photo)} />;
      case 'admissions':
        return <AdmissionsView onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactView />;
      default:
        return (
          <HomeView
            onNavigate={handleNavigate}
            onSelectEvent={(event) => setSelectedEvent(event)}
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-[#164287] selection:text-white antialiased">
      {/* Sticky Top Header Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* Formal Dark-Blue Institutional Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {/* Event Details Dialog Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* Image Lightbox for Gallery */}
      <Lightbox
        photo={selectedPhoto}
        photos={GALLERY_PHOTOS}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
      />

      {/* Quick Global Enquiry Modal (if triggered outside pages with embedded forms) */}
      {isEnquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-slate-900/65 backdrop-blur-xs transition-opacity"
            onClick={() => setIsEnquiryModalOpen(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-md shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto z-10 border border-slate-200 p-2 sm:p-4">
            <button
              onClick={() => setIsEnquiryModalOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close enquiry modal"
            >
              <X className="w-5 h-5" />
            </button>
            <EnquiryForm
              compact
              onSuccess={() => setIsEnquiryModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
