'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Form } from '~/components/auth/Form';
import useAuth from '~/hooks/useAuth';

const Register = () => {
    const { register } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        console.log(form);
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        const nombre = form.nombre.value;
        const lastname = form.lastname.value;

        const result = await register(nombre, lastname, email, password);

        if (result instanceof Error) {
            console.log(result.message);
            setError(result.message);
        } else {
            redirect('/auth/login');
        }
    };

    return (
        <>
            {error && (
                <p className="bg-red-200 border-2 border-red-400 rounded-lg p-2 text-red-700">
                    {error}
                </p>
            )}
            <Form title="Register" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 text-lg">
                    <label htmlFor="name">Nombre</label>
                    <input
                        tabIndex={0}
                        className="border border-gray-400 rounded-lg p-3"
                        type="text"
                        name="nombre"
                        id="name"
                    />
                </div>
                <div className="flex flex-col gap-2 text-lg">
                    <label htmlFor="lastname">Apellido</label>
                    <input
                        tabIndex={0}
                        className="border border-gray-400 rounded-lg p-3"
                        type="text"
                        name="lastname"
                        id="lastname"
                    />
                </div>
                <div className="flex flex-col gap-2 text-lg">
                    <label htmlFor="email">Email</label>
                    <input
                        className="border border-gray-400 rounded-lg p-3"
                        type="email"
                        name="email"
                        id="email"
                    />
                </div>
                <div className="flex flex-col gap-2 text-lg">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        className="border border-gray-400 rounded-lg p-3"
                        type="password"
                        name="password"
                        id="password"
                    />
                </div>
                <button className="bg-primary p-3 text-white text-xl mt-3 rounded-lg hover:bg-hover active:bg-active">
                    Registrar
                </button>
                <div className="flex items-center gap-2 mt-2 justify-center">
                    <p>¿Ya tenés cuenta?</p>{' '}
                    <Link href="/auth/login" className="text-primary underline">
                        Iniciar sesión
                    </Link>
                </div>
            </Form>
        </>
    );
};

export default Register;
