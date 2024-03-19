import { useState } from "react";
import "../css/ChatInput.css";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";

const ChatInput = ({ handleSendMsg }) => {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (event, emojiObject) => {
        let msg = message;
        msg += emojiObject.emoji;
        setMessage(msg);
    };

    const sendChat = (event) => {
        event.preventDefault();
        if (message.length > 0) {
            handleSendMsg(message);
            setMessage("");
        }
    };

    return (
        <div className="div-container">
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className="input-container" onSubmit={(event) => sendChat(event)}>
                <input
                    type="text"
                    placeholder="type your message here"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />


                <button type="submit">
                    <IoMdSend />
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
