import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Job from '@/models/Job';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const language = searchParams.get('language') || '';
        const experience = searchParams.get('experience') || '';
        const location = searchParams.get('location') || '';
        
        let query: any = {};
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } }
            ];
        }
        if (language) {
            query.technologies = language;
        }
        if (experience) {
            query.experienceLevel = experience;
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        
        const jobs = await Job.find(query);
        console.log('Jobs fetched:', jobs.length);
        return NextResponse.json({ jobs });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }
}