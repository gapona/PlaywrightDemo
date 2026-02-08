import { test, expect } from '@playwright/test';
import { AssertionHelper } from '../../helpers/assertion';
import { BookService } from '../../services/book';

test.describe('GET /api/v1/Books', () => {
    let bookService: BookService;

    test.beforeEach(async ({ request }) => {
        bookService = new BookService(request);
    });

    test('returns non-empty books list', async () => {
        const { response, data } = await bookService.getAllBooks();

        await AssertionHelper.assertStatusCode(response, 200);
        await AssertionHelper.assertContentType(response, 'application/json');
        AssertionHelper.assertArrayNotEmpty(data);
    });

    test('each book matches contract', async () => {
        const { data } = await bookService.getAllBooks();

        for (const book of data) {
            AssertionHelper.assertBookStructure(book);
        }
    });

    test('returns more than one book', async () => {
        const { data } = await bookService.getAllBooks();

        expect(data.length).toBeGreaterThan(1);
    });

    test('publishDate has valid ISO format', async () => {
        const { data } = await bookService.getAllBooks();

        const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

        for (const book of data) {
            expect(book.publishDate).toMatch(isoDateRegex);
        }
    });
});
