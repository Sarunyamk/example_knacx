// import { useEffect, useState } from 'react';

// import { w3cwebsocket as W3CWebSocket } from 'websocket';
// import ChatBox from './ChatBox';
// import ChatInput from './ChatInput';
// const client = new W3CWebSocket('wss://echo.websocket.events');


// const RealTimeChat = ({ setIsChatOpen }) => {

//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
//         setMessages(storedMessages);
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('chatMessages', JSON.stringify(messages));
//     }, [messages]);

//     const handleSendMessage = (text) => {
//         client.send(text); // ส่งข้อความผ่าน WebSocket
//         setMessages((prev) => [...prev, { text, isOwnMessage: true }]);
//     };

//     useEffect(() => {
//         client.onmessage = (message) => {
//             setMessages((prev) => [
//                 ...prev,
//                 { text: message.data, isOwnMessage: false },
//             ]);
//         };
//     }, []);

//     return (
//         <div>
//             <div className="relative max-w-lg mx-auto mt-10 p-4 border rounded-lg bg-gray-100">
//                 <h1 className="text-3xl text-center font-bold text-blue-500">แชท</h1>
//                 <button
//                     onClick={() => setIsChatOpen(false)}
//                     className="absolute right-0 top-0 text-sm text-black font-bold p-4 duration-300 hover:text-blue-500"
//                 >
//                     X
//                 </button>
//                 <ChatBox messages={messages} />
//                 <ChatInput onSendMessage={handleSendMessage} />
//             </div>
//         </div>
//     )
// }
// export default RealTimeChat



import { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ChatBox from './ChatBox';
import ChatInput from './ChatInput';

const client = new W3CWebSocket('wss://echo.websocket.events');

const RealTimeChat = ({ setIsChatOpen }) => {
    const [messages, setMessages] = useState([]);

    const userLogin = JSON.parse(localStorage.getItem('currentUser')) || null;

    const userId = userLogin ? userLogin.id : null;

    // โหลดข้อความจาก Local Storage เฉพาะ userId
    useEffect(() => {
        if (userId) {
            const storedMessages = JSON.parse(localStorage.getItem(`chatMessages_${userId}`)) || [];
            setMessages(storedMessages);
        }
    }, [userId]);

    // บันทึกข้อความลง Local Storage เฉพาะ userId
    useEffect(() => {
        if (userId) {
            localStorage.setItem(`chatMessages_${userId}`, JSON.stringify(messages));
        }
    }, [messages, userId]);

    const handleSendMessage = (text) => {
        client.send(text); // ส่งข้อความผ่าน WebSocket
        setMessages((prev) => [...prev, { text, isOwnMessage: true }]);
    };

    useEffect(() => {
        client.onmessage = (message) => {
            setMessages((prev) => [
                ...prev,
                { text: message.data, isOwnMessage: false },
            ]);
        };
    }, []);

    return (
        <div>
            <div className="relative max-w-lg mx-auto mt-10 p-4 border rounded-lg bg-gray-100">
                <h1 className="text-3xl text-center font-bold text-blue-500">แชท</h1>
                <button
                    onClick={() => setIsChatOpen(false)}
                    className="absolute right-0 top-0 text-sm text-black font-bold p-4 duration-300 hover:text-blue-500"
                >
                    X
                </button>
                <ChatBox messages={messages} />
                <ChatInput onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default RealTimeChat;
