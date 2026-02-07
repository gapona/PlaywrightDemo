import { APIResponse, expect } from '@playwright/test';
import { Author } from '../models/author';
import { Book } from '../models/book';

export class AssertionHelper {
    static async assertStatusCode(response: APIResponse, expectedStatus: number) {
        expect(response.status()).toBe(expectedStatus);
    }

    static async assertResponseTime(response: APIResponse, maxTime: number = 3000) {
        const headers = response.headers();
    }

    static async assertContentType(response: APIResponse, expectedType: string) {
        const contentType = response.headers()['content-type'];
        expect(contentType).toContain(expectedType);
    }

    static assertAuthorStructure(author: Author) {
        expect(author).toHaveProperty('id');
        expect(author).toHaveProperty('idBook');
        expect(author).toHaveProperty('firstName');
        expect(author).toHaveProperty('lastName');

        expect(typeof author.id).toBe('number');
        expect(typeof author.idBook).toBe('number');
        expect(typeof author.firstName).toBe('string');
        expect(typeof author.lastName).toBe('string');
    }

    static assertAuthorData(actual: Author, expected: Partial<Author>) {
        if (expected.id !== undefined) expect(actual.id).toBe(expected.id);
        if (expected.idBook !== undefined) expect(actual.idBook).toBe(expected.idBook);
        if (expected.firstName !== undefined) expect(actual.firstName).toBe(expected.firstName);
        if (expected.lastName !== undefined) expect(actual.lastName).toBe(expected.lastName);
    }

    static assertBookStructure(book: Book) {
        expect(book).toHaveProperty('id');
        expect(book).toHaveProperty('title');
        expect(book).toHaveProperty('description');
        expect(book).toHaveProperty('pageCount');
        expect(book).toHaveProperty('excerpt');
        expect(book).toHaveProperty('publishDate');

        expect(typeof book.id).toBe('number');
        expect(typeof book.title).toBe('string');
        expect(typeof book.description).toBe('string');
        expect(typeof book.pageCount).toBe('number');
        expect(typeof book.excerpt).toBe('string');
        expect(typeof book.publishDate).toBe('string');
    }

    static assertBookData(actual: Book, expected: Partial<Book>) {
        if (expected.id !== undefined) {
            expect(actual.id).toBe(expected.id);
        }

        if (expected.title !== undefined) {
            expect(actual.title).toBe(expected.title);
        }

        if (expected.description !== undefined) {
            expect(actual.description).toBe(expected.description);
        }

        if (expected.pageCount !== undefined) {
            expect(actual.pageCount).toBe(expected.pageCount);
        }

        if (expected.excerpt !== undefined) {
            expect(actual.excerpt).toBe(expected.excerpt);
        }

        if (expected.publishDate !== undefined) {
            expect(new Date(actual.publishDate).getTime())
                .toBe(new Date(expected.publishDate).getTime());
        }
    }


    static assertArrayNotEmpty<T>(array: T[]) {
        expect(Array.isArray(array)).toBeTruthy();
        expect(array.length).toBeGreaterThan(0);
    }
}