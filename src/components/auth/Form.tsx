import { ReactNode } from 'react';

export const Form = ({ title, children }: { title: string; children: ReactNode; }) => {
    return (
        <form>
            <div className="flex items-center justify-between gap-3 mb-5">
                <h1 className="text-3xl">{title}</h1>
                <img width={45} src="/assets/logo.svg" alt="Logo" />
            </div>
            <div className="flex flex-col gap-5">{children}</div>
        </form>
    );
};
