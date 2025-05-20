import { create } from "zustand";

export interface IUser {
  id?: string;
  role?: "USER" | "ADMIN";
  login?: string;
}

export interface IUserStore {
  user: IUser;
  setUser: (user: IUser) => void;
}
const useStore = create<IUserStore>((set) => ({
  user: {
    id: "",
    role: "USER" as const,
    login: "",
  },
  setUser: (user) => {
    set({ user });
  },
}));

export default useStore;
