import { Inject, Injectable } from '@nestjs/common';
import { StorageAdapter } from '../storage/storage.adapter';
import { Media } from '../entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @Inject('StorageAdapter') private readonly storage: StorageAdapter,
) {}

  async uploadFile(
    file: Express.Multer.File,
    tenantId: string,
    productId: string,
  ): Promise<Media> {
    const { key, url } = await this.storage.upload(
      file.buffer,
      file.originalname,
      file.mimetype,
    );

    const media: Media = {
      id: crypto.randomUUID(),
      tenantId,
      productId,
      key,
      url,
      type: file.mimetype.includes('image') ? 'image' : 'model',
      createdAt: new Date(),
    };

    return media;
  }
}