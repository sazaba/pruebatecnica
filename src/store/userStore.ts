// src/store/userStore.ts
import { create } from 'zustand';
import { User } from '../types/User';
import { getUsers } from '../services/userService';

interface UserState {
    users: User[];
    loading: boolean;
    fetchUsers: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
    users: [],
    loading: true,
    fetchUsers: async () => {
        set({ loading: true });
        const data = await getUsers();
        set({ users: data, loading: false });
    },
}));
