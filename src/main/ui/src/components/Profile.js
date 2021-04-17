import React from "react";

export default function Profile() {
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");

    const getAccountInfo = () => {
        if(email === ""){
            const account = localStorage.getItem("account");
            setEmail(JSON.parse(account).email)
            setUsername(JSON.parse(account).username)
        }
    };
    return (
        <div className="app">
            {getAccountInfo()}
            <h1> User: {username}</h1>
            <h4 color="textSecondary"> Email: {email}</h4>
        </div>
    );
}