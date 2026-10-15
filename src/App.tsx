import React, { useState, useEffect } from 'react';
import { PageId, EventItem, GalleryPhoto } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EventModal } from './components/EventModal';
import { Lightbox } from './components/Lightbox';
import { schoolApi } from './lib/api';
import { AdminPanel } from './views/AdminPanel';

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
import {ChairmanView} from './views/ChairmanView';
import { X } from 'lucide-react';

export default function App() {
  const [events,setEvents] = useState<EventItem[]>([]);
  const [photos,setPhotos] = useState<GalleryPhoto[]>([]);
  const [contentError,setContentError] = useState('');
  const [loadingContent,setLoadingContent] = useState(true);
  useEffect(()=>{
    Promise.all([schoolApi.events(),schoolApi.gallery()])
      .then(([e,g])=>{setEvents(e);setPhotos(g);})
      .catch(err=>setContentError(err.message))
      .finally(()=>setLoadingContent(false));
  },[]);
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
            events={events}
            photos={photos}
            onNavigate={handleNavigate}
            onSelectEvent={(event) => setSelectedEvent(event)}
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
          />
        );
      case 'about':
        return <AboutView onNavigate={handleNavigate} />;
      case 'principal':
        return <PrincipalView onNavigate={handleNavigate} />;
      case 'chairman':
        return <ChairmanView onNavigate={handleNavigate} />;
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
        return <EventsView events={events} onSelectEvent={(event) => setSelectedEvent(event)} />;
      case 'gallery':
        return <GalleryView photos={photos} onSelectPhoto={(photo) => setSelectedPhoto(photo)} />;
      case 'admissions':
        return <AdmissionsView onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactView />;
      default:
        return (
          <HomeView
            events={events}
            photos={photos}
            onNavigate={handleNavigate}
            onSelectEvent={(event) => setSelectedEvent(event)}
            onSelectPhoto={(photo) => setSelectedPhoto(photo)}
          />
        );
    }
  };

  if (window.location.pathname.replace(/\/$/,'') === '/admin') return <AdminPanel />;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 font-sans selection:bg-[#164287] selection:text-white antialiased">
      {/* Sticky Top Header Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenEnquiry={handleOpenEnquiry}
      />

      {contentError && <div role="alert" className="text-center p-3 bg-red-50 text-red-700">Unable to load events and gallery: {contentError}</div>}
      {loadingContent && <div className="text-center text-sm py-2 bg-slate-50">Loading school updates…</div>}
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
        photos={photos}
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
