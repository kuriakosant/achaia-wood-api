import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Using environment variables for secure deployment on Render/Vercel
// Fallbacks removed for public repository security.
const ADMIN_PASSPHRASE = process.env.ADMIN_PASSPHRASE as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

export const loginAdmin = (req: Request, res: Response): void => {
    const { passphrase } = req.body;

    if (passphrase === ADMIN_PASSPHRASE) {
        // Issue a token valid for 24 hours
        const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid secret passphrase' });
    }
};
