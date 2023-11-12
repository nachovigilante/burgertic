'use client';

import Link from 'next/link';
import { Form } from '~/components/auth/Form';

const Register = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Register');
    };

    return (
        <>
            <Form title="Register" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 text-lg">
                    <label htmlFor="name">Nombre</label>
                    <input
                        tabIndex={0}
                        className="border border-gray-400 rounded-lg p-3"
                        type="text"
                        name="name"
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
                <div className="flex flex-col gap-2 text-lg">
                    <label htmlFor="password">Repetir contraseña</label>
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
