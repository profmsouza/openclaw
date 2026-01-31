import { createSubsystemLogger } from "../logging/subsystem.js";

const log = createSubsystemLogger("security");

export type SecurityScanResult = {
    safe: boolean;
    reason?: string;
    flaggedContent?: string;
};

export class SecurityService {
    // Regex patterns for common prompt injection attempts
    private injectionPatterns = [
        /ignore (all )?previous instructions/i,
        /system mode/i,
        /you are now (a|an)/i,
        /override (system )?prompts?/i,
        /delete (all )?files/i,
        /access (system )?credentials/i
    ];

    // Dangerous file extensions or URL patterns often used in malware
    private malwarePatterns = [
        /\.exe$/i, /\.bat$/i, /\.cmd$/i, /\.sh$/i, /\.vbs$/i, /\.scr$/i
    ];

    public scanInput(text: string): SecurityScanResult {
        // 1. Check for prompt injection
        for (const pattern of this.injectionPatterns) {
            if (pattern.test(text)) {
                log.warn(`Prompt injection attempt detected: ${pattern.source}`);
                return {
                    safe: false,
                    reason: "Prompt injection detected",
                    flaggedContent: text
                };
            }
        }

        // 2. Mock Malware Scan (URL/File patterns in text)
        // In a real scenario, this would call VirusTotal or Google Safe Browsing API
        if (this.malwarePatterns.some(p => p.test(text))) {
            log.warn(`Potential malware reference detected.`);
            return {
                safe: false,
                reason: "Potential malware reference detected",
                flaggedContent: text
            };
        }

        return { safe: true };
    }

    public sanitizeOutput(text: string): string {
        // Basic redaction of potential secrets (e.g. API keys regex)
        // This is a placeholder for more advanced DLP (Data Loss Prevention)
        return text.replace(/sk-[a-zA-Z0-9]{48}/g, "[REDACTED_KEY]");
    }
}

export const securityService = new SecurityService();
