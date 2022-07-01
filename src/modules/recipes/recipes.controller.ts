import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BodyValidatorPipe } from 'src/pipes/bodyValidator.pipe';
import { CreateRecipeDTO } from './dto/CreateRecipe.dto';
import { CreateRecipeRequestDTO } from './dto/CreateRecipeRequest.dto';
import { UpdateRecipeRequestDTO } from './dto/UpdateRecipeRequest.dto';
import { RecipesService } from './recipes.service';
import { updateRecipeSchema } from './schemas/updateRecipeSchema';

@ApiTags('Recipes')
@UseGuards(AuthGuard('jwt'))
@Controller('recipes')
export class RecipesController {

  constructor(private readonly recipesService: RecipesService) {}

  @ApiOkResponse({ description: 'New recipe saved in the db' })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createRecipe(@UploadedFile() file: Express.Multer.File, @Body() body: CreateRecipeRequestDTO, @Res() res): Promise<any> {
    const { title, description } = body;
    if (!title || !description) throw new BadRequestException('title and description are required')
    const location = await this.recipesService.saveRecipeFile(file);
    const createRecipeDto: CreateRecipeDTO = {
      author: res.locals.userName,
      authorId:  res.locals.userId,
      title,
      description,
      imgUrl: location,
    }
    const saveRecipeResult = await this.recipesService.createNewRecipe(createRecipeDto);
    res.send(saveRecipeResult);
  }

  @ApiOkResponse({ description: 'Return list of Recipes' })
  @Get()
  async getAllRecipes(): Promise<any> {
    return await this.recipesService.getAllRecipes();
  }

  @ApiNotFoundResponse()
  @ApiOkResponse({ description: 'Return list of Recipes' })
  @Get(':id')
  async getRecipe(@Param('id') id: string): Promise<any> {
    const recipe = await this.recipesService.getRecipeById(id);
    if (!recipe) throw new NotFoundException('Recipe not found');
    return recipe;
  }

  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ description: 'Update Recipe' })
  @Put(':id')
  async updateRecipe(@Param('id') id: string, @Body(new BodyValidatorPipe(updateRecipeSchema)) body: UpdateRecipeRequestDTO): Promise<any> {
    return await this.recipesService.updateRecipeById(body, id);
  }

  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @ApiOkResponse({ description: 'Delete Recipe' })
  @Delete(':id')
  async deleteRecipe(@Param('id') id: string): Promise<any> {
    return await this.recipesService.deleteRecipeById(id);
  }

}
