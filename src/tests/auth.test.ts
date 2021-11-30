import express from 'express';
import chai, { expect } from 'chai';
import request from 'supertest';

import {startServer} from '../server';

process.env.NODE_ENV='test';
const app = startServer();

describe('User Auth Tests', async () => {

    const user = {
        email: 'dummy@email.test',
        name: 'you got tested',
        password: 'chamber_of_secrets',
    }

    it('It should signup new user', async () => {

        await request(app)
        .post('/api/user/signup')
        .send(user)
        .expect(202)
        .then(res => {
            expect(res.body.message).equal("User asdasdadasdadasdasdas asdasd successfully!");
        });
    });
});