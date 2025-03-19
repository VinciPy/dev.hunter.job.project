'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, BookmarkIcon, Building2, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Job } from '@/lib/types';
import { mockJobs } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export default function JobDetails({
  params,
}: {
  params: { id: string };
}) {
  const [job, setJob] = useState<Job | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundJob = mockJobs.find((j) => j.id === params.id);
    setJob(foundJob || null);

    // Check if job is saved
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    setIsSaved(savedJobs.includes(params.id));
  }, [params.id]);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Job not found</p>
      </div>
    );
  }

  const toggleSave = () => {
    setIsSaved(!isSaved);
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    if (!isSaved) {
      localStorage.setItem('savedJobs', JSON.stringify([...savedJobs, job.id]));
    } else {
      localStorage.setItem(
        'savedJobs',
        JSON.stringify(savedJobs.filter((id: string) => id !== job.id))
      );
    }
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={job.companyLogo}
                    alt={job.company}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h1 className="text-2xl font-bold">{job.title}</h1>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                </div>
                <button
                  onClick={toggleSave}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <BookmarkIcon
                    className={cn('h-6 w-6', isSaved && 'fill-current text-primary')}
                  />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Posted {job.postedAt}</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <p className="text-muted-foreground">{job.description}</p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Job Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Experience Level
                  </h3>
                  <p className="mt-1">{job.experienceLevel}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Salary Range
                  </h3>
                  <p className="mt-1">{job.salary}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Employment Type
                  </h3>
                  <p className="mt-1">{job.type}</p>
                </div>
              </div>

              <a
                href={job.applyUrl}
                className="mt-6 w-full inline-flex justify-center items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Apply Now
              </a>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">About {job.company}</h2>
              <p className="text-muted-foreground">
                A leading technology company focused on innovation and creating
                exceptional user experiences. We value creativity, collaboration,
                and continuous learning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}