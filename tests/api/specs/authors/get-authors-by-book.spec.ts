import { test, expect } from '@playwright/test';
import { AuthorService } from '../../services/author';
import { AssertionHelper } from '../../helpers/assertion';

test.describe('GET /api/v1/Authors/authors/books/{idBook}', () => {
    let authorService: AuthorService;

    test.beforeEach(async ({ request }) => {
        authorService = new AuthorService(request);
    });

    test('returns authors by book id', async () => {
        const bookId = 1;

        const { response, data } = await authorService.getAuthorsByBookId(bookId);

        await AssertionHelper.assertStatusCode(response, 200);
        await AssertionHelper.assertContentType(response, 'application/json');
        AssertionHelper.assertArrayNotEmpty(data);
    });

    test('associates authors with requested book id', async () => {
        const bookId = 1;

        const { data } = await authorService.getAuthorsByBookId(bookId);

        data.forEach(author => {
            expect(author.idBook).toBe(bookId);
        });
    });

    test('matches author contract', async () => {
        const { data } = await authorService.getAuthorsByBookId(1);

        data.forEach(author => {
            AssertionHelper.assertAuthorStructure(author);
        });
    });

    test('returns multiple authors', async () => {
        const { data } = await authorService.getAuthorsByBookId(1);

        expect(data.length).toBeGreaterThanOrEqual(1);
    });

    test('returns empty array for unknown book id', async () => {
        const unknownBookId = 99999;

        const { response, data } = await authorService.getAuthorsByBookId(unknownBookId);

        await AssertionHelper.assertStatusCode(response, 200);
        expect(Array.isArray(data)).toBeTruthy();
        expect(data.length).toBe(0);
    });
});
