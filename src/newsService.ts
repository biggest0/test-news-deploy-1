// src/services/newsService.ts
import newsData from "./data/mock.json";

export interface Article {
  title?: string;
  body: string;
  longBody?: string;
  category?: string;
  subCategory?: string[];
  date?: string;
  source?: string;
  clickedCount?: number;
}

// Get all articles
export function getAllArticles(): Article[] {
  return newsData;
}

// Get articles by category
export function getArticlesByCategory(category: string): Article[] {
  return newsData.filter((a) => a.category === category);
}

// Get all article categories
// probably better to do this in the backend
export function getArticleCategories(): string[] {
  // const categories: string[] = []
  // newsData.forEach((article) => {
  //   if (!categories.includes(article.category)) {
  //     categories.push(article.category)
  //   }})
  // return categories
  return Array.from(new Set(newsData.map(article => article.category)))
}

// Optional: Get latest articles
export function getLatestArticles(limit = 10): Article[] {
  return [...newsData]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
