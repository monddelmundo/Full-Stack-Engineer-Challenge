import { Sequelize } from "sequelize";

const db = 'postgres'
const username = 'postgres'
const password = 'password'

export const sequelize = new Sequelize(db, username, password, {
  dialect: "postgres",
  port: 5432,
  host: 'localhost'
});

sequelize.authenticate()