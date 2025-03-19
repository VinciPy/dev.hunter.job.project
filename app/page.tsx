'use client';

import { useState } from 'react';
import { Search, Briefcase, MapPin, Code2 } from 'lucide-react';
import JobCard from '@/components/JobCard';
import JobFilters from '@/components/JobFilters';
import { mockJobs } from '@/lib/mock-data';

export default function Home() {
  const [jobs, setJobs] = useState(mockJobs);
  const [filters, setFilters] = useState({
    search: '',
    language: '',
    experience: '',
    location: '',
  });

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.search.toLowerCase());
    const matchesLanguage =
      !filters.language || job.technologies.includes(filters.language);
    const matchesExperience =
      !filters.experience || job.experienceLevel === filters.experience;
    const matchesLocation =
      !filters.location ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());

    return matchesSearch && matchesLanguage && matchesExperience && matchesLocation;
  });

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
                <h3 className="text-2xl font-bold">{jobs.length}+</h3>
                <p className="text-muted-foreground">Active Jobs</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 bg-background rounded-lg p-6 shadow-sm">
              <MapPin className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-2xl font-bold">50+</h3>
                <p className="text-muted-foreground">Locations</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4 bg-background rounded-lg p-6 shadow-sm">
              <Code2 className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-2xl font-bold">100+</h3>
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
            <h2 className="text-2xl font-semibold mb-6">
              {filteredJobs.length} Jobs Available
            </h2>
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}