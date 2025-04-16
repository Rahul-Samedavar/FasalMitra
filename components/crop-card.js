import AnimationWrapper from "./animation-wrapper"

const CropCard = ({ name, image, description, delay = 0 }) => {
  return (
    <AnimationWrapper delay={delay}>
      <div className="card bg-white rounded-lg overflow-hidden shadow-md hover-grow">
        <div className="h-48 overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-primary-green mb-2">{name}</h3>
          <p className="text-secondary-green">{description}</p>
        </div>
      </div>
    </AnimationWrapper>
  )
}

export default CropCard
