export interface ServerConfig {
    port: number;
    nodeEnv: 'development' | 'staging' | 'production';
    corsOrigins: string[];
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    databaseUrl: string;
    jwtSecret: string;
    jwtExpiresIn: string;
}
declare const config: ServerConfig;
export default config;
//# sourceMappingURL=environment.d.ts.map