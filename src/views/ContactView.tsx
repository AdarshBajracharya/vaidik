import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { GoogleMapSection } from '../components/GoogleMapSection';
import { EnquiryForm } from '../components/EnquiryForm';
import { SCHOOL_INFO } from '../data/schoolData';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';

export const ContactView: React.FC = () => {
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
                  School Communication
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-[#164287]">
                Contact Vaidik
                <span className="block mt-1 text-[#c62828]">
                  Vidyapeeth
                </span>
              </h1>

              <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                We welcome prospective families, existing parents,
                and community members to connect with our administrative
                and academic team in Gothatar, Kathmandu.
              </p>

              <div className="mt-6 flex items-center gap-2">
                <span className="h-1 w-10 rounded-full bg-[#164287]" />
                <span className="h-1 w-5 rounded-full bg-[#d91f26]" />
              </div>
            </div>

            {/* RIGHT: Communication highlights */}
            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <div className="w-full max-w-sm rounded-2xl border border-blue-100 bg-white/80 p-6 shadow-sm backdrop-blur-sm">

                <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#c62828]">
                  How We Can Help
                </p>

                {[
                  "Admissions & Enquiries",
                  "Parent Communication",
                  "Academic Information",
                  "School Visits & Appointments",
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


      {/* Main Contact Details + Map */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <SectionHeader
                eyebrow="School Office"
                title="School Contact Details"
                className="mb-4"
              />

              <div className="space-y-4">
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#d91f26] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-serif font-bold text-blue-900 text-base">School Location</h4>
                      <p className="text-sm font-medium text-slate-800 mt-1">{SCHOOL_INFO.name}</p>
                      <p className="text-xs text-slate-600">{SCHOOL_INFO.location}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Kageshwori Manohara Municipality, Kathmandu, Nepal</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm">
                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-[#164287] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-serif font-bold text-blue-900 text-base">Telephone & Mobile</h4>
                      <p className="text-sm font-medium text-slate-800 mt-1">{SCHOOL_INFO.phone}</p>
                      <p className="text-xs text-slate-500">{SCHOOL_INFO.secondaryPhone}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm">
                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-[#164287] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-serif font-bold text-blue-900 text-base">Email Enquiries</h4>
                      <p className="text-sm font-medium text-slate-800 mt-1">{SCHOOL_INFO.email}</p>
                      {/* <p className="text-xs text-slate-500">Admissions: {SCHOOL_INFO.admissionsEmail}</p> */}
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm">
                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-serif font-bold text-blue-900 text-base">Office Visiting Hours</h4>
                      <p className="text-xs sm:text-sm text-slate-700 mt-1">{SCHOOL_INFO.officeHours}</p>
                      <p className="text-xs text-slate-500 mt-0.5">Classes run 9:00 AM – 3:45 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-7 space-y-4">
              <SectionHeader
                eyebrow="School Map"
                title="Location in Gothatar"
                className="mb-4"
              />
              <GoogleMapSection />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
