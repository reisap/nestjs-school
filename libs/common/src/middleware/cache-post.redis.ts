import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import RedisClient from '../database/redis';
import ResponseDto from '../dto/response.dto';

const client = new RedisClient();
const clientRedis = client.run().client;

@Injectable()
export class checkCachePostById implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const search = 'post-' + req.params.id;

      let result = await clientRedis.get(search);

      if (result != null) {
        result = JSON.parse(result);
        result.info = 'data from cache';

        const format = new ResponseDto({
          data: result,
        }).response();
        return res.send(format);
      }
      next();
    } catch (e) {
      //throw new UnprocessableEntityException(e);
    }
  }
}

@Injectable()
export class checkCachePost implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const search = `post-${page}-${limit}`;

      let result = await clientRedis.get(search);

      if (result != null) {
        console.log('redis post all = ', result);
        result = JSON.parse(result);
        result.info = 'data from cache';
        const format = new ResponseDto({
          data: result,
        }).response();
        return res.send(format);
      }
      next();
    } catch (e) {
      //throw new UnprocessableEntityException(e);
    }
  }
}
