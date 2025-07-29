import { api } from "@repo/lib";

import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  deleted_at: string | null;
};

interface Auth {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<Auth>((set) => ({
  user: null,
  loading: true,
  fetchUser: async () => {
    try {
      const res = await api.get<User>("/me");
      set({ user: res.data, loading: false });
    } catch (error) {
      console.error("Failed to fetch user:", error);
      set({ user: null, loading: false });
    }
  }
}));
