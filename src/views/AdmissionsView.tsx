import React from 'react';
import { PageId } from '../types';
import { SectionHeader } from '../components/SectionHeader';
import { EnquiryForm } from '../components/EnquiryForm';
import { SCHOOL_INFO } from '../data/schoolData';
import { FileText, CheckCircle2, Calendar, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

interface AdmissionsViewProps {
  onNavigate: (page: PageId) => void;
}

export const AdmissionsView: React.FC<AdmissionsViewProps> = ({ onNavigate }) => {
  const admissionSteps = [
    {
      step: '01',
      title: 'Enquiry & Campus Visit',
      desc: 'Submit our online enquiry form or visit our campus in Gothatar. Our admissions counselor will tour the facilities and discuss grade curriculum.',
    },
    {
      step: '02',
      title: 'Application & Student Interaction',
      desc: 'Complete the formal admission registration form. A friendly, age-appropriate assessment or interactive dialogue helps gauge foundational readiness.',
    },
    {
      step: '03',
      title: 'Documentation & Review',
      desc: 'Submit standard verified credentials (birth certificate, previous school transfer certificate and grade marksheets if applicable).',
    },
    {
      step: '04',
      title: 'Confirmation & Onboarding',
      desc: 'Upon admission confirmation, parents complete enrollment formalities and receive the school calendar, uniform guidelines, and orientation package.',
    },
  ];

  const requiredDocuments = [
    'Official Birth Certificate of the student (copy + original for verification)',
    'Transfer Certificate (TC) / Character Certificate from the previous school (for Grade 1 and above)',
    'Previous academic year marksheets and progress reports',
    'Two recent passport-sized color photographs of the student',
    'One passport-sized photograph of parent / legal guardian',
    'Valid citizenship or identification photocopy of parent / guardian',
  ];

  return (
    <div className="w-full bg-white">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[2px] bg-[#d91f26]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-red-400">
                Enrollment & Registration
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Admissions at Vaidik
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Begin your child's educational journey in an inspiring, safe, and academically disciplined community in Gothatar, Kathmandu.
            </p>
          </div>
        </div>
      </section>

      {/* Admissions Procedure Steps */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Step-by-Step"
            title="Admissions Procedure"
            description="Our admissions process is designed to be transparent, respectful, and informative for both parents and prospective learners."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            {admissionSteps.map((s, idx) => (
              <div key={idx} className="p-6 bg-slate-50 border border-slate-200 rounded-sm space-y-3">
                <span className="text-2xl font-serif font-bold text-[#164287]">
                  {s.step}
                </span>
                <h3 className="font-serif font-bold text-lg text-slate-900">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documentation */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <SectionHeader
                eyebrow="Checklist"
                title="Required Admission Documents"
                className="mb-4"
              />
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Parents are requested to bring original documents along with photocopies during the campus interaction for prompt verification.
              </p>
              <div className="space-y-3 pt-2">
                {requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#164287] shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-8 bg-white border border-slate-200 rounded-sm space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#164287]">
                  Admissions Office & Inquiries
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  For grade placement queries, transportation coverage across Gothatar, or scheduling a weekday campus tour, please reach out directly:
                </p>
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#d91f26]" />
                    <span>Vaidik Vidyapeeth, {SCHOOL_INFO.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#164287]" />
                    <span>{SCHOOL_INFO.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span>{SCHOOL_INFO.admissionsEmail}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Enquiry Form */}
      <section className="py-20 bg-white" id="online-enquiry">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            eyebrow="Online Application"
            title="Submit an Admissions Enquiry"
            description="Fill out the prospective student details below. Our admissions team will get in touch promptly."
          />

          <EnquiryForm />
        </div>
      </section>
    </div>
  );
};
