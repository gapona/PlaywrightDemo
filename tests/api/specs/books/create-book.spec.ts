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

        expect(data!.id).toEqual(expect.any(Number));
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

    test.describe('pageCount edge cases', () => {
        const cases = [
            { value: 0, description: 'zero page count' },
            { value: -1, description: 'negative page count' },
            { value: 500, description: 'specific page count' },
        ];

        for (const { value, description } of cases) {
            test(`accepts ${description}`, async () => {
                const payload = TestDataGenerator.generateCreateBookData({
                    pageCount: value,
                });

                const { data } = await bookService.createBook(payload);

                expect(data!.pageCount).toBe(value);
            });
        }

        test('handles max integer page count', async () => {
            const payload = TestDataGenerator.generateCreateBookData({
                pageCount: Number.MAX_SAFE_INTEGER,
            });

            const { response, data } = await bookService.createBook(payload);

            expect([200, 400, 500]).toContain(response.status());

            if (data !== null) {
                expect(data.pageCount).toBe(Number.MAX_SAFE_INTEGER);
            }
        });
    });

    test('preserves publish date value', async () => {
        const testDate = '2026-02-08T12:00:00.000Z';
        const payload = TestDataGenerator.generateCreateBookData({
            publishDate: testDate,
        });

        const { data } = await bookService.createBook(payload);

        expect(
            new Date(data!.publishDate).toISOString()
        ).toBe(
            new Date(testDate).toISOString()
        );
    });

    test.describe('invalid payload scenarios', () => {
        const cases = [
            {
                description: 'missing title',
                payload: {
                    description: 'Test',
                    pageCount: 100,
                    excerpt: 'Test',
                    publishDate: new Date().toISOString(),
                },
            },
            {
                description: 'empty request body',
                payload: {},
            },
        ];

        for (const { description, payload } of cases) {
            test(`handles ${description}`, async () => {
                const { response } =
                    await bookService.createBook(payload as any);

                expect([200, 400, 500]).toContain(response.status());
            });
        }
    });
});
