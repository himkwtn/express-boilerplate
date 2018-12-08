import { RequestHandler, Request, Response, NextFunction } from "express";

export const asyncWrap = (routeHandler: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise.resolve(routeHandler(req, res, next)).catch(next);
