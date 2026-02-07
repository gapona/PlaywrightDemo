export const API_CONFIG = {
    baseUrl: 'https://fakerestapi.azurewebsites.net',
    endpoints: {
        authors: '/api/v1/Authors',
        authorById: (id: number) => `/api/v1/Authors/${id}`,
        authorsByBook: (bookId: number) => `/api/v1/Authors/authors/books/${bookId}`,
        books: '/api/v1/Books',
        bookById: (id: number) => `/api/v1/Books/${id}`,
    },
    headers: {
        contentType: 'application/json',
        accept: 'text/plain',
    },
    timeout: 30000,
} as const;