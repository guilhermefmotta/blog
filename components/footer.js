import Container from './container'
import { useSubscribeToNewsletter } from '../hooks/subscribe-to-newsletter';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export default function Footer() {

  const { form, subscribe, inputEl } = useSubscribeToNewsletter();

  useEffect(() => {
    if (form.state === 'error') {
      toast.error("Oops, something wasn't right")
    } else if (form.state === 'sucess') {
      toast.success("Yay, now you'll receive our newsletterYay! you'll recive")
    }

  }, [form.state]);


  return (
    <footer className="bg-white px-2 py-2.5  border border-gray-200 shadow-md dark:bg-[#36393F] dark:border-gray-700">
      <Container>
        <form onSubmit={subscribe}>
          <div className='grid lg:grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-1'>
            <div className='items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0'>
              <p className='text-white'>
                © {new Date().getFullYear()} Guilherme Motta. All Rights reserved
              </p>
            </div>
            <div className="col-span-2 items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
              <div className='mr-5'>
                <h2 className='text-white text-2xl'>Sign up for our newsletter</h2>
                <p className='text-sm text-gray-700 dark:text-gray-400'>Stay up to date with the blog.</p>
              </div>
              <div className="relative ">
                <label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                </div>
                <input className="block p-3 pl-10 w-full text-sm text-gray-900  rounded-lg  sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500  dark:border-gray-600  dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:bg-[#40444B]" placeholder="Enter your email" type="email" id="email" ref={inputEl} required />
              </div>
              <div>
                <button type="submit" className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg  cursor-pointer  sm:rounded-none sm:rounded-r-lg focus:ring-4 focus:ring-primary-300 bg-blue-700 hover:bg-blue-800 focus:ring-4  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Subscribe</button>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </footer>
  )
}
