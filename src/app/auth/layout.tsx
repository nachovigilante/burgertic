import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="container flex justify-center items-center pt-20">
            <div className="shadow-standard rounded-lg w-[500px] h-fit bg-white p-10 pb-12 flex flex-col gap-10">
                {children}
            </div>
        </div>
    );
};

export default Layout;
