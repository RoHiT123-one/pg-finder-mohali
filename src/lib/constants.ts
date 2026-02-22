export const AREAS = [
  'Phase 5',
  'Phase 7',
  // 'Kharar',
  // 'Landran',
  // 'Sector 70',
  // 'Sector 58',
] as const;

export const GENDER_TYPES = ['Boys', 'Girls', 'Co-ed'] as const;

export const FACILITIES = [
  { key: 'wifi', label: 'WiFi' },
  { key: 'laundry', label: 'Laundry' },
  { key: 'ro_water', label: 'RO Water' },
  { key: 'cctv', label: 'CCTV' },
  { key: 'power_backup', label: 'Power Backup' },
  { key: 'food_included', label: 'Food Included' },
  { key: 'ac_available', label: 'AC Available' },
  { key: 'attached_bathroom', label: 'Attached Bathroom' },
] as const;

export const ROOM_TYPES = [
  { key: 'rent_single', label: 'Single Sharing' },
  { key: 'rent_double', label: 'Double Sharing' },
  { key: 'rent_triple', label: 'Triple Sharing' },
] as const;

export const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    location: 'Phase 7, Mohali',
    rating: 5,
    comment: 'Found my perfect PG within 2 days! The platform is very easy to use and all listings are genuine.',
    image: 'testimonial-student-1.jpg',
  },
  {
    name: 'Rahul Kumar',
    location: 'Mohali',
    rating: 4,
    comment: 'Great service! Direct contact with owners made the process so smooth. Highly recommended for students.',
    image: 'testimonial-student-2.jpg',
  },
  {
    name: 'Anjali Singh',
    location: 'Mohali',
    rating: 5,
    comment: 'Best PG finder in Mohali. Detailed information and photos helped me make the right choice.',
    image: 'testimonial-student-3.jpg',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Verified Listings',
    description: 'All PG listings are verified for authenticity and accuracy',
    icon: '✓',
  },
  {
    title: 'Direct Contact',
    description: 'Connect directly with PG owners via phone or WhatsApp',
    icon: '📱',
  },
  {
    title: 'Detailed Information',
    description: 'Complete details with photos, facilities, and pricing',
    icon: '📋',
  },
  {
    title: 'Free Service',
    description: 'No hidden charges or commission for students',
    icon: '💰',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'What are the food timings in PGs?',
    answer: 'Most PGs serve breakfast between 7-9 AM, lunch at 12-2 PM, and dinner at 7-9 PM. Timings may vary by PG.',
  },
  {
    question: 'Is there a security deposit required?',
    answer: 'Yes, most PGs require a refundable security deposit ranging from ₹3,000 to ₹10,000 depending on the rent.',
  },
  {
    question: 'Are visitors allowed in PGs?',
    answer: 'Visitor policies vary by PG. Some allow visitors in common areas during specific hours, while others have restrictions.',
  },
  {
    question: 'Is there a curfew time?',
    answer: 'Most PGs have curfew times between 10 PM to 11 PM. Some PGs may have flexible timings for working professionals.',
  },
  {
    question: 'Can I visit the PG before booking?',
    answer: 'Yes, we highly recommend visiting the PG and meeting the owner before making any booking decision.',
  },
  {
    question: 'How do I report a fake listing?',
    answer: 'You can report suspicious listings by contacting us through the Contact page or WhatsApp.',
  },
];

export const PRICING_PLANS = [
  {
    name: 'Free Trial',
    price: 0,
    duration: '7 days',
    features: [
      'Basic listing',
      'Up to 3 photos',
      'Standard placement',
      'Contact details visible',
    ],
  },
  {
    name: 'Basic Listing',
    price: 499,
    duration: 'per month',
    features: [
      'Enhanced listing',
      'Up to 10 photos',
      'Priority placement',
      'Contact details highlighted',
      'Edit anytime',
    ],
    popular: false,
  },
  {
    name: 'Featured Listing',
    price: 999,
    duration: 'per month',
    features: [
      'Premium listing',
      'Unlimited photos',
      'Top placement',
      'Featured badge',
      'Priority support',
      'Social media promotion',
    ],
    popular: true,
  },
];

export const CONTACT_INFO = {
  phone: '+91 78767 21175',
  email: 'pgfindermohali.com',
  address: 'Phase 7, Mohali, Punjab 160055',
  whatsapp: '+91 78767 21175',
};

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/pgfindermohali',
  instagram: 'https://instagram.com/pgfindermohali',
  twitter: 'https://twitter.com/pgfindermohali',
};
