import Avatar from '../components/avatar'
import DateFormatter from '../components/date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  timeReader,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-[#36393F] dark:border-gray-700">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <DateFormatter dateString={date} />
        <span className="text-sm">{timeReader}</span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href={`/posts/${slug}`}>{title}</a></h2>
      <p className="mb-5 font-light tracking-tight text-gray-900 dark:text-white">{excerpt}</p>
      <div className="flex justify-end items-center ">
        <Link href={`/posts/${slug}`} >
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Read more
          </button>
        </Link>
      </div>
    </article>


  )
}

