
import { useState, useEffect } from 'react'

function useCurrencyInfo(currency) {
    const [data, setData] = useState({})
    useEffect(() => {
        fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=22befd7d71df483ba336bcb4e6718961')
            .then((res) => res.json())
            .then((res) => setData(res.rates || {}))
            .catch((error) => console.error(error))
    }, [currency])
    return data
}

export default useCurrencyInfo;