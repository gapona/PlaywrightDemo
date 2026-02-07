import { CreateAuthorRequest, UpdateAuthorRequest } from '../models/author';
import { CreateBookRequest, UpdateBookRequest } from '../models/book';

export class TestDataGenerator {
    static generateRandomString(length: number = 10): string {
        return Math.random().toString(36).substring(2, length + 2);
    }

    static generateRandomNumber(min: number = 1, max: number = 1000): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static generateCreateAuthorData(overrides?: Partial<CreateAuthorRequest>): CreateAuthorRequest {
        return {
            idBook: this.generateRandomNumber(1, 100),
            firstName: `FirstName_${this.generateRandomString(5)}`,
            lastName: `LastName_${this.generateRandomString(5)}`,
            ...overrides,
        };
    }

    static generateUpdateAuthorData(id: number, overrides?: Partial<UpdateAuthorRequest>): UpdateAuthorRequest {
        return {
            id,
            idBook: this.generateRandomNumber(1, 100),
            firstName: `UpdatedFirst_${this.generateRandomString(5)}`,
            lastName: `UpdatedLast_${this.generateRandomString(5)}`,
            ...overrides,
        };
    }

    static generateAuthorDataWithSpecificValues(
        idBook: number,
        firstName: string,
        lastName: string
    ): CreateAuthorRequest {
        return {
            idBook,
            firstName,
            lastName,
        };
    }

    static generateCreateBookData(overrides?: Partial<CreateBookRequest>): CreateBookRequest {
        return {
            title: `Title_${this.generateRandomString(8)}`,
            description: `Description_${this.generateRandomString(15)}`,
            pageCount: this.generateRandomNumber(50, 500),
            excerpt: `Excerpt_${this.generateRandomString(10)}`,
            publishDate: new Date().toISOString(),
            ...overrides,
        };
    }

    static generateUpdateBookData(id: number, overrides?: Partial<UpdateBookRequest>): UpdateBookRequest {
        return {
            id,
            title: `UpdatedTitle_${this.generateRandomString(8)}`,
            description: `UpdatedDescription_${this.generateRandomString(15)}`,
            pageCount: this.generateRandomNumber(50, 500),
            excerpt: `UpdatedExcerpt_${this.generateRandomString(10)}`,
            publishDate: new Date().toISOString(),
            ...overrides,
        };
    }

    static generateBookDataWithSpecificValues(
        title: string,
        description: string,
        pageCount: number
    ): CreateBookRequest {
        return {
            title,
            description,
            pageCount,
            excerpt: 'string',
            publishDate: new Date().toISOString(),
        };
    }
}