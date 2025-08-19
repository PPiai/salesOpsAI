"use client"

import React from 'react';
import { FullPageChat } from 'flowise-embed-react'

const FlowiseChat = () => {
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
                    message: "Bem-vindo ao seu assistente de vendas inteligente",
                    textColor: 'black',
                    buttonColor: '#dc2626',
                    buttonText: 'Iniciar Conversa',
                    buttonTextColor: 'white',
                    blurredBackgroundColor: 'rgba(0, 0, 0, 0.4)',
                    backgroundColor: 'white'
                },
                customCSS: `
                    /* Remove botão de áudio */
                    button[aria-label*="audio"], 
                    button[aria-label*="voice"], 
                    button[aria-label*="record"],
                    .voice-button,
                    .audio-button,
                    [data-testid*="voice"],
                    [data-testid*="audio"] {
                        display: none !important;
                    }
                    
                    /* Remove ícones de áudio */
                    svg[data-icon*="microphone"],
                    svg[data-icon*="voice"],
                    .microphone-icon {
                        display: none !important;
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
                    height: '100%',
                    width: '100%',
                    fontSize: 16,
                    starterPrompts: [
                        "Quais dados e informações são essenciais para a análise do cenário atual da empresa?",
                        "Quais são os principais passos para desenhar e configurar um novo processo comercial eficiente?",
                        "Como medir a efetividade das ações implementadas e garantir o desenvolvimento contínuo da equipe de vendas?"
                    ],
                    starterPromptFontSize: 15,
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
                        text: 'Feito Por',
                        company: 'V4 Ferraz Piai',
                        companyLink: 'https://v4ferrazpiai.com.br'
                    }
                }
            }}
        />
    )
}

export default FlowiseChat
