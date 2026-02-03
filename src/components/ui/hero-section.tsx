export function HeroSection({
    children,
}: {
    children?: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-visible bg-white dark:bg-neutral-950">
            {children}
        </div>
    );
}
