import { useEffect, useState } from "react"

export const useDebounce = (value) => {
    const [debounceVal, setDebounceVal] = useState(value)
    const delay = 500

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceVal(value)
        }, delay)

        return () => clearTimeout(timeout)
    }, [value, delay])

    return debounceVal
}