import { generatePageMetadata } from '../../lib/metadata'

export const metadata = generatePageMetadata('Blog', {
  title: 'Blog - Ana Nicoleta',
  description: 'Insights, experiences, and stories from my journey as a professional model and actress. Behind-the-scenes content, industry tips, and personal reflections.',
  keywords: [
    'modeling blog',
    'fashion blog',
    'modeling tips',
    'behind the scenes',
    'fashion industry',
    'modeling career',
    'professional modeling',
    'fashion photography',
    'modeling experience'
  ],
  image: '/photos/editorial_1.jpg'
})

export default function BlogLayout({ children }) {
  return children
}
