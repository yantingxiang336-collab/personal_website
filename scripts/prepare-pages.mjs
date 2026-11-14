import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = join(process.cwd(), 'dist')
const primary = 'https://cilare-xiang-portfolio.folksychant1.chatgpt.site'
const backup = 'https://yantingxiang336-collab.github.io/personal_website'

const htmlPath = join(dist, 'index.html')
writeFileSync(htmlPath, readFileSync(htmlPath, 'utf8').replaceAll(primary, backup))
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${backup}/sitemap.xml\n`)
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${backup}/</loc></url></urlset>\n`)
