"use client"

import { useState } from "react"
import AnimationWrapper from "@/components/animation-wrapper"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function CultivationProcessPage() {
  const [expandedCrop, setExpandedCrop] = useState(null)

  const crops = [
    {
      name: "Rice",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Rice is one of the most important food crops in India, particularly in the eastern and southern regions.",
      season: "Kharif (June-July to October-November)",
      soilType: "Clay or clay loam soils with good water retention capacity",
      fertilizers: ["Nitrogen (N): 100-120 kg/ha", "Phosphorus (P): 50-60 kg/ha", "Potassium (K): 50-60 kg/ha"],
      steps: [
        {
          title: "Land Preparation",
          description:
            "Plow the field to a depth of 15-20 cm. Level the field properly for uniform water distribution. Create bunds around the field to retain water.",
        },
        {
          title: "Seed Selection and Treatment",
          description:
            "Select high-quality, certified seeds. Treat seeds with fungicides to prevent seed-borne diseases.",
        },
        {
          title: "Nursery Preparation",
          description:
            "Prepare a raised nursery bed. Sow pre-soaked seeds evenly. Maintain adequate moisture in the nursery.",
        },
        {
          title: "Transplanting",
          description:
            "Transplant 20-25 day old seedlings. Maintain a spacing of 20 cm × 15 cm. Transplant 2-3 seedlings per hill.",
        },
        {
          title: "Water Management",
          description:
            "Maintain 2-5 cm water level during the vegetative stage. Drain the field 10-15 days before harvesting.",
        },
        {
          title: "Weed Management",
          description:
            "Apply pre-emergence herbicides within 3-5 days of transplanting. Perform manual weeding at 20-25 and 40-45 days after transplanting.",
        },
        {
          title: "Harvesting",
          description:
            "Harvest when 80-85% of the grains turn golden yellow. Dry the harvested crop to reduce moisture content to 14%.",
        },
      ],
    },
    {
      name: "Wheat",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Wheat is the second most important cereal crop in India after rice and is the main food crop in northern and central India.",
      season: "Rabi (October-November to March-April)",
      soilType: "Well-drained loam or clay loam soils",
      fertilizers: ["Nitrogen (N): 120-150 kg/ha", "Phosphorus (P): 60-80 kg/ha", "Potassium (K): 40-60 kg/ha"],
      steps: [
        {
          title: "Land Preparation",
          description:
            "Plow the field to a fine tilth. Level the field properly for uniform irrigation. Create proper drainage channels.",
        },
        {
          title: "Seed Selection and Treatment",
          description:
            "Select high-yielding, disease-resistant varieties. Treat seeds with fungicides to prevent seed-borne diseases.",
        },
        {
          title: "Sowing",
          description:
            "Sow seeds at a depth of 5-6 cm. Maintain a row spacing of 20-22.5 cm. Use a seed rate of 100-125 kg/ha.",
        },
        {
          title: "Irrigation",
          description:
            "First irrigation: 20-25 days after sowing. Second irrigation: 40-45 days after sowing (crown root initiation stage). Third irrigation: 60-65 days after sowing (flowering stage). Fourth irrigation: 80-85 days after sowing (milk stage).",
        },
        {
          title: "Weed Management",
          description:
            "Apply pre-emergence herbicides within 2-3 days of sowing. Perform manual weeding at 30-35 days after sowing if necessary.",
        },
        {
          title: "Harvesting",
          description:
            "Harvest when the crop turns golden yellow and grains become hard. Dry the harvested crop to reduce moisture content to 12-14%.",
        },
      ],
    },
    {
      name: "Cotton",
      image: "/placeholder.svg?height=300&width=400",
      description:
        "Cotton is one of the most important commercial crops in India, providing livelihood to millions of farmers.",
      season: "Kharif (April-May to October-November)",
      soilType: "Well-drained, deep black cotton soils or alluvial soils",
      fertilizers: ["Nitrogen (N): 100-120 kg/ha", "Phosphorus (P): 50-60 kg/ha", "Potassium (K): 50-60 kg/ha"],
      steps: [
        {
          title: "Land Preparation",
          description:
            "Deep plow the field to a depth of 30 cm. Create ridges and furrows for proper drainage. Apply farmyard manure or compost during land preparation.",
        },
        {
          title: "Seed Selection and Treatment",
          description:
            "Select certified Bt cotton or high-yielding varieties. Treat seeds with fungicides and insecticides.",
        },
        {
          title: "Sowing",
          description:
            "Sow seeds at a depth of 4-5 cm. Maintain a spacing of 90 cm × 60 cm for irrigated and 60 cm × 30 cm for rainfed conditions. Use a seed rate of 2-2.5 kg/ha.",
        },
        {
          title: "Irrigation",
          description:
            "First irrigation: Immediately after sowing. Subsequent irrigations at 10-15 day intervals depending on soil moisture. Critical stages for irrigation: Flowering and boll development.",
        },
        {
          title: "Weed Management",
          description:
            "Apply pre-emergence herbicides within 2-3 days of sowing. Perform inter-cultivation at 20-25, 40-45, and 60-65 days after sowing.",
        },
        {
          title: "Pest Management",
          description:
            "Monitor for bollworms, whiteflies, and aphids regularly. Use integrated pest management practices. Apply recommended insecticides only when necessary.",
        },
        {
          title: "Harvesting",
          description:
            "Harvest cotton bolls when they fully open and look fluffy. Pick cotton during dry weather to avoid moisture contamination. Perform multiple pickings as bolls mature at different times.",
        },
      ],
    },
    {
      name: "Sugarcane",
      image: "/placeholder.svg?height=300&width=400",
      description: "Sugarcane is an important cash crop in India, used for sugar, jaggery, and ethanol production.",
      season: "Planted in different seasons: Spring (February-March), Autumn (October), and Adsali (July-August)",
      soilType: "Well-drained, deep, loamy soils rich in organic matter",
      fertilizers: ["Nitrogen (N): 250-300 kg/ha", "Phosphorus (P): 80-100 kg/ha", "Potassium (K): 80-100 kg/ha"],
      steps: [
        {
          title: "Land Preparation",
          description:
            "Deep plow the field to a depth of 30-40 cm. Create ridges and furrows for proper drainage and irrigation. Apply farmyard manure or compost during land preparation.",
        },
        {
          title: "Seed Selection and Treatment",
          description:
            "Select disease-free, high-yielding varieties. Use 8-10 month old cane for seed material. Treat setts with fungicides before planting.",
        },
        {
          title: "Planting",
          description:
            "Plant setts in furrows at a depth of 5-7 cm. Maintain a row spacing of 75-90 cm. Use a seed rate of 75,000-80,000 setts/ha.",
        },
        {
          title: "Irrigation",
          description:
            "First irrigation: Immediately after planting. Subsequent irrigations at 7-10 day intervals during summer and 15-20 day intervals during winter. Critical stages for irrigation: Germination, tillering, and grand growth phase.",
        },
        {
          title: "Weed Management",
          description:
            "Apply pre-emergence herbicides within 2-3 days of planting. Perform inter-cultivation at 30-35, 60-65, and 90-95 days after planting.",
        },
        {
          title: "Earthing Up",
          description:
            "Perform first earthing up at 60-70 days after planting. Perform second earthing up at 90-100 days after planting.",
        },
        {
          title: "Harvesting",
          description:
            "Harvest when the crop is fully mature (usually 10-12 months after planting). Cut the cane at the base, close to the ground. Remove tops and trash before sending to the sugar mill.",
        },
      ],
    },
  ]

  const toggleCrop = (cropName) => {
    if (expandedCrop === cropName) {
      setExpandedCrop(null)
    } else {
      setExpandedCrop(cropName)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-background-light">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-green text-center mb-4">Cultivation Process</h1>
          <p className="text-center text-secondary-green mb-12 max-w-2xl mx-auto">
            Detailed guides for cultivating major Indian crops, including step-by-step instructions, required
            fertilizers, and seasonal information.
          </p>
        </AnimationWrapper>

        <div className="max-w-4xl mx-auto space-y-6">
          {crops.map((crop, index) => (
            <AnimationWrapper key={crop.name} delay={index * 100}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div
                  className="flex justify-between items-center p-6 cursor-pointer"
                  onClick={() => toggleCrop(crop.name)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={crop.image || "/placeholder.svg"}
                        alt={crop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-primary-green">{crop.name}</h2>
                      <p className="text-secondary-green">Season: {crop.season}</p>
                    </div>
                  </div>
                  {expandedCrop === crop.name ? (
                    <ChevronUp className="text-primary-green" />
                  ) : (
                    <ChevronDown className="text-primary-green" />
                  )}
                </div>

                {expandedCrop === crop.name && (
                  <div className="p-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="md:col-span-1">
                        <img
                          src={crop.image || "/placeholder.svg"}
                          alt={crop.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-secondary-green mb-4">{crop.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold text-primary-green mb-2">Soil Type</h3>
                            <p className="text-secondary-green">{crop.soilType}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-primary-green mb-2">Recommended Fertilizers</h3>
                            <ul className="list-disc list-inside text-secondary-green">
                              {crop.fertilizers.map((fertilizer, i) => (
                                <li key={i}>{fertilizer}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-semibold text-primary-green text-xl mb-4">Cultivation Steps</h3>
                    <div className="space-y-4">
                      {crop.steps.map((step, i) => (
                        <div key={i} className="bg-background-light p-4 rounded-lg">
                          <h4 className="font-semibold text-primary-green mb-2">
                            {i + 1}. {step.title}
                          </h4>
                          <p className="text-secondary-green">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AnimationWrapper>
          ))}
        </div>
      </div>
    </div>
  )
}
