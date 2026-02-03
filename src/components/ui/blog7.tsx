import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";

interface Post {
    id: string;
    title: string;
    summary: string;
    label: string;
    author: string;
    published: string;
    url: string;
    image: string;
}

interface Blog7Props {
    tagline: string;
    heading: string;
    description: string;
    posts: Post[];
}

const Blog7 = ({
    tagline = "Latest Updates",
    heading = "Blog Posts",
    description = "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
    posts = [
        {
            id: "post-1",
            title: "What’s Next in AI: 7 Trends to Watch in 2026",
            summary:
                "Discover the seven pivotal AI trends shaping 2026, from AI-augmented workforces to hyper-personalized skill development and how they impact daily life.",
            label: "Future Trends",
            author: "Microsoft Source",
            published: "3 Feb 2026",
            url: "https://news.microsoft.com/source/features/ai/whats-next-in-ai-7-trends-to-watch-in-2026/",
            image: "/Users/falahi/Falahi_portfolio/public/blog_images/ai_trend.png", // Save the first image I generated here
        },
        {
            id: "post-2",
            title: "Genie 3: A New Frontier for World Models",
            summary:
                "Explore Genie 3, Google DeepMind's latest breakthrough. Learn how this new world model simulates interactive environments and advances generative AI.",
            label: "Research",
            author: "Google DeepMind",
            published: "3 Feb 2026",
            url: "https://deepmind.google/blog/genie-3-a-new-frontier-for-world-models/",
            image: "/Users/falahi/Falahi_portfolio/public/blog_images/genie_ai.png", // Save the second image I generated here
        },
        {
            id: "post-3",
            title: "Introducing the Codex App",
            summary:
                "OpenAI brings the power of coding to mobile. See how the new Codex App allows developers to build simple games and applications directly from their phones.",
            label: "Product Launch",
            author: "OpenAI",
            published: "3 Feb 2026",
            url: "https://openai.com/index/introducing-the-codex-app/",
            image: "/Users/falahi/Falahi_portfolio/public/blog_images/open_ai.png", // Save the third image I generated here
        },
    ],
}: Blog7Props) => {
    return (
        <section className="py-32">
            <div className="relative z-10 container mx-auto flex flex-col items-center gap-16 lg:px-16">
                <div className="text-center">
                    <Badge
                        variant="secondary"
                        className="mb-6 px-4 py-1 text-sm md:text-base"
                    >
                        {tagline}
                    </Badge>
                    <h2 className="mb-4 text-pretty text-4xl font-bold tracking-tight md:text-5xl lg:text-7xl lg:max-w-5xl">
                        {heading}
                    </h2>
                    <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
                        {description}
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {posts.map((post) => (
                        <Card key={post.id} className="grid grid-rows-[auto_auto_1fr_auto]">
                            <div className="aspect-[16/9] w-full">
                                <a
                                    href={post.url}
                                    target="_blank"
                                    className="transition-opacity duration-200 fade-in hover:opacity-70"
                                >
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </a>
                            </div>
                            <CardHeader>
                                <h3 className="text-lg font-semibold hover:underline md:text-xl">
                                    <a href={post.url} target="_blank">
                                        {post.title}
                                    </a>
                                </h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{post.summary}</p>
                            </CardContent>
                            <CardFooter>
                                <a
                                    href={post.url}
                                    target="_blank"
                                    className="flex items-center text-foreground hover:underline"
                                >
                                    Read more
                                    <ArrowRight className="ml-2 size-4" />
                                </a>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Blog7 };
