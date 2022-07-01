import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RecipesService } from '../modules/recipes/recipes.service';

@Injectable()
export class AuthorCheckerMiddleware implements NestMiddleware {

  constructor(private readonly recipesService: RecipesService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const recipe = await this.recipesService.getRecipeByIdAndAuthorId(req.params.id, res.locals.userId);
    if (!recipe) throw new UnauthorizedException();
    next();
  }

}
