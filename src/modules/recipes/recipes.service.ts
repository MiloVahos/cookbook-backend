import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipeDTO } from './dto/CreateRecipe.dto';
import { Recipe, RecipeDocument } from './models/recipe.model';

@Injectable()
export class RecipesService {

  constructor(@InjectModel('Recipe') private readonly recipeModel: Model<RecipeDocument>) {}

  async createNewRecipe(createRecipeDTO: CreateRecipeDTO): Promise<any> {
    const { author, authorId, title, description } = createRecipeDTO;
    const recipe: Recipe = { author, authorId, title, description, imgUrl: 'url' };
    const createdRecipe = new this.recipeModel(recipe);
    return await createdRecipe.save();
  }

}
