import { useCallback, useState } from 'react'

/**
 * State for a controlled <input type="number">.
 *
 * The raw string the user typed is kept as-is so the field can be cleared
 * and retyped freely. `value` is what calculations should use: the parsed
 * number clamped to [min, max], with empty or invalid input treated as 0.
 * On blur, an out-of-range entry snaps to the nearest bound.
 */
export function useNumberInput(initialValue, { min = 0, max = Infinity } = {}) {
  const [raw, setRaw] = useState(String(initialValue))

  const parsed = raw === '' ? NaN : Number(raw)
  const value = Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : 0

  const onChange = useCallback((e) => setRaw(e.target.value), [])

  const onBlur = useCallback(() => {
    if (raw !== '' && Number.isFinite(parsed) && parsed !== value) {
      setRaw(String(value))
    }
  }, [raw, parsed, value])

  return {
    value,
    inputProps: {
      value: raw,
      onChange,
      onBlur,
      min,
      max: Number.isFinite(max) ? max : undefined,
      inputMode: 'decimal',
    },
  }
}
