import express from "express";
import { Connection } from "typeorm";

export type MyContext = {
  conn: Connection;
  req: express.Request;
  res: express.Response;
  setCookies: any;
  setHeaders: any;
  payload?: { userId: string };
};
