import {test, expect} from '@playwright/test';

test('POST /pet creates a new pet', async ({request}) => {
    const newPet = {
        id: Date.now(),
        category: {
            id: 0,
            name: 'dog',
        },
        name: 'TestPet',
        photoUrls: [],
        tags: [],
        status: 'available',
    };

    const response = await request.post('https://petstore.swagger.io/v2/pet', {
        headers: {
            'Content-Type': 'application/json',
        },
        data: newPet,
    });

    const status = response.status();
    console.log('Create status:', status);

    const body = await response.json();
    console.log('Created pet:', body);

    expect([200, 201]).toContain(status);
    expect(body).toHaveProperty('id', newPet.id);
    expect(body).toHaveProperty('name', newPet.name);
    expect(body).toHaveProperty('status', newPet.status);
});


test('GET /pet/{petId} returns valid pet', async ({request}) => {
    const petId = 1;

    const start = Date.now();
    const response = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);
    const duration = Date.now() - start;

    console.log(`GET /pet/${petId} responded in ${duration}ms`);
    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log('Full pet object:', body);

    expect(body).toHaveProperty('id', petId);
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('status');

    expect(typeof body.name).toBe('string');
    expect(typeof body.id).toBe('number');

    console.log('Pet status:', body.status);
    expect(['available', 'pending', 'sold']).toContain(body.status);
});


test('PUT /pet updates an existing pet', async ({request}) => {
    const petPayload = {
        id: 1,
        category: {
            id: 10,
            name: 'dog',
        },
        name: 'Updated Doggie',
        photoUrls: ['https://example.com/photo.jpg'],
        tags: [
            {
                id: 101,
                name: 'cute',
            },
        ],
        status: 'available',
    };

    const response = await request.put('https://petstore.swagger.io/v2/pet', {
        headers: {
            'Content-Type': 'application/json',
        },
        data: petPayload,
    });

    const body = await response.json();

    console.log('Response status:', response.status());
    console.log('Response body:', body);

    expect(response.status()).toBe(200);
    expect(body.id).toBe(petPayload.id);
    expect(body.name).toBe(petPayload.name);
    expect(body.status).toBe(petPayload.status);
});

test('DELETE /pet/{petId} deletes existing pet', async ({request}) => {
    const petId = Date.now();

    const createRes = await request.post('https://petstore.swagger.io/v2/pet', {
        headers: {'Content-Type': 'application/json'},
        data: {
            id: petId,
            name: 'TempPet',
            photoUrls: [],
            status: 'available',
        },
    });

    console.log('Create status:', createRes.status());
    expect([200, 201]).toContain(createRes.status());

    await new Promise((res) => setTimeout(res, 5000));

    let deleteRes = await request.delete(`https://petstore.swagger.io/v2/pet/${petId}`);
    console.log('Initial delete status:', deleteRes.status());

    if (deleteRes.status() === 404) {
        console.log('Got 404 on first delete, waiting 5 more seconds...');
        await new Promise((res) => setTimeout(res, 5000));

        deleteRes = await request.delete(`https://petstore.swagger.io/v2/pet/${petId}`);
        console.log('Second delete status:', deleteRes.status());
    }

    expect([200, 204, 202]).toContain(deleteRes.status());
});






