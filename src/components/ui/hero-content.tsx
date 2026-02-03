interface HeroContentProps {
    name: string;
    leftTitle: string;
    rightTitle: string;
    description: string;
    imageUrl: string;
}

export function HeroContent({
    name,
    leftTitle,
    rightTitle,
    description,
    imageUrl,
}: HeroContentProps) {
    return (
        <div className="relative z-10 flex items-center justify-center min-h-screen py-20 px-10">
            <div className="w-full max-w-[1200px] mx-auto px-10 py-20">
                <div className="flex items-center gap-10">
                    {/* Left Column - Name + Single Large Title */}
                    <div className="w-[30%] text-right">
                        <p className="text-lg tracking-[2px] mb-5 uppercase text-neutral-900 dark:text-white font-medium">
                            {name}
                        </p>
                        <h1 className="text-[88px] font-extrabold leading-[0.95] text-neutral-900 dark:text-white whitespace-nowrap">
                            {leftTitle}
                        </h1>
                    </div>

                    {/* Center Column - Image */}
                    <div className="w-[40%]">
                        <div className="w-full h-[520px] rounded-[18px] overflow-hidden">
                            <img
                                src={imageUrl}
                                alt="Professional portrait"
                                className="w-full h-full object-cover object-[center_30%]"
                            />
                        </div>
                    </div>

                    {/* Right Column - Single Large Title + Description */}
                    <div className="w-[30%] text-left">
                        <div className="h-[calc(1.125rem+1.25rem)]"></div>
                        <h1 className="text-[88px] font-extrabold leading-[0.95] mb-6 text-neutral-900 dark:text-white whitespace-nowrap">
                            {rightTitle}
                        </h1>
                        <p className="text-base leading-[1.6] max-w-[320px] text-neutral-600 dark:text-neutral-400">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
