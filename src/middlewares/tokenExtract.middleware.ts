import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class TokenExtractMiddleware implements NestMiddleware {

  constructor(private readonly authService: AuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const decodedData = this.authService.decodeToken(req.headers.authorization);
    if (decodedData) {
      const userName = decodedData['name'];
      const userId = decodedData['sub'];
      const userEmail = decodedData['email'];
      res.locals = { userName, userId, userEmail };
    }
    next();
  }

}
