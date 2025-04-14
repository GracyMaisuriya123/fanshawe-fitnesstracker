import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api'; // Update to match your backend

// Function to register a user with Firebase Auth
export const registerUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Signup Error:', error);
        throw error;
    }
};

// Function to log in a user
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Login Error:', error);
        throw error;
    }
};

// Function to fetch user fitness data
export const getUserFitnessData = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/fitness/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching fitness data:', error);
        throw error;
    }
};

// Function to update user fitness progress
export const updateUserFitnessProgress = async (userId, fitnessData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/fitness/${userId}`, fitnessData);
        return response.data;
    } catch (error) {
        console.error('Error updating fitness progress:', error);
        throw error;
    }
};

