export type PageId =
  | 'home'
  | 'about'
  | 'academics'
  | 'facilities'
  | 'preschool'
  | 'events'
  | 'gallery'
  | 'admissions'
  | 'contact'
  | 'principal';

export interface EventItem {
  id: string;
  title: string;
  date: string;
  category: 'Academic' | 'Sports' | 'Cultural' | 'Activities';
  summary: string;
  fullDescription: string;
  time?: string;
  location?: string;
  coverImage: string;
  gallery?: string[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Campus' | 'Classroom' | 'Events' | 'Sports' | 'Arts & Culture' | 'Pre-School';
  image: string;
  caption: string;
}

export interface FacilityItem {
  id: string;
  name: string;
  category: 'Learning Facilities' | 'Student Support' | 'Extracurricular Activities' | 'Early Years';
  description: string;
  iconName: string;
  image?: string;
  highlights: string[];
}

export interface EnquiryFormData {
  parentName: string;
  studentName: string;
  phone: string;
  email: string;
  address: string;
  currentGrade: string;
  applyingGrade: string;
  programme: string;
  message: string;
}
