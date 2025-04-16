import AnimationWrapper from "./animation-wrapper"

const FeatureCard = ({ title, description, icon, delay = 0 }) => {
  return (
    <AnimationWrapper delay={delay}>
      <div className="card bg-white p-6 rounded-lg shadow-md hover-grow">
        <div className="w-12 h-12 bg-accent-beige rounded-full flex items-center justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-primary-green mb-2">{title}</h3>
        <p className="text-secondary-green">{description}</p>
      </div>
    </AnimationWrapper>
  )
}

export default FeatureCard
