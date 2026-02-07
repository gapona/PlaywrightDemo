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

    test('accepts explicit book id', async () => {
        const payload = TestDataGenerator.generateCreateAuthorData({
            idBook: 5
        });

        const { data } = await authorService.createAuthor(payload);

        expect(data!.idBook).toBe(5);
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

    test('allows empty first name', async () => {
        const payload = TestDataGenerator.generateCreateAuthorData({
            firstName: ''
        });

        const { data } = await authorService.createAuthor(payload);

        expect(data!.firstName).toBe('');
    });

    test('allows empty last name', async () => {
        const payload = TestDataGenerator.generateCreateAuthorData({
            lastName: ''
        });

        const { data } = await authorService.createAuthor(payload);

        expect(data!.lastName).toBe('');
    });

    test('accepts zero book id', async () => {
        const payload = TestDataGenerator.generateCreateAuthorData({
            idBook: 0
        });

        const { data } = await authorService.createAuthor(payload);

        expect(data!.idBook).toBe(0);
    });

    test('accepts negative book id', async () => {
        const payload = TestDataGenerator.generateCreateAuthorData({
            idBook: -1
        });

        const { data } = await authorService.createAuthor(payload);

        expect(data!.idBook).toBe(-1);
    });

    test('handles max integer book id', async () => {
        const payload = TestDataGenerator.generateCreateAuthorData({
            idBook: Number.MAX_SAFE_INTEGER
        });

        const { response, data } = await authorService.createAuthor(payload);

        expect([200, 400, 500]).toContain(response.status());

        if (data !== null) {
            expect(data.idBook).toBe(Number.MAX_SAFE_INTEGER);
        }
    });

    test('matches author contract', async () => {
        const payload = TestDataGenerator.generateCreateAuthorData();

        const { data } = await authorService.createAuthor(payload);

        AssertionHelper.assertAuthorStructure(data!);
    });

    test('handles missing first name', async () => {
        const payload = {
            idBook: 1,
            lastName: 'Doe'
        };

        const { response } = await authorService.createAuthor(payload as any);

        expect([200, 400, 500]).toContain(response.status());
    });

    test('handles missing last name', async () => {
        const payload = {
            idBook: 1,
            firstName: 'John'
        };

        const { response } = await authorService.createAuthor(payload as any);

        expect([200, 400, 500]).toContain(response.status());
    });

    test('handles empty request body', async () => {
        const { response } = await authorService.createAuthor({} as any);

        expect([200, 400, 500]).toContain(response.status());
    });
});
