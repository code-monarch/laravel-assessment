export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export interface AccessibilityIssue {
    type: string;
    element: string;
    message: string;
    severity: 'error' | 'warning';
    line: number;
    column: number;
    suggestion: string;
}

export interface AnalysisResult {
    score: number;
    issues: AccessibilityIssue[];
    summary: {
        errors: number;
        warnings: number;
        total: number;
    };
}
