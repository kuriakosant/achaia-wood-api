import { Request, Response } from 'express';
import { CategoryWood } from '../models/categoryWoodModel';

export const getWoodCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryWood.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

export const createWoodCategory = async (req: Request, res: Response) => {
  const { name, level, parentId } = req.body;
  try {
    const newCategory = await CategoryWood.create({ name, level, parentId });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};

export const updateWoodCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, level, parentId } = req.body;
  try {
    const category = await CategoryWood.findByPk(id);
    if (category) {
      category.name = name;
      category.level = level !== undefined ? level : category.level;
      category.parentId = parentId !== undefined ? parentId : category.parentId;
      await category.save();
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

export const deleteWoodCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await CategoryWood.findByPk(id);
    if (category) {
      await category.destroy();
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
