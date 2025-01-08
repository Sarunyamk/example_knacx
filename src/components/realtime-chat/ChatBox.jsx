import React from 'react';

const ChatBox = ({ messages }) => {
    return (
        <div className="h-96 overflow-y-auto border border-gray-300 p-4 bg-white rounded-lg">
            {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.isOwnMessage ? 'text-right' : ''}`}>
                    <span
                        className={`inline-block px-4 py-2 rounded-lg ${msg.isOwnMessage ? 'bg-green-200' : 'bg-gray-200'
                            }`}
                    >
                        {msg.text}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ChatBox;
