export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'viewer';
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
    isActive: boolean;
}
export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
export interface JWTPayload {
    userId: string;
    username: string;
    role: string;
    iat?: number;
    exp?: number;
}
export declare class AuthService {
    private jwtSecret;
    private jwtRefreshSecret;
    private saltRounds;
    constructor();
    initializeDatabase(): Promise<void>;
    private createDefaultAdmin;
    registerUser(username: string, email: string, password: string, role?: string): Promise<User>;
    authenticateUser(username: string, password: string): Promise<{
        user: User;
        tokens: AuthTokens;
    }>;
    generateTokens(user: User): Promise<AuthTokens>;
    refreshAccessToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    verifyAccessToken(token: string): Promise<JWTPayload>;
    logout(refreshToken: string): Promise<void>;
    getUserById(userId: string): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
    updateUser(userId: string, updates: Partial<User>): Promise<User | null>;
    deleteUser(userId: string): Promise<boolean>;
    createAuthMiddleware(): (req: any, res: any, next: any) => Promise<any>;
    createRoleMiddleware(allowedRoles: string[]): (req: any, res: any, next: any) => any;
}
//# sourceMappingURL=AuthService.d.ts.map