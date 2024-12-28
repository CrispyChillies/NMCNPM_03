import { Link } from 'react-router-dom'
import { Card } from "@/components/ui/card"

interface Feature {
  title: string
  description: string
  url: string
  icon: React.ReactNode
}

interface FeatureSectionProps {
  title: string
  description: string
  url: string
  section: Feature[]
}

export function FeatureSection({ title, description, url, section }: FeatureSectionProps) {
  const filteredFeatures = section.filter(feature => feature.url.startsWith(url))
  return (
    <section className="py-8">
      <div className="container mx-auto px-4 min-h-screen">
        <div className="text-left mb-12 ml-6">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-primary">{description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFeatures.map((feature, index) => (
            <Link to={feature.url} key={index} className="no-underline">
              <Card className="bg-background p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <div className="text-primary mb-4">{feature.icon}</div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm mb-4">{feature.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}