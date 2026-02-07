import { test, expect } from '@playwright/test';
import { AuthorService } from '../../services/author';
import { TestDataGenerator } from '../../utils/test-data.generator';
import { AssertionHelper } from '../../helpers/assertion';

test.describe('PUT /api/v1/Authors/{id}', () => {
    let authorService: AuthorService;

    test.beforeEach(async ({ request }) => {
        authorService = new AuthorService(request);
    });

    test('updates existing author', async () => {
        const authorId = 5;
        const payload = TestDataGenerator.generateUpdateAuthorData(authorId);

        const { response, data } = await authorService.updateAuthor(authorId, payload);

        await AssertionHelper.assertStatusCode(response, 200);
        await AssertionHelper.assertContentType(response, 'application/json');

        AssertionHelper.assertAuthorStructure(data!);
        expect(data!.id).toBe(authorId);
    });

    test('updates first and last name', async () => {
        const authorId = 5;
        const payload = TestDataGenerator.generateUpdateAuthorData(authorId, {
            firstName: 'UpdatedFirstName',
            lastName: 'UpdatedLastName',
        });

        const { data } = await authorService.updateAuthor(authorId, payload);

        expect(data!.firstName).toBe('UpdatedFirstName');
        expect(data!.lastName).toBe('UpdatedLastName');
    });

    test('updates book association', async () => {
        const authorId = 5;
        const payload = TestDataGenerator.generateUpdateAuthorData(authorId, {
            idBook: 10,
        });

        const { data } = await authorService.updateAuthor(authorId, payload);

        expect(data!.idBook).toBe(10);
    });

    test('preserves author id', async () => {
        const authorId = 5;
        const payload = TestDataGenerator.generateUpdateAuthorData(authorId);

        const { data } = await authorService.updateAuthor(authorId, payload);

        expect(data!.id).toBe(authorId);
    });

    test('updates all author fields', async () => {
        const authorId = 5;
        const payload = {
            id: authorId,
            idBook: 20,
            firstName: 'CompletelyNew',
            lastName: 'FullyUpdated',
        };

        const { data } = await authorService.updateAuthor(authorId, payload);

        AssertionHelper.assertAuthorData(data!, payload);
    });

    test('handles non-existent author id', async () => {
        const nonExistentId = 99999;
        const payload = TestDataGenerator.generateUpdateAuthorData(nonExistentId);

        const { response } = await authorService.updateAuthor(nonExistentId, payload);

        expect([200, 404]).toContain(response.status());
    });
});
