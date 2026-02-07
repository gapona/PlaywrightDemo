import { APIRequestContext } from '@playwright/test';
import { ApiClient } from '../helpers/api-client';
import { API_CONFIG } from '../config/api.config';
import { Book, CreateBookRequest, UpdateBookRequest } from '../models/book';

export class BookService {
    private apiClient: ApiClient;

    constructor(request: APIRequestContext) {
        this.apiClient = new ApiClient(request);
    }

    async getAllBooks() {
        const response = await this.apiClient.get(API_CONFIG.endpoints.books);
        return {
            response,
            data: await response.json() as Book[],
        };
    }

    async getBookById(id: number) {
        const endpoint = API_CONFIG.endpoints.bookById(id);
        const response = await this.apiClient.get(endpoint);
        return {
            response,
            data: response.ok() ? await response.json() as Book : null,
        };
    }

    async createBook(bookData: CreateBookRequest) {
        const response = await this.apiClient.post(API_CONFIG.endpoints.books, bookData);
        return {
            response,
            data: response.ok() ? await response.json() as Book : null,
        };
    }

    async updateBook(id: number, bookData: UpdateBookRequest) {
        const endpoint = API_CONFIG.endpoints.bookById(id);
        const response = await this.apiClient.put(endpoint, bookData);
        return {
            response,
            data: response.ok() ? await response.json() as Book : null,
        };
    }

    async deleteBook(id: number) {
        const endpoint = API_CONFIG.endpoints.bookById(id);
        const response = await this.apiClient.delete(endpoint);
        return { response };
    }
}