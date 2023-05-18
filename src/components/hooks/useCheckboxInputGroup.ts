import { useState } from 'react'

export function useCheckboxInputGroup(initialValues: string[] = []) {
  const [values, setValues] = useState(initialValues)

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    if (checked) {
      setValues([...values, value])
      return
    }
    setValues(values.filter((v) => v !== value))
  }

  return [values, handleCheckboxChange] as const
}
