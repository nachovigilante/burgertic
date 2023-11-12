import { FormEventHandler, ReactNode } from 'react';

export const Form = ({
    title,
    children,
    onSubmit,
}: {
    title: string;
    children: ReactNode;
    onSubmit: FormEventHandler<HTMLFormElement>;
}) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="flex items-center justify-between gap-3 mb-5">
                <h1 className="text-3xl">{title}</h1>
                <img width={45} src="/assets/logo.svg" alt="Logo" />
            </div>
            <div className="flex flex-col gap-5">{children}</div>
        </form>
    );
};
