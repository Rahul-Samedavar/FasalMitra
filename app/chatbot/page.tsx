"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Send, Loader2 } from "lucide-react"
import AnimationWrapper from "@/components/animation-wrapper"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

const languageOptions = ["English", "Hindi", "Kannada", "Marathi", "Tamil", "Telugu"]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your crop assistant. How can I help you today?",
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState("English")
  const [speakingId, setSpeakingId] = useState<number | null>(null)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])


  const getLanguageCode = (lang: string) => {
    switch (lang) {
      case "Hindi": return "hi-IN"
      case "Tamil": return "ta-IN"
      case "Telugu": return "te-IN"
      case "Kannada": return "kn-IN"
      case "Marathi": return "mr-IN"
      default: return "en-US"
    }
  }

  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
  }
  

  const toggleSpeak = async (text: string, id: number) => {
    // If the same message is clicked again, pause or play the current audio
    if (speakingId === id) {
      if (currentAudio) {
        if (currentAudio.paused) {
          currentAudio.play()  // If it's paused, resume it
        } else {
          currentAudio.pause()  // If it's playing, pause it
          setSpeakingId(null)
        }
      }
      return
    }
  
    setSpeakingId(id)
  
    try {
      const res = await fetch("http://127.0.0.1:8000/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: stripHtml(text), lang: language }),
      })
  
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
  
      // Create a new audio object and set it as the current audio
      const audio = new Audio(url)
      audio.onended = () => {
        setSpeakingId(null)
        URL.revokeObjectURL(url)
      }
  
      setCurrentAudio(audio)  // Store the current audio object
      audio.play()  // Play the audio
    } catch (err) {
      console.error("TTS Error:", err)
      setSpeakingId(null)
    }
  }
  
  

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      console.log( messages.map((m) => `${m.sender === "user" ? "User" : "Bot"}: ${m.text}`).join("\n"))
      const response = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_history: messages.map((m) => `${m.sender === "user" ? "User" : "Bot"}: ${m.text}`).join("\n"),
          query: input,
          language: language,
        }),
      })

      const data = await response.json()
      const answer = data.answer.replace("\n", "<br>")
      const sourcesLinks =
      data.sources?.length > 0
        ? data.sources
            .map((source: string) => {
              const match = source.match(/page\s*(\d+)/i)
              const page = match ? match[1] : "1"
              return `<a href="https://www.manage.gov.in/publications/farmerbook.pdf#page=${page}" target="_blank" class="underline text-blue-600 hover:text-blue-800">Page ${page}</a>`
            })
            .join(", ")
        : ""
    
    const botMessage: Message = {
      id: messages.length + 2,
      text: `${answer}<br>${sourcesLinks ? `\n\n📄 Sources: ${sourcesLinks}` : ""}`,
      sender: "bot",
    }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          text: "Sorry, something went wrong.",
          sender: "bot",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-background-light">
      <div className="container mx-auto px-4">
        <AnimationWrapper>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-green text-center mb-8">Crop Assistant Chatbot</h1>
          <p className="text-center text-secondary-green mb-8 max-w-2xl mx-auto">
            Ask questions about crop diseases, cultivation practices, or upload images for disease detection.
          </p>
        </AnimationWrapper>

        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-primary-green text-white p-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">CropGuard Assistant</h2>
              <p className="text-sm opacity-80">Available in Hindi, Tamil, Telugu, Kannada, Marathi, and English</p>
            </div>
            <select
              style={{textAlign: 'center'}}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white text-primary-green font-medium px-3 py-2 rounded-md shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-green hover:border-primary-green transition-all duration-200"
            >
              {languageOptions.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="h-[500px] overflow-y-auto p-4 flex flex-col">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.sender === "user" ? "user-message" : "bot-message"}`}
              >
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  {message.sender === "bot" ? (
                    <div dangerouslySetInnerHTML={{ __html: message.text }} />
                  ) : (
                    <span>{message.text}</span>
                  )}
                </div>
                <button
                  onClick={() => toggleSpeak(message.text, message.id)}
                  className="text-primary-green hover:text-secondary-green transition-colors"
                  title={speakingId === message.id ? "Stop" : "Speak"}
                >
                  🔊
                </button>
              </div>

              </div>
            ))}
            {isLoading && (
              <div className="chat-message bot-message flex items-center">
                <Loader2 className="animate-spin mr-2" size={16} />
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-primary-green text-white rounded-md px-4 py-2 hover:bg-secondary-green transition-colors disabled:opacity-50"
              disabled={isLoading || !input.trim()}
            >
              <Send size={20} />
            </button>
          </form>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <AnimationWrapper delay={300}>
            <h3 className="text-xl font-semibold text-primary-green mb-4">Suggested Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "How do I identify rice blast disease?",
                "What are the best practices for wheat cultivation?",
                "How to prevent cotton bollworm?",
                "What pesticides are safe for sugarcane?",
                "How often should I irrigate my tomato plants?",
              ].map((question) => (
                <button
                  key={question}
                  onClick={() => setInput(question)}
                  className="text-left p-3 bg-accent-beige/30 hover:bg-accent-beige/50 rounded-md text-primary-green transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </AnimationWrapper>
        </div>
      </div>
    </div>
  )
}
