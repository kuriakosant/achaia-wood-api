import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize'; 

export interface CategoryAttributes {
  id: number;
  name: string;
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id'> { }

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;
}

// Initialize model
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: true,
  }
);
