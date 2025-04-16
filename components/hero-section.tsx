import Link from "next/link"
import AnimationWrapper from "./animation-wrapper"
import { Upload, MessageSquare } from "lucide-react"

const HeroSection = () => {
  return (
    <div className="relative bg-background-light pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <AnimationWrapper className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-green mb-4">
              Detect Crop Diseases with Just a Click
            </h1>
            <p className="text-lg md:text-xl text-secondary-green mb-8">
              Empowering Indian Farmers with AI-powered crop disease detection and support in regional languages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="btn-primary-green px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2"
              >
                <Upload size={20} />
                Upload Image
              </Link>
              <Link
                href="/chatbot"
                className="btn-accent px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2"
              >
                <MessageSquare size={20} />
                Try Chatbot
              </Link>
            </div>
          </AnimationWrapper>
          <AnimationWrapper className="md:w-1/2" delay={300}>
            <div className="relative">
              <img
                src="b.jpg"
                alt="Farmer using crop disease detection app"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-4 -right-4 bg-accent-beige p-3 rounded-lg shadow-md">
                <p className="text-primary-green font-semibold">Trusted by 10,000+ farmers across India</p>
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background-light/50 to-transparent"></div>
    </div>
  )
}

export default HeroSection
