import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize'; 

export interface CategoryGalleryAttributes {
  id: number;
  name: string;
  level: number;
  parentId?: number | null;
}

export interface CategoryGalleryCreationAttributes extends Optional<CategoryGalleryAttributes, 'id'> { }

export class CategoryGallery extends Model<CategoryGalleryAttributes, CategoryGalleryCreationAttributes> implements CategoryGalleryAttributes {
  public id!: number;
  public name!: string;
  public level!: number;
  public parentId?: number | null;
}

CategoryGallery.init(
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
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 'categories_gallery',
    timestamps: true,
  }
);
