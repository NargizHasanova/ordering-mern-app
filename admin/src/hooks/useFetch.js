import { useEffect, useState } from 'react'
import { Axios } from '../Axios';

export default function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const res = await Axios.get(url)
                setData(res.data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, []);

    async function refetch() {
        setLoading(true)
        try {
            const res = await Axios.get(url)
            setData(res.data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, refetch }

}
