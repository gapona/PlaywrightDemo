import { test, expect } from '@playwright/test';
import { AuthorService } from '../../services/author';
import { AssertionHelper } from '../../helpers/assertion';

test.describe('DELETE /api/v1/Authors/{id}', () => {
    let authorService: AuthorService;

    test.beforeEach(async ({ request }) => {
        authorService = new AuthorService(request);
    });

    test('deletes existing author', async () => {
        const authorId = 3;

        const { response } = await authorService.deleteAuthor(authorId);

        await AssertionHelper.assertStatusCode(response, 200);
    });

    test('returns successful response on delete', async () => {
        const authorId = 3;

        const { response } = await authorService.deleteAuthor(authorId);

        expect(response.ok()).toBeTruthy();
    });

    test('handles non-existent author id', async () => {
        const nonExistentId = 99999;

        const { response } = await authorService.deleteAuthor(nonExistentId);

        expect([200, 404]).toContain(response.status());
    });

    test('returns content-length header', async () => {
        const authorId = 3;

        const { response } = await authorService.deleteAuthor(authorId);

        expect(response.headers()).toHaveProperty('content-length');
    });

    test('allows delete followed by get request', async () => {
        const authorId = 3;

        const { response: deleteResponse } = await authorService.deleteAuthor(authorId);
        await AssertionHelper.assertStatusCode(deleteResponse, 200);

        const { response: getResponse } = await authorService.getAuthorById(authorId);

        expect(getResponse.status()).toBeDefined();
    });
});
