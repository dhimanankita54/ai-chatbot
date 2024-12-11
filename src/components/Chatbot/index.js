import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import { Button, Label, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "./chatbotSlice";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // You can choose a different theme
import 'prismjs/components/prism-python.min.js'; // Import specific languages as needed
import 'prismjs/components/prism-javascript.min.js'; // Import JavaScript support
import 'prismjs/components/prism-java.min.js'; // Import Java support
import './chatbot.css';
import { BiSolidSend } from "react-icons/bi";

const genAI = new GoogleGenerativeAI("AIzaSyB4YYzKMmxj4sdlQofvnNQj60ZiD1hlWUk");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function FormattedText({ response }) {
    // This function formats the response and adds code block formatting
    const formatResponse = (response) => {
        const regex = /`{3}([\s\S]*?)`{3}/g; // Matches anything between triple backticks
        let formattedText = [];
        let lastIndex = 0;

        // Find all code blocks and split by regular text
        let match;
        while ((match = regex.exec(response)) !== null) {
            // Regular text before the code block
            if (match.index > lastIndex) {
                formattedText.push(
                    <p key={lastIndex} className="formatted">{response.slice(lastIndex, match.index)}</p>
                );
            }

            const detectedLanguage = autoDetectLanguage(match[1]);

            // Code block
            formattedText.push(
                <div key={match.index} className="code-block-container">
                    {detectedLanguage && (
                        <p className="uppercase font-bold bg-black p-4 rounded-tl-lg rounded-tr-lg -mb-2">{detectedLanguage}</p> // Highlight the language part
                    )}
                    <pre className="whitespace-pre-wrap font-roboto overflow-auto">
                        <code className={`language-${detectedLanguage}`}>{match[1]}</code>
                    </pre>
                </div>
            );
            lastIndex = regex.lastIndex; // Update the last matched index
        }

        // Add any remaining text after the last code block
        if (lastIndex < response.length) {
            formattedText.push(
                <p key={lastIndex} className="formatted">{response.slice(lastIndex)}</p>
            );
        }

        return formattedText;
    };

    // Auto-detect the language based on the code content (simplified version)
    const autoDetectLanguage = (code) => {
        if (/def /.test(code)) {
            return 'python';
        } else if (/function\s+\w+/.test(code) || /const\s+\w+/.test(code)) {
            return 'javascript';
        } else if (/public\s+class\s+\w+/.test(code)) {
            return 'java';
        }
        return ''; // Default to plaintext if no language is detected
    };

    // Highlight code blocks after the component mounts
    useEffect(() => {
        Prism.highlightAll();
    }, [response]);

    return (formatResponse(response));
}

const Chatbot = () => {

    // const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const { messages } = useSelector((state) => state.chatbotSlice)
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        // Add the user message to the messages array
        dispatch(setMessages({ role: 'user', text: input }));

        try {
            // Send the user message to the ChatGPT API
            const prompt = input;
            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: "Hello" }],
                    },
                    {
                        role: "model",
                        parts: [{ text: "Great to meet you. What would you like to know?" }],
                    },
                ],
            });
            const result = await chat.sendMessage(prompt);

            console.log(result.response.text());

            // Extract the bot response from the API response
            const botResponse = result.response.text();

            // // Add the bot response to the messages array
            dispatch(setMessages({ role: 'bot', text: botResponse }));

            // Clear the input field
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <>
            <div className="w-full mb-10">
                <div className="w-full  flex items-center justify-center flex-col">
                    <div className="w-[95%] md:w-1/2 max-h-[370px] overflow-auto scroll pb-10">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.role === 'bot' ? "items-start justify-start" : "items-end justify-end"} flex-col`}>
                                {message.role === 'bot' ? (
                                    <div className="font-roboto max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl text-sm tracking-wider text-gray-50 my-4">
                                        <FormattedText response={message.text} />
                                    </div>
                                ) : (
                                    <div className="font-roboto max-w-[70%] p-2 px-6 rounded-xl bg-gray-700 text-sm tracking-wide text-gray-100 my-4">
                                        {message.text}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="w-[95%] md:w-1/2 sticky bottom-10">
                        <div className="flex items-center relative justify-center gap-2">
                            <Textarea
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Message bot..."
                                required
                                rows={4}
                                className="bg-gray-700 border-0 resize-none focus:ring-0 text-white font-roboto placeholder:font-roboto placeholder:text-gray-100"
                            />
                            <Button
                                className="focus:ring-0 top-4 border absolute right-4 rounded-full bg-gray-50 text-gray-900"
                                onClick={handleSendMessage}
                            >
                                <BiSolidSend />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chatbot;