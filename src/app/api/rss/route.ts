import { NextResponse } from 'next/server';

const FEEDS = [
  { url: 'https://www.reddit.com/user/abumreghaa/m/sidehunts/top/.rss?t=day', name: 'Side Hunts' },
  { url: 'https://www.reddit.com/user/abumreghaa/m/sites/top/.rss?t=day', name: 'Websites' },
  { url: 'https://www.reddit.com/user/abumreghaa/m/ainocode/top/.rss?t=day', name: 'AI & Code' },
];

export async function GET() {
  try {
    const results = await Promise.all(
      FEEDS.map(async (feed) => {
        const res = await fetch(feed.url, { next: { revalidate: 3600 } });
        const xmlText = await res.text();
        
        // Basic XML parsing for RSS (using Regex to avoid extra dependencies)
        const items: any[] = [];
        const itemMatches = xmlText.matchAll(/<entry>([\s\S]*?)<\/entry>/g);
        
        for (const match of itemMatches) {
          const content = match[1];
          const title = content.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '';
          const link = content.match(/<link href="([\s\S]*?)"/)?.[1] || '';
          const description = content.match(/<content type="html">([\s\S]*?)<\/content>/)?.[1] || '';
          const id = content.match(/<id>([\s\S]*?)<\/id>/)?.[1] || Math.random().toString();
          const pubDate = content.match(/<updated>([\s\S]*?)<\/updated>/)?.[1] || '';
          
          items.push({
            id,
            title: decodeHtml(title),
            link,
            description: stripHtml(decodeHtml(description)).substring(0, 500),
            pubDate,
            source: feed.name,
          });
        }
        return items;
      })
    );

    const flatItems = results.flat().sort((a, b) => 
      new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    return NextResponse.json({ items: flatItems });
  } catch (error) {
    console.error('RSS Fetch Error:', error);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}

function decodeHtml(html: string) {
  return html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>?/gm, ' ');
}