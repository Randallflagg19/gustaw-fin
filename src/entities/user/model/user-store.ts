import { create } from "zustand";

export interface IUser {
  id: string;
  role: "USER" | "ADMIN";
  login: string;
}

export interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
