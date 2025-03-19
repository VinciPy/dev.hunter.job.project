import { Job } from './types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp',
    companyLogo: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=128&h=128&fit=crop',
    location: 'San Francisco, CA',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salary: '$130,000 - $180,000',
    description: 'We are looking for a Senior Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using React, Node.js, and PostgreSQL.',
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    postedAt: '2024-03-20',
    applyUrl: '#'
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'DesignStudio',
    companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=128&h=128&fit=crop',
    location: 'Remote',
    type: 'Full-time',
    experienceLevel: 'Mid Level',
    salary: '$90,000 - $120,000',
    description: 'Join our creative team as a Frontend Developer. You will work on building beautiful and responsive user interfaces for our clients.',
    technologies: ['React', 'JavaScript', 'CSS', 'Tailwind'],
    postedAt: '2024-03-19',
    applyUrl: '#'
  },
  {
    id: '3',
    title: 'Python Backend Developer',
    company: 'DataCo',
    companyLogo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=128&h=128&fit=crop',
    location: 'New York, NY',
    type: 'Full-time',
    experienceLevel: 'Senior',
    salary: '$140,000 - $190,000',
    description: 'Looking for an experienced Python developer to work on our data processing pipeline and API infrastructure.',
    technologies: ['Python', 'Django', 'PostgreSQL', 'AWS'],
    postedAt: '2024-03-18',
    applyUrl: '#'
  },
  {
    id: '4',
    title: 'React Native Developer',
    company: 'MobileFirst',
    companyLogo: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=128&h=128&fit=crop',
    location: 'London, UK',
    type: 'Contract',
    experienceLevel: 'Mid Level',
    salary: '£400 - £500 per day',
    description: 'Join our mobile team to develop cross-platform applications using React Native. Experience with mobile development required.',
    technologies: ['React Native', 'JavaScript', 'TypeScript', 'Mobile'],
    postedAt: '2024-03-17',
    applyUrl: '#'
  }
];