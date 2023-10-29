const useAPIQuery = <T,>() => {
    const query = async <T,>(path: string) => {
        const response = await fetch(`http://localhost:9000/${path}`);
        return (await response.json()) as T;
    };

    return { query };
};

export default useAPIQuery;
