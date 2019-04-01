import { RequestHandler, Request, Response, NextFunction } from 'express';

export const asyncWrap = (routeHandler: RequestHandler): RequestHandler => (
  req,
  res,
  next
) => Promise.resolve(routeHandler(req, res, next)).catch(next);
