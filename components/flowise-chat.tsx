"use client"

import { useEffect, useState } from "react"

declare global {
  interface Window {
    Chatbot: any
  }
}

const FlowiseChat = () => {
  const [chatbotStatus, setChatbotStatus] = useState<"loading" | "connected" | "error">("loading")
  const [errorMessage, setErrorMessage] = useState("")

  const saveConversation = () => {
    try {
      const chatContainer = document.querySelector(".flowise-chatwindow .flowise-chatmessages")
      if (chatContainer) {
        const messages = Array.from(chatContainer.children).map((msg) => ({
          content: msg.innerHTML,
          timestamp: Date.now(),
        }))
        localStorage.setItem("salesops-conversation", JSON.stringify(messages))
        localStorage.setItem("salesops-conversation-timestamp", Date.now().toString())
      }
    } catch (error) {
      console.log("[v0] Erro ao salvar conversa:", error)
    }
  }

  const restoreConversation = () => {
    try {
      const savedConversation = localStorage.getItem("salesops-conversation")
      if (savedConversation) {
        const messages = JSON.parse(savedConversation)
        setTimeout(() => {
          const chatContainer = document.querySelector(".flowise-chatwindow .flowise-chatmessages")
          if (chatContainer && messages.length > 0) {
            chatContainer.innerHTML = ""
            messages.forEach((msg: any) => {
              const messageElement = document.createElement("div")
              messageElement.innerHTML = msg.content
              chatContainer.appendChild(messageElement)
            })
          }
        }, 1000)
      }
    } catch (error) {
      console.log("[v0] Erro ao restaurar conversa:", error)
    }
  }

  const restartChat = async () => {
    try {
      setChatbotStatus("loading")
      localStorage.removeItem("salesops-conversation")
      localStorage.removeItem("salesops-conversation-timestamp")
      await cleanupPreviousChatbot()

      setTimeout(() => {
        loadChatbotScript()
      }, 500)
    } catch (error) {
      console.error("[v0] Erro ao reiniciar chat:", error)
    }
  }

  const cleanupPreviousChatbot = async () => {
    const container = document.getElementById("chatbot-container")
    if (container) {
      container.innerHTML = ""
    }

    const existingScripts = document.querySelectorAll('script[src*="flowise-embed"]')
    existingScripts.forEach((script) => script.remove())

    if (window.Chatbot) {
      try {
        if (typeof window.Chatbot.destroy === "function") {
          window.Chatbot.destroy()
        }
        delete window.Chatbot
      } catch (error) {
        console.log("[v0] Erro ao limpar chatbot anterior:", error)
      }
    }
  }

  const loadChatbotScript = async () => {
    try {
      setChatbotStatus("loading")

      const chatbotElement = document.createElement("flowise-fullchatbot")
      chatbotElement.id = `chatbot-${Date.now()}`
      const container = document.getElementById("chatbot-container")
      if (container) {
        container.appendChild(chatbotElement)
      }

      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
      script.type = "module"
      script.id = `flowise-script-${Date.now()}`

      script.onload = () => {
        setTimeout(() => {
          if (window.Chatbot) {
            try {
              window.Chatbot.initFull({
                chatflowid: "9609086f-a776-4952-8da5-7b43c7f7fede",
                apiHost: "https://flowise-flowise.uyk8ty.easypanel.host",
                chatflowConfig: {},
                observersConfig: {},
                theme: {
                  button: {
                    backgroundColor: "#dc2626"
                  },
                  customCSS: `
                    /* Header fixo no topo com cores corretas */
                    .flowise-chatwindow-header {
                      position: fixed !important;
                      top: 0 !important;
                      left: 0 !important;
                      right: 0 !important;
                      z-index: 1000 !important;
                      background: #dc2626 !important;
                      color: #ffffff !important;
                      border-bottom: 2px solid #dc2626 !important;
                      text-align: center !important;
                      height: 60px !important;
                      display: flex !important;
                      align-items: center !important;
                      justify-content: center !important;
                      padding: 0 15px !important;
                    }
                    
                    /* Forçar cores vermelho/branco no título do header */
                    .flowise-chatwindow-header * {
                      color: #ffffff !important;
                      background: transparent !important;
                    }
                    
                    .flowise-chatwindow-header .flowise-chatwindow-title {
                      color: #ffffff !important;
                      background: transparent !important;
                      font-weight: bold !important;
                    }
                    
                    /* Logo no header */
                    .flowise-chatwindow-header img {
                      margin-right: 10px !important;
                      width: 32px !important;
                      height: 32px !important;
                      border-radius: 50% !important;
                    }
                    
                    /* Área de mensagens com padding para header e input fixos */
                    .flowise-chatwindow .flowise-chatmessages {
                      padding-top: 80px !important;
                      padding-bottom: 80px !important;
                      height: calc(100vh - 160px) !important;
                      overflow-y: auto !important;
                      background: #ffffff !important;
                    }
                    
                    /* Input de mensagem fixo na parte inferior */
                    .flowise-chatwindow .flowise-textinput {
                      position: fixed !important;
                      bottom: 0 !important;
                      left: 0 !important;
                      right: 0 !important;
                      z-index: 1000 !important;
                      background: #ffffff !important;
                      border-top: 2px solid #dc2626 !important;
                      padding: 15px !important;
                      margin: 0 !important;
                      height: 80px !important;
                      display: flex !important;
                      align-items: center !important;
                    }
                    
                    /* Ajustar container principal */
                    .flowise-chatwindow {
                      height: 100vh !important;
                      position: relative !important;
                      background: #ffffff !important;
                      margin: 0 !important;
                      padding: 0 !important;
                    }
                    
                    /* Botão de envio vermelho */
                    .flowise-textinput button {
                      background: #dc2626 !important;
                      border: none !important;
                      color: white !important;
                    }
                    
                    .flowise-textinput button:hover {
                      background: #b91c1c !important;
                    }
                    
                    /* Remover TODOS os controles de áudio */
                    button[aria-label*="audio"], 
                    button[aria-label*="voice"], 
                    button[aria-label*="record"],
                    button[title*="audio"],
                    button[title*="voice"],
                    button[title*="Play"],
                    button[title*="Stop"],
                    .voice-button,
                    .audio-button,
                    .audio-controls,
                    .audio-player,
                    audio,
                    .audio-element,
                    .media-controls,
                    .audio-recorder,
                    [data-testid*="voice"],
                    [data-testid*="audio"],
                    [class*="audio"],
                    [class*="voice"],
                    [class*="mic"],
                    [class*="media"],
                    [class*="play"],
                    [class*="record"] {
                      display: none !important;
                      visibility: hidden !important;
                      opacity: 0 !important;
                      pointer-events: none !important;
                    }
                    
                    /* Remover ícones de áudio */
                    svg[data-icon*="microphone"],
                    svg[data-icon*="voice"],
                    svg[data-icon*="audio"],
                    svg[data-icon*="play"],
                    svg[data-icon*="pause"],
                    .microphone-icon,
                    .voice-icon,
                    .play-icon {
                      display: none !important;
                    }
                    
                    /* Adicionar botão de reiniciar no header do chatbot */
                    .flowise-chatwindow-header::after {
                      content: "↻";
                      position: absolute !important;
                      top: 50% !important;
                      right: 15px !important;
                      transform: translateY(-50%) !important;
                      background: rgba(255,255,255,0.2) !important;
                      color: white !important;
                      border: 1px solid rgba(255,255,255,0.3) !important;
                      border-radius: 50% !important;
                      width: 32px !important;
                      height: 32px !important;
                      display: flex !important;
                      align-items: center !important;
                      justify-content: center !important;
                      cursor: pointer !important;
                      font-size: 16px !important;
                      font-weight: bold !important;
                      z-index: 1001 !important;
                    }
                    
                    .flowise-chatwindow-header::after:hover {
                      background: rgba(255,255,255,0.3) !important;
                    }
                  `,
                  chatWindow: {
                    showTitle: true,
                    showAgentMessages: true,
                    title: "Sales Ops AI",
                    titleAvatarSrc:
                      "https://lh3.googleusercontent.com/proxy/sirPhoJhvKS9Vi-8lHbzScplbpIF7P3yPWlGKkGs5M7ydL5XVpmt3v_4w8rUT0yR2cWX-3eWuwvzl7xVaIbn_PbnrbEt-mc=s88-w88-h88-c-k-no",
                    welcomeMessage: "Olá! Qual sua dúvida?",
                    errorMessage: "Ocorreu um erro, entre em contato com o suporte",
                    backgroundColor: "#ffffff",
                    height: "100%",
                    width: "100%",
                    fontSize: 16,
                    starterPrompts: [
                      "Quais dados e informações são essenciais para a análise do cenário atual da empresa?",
                      "Quais são os principais passos para desenhar e configurar um novo processo comercial eficiente?",
                      "Como medir a efetividade das ações implementadas e garantir o desenvolvimento contínuo da equipe de vendas?",
                    ],
                    starterPromptFontSize: 14,
                    clearChatOnReload: false,
                    sourceDocsTitle: "Fontes:",
                    renderHTML: true,
                    botMessage: {
                      backgroundColor: "#f7f8ff",
                      textColor: "#303235",
                      showAvatar: true,
                      avatarSrc:
                        "https://lh3.googleusercontent.com/proxy/sirPhoJhvKS9Vi-8lHbzScplbpIF7P3yPWlGKkGs5M7ydL5XVpmt3v_4w8rUT0yR2cWX-3eWuwvzl7xVaIbn_PbnrbEt-mc=s88-w88-h88-c-k-no",
                    },
                    userMessage: {
                      backgroundColor: "#dc2626",
                      textColor: "#ffffff",
                      showAvatar: true,
                      avatarSrc:
                        "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
                    },
                    textInput: {
                      placeholder: "Digite sua pergunta sobre vendas...",
                      backgroundColor: "#ffffff",
                      textColor: "#303235",
                      sendButtonColor: "#dc2626",
                      maxChars: 500,
                      maxCharsWarningMessage:
                        "Você excedeu o limite de caracteres. Por favor, digite menos de 500 caracteres.",
                      autoFocus: true,
                      sendMessageSound: false,
                      receiveMessageSound: false,
                    },
                    feedback: {
                      color: "#303235",
                    },
                    dateTimeToggle: {
                      date: true,
                      time: true,
                    },
                    footer: {
                      textColor: "#303235",
                      text: "Feito por",
                      company: "V4 Ferraz Piai",
                      companyLink: "https://v4ferrazpiai.com.br",
                    },
                  },
                },
              })
              setChatbotStatus("connected")
              console.log("[v0] Chatbot inicializado com sucesso")

              setTimeout(() => {
                restoreConversation()
              }, 1500)

              setInterval(() => {
                saveConversation()
              }, 5000)

              // Adicionar funcionalidade ao botão de reiniciar
              setTimeout(() => {
                const header = document.querySelector(".flowise-chatwindow-header")
                if (header) {
                  header.addEventListener("click", (e) => {
                    const target = e.target as HTMLElement
                    const rect = header.getBoundingClientRect()
                    const clickX = (e as MouseEvent).clientX - rect.left
                    const clickY = (e as MouseEvent).clientY - rect.top

                    // Verifica se clicou na área do botão reiniciar (canto direito)
                    if (clickX > rect.width - 50 && clickY < 50) {
                      restartChat()
                    }
                  })
                }
              }, 1000)
            } catch (error) {
              console.error("[v0] Erro ao inicializar chatbot:", error)
              setChatbotStatus("error")
              setErrorMessage("Erro de conexão com o servidor. Tente novamente.")
            }
          }
        }, 200)
      }

      script.onerror = () => {
        console.error("[v0] Erro ao carregar o script do chatbot")
        setChatbotStatus("error")
        setErrorMessage("Erro ao carregar o script do chatbot. Verifique sua conexão com a internet.")
      }

      document.head.appendChild(script)
    } catch (error) {
      console.error("[v0] Erro geral ao carregar chatbot:", error)
      setChatbotStatus("error")
      setErrorMessage("Erro inesperado ao carregar o chatbot.")
    }
  }

  const retryConnection = () => {
    setChatbotStatus("loading")
    setErrorMessage("")
    const container = document.getElementById("chatbot-container")
    if (container) {
      container.innerHTML = ""
    }
    loadChatbotScript()
  }

  useEffect(() => {
    setTimeout(() => {
      loadChatbotScript()
    }, 100)

    const handleBeforeUnload = () => {
      saveConversation()
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  return (
    <div className="w-full h-full">
      {chatbotStatus === "loading" && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-white text-lg">Conectando ao Sales Ops AI...</p>
            <p className="text-gray-400 text-sm mt-2">Carregando chatbot...</p>
          </div>
        </div>
      )}

      {chatbotStatus === "error" && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-white text-2xl font-bold mb-4">Erro de Conexão</h2>
            <p className="text-gray-300 mb-6">{errorMessage}</p>
            <div className="space-y-3">
              <button
                onClick={retryConnection}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Tentar Novamente
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Recarregar Página
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        id="chatbot-container"
        className="w-full h-screen"
        style={{ display: chatbotStatus === "connected" ? "block" : "none" }}
      ></div>
    </div>
  )
}

export default FlowiseChat
