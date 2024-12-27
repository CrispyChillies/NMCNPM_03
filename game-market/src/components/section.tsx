import { useLocation } from 'react-router-dom';
import { FeatureSection } from "@/components/feature-section";
import { featureSection } from "@/app/data/data-section";

export default function SectionPage() {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentSection = featureSection.find(section => currentPath.startsWith(section.url));

  return (
    <>
      {currentSection && <FeatureSection {...currentSection} />}
    </>
  );
}