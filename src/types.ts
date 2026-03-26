export type Category = 
  | "AI & Future Tech" 
  | "Smartphones" 
  | "Gadgets & Reviews" 
  | "Apps & Tools" 
  | "How-To Guides" 
  | "Tech News"
  | "Excel Mastery"
  | "SQL Mastery"
  | "Agentic AI";

export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  author: Author;
  date: string;
  readTime: string;
  image: string;
  trending?: boolean;
  featured?: boolean;
}
