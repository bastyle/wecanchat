import { useEffect, useRef, useState } from "react";
import { getUser } from "../../utils/UserUtils";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { recieveMessageRoute, sendMessageRoute } from "../../utils/APIRoutes";
import "../css/ChatContainer.css";


const ChatContainer = ({ currentChat, socket }) => {
    console.log("currentChat:", currentChat);
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            console.log("fetchData...");
            const data = await getUser();
            console.log("data:", data);
            if (currentChat) {
                const response = await axios.post(recieveMessageRoute, {
                    from: data._id,
                    to: currentChat._id,
                });
                console.log("response:", response);
                setMessages(response.data);
            }
        };
        fetchData();
    }, [currentChat]);


    useEffect(() => {
        const getCurrentChat = async () => {
            if (currentChat) {
                await getUser()._id;
            }
        };
        getCurrentChat();
    }, [currentChat]);


    const handleSendMsg = async (msg) => {
        const data = await getUser();
        socket.current.emit("send_message", {
            to: currentChat._id,
            from: data._id,
            msg,
        });
        await axios.post(sendMessageRoute, {
            from: data._id,
            to: currentChat._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("receive_message", (msg) => {
                console.log("receive_message msg:", msg);
                setArrivalMessage({ fromSelf: false, message: msg.message });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div>
            <div className="chat-header">
                <h2>Chat</h2>
                <div className="user-details">
                    <div className="avatar">
                        <img
                            src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                            alt=""
                        />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                
            </div>
            <div className="chat-messages">
                {messages.map((message) => {
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                            <div
                                className={`message ${message.fromSelf ? "sended" : "recieved"
                                    }`}
                            >
                                <div className="content ">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );

}

export default ChatContainer;