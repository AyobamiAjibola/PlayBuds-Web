type User = {
    id: string;
    name: string;
    email: string;
};
export declare const useAuthStore: import("pinia").StoreDefinition<"auth", {
    user: User | null;
    token: string | null;
}, {
    isAuthenticated: (state: {
        user: {
            id: string;
            name: string;
            email: string;
        } | null;
        token: string | null;
    } & import("pinia").PiniaCustomStateProperties<{
        user: User | null;
        token: string | null;
    }>) => boolean;
}, {
    setAuth(user: User, token: string): void;
    logout(): void;
}>;
export {};
