import express from 'express';
import chai, { expect } from 'chai';
import request from 'supertest';

import app from './helper.test';
import db from '../models';

import { cleanDbTable } from '../utils/dbHelpers';
import { comparePassword, hashPassword } from '../services/authService';

const agent = request.agent(app);

describe('Password Hashing Tests', async () => {

    it('It should hash the password correctly', async () => {
        const user = {
            email: 'dummy@email.test',
            name: 'you got tested',
            password: 'chamber_of_secrets',
        }
    
        const hashedPassword = await hashPassword(user.password);
        
        expect(await comparePassword(user.password,hashedPassword)).equal(true);
    })

});

describe('User Auth Tests', async () => {

    const user = {
        email: 'dummy@email.test',
        name: 'you got tested',
        password: 'chamber_of_secrets',
    }

    it('Users table should be empty', async () => {

        await cleanDbTable(db.User);
        const users = await db.User.findAll();
        expect(users).eql([]);
    });

    it('It should signup new user', async () => {

        const res = await agent
        .post('/api/user/signup')
        .send(user);

        expect(res.statusCode).equal(202);
        expect(res.body.message).equal("User was registered successfully!");
    });

    it('DB should have new user in User model', async () => {
        
        const newUser = await db.User.findOne({ where:{ email: user.email }})

        expect(newUser).not.equal(undefined || null);
        expect(newUser.email).equal(user.email);
        expect(newUser.name).equal(user.name);
    });

    it('It should signin new user', async () => {

        const res = await agent
        .post('/api/user/signin')
        .send({ email:user.email, password:user.password});

        expect(res.statusCode).equal(202);
        expect(res.body.message).equal("User logged in!");
    });

});