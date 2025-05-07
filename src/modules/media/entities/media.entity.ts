export class Media {
    id: string;
    tenantId: string;
    productId: string;
    key: string;
    url: string;
    type: 'image' | 'model';
    label?: string;
    altText?: string;
    createdAt: Date;
  }