import { Request, Response } from 'express';
import pool from '../db';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.status(200).json(rows);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { name, category, price, description, features, image } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO products (name, category, price, description, features, image) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category, price, description, JSON.stringify(features), image]
    );
    res.status(201).json({ id: result.insertId, name, category, price, description, features, image });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};