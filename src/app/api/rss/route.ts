import { NextResponse, NextRequest } from 'next/server';

const FEEDS = [
  { url: 'https://www.reddit.com/user/abumreghaa/m/sidehunts/top/.rss?t=day', name: 'Side Hunts' },
  { url: 'https://www.reddit.com/user/abumreghaa/m/sites/top/.rss?t=day', name: 'Websites' },
  { url: 'https://www.reddit.com/user/abumreghaa/m/ainocode/top/.rss?t=day', name: 'AI & Code' },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dayParam = searchParams.get('day') || 'today';
    
    const targetDate = new Date();
    if (dayParam === 'yesterday') {
      targetDate.setDate(targetDate.getDate() - 1);
    }
    targetDate.setHours(0, 0, 0, 0);

    const results = await Promise.all(
      FEEDS.map(async (feed) => {
        try {
          const res = await fetch(feed.url, { next: { revalidate: 3600 } });
          const xmlText = await res.text();
          
          const items: any[] = [];
          const itemMatches = xmlText.matchAll(/<entry>([\s\S]*?)<\/entry>/g);
          
          for (const match of itemMatches) {
            const content = match[1];
            const pubDateStr = content.match(/<updated>([\s\S]*?)<\/updated>/)?.[1] || '';
            const pubDate = new Date(pubDateStr);
            
            const postDate = new Date(pubDate);
            postDate.setHours(0, 0, 0, 0);
            
            if (postDate.getTime() !== targetDate.getTime()) {
              continue;
            }

            const title = content.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '';
            const link = content.match(/<link href="([\s\S]*?)"/)?.[1] || '';
            const description = content.match(/<content type="html">([\s\S]*?)<\/content>/)?.[1] || '';
            const id = content.match(/<id>([\s\S]*?)<\/id>/)?.[1] || Math.random().toString();
            
            const subredditMatch = content.match(/<category term="([^"]+)"/);
            const subreddit = subredditMatch ? `r/${subredditMatch[1]}` : 'reddit';
            
            items.push({
              id,
              title: decodeHtml(title),
              link,
              description: stripHtml(decodeHtml(description)).substring(0, 500),
              pubDate: pubDateStr,
              source: feed.name,
              subreddit,
            });
          }
          return items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()).slice(0, 15);
        } catch (e) {
          console.error(`Error fetching feed ${feed.name}:`, e);
          return [];
        }
      })
    );

    const flatItems = results.flat();
    return NextResponse.json({ items: flatItems });
  } catch (error) {
    console.error('RSS API Error:', error);
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
