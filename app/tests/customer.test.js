const supertest = require('supertest');
const baseTest  = require('./baseTest');
const customer    = require('./fixtures/customer');

const express = require('express');
const app = express();

describe("Customer API Test Cases", () => {
    beforeAll(async () => {
        await baseTest.setUp();
    });
    
    afterAll(async () => {
        await baseTest.tearDown();
    });

    it('should create with valid data customer successfully', async () => {
        const response = await supertest(app).post('api/customers/').send({...customer}).expect(200);
        expect(response.body.data.name).toBe(customer.name);
    });

    it('should not create customer with invalid data', async () => {
        await supertest(app).post('api/customers/').send({}).expect(406);
    });
});