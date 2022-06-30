import { Injectable } from '@nestjs/common';
import * as AWS from "aws-sdk";
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class S3Service {

  private s3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    });
  }

  async uploadFile(file): Promise<string> {
    const bucketName = 'cookbook-images-test';
    const { originalname } = file;
    const params = {
      Bucket: bucketName,
      Key: originalname,
      Body: file.buffer
    };
    const s3response = await this.s3.upload(params).promise();
    return s3response.Location;
  }

}