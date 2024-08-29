import { Sequelize } from "sequelize";

const db = 'postgres'
const username = 'postgres'

console.log("Password", process.env.POSTGRES_PASSWORD)
export const sequelize = new Sequelize(db, username, process.env.POSTGRES_PASSWORD ?? '', {
  dialect: "postgres",
  port: 5432,
  host: 'db'
});

sequelize.authenticate()

sequelize.sync().then(() => {
  console.log('Synced successfully!');
}).catch((error) => {
  console.error('Unable to create table(s) : ', error);
});