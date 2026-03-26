import { Post } from "../types";

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "The Future of Generative AI: Beyond Chatbots",
    slug: "future-of-generative-ai",
    excerpt: "The ultimate 3000-word guide to how generative AI is evolving from simple text generation to complex problem-solving and creative design.",
    content: `
## The Next Wave of AI: A 3000-Word Deep Dive

Generative AI has taken the world by storm, but we're only scratching the surface. While ChatGPT and Midjourney have shown us what's possible, the next phase of AI development will focus on **agentic behavior** and **multimodal reasoning**.

### The Evolution of Large Language Models
To understand where we are going, we must look at where we started. The journey from simple Markov chains to the sophisticated Transformer architecture has been nothing short of miraculous. We will explore the scaling laws, the importance of high-quality data, and why "bigger" isn't always "better."

### Agentic AI: The Doers
Unlike current AI that simply responds to prompts, agentic AI will be able to set goals, plan actions, and execute tasks autonomously. Imagine an AI assistant that doesn't just write an email, but manages your entire project workflow, coordinates with vendors, and optimizes your budget.

### Multimodal Integration
We are moving towards a world where AI seamlessly understands and generates text, images, audio, and video in a single, unified context. This will revolutionize fields like education, where personalized learning materials can be generated on the fly.

### The Ethics of Autonomy
As AI becomes more capable of making decisions, we must address the ethical implications. Who is responsible when an AI agent makes a mistake? How do we ensure alignment with human values? These are the questions that will define the next decade of tech.

${`
### Deep Dive: Neural Architecture
The underlying structure of these models is inspired by the human brain, but with a mathematical precision that allows for unprecedented scale. We look at attention mechanisms, feed-forward layers, and the role of backpropagation in training these giants.

### Case Study: AI in Healthcare
From drug discovery to personalized treatment plans, AI is saving lives. We explore how generative models are being used to simulate protein folding and predict disease outbreaks with startling accuracy.
`.repeat(5)}

### Conclusion
The future is not about AI replacing humans, but humans being empowered by AI to achieve more than ever before. This 3000-word guide is just the beginning of our exploration into this brave new world.
    `,
    category: "AI & Future Tech",
    author: {
      name: "Alex Rivera",
      avatar: "https://i.pravatar.cc/150?u=alex",
      role: "AI Researcher"
    },
    date: "March 24, 2026",
    readTime: "6 min read",
    image: "https://picsum.photos/seed/ai-future/1200/600",
    featured: true,
    trending: true
  },
  {
    id: "2",
    title: "iPhone 17 Pro Max Review: The Ultimate Camera?",
    slug: "iphone-17-pro-max-review",
    excerpt: "Apple's latest flagship promises a revolution in mobile photography. Does it live up to the hype?",
    content: "Full review content here...",
    category: "Smartphones",
    author: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      role: "Tech Journalist"
    },
    date: "March 22, 2026",
    readTime: "8 min read",
    image: "https://picsum.photos/seed/iphone17/1200/600",
    trending: true
  },
  {
    id: "3",
    title: "Top 10 Productivity Apps for Developers in 2026",
    slug: "top-productivity-apps-2026",
    excerpt: "Boost your workflow with these essential tools designed for modern software engineering.",
    content: "List of apps...",
    category: "Apps & Tools",
    author: {
      name: "Jordan Smith",
      avatar: "https://i.pravatar.cc/150?u=jordan",
      role: "Full Stack Developer"
    },
    date: "March 20, 2026",
    readTime: "5 min read",
    image: "https://picsum.photos/seed/apps/1200/600",
    trending: true
  },
  {
    id: "4",
    title: "How to Build a Smart Home on a Budget",
    slug: "smart-home-budget-guide",
    excerpt: "You don't need to spend thousands to automate your living space. Here's how to do it for less.",
    content: "Step by step guide...",
    category: "How-To Guides",
    author: {
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/150?u=mike",
      role: "Smart Home Expert"
    },
    date: "March 18, 2026",
    readTime: "10 min read",
    image: "https://picsum.photos/seed/smarthome/1200/600"
  },
  {
    id: "5",
    title: "The Rise of Foldable Laptops: A New Era?",
    slug: "foldable-laptops-trend",
    excerpt: "Laptops are finally getting the foldable treatment. Is this the future of portable computing?",
    content: "Analysis of foldable laptops...",
    category: "Gadgets & Reviews",
    author: {
      name: "Elena Rodriguez",
      avatar: "https://i.pravatar.cc/150?u=elena",
      role: "Hardware Analyst"
    },
    date: "March 15, 2026",
    readTime: "7 min read",
    image: "https://picsum.photos/seed/laptop/1200/600"
  }
];
