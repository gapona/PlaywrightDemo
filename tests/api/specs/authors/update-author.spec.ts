import { test, expect } from '@playwright/test';
import { AuthorService } from '../../services/author';
import { TestDataGenerator } from '../../utils/test-data.generator';
import { AssertionHelper } from '../../helpers/assertion';

test.describe('PUT /api/v1/Authors/{id}', () => {
    let authorService: AuthorService;
    const EXISTING_AUTHOR_ID = 5;

    test.beforeEach(async ({ request }) => {
        authorService = new AuthorService(request);
    });

    test('updates existing author with valid payload', async () => {
        const payload =
            TestDataGenerator.generateUpdateAuthorData(EXISTING_AUTHOR_ID);

        const { response, data } =
            await authorService.updateAuthor(EXISTING_AUTHOR_ID, payload);

        await AssertionHelper.assertStatusCode(response, 200);
        await AssertionHelper.assertContentType(response, 'application/json');

        AssertionHelper.assertAuthorStructure(data!);
        expect(data!.id).toBe(EXISTING_AUTHOR_ID);
    });

    test('updates author fields', async () => {
        const payload = {
            id: EXISTING_AUTHOR_ID,
            idBook: 10,
            firstName: 'UpdatedFirstName',
            lastName: 'UpdatedLastName',
        };

        const { data } =
            await authorService.updateAuthor(EXISTING_AUTHOR_ID, payload);

        AssertionHelper.assertAuthorData(data!, payload);
    });

    test('preserves author id on update', async () => {
        const payload =
            TestDataGenerator.generateUpdateAuthorData(EXISTING_AUTHOR_ID);

        const { data } =
            await authorService.updateAuthor(EXISTING_AUTHOR_ID, payload);

        expect(data!.id).toBe(EXISTING_AUTHOR_ID);
    });

    test('handles non-existent author id', async () => {
        const nonExistentId = 99999;
        const payload =
            TestDataGenerator.generateUpdateAuthorData(nonExistentId);

        const { response } =
            await authorService.updateAuthor(nonExistentId, payload);

        expect([200, 404]).toContain(response.status());
    });
});
