"use client"

import type React from "react"
import { useState } from "react"
import { Upload, AlertCircle, Check } from "lucide-react"
import AnimationWrapper from "@/components/animation-wrapper"


interface DiseaseDetails {
  causes: string[];
  effects: string[];
  treatment: string[];
  prevention: string[];
}

interface CropDiseases {
  [diseaseName: string]: DiseaseDetails;
}

interface DiseaseInfo {
  [cropName: string]: CropDiseases;
}

let diseaseName: string, confidence: number

export default function ServicesPage() {
  const [selectedCrop, setSelectedCrop] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<DiseaseDetails | null>(null)
  const [error, setError] = useState<string | null>(null)

  const crops = ["Potato", "Corn", "Rice", "Wheat", "Pepper Bell"]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError(null)
      setResult(null)
    }
  }


  
  const diseaseInfoMap: DiseaseInfo = {
    Potato: {
      "Early Blight": {
        causes: [
          "Fungus Alternaria solani infects older leaves",
          "Thrives in warm weather and high humidity, especially during prolonged leaf wetness",
        ],
        effects: [
          "Dark brown to black spots with concentric rings on older leaves",
          "Premature defoliation reduces photosynthesis efficiency",
          "Can result in significant yield loss if left untreated",
        ],
        treatment: [
          "Apply Mancozeb @ 2g/L at early signs of disease",
          "Follow crop rotation practices to prevent recurrence",
          "Remove and destroy infected plant debris from the field",
        ],
        prevention: [
          "Practice crop rotation with non-host crops",
          "Avoid overhead irrigation to reduce leaf wetness",
          "Use resistant or tolerant potato varieties if available",
        ],
      },
      "Late Blight": {
        causes: [
          "Caused by oomycete Phytophthora infestans",
          "Favors cool temperatures (10–20°C) and high humidity with extended leaf wetness",
        ],
        effects: [
          "Water-soaked irregular lesions on leaves and stems",
          "White, fluffy mold growth underneath leaves during humid conditions",
          "Rapid plant collapse and destruction of tubers in advanced stages",
        ],
        treatment: [
          "Use a combination of Metalaxyl + Mancozeb @ 2g/L as foliar spray",
          "Plant disease-resistant potato varieties if available",
        ],
        prevention: [
          "Ensure proper field drainage and avoid overcrowding plants",
          "Remove volunteer potato plants and infected debris",
          "Use disease-free seed tubers",
        ],
      },
      Healthy: {
        causes: [],
        effects: ["No visible signs of disease; leaves are green and intact"],
        treatment: ["Maintain good farming practices including timely irrigation and sanitation"],
        prevention: ["Regular crop monitoring and timely intervention", "Use certified seeds and rotate crops"],
      },
    },
  
    Corn: {
      "Gray Leaf Spot": {
        causes: [
          "Fungal infection by Cercospora zeae-maydis",
          "High humidity and minimum air circulation promote disease",
        ],
        effects: [
          "Narrow, rectangular, tan-colored lesions on leaves",
          "Lesions merge to form large necrotic areas, reducing leaf surface for photosynthesis",
        ],
        treatment: [
          "Timely application of recommended fungicides (e.g., azoxystrobin)",
          "Use resistant hybrids suited for your region",
          "Rotate with non-host crops like soybean",
        ],
        prevention: [
          "Ensure proper plant spacing for airflow",
          "Avoid monocropping and maintain field hygiene",
          "Use tillage to incorporate crop residue and reduce spore load",
        ],
      },
      "Common Rust": {
        causes: [
          "Fungal pathogen Puccinia sorghi spread by wind-borne spores",
          "Develops rapidly under moist, moderate temperature conditions",
        ],
        effects: [
          "Reddish-brown pustules appear on both upper and lower leaf surfaces",
          "Severe infections reduce photosynthetic activity and grain fill",
        ],
        treatment: [
          "Spray fungicides such as tebuconazole or propiconazole",
          "Prefer hybrids with rust resistance",
        ],
        prevention: [
          "Avoid late planting as rust risk increases",
          "Scout fields regularly for early signs of rust",
          "Implement crop rotation with non-host species",
        ],
      },
      "Leaf Blight": {
        causes: [
          "Fungal infection by Helminthosporium turcicum (Exserohilum turcicum)",
          "Infects during cool, humid weather, especially in poorly rotated fields",
        ],
        effects: [
          "Gray-green lesions that enlarge and become tan with dark margins",
          "Rapid death of leaves, leading to poor grain development",
        ],
        treatment: [
          "Use certified seeds treated with appropriate fungicide",
          "Remove and destroy crop residues after harvest",
        ],
        prevention: [
          "Plant resistant varieties",
          "Avoid dense planting to reduce leaf wetness",
          "Use crop rotation and field sanitation",
        ],
      },
      Healthy: {
        causes: [],
        effects: ["Healthy crop with vibrant green foliage and upright posture"],
        treatment: [],
        prevention: ["Use disease-resistant varieties", "Maintain field cleanliness and rotate crops"],
      },
    },
  
    "Pepper Bell": {
      "Bacterial Spot": {
        causes: [
          "Bacterial pathogen Xanthomonas campestris pv. vesicatoria infects leaves and fruits",
          "Favored by warm, wet conditions and spread through splashing water or tools",
        ],
        effects: [
          "Dark water-soaked lesions that later become necrotic",
          "Leaf drop, fruit spots, and defoliation reduce yield and quality",
        ],
        treatment: [
          "Apply copper-based bactericides regularly during growing season",
          "Start with certified disease-free seeds or transplants",
        ],
        prevention: [
          "Avoid overhead irrigation",
          "Disinfect tools and equipment",
          "Do not handle wet plants; rotate crops every season",
        ],
      },
      Healthy: {
        causes: [],
        effects: ["Healthy pepper plants with glossy leaves and firm bulbs"],
        treatment: [],
        prevention: ["Use healthy seeds and proper spacing", "Water at the base to prevent leaf wetness"],
      },
    },
  
    Rice: {
      "Brown Spot": {
        causes: [
          "Caused by fungus Bipolaris oryzae, often seed-borne",
          "Exacerbated by nutrient deficiency (especially potassium), drought, and poor drainage",
        ],
        effects: [
          "Circular to oval brown lesions on leaves, seeds, and grains",
          "Affects grain filling and overall grain quality",
        ],
        treatment: [
          "Apply balanced fertilizers, especially potassium and phosphorus",
          "Treat seeds with fungicide before sowing",
        ],
        prevention: [
          "Avoid excessive nitrogen use",
          "Ensure proper field drainage",
          "Use certified, treated seeds",
        ],
      },
      "Leaf Blast": {
        causes: [
          "Fungal disease caused by Magnaporthe oryzae, affecting foliage and collars",
          "Develops under high humidity and leaf wetness with temperature 25–30°C",
        ],
        effects: [
          "Spindle-shaped lesions with grey centers and brown margins on leaves",
          "Severe infections cause leaf wilting and drying",
        ],
        treatment: [
          "Apply silicon-based fertilizers to strengthen plant cell walls",
          "Use effective fungicides like Tricyclazole at early symptom stage",
        ],
        prevention: [
          "Avoid excess nitrogen application",
          "Ensure good air circulation and spacing between plants",
          "Use resistant rice varieties when possible",
        ],
      },
      "Neck Blast": {
        causes: [
          "A form of blast caused by Magnaporthe oryzae, attacking the panicle neck",
          "Aggravated by excessive nitrogen and water stagnation",
        ],
        effects: [
          "Neck turns black and weakens, leading to panicle breakage",
          "Spikelets remain unfilled or develop poorly, reducing grain yield",
        ],
        treatment: [
          "Cultivate resistant rice varieties",
          "Use optimal nitrogen levels and maintain field drainage",
        ],
        prevention: [
          "Avoid over-irrigation and water stagnation",
          "Apply fertilizers in recommended dose and timing",
          "Regularly monitor fields during flowering stage",
        ],
      },
      Health: {
        causes: [],
        effects: ["Healthy crop with tall, upright tillers and no visible lesions"],
        treatment: [],
        prevention: ["Maintain proper nutrition and spacing", "Monitor for early signs of disease regularly"],
      },
    },

    Wheat: {
      "Brown Rust": {
        causes: [
          "Caused by the fungus *Puccinia triticina*, spread via airborne spores",
          "Favored by warm temperatures (15–22°C) and moist conditions",
        ],
        effects: [
          "Small, circular, reddish-brown pustules mainly on lower leaves",
          "Reduces photosynthetic area, leading to poor grain filling and yield loss",
        ],
        treatment: [
          "Spray fungicides like Propiconazole at early infection stage",
          "Remove volunteer wheat and weed hosts",
        ],
        prevention: [
          "Use rust-resistant wheat varieties",
          "Practice crop rotation and timely sowing",
          "Monitor fields regularly during growth stages",
        ],
      },
      "Yellow Rust": {
        causes: [
          "Caused by the fungus *Puccinia striiformis f. sp. tritici*, spread by wind-borne spores",
          "Favors cool (10–15°C) and humid conditions",
        ],
        effects: [
          "Yellow, stripe-like pustules on leaves and leaf sheaths",
          "Can lead to premature leaf death, stunted growth, and yield loss",
        ],
        treatment: [
          "Apply fungicides like Tebuconazole or Mancozeb when symptoms appear",
          "Remove infected plant debris from fields",
        ],
        prevention: [
          "Grow resistant wheat varieties",
          "Avoid late sowing and dense planting",
          "Ensure balanced fertilizer application",
        ],
      },
      "Healthy": {
        causes: [],
        effects: [
          "Vigorous plants with green, upright leaves and no rust pustules",
        ],
        treatment: [],
        prevention: [
          "Use certified disease-free seeds",
          "Follow integrated nutrient and disease management practices",
          "Monitor field conditions and apply preventive measures in time",
        ],
      },
    }
    
  };
  
  
  // export default diseaseInfo;
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCrop) {
      setError("Please select a crop type")
      return
    }
    if (!selectedFile) {
      setError("Please upload an image")
      return
    }

    setIsAnalyzing(true)
    setError(null)

    const formData = new FormData()
    formData.append("crop", selectedCrop)
    formData.append("image", selectedFile)

    try {
      const response = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Prediction failed")
      }

      const predictions: Record<string, number> = await response.json()

      const topDisease = Object.entries(predictions).sort((a, b) => b[1] - a[1])[0]
      let [d, c] = topDisease
      diseaseName = d

      const diseaseInfo = diseaseInfoMap[selectedCrop][diseaseName]
      confidence = parseFloat(c.toFixed(2))

      setResult(diseaseInfo)
    } catch (err) {
      setError("Failed to analyze the image. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-background-light">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <h1 className="text-4xl font-bold text-primary-green text-center mb-4">
            Crop Disease Detection
          </h1>
          <p className="text-center text-secondary-green mb-12 max-w-2xl mx-auto">
            Upload an image of your crop to identify diseases and get treatment recommendations.
          </p>
        </AnimationWrapper>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimationWrapper delay={100}>
            <div className="bg-white p-6 rounded-lg shadow-md" style={{marginRight: '5px'}}>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="crop" className="block text-secondary-green mb-2 font-medium">
                    Select Crop Type
                  </label>
                  <select
                    id="crop"
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green"
                  >
                    <option value="">-- Choose a crop --</option>
                    {crops.map((crop) => (
                      <option key={crop} value={crop}>
                        {crop}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="image" className="block text-secondary-green mb-2 font-medium">
                    Upload Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                    <input
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label htmlFor="image" className="cursor-pointer flex flex-col items-center">
                      <Upload size={36} className="text-secondary-green mb-2" />
                      <span className="text-secondary-green">Click to upload or drag and drop</span>
                      <span className="text-sm text-gray-500 mt-1">JPG, PNG or JPEG (max. 5MB)</span>
                    </label>
                    {previewUrl && (
                      <img src={previewUrl} alt="Preview" className="mt-4 rounded-md max-h-48 mx-auto" />
                    )}
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                    <AlertCircle size={20} className="mr-2" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-primary-green text-white py-3 rounded-md font-medium hover:bg-green-700 transition"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                </button>
              </form>
            </div>
          </AnimationWrapper>

          {result && (
            <AnimationWrapper delay={200}>
              <div className="bg-white p-6 rounded-lg shadow-md" style={{marginLeft: '5px', height: '100%'}}>
                <h2 className="text-2xl font-semibold text-primary-green mb-4 flex items-center">
                  <Check className="mr-2 text-green-600" />
                  Detected: {diseaseName}
                </h2>
                <p className="text-gray-600 mb-2">Confidence: <strong>{confidence*100}%</strong></p>

                <div className="mt-4 space-y-4" style={{height: '100%'}}>
                  {result.causes.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-secondary-green">Causes</h3>
                      <ul className="list-disc pl-5 text-sm text-gray-700">
                        {result.causes.map((c, idx) => <li key={idx}>{c}</li>)}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-secondary-green">Effects</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {result.effects.map((e, idx) => <li key={idx}>{e}</li>)}
                    </ul>
                  </div>
                  {result.treatment.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-secondary-green">Treatment</h3>
                      <ul className="list-disc pl-5 text-sm text-gray-700">
                        {result.treatment.map((t, idx) => <li key={idx}>{t}</li>)}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-secondary-green">Prevention</h3>
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {result.prevention.map((p: string, idx:number) => <li key={idx}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          )}
        </div>
      </div>
    </div>
  )
}
