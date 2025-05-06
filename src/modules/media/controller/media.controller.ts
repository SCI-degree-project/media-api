import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { MediaService } from '../service/media.service';
  
  @Controller('media')
  export class MediaController {
    constructor(private readonly mediaService: MediaService) {}
  
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(@UploadedFile() file: Express.Multer.File) {
      return this.mediaService.uploadFile(file);
    }
  }
  