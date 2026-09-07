import { EventItem, GalleryPhoto, FacilityItem } from '../types';

export const SCHOOL_INFO = {
  name: 'Vaidik Vidyapeeth',
  tagline: 'Inspiring Young Minds. Building Strong Futures.',
  location: 'Gothatar, Kathmandu, Nepal',
  fullAddress: 'Gothatar, Kageshwori Manohara Municipality, Kathmandu, Nepal',
  phone: '+977-9860112013',
  secondaryPhone: '+977-985-1181927',
  email: 'info@vaidikVidyapeeth.edu.np',
  admissionsEmail: 'admissions@vaidikVidyapeeth.edu.np',
  officeHours: 'Sunday – Friday: 8:30 AM – 4:30 PM (Saturday Closed)',
  academicLevels: 'Pre-School through Secondary Level',
  mapCoordinates: {
    lat: 27.7025,
    lng: 85.3785,
  },
};

export const QUICK_STATS = [
  { label: 'Gothatar, Kathmandu', sublabel: 'Peaceful Academic Campus' },
  { label: 'Academic Excellence', sublabel: 'Foundational Knowledge' },
  { label: 'Holistic Development', sublabel: 'Balanced Mind & Body' },
  { label: 'Safe Learning Environment', sublabel: 'Caring & Disciplined' },
  { label: 'Experienced Educators', sublabel: 'Dedicated Mentorship' },
];

export const PRINCIPAL_INFO = {
  name: 'Deepa Pandey',
  title: 'Principal',
  institution: 'Vaidik Vidyapeeth',
  location: 'Gothatar, Kathmandu',
  photo: '/principal.jpg',
  shortQuote:
    'At Vaidik Vidyapeeth, we believe that education extends far beyond textbooks and examinations. Our responsibility is to help students develop curiosity, confidence, discipline and compassion while providing them with a strong academic foundation. Through the partnership of teachers, students and parents, we aim to create an environment where every learner feels supported and inspired to succeed.',
  fullMessage: [
    'Education is not merely the acquisition of knowledge; it is the shaping of character, vision, and purpose. At our school, we believe that while a picture can convey a million words, it is a strong vision that guides a million meaningful efforts. We are dedicated to provide an environment where young minds are nurtured with curiosity, integrity, and confidence. We strive to empower our students with not only academic excellence but also the values and skills required to thrive in an ever-changing world. With the dedicated efforts of our educators, the trust of parents, and the enthusiasm of our students, we continue to build a learning community that inspires innovation, responsibility, and lifelong learning. Together, we are shaping futures and preparing our children to become thoughtful leaders and compassionate global citizens. I warmly welcome you to be a part of our journey toward excellence in education'
  ],
};

export const WHY_CHOOSE_ITEMS = [
  {
    title: 'Experienced & Caring Educators',
    description:
      'Our qualified teachers combine subject mastery with patient mentorship, ensuring every student receives personalized attention and guidance.',
    iconName: 'GraduationCap',
  },
  {
    title: 'Strong Academic Foundation',
    description:
      'A structured, inquiry-based curriculum designed to develop analytical thinking, reading fluency, mathematical reasoning, and articulate expression.',
    iconName: 'BookOpen',
  },
  {
    title: 'Student-Centred Learning',
    description:
      'Classrooms where students are active participants in discovery, discussion, and problem-solving rather than passive recipients of facts.',
    iconName: 'Users',
  },
  {
    title: 'Safe & Supportive Environment',
    description:
      'A secure, disciplined campus culture that prioritises student physical safety, emotional well-being, and respectful peer interactions.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Extracurricular Development',
    description:
      'Comprehensive sports, martial arts, performing arts, and debate programmes that build athletic ability, stage confidence, and teamwork.',
    iconName: 'Trophy',
  },
  {
    title: 'Modern Learning Facilities',
    description:
      'Well-resourced computer laboratories, dedicated library collection, safe play spaces, and hygienic dining and infirmary support.',
    iconName: 'Building2',
  },
];

export const FACILITIES_DATA: FacilityItem[] = [
  // Academic & Student Support
  {
    id: 'library',
    name: 'School Library',
    category: 'Learning Facilities',
    description:
      'A quiet, sunlit learning commons housing an extensive collection of academic texts, literature, reference books, periodicals, and quiet reading desks to foster early reading habits.',
    iconName: 'Library',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Curated fiction and non-fiction', 'Quiet study cubicles', 'Digital reading resources', 'Weekly guided library hours'],
  },
  {
    id: 'computer-lab',
    name: 'Computer Laboratory',
    category: 'Learning Facilities',
    description:
      'Modern computing terminals equipped with filtered high-speed internet, educational software, and foundational programming tools to build essential digital literacy.',
    iconName: 'Monitor',
    image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80',
    highlights: ['1:1 student-to-computer ratio during lab sessions', 'Supervised safe internet browsing', 'Typing, coding, and multimedia creation', 'Updated hardware & software'],
  },
  {
    id: 'classroom',
    name: 'Classroom Learning Environment',
    category: 'Learning Facilities',
    description:
      'Spacious, well-ventilated classrooms with ergonomic seating, ample natural lighting, and modern display boards designed to facilitate collaborative learning and focused study.',
    iconName: 'Chalkboard',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Ventilated and naturally lit spaces', 'Interactive teaching displays', 'Ergonomic age-appropriate furniture', 'Optimal student-teacher ratio'],
  },
  {
    id: 'infirmary',
    name: 'Infirmary & First Aid',
    category: 'Student Support',
    description:
      'A dedicated on-campus first-aid unit with clean rest beds, emergency medical supplies, and trained personnel to attend to student health concerns immediately.',
    iconName: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Trained first-aid staff on duty', 'Clean emergency rest stations', 'Regular health screening records', 'Immediate parental notification protocol'],
  },
  {
    id: 'transportation',
    name: 'School Transportation',
    category: 'Student Support',
    description:
      'Safe, reliable school bus fleet covering designated routes across Gothatar and surrounding residential sectors, operated by vetted, experienced drivers and bus attendants.',
    iconName: 'Bus',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Comprehensive neighborhood routes', 'Dedicated caring bus monitors', 'Strict speed and safety protocols', 'Clean, well-maintained vehicles'],
  },
  {
    id: 'after-school',
    name: 'After School Program',
    category: 'Student Support',
    description:
      'Structured post-dismissal care providing guided homework supervision, remedial teacher support, and supervised enrichment clubs for working parents.',
    iconName: 'Clock',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Supervised homework completion', 'Subject-specific remedial assistance', 'Wholesome evening snacks', 'Safe supervised pickup hours'],
  },
  // Extracurricular Activities
  {
    id: 'taekwondo',
    name: 'Taekwondo & Martial Arts',
    category: 'Extracurricular Activities',
    description:
      'Regular martial arts instruction led by certified black-belt instructors, instilling mental discipline, self-defense awareness, physical endurance, and respect.',
    iconName: 'Activity',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Certified belt grading system', 'Physical balance & flexibility', 'Discipline & mental focus', 'Inter-school competition opportunities'],
  },
  {
    id: 'dance',
    name: 'Dance & Performing Arts',
    category: 'Extracurricular Activities',
    description:
      'Dedicated dance training in classical, folk, and contemporary choreography that encourages rhythmic expression, poise, cultural appreciation, and stage confidence.',
    iconName: 'Music2',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Traditional Nepali and world dance forms', 'Stage presence & choreography', 'Annual Day public performances', 'Physical coordination & grace'],
  },
  {
    id: 'arts',
    name: 'Fine Arts & Craft',
    category: 'Extracurricular Activities',
    description:
      'A sunlit creative studio where children explore sketching, watercolor painting, clay modeling, origami, and mixed media under the guidance of passionate art mentors.',
    iconName: 'Palette',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Color theory & composition', 'Clay sculpting and craft design', 'Annual Student Art Exhibition', 'Mediums: acrylic, watercolor & sketching'],
  },
  {
    id: 'basketball',
    name: 'Basketball Court',
    category: 'Extracurricular Activities',
    description:
      'Regulation-sized outdoor hard court with safety cushioning and adjustable hoops for skill development drills, intramural tournaments, and physical fitness.',
    iconName: 'Dribbble',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Ball handling & shooting clinics', 'Inter-house league matches', 'Teamwork and athletic agility', 'Supervised after-school coaching'],
  },
  {
    id: 'futsal',
    name: 'Futsal & Outdoor Sports Ground',
    category: 'Extracurricular Activities',
    description:
      'Enclosed all-weather sports turf supporting futsal training, football matches, team drills, and general athletic development in a safe, monitored setting.',
    iconName: 'CircleDot',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    highlights: ['All-weather artificial turf surface', 'Footwork and tactical drills', 'Sportsmanship and peer camaraderie', 'Intramural tournament series'],
  },
  {
    id: 'music',
    name: 'Music & Vocal Studio',
    category: 'Extracurricular Activities',
    description:
      'Equipped practice room with keyboards, guitar, traditional instruments, and percussion where students learn pitch, rhythm, vocal harmony, and ensemble coordination.',
    iconName: 'Mic',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Instrumental & vocal instruction', 'Ear training & rhythmic theory', 'School choir & musical ensembles', 'Cultural event showcases'],
  },
  // Early Years
  {
    id: 'preschool-wing',
    name: 'Pre-School Wing',
    category: 'Early Years',
    description:
      'A thoughtfully crafted haven tailored specifically for early learners (Playgroup, Nursery, LKG, UKG), featuring play-based inquiry, tactile sensorial materials, and nurturing educators.',
    iconName: 'Smile',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1200&q=80',
    highlights: ['Safe child-proofed indoor & outdoor spaces', 'Montessori-inspired sensory materials', 'Phonics & early numeracy exploration', 'Gentle social-emotional guidance'],
  },
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'event-1',
    title: 'Annual Sports Day & Athletic Meet',
    date: 'November 18, 2026',
    category: 'Sports',
    summary:
      'A vibrant day of track races, field athletics, march-past, and inter-house teamwork celebrating physical fitness and sportsmanship.',
    fullDescription:
      'The Annual Sports Day brings together students, teachers, and parents for an exciting day of athletic competition and community spirit. Events include sprint dashes, relay races, obstacle challenges, long jumps, and the prestigious House March-Past. Every participant learns the invaluable values of fair play, perseverance, and cheering on fellow peers.',
    time: '9:00 AM – 3:30 PM',
    location: 'Vaidik Sports Ground, Gothatar',
    coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'event-2',
    title: 'Grand Cultural Celebration & Saraswati Puja',
    date: 'February 12, 2026',
    category: 'Cultural',
    summary:
      'Honoring Goddess Saraswati, the patron of knowledge and arts, with devotional prayers, classical music, traditional dance, and student performances.',
    fullDescription:
      'Vaidik Vidyapeeth observes Saraswati Puja and our Cultural Celebration with deep reverence and artistic joy. Students present traditional folk dances, classical choral renditions, and poetry recitations. Toddlers take their first writing steps (Aksharabhyasa), marking their formal initiation into the lifelong journey of knowledge.',
    time: '8:30 AM – 2:00 PM',
    location: 'School Main Auditorium & Courtyard',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'event-3',
    title: 'Student Art & Science Discovery Exhibition',
    date: 'September 24, 2026',
    category: 'Academic',
    summary:
      'A showcase of student ingenuity featuring interactive scientific working models, robotics demonstrations, and fine art displays.',
    fullDescription:
      'Our annual Exhibition transforms the school corridors and laboratories into an interactive showcase of innovation and creativity. Students across all grade levels present working models in renewable energy, environmental conservation, biology, and applied physics, accompanied by a curated fine-art gallery showcasing watercolors, sculptures, and crafts.',
    time: '10:00 AM – 3:00 PM',
    location: 'Senior Wing Laboratories & Art Studio',
    coverImage: 'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564069114553-7215e1ff1890?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 'event-4',
    title: 'Inter-House Taekwondo Championship',
    date: 'August 06, 2026',
    category: 'Sports',
    summary:
      'Students demonstrate discipline, agility, and precision sparring in our intra-school martial arts competition.',
    fullDescription:
      'Demonstrating months of focused practice, students test their forms (poomsae) and controlled sparring (kyorugi) under qualified referees. The event emphasizes martial discipline, respect for opponents, and personal perseverance.',
    time: '10:30 AM – 2:30 PM',
    location: 'Martial Arts Dojang, Vaidik Campus',
    coverImage: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'event-5',
    title: 'Literary Week & Spelling Bee Challenge',
    date: 'July 15, 2026',
    category: 'Activities',
    summary:
      'A week celebrating language, storytelling, debate, book character dress-up, and competitive vocabulary quizzes.',
    fullDescription:
      'Students develop rhetorical poise and linguistic flair during Literary Week. Activities include bilingual speech competitions in Nepali and English, creative writing workshops, storytelling sessions for primary students, and the annual school Spelling Bee.',
    time: 'Throughout School Week',
    location: 'School Library & Classrooms',
    coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1000&q=80',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g-1',
    title: 'Modern Campus Architecture',
    category: 'Campus',
    image: 'vaidik.jpg',
    caption: 'Vaidik Vidyapeeth school building and well-planned campus in Gothatar, Kathmandu.',
  },
  {
    id: 'g-2',
    title: 'Interactive Classroom Learning',
    category: 'Classroom',
    image: 'home1.jpg',
    caption: 'Students actively engaging in collaborative discussions and group problem-solving.',
  },
  {
    id: 'g-3',
    title: '',
    category: 'Campus',
    image: 'vaidik.webp',
    caption: 'Dedicated library resources fostering deep reading habits and scholastic research.',
  },
  {
    id: 'g-4',
    title: 'Pre-School Hands-on Discovery',
    category: 'Pre-School',
    image: '5.jpg',
    caption: 'Early learners discovering geometric shapes and sensory coordination in our safe Pre-School Wing.',
  },
  {
    id: 'g-5',
    title: 'Different Activities',
    category: 'Sports',
    image: 'dance.jpg',
    caption: 'Instilling mental endurance, focus, and mutual respect through regular martial arts classes.',
  },
  {
    id: 'g-6',
    title: 'Fine Arts Studio Session',
    category: 'Arts & Culture',
    image: 'art.jpg',
    caption: 'Nurturing student imagination through color exploration, sketching, and craft.',
  },
  {
    id: 'g-7',
    title: 'Outdoor Basketball Drill',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    caption: 'Developing agility, ball control, and strong team communication on the court.',
  },
  {
    id: 'g-8',
    title: 'Traditional Cultural Dance',
    category: 'Arts & Culture',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    caption: 'Preserving Nepali cultural heritage through classical stage dance and performance.',
  },
  {
    id: 'g-9',
    title: 'Computer Science Practical',
    category: 'Classroom',
    image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Developing digital competence, logical algorithm design, and safe digital practices.',
  },
  {
    id: 'g-10',
    title: 'Joyful Play in Early Years',
    category: 'Pre-School',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Social-emotional development nurtured through structured group play and storytelling.',
  },
  {
    id: 'g-11',
    title: 'Annual Sports Athletics Meet',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    caption: 'The competitive yet cheerful camaraderie of the Annual Sports Day at our Gothatar campus.',
  },
  {
    id: 'g-12',
    title: 'School Music & Ensemble Practice',
    category: 'Arts & Culture',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    caption: 'Learning rhythm, harmony, and instrumental discipline in our music studio.',
  },
];
