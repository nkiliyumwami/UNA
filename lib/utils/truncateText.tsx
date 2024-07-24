// export const truncateText = (text: string, maxWords: number) => {
//   const words = text.split(' ')
//   if (words.length > maxWords) {
//     return words.slice(0, maxWords).join(' ') + '...'
//   }
//   return text
// }


import sanitizeHtml from 'sanitize-html'

export function truncateText(html: string, maxLength: number): string {
  // Sanitize HTML to remove any tags
  const sanitizedHtml = sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  })

  // Truncate the sanitized text
  let truncated = sanitizedHtml.trim()
  if (truncated.length > maxLength) {
    truncated = truncated.substr(0, maxLength - 1) + '...'
  }

  return truncated
}
