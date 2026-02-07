import { test, expect } from '@playwright/test';
import { AssertionHelper } from '../../helpers/assertion';
import { AuthorService } from '../../services/author';

test.describe('GET /api/v1/Authors/{id}', () => {
    let authorService: AuthorService;

    test.beforeEach(async ({ request }) => {
        authorService = new AuthorService(request);
    });

    test('returns author by valid id', async () => {
        const authorId = 2;

        const { response, data } = await authorService.getAuthorById(authorId);

        await AssertionHelper.assertStatusCode(response, 200);
        await AssertionHelper.assertContentType(response, 'application/json');

        AssertionHelper.assertAuthorStructure(data!);
        expect(data!.id).toBe(authorId);
    });

    test('matches author contract', async () => {
        const { data } = await authorService.getAuthorById(1);

        AssertionHelper.assertAuthorStructure(data!);
    });

    test('returns valid author field types', async () => {
        const { data } = await authorService.getAuthorById(1);

        expect(typeof data!.id).toBe('number');
        expect(typeof data!.idBook).toBe('number');
        expect(typeof data!.firstName).toBe('string');
        expect(typeof data!.lastName).toBe('string');
    });

    test('handles non-existent author id', async () => {
        const nonExistentId = 99999;

        const { response } = await authorService.getAuthorById(nonExistentId);

        expect([200, 404]).toContain(response.status());
    });
});
