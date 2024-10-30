import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

interface ProductAttributes {
  id?: number;
  name: string;
  price: number;
  description: string;
}

class Product extends Model<ProductAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public description!: string;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'products',
    sequelize, // passing the sequelize instance
    timestamps: false, // assuming no createdAt, updatedAt fields
  }
);

export default Product;
