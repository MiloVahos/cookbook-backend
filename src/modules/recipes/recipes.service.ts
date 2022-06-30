import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipeDTO } from './dto/CreateRecipe.dto';
import { Recipe, RecipeDocument } from './models/recipe.model';
import { S3Service } from './S3Service.service';

@Injectable()
export class RecipesService {

  constructor(@InjectModel('Recipe') private readonly recipeModel: Model<RecipeDocument>,
              private readonly s3Service: S3Service) {}

  async createNewRecipe(createRecipeDTO: CreateRecipeDTO): Promise<any> {
    const { author, authorId, title, description, imgUrl } = createRecipeDTO;
    const recipe: Recipe = { author, authorId, title, description, imgUrl };
    const createdRecipe = new this.recipeModel(recipe);
    return await createdRecipe.save();
  }

  async saveRecipeFile (file: Express.Multer.File): Promise<string> {
    const location = await this.s3Service.uploadFile(file);
    return location;
  }

}
