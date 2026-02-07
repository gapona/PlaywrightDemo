import { APIRequestContext } from '@playwright/test';
import { API_CONFIG } from '../config/api.config';

export class ApiClient {
    constructor(private request: APIRequestContext) {}

    async get(endpoint: string, headers?: Record<string, string>) {
        return await this.request.get(`${API_CONFIG.baseUrl}${endpoint}`, {
            headers: {
                Accept: API_CONFIG.headers.accept,
                ...headers,
            },
        });
    }

    async post(endpoint: string, data: unknown, headers?: Record<string, string>) {
        return await this.request.post(`${API_CONFIG.baseUrl}${endpoint}`, {
            headers: {
                'Content-Type': API_CONFIG.headers.contentType,
                Accept: API_CONFIG.headers.accept,
                ...headers,
            },
            data,
        });
    }

    async put(endpoint: string, data: unknown, headers?: Record<string, string>) {
        return await this.request.put(`${API_CONFIG.baseUrl}${endpoint}`, {
            headers: {
                'Content-Type': API_CONFIG.headers.contentType,
                Accept: API_CONFIG.headers.accept,
                ...headers,
            },
            data,
        });
    }

    async delete(endpoint: string, headers?: Record<string, string>) {
        return await this.request.delete(`${API_CONFIG.baseUrl}${endpoint}`, {
            headers: {
                Accept: '*/*',
                ...headers,
            },
        });
    }
}