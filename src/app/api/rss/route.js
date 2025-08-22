import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'
    const contentPath = path.join(process.cwd(), 'content/press')
    
    let pressItems = []
    
    if (fs.existsSync(contentPath)) {
      const files = fs.readdirSync(contentPath)
      
      pressItems = files
        .filter(file => file.endsWith('.md'))
        .map(file => {
          const fullPath = path.join(contentPath, file)
          const fileContents = fs.readFileSync(fullPath, 'utf8')
          const { data, content } = matter(fileContents)
          
          return {
            title: data.title,
            link: `${baseUrl}/press/${file.replace('.md', '')}`,
            description: data.excerpt || content.substring(0, 200),
            pubDate: new Date(data.date).toUTCString(),
            guid: `${baseUrl}/press/${file.replace('.md', '')}`,
          }
        })
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
    }

    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>MODEL_NAME - Press & Media</title>
    <description>Latest press coverage and media appearances by MODEL_NAME</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/press/rss.xml" rel="self" type="application/rss+xml" />
    <language>es-ES</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    
    ${pressItems.map(item => `
    <item>
      <title>${item.title}</title>
      <description><![CDATA[${item.description}]]></description>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
    </item>
    `).join('')}
  </channel>
</rss>`

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('RSS generation error:', error)
    return new NextResponse('Error generating RSS feed', { status: 500 })
  }
}
