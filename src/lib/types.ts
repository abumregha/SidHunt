export interface Article {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  subreddit?: string;
}

export interface RSSFeedResponse {
  items: Article[];
}
