import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  companyLogo: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  salary: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  postedAt: { type: String, required: true },
  applyUrl: { type: String, required: true },
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema); 