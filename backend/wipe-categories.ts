import sequelize from './src/sequelize';
import { Category } from './src/models/categoryModel';

const dbWipeCategories = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to the DB.");

        // Clear all table data and reset ID sequences
        await Category.destroy({
            where: {},
            truncate: true,
            restartIdentity: true
        });

        console.log("Categories successfully wiped!");
    } catch (err) {
        console.error("Failed to wipe categories:", err);
    } finally {
        process.exit();
    }
}

dbWipeCategories();
