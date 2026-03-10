import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Using environment variables for simple, secure deployment on Vercel/Render
// Fallbacks provided for local testing but should NOT be used in production.
const ADMIN_PASSPHRASE = process.env.ADMIN_PASSPHRASE || 'achaia-admin-secret-2026';
const JWT_SECRET = process.env.JWT_SECRET || 'super-secure-jwt-secret-key';

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
