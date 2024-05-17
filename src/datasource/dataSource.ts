import { DataSource } from "typeorm";

const datasource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "3311",
  database: "theosumma",
  synchronize: true,
  //   logging: true,
  entities: ["src/entities/*.ts"],
});

export default datasource;
