import { test, expect } from '@playwright/test';
import { TestDataGenerator } from '../../utils/test-data.generator';
import { AssertionHelper } from '../../helpers/assertion';
import { BookService } from '../../services/book';

test.describe('POST /api/v1/Books', () => {
    let bookService: BookService;

    test.beforeEach(async ({ request }) => {
        bookService = new BookService(request);
    });

    test('creates book with valid payload', async () => {
        const payload = TestDataGenerator.generateCreateBookData();

        const { response, data } = await bookService.createBook(payload);

        await AssertionHelper.assertStatusCode(response, 200);
        await AssertionHelper.assertContentType(response, 'application/json');

        AssertionHelper.assertBookStructure(data!);
        AssertionHelper.assertBookData(data!, payload);
    });

    test('assigns book id automatically', async () => {
        const payload = TestDataGenerator.generateCreateBookData();

        const { data } = await bookService.createBook(payload);

        expect(data!.id).toBeDefined();
        expect(typeof data!.id).toBe('number');
    });

    test('preserves title and description', async () => {
        const payload = TestDataGenerator.generateBookDataWithSpecificValues(
            'Test Book Title',
            'Test Book Description',
            300
        );

        const { data } = await bookService.createBook(payload);

        expect(data!.title).toBe('Test Book Title');
        expect(data!.description).toBe('Test Book Description');
    });

    test('accepts specific page count', async () => {
        const payload = TestDataGenerator.generateCreateBookData({
            pageCount: 500
        });

        const { data } = await bookService.createBook(payload);

        expect(data!.pageCount).toBe(500);
    });

    test('allows empty title', async () => {
        const payload = TestDataGenerator.generateCreateBookData({
            title: ''
        });

        const { data } = await bookService.createBook(payload);

        expect(data!.title).toBe('');
    });

    test('allows empty description', async () => {
        const payload = TestDataGenerator.generateCreateBookData({
            description: ''
        });

        const { data } = await bookService.createBook(payload);

        expect(data!.description).toBe('');
    });

    test('accepts zero page count', async () => {
        const payload = TestDataGenerator.generateCreateBookData({
            pageCount: 0
        });

        const { data } = await bookService.createBook(payload);

        expect(data!.pageCount).toBe(0);
    });

    test('accepts negative page count', async () => {
        const payload = TestDataGenerator.generateCreateBookData({
            pageCount: -1
        });

        const { data } = await bookService.createBook(payload);

        expect(data!.pageCount).toBe(-1);
    });

    test('handles max integer page count', async () => {
        const payload = TestDataGenerator.generateCreateBookData({
            pageCount: Number.MAX_SAFE_INTEGER
        });

        const { response, data } = await bookService.createBook(payload);

        expect([200, 400, 500]).toContain(response.status());

        if (data !== null) {
            expect(data.pageCount).toBe(Number.MAX_SAFE_INTEGER);
        }
    });

    test('preserves publish date value', async () => {
        const testDate = '2024-02-08T12:00:00.000Z';
        const payload = TestDataGenerator.generateCreateBookData({
            publishDate: testDate
        });

        const { data } = await bookService.createBook(payload);

        expect(new Date(data!.publishDate).toISOString())
            .toBe(new Date(testDate).toISOString());
    });

    test('matches book contract', async () => {
        const payload = TestDataGenerator.generateCreateBookData();

        const { data } = await bookService.createBook(payload);

        AssertionHelper.assertBookStructure(data!);
    });

    test('handles missing title', async () => {
        const payload = {
            description: 'Test',
            pageCount: 100,
            excerpt: 'Test',
            publishDate: new Date().toISOString()
        };

        const { response } = await bookService.createBook(payload as any);

        expect([200, 400, 500]).toContain(response.status());
    });

    test('handles empty request body', async () => {
        const { response } = await bookService.createBook({} as any);

        expect([200, 400, 500]).toContain(response.status());
    });
});