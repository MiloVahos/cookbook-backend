import { Provider } from '@nestjs/common';
import mongoose from 'mongoose';
import { ConfigService } from '../config/config.service';

export const databaseProviders: Provider[] = [
  {
    inject: [ConfigService],
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService): Promise<typeof mongoose> =>
      await mongoose.connect(configService.get('MONGODB_CONNECTION_STRING'))
  },
];