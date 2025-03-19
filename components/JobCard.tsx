'use client';

import { useState } from 'react';
import { BookmarkIcon, ExternalLink } from 'lucide-react';
import { Job } from '@/lib/types';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [isSaved, setIsSaved] = useState(false);

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
    <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
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

      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
            {job.type}
          </span>
          <span className="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded">
            {job.experienceLevel}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">{job.location}</p>

        <div className="flex flex-wrap gap-2">
          {job.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>

        <p className="text-sm line-clamp-2">{job.description}</p>

        <div className="flex items-center justify-between pt-4">
          <span className="text-sm font-medium">{job.salary}</span>
          <a
            href={`/jobs/${job.id}`}
            className="flex items-center space-x-1 text-sm text-primary hover:underline"
          >
            <span>View Details</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}