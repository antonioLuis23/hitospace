import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("gte", token, {
    httpOnly: true,
    path: "/",
    // domain: ".example.com",
    sameSite: "none",
    secure: true,
  });
};
