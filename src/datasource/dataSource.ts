import { DataSource } from "typeorm";

const datasource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "3311",
  database: "theosumma",
});

export default datasource;
