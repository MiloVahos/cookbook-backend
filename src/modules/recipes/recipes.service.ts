import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipeDTO } from './dto/CreateRecipe.dto';
import { UpdateRecipeDTO } from './dto/UpdateRecipe.dto';
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

  async getAllRecipes(): Promise<any> {
    return await this.recipeModel.find().select(["title", "author", "_id"]);
  }

  async getRecipeById(id: string): Promise<any> {
    return await this.recipeModel.findById(id);
  }

  async getRecipeByIdAndAuthorId(id: string, authorId: string): Promise<any> {
    return await this.recipeModel.findOne({ _id: id, authorId });
  }

  async updateRecipeById(updateRecipeDto: UpdateRecipeDTO, id: string): Promise<any> {
    return await this.recipeModel.findByIdAndUpdate(id, updateRecipeDto);
  }

  async deleteRecipeById(id: string): Promise<any> {
    return await this.recipeModel.deleteOne({ _id: id })
  }

  async saveRecipeFile (file: Express.Multer.File): Promise<string> {
    const location = await this.s3Service.uploadFile(file);
    return location;
  }

}
