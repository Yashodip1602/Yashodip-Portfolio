import { createElement } from 'react'
import { personalData } from '../data/personal'

const RESUME_FILENAME = 'Yashodip_Jejurkar_DevOps_Engineer_Resume.pdf'
const OBJECT_URL_REVOKE_DELAY_MS = 10000

function triggerBrowserDownload(href, filename) {
  const link = document.createElement('a')
  link.href = href
  link.download = filename
  link.rel = 'noopener noreferrer'
  link.style.display = 'none'

  document.body.appendChild(link)

  if ('download' in HTMLAnchorElement.prototype) {
    link.click()
  } else {
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  document.body.removeChild(link)
}

export function triggerStaticResumeFallback() {
  const fallbackUrl =
    personalData.contact.resumeUrl || `${import.meta.env.BASE_URL}resume.pdf`
  triggerBrowserDownload(fallbackUrl, RESUME_FILENAME)
}

export async function downloadResume() {
  const [{ pdf }, { default: ResumeDocument }] = await Promise.all([
    import('@react-pdf/renderer'),
    import('../components/resume/ResumeDocument')
  ])

  const blob = await pdf(createElement(ResumeDocument)).toBlob()
  const objectUrl = URL.createObjectURL(blob)

  try {
    triggerBrowserDownload(objectUrl, RESUME_FILENAME)
  } finally {
    window.setTimeout(() => {
      URL.revokeObjectURL(objectUrl)
    }, OBJECT_URL_REVOKE_DELAY_MS)
  }
}
