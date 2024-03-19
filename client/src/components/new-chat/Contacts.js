import { useEffect, useState } from "react";
import { getUser } from "../../utils/UserUtils";
import "../css/Contacts.css";
import { MdNotificationImportant, MdOutlineNotificationImportant } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { genericToastOptions } from '../../utils/Globals';

const Contacts = ({ contacts, changeChat, socket, unreadMessages, onNotifications }) => {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    //const [unreadMessages, setUnreadMessages] = useState({});

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
        const updatedNotiications = { ...unreadMessages, [contact._id]: false };
        console.log("updatedNotiications:", updatedNotiications);
        onNotifications(updatedNotiications);
    };

    const handleOnClick = (event) => {
        console.log("handleOnClick event.target.name:", event.target.name);
        console.log("event.target.name:", event.target.name)
    };


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