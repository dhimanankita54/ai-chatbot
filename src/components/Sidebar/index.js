import { Sidebar, Drawer, Button, HR } from "flowbite-react";
import './sidebar.css';
import { MdLibraryAdd } from "react-icons/md";
import { TbHistory } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { addChatHistory, clearSessionHistory, createNewChat, resetMessages, setActiveChat } from "../Chatbot/chatbotSlice";
import { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import logo from '../../assets/images/chatbot.png';
import { BiSolidTrashAlt } from "react-icons/bi";

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const SidebarComponent = () => {

    const { messages, chatHistory } = useSelector((state) => state.chatbotSlice)
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setIsOpen(false);

    const handleNewChat = () => {
        // dispatch(resetMessages());
        // dispatch(addChatHistory(messages));
        dispatch(createNewChat());
    }

    const handleClearHistory = () => {
        dispatch(clearSessionHistory());
    }

    const handleChatSelection = (chatId) => {
        dispatch(setActiveChat(chatId));
    };

    return (
        <>
            <Sidebar className="min-h-screen !bg-gray-900 sidebar hidden md:block" style={{ padding: "0px" }}>
                <Sidebar.Logo img={logo} className="text-gray-200">
                    Chatbot
                </Sidebar.Logo>
                <Sidebar.Items className="!bg-gray-900">
                    <Sidebar.ItemGroup className="!bg-gray-900">
                        <Sidebar.Item onClick={handleNewChat} className="text-gray-50 hover:bg-gray-800 font-roboto text-sm" href="#" icon={MdLibraryAdd}>
                            New Chat
                        </Sidebar.Item>
                        {chatHistory?.length > 0 && <HR />}
                        {chatHistory?.map((chat, index) => (
                            <Sidebar.Item
                                onClick={() => handleChatSelection(chat.id)}
                                key={index}
                                className="text-gray-50 hover:bg-gray-800 font-roboto text-sm flex items-start justify-start truncate chat" href="#" icon={TbHistory}>
                                {chat.messages?.length > 0 ? capitalizeFirstLetter(chat.messages[0].text) : "New chat"}
                            </Sidebar.Item>
                        ))}
                    </Sidebar.ItemGroup>
                    <Sidebar.ItemGroup className="!bg-gray-900">
                        <Sidebar.Item onClick={handleClearHistory} className="text-gray-50 hover:bg-gray-800 font-roboto text-sm" href="#" icon={BiSolidTrashAlt}>
                            Clear History
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>

            <Button className="flex md:hidden items-start" onClick={() => setIsOpen(true)}>
                <HiMenuAlt2 className="text-lg" />
            </Button>

            <Drawer open={isOpen} onClose={handleClose} className="bg-gray-900 drawer w-64">
                <Drawer.Header title="Chatbot" titleIcon={() => <img className="w-8 mr-2" src={logo} />} />
                <Drawer.Items className="">
                    <Sidebar className="!bg-gray-900 sidebar w-56 p-0">
                        <Sidebar.Items className="!bg-gray-900">
                            <Sidebar.ItemGroup className="!bg-gray-900">
                                <Sidebar.Item onClick={handleNewChat} className="text-gray-50 hover:bg-gray-800 font-roboto text-sm" href="#" icon={MdLibraryAdd}>
                                    New Chat
                                </Sidebar.Item>
                                <HR />
                                {chatHistory?.map((chat, index) => (
                                    <Sidebar.Item
                                        onClick={() => { handleChatSelection(chat.id); handleClose() }}
                                        key={index}
                                        className="text-gray-50 hover:bg-gray-800 font-roboto text-sm flex items-start justify-start truncate chat" href="#" icon={TbHistory}>
                                        {chat.messages?.length > 0 ? capitalizeFirstLetter(chat.messages[0].text) : "New chat"}
                                    </Sidebar.Item>
                                ))}
                            </Sidebar.ItemGroup>
                            <Sidebar.ItemGroup className="!bg-gray-900">
                                <Sidebar.Item onClick={handleClearHistory} className="text-gray-50 hover:bg-gray-800 font-roboto text-sm" href="#" icon={BiSolidTrashAlt}>
                                    Clear History
                                </Sidebar.Item>
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </Drawer.Items>
            </Drawer>
        </>
    );
}

export default SidebarComponent;
