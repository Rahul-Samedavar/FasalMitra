import HeroSection from "@/components/hero-section"
import CropCard from "@/components/crop-card"
import FeatureCard from "@/components/feature-card"
import AnimationWrapper from "@/components/animation-wrapper"
import { Upload, Languages, MessageSquare, CloudRain, Pill } from "lucide-react"

export default function Home() {
  const crops = [
    {
      name: "Rice",
      image: "/placeholder.svg?height=300&width=400",
      description: "India's staple crop, grown in various regions with different varieties suited to local conditions.",
    },
    {
      name: "Wheat",
      image: "/placeholder.svg?height=300&width=400",
      description: "A major rabi crop grown in the northern plains, crucial for food security in India.",
    },
    {
      name: "Cotton",
      image: "/placeholder.svg?height=300&width=400",
      description: "An important cash crop supporting India's textile industry and rural livelihoods.",
    },
    {
      name: "Sugarcane",
      image: "/placeholder.svg?height=300&width=400",
      description: "A high-value crop grown for sugar production, with India being a major producer.",
    },
  ]

  const features = [
    {
      title: "Disease Detection",
      description: "Upload images of your crops to instantly identify diseases and get treatment recommendations.",
      icon: <Upload size={24} className="text-primary-green" />,
    },
    {
      title: "Multilingual Support",
      description: "Access information in multiple Indian languages including Hindi, Tamil, Telugu, and more.",
      icon: <Languages size={24} className="text-primary-green" />,
    },
    {
      title: "Chatbot Assistance",
      description: "Get real-time answers to your farming questions through our AI-powered chatbot.",
      icon: <MessageSquare size={24} className="text-primary-green" />,
    },
    {
      title: "Weather Alerts",
      description: "Receive timely alerts about weather conditions that may increase disease risk in your area.",
      icon: <CloudRain size={24} className="text-primary-green" />,
    },
    {
      title: "Treatment Recommendations",
      description: "Get specific recommendations for medicines, pesticides, and organic remedies for crop diseases.",
      icon: <Pill size={24} className="text-primary-green" />,
    },
  ]

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Common Crops Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-green text-center mb-12">Common Indian Crops</h2>
          </AnimationWrapper>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {crops.map((crop, index) => (
              <CropCard
                key={crop.name}
                name={crop.name}
                image={crop.image}
                description={crop.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background-light">
        <div className="container mx-auto px-4">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-green text-center mb-4">Our Features</h2>
            <p className="text-center text-secondary-green mb-12 max-w-2xl mx-auto">
              Empowering farmers with technology to identify and treat crop diseases efficiently, saving time and
              increasing yields.
            </p>
          </AnimationWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-green text-center mb-12">
              Farmer Success Stories
            </h2>
          </AnimationWrapper>
          <div className="max-w-4xl mx-auto bg-accent-beige/30 p-8 rounded-lg shadow-md">
            <AnimationWrapper delay={200}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="Farmer Rajesh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg text-secondary-green italic mb-4">
                    "This app helped me identify a fungal infection in my wheat crop early. The treatment
                    recommendations saved my entire harvest. Now I check all my crops regularly using this platform."
                  </p>
                  <p className="font-semibold text-primary-green">Rajesh Kumar</p>
                  <p className="text-secondary-green">Wheat Farmer, Punjab</p>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-green text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimationWrapper>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Protect Your Crops?</h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Join thousands of Indian farmers who are using our platform to detect and treat crop diseases early.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/services"
                className="bg-white text-primary-green px-6 py-3 rounded-md font-medium hover:bg-accent-beige transition-colors"
              >
                Upload Crop Image
              </a>
              <a
                href="/chatbot"
                className="bg-accent-beige text-primary-green px-6 py-3 rounded-md font-medium hover:bg-white transition-colors"
              >
                Ask Our Chatbot
              </a>
            </div>
          </AnimationWrapper>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-green text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">CropGuard</h3>
              <p className="max-w-xs">Empowering Indian farmers with AI-powered crop disease detection and support.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="hover:text-accent-beige">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/cultivation-process" className="hover:text-accent-beige">
                      Cultivation Process
                    </a>
                  </li>
                  <li>
                    <a href="/services" className="hover:text-accent-beige">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="/chatbot" className="hover:text-accent-beige">
                      Chatbot
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-accent-beige">
                      Crop Library
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-accent-beige">
                      Disease Database
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-accent-beige">
                      Weather Alerts
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Contact</h4>
                <ul className="space-y-2">
                  <li>support@cropguard.in</li>
                  <li>+91 98765 43210</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} CropGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
