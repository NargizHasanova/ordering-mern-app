import { useEffect, useState } from 'react'
import { Axios } from '../api';


export default function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const { data } = await Axios.get(url)
                setData(data)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, []);

    async function refetch() {
        console.log('refetch');
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
