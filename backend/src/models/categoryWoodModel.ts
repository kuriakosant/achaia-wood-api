import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize'; 

export interface CategoryWoodAttributes {
  id: number;
  name: string;
  level: number;
  parentId?: number | null;
}

export interface CategoryWoodCreationAttributes extends Optional<CategoryWoodAttributes, 'id'> { }

export class CategoryWood extends Model<CategoryWoodAttributes, CategoryWoodCreationAttributes> implements CategoryWoodAttributes {
  public id!: number;
  public name!: string;
  public level!: number;
  public parentId?: number | null;
}

CategoryWood.init(
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
    tableName: 'categories_wood',
    timestamps: true,
  }
);
