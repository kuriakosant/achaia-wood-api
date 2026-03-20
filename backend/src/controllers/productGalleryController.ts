import { Request, Response } from 'express';
import { ProductGallery } from '../models/productGalleryModel';

export const getAllGalleryProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductGallery.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const getGalleryProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await ProductGallery.findByPk(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

export const createGalleryProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await ProductGallery.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

export const updateGalleryProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await ProductGallery.findByPk(id);
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

export const deleteGalleryProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await ProductGallery.findByPk(id);
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
