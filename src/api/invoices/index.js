import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Invoices, { schema } from './model'

const router = new Router()
const { name, comment, invoiceId, amount, invoiceDate } = schema.tree

/**
 * @api {post} /invoices Create invoices
 * @apiName CreateInvoices
 * @apiGroup Invoices
 * @apiParam name Invoices's name.
 * @apiParam comment Invoices's comment.
 * @apiParam amount Invoices's amount.
 * @apiParam invoiceDate Invoices's invoiceDate.
 * @apiParam invoiceId Invoices's invoiceId.
 * @apiSuccess {Object} invoices Invoices's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoices not found.
 */
router.post('/',
  body({ name, comment, invoiceId, amount, invoiceDate }),
  create)

/**
 * @api {get} /invoices Retrieve invoices
 * @apiName RetrieveInvoices
 * @apiGroup Invoices
 * @apiUse listParams
 * @apiSuccess {Object[]} invoices List of invoices.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /invoices/:id Retrieve invoices
 * @apiName RetrieveInvoices
 * @apiGroup Invoices
 * @apiSuccess {Object} invoices Invoices's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoices not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /invoices/:id Update invoices
 * @apiName UpdateInvoices
 * @apiGroup Invoices
 * @apiParam name Invoices's name.
 * @apiParam comment Invoices's comment.
 * @apiParam invoiceId Invoices's invoiceId.
 * @apiSuccess {Object} invoices Invoices's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Invoices not found.
 */
router.put('/:id',
  body({ name, comment, invoiceId, amount, invoiceDate }),
  update)

/**
 * @api {delete} /invoices/:id Delete invoices
 * @apiName DeleteInvoices
 * @apiGroup Invoices
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Invoices not found.
 */
router.delete('/:id',
  destroy)

export default router
