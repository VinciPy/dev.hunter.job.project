'use client';

import { Filter } from 'lucide-react';

interface FiltersProps {
  filters: {
    search: string;
    language: string;
    experience: string;
    location: string;
  };
  setFilters: (filters: any) => void;
}

export default function JobFilters({ filters, setFilters }: FiltersProps) {
  const languages = [
    'JavaScript',
    'Python',
    'Java',
    'TypeScript',
    'C#',
    'Ruby',
    'Go',
    'PHP',
  ];

  const experienceLevels = [
    'Entry Level',
    'Mid Level',
    'Senior',
    'Lead',
    'Principal',
  ];

  const locations = [
    'Remote',
    'San Francisco, CA',
    'New York, NY',
    'London, UK',
    'Berlin, DE',
    'Toronto, CA',
  ];

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      <div className="space-y-6">
        {/* Programming Language */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Programming Language
          </label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3"
            value={filters.language}
            onChange={(e) =>
              setFilters({ ...filters, language: e.target.value })
            }
          >
            <option value="">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Experience Level
          </label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3"
            value={filters.experience}
            onChange={(e) =>
              setFilters({ ...filters, experience: e.target.value })
            }
          >
            <option value="">All Levels</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium mb-2 block">Location</label>
          <select
            className="w-full h-10 rounded-md border border-input bg-background px-3"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}