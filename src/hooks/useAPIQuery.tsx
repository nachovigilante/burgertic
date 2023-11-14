const useAPIQuery = <T,>() => {
    const query = async <T,>(path: string, auth?: string) => {
        const response = await fetch(`http://localhost:9000/${path}`, {
            headers: {
                Authorization: auth ? `${auth}` : '',
            },
        });
        return (await response.json()) as T;
    };

    const mutation = async <T, U>(path: string, data: T, auth?: string) => {
        const response = await fetch(`http://localhost:9000/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: auth ? `${auth}` : '',
            },
            body: JSON.stringify(data),
        });
        return (await response.json()) as U;
    };

    return { query, mutation };
};

export default useAPIQuery;
