import { twMerge } from 'tailwind-merge';

// Any logo added here should be added to the tailwindcss file as a safelist item with the postfix '-btn'
// If not, the logo will not be displayed
export type ButtonLogo = 'add' | 'remove' | 'delete' | 'edit' | 'close' | 'sort-asc' | 'sort-desc';

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
