import rateLimit from "express-rate-limit";

// Commenting and Voting Rate Limiter
export const rateLimiter = rateLimit({
    windowMs: 10 * 1000, // 1-minute window
    max: 10, // Limit each IP to 10 requests per windowMs
    message: {
        error: "Too many requests. Please try again later.",
    }
});
