import express, { Request, Response } from 'express';
import { getTagCountMap } from '../models/application';

const router = express.Router();

/**
 * @route GET /tag/getTagsWithQuestionNumber
 * @description Retrieve tags along with the count of questions for each tag.
 * @returns List of tags with the number of associated questions or an error message.
 */
router.get('/getTagsWithQuestionNumber', async (req: Request, res: Response) => {
    try {
        const tagCountMap = await getTagCountMap();

        // Handle case where tagCountMap is null or has an error
        if (!tagCountMap || 'error' in tagCountMap) {
            console.error('Error fetching tags');
            return res.status(500).json({ error: 'Error fetching tags' });
        }

        // Transform Map to an array of objects
        const tagList = Array.from(tagCountMap.entries()).map(([name, qcnt]) => ({
            name,
            qcnt,
        }));

        res.status(200).json(tagList);
    } catch (error) {
        console.error('Error retrieving tags:', error);
        res.status(500).json({ error: 'Error retrieving tags' });
    }
});

export default router;
