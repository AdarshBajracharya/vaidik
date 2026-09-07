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
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#d91f26]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                School Communication
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Contact Vaidik Vidyapeeth
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              We welcome prospective families, existing parents, and community members to connect with our administrative and academic team in Gothatar, Kathmandu.
            </p>
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
                eyebrow="Campus Office"
                title="School Contact Details"
                className="mb-4"
              />

              <div className="space-y-4">
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm">
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#d91f26] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-serif font-bold text-slate-900 text-base">Campus Location</h4>
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
                      <h4 className="font-serif font-bold text-slate-900 text-base">Telephone & Mobile</h4>
                      <p className="text-sm font-medium text-slate-800 mt-1">{SCHOOL_INFO.phone}</p>
                      <p className="text-xs text-slate-500">{SCHOOL_INFO.secondaryPhone}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm">
                  <div className="flex items-start gap-3.5">
                    <Mail className="w-5 h-5 text-[#164287] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-serif font-bold text-slate-900 text-base">Email Enquiries</h4>
                      <p className="text-sm font-medium text-slate-800 mt-1">{SCHOOL_INFO.email}</p>
                      <p className="text-xs text-slate-500">Admissions: {SCHOOL_INFO.admissionsEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-sm">
                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-slate-500 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-serif font-bold text-slate-900 text-base">Office Visiting Hours</h4>
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
                eyebrow="Campus Map"
                title="Location in Gothatar"
                className="mb-4"
              />
              <GoogleMapSection />
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Enquiry Form */}
      <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-200" id="contact-form">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            eyebrow="Direct Message"
            title="Send Us a Message"
            description="Whether inquiring about admission dates, bus routes, or general queries, please complete the form below."
          />
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
};
