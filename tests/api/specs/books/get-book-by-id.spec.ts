import { test, expect } from '@playwright/test';
import { AssertionHelper } from '../../helpers/assertion';
import { BookService } from '../../services/book';

test.describe('GET /api/v1/Books/{id}', () => {
    let bookService: BookService;
    const EXISTING_BOOK_ID = 1;

    test.beforeEach(async ({ request }) => {
        bookService = new BookService(request);
    });

    test('returns book by valid id', async () => {
        const { response, data } =
            await bookService.getBookById(EXISTING_BOOK_ID);

        await AssertionHelper.assertStatusCode(response, 200);
        await AssertionHelper.assertContentType(response, 'application/json');

        AssertionHelper.assertBookStructure(data!);
        expect(data!.id).toBe(EXISTING_BOOK_ID);
    });

    test('returns book with valid publishDate format', async () => {
        const { data } =
            await bookService.getBookById(EXISTING_BOOK_ID);

        const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
        expect(data!.publishDate).toMatch(isoDateRegex);
    });

    test('handles non-existent book id', async () => {
        const nonExistentId = 99999;

        const { response } =
            await bookService.getBookById(nonExistentId);

        expect([200, 404]).toContain(response.status());
    });

    test('handles zero book id', async () => {
        const { response } =
            await bookService.getBookById(0);

        expect([200, 400, 404]).toContain(response.status());
    });

    test('handles negative book id', async () => {
        const { response } =
            await bookService.getBookById(-1);

        expect([200, 400, 404]).toContain(response.status());
    });
});
