import React, { useState } from 'react';
import { EnquiryFormData } from '../types';
import { CheckCircle2, Send, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface EnquiryFormProps {
  initialGrade?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialGrade = '',
  compact = false,
}) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    parentName: '',
    studentName: '',
    phone: '',
    email: '',
    address: '',
    currentGrade: '',
    applyingGrade: initialGrade,
    programme: 'Regular Academic Programme',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Partial<Record<keyof EnquiryFormData, string>> = {};

    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Parent / Guardian Name is required';
    }
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'Student Name is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Contact Phone Number is required';
    } else if (!/^[0-9+ -]{7,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Residential Address is required (e.g. Gothatar, Kathmandu)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate instantaneous, reliable submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      parentName: '',
      studentName: '',
      phone: '',
      email: '',
      address: '',
      currentGrade: '',
      applyingGrade: '',
      programme: 'Regular Academic Programme',
      message: '',
    });
    setSubmitted(false);
    setErrors({});
  };

  if (submitted) {
    return (
      <div
        id="enquiry-success-message"
        className="bg-white border border-emerald-200 rounded-md p-8 text-center max-w-2xl mx-auto shadow-xs"
      >
        <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-slate-800 mb-2">
          Enquiry Received
        </h3>
        <p className="text-slate-600 text-base leading-relaxed mb-6">
          Thank you. Your enquiry has been submitted successfully. Our school team will contact you shortly regarding admissions and campus visits.
        </p>
        <div className="p-4 bg-slate-50 border border-slate-200 rounded text-left text-xs text-slate-600 mb-6 space-y-1">
          <p className="font-semibold text-slate-700">Enquiry Summary:</p>
          <p><span className="text-slate-500">Parent/Guardian:</span> {formData.parentName}</p>
          <p><span className="text-slate-500">Student:</span> {formData.studentName}</p>
          <p><span className="text-slate-500">Contact:</span> {formData.phone}</p>
          <p><span className="text-slate-500">Campus:</span> Vaidik Vidyapeeth (Gothatar, Kathmandu)</p>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded bg-[#164287] text-white hover:bg-[#0f2e60] transition-colors cursor-pointer"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      id="school-enquiry-form"
      onSubmit={handleSubmit}
      className={`bg-white border border-slate-200 rounded-md ${compact ? 'p-5 md:p-6' : 'p-6 md:p-10 shadow-xs'
        }`}
      noValidate
    >
      <div className="mb-6">
        <h3 className="font-serif text-xl md:text-2xl font-bold text-[#164287]">
          School Admission & General Enquiry
        </h3>
        <p className="text-xs md:text-sm text-slate-500 mt-1">
          Please provide the details below. Fields marked with an asterisk (<span className="text-[#d91f26] font-bold">*</span>) are required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Parent / Guardian Name * */}
        <div>
          <label
            htmlFor="parentName"
            className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider"
          >
            Parent / Guardian Name <span className="text-[#d91f26]">*</span>
          </label>
          <input
            type="text"
            id="parentName"
            name="parentName"
            value={formData.parentName}
            onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
            placeholder="e.g. Ramesh Kumar Shrestha"
            className={`w-full px-3.5 py-2.5 text-sm rounded border bg-white focus:outline-hidden transition-colors ${errors.parentName
                ? 'border-[#d91f26] focus:border-[#d91f26]'
                : 'border-slate-300 focus:border-[#164287] focus:ring-1 focus:ring-[#164287]'
              }`}
          />
          {errors.parentName && (
            <p className="mt-1 text-xs text-[#d91f26] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.parentName}
            </p>
          )}
        </div>

        {/* Student Name * */}
        <div>
          <label
            htmlFor="studentName"
            className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider"
          >
            Student Name <span className="text-[#d91f26]">*</span>
          </label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
            placeholder="e.g. Aayush Shrestha"
            className={`w-full px-3.5 py-2.5 text-sm rounded border bg-white focus:outline-hidden transition-colors ${errors.studentName
                ? 'border-[#d91f26] focus:border-[#d91f26]'
                : 'border-slate-300 focus:border-[#164287] focus:ring-1 focus:ring-[#164287]'
              }`}
          />
          {errors.studentName && (
            <p className="mt-1 text-xs text-[#d91f26] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.studentName}
            </p>
          )}
        </div>

        {/* Phone Number * */}
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider"
          >
            Phone Number <span className="text-[#d91f26]">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="e.g. +977-98XXXXXXXX"
            className={`w-full px-3.5 py-2.5 text-sm rounded border bg-white focus:outline-hidden transition-colors ${errors.phone
                ? 'border-[#d91f26] focus:border-[#d91f26]'
                : 'border-slate-300 focus:border-[#164287] focus:ring-1 focus:ring-[#164287]'
              }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-[#d91f26] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.phone}
            </p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider"
          >
            Email Address <span className="text-slate-400 text-[10px] font-normal">(Optional)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. parent@example.com"
            className="w-full px-3.5 py-2.5 text-sm rounded border border-slate-300 bg-white focus:outline-hidden focus:border-[#164287] focus:ring-1 focus:ring-[#164287] transition-colors"
          />
        </div>

        {/* Address * */}
        <div className="md:col-span-2">
          <label
            htmlFor="address"
            className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider"
          >
            Residential Address <span className="text-[#d91f26]">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="e.g. Gothatar, Kathmandu / Kageshwori Manohara"
            className={`w-full px-3.5 py-2.5 text-sm rounded border bg-white focus:outline-hidden transition-colors ${errors.address
                ? 'border-[#d91f26] focus:border-[#d91f26]'
                : 'border-slate-300 focus:border-[#164287] focus:ring-1 focus:ring-[#164287]'
              }`}
          />
          {errors.address && (
            <p className="mt-1 text-xs text-[#d91f26] flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.address}
            </p>
          )}
        </div>

        {/* Student's Current Grade */}
        <div>
          <label
            htmlFor="currentGrade"
            className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider"
          >
            Student's Current Grade
          </label>
          <select
            id="currentGrade"
            name="currentGrade"
            value={formData.currentGrade}
            onChange={(e) => setFormData({ ...formData, currentGrade: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded border border-slate-300 bg-white focus:outline-hidden focus:border-[#164287] focus:ring-1 focus:ring-[#164287]"
          >
            <option value="">Select current grade (if applicable)</option>
            <option value="Not enrolled yet">Not yet enrolled in school</option>
            <option value="Playgroup">Playgroup</option>
            <option value="Nursery">Nursery</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
          </select>
        </div>

        {/* Applying Grade / Level */}
        <div>
          <label
            htmlFor="applyingGrade"
            className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider"
          >
            Applying Grade / Level
          </label>
          <select
            id="applyingGrade"
            name="applyingGrade"
            value={formData.applyingGrade}
            onChange={(e) => setFormData({ ...formData, applyingGrade: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded border border-slate-300 bg-white focus:outline-hidden focus:border-[#164287] focus:ring-1 focus:ring-[#164287]"
          >
            <option value="">Select applying grade / level</option>
            <option value="Playgroup">Pre-School: Playgroup (Age 2-3)</option>
            <option value="Nursery">Pre-School: Nursery (Age 3-4)</option>
            <option value="LKG">Pre-School: LKG (Age 4-5)</option>
            <option value="UKG">Pre-School: UKG (Age 5-6)</option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
          </select>
        </div>

        {/* Programme */}
        <div className="md:col-span-2">
          <label
            htmlFor="programme"
            className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider"
          >
            Programme of Interest
          </label>
          <select
            id="programme"
            name="programme"
            value={formData.programme}
            onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded border border-slate-300 bg-white focus:outline-hidden focus:border-[#164287] focus:ring-1 focus:ring-[#164287]"
          >
            <option value="Regular Academic Programme">Regular Academic Programme</option>
            <option value="Pre-School Wing (Early Childhood Education)">Pre-School Wing (Early Childhood Education)</option>
            <option value="Academic + After School Program">Academic + After School Program</option>
            <option value="General Admission Enquiry & Campus Tour">General Admission Enquiry & Campus Tour</option>
          </select>
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label
            htmlFor="message"
            className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider"
          >
            Message or Specific Questions <span className="text-slate-400 text-[10px] font-normal">(Optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please let us know any specific questions regarding admission procedures, transportation routes in Gothatar, or school facilities..."
            className="w-full px-3.5 py-2.5 text-sm rounded border border-slate-300 bg-white focus:outline-hidden focus:border-[#164287] focus:ring-1 focus:ring-[#164287] transition-colors"
          />
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-slate-500">
          Campus visits are welcome during regular office hours at Gothatar, Kathmandu.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          id="submit-enquiry-btn"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-medium rounded bg-[#164287] text-white hover:bg-[#0f2e60] active:scale-[0.98] transition-all shadow-sm cursor-pointer disabled:opacity-70"
        >
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Enquiry</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
