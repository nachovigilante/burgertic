import useAuth from '~/hooks/useAuth';

const User = () => {
    const { user, logout } = useAuth();

    if (user.id === -1) return null;

    return (
        <div
            className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 rounded-full ml-2 border border-gray-300"
            onClick={() => logout()}
        >
            <p>
                {user.nombre} {user.apellido}
            </p>
            <img src="/assets/salir.png" alt="" className="h-4" />
        </div>
    );
};

export default User;
