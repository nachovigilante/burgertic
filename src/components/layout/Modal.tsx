import { twMerge } from 'tailwind-merge';

export function Modal({
    children,
    open,
    onClose,
}: {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
}) {
    return (
        <>
            <div
                className={twMerge(
                    'fixed box opacity-0 pointer-events-none p-8 transition-all duration-300 ease-in-out top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 shadow-large',
                    open && 'opacity-100 pointer-events-auto',
                )}
            >
                {children}
            </div>
            <div
                id="modal-background"
                className={twMerge(
                    'fixed inset-0 bg-black/20 backdrop-blur-sm hidden justify-center items-center',
                    open && 'flex',
                )}
                onClick={onClose}
            />
        </>
    );
}
