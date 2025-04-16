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
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponses: { [key: string]: string } = {
        rice: "Rice is susceptible to blast, bacterial leaf blight, and brown spot. Make sure to monitor your crop regularly.",
        wheat:
          "Common wheat diseases include rust, powdery mildew, and loose smut. Early detection is crucial for treatment.",
        cotton:
          "Cotton can suffer from bollworms, bacterial blight, and fusarium wilt. Regular inspection helps prevent spread.",
        default:
          "I can help you identify crop diseases and provide treatment recommendations. Please upload an image or ask a specific question about your crop.",
      }

      let botReply = botResponses.default
      const lowerInput = input.toLowerCase()

      // Check for keywords in user input
      Object.keys(botResponses).forEach((key) => {
        if (lowerInput.includes(key)) {
          botReply = botResponses[key]
        }
      })

      // Add bot response
      const botMessage: Message = {
        id: messages.length + 2,
        text: botReply,
        sender: "bot",
      }
      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
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
          <div className="bg-primary-green text-white p-4">
            <h2 className="font-semibold">CropGuard Assistant</h2>
            <p className="text-sm opacity-80">Available in Hindi, Tamil, Telugu, and English</p>
          </div>

          <div className="h-[500px] overflow-y-auto p-4 flex flex-col">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.sender === "user" ? "user-message" : "bot-message"}`}
              >
                {message.text}
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
