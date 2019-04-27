import { Invoices } from '.'

let invoices

beforeEach(async () => {
  invoices = await Invoices.create({ name: 'test', comment: 'test', invoiceId: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = invoices.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(invoices.id)
    expect(view.name).toBe(invoices.name)
    expect(view.comment).toBe(invoices.comment)
    expect(view.invoiceId).toBe(invoices.invoiceId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = invoices.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(invoices.id)
    expect(view.name).toBe(invoices.name)
    expect(view.comment).toBe(invoices.comment)
    expect(view.invoiceId).toBe(invoices.invoiceId)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
