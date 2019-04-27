import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Invoices } from '.'

const app = () => express(apiRoot, routes)

let invoices

beforeEach(async () => {
  invoices = await Invoices.create({})
})

test('POST /invoices 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ name: 'test', comment: 'test', invoiceId: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.comment).toEqual('test')
  expect(body.invoiceId).toEqual('test')
})

test('GET /invoices 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /invoices/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${invoices.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(invoices.id)
})

test('GET /invoices/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /invoices/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${invoices.id}`)
    .send({ name: 'test', comment: 'test', invoiceId: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(invoices.id)
  expect(body.name).toEqual('test')
  expect(body.comment).toEqual('test')
  expect(body.invoiceId).toEqual('test')
})

test('PUT /invoices/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ name: 'test', comment: 'test', invoiceId: 'test' })
  expect(status).toBe(404)
})

test('DELETE /invoices/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${invoices.id}`)
  expect(status).toBe(204)
})

test('DELETE /invoices/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
