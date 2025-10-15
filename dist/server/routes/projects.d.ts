import { Request, Response } from 'express';
export declare const listProjects: (req: Request, res: Response) => Promise<void>;
export declare const scanProjects: (req: Request, res: Response) => Promise<void>;
export declare const getProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getActiveProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const setActiveProject: (req: Request, res: Response) => Promise<void>;
export declare const clearActiveProject: (req: Request, res: Response) => Promise<void>;
export declare const switchToProject: (req: Request, res: Response) => Promise<void>;
export declare const getProjectNavigationHistory: (req: Request, res: Response) => Promise<void>;
export declare const createProject: (req: Request, res: Response) => Promise<void>;
export declare const updateProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteProject: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=projects.d.ts.map