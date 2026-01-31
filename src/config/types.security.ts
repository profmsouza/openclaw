export type SecurityConfig = {
    enabled: boolean;
    strictMode?: boolean; // If true, blocking is more aggressive
    promptInjection?: {
        block: boolean;
        notifyAdmin?: boolean;
    };
    malware?: {
        scanUrls: boolean;
        blockExecutables: boolean;
    };
    redactSecrets?: boolean; // Attempt to redact keys from output behavior
};
