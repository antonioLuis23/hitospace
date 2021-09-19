import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("gte", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, //set to expire in 7 days
    httpOnly: true,
    path: "/",
    // domain: ".example.com",
    sameSite: "none",
    secure: true,
  });
};
