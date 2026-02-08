import { test, expect } from '@playwright/test';
import { AuthorService } from '../../services/author';
import { AssertionHelper } from '../../helpers/assertion';

test.describe('GET /api/v1/Authors/authors/books/{idBook}', () => {
    let authorService: AuthorService;
    const EXISTING_BOOK_ID = 1;

    test.beforeEach(async ({ request }) => {
        authorService = new AuthorService(request);
    });

    test('returns authors for given book id with valid structure', async () => {
        const { response, data } =
            await authorService.getAuthorsByBookId(EXISTING_BOOK_ID);

        await AssertionHelper.assertStatusCode(response, 200);
        await AssertionHelper.assertContentType(response, 'application/json');
        AssertionHelper.assertArrayNotEmpty(data);

        data.forEach(author => {
            AssertionHelper.assertAuthorStructure(author);
            expect(author.idBook).toBe(EXISTING_BOOK_ID);
        });
    });

    test('returns empty array for unknown book id', async () => {
        const unknownBookId = 99999;

        const { response, data } =
            await authorService.getAuthorsByBookId(unknownBookId);

        await AssertionHelper.assertStatusCode(response, 200);
        expect(Array.isArray(data)).toBeTruthy();
        expect(data.length).toBe(0);
    });
});
