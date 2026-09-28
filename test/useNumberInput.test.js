// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useNumberInput } from '../lib/useNumberInput'

function type(result, text) {
  act(() => result.current.inputProps.onChange({ target: { value: text } }))
}

function blur(result) {
  act(() => result.current.inputProps.onBlur())
}

describe('useNumberInput', () => {
  it('starts from the initial value', () => {
    const { result } = renderHook(() => useNumberInput(5000))
    expect(result.current.value).toBe(5000)
    expect(result.current.inputProps.value).toBe('5000')
  })

  it('parses typed input into value', () => {
    const { result } = renderHook(() => useNumberInput(0))
    type(result, '1234.5')
    expect(result.current.value).toBe(1234.5)
  })

  it('treats empty or invalid input as 0 but keeps the raw text', () => {
    const { result } = renderHook(() => useNumberInput(100))
    type(result, '')
    expect(result.current.value).toBe(0)
    expect(result.current.inputProps.value).toBe('')
    type(result, '-')
    expect(result.current.value).toBe(0)
    expect(result.current.inputProps.value).toBe('-')
  })

  it('clamps value to [min, max] while typing without rewriting the field', () => {
    const { result } = renderHook(() => useNumberInput(4, { min: 0, max: 100 }))
    type(result, '150')
    expect(result.current.value).toBe(100)
    expect(result.current.inputProps.value).toBe('150')
    type(result, '-5')
    expect(result.current.value).toBe(0)
  })

  it('snaps an out-of-range entry to the nearest bound on blur', () => {
    const { result } = renderHook(() => useNumberInput(4, { min: 0, max: 100 }))
    type(result, '150')
    blur(result)
    expect(result.current.inputProps.value).toBe('100')
    type(result, '-5')
    blur(result)
    expect(result.current.inputProps.value).toBe('0')
  })

  it('leaves an empty or in-range field alone on blur', () => {
    const { result } = renderHook(() => useNumberInput(4, { min: 0, max: 100 }))
    type(result, '')
    blur(result)
    expect(result.current.inputProps.value).toBe('')
    type(result, '42')
    blur(result)
    expect(result.current.inputProps.value).toBe('42')
  })

  it('omits max from inputProps when unbounded and defaults min to 0', () => {
    const { result } = renderHook(() => useNumberInput(1))
    expect(result.current.inputProps.max).toBeUndefined()
    expect(result.current.inputProps.min).toBe(0)
    expect(result.current.inputProps.inputMode).toBe('decimal')
  })
})
