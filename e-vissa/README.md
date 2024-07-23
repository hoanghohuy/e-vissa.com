# EVISA TUTORIAL

## Getting Started

1. Start by renaming the `.env.example` file to `.env` and edit the corresponding configuration settings to match requirements.

2. Download and install the necessary libraries:

```bash
npm install
```

### Development

For development purposes, use the following command:

```bash
npm run dev
```

This will start a development server, allowing you to work on project.

### Production

For production deployment, follow these steps:

1. Build project:

```bash
npm run build
```

2. Start production server:

```bash
npm run start
```

---

## About the Database

This project utilizes Sequelize CLI for database management. To create and manage database tables,
For any changes to the database structure, please refer to the Sequelize documentation on migrations at https://sequelize.org/docs/v6/other-topics/migrations/.

npx sequelize-cli db:seed --seed [fileSeed]
npx sequelize-cli db:migrate --name [fileMigrate]
