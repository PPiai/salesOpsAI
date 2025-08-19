"use client"
import React from 'react';
import { FullPageChat } from "flowise-embed-react"

const FlowiseChat = () => {
  return (
    <FullPageChat
      chatflowid="9609086f-a776-4952-8da5-7b43c7f7fede"
      apiHost="https://flowise-flowise.uyk8ty.easypanel.host"
      theme={{
        button: {
          backgroundColor: "#3B81F6",
          right: 20,
          bottom: 20,
          size: 48,
          dragAndDrop: true,
          iconColor: "white",
          customIconSrc: "https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg",
        },
        tooltip: {
          showTooltip: true,
          tooltipMessage: "Olá! 👋",
          tooltipBackgroundColor: "black",
          tooltipTextColor: "white",
          tooltipFontSize: 16,
        },
        chatWindow: {
          showTitle: true,
          title: "Sales Ops AI",
          titleAvatarSrc:
            "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png",
          showAgentMessages: true,
          welcomeMessage: "Olá! Como posso ajudá-lo com suas vendas hoje?",
          errorMessage: "Esta é uma mensagem de erro personalizada",
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
            backgroundColor: "#3B81F6",
            textColor: "#ffffff",
            showAvatar: true,
            avatarSrc: "https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png",
          },
          textInput: {
            placeholder: "Digite sua pergunta sobre vendas...",
            backgroundColor: "#ffffff",
            textColor: "#303235",
            sendButtonColor: "#3B81F6",
            maxChars: 50,
            maxCharsWarningMessage: "Você excedeu o limite de caracteres. Por favor, digite menos de 50 caracteres.",
            autoFocus: true,
            sendMessageSound: true,
            receiveMessageSound: true,
          },
          feedback: {
            color: "#303235",
          },
          footer: {
            textColor: "#303235",
            text: "Feito Por V4 Ferraz Piai",
            company: "Sales Ops AI",
            companyLink: "https://v4ferrazpiai.com.br",
          },
        },
      }}
      observersConfig={{
        observeUserInput: true,
        observeLoading: true,
        observeMessages: true,
      }}
    />
  )
}

export default FlowiseChat
