import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../../config/config.module';
import { TokenExtractMiddleware } from 'src/middlewares/tokenExtract.middleware';
import { AuthModule } from '../auth/auth.module';
import { RecipeSchema } from './models/recipe.model';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { S3Service } from './S3Service.service';
import { AuthorCheckerMiddleware } from 'src/middlewares/authorChecker.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
    AuthModule,
    ConfigModule,
  ],
  controllers: [RecipesController],
  providers: [RecipesService, S3Service],
  exports: [RecipesService, S3Service],
})
export class RecipesModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenExtractMiddleware)
      .forRoutes(
        { path: 'recipes', method: RequestMethod.POST },
        { path: 'recipes/:id', method: RequestMethod.PUT },
        { path: 'recipes/:id', method: RequestMethod.DELETE },
      );
    consumer
      .apply(AuthorCheckerMiddleware)
      .forRoutes(
        { path: 'recipes/:id', method: RequestMethod.PUT },
        { path: 'recipes/:id', method: RequestMethod.DELETE },
      );
  }



}

