import { NextResponse } from 'next/server';
import { mockJobs } from '@/lib/mock-data'; 

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const language = searchParams.get('language') || '';
    const experience = searchParams.get('experience') || '';
    const location = searchParams.get('location') || '';
    let jobs = [...mockJobs];
    if (search) {
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (language) {
      jobs = jobs.filter(job => job.technologies.includes(language));
    }
    if (experience) {
      jobs = jobs.filter(job => job.experienceLevel === experience);
    }
    if (location) {
      jobs = jobs.filter(job => 
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}