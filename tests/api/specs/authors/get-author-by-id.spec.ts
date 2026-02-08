import { test, expect } from '@playwright/test';
import { AssertionHelper } from '../../helpers/assertion';
import { AuthorService } from '../../services/author';

test.describe('GET /api/v1/Authors/{id}', () => {
    let authorService: AuthorService;
    const EXISTING_AUTHOR_ID = 2;

    test.beforeEach(async ({ request }) => {
        authorService = new AuthorService(request);
    });

    test('returns author by valid id with correct structure', async () => {
        const { response, data } =
            await authorService.getAuthorById(EXISTING_AUTHOR_ID);

        await AssertionHelper.assertStatusCode(response, 200);
        await AssertionHelper.assertContentType(response, 'application/json');

        AssertionHelper.assertAuthorStructure(data!);
        expect(data!.id).toBe(EXISTING_AUTHOR_ID);
    });

    test('returns author with valid field types', async () => {
        const { data } =
            await authorService.getAuthorById(EXISTING_AUTHOR_ID);

        expect(data!.id).toEqual(expect.any(Number));
        expect(data!.idBook).toEqual(expect.any(Number));
        expect(data!.firstName).toEqual(expect.any(String));
        expect(data!.lastName).toEqual(expect.any(String));
    });

    test('handles non-existent author id', async () => {
        const nonExistentId = 99999;

        const { response } =
            await authorService.getAuthorById(nonExistentId);

        expect([200, 404]).toContain(response.status());
    });
});
