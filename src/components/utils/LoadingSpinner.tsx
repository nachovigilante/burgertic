import { twMerge } from 'tailwind-merge';

export function LoadingSpinner({ light }: { light?: boolean }) {
    return <div className={twMerge('loader', light && 'light')} />;
}
