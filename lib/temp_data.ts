import { IPost } from "./features/posts/post.types";

// Mock data for blog posts
export const blogPosts: IPost[] = [
  {
    slug: "building-modern-uis-with-react-and-tailwind-css",
    title: "Building Modern UIs with React and Tailwind CSS",
    short_description:
      "Learn how to combine React and Tailwind CSS to build beautiful, responsive user interfaces quickly and efficiently.",
    description:
      "Learn how to combine React and Tailwind CSS to build beautiful, responsive user interfaces quickly and efficiently.",
    category: "Development",
    topics: ["React", "Tailwind CSS", "Frontend", "UI Design", "Web Development"],
    author: {
      name: "Jane Cooper",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      initials: "JC",
    },
    readTime: "5 min read",
    date: "May 15, 2023",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=800",
    comments: [
      {
        id: 1,
        author: {
          name: "Alex Thompson",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
          initials: "AT",
        },
        content:
          "This is a fantastic article! The examples really helped me understand the concepts better.",
        date: "May 16, 2023",
        replies: [
          {
            id: 1,
            author: {
              name: "Sarah Wilson",
              avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
              initials: "SW",
            },
            content: "Agreed! The code samples were particularly useful.",
            date: "May 16, 2023",
          },
        ],
      },
      {
        id: 2,
        author: {
          name: "Michael Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
          initials: "MC",
        },
        content:
          "Would love to see more articles like this. The practical approach really works for me.",
        date: "May 17, 2023",
        replies: [],
      },
    ],
  },
  {
    slug: "the-future-of-web-development-with-next-js",
    title: "The Future of Web Development with Next.js",
    description:
      "Explore how Next.js is changing the landscape of web development with its powerful features and optimizations.",
    short_description:
      "Explore how Next.js is changing the landscape of web development with its powerful features and optimizations.",
    category: "Technology",
    topics: ["Next.js", "React", "SSR", "Performance", "JavaScript"],
    author: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
      initials: "JD",
    },
    readTime: "7 min read",
    date: "May 10, 2023",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    comments: [],
  },
  {
    slug: "building-a-modern-design-system",
    title: "Building Modern UIs with React and Tailwind CSS",
    description:
      "Learn how to combine React and Tailwind CSS to build beautiful, responsive user interfaces quickly and efficiently.",
    short_description:
      "Learn how to combine React and Tailwind CSS to build beautiful, responsive user interfaces quickly and efficiently.",
    date: "May 15, 2023",
    category: "Development",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    topics: ["React", "Tailwind CSS", "Frontend", "UI Design", "Web Development"],
    author: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
      initials: "JD",
    },
  },
  {
    slug: "the-future-of-web-development-with-next-js-part-2",
    title: "The Future of Web Development with Next.js",
    description:
      "Explore how Next.js is changing the landscape of web development with its powerful features and optimizations.",
    short_description:
      "Explore how Next.js is changing the landscape of web development with its powerful features and optimizations.",
    date: "May 10, 2023",
    category: "Technology",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    topics: ["Next.js", "React", "SSR", "Performance", "JavaScript"],
    author: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
      initials: "JD",
    },
  },
  {
    slug: "mastering-state-management-with-redux-toolkit",
    title: "Mastering State Management with Redux Toolkit",
    description:
      "A comprehensive guide to managing application state effectively using Redux Toolkit.",
    short_description:
      "A comprehensive guide to managing application state effectively using Redux Toolkit.",
    date: "May 5, 2023",
    category: "Development",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    topics: ["Redux", "State Management", "React", "JavaScript"],
    author: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
      initials: "JD",
    },
  },
];

export const topics = [
  { slug: "technology", name: "Technology", count: 24 },
  { slug: "development", name: "Development", count: 18 },
  { slug: "design", name: "Design", count: 12 },
  { slug: "productivity", name: "Productivity", count: 8 },
  { slug: "career", name: "Career", count: 6 },
  { slug: "life", name: "Life", count: 4 },
];
