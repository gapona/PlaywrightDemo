import { APIRequestContext } from '@playwright/test';
import { ApiClient } from '../helpers/api-client';
import { API_CONFIG } from '../config/api.config';
import { Author, CreateAuthorRequest, UpdateAuthorRequest } from '../models/author';

export class AuthorService {
    private apiClient: ApiClient;

    constructor(request: APIRequestContext) {
        this.apiClient = new ApiClient(request);
    }

    async getAllAuthors() {
        const response = await this.apiClient.get(API_CONFIG.endpoints.authors);
        return {
            response,
            data: await response.json() as Author[],
        };
    }

    async getAuthorById(id: number) {
        const endpoint = API_CONFIG.endpoints.authorById(id);
        const response = await this.apiClient.get(endpoint);
        return {
            response,
            data: response.ok() ? await response.json() as Author : null,
        };
    }

    async getAuthorsByBookId(bookId: number) {
        const endpoint = API_CONFIG.endpoints.authorsByBook(bookId);
        const response = await this.apiClient.get(endpoint);
        return {
            response,
            data: await response.json() as Author[],
        };
    }

    async createAuthor(authorData: CreateAuthorRequest) {
        const response = await this.apiClient.post(API_CONFIG.endpoints.authors, authorData);
        return {
            response,
            data: response.ok() ? await response.json() as Author : null,
        };
    }

    async updateAuthor(id: number, authorData: UpdateAuthorRequest) {
        const endpoint = API_CONFIG.endpoints.authorById(id);
        const response = await this.apiClient.put(endpoint, authorData);
        return {
            response,
            data: response.ok() ? await response.json() as Author : null,
        };
    }

    async deleteAuthor(id: number) {
        const endpoint = API_CONFIG.endpoints.authorById(id);
        const response = await this.apiClient.delete(endpoint);
        return { response };
    }
}