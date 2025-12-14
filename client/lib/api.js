const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export const api = {
    registerUser: async (userData) => {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        return response.json();
    },

    registerPartner: async (partnerData) => {
        const response = await fetch(`${API_URL}/partners/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(partnerData),
        });
        return response.json();
    },

    registerForEvent: async (eventData) => {
        const response = await fetch(`${API_URL}/events/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData),
        });
        return response.json();
    },

    trackEvent: async (event, data) => {
        const response = await fetch(`${API_URL}/logs/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event, data }),
        });
        return response.json();
    },
};