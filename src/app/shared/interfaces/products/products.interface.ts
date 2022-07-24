import { ICategoryResponse } from "../category/category.interface";

export interface IProductRequest {
    category: ICategoryResponse;
    name: string;
    path: string;
    ingredient: string;
    weight: string;
    price: number;
    imagePath: string;
    count: number;
}

export interface IProductResponse extends IProductRequest {
    id: number;
}