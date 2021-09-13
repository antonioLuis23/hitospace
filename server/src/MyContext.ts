import { Connection } from "typeorm";

export type MyContext = {
  conn: Connection;
  req: Request & any;
  res: Response;
};
