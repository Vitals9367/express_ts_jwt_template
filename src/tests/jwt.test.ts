import express from 'express';
import chai, { expect } from 'chai';
import request from 'supertest';

import app from './helper.test';
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from '../services/jwtService';

const agent = request.agent(app);

describe('Access token tests', async () => {
    let access_token = '';

    const user = {
        email: 'dummy@email.test',
        name: 'you got tested',
        password: 'chamber_of_secrets',
    }

    it('It should create access token', async () => {        
        access_token = generateAccessToken(user);

        expect(access_token).to.be.string;

    })

    it('It should verify access token', async () => {
        const verify = verifyAccessToken(access_token);

        expect(verify).to.not.be.false;
        expect(verify['name']).equal(user.name);
        expect(verify['email']).equal(user.email);
    })

});

describe('Refresh token tests', async () => {
    let refresh_token = '';

    const user = {
        email: 'dummy@email.test',
        name: 'you got tested',
        password: 'chamber_of_secrets',
    }

    it('It should create refresh token', async () => {        
        refresh_token = generateRefreshToken(user);

        expect(refresh_token).to.be.string;

    })

    it('It should verify refresh token', async () => {
        const verify = verifyRefreshToken(refresh_token);

        expect(verify).to.not.be.false;
        expect(verify['name']).equal(user.name);
        expect(verify['email']).equal(user.email);
    })

});