import { useEffect, useState } from "react";
import { getUser } from "../../utils/UserUtils";
import "../css/Welcome.css";

const Welcome = () => {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            setUserName(await getUser().username);
        };
        fetchData();
    }, []);
    return (
        <div className="welcome-container">
            <h1>
                Welcome, <span>{userName}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </div>
    );
};

export default Welcome;