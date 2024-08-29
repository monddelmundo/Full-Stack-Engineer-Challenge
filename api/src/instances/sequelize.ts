import { Sequelize } from "sequelize";

const db = 'postgres'
const username = 'postgres'

export const sequelize = new Sequelize(db, username, process.env.POSTGRES_PASSWORD ?? '', {
  dialect: "postgres",
  port: 5432,
  host: 'localhost'
});

sequelize.authenticate()