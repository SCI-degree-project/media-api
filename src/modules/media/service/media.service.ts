import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MediaService {
    private s3: S3Client;
    private bucket: string;

    constructor(private config: ConfigService) {
        this.bucket = this.config.get('R2_BUCKET_NAME')!;
        this.s3 = new S3Client({
            region: this.config.get('R2_REGION')!,
            endpoint: this.config.get('R2_ENDPOINT')!,
            credentials: {
                accessKeyId: this.config.get('R2_ACCESS_KEY_ID')!,
                secretAccessKey: this.config.get('R2_SECRET_ACCESS_KEY')!,
            },
        });

    }

    async uploadFile(file: Express.Multer.File) {
        const key = `${uuid()}-${file.originalname}`;

        await this.s3.send(
            new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            }),
        );

        return {
            url: `${this.config.get('R2_ENDPOINT')}/${this.bucket}/${key}`,
            key,
            type: file.mimetype,
        };
    }
}
