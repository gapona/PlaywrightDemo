import { test, expect } from '@playwright/test';
import { AssertionHelper } from '../../helpers/assertion';
import { AuthorService } from '../../services/author';

test.describe('GET /api/v1/Authors', () => {
    let authorService: AuthorService;

    test.beforeEach(async ({ request }) => {
        authorService = new AuthorService(request);
    });

    test('returns non-empty authors list with valid structure', async () => {
        const { response, data } = await authorService.getAllAuthors();

        await AssertionHelper.assertStatusCode(response, 200);
        await AssertionHelper.assertContentType(response, 'application/json');
        AssertionHelper.assertArrayNotEmpty(data);

        data.forEach(author => {
            AssertionHelper.assertAuthorStructure(author);
        });
    });

    test('returns authors with valid field types', async () => {
        const { data } = await authorService.getAllAuthors();

        const author = data[0];

        expect(author.id).toEqual(expect.any(Number));
        expect(author.idBook).toEqual(expect.any(Number));
        expect(author.firstName).toEqual(expect.any(String));
        expect(author.lastName).toEqual(expect.any(String));
    });
});
