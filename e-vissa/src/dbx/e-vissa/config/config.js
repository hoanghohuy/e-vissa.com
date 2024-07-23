// mainConfig.js
require('dotenv').config();

module.exports = {
    development: {
        username: process.env.MYSQL_INITDB_ROOT_USERNAME,
        password: process.env.MYSQL_INITDB_ROOT_PASSWORD,
        database: process.env.MYSQL_INITDB_DATABASE,
        host: process.env.MYSQL_INITDB_HOST,
        port: process.env.MYSQL_INITDB_PORT,
        dialect: 'mariadb',
        dialectModule: require('mariadb'),
        dialectOptions: {
            connectTimeout: 30000, // 30 seconds (30000 milliseconds)
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
        },
        define: {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        logging: false,
    },
    production: {
        username: process.env.MYSQL_INITDB_ROOT_USERNAME,
        password: process.env.MYSQL_INITDB_ROOT_PASSWORD,
        database: process.env.MYSQL_INITDB_DATABASE,
        host: process.env.MYSQL_INITDB_HOST,
        port: process.env.MYSQL_INITDB_PORT,
        dialect: 'mariadb',
        dialectModule: require('mariadb'),
        dialectOptions: {
            connectTimeout: 30000, // 30 seconds (30000 milliseconds)
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci',
        },
        define: {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
        logging: false,
    },
};
