import { Module } from '@nestjs/common';
import { MediaService } from './service/media.service';
import { MediaController } from './controller/media.controller';
import { R2StorageService } from './storage/r2.storage';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [MediaController],
  providers: [
    MediaService,
    R2StorageService,
    {
      provide: 'StorageAdapter',
      useExisting: R2StorageService,
    },
  ],
})
export class MediaModule {}
