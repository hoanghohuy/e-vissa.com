// export default connect;
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    process.env.MYSQL_INTERNAL_DATABASE,
    process.env.MYSQL_INTERNAL_USERNAME,
    process.env.MYSQL_INTERNAL_PASSWORD,
    {
        host: process.env.MYSQL_INTERNAL_HOST,
        port: process.env.MYSQL_INTERNAL_PORT,
        dialect: 'mariadb',
        dialectModule: require('mariadb'),
        dialectOptions: {
            connectTimeout: 30000, // 30 seconds (30000 milliseconds)
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
        },
        logging: false,
    },
);

export default sequelize;
