import { useEffect, useState } from "react";
import { getUser } from "../../utils/UserUtils";
import "../css/Contacts.css";
import { MdNotificationImportant, MdOutlineNotificationImportant } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
const Contacts = ({ contacts, changeChat, socket }) => {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [unreadMessages, setUnreadMessages] = useState({});

    useEffect(() => {
        const getLocalUser = async () => {
            const data = getUser();
            setCurrentUserName(data.username);
            setCurrentUserImage(data.avatarImage);
        };
        getLocalUser();
    }, []);


    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
        setUnreadMessages((prevState) => ({
            ...prevState,
            [contact._id]: false, // Set unread message flag for the sender
        }));
        
    };

    useEffect(() => {
        if (socket) {
            socket.on("receive_message", (msg) => {
                //console.log("receive_message msg from:::::::::::::::::::::::::::::::::::::::");
                console.log("receive_message msg from:", msg.from);
                // TODO add validation to check if the message is from the current chat
                console.log("currentSelected:", currentSelected);
                setUnreadMessages((prevState) => ({
                    ...prevState,
                    [msg.from]: true, // Set unread message flag for the sender
                }));
            });
        }
    }, []);

    return (
        <div className="contacts-container">
            <div className="brand">
                <h3>Contacts</h3>
            </div>
            <div className="contacts">
                {contacts.map((contact, index) => {
                    return (
                        <div
                            key={contact._id}
                            className={`contact ${index === currentSelected ? "selected" : ""
                                }`}
                            onClick={() => changeCurrentChat(index, contact)}
                        >
                            <div className="avatar">
                                <img
                                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                    alt=""
                                />
                            </div>
                            <div className="username">
                                <h3>{contact.username}</h3>

                            </div>
                            <div className="notification" key={`noti-${contact._id}`} name={`noti-${contact._id}`} >
                                {unreadMessages[contact._id] && <MdOutlineNotificationImportant />}
                                {/*<MdOutlineNotificationImportant />*/}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


export default Contacts;