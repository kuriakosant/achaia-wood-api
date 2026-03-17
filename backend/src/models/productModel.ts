import { DataTypes, Model, Optional, Sequelize } from 'sequelize';
import sequelize from '../sequelize'; // Import your Sequelize instance here

export interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  description: string;
  category?: string;
  features?: string[];
  image?: string;
  gallery?: string[];
  isFeatured?: boolean;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public description!: string;
  public category?: string;
  public features?: string[];
  public image?: string;
  public gallery?: string[];
  public isFeatured?: boolean;
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
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    features: {
      type: DataTypes.JSON, // Use JSON for array storage
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT('long'), // Allow huge base64 strings
      allowNull: true,
    },
    gallery: {
      type: DataTypes.JSON, // Array of base64 strings
      allowNull: true,
      defaultValue: []
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    sequelize, // Use the Sequelize instance
    tableName: 'products',
    timestamps: true,
  }
);
