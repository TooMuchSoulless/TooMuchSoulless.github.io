import { useState } from 'react';

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator
} from "@chatscope/chat-ui-kit-react";

const API_KEY="Bearer OPENAI_API_KEY";

export default function Chat() {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm ChatGPT! Ask me anything!",
            sender: "ChatGPT",
            direction: "incoming",
            position: 'single',
        },
    ]);

    const [isTyping, setIsTyping] = useState(false);

    const handleSendRequest = async (message: any) => {
        const newMessage = {
            message,
            direction: "outgoing",
            sender: "user",
            position: 'single',
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setIsTyping(true);
    
        try {
            const response = await processMessageToChatGPT([...messages, newMessage]);
            if (response && response.choices && response.choices.length > 0) {
                const content = response.choices[0]?.message?.content;
                if (content) {
                    const chatGPTResponse = {
                        message: content,
                        sender: "ChatGPT",
                        direction: "incoming",
                        position: 'single',
                    };
                    setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
                }
            }
        } catch (error) {
            console.error("Error processing message:", error);
        } finally {
            setIsTyping(false);
        }
    };  

    async function processMessageToChatGPT(chatMessages: { message: string, sender: string }[]) {
        const apiMessages = chatMessages.map((messageObject) => {
            const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
            return { role, content: messageObject.message };
        });
    
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                { role: "system", content: "I'm a Student using ChatGPT for learning" },
                ...apiMessages,
            ],
        };
    
        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(apiRequestBody),
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
    
            return response.json();
        } catch (error: any) {
            throw new Error('Failed to process message: ' + error.message);
        }
    }  

    return (
        <div className="App flex flex-col items-center justify-center h-screen mt-12 mb-6">
            <h1 className="text-4xl font-bold mt-12 py-6 text-gray-800">Chat with AI</h1>

            <div style={{ position:"relative", height: "700px", width: "700px" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null} >
                            {messages.map((message, i) => {
                                console.log(message)
                                return <Message key={i} model={{
                                    message: message.message,
                                    sender: message.sender,
                                    direction: message.sender === "user" ? "outgoing" : "incoming",
                                    position: 'single',
                                }} />
                            })}
                        </MessageList>
                        <MessageInput placeholder="Send a Message" onSend={handleSendRequest} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}