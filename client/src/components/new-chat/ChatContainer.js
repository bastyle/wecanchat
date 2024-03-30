import {useEffect, useRef, useState} from "react";
import {getUser} from "../../utils/UserUtils";
import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {recieveMessageRoute, sendMessageRoute} from "../../utils/APIRoutes";
import "../css/ChatContainer.css";
import ChatInput from "./ChatInput";
import {useNavigate} from "react-router-dom";



const ChatContainer = ({currentChat, socket, unreadNotifications, onNotifications}) => {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            const data = await getUser();
            if (currentChat) {
                const response = await axios.post(recieveMessageRoute, {
                    from: data._id,
                    to: currentChat._id,
                });
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


    const handleSendMsg = async (message) => {
        console.log("handleSendMsg message:", message);
        const data = await getUser();
        socket.current.emit('send_message', {from: data._id, to: currentChat._id, message});
        await axios.post(sendMessageRoute, {
            from: data._id,
            to: currentChat._id,
            message: message,
        });

        const msgs = [...messages];
        msgs.push({fromSelf: true, message: message});
        setMessages(msgs);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("receive_message", (msg) => {
                console.log("receive_message msg:", msg);
                if (currentChat._id === msg.from) {
                    const updatedNotiications = {...unreadNotifications, [msg.from]: false};
                    setArrivalMessage({fromSelf: false, message: msg.message, from: msg.from});
                }

                if (currentChat._id != msg.from) {
                    const updatedNotiications = {...unreadNotifications, [msg.from]: true};
                    onNotifications(updatedNotiications);
                    showNotification(msg.message)
                }

            });
        }
    }, [currentChat]);

    useEffect(() => {
        //add another validation to check if the message is from the current chat
        if (arrivalMessage && arrivalMessage.from)
            console.log("currentChat._id:", currentChat._id + " msg.from:" + arrivalMessage.from);
        console.log("arrivalMessage:", arrivalMessage);
        if ((arrivalMessage && arrivalMessage.from) && arrivalMessage.from === currentChat._id) {
            arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
        }

    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    function showNotification(notificationBody) {
        const img = '../assets/notifications.png';
        console.log("notificationBody:: "+notificationBody)
        const notification = new Notification('New message', {body: notificationBody, icon: img, image: img});

        notification.onclick = function (event) {
            event.preventDefault();
            navigate("/chat");
        }

        setTimeout(() => {
            notification.close();
        }, 200);
    }

    return (
        <div className="div-conatiner">
            <div className="chat-header">
                <span>Chat with {currentChat.username} {currentChat._id}</span>
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
            <div className="chat-messages scrollable">
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
            <ChatInput handleSendMsg={handleSendMsg}/>

        </div>
    );

}

export default ChatContainer;