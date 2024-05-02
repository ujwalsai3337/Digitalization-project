// src/EmailList.js

import React, { useState } from 'react';
import axios from 'axios';

const EmailList = ({ emails }) => {
    const [generatedPasswords, setGeneratedPasswords] = useState({});

    
    const generatePassword = async (email) => {
        try {
            const password = generateRandomPassword(); // Generate random password
            const response = await axios.post('http://localhost:3000/generate-password', { username: email, password });
            const { username, generatedPassword } = response.data;
            setGeneratedPasswords({ ...generatedPasswords, [username]: generatedPassword });
        } catch (error) {
            console.error('Error generating password:', error);
        }
    };

    // Function to generate a random password
    const generateRandomPassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < 8; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return password;
    };

    return (
        <div>
            <h2>Email List</h2>
            <ul>
                {emails.map(email => (
                    <li key={email}>
                        {email}
                        <button onClick={() => generatePassword(email)}>Generate Password</button>
                        {generatedPasswords[email] && <span>Password: {generatedPasswords[email]}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmailList;
