import { useCallback, useState } from 'react'

export function useNumberInput(initialValue: number | string) {
  const [value, setValue] = useState(isNaN(Number(initialValue)) ? 0 : initialValue)

  const increment = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setValue((v) => +v + 1)
  }, [])
  const decrement = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setValue((v) => +v - 1)
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) return

    setValue(e.target.value)
  }, [])

  return [value, handleInputChange, { increment, decrement }] as const
}
