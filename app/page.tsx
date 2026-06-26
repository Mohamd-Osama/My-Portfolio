import HeroSection from '@/components/HeroSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import EducationSection from '@/components/EducationSection';
import CertificatesSection from '@/components/CertificatesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import VolunteeringSection from '@/components/VolunteeringSection';
import ContactSection from '@/components/ContactSection';
import ContactDock from '@/components/ContactDock';

export default function Home() {
  return (
    <main className="relative">
      {/* Scan-line decorative element */}
      <div className="scan-line" aria-hidden="true" />

      {/* Sections — exactly as requested */}
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <CertificatesSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />

      {/* Floating contact dock */}
      <ContactDock />
    </main>
  );
}
