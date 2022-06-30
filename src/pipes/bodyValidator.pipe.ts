import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class BodyValidatorPipe implements PipeTransform {

  constructor(private schema: ObjectSchema) {}

  transform(value: any) {
    console.log(value)
    const { error } = this.schema.validate(value);
    console.log(error)
    if (error) throw new BadRequestException(error.message);
    return value;
  }

}
