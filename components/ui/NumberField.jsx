import React, { useId } from 'react'

const baseLabelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  marginBottom: '0.5rem',
  color: '#cbd5e1',
}

const baseInputStyle = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  borderRadius: '6px',
  border: '1px solid #475569',
  backgroundColor: '#1e293b',
  color: '#f8fafc',
  fontSize: '1rem',
}

const hintStyle = {
  fontSize: '0.75rem',
  color: '#64748b',
  marginBottom: '0.5rem',
}

/**
 * A labelled numeric input. Spread `inputProps` from useNumberInput onto it.
 * The label is associated with the input via id/htmlFor so assistive
 * technology announces it and clicking the label focuses the field.
 */
export default function NumberField({
  id,
  label,
  hint,
  step,
  wrapperStyle,
  labelStyle,
  inputStyle,
  ...inputProps
}) {
  const autoId = useId()
  const fieldId = id || autoId
  return (
    <div style={wrapperStyle}>
      <label htmlFor={fieldId} style={{ ...baseLabelStyle, ...labelStyle }}>
        {label}
      </label>
      {hint && <div style={hintStyle}>{hint}</div>}
      <input
        id={fieldId}
        type="number"
        step={step}
        style={{ ...baseInputStyle, ...inputStyle }}
        {...inputProps}
      />
    </div>
  )
}
