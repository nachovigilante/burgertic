const useAPIQuery = <T,>() => {
    const query = async <T,>(path: string) => {
        const response = await fetch(`http://localhost:9000/${path}`);
        return (await response.json()) as T;
    };

    const mutation = async <T, U>(path: string, data: T) => {
        const response = await fetch(`http://localhost:9000/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return (await response.json()) as U;
    };

    return { query, mutation };
};

export default useAPIQuery;
