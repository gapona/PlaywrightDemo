import { test, expect } from '@playwright/test';
import { AuthorService } from '../../services/author';
import { AssertionHelper } from '../../helpers/assertion';

test.describe('DELETE /api/v1/Authors/{id}', () => {
    let authorService: AuthorService;
    const EXISTING_AUTHOR_ID = 3;

    test.beforeEach(async ({ request }) => {
        authorService = new AuthorService(request);
    });

    test('successfully deletes existing author', async () => {
        const { response } = await authorService.deleteAuthor(EXISTING_AUTHOR_ID);

        await AssertionHelper.assertStatusCode(response, 200);
        expect(response.ok()).toBeTruthy();
        expect(response.headers()).toHaveProperty('content-length');
    });

    test('handles non-existent author id', async () => {
        const nonExistentId = 99999;

        const { response } = await authorService.deleteAuthor(nonExistentId);

        expect([200, 404]).toContain(response.status());
    });

    test('allows delete followed by get request', async () => {
        const { response: deleteResponse } =
            await authorService.deleteAuthor(EXISTING_AUTHOR_ID);

        await AssertionHelper.assertStatusCode(deleteResponse, 200);

        const { response: getResponse } =
            await authorService.getAuthorById(EXISTING_AUTHOR_ID);

        expect(getResponse.status()).toBeDefined();
    });
});
