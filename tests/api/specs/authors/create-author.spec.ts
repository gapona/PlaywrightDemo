import { test, expect } from '@playwright/test';
import { TestDataGenerator } from '../../utils/test-data.generator';
import { AssertionHelper } from '../../helpers/assertion';
import { AuthorService } from '../../services/author';

test.describe('POST /api/v1/Authors', () => {
    let authorService: AuthorService;

    test.beforeEach(async ({ request }) => {
        authorService = new AuthorService(request);
    });

    test('creates author with valid payload', async () => {
        const payload = TestDataGenerator.generateCreateAuthorData();

        const { response, data } = await authorService.createAuthor(payload);

        await AssertionHelper.assertStatusCode(response, 200);
        await AssertionHelper.assertContentType(response, 'application/json');

        AssertionHelper.assertAuthorStructure(data!);
        AssertionHelper.assertAuthorData(data!, payload);
    });

    test('assigns author id automatically', async () => {
        const payload = TestDataGenerator.generateCreateAuthorData();

        const { data } = await authorService.createAuthor(payload);

        expect(data!.id).toBeDefined();
        expect(typeof data!.id).toBe('number');
    });

    test('preserves first and last name', async () => {
        const payload = TestDataGenerator.generateAuthorDataWithSpecificValues(
            1,
            'John',
            'Doe'
        );

        const { data } = await authorService.createAuthor(payload);

        expect(data!.firstName).toBe('John');
        expect(data!.lastName).toBe('Doe');
    });

    test.describe('idBook edge cases', () => {
        const cases = [
            { value: 5, description: 'explicit book id' },
            { value: 0, description: 'zero book id' },
            { value: -1, description: 'negative book id' },
        ];

        for (const { value, description } of cases) {
            test(`accepts ${description}`, async () => {
                const payload = TestDataGenerator.generateCreateAuthorData({
                    idBook: value,
                });

                const { data } = await authorService.createAuthor(payload);

                expect(data!.idBook).toBe(value);
            });
        }

        test('handles max integer book id', async () => {
            const payload = TestDataGenerator.generateCreateAuthorData({
                idBook: Number.MAX_SAFE_INTEGER,
            });

            const { response, data } = await authorService.createAuthor(payload);

          expect([200, 400, 500]).toContain(response.status());

            if (data !== null) {
                expect(data.idBook).toBe(Number.MAX_SAFE_INTEGER);
            }
        });
    });

    test.describe('invalid payload scenarios', () => {
        const cases = [
            {
                description: 'missing first name',
                payload: { idBook: 1, lastName: 'Doe' },
            },
            {
                description: 'missing last name',
                payload: { idBook: 1, firstName: 'John' },
            },
            {
                description: 'empty request body',
                payload: {},
            },
        ];

        for (const { description, payload } of cases) {
            test(`handles ${description}`, async () => {
                const { response } = await authorService.createAuthor(payload as any);

                await AssertionHelper.assertStatusCode(response, 200);
            });
        }
    });
});
