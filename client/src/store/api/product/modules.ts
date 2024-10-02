 export interface IComment {
    body: Array<{
      content: string;
      rating: number;
    }>;
    username: string;
    userId: string;
  }
  
  export interface IProduct {
    productName: string;
    size?: string;
    price: number;
    measure?: number;
    categoryName?: string;
    color?: string;
    comments?: IComment[];
    imagesUrl: {
      mainImageUrl: string;
      additionalImages?: string[];
    };
    favorite?: {
      userId?: string;
      isFavorite?: boolean;
      favoriteId?: string;
    };
    brand?: string;
    viewing?: number;
    material?: string;
    popularity?: number;
    description?: string;
    discount?: {
      percentage?: number;
      newPrice?: number;
      oldPrice?: number;
    };
    stock?: number;
    weight?: number;
    dimensions?: {
      ringDiameter?: number;
    };
    warranty?: {
      duration?: string;
      coverage?: string;
    };
    certification?: string;
    returnPolicy?: {
      days?: number;
      condition?: string;
    };
    relatedProducts?: Array<{
      productId?: string;
      productName?: string;
    }>;
    totalSales?: number;
    creationDate?: Date;
    lastUpdated?: Date;
    reviewsCount?: number;
    averageRating?: number;
    productAvailability?: {
      online?: boolean;
      stores?: string[];
    };
    repairService?: {
      available?: boolean;
      details?: string;
    };
    priceHistory?: Array<{
      date?: Date;
      price?: number;
    }>;
  }
  