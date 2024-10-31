// src/models/productModel.ts

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../db'; // Import the Sequelize instance

interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  id!: number;
  name!: string;
  price!: number;
  description!: string;
}

// Initialize the Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize, // Passing the Sequelize instance
    tableName: 'products',
    timestamps: true,
  }
);
