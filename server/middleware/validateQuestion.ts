import { Request, Response, NextFunction } from "express";

export const validateQuestion = (req: Request, res: Response, next: NextFunction) => {
    const { title, text, tags, asked_by } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ error: "Invalid or missing title." });
    }

    if (!text || typeof text !== "string" || !text.trim()) {
        return res.status(400).json({ error: "Invalid or missing text." });
    }

    if (!Array.isArray(tags) || !tags.every(tag => typeof tag === "string")) {
        return res.status(400).json({ error: "Invalid tags format." });
    }

    if (!asked_by || typeof asked_by !== "string" || !asked_by.trim()) {
        return res.status(400).json({ error: "Invalid or missing asked_by field." });
    }

    next();
};
