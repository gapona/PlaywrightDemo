import { test, expect } from '@playwright/test';
import { AssertionHelper } from '../../helpers/assertion';
import { BookService } from '../../services/book';

test.describe('GET /api/v1/Books/{id}', () => {
    let bookService: BookService;

    test.beforeEach(async ({ request }) => {
        bookService = new BookService(request);
    });

    test('returns book by valid id', async () => {
        const bookId = 1;

        const { response, data } = await bookService.getBookById(bookId);

        await AssertionHelper.assertStatusCode(response, 200);
        await AssertionHelper.assertContentType(response, 'application/json');

        AssertionHelper.assertBookStructure(data!);
        expect(data!.id).toBe(bookId);
    });

    test('matches book contract', async () => {
        const { data } = await bookService.getBookById(1);

        AssertionHelper.assertBookStructure(data!);
    });

    test('returns valid book field types', async () => {
        const { data } = await bookService.getBookById(1);

        expect(typeof data!.id).toBe('number');
        expect(typeof data!.title).toBe('string');
        expect(typeof data!.description).toBe('string');
        expect(typeof data!.pageCount).toBe('number');
        expect(typeof data!.excerpt).toBe('string');
        expect(typeof data!.publishDate).toBe('string');
    });

    test('returns book with valid date format', async () => {
        const { data } = await bookService.getBookById(1);

        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
        expect(data!.publishDate).toMatch(dateRegex);
    });

    test('handles non-existent book id', async () => {
        const nonExistentId = 99999;

        const { response } = await bookService.getBookById(nonExistentId);

        expect([200, 404]).toContain(response.status());
    });

    test('handles zero book id', async () => {
        const { response } = await bookService.getBookById(0);

        expect([200, 400, 404]).toContain(response.status());
    });

    test('handles negative book id', async () => {
        const { response } = await bookService.getBookById(-1);

        expect([200, 400, 404]).toContain(response.status());
    });
});