import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = <T,>(url: string) => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [url]);

    return { data, loading };
};

export default useFetch;