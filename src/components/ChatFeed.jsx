import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";




const ChatFeed = (props) => {
    const { chats, activeChat, userName, messages } = props;

    const chat = chats && chats[activeChat];

    const renderMessages = () => {
        // keys ids of messages
        const keys = Object.keys(messages);

        // return the keys
        return keys.map((key, index) => {
            // get the message
            const message = messages[key];

            // if index is equal to zero it is null 
            //else it is the last message
            const lastMessageKey = index === 0 ? null : keys[index - 1];
            const isMyMessage = message.sender.userName === userName;

            return (
                // add a key and a style width
                <div key={key} style={{ width: "100%" }}>
                    <div className="message-block">
                        {isMyMessage ? (<MyMessage message={message}/>) : (<TheirMessage message={message} lastMessage={message[lastMessageKey]}/>)}
                    </div>
                    <div className="read-receipts" style={{marginRight: isMyMessage ? '18px': '0px', marginLeft: isMyMessage? '0px': '68px'}}>
                        read-receipts
                    </div>
                </div>
            )
        })
    }

    // if there is no chat return a string "Loading"
    if (!chat)  return <div>Loading...</div>;

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                {/* make sure you have the title before add the variable (?.) */}
                <div className="chat-title">{chat?.title}</div>
                <div className="chat-subtitle"></div>
                {/* map the chat person and return a person username */}
                {chat.people.map(person => ` ${person.person.username}`)}
            </div>
            {renderMessages()}
            <div style={{ height: "100px" }}/>
            <div className="message-form-container">
                <MessageForm {...props} chatId = {activeChat}/>
            </div>
        </div>
    );


}




export default ChatFeed;