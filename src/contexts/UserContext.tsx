import { ReactNode, createContext, useState } from 'react';
import useAPIQuery from '~/hooks/useAPIQuery';

export type User = {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    admin: boolean;
};

type LoginCredentials = {
    email: string;
    password: string;
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
        admin: false,
    },
    login: async () => {
        return {
            id: -1,
            email: '',
            nombre: '',
            apellido: '',
            admin: false,
        };
    },
    logout: () => {},
    register: async () => {
        return false;
    },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { mutation } = useAPIQuery();

    const [user, setUser] = useState<User>({
        id: -1,
        email: '',
        nombre: '',
        apellido: '',
        admin: false,
    });

    const setToken = (token: string) => {
        localStorage.setItem('token', token);
    };

    const login = async (email: string, password: string) => {
        try {
            const { response, status } = await mutation<
                LoginCredentials,
                { usuario: User; token: string }
            >('/auth/login', {
                email: email,
                password: password,
            });

            if (status !== 200) throw new Error('Error al iniciar sesión');

            setUser(response!.usuario);
            setToken(response!.token);
            return response!.usuario;
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
            admin: false,
        });
    };

    const register = async (
        nombre: string,
        apellido: string,
        email: string,
        password: string,
    ) => {
        try {
            const { status } = await mutation<
                {
                    nombre: string;
                    apellido: string;
                    email: string;
                    password: string;
                },
                User
            >('/auth/register', {
                nombre,
                apellido,
                email,
                password,
            });

            if (status !== 200 && status !== 201) throw new Error('Error al registrar usuario');

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
