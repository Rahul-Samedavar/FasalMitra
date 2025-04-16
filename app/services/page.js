import React, { useState } from "react"

const diseaseInfo = {
  Potato: {
    "Early Blight": {
      causes: ["Fungus Alternaria solani", "Warm weather & high humidity"],
      effects: [
        "Dark spots with concentric rings on older leaves",
        "Reduced photosynthesis",
        "Yield loss if untreated",
      ],
      treatment: ["Mancozeb @ 2g/L", "Crop rotation", "Remove infected debris"],
    },
    "Late Blight": {
      causes: ["Phytophthora infestans", "Cool, moist conditions"],
      effects: ["Water-soaked spots", "White mold under leaves", "Rapid plant death"],
      treatment: ["Metalaxyl + Mancozeb @ 2g/L", "Resistant varieties"],
    },
    Healthy: {
      causes: [],
      effects: ["No visible signs of disease"],
      treatment: ["Maintain good farming practices"],
    },
  },
  Corn: {
    "Gray Leaf Spot": {
      causes: ["Fungal pathogen Cercospora zeae-maydis"],
      effects: ["Small tan lesions on leaves", "Photosynthesis reduction"],
      treatment: ["Use fungicides", "Resistant hybrids", "Crop rotation"],
    },
    "Common Rust": {
      causes: ["Fungus Puccinia sorghi"],
      effects: ["Reddish-brown pustules", "Lower yield"],
      treatment: ["Fungicide spray", "Use resistant varieties"],
    },
    "Leaf Blight": {
      causes: ["Fungus Helminthosporium turcicum"],
      effects: ["Gray-green lesions", "Rapid leaf death"],
      treatment: ["Seed treatment", "Remove infected residues"],
    },
    Healthy: {
      causes: [],
      effects: ["Healthy crop"],
      treatment: [],
    },
  },
  "Pepper Bulb": {
    "Bacterial Spot": {
      causes: ["Bacterium Xanthomonas campestris"],
      effects: ["Dark water-soaked lesions", "Leaf drop"],
      treatment: ["Copper-based bactericides", "Disease-free seed"],
    },
    Healthy: {
      causes: [],
      effects: ["Healthy crop"],
      treatment: [],
    },
  },
  Rice: {
    "Brown Spot": {
      causes: ["Fungus Bipolaris oryzae"],
      effects: ["Circular brown lesions", "Poor grain filling"],
      treatment: ["Proper fertilization", "Seed treatment with fungicide"],
    },
    "Leaf Blast": {
      causes: ["Magnaporthe oryzae fungus"],
      effects: ["Spindle-shaped spots", "Leaf wilting"],
      treatment: ["Silicon fertilizer", "Fungicides like Tricyclazole"],
    },
    "Neck Blast": {
      causes: ["Magnaporthe oryzae"],
      effects: ["Blackening of the neck", "Empty panicles"],
      treatment: ["Resistant varieties", "Avoid excess nitrogen"],
    },
    Health: {
      causes: [],
      effects: ["Healthy crop"],
      treatment: [],
    },
  },
}

export default function DiseaseDetector() {
  const [selectedCrop, setSelectedCrop] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
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
    setResult(null)

    const formData = new FormData()
    formData.append("image", selectedFile)
    formData.append("crop", selectedCrop)

    try {
      const res = await fetch("/predict", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Prediction failed. Please try again.")

      const data = await res.json()

      const diseaseResults = Object.entries(data.predictions)
        .map(([disease, confidence]) => ({
          disease,
          confidence,
          ...(diseaseInfo[selectedCrop]?.[disease] || {}),
        }))
        .sort((a, b) => b.confidence - a.confidence)

      setResult(diseaseResults)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary-green mb-4">
        Crop Disease Detector
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Crop Type</label>
          <select
            className="w-full border p-2 rounded-md"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            <option value="">-- Select a crop --</option>
            <option value="Potato">Potato</option>
            <option value="Corn">Corn</option>
            <option value="Pepper Bulb">Pepper Bulb</option>
            <option value="Rice">Rice</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border p-2 rounded-md"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>

        {error && (
          <div className="text-red-600 font-medium">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isAnalyzing}
          className="bg-primary-green text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {result && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-primary-green mb-4">
            Prediction Results
          </h2>
          <div className="space-y-6">
            {result.map(({ disease, confidence, causes, effects, treatment }) => (
              <div key={disease} className="p-4 border border-gray-200 rounded-md shadow-sm bg-white">
                <h3 className="text-lg font-semibold text-primary-green">
                  {disease} — <span className="text-secondary-green">{confidence.toFixed(2)}%</span>
                </h3>

                {causes?.length > 0 && (
                  <div className="mt-2">
                    <strong className="text-gray-700">Causes:</strong>
                    <ul className="list-disc list-inside text-gray-600">
                      {causes.map((cause, i) => (
                        <li key={i}>{cause}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {effects?.length > 0 && (
                  <div className="mt-2">
                    <strong className="text-gray-700">Effects:</strong>
                    <ul className="list-disc list-inside text-gray-600">
                      {effects.map((effect, i) => (
                        <li key={i}>{effect}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {treatment?.length > 0 && (
                  <div className="mt-2">
                    <strong className="text-gray-700">Treatment:</strong>
                    <ul className="list-disc list-inside text-gray-600">
                      {treatment.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
