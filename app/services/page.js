"use client"

import { useState } from "react"
import { Upload, AlertCircle, Check, Pill } from "lucide-react"
import AnimationWrapper from "@/components/animation-wrapper"

export default function ServicesPage() {
  const [selectedCrop, setSelectedCrop] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const crops = ["Rice", "Wheat", "Cotton", "Sugarcane", "Maize", "Potato", "Tomato", "Chili", "Soybean", "Groundnut"]

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError(null)
      setResult(null)
    }
  }

  const handleSubmit = (e) => {
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

    // Simulate API call for disease detection
    setTimeout(() => {
      setIsAnalyzing(false)

      // Mock results based on crop type
      const mockResults = {
        Rice: {
          disease: "Rice Blast",
          confidence: 92.5,
          causes: ["Fungal pathogen Magnaporthe oryzae", "High humidity (>90%)", "Temperature between 24-28°C"],
          effects: [
            "Elliptical or spindle-shaped lesions with pointed ends",
            "Gray centers and brown margins on leaves",
            "Reduced photosynthesis",
            "Yield loss of 30-50% in severe cases",
          ],
          treatment: [
            "Apply fungicides like Tricyclazole (75% WP) @ 0.6g/L",
            "Isoprothiolane (40% EC) @ 1.5ml/L",
            "Spray at early stages of infection",
          ],
          prevention: [
            "Use resistant varieties",
            "Balanced fertilization (avoid excess nitrogen)",
            "Proper spacing between plants for good air circulation",
            "Seed treatment with fungicides before sowing",
          ],
        },
        Wheat: {
          disease: "Wheat Rust (Yellow Rust)",
          confidence: 88.7,
          causes: ["Fungal pathogen Puccinia striiformis", "Cool temperatures (10-15°C)", "High humidity or dew"],
          effects: [
            "Yellow-orange pustules arranged in stripes on leaves",
            "Reduced grain filling",
            "Shriveled grains",
            "Yield loss of 10-70% depending on severity",
          ],
          treatment: [
            "Apply Propiconazole (25% EC) @ 0.1%",
            "Tebuconazole (25.9% EC) @ 0.1%",
            "Spray at first sign of disease",
          ],
          prevention: [
            "Plant resistant varieties",
            "Early sowing to escape favorable disease conditions",
            "Destroy volunteer wheat plants",
            "Crop rotation with non-host crops",
          ],
        },
        Cotton: {
          disease: "Cotton Leaf Curl Virus",
          confidence: 95.2,
          causes: [
            "Cotton leaf curl virus transmitted by whitefly",
            "High whitefly population",
            "Warm and dry conditions",
          ],
          effects: [
            "Upward or downward curling of leaves",
            "Thickened veins and enations on underside of leaves",
            "Stunted growth",
            "Reduced boll formation and yield loss up to 30-80%",
          ],
          treatment: [
            "No direct cure for viral infection",
            "Control whitefly vector using Imidacloprid (17.8% SL) @ 0.5ml/L",
            "Thiamethoxam (25% WG) @ 0.2g/L",
          ],
          prevention: [
            "Use resistant/tolerant varieties",
            "Early sowing to escape peak whitefly population",
            "Remove and destroy infected plants",
            "Maintain field hygiene and remove weed hosts",
          ],
        },
        Sugarcane: {
          disease: "Red Rot",
          confidence: 91.3,
          causes: ["Fungal pathogen Colletotrichum falcatum", "Infected setts", "Waterlogged conditions"],
          effects: [
            "Reddening of internal tissues with white patches",
            "Drying of leaves from top to bottom",
            "Sour alcoholic smell from infected canes",
            "Yield loss of 30-100% in susceptible varieties",
          ],
          treatment: [
            "No effective chemical control once infected",
            "Remove and destroy infected plants",
            "Improve drainage in waterlogged areas",
          ],
          prevention: [
            "Use disease-free setts for planting",
            "Treat setts with Carbendazim (50% WP) @ 0.1%",
            "Crop rotation with rice or legumes",
            "Avoid ratooning in infected fields",
          ],
        },
        default: {
          disease: "Leaf Spot Disease",
          confidence: 85.0,
          causes: ["Fungal pathogen", "High humidity", "Poor air circulation"],
          effects: [
            "Circular or irregular spots on leaves",
            "Yellowing of leaves",
            "Premature leaf drop",
            "Reduced yield",
          ],
          treatment: [
            "Apply appropriate fungicides",
            "Remove and destroy infected plant parts",
            "Improve air circulation",
          ],
          prevention: [
            "Use resistant varieties",
            "Proper spacing between plants",
            "Balanced fertilization",
            "Crop rotation",
          ],
        },
      }

      // Set result based on selected crop or default
      setResult(mockResults[selectedCrop] || mockResults.default)
    }, 2000)
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-background-light">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-green text-center mb-4">Crop Disease Detection</h1>
          <p className="text-center text-secondary-green mb-12 max-w-2xl mx-auto">
            Upload an image of your crop to identify diseases and get treatment recommendations.
          </p>
        </AnimationWrapper>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimationWrapper delay={200}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-primary-green mb-6">Upload Crop Image</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="crop" className="block text-secondary-green mb-2">
                      Select Crop Type
                    </label>
                    <select
                      id="crop"
                      value={selectedCrop}
                      onChange={(e) => setSelectedCrop(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green"
                    >
                      <option value="">Select a crop</option>
                      {crops.map((crop) => (
                        <option key={crop} value={crop}>
                          {crop}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="image" className="block text-secondary-green mb-2">
                      Upload Image
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                      <input type="file" id="image" accept="image/*" onChange={handleFileChange} className="hidden" />
                      <label htmlFor="image" className="cursor-pointer flex flex-col items-center">
                        <Upload size={40} className="text-secondary-green mb-2" />
                        <span className="text-secondary-green">Click to upload or drag and drop</span>
                        <span className="text-sm text-gray-500 mt-1">JPG, PNG or JPEG (max. 5MB)</span>
                      </label>
                      {previewUrl && (
                        <div className="mt-4">
                          <img
                            src={previewUrl || "/placeholder.svg"}
                            alt="Preview"
                            className="max-h-48 mx-auto rounded-md"
                          />
                        </div>
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
                    className="w-full btn-primary-green py-3 rounded-md font-medium"
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Analyzing Image...
                      </span>
                    ) : (
                      "Detect Disease"
                    )}
                  </button>
                </form>
              </div>
            </AnimationWrapper>

            <AnimationWrapper delay={400}>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-primary-green mb-6">Detection Results</h2>
                {!result && !isAnalyzing ? (
                  <div className="text-center py-12">
                    <img src="/placeholder.svg?height=150&width=150" alt="Upload" className="mx-auto mb-4 opacity-50" />
                    <p className="text-secondary-green">Upload an image to see disease detection results</p>
                  </div>
                ) : isAnalyzing ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 border-4 border-primary-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-secondary-green">Analyzing your crop image...</p>
                  </div>
                ) : (
                  result && (
                    <div className="space-y-4">
                      <div className="bg-accent-beige/30 p-4 rounded-md">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-primary-green">Detected Disease</h3>
                          <span className="bg-primary-green text-white px-2 py-1 rounded-md text-sm">
                            {result.confidence.toFixed(1)}% Confidence
                          </span>
                        </div>
                        <p className="text-xl font-bold text-primary-green mt-2">{result.disease}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-primary-green mb-2">Causes</h3>
                        <ul className="list-disc list-inside text-secondary-green">
                          {result.causes.map((cause, i) => (
                            <li key={i}>{cause}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-primary-green mb-2">Effects</h3>
                        <ul className="list-disc list-inside text-secondary-green">
                          {result.effects.map((effect, i) => (
                            <li key={i}>{effect}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-primary-green mb-2">Treatment</h3>
                        <ul className="list-disc list-inside text-secondary-green">
                          {result.treatment.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-primary-green mb-2">Prevention</h3>
                        <ul className="list-disc list-inside text-secondary-green">
                          {result.prevention.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                )}
              </div>
            </AnimationWrapper>
          </div>

          <AnimationWrapper delay={600}>
            <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-primary-green mb-6">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-beige rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload size={32} className="text-primary-green" />
                  </div>
                  <h3 className="font-semibold text-primary-green mb-2">1. Upload Image</h3>
                  <p className="text-secondary-green">
                    Take a clear photo of the affected plant part and upload it to our platform.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-beige rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-primary-green" />
                  </div>
                  <h3 className="font-semibold text-primary-green mb-2">2. AI Analysis</h3>
                  <p className="text-secondary-green">
                    Our AI system analyzes the image to identify the disease and its severity.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-beige rounded-full flex items-center justify-center mx-auto mb-4">
                    <Pill size={32} className="text-primary-green" />
                  </div>
                  <h3 className="font-semibold text-primary-green mb-2">3. Get Recommendations</h3>
                  <p className="text-secondary-green">
                    Receive detailed information about the disease and specific treatment recommendations.
                  </p>
                </div>
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </div>
  )
}
