import { twMerge } from 'tailwind-merge';

export type ButtonLogo = 'add' | 'remove' | 'delete' | 'edit' | 'close';

export default function LogoButton({
    className,
    logo,
    onClick,
}: {
    className?: string;
    logo: ButtonLogo;
    onClick: () => void;
}) {
    return (
        <button className={className} onClick={onClick}>
            <div className={twMerge('btn-logo', `${logo}-btn`)} />
        </button>
    );
}
