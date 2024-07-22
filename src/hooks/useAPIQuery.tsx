const useAPIQuery = () => {
    const query = async <T,>(path: string, auth: boolean = false) => {
        let token = null;

        if (auth) token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:9000${path}`, {
            headers: {
                Authorization: auth ? `Bearer ${token}` : '',
            },
        });

        if (response.status !== 200) {
            return {
                status: response.status,
            };
        }

        return {
            response: (await response.json()) as T,
            status: response.status,
        };
    };

    const mutation = async <T, U>(
        path: string,
        data: T,
        auth: boolean = false,
    ) => {
        let token = null;

        if (auth) token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:9000${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: auth ? `Bearer ${token}` : '',
            },
            body: JSON.stringify(data),
        });

        console.log(response);

        if (response.status !== 200) {
            return {
                status: response.status,
            };
        }

        return {
            response: (await response.json()) as U,
            status: response.status,
        };
    };

    return { query, mutation };
};

export default useAPIQuery;
