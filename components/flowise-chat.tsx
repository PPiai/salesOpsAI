"use client"

import { useState, useRef, useEffect } from "react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const FlowiseChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Como posso ajudá-lo com suas vendas hoje?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const starterPrompts = [
    "Quais dados e informações são essenciais para a análise do cenário atual da empresa?",
    "Quais são os principais passos para desenhar e configurar um novo processo comercial eficiente?",
    "Como medir a efetividade das ações implementadas e garantir o desenvolvimento contínuo da equipe de vendas?"
  ]

  const handleResetChat = () => {
    setMessages([
      {
        id: "1",
        text: "Olá! Como posso ajudá-lo com suas vendas hoje?",
        isUser: false,
        timestamp: new Date(),
      },
    ])
    setInputValue("")
    setIsLoading(false)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    setTimeout(() => {
      const responses = [
        "Excelente pergunta! Para melhorar suas vendas, foque em entender as necessidades do cliente e construir relacionamentos sólidos.",
        "Uma estratégia eficaz é qualificar bem os leads antes de investir tempo. Use critérios como orçamento, autoridade e necessidade.",
        "Para fechar mais negócios, pratique a escuta ativa e apresente soluções que resolvam problemas específicos do cliente.",
        "Lembre-se: vendas é sobre resolver problemas, não apenas vender produtos. Foque no valor que você entrega.",
        "Uma boa abordagem é fazer perguntas abertas para descobrir as dores do cliente e então apresentar sua solução.",
      ]

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsLoading(false)
    }, 1000)
  }

  const handleStarterPrompt = (prompt: string) => {
    handleSendMessage(prompt)
  }

  return (
    <div className="flex flex-col h-full bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/proxy/sirPhoJhvKS9Vi-8lHbzScplbpIF7P3yPWlGKkGs5M7ydL5XVpmt3v_4w8rUT0yR2cWX-3eWuwvzl7xVaIbn_PbnrbEt-mc=s88-w88-h88-c-k-no"
            alt="Sales Ops AI"
            className="w-8 h-8 rounded-full"
          />
          <h2 className="text-lg font-semibold">Sales Ops AI</h2>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.isUser ? "justify-end" : "justify-start"}`}>
            {!message.isUser && (
              <img
                src="https://lh3.googleusercontent.com/proxy/sirPhoJhvKS9Vi-8lHbzScplbpIF7P3yPWlGKkGs5M7ydL5XVpmt3v_4w8rUT0yR2cWX-3eWuwvzl7xVaIbn_PbnrbEt-mc=s88-w88-h88-c-k-no"
                alt="Bot"
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
            )}
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser ? "bg-red-600 text-white" : "bg-gray-800 text-white"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
            </div>
            {message.isUser && (
              <img
                src="https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png"
                alt="User"
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <img
              src="https://lh3.googleusercontent.com/proxy/sirPhoJhvKS9Vi-8lHbzScplbpIF7P3yPWlGKkGs5M7ydL5XVpmt3v_4w8rUT0yR2cWX-3eWuwvzl7xVaIbn_PbnrbEt-mc=s88-w88-h88-c-k-no"
              alt="Bot"
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {starterPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleStarterPrompt(prompt)}
                className="text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
            placeholder="Digite sua pergunta sobre vendas..."
            className="flex-1 bg-gray-800 text-white p-3 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
            maxLength={500}
            disabled={isLoading}
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white p-3 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Feito Por <span className="text-white">V4 Ferraz Piai</span>
        </p>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={handleResetChat}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors group"
          title="Reiniciar conversa"
        >
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default FlowiseChat
