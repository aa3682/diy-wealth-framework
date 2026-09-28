import { describe, expect, it } from 'vitest'
import { EMERGENCY_RATE, rankDebts } from '../lib/debtAvalanche'

/** @type {(id: number, balance: string, rate: string, name?: string) => import('../lib/debtAvalanche').Debt} */
const debt = (id, balance, rate, name = `Debt ${id}`) => ({ id, name, balance, rate })

describe('rankDebts', () => {
  it('ranks the calculator sample debts by APR, highest first', () => {
    const { ranked, total, aboveEmergencyLine } = rankDebts([
      debt(1, '5400', '24.99', 'Credit Card'),
      debt(2, '12500', '7.50', 'Car Loan'),
      debt(3, '22000', '5.00', 'Student Loan'),
    ])
    expect(ranked.map((d) => d.name)).toEqual(['Credit Card', 'Car Loan', 'Student Loan'])
    expect(total).toBe(39900)
    expect(aboveEmergencyLine).toBe(2)
  })

  it('sorts regardless of entry order', () => {
    const { ranked } = rankDebts([debt(1, '100', '3'), debt(2, '100', '19.9'), debt(3, '100', '8')])
    expect(ranked.map((d) => d.id)).toEqual([2, 3, 1])
  })

  it('keeps entry order for equal rates', () => {
    const { ranked } = rankDebts([debt(1, '100', '10'), debt(2, '200', '10'), debt(3, '300', '10')])
    expect(ranked.map((d) => d.id)).toEqual([1, 2, 3])
  })

  it('parses form strings and adds balanceNum and rateNum', () => {
    const [only] = rankDebts([debt(1, '1234.5', '7.25')]).ranked
    expect(only).toMatchObject({ id: 1, balance: '1234.5', rate: '7.25', balanceNum: 1234.5, rateNum: 7.25 })
  })

  it('drops debts with an empty, zero, negative or invalid balance', () => {
    const { ranked, total } = rankDebts([
      debt(1, '', '20'),
      debt(2, '0', '20'),
      debt(3, '-500', '20'),
      debt(4, 'abc', '20'),
      debt(5, '300', '4'),
    ])
    expect(ranked.map((d) => d.id)).toEqual([5])
    expect(total).toBe(300)
  })

  it('treats an empty, invalid or negative rate as 0%', () => {
    const { ranked } = rankDebts([debt(1, '100', ''), debt(2, '100', 'x'), debt(3, '100', '-5'), debt(4, '100', '1')])
    expect(ranked.map((d) => d.rateNum)).toEqual([1, 0, 0, 0])
  })

  it('counts only rates strictly above the emergency line', () => {
    expect(EMERGENCY_RATE).toBe(6)
    const { aboveEmergencyLine } = rankDebts([debt(1, '100', '6'), debt(2, '100', '6.01')])
    expect(aboveEmergencyLine).toBe(1)
  })

  it('returns an empty ranking for no debts', () => {
    expect(rankDebts([])).toEqual({ ranked: [], total: 0, aboveEmergencyLine: 0 })
  })
})
