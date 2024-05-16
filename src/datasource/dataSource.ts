import { DataSource } from "typeorm";
import { Sector } from "../entities/Sectors.entity";
import { PlatformSettings } from "../entities/PlatformSettings.entity";
import { Plugins } from "../entities/Plugins.entity";
import { Tanents } from "../entities/Tanents.entity";

const datasource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "3311",
  database: "theosumma",
  synchronize: true,
  //   logging: true,
  entities: [PlatformSettings, Sector, Plugins, Tanents],
});

export default datasource;
