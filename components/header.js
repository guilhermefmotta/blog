import Link from 'next/link'
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <nav className="bg-white mb-7 px-2 py-2.5  border border-gray-200 shadow-md dark:bg-[#36393F] dark:border-gray-700 sticky top-0 z-50">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href={`/`} classNameName="flex items-center ">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white cursor-pointer logo"
          >GM</span>
        </Link>
        <button data-collapse-toggle="navbar-default" data-target="#navbar-default" data-bs-toggle="collapse" data-bs-target="#navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-[#202225] dark:border-gray-700">
            <li>
              <a href="/" className={`block py-2 pr-4 pl-3 text-white rounded md:bg-transparent  md:p-0 ${router.pathname == '/' ? 'md:text-[#2563EB]' : ''} `} aria-current="page">Home</a>
            </li>
            <li>
              <a href="/about" className={`block py-2 pr-4 pl-3 text-white rounded md:bg-transparent  md:p-0 ${router.pathname == '/about' ? 'md:text-[#2563EB]' : ''} `}>About</a>
            </li>
            <li>
              <a href="contact" className={`block py-2 pr-4 pl-3 text-white rounded md:bg-transparent  md:p-0 ${router.pathname == '/contact' ? 'md:text-[#2563EB]' : ''} `}>Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav >
  )
}
