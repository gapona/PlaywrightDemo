import { test, expect } from '@playwright/test';
import { AssertionHelper } from '../../helpers/assertion';
import { BookService } from '../../services/book';

test.describe('GET /api/v1/Books', () => {
    let bookService: BookService;

    test.beforeEach(async ({ request }) => {
        bookService = new BookService(request);
    });

    test('returns books list', async () => {
        const { response, data } = await bookService.getAllBooks();

        await AssertionHelper.assertStatusCode(response, 200);
        await AssertionHelper.assertContentType(response, 'application/json');
        AssertionHelper.assertArrayNotEmpty(data);
    });

    test('matches book contract', async () => {
        const { data } = await bookService.getAllBooks();

        data.forEach(book => {
            AssertionHelper.assertBookStructure(book);
        });
    });

    test('returns valid book field types', async () => {
        const { data } = await bookService.getAllBooks();

        const book = data[0];
        expect(typeof book.id).toBe('number');
        expect(typeof book.title).toBe('string');
        expect(typeof book.description).toBe('string');
        expect(typeof book.pageCount).toBe('number');
        expect(typeof book.excerpt).toBe('string');
        expect(typeof book.publishDate).toBe('string');
    });

    test('returns multiple books', async () => {
        const { data } = await bookService.getAllBooks();

        expect(data.length).toBeGreaterThan(1);
    });

    test('returns books with valid date format', async () => {
        const { data } = await bookService.getAllBooks();

        const book = data[0];
        const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
        expect(book.publishDate).toMatch(dateRegex);
    });
});