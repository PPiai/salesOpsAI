"use client"

import React, { useEffect } from 'react';
import { FullPageChat } from "flowise-embed-react"

const FlowiseChat = () => {
  
  useEffect(() => {
    // Aplicar CSS customizado depois que o componente carregar
    const applyCustomCSS = () => {
      const style = document.createElement('style');
      style.id = 'flowise-custom-styles';
      style.innerHTML = `
        /* FORÇAR header fixo - CSS global mais agressivo */
        .flowise-chatwindow-header,
        [class*="header"],
        [class*="Header"],
        .MuiAppBar-root,
        header {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100vw !important;
          z-index: 99999 !important;
          background: #dc2626 !important;
          background-color: #dc2626 !important;
          color: #ffffff !important;
          border-bottom: 2px solid #dc2626 !important;
          text-align: center !important;
          height: 60px !important;
          min-height: 60px !important;
          max-height: 60px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 0 15px !important;
          margin: 0 !important;
          box-sizing: border-box !important;
        }
        
        /* FORÇAR cores do header */
        .flowise-chatwindow-header *,
        [class*="header"] *,
        [class*="Header"] *,
        .MuiAppBar-root *,
        header * {
          color: #ffffff !important;
          background: transparent !important;
          background-color: transparent !important;
        }
        
        /* FORÇAR título do header */
        .flowise-chatwindow-title,
        [class*="title"],
        [class*="Title"] {
          color: #ffffff !important;
          background: transparent !important;
          background-color: transparent !important;
          font-weight: bold !important;
        }
        
        /* FORÇAR container principal */
        .flowise-chatwindow,
        [class*="chatwindow"],
        [class*="chat-window"] {
          height: 100vh !important;
          min-height: 100vh !important;
          position: relative !important;
          background: #ffffff !important;
          background-color: #ffffff !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
        }
        
        /* FORÇAR área de mensagens */
        .flowise-chatmessages,
        [class*="messages"],
        [class*="Messages"],
        [class*="chat-messages"] {
          padding-top: 80px !important;
          padding-bottom: 100px !important;
          height: calc(100vh - 160px) !important;
          min-height: calc(100vh - 160px) !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          background: #ffffff !important;
          background-color: #ffffff !important;
          position: relative !important;
          margin: 0 !important;
          box-sizing: border-box !important;
        }
        
        /* FORÇAR input fixo */
        .flowise-textinput,
        [class*="textinput"],
        [class*="text-input"],
        [class*="input-container"] {
          position: fixed !important;
          bottom: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100vw !important;
          z-index: 99999 !important;
          background: #ffffff !important;
          background-color: #ffffff !important;
          border-top: 2px solid #dc2626 !important;
          padding: 15px !important;
          margin: 0 !important;
          height: 80px !important;
          min-height: 80px !important;
          max-height: 80px !important;
          display: flex !important;
          align-items: center !important;
          box-sizing: border-box !important;
        }
      `;
      
      // Remove estilo anterior se existir
      const existingStyle = document.getElementById('flowise-custom-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      document.head.appendChild(style);
    };

    // Aplicar CSS imediatamente
    applyCustomCSS();
    
    // Aplicar CSS novamente após um pequeno delay (caso o componente ainda esteja carregando)
    const timer1 = setTimeout(applyCustomCSS, 500);
    const timer2 = setTimeout(applyCustomCSS, 1000);
    const timer3 = setTimeout(applyCustomCSS, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <FullPageChat
      chatflowid="9609086f-a776-4952-8da5-7b43c7f7fede"
      apiHost="https://flowise-flowise.uyk8ty.easypanel.host"
      chatflowConfig={{
        /* Chatflow Config */
      }}
      observersConfig={{
        /* Observers Config */
      }}
      theme={{    
        button: {
          backgroundColor: '#dc2626',
          right: 20,
          bottom: 20,
          size: 48,
          dragAndDrop: true,
          iconColor: 'white',
          customIconSrc: 'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
          autoWindowOpen: {
            autoOpen: false,
            openDelay: 2,
            autoOpenOnMobile: false
          }
        },
        tooltip: {
          showTooltip: true,
          tooltipMessage: 'Olá! 👋',
          tooltipBackgroundColor: '#dc2626',
          tooltipTextColor: 'white',
          tooltipFontSize: 16
        },
        disclaimer: {
          title: 'Sales Ops AI',
          message: "Bem-vindo ao seu assistente de vendas inteligente. Clique para começar a conversar!",
          textColor: '#303235',
          buttonColor: '#dc2626',
          buttonText: 'Iniciar Conversa',
          buttonTextColor: 'white',
          blurredBackgroundColor: 'rgba(0, 0, 0, 0.4)',
          backgroundColor: 'white'
        },
        customCSS: `
          /* FORÇAR header fixo - usando múltiplos seletores */
          .flowise-chatwindow-header,
          [class*="header"],
          [class*="Header"],
          .MuiAppBar-root,
          header {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100vw !important;
            z-index: 9999 !important;
            background: #dc2626 !important;
            background-color: #dc2626 !important;
            color: #ffffff !important;
            border-bottom: 2px solid #dc2626 !important;
            text-align: center !important;
            height: 60px !important;
            min-height: 60px !important;
            max-height: 60px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 0 15px !important;
            margin: 0 !important;
            box-sizing: border-box !important;
          }
          
          /* FORÇAR cores do header */
          .flowise-chatwindow-header *,
          [class*="header"] *,
          [class*="Header"] *,
          .MuiAppBar-root *,
          header * {
            color: #ffffff !important;
            background: transparent !important;
            background-color: transparent !important;
          }
          
          /* FORÇAR título do header */
          .flowise-chatwindow-title,
          [class*="title"],
          [class*="Title"] {
            color: #ffffff !important;
            background: transparent !important;
            background-color: transparent !important;
            font-weight: bold !important;
          }
          
          /* FORÇAR container principal */
          .flowise-chatwindow,
          [class*="chatwindow"],
          [class*="chat-window"],
          .MuiDialog-paper,
          main,
          #root > div {
            height: 100vh !important;
            min-height: 100vh !important;
            position: relative !important;
            background: #ffffff !important;
            background-color: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }
          
          /* FORÇAR área de mensagens */
          .flowise-chatmessages,
          [class*="messages"],
          [class*="Messages"],
          [class*="chat-messages"],
          .MuiList-root {
            padding-top: 80px !important;
            padding-bottom: 100px !important;
            height: calc(100vh - 160px) !important;
            min-height: calc(100vh - 160px) !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            background: #ffffff !important;
            background-color: #ffffff !important;
            position: relative !important;
            margin: 0 !important;
            box-sizing: border-box !important;
          }
          
          /* FORÇAR input fixo */
          .flowise-textinput,
          [class*="textinput"],
          [class*="text-input"],
          [class*="input-container"],
          .MuiTextField-root,
          form {
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100vw !important;
            z-index: 9999 !important;
            background: #ffffff !important;
            background-color: #ffffff !important;
            border-top: 2px solid #dc2626 !important;
            padding: 15px !important;
            margin: 0 !important;
            height: 80px !important;
            min-height: 80px !important;
            max-height: 80px !important;
            display: flex !important;
            align-items: center !important;
            box-sizing: border-box !important;
          }
          
          /* FORÇAR botão de envio vermelho */
          .flowise-textinput button,
          [class*="textinput"] button,
          [class*="send"] button,
          button[type="submit"] {
            background: #dc2626 !important;
            background-color: #dc2626 !important;
            border: none !important;
            color: white !important;
          }
          
          .flowise-textinput button:hover,
          [class*="textinput"] button:hover,
          [class*="send"] button:hover,
          button[type="submit"]:hover {
            background: #b91c1c !important;
            background-color: #b91c1c !important;
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
          .chatbot-chat-view {
            margin: 0px;
            overflow: hidden;
            background-color: rgb(255, 255, 255);
            height: -webkit-fill-available;
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
          
          /* Garantir que o body não tenha scroll */
          body {
            overflow: hidden !important;
          }
        `,
        chatWindow: {
          showTitle: true,
          showAgentMessages: true,
          title: 'Sales Ops AI',
          titleAvatarSrc: 'https://lh3.googleusercontent.com/proxy/sirPhoJhvKS9Vi-8lHbzScplbpIF7P3yPWlGKkGs5M7ydL5XVpmt3v_4w8rUT0yR2cWX-3eWuwvzl7xVaIbn_PbnrbEt-mc=s88-w88-h88-c-k-no',
          welcomeMessage: 'Olá! Como posso ajudá-lo com suas vendas hoje?',
          errorMessage: 'Ops! Algo deu errado. Tente novamente.',
          backgroundColor: '#ffffff',
          height: '100vw',
          width: '100vw',
          fontSize: 16,
          starterPrompts: [
            "Quais dados e informações são essenciais para a análise do cenário atual da empresa?",
            "Quais são os principais passos para desenhar e configurar um novo processo comercial eficiente?",
            "Como medir a efetividade das ações implementadas e garantir o desenvolvimento contínuo da equipe de vendas?"
          ],
          starterPromptFontSize: 14,
          clearChatOnReload: false,
          sourceDocsTitle: 'Fontes:',
          renderHTML: true,
          botMessage: {
            backgroundColor: '#f7f8ff',
            textColor: '#303235',
            showAvatar: true,
            avatarSrc: 'https://lh3.googleusercontent.com/proxy/sirPhoJhvKS9Vi-8lHbzScplbpIF7P3yPWlGKkGs5M7ydL5XVpmt3v_4w8rUT0yR2cWX-3eWuwvzl7xVaIbn_PbnrbEt-mc=s88-w88-h88-c-k-no'
          },
          userMessage: {
            backgroundColor: '#dc2626',
            textColor: '#ffffff',
            showAvatar: true,
            avatarSrc: 'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png'
          },
          textInput: {
            placeholder: 'Digite sua pergunta sobre vendas...',
            backgroundColor: '#ffffff',
            textColor: '#303235',
            sendButtonColor: '#dc2626',
            maxChars: 500,
            maxCharsWarningMessage: 'Você excedeu o limite de caracteres. Por favor, digite menos de 500 caracteres.',
            autoFocus: true,
            sendMessageSound: false,
            receiveMessageSound: false
          },
          feedback: {
            color: '#303235'
          },
          dateTimeToggle: {
            date: true,
            time: true
          },
          footer: {
            textColor: '#303235',
            text: 'Feito por',
            company: 'V4 Ferraz Piai',
            companyLink: 'https://v4ferrazpiai.com.br'
          }
        }
      }}
    />
  )
}

export default FlowiseChat
