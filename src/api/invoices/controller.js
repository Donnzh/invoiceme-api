import { success, notFound } from '../../services/response/'
import { Invoices } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Invoices.create(body)
    .then((invoices) => invoices.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Invoices.find(query, select, { skip: 0, limit: 200, sort: { createdAt: -1 }, projection: {} })
    .then((invoices) => invoices.map((invoices) => invoices.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Invoices.findById(params.id)
    .then(notFound(res))
    .then((invoices) => invoices ? invoices.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) => {
  Invoices.findById(params.id)
    .then(notFound(res))
    .then((invoices) => invoices ? Object.assign(invoices, body).save() : null)
    .then((invoices) => invoices ? invoices.view(true) : null)
    .then(success(res))
    .catch(next)
}

export const destroy = ({ params }, res, next) =>
  Invoices.findById(params.id)
    .then(notFound(res))
    .then((invoices) => invoices ? invoices.remove() : null)
    .then(success(res, 204))
    .catch(next)
