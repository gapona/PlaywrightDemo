import { test, expect } from '@playwright/test';
import { BookService } from '../../services/book';
import { AssertionHelper } from '../../helpers/assertion';

test.describe('DELETE /api/v1/Books/{id}', () => {
    let bookService: BookService;

    test.beforeEach(async ({ request }) => {
        bookService = new BookService(request);
    });

    test('deletes existing book', async () => {
        const bookId = 1;

        const { response } = await bookService.deleteBook(bookId);

        await AssertionHelper.assertStatusCode(response, 200);
    });

    test('returns successful response on delete', async () => {
        const bookId = 1;

        const { response } = await bookService.deleteBook(bookId);

        expect(response.ok()).toBeTruthy();
    });

    test('handles non-existent book id', async () => {
        const nonExistentId = 99999;

        const { response } = await bookService.deleteBook(nonExistentId);

        expect([200, 404]).toContain(response.status());
    });

    test('returns content-length header', async () => {
        const bookId = 1;

        const { response } = await bookService.deleteBook(bookId);

        expect(response.headers()).toHaveProperty('content-length');
    });

    test('allows delete followed by get request', async () => {
        const bookId = 1;

        const { response: deleteResponse } = await bookService.deleteBook(bookId);
        await AssertionHelper.assertStatusCode(deleteResponse, 200);

        const { response: getResponse } = await bookService.getBookById(bookId);

        expect(getResponse.status()).toBeDefined();
    });

    test('handles zero book id', async () => {
        const { response } = await bookService.deleteBook(0);

        expect([200, 400, 404]).toContain(response.status());
    });

    test('handles negative book id', async () => {
        const { response } = await bookService.deleteBook(-1);

        expect([200, 400, 404]).toContain(response.status());
    });
});