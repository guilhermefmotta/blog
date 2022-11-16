import Footer from '../components/footer'
import Meta from '../components/meta'
import Header from './header'
import SocialMedias from './social-medias'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Header />
        <main className='relative'>{children}</main>
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}
