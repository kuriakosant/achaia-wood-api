import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import sequelize from '../sequelize'; // Import your Sequelize instance here

export interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public description!: string;
}

// Initialize model
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
    sequelize, // Use the Sequelize instance
    tableName: 'products',
    timestamps: true,
  }
);
