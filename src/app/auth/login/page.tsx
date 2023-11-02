import Link from 'next/link';
import { Form } from '../../../components/auth/Form';

const Login = () => {
    return (
        <Form title="Login">
            <div className="flex flex-col gap-2 text-lg">
                <label htmlFor="email">Email</label>
                <input
                    tabIndex={0}
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
                Ingresar
            </button>
            <div className="flex items-center gap-2 mt-2 justify-center">
                <p>¿No tenés cuenta?</p>{' '}
                <Link href="/auth/register" className="text-primary underline">Registrarse</Link>
            </div>
        </Form>
    );
};

export default Login;
