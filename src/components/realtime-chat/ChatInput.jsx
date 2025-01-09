import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            onSendMessage(message); // ส่งข้อความไปยัง parent component
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };


    return (
        <div className="flex gap-2 mt-4">
            <input
                type="text"
                className="flex-1 px-4 py-2 border rounded-lg bg-gray-100 border-gray-300 text-gray-800"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleSendMessage}

            >
                Send
            </button>
        </div>
    );
};

export default ChatInput;
