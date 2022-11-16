import { parseISO, format } from 'date-fns'

export default function DateFormatter({ dateString }) {
  const date = parseISO(dateString)
  return <time className='underline text-gray-700 dark:text-gray-400' dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}
