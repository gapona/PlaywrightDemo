import { test, expect } from '@playwright/test';
import { AssertionHelper } from '../../helpers/assertion';
import { AuthorService } from '../../services/author';

test.describe('GET /api/v1/Authors', () => {
    let authorService: AuthorService;

    test.beforeEach(async ({ request }) => {
        authorService = new AuthorService(request);
    });

    test('returns authors list', async () => {
        const { response, data } = await authorService.getAllAuthors();

        await AssertionHelper.assertStatusCode(response, 200);
        await AssertionHelper.assertContentType(response, 'application/json');
        AssertionHelper.assertArrayNotEmpty(data);
    });

    test('matches author contract', async () => {
        const { data } = await authorService.getAllAuthors();

        data.forEach(author => {
            AssertionHelper.assertAuthorStructure(author);
        });
    });

    test('returns valid author field types', async () => {
        const { data } = await authorService.getAllAuthors();

        const author = data[0];
        expect(typeof author.id).toBe('number');
        expect(typeof author.idBook).toBe('number');
        expect(typeof author.firstName).toBe('string');
        expect(typeof author.lastName).toBe('string');
    });

    test('returns multiple authors', async () => {
        const { data } = await authorService.getAllAuthors();

        expect(data.length).toBeGreaterThan(1);
    });
});
