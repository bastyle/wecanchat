import { useEffect, useState } from "react";
import { getUser } from "../../utils/UserUtils";
import "../css/Contacts.css";

const Contacts = ({ contacts, changeChat }) => {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

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
                        </div>
                    );
                })}
            </div>
             {/*<div className="current-user">
                <div className="avatar">
                    <img
                        src={`data:image/svg+xml;base64,${currentUserImage}`}
                        alt="avatar"
                    />
                </div>
               <div className="username">
                    <h2>{currentUserName}</h2>
            </div>
            </div>*/}
        </div>
    );
}


export default Contacts;