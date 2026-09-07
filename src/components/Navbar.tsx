import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { PageId } from '../types';
import { Menu, Phone, Mail, MapPin, X } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenEnquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenEnquiry,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'academics', label: 'Academics' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Utility Bar - Clean, Minimal Academic Header */}
      <div className="bg-[#0b1a30] text-slate-300 text-xs hidden lg:block border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#d91f26]" />
              {SCHOOL_INFO.location}
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-[#164287] text-blue-400" />
              {SCHOOL_INFO.phone}
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {SCHOOL_INFO.email}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-slate-400">Office Hours: {SCHOOL_INFO.officeHours}</span>
            <button
              onClick={() => handleNavClick('principal')}
              className="text-xs hover:text-white transition-colors cursor-pointer pl-2 border-l border-slate-700"
            >
              Principal's Desk
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${
          isScrolled ? 'shadow-md border-b border-slate-200' : 'border-b border-slate-100'
        }`}
        id="main-navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Logo
            size="md"
            onClick={() => handleNavClick('home')}
            className="py-1 cursor-pointer"
          />

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-2 text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#164287] font-semibold'
                      : 'text-slate-700 hover:text-[#164287]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d91f26] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="header-enquire-cta"
              onClick={onOpenEnquiry}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md bg-[#164287] text-white hover:bg-[#0f2e60] active:scale-[0.98] transition-all duration-200 shadow-sm border border-transparent cursor-pointer"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onOpenEnquiry}
              className="px-3 py-1.5 text-xs font-medium rounded bg-[#164287] text-white cursor-pointer sm:hidden"
            >
              Enquire
            </button>
            <button
              id="mobile-menu-trigger"
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2.5 rounded-md text-slate-700 hover:text-[#164287] hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Left-Side Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Left Drawer */}
          <aside
            id="mobile-drawer"
            className="relative z-10 w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-out"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <Logo size="sm" onClick={() => handleNavClick('home')} />
              <button
                id="close-drawer-btn"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="px-4 py-4 flex-1">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium rounded-md transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-blue-50/80 text-[#164287] font-semibold border-l-3 border-[#d91f26]'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#164287]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#d91f26]" />}
                    </button>
                  );
                })}

                <button
                  onClick={() => handleNavClick('principal')}
                  className={`flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    currentPage === 'principal'
                      ? 'bg-blue-50/80 text-[#164287] font-semibold border-l-3 border-[#d91f26]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#164287]'
                  }`}
                >
                  <span>Principal's Message</span>
                </button>

                <button
                  onClick={() => handleNavClick('preschool')}
                  className={`flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    currentPage === 'preschool'
                      ? 'bg-blue-50/80 text-[#164287] font-semibold border-l-3 border-[#d91f26]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#164287]'
                  }`}
                >
                  <span>Pre-School Wing</span>
                </button>
              </nav>

              {/* Drawer CTA */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  id="drawer-enquire-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenEnquiry();
                  }}
                  className="w-full py-3 px-4 text-center rounded-md bg-[#164287] text-white font-medium text-sm hover:bg-[#0f2e60] transition-colors shadow-sm cursor-pointer"
                >
                  Enquire Now
                </button>
              </div>
            </div>

            {/* Basic School Contact Information at bottom */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 space-y-2">
              <p className="font-semibold text-slate-800">{SCHOOL_INFO.name}</p>
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#d91f26] shrink-0 mt-0.5" />
                <span>{SCHOOL_INFO.location}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#164287] shrink-0" />
                <span>{SCHOOL_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{SCHOOL_INFO.email}</span>
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
