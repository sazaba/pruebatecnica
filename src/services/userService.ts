// src/services/userService.ts
import axios from 'axios';
import { User } from '../types/User';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = async (): Promise<User[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getUserById = async (id: number): Promise<User> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

