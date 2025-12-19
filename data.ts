
import { Professional } from './types';

export const MOCK_PROS: Professional[] = [
  {
    id: '1',
    name: 'ABCD Conveyancing',
    title: 'Licensed Property Specialists',
    location: 'Melbourne, VIC',
    avatar: 'https://picsum.photos/seed/pro1/300/300',
    verified: true,
    score: 92,
    about: 'Specializing in seamless property settlements across Victoria. With over 15 years of experience, we ensure your property journey is smooth, stress-free, and legally compliant. We handle both residential and commercial conveyancing with a dedicated team.',
    metrics: [
      { label: 'On-Time', value: '95%', icon: 'schedule' },
      { label: 'Accuracy', value: '98%', icon: 'check_circle' },
      { label: 'Response', value: '1.3hr', icon: 'flash_on' },
    ],
    performance: [
      { label: 'Properties Settled', value: '500+', icon: 'apartment', colorClass: 'bg-teal-50 text-secondary' },
      { label: 'Experience', value: '15 Yr', icon: 'military_tech', colorClass: 'bg-yellow-50 text-yellow-500' },
      { label: 'Customer Rating', value: '4.9', icon: 'group', colorClass: 'bg-blue-50 text-blue-500' },
      { label: 'Certified Member', value: 'AIC', icon: 'verified', colorClass: 'bg-blue-50 text-blue-500' },
    ],
    services: [
      { id: 's1', name: 'Standard Settlement', price: 880, description: 'Complete legal handling of property transfer including contract review and...', tag: 'Instant Quote' },
      { id: 's2', name: 'Contract Review', price: 250, description: 'Detailed review of Section 32 and Contract of Sale before you sign any documents.', tag: '24hr Turnaround' },
    ],
    availability: [
      { day: 'Mon', date: 14, slots: ['09:00 AM', '10:30 AM', '02:00 PM'] },
      { day: 'Tue', date: 15, slots: ['09:30 AM', '11:00 AM', '03:00 PM'] },
      { day: 'Wed', date: 16, slots: ['08:00 AM', '12:00 PM', '04:00 PM'] },
    ]
  }
];
