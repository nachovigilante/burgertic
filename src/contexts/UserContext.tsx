import { ReactNode, createContext, useState } from 'react';
import useAPIQuery from '~/hooks/useAPIQuery';

export type User = {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
};

export type UserContextType = {
    user: User;
    login: (email: string, password: string) => Promise<User | Error>;
    logout: () => void;
    register: (
        nombre: string,
        apellido: string,
        email: string,
        password: string,
    ) => Promise<boolean | Error>;
};

const AuthContext = createContext<UserContextType>({
    user: {
        id: -1,
        email: '',
        nombre: '',
        apellido: '',
    },
    login: async () => {
        return {
            id: -1,
            email: '',
            nombre: '',
            apellido: '',
        };
    },
    logout: () => {},
    register: async () => {
        return false;
    },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { query, mutation } = useAPIQuery();

    const [user, setUser] = useState<User>({
        id: -1,
        email: '',
        nombre: '',
        apellido: '',
    });

    const login = async (email: string, password: string) => {
        try {
            const { response, status } = await mutation<
                {
                    email: string;
                    password: string;
                },
                User
            >('login/', {
                email: email,
                password: password,
            });

            if (status !== 200) throw new Error('Error al iniciar sesión');

            setUser(response!);
            return response!;
        } catch (e) {
            return e as Error;
        }
    };

    const logout = () => {
        setUser({
            id: -1,
            email: '',
            nombre: '',
            apellido: '',
        });
    };

    const register = async (
        nombre: string,
        apellido: string,
        email: string,
        password: string,
    ) => {
        try {
            const { response, status } = await mutation<
                {
                    nombre: string;
                    apellido: string;
                    email: string;
                    password: string;
                },
                User
            >('usuarios/', {
                nombre,
                apellido,
                email,
                password,
            });

            if (status !== 200) throw new Error('Error al registrar usuario');

            return true;
        } catch (e) {
            return e as Error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
