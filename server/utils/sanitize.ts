/**
 * Sanitizes input to escape HTML special characters and prevent XSS.
 * @param input Input string to sanitize.
 * @returns Sanitized string.
 */
export const escapeHTML = (input: string): string => {
    console.log("Inside escapeHTML:", input);
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
};
