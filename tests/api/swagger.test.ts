import { test, expect } from '@playwright/test';

const baseUrl = 'https://petstore.swagger.io/v2';
const headers = { 'Content-Type': 'application/json' };

const createPetPayload = (id: number) => ({
    id,
    category: { id: 0, name: 'dog' },
    name: 'TestPet',
    photoUrls: [],
    tags: [],
    status: 'available',
});

test('POST /pet creates a new pet', async ({ request }) => {
    const petId = Date.now();
    const payload = createPetPayload(petId);

    const response = await request.post(`${baseUrl}/pet`, {
        headers,
        data: payload,
    });

    console.log('Create status:', response.status());
    const body = await response.json();
    console.log('Created pet:', body);

    expect([200, 201]).toContain(response.status());
    expect(body).toMatchObject(payload);
});

test('GET /pet/{petId} returns valid pet', async ({ request }) => {
    const petId = 1;
    const response = await request.get(`${baseUrl}/pet/${petId}`);

    console.log(`GET /pet/${petId} status:`, response.status());
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('Full pet object:', body);

    expect(body).toHaveProperty('id', petId);
    expect(typeof body.name).toBe('string');
    expect(['available', 'pending', 'sold']).toContain(body.status);
});

test('PUT /pet updates an existing pet', async ({ request }) => {
    const payload = {
        id: 1,
        category: { id: 10, name: 'dog' },
        name: 'Updated Doggie',
        photoUrls: ['https://example.com/photo.jpg'],
        tags: [{ id: 101, name: 'cute' }],
        status: 'available',
    };

    const response = await request.put(`${baseUrl}/pet`, {
        headers,
        data: payload,
    });

    const body = await response.json();
    console.log('Update status:', response.status());
    console.log('Response body:', body);

    expect(response.status()).toBe(200);
    expect(body).toMatchObject(payload);
});

test('DELETE /pet/{petId} deletes existing pet', async ({ request }) => {
    const petId = Date.now();
    const payload = createPetPayload(petId);

    const createRes = await request.post(`${baseUrl}/pet`, {
        headers,
        data: payload,
    });

    console.log('Create status:', createRes.status());
    expect([200, 201]).toContain(createRes.status());

    await new Promise((res) => setTimeout(res, 5000)); // let it persist

    let deleteRes = await request.delete(`${baseUrl}/pet/${petId}`);
    console.log('Initial delete status:', deleteRes.status());

    if (deleteRes.status() === 404) {
        console.log('Got 404, retrying after 5s...');
        await new Promise((res) => setTimeout(res, 5000));
        deleteRes = await request.delete(`${baseUrl}/pet/${petId}`);
        console.log('Second delete status:', deleteRes.status());
    }

    expect([200, 204, 202]).toContain(deleteRes.status());
});
