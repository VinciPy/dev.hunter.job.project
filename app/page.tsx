'use client';

import { useState, useEffect } from 'react';
import { Search, Briefcase, MapPin, Code2 } from 'lucide-react';
import JobCard from '@/components/JobCard';
import JobFilters from '@/components/JobFilters';

export default function Home() {
  interface Job {
    id: string;
    title: string;
    company: string;
    companyLogo: string;
    type: string;
    location: string;
    technologies: string[];
    description: string;
    postedDate: string;
    salaryRange?: string;
    experienceLevel: string;
    salary: string;
    postedAt: string;
    applyUrl: string;
  }

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    language: '',
    experience: '',
    location: '',
  });
  const [jobStats, setJobStats] = useState({
    totalJobs: 0,
    locations: 0,
    technologies: 0
  });

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.language) queryParams.append('language', filters.language);
        if (filters.experience) queryParams.append('experience', filters.experience);
        if (filters.location) queryParams.append('location', filters.location);
        const response = await fetch(`/api/jobs?${queryParams.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobs(data.jobs);
        const uniqueLocations = new Set<string>(data.jobs.map((job: { location: string }) => job.location));
        const uniqueTechnologies = new Set();
        data.jobs.forEach((job: { id: string; location: string; technologies: string[] }) => job.technologies.forEach((tech: string) => uniqueTechnologies.add(tech)));
        setJobStats({
          totalJobs: data.jobs.length,
          locations: uniqueLocations.size,
          technologies: uniqueTechnologies.size
        });
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [filters]);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Find Your Next Developer Role
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-8">
            Discover opportunities from multiple sources in one place
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or keyword..."
              className="w-full h-12 pl-12 pr-4 rounded-full border border-input bg-background"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-4 bg-background rounded-lg p-6 shadow-sm">
              <Briefcase className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-2xl font-bold">{jobStats.totalJobs}+</h3>
                <p className="text-muted-foreground">Active Jobs</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 bg-background rounded-lg p-6 shadow-sm">
              <MapPin className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-2xl font-bold">{jobStats.locations}+</h3>
                <p className="text-muted-foreground">Locations</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 bg-background rounded-lg p-6 shadow-sm">
              <Code2 className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-2xl font-bold">{jobStats.technologies}+</h3>
                <p className="text-muted-foreground">Technologies</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <JobFilters filters={filters} setFilters={setFilters} />
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 p-4 rounded-md text-red-800">{error}</div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-6">
                  {jobs.length} Jobs Available
                </h2>
                {jobs.length === 0 ? (
                  <div className="bg-muted p-8 rounded-md text-center">
                    <p className="text-muted-foreground">No jobs found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {jobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}