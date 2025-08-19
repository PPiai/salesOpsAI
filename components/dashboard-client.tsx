"use client"

import { useState, useEffect } from "react"
import type { User } from "@supabase/supabase-js"

interface DashboardClientProps {
  user: User
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [showChat, setShowChat] = useState(false)
  const [chatLoaded, setChatLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (showChat && !chatLoaded) {
      try {
        const script = document.createElement("script")
        script.src = "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
        script.type = "module"
        script.onload = () => {
          setTimeout(() => {
            try {
              if (window.Chatbot) {
                window.Chatbot.init({
                  chatflowid: "9609086f-a776-4952-8da5-7b43c7f7fede",
                  apiHost: "https://flowise-flowise.uyk8ty.easypanel.host",
                  theme: {
                    button: {
                      backgroundColor: "#dc2626",
                      right: 20,
                      bottom: 20,
                      size: 48,
                      dragAndDrop: true,
                      iconColor: "white",
                      customIconSrc:
                        "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
                    },
                    tooltip: {
                      showTooltip: true,
                      tooltipMessage: "Olá! 👋",
                      tooltipBackgroundColor: "#dc2626",
                      tooltipTextColor: "white",
                      tooltipFontSize: 16,
                    },
                    chatWindow: {
                      showTitle: true,
                      title: "Sales Ops AI",
                      titleAvatarSrc:
                        "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png",
                      showAgentMessages: true,
                      welcomeMessage: "Olá! Sou seu assistente de vendas. Como posso ajudá-lo hoje?",
                      errorMessage: "Ops! Algo deu errado. Tente novamente.",
                      backgroundColor: "#ffffff",
                      height: 700,
                      width: 400,
                      fontSize: 16,
                      poweredByTextColor: "#303235",
                      botMessage: {
                        backgroundColor: "#f7f8ff",
                        textColor: "#303235",
                        showAvatar: true,
                        avatarSrc:
                          "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png",
                      },
                      userMessage: {
                        backgroundColor: "#dc2626",
                        textColor: "#ffffff",
                        showAvatar: true,
                        avatarSrc:
                          "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
                      },
                      textInput: {
                        placeholder: "Digite sua mensagem...",
                        backgroundColor: "#ffffff",
                        textColor: "#303235",
                        sendButtonColor: "#dc2626",
                        maxChars: 50,
                        maxCharsWarningMessage:
                          "Você excedeu o limite de caracteres. Por favor, digite menos de 50 caracteres.",
                        autoFocus: true,
                        sendMessageSound: true,
                        receiveMessageSound: true,
                      },
                      feedback: {
                        color: "#303235",
                      },
                      footer: {
                        textColor: "#303235",
                        text: "Feito por",
                        company: "V4 Ferraz Piai",
                        companyLink: "https://flowiseai.com",
                      },
                    },
                  },
                })
                setChatLoaded(true)
              }
            } catch (err) {
              console.error("Erro ao inicializar chatbot:", err)
              setError("Erro ao carregar o chatbot")
            }
          }, 1000)
        }
        script.onerror = () => {
          setError("Erro ao carregar o script do chatbot")
        }
        document.head.appendChild(script)
      } catch (err) {
        console.error("Erro ao carregar chatbot:", err)
        setError("Erro ao inicializar o chatbot")
      }
    }
  }, [showChat, chatLoaded])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 relative">
      {/* Header */}
      <div className="flex justify-between items-center p-6 text-white">
        <div>
          <h1 className="text-3xl font-bold">Sales Ops AI</h1>
          <p className="text-red-100">Seu assistente inteligente</p>
        </div>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
          >
            Sair
          </button>
        </form>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">Bem-vindo, {user?.email || "Usuário"}!</h2>
          <p className="text-xl text-red-100 mb-8">Converse com nosso assistente de vendas inteligente</p>

          {error && (
            <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-4 text-white mb-4">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {!showChat && (
            <button
              onClick={() => setShowChat(true)}
              className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🚀 Iniciar Conversa
            </button>
          )}

          {showChat && !error && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
              <p className="text-sm">
                {chatLoaded
                  ? "Chatbot ativo - Clique no ícone no canto inferior direito para conversar"
                  : "Carregando chatbot..."}
              </p>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-2">Aumento de Faturamento</h3>
            <p className="text-red-100">Estratégias comprovadas para aumentar suas vendas</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
            <div className="text-3xl mb-4">🏗️</div>
            <h3 className="text-xl font-semibold mb-2">Estruturação</h3>
            <p className="text-red-100">Organize seu negócio para crescimento sustentável</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Consultoria Especializada</h3>
            <p className="text-red-100">Suporte personalizado para seus desafios</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-semibold mb-4">Como usar o assistente</h3>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="font-semibold mb-2">💬 Perguntas Sugeridas:</h4>
              <ul className="space-y-1 text-red-100">
                <li>• Em quanto tempo consigo aumentar o meu faturamento?</li>
                <li>• Quais as fases da estruturação?</li>
                <li>• Como melhorar meu processo de vendas?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">🎯 Dicas:</h4>
              <ul className="space-y-1 text-red-100">
                <li>• Seja específico em suas perguntas</li>
                <li>• Descreva seu contexto de negócio</li>
                <li>• Aproveite as sugestões do assistente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
