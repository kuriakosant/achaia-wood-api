import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize'; 
import { CategoryGallery } from './categoryGalleryModel';

export interface ProductGalleryAttributes {
  id: number;
  name: string;
  price: number;
  description: string;
  mainCategoryId: number;
  subCategoryId1: number;
  subCategoryId2?: number | null;
  company?: string | null;
  features?: string[];
  image?: string;
  gallery?: string[];
  isFeatured?: boolean;
  sku?: string;
}

export interface ProductGalleryCreationAttributes extends Optional<ProductGalleryAttributes, 'id'> { }

export class ProductGallery extends Model<ProductGalleryAttributes, ProductGalleryCreationAttributes> implements ProductGalleryAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public description!: string;
  public mainCategoryId!: number;
  public subCategoryId1!: number;
  public subCategoryId2?: number | null;
  public company?: string | null;
  public features?: string[];
  public image?: string;
  public gallery?: string[];
  public isFeatured?: boolean;
  public sku?: string;
}

ProductGallery.init(
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
    mainCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: CategoryGallery, key: 'id' }
    },
    subCategoryId1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: CategoryGallery, key: 'id' }
    },
    subCategoryId2: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: CategoryGallery, key: 'id' }
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    features: {
      type: DataTypes.JSON, 
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT('long'), 
      allowNull: true,
    },
    gallery: {
      type: DataTypes.JSON, 
      allowNull: true,
      defaultValue: []
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize, 
    tableName: 'products_gallery',
    timestamps: true,
  }
);
