import {
  Injectable,
  NestMiddleware,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

@Injectable()
export class CreateUserPostMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.body;
      const User = z.object({
        username: z
          .string()
          .min(5, { message: 'Must be 5 or more characters long' }),
        password: z
          .string()
          .min(5, { message: 'Must be 5 or more characters long' }),
        email: z.string().email({ message: 'Invalid email address' }),
      });

      User.parse(params);
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
