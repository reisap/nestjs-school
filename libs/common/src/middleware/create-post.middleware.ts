import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

@Injectable()
export class CreatePostMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.body;
      const Post = z.object({
        content: z
          .string()
          .min(5, { message: 'Must be 5 or more characters long' }),
      });

      Post.parse(params);
      next();
    } catch (e) {
      let error = JSON.parse(e);
      error = {
        code: 422,
        error: true,
        message: error,
        timestamp: new Date().toISOString(),
        path: req.url,
      };
      res.status(422).json(error);
    }
  }
}
