import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenExtractMiddleware } from 'src/middlewares/tokenExtract.middleware';
import { AuthModule } from '../auth/auth.module';
import { RecipeSchema } from './models/recipe.model';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Recipe', schema: RecipeSchema }]),
    AuthModule
  ],
  controllers: [RecipesController],
  providers: [RecipesService],
  exports: [RecipesService],
})
export class RecipesModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenExtractMiddleware)
      .forRoutes(
        { path: 'recipes', method: RequestMethod.POST },
      );
  }

}

