import { test, expect } from '@playwright/test';
import { BookService } from '../../services/book';
import { AssertionHelper } from '../../helpers/assertion';

test.describe('DELETE /api/v1/Books/{id}', () => {
    let bookService: BookService;
    const EXISTING_BOOK_ID = 1;
    const NON_EXISTENT_BOOK_ID = 99999;

    test.beforeEach(async ({ request }) => {
        bookService = new BookService(request);
    });

    test('successfully deletes existing book', async () => {
        const { response } =
            await bookService.deleteBook(EXISTING_BOOK_ID);

        await AssertionHelper.assertStatusCode(response, 200);
        expect(response.ok()).toBeTruthy();
        expect(response.headers()).toHaveProperty('content-length');
    });

    test('allows delete followed by get request', async () => {
        const { response: deleteResponse } =
            await bookService.deleteBook(EXISTING_BOOK_ID);

        await AssertionHelper.assertStatusCode(deleteResponse, 200);

        const { response: getResponse } =
            await bookService.getBookById(EXISTING_BOOK_ID);

        expect([200, 404]).toContain(getResponse.status());
    });

    test('handles non-existent book id', async () => {
        const { response } =
            await bookService.deleteBook(NON_EXISTENT_BOOK_ID);

        expect([200, 404]).toContain(response.status());
    });

    test.describe('invalid id values', () => {
        const cases = [
            { id: 0, description: 'zero id' },
            { id: -1, description: 'negative id' },
        ];

        for (const { id, description } of cases) {
            test(`handles ${description}`, async () => {
                const { response } =
                    await bookService.deleteBook(id);

                expect([200, 400, 404]).toContain(response.status());
            });
        }
    });
});
