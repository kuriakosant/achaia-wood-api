import { Request, Response } from 'express';
import { ProductWood } from '../models/productWoodModel';

export const getAllWoodProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductWood.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const getWoodProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await ProductWood.findByPk(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

export const createWoodProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await ProductWood.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

export const updateWoodProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await ProductWood.findByPk(id);
    if (product) {
      await product.update(req.body);
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export const deleteWoodProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await ProductWood.findByPk(id);
    if (product) {
      await product.destroy();
      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
