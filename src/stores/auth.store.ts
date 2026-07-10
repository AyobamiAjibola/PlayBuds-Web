import { defineStore } from "pinia";

type User = {
  id: string;
  name: string;
  email: string;
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem("token") || null,
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },

  actions: {
    setAuth(user: User, token: string) {
      this.user = user;
      this.token = token;
      localStorage.setItem("token", token);
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});