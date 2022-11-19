import me from '../public/assets/photo/avatar.png';
import Image from 'next/image'
import Works from '../public/assets/works.json';
import SocialMedias from '../components/social-medias';
import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'

import { useState, useEffect } from 'react';


function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

export default function About() {

  const size = useWindowSize();

  return (
    <>
      <Layout>
        <Head>
          <title>Guilherme Motta | Blog </title>
        </Head>
        <Container>
          <div className='flex justify-center'>
            <figure className="rounded-xl">
              <div className="pt-8 md:p-8 text-center md:text-left space-y-4 text-lg text-white font-medium">
                <blockquote>
                  <div className='flex flex-col place-items-center' >
                    <Image alt="me" src={me} style={{zoom:'100%'}} className='rounded-full mx-auto transition-opacity duration-1000 ease-out  hover:opacity-60' width={120} height={120} />
                    <SocialMedias className='rounded-full mx-auto' width={25} height={25} />
                  </div>
                  <div className='flex items-center' >
                    <div className='text-center pl-2'>
                      <p>
                        Hi 👋🏾 My name is Guilherme i'm from Florianopolis Brazil
                        currently i'm living in Lisbon Portugal
                        working as a software developer on OnRising
                      </p>
                    </div>
                  </div>
                  <hr className='mt-4 mb-4' />
                  <div className='container w-auto'>
                    <p className=''>Software developer with {new Date().getFullYear() - 2018} years of experience able to bring expertise in design, installation, testing and maintenance of software systems.</p>
                  </div>
                  <ul className='mt-4 mb-4' style={{ listStyleType: "square" }}>
                    <li>Proficient in multiple plataforms, languages such as java and javascript</li>
                    <li>Experienced with the latest state-of-the-art development tools and procedures</li>
                    <li>Able to effectively self-manage during independent projects, as well as collaborate as part of a productive team</li>
                  </ul>
                </blockquote>
              </div>
              <div className='p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
                {Works.map((work, idx) =>
                  <div key={idx} className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-[#36393F] dark:border-gray-700">
                    <a href="#">
                    </a>
                    <div className="p-5">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{work.name}</h5>
                      <div className="flex flex-col tems-center justify-between text-white">
                        <span className='text-base'>{work.job_title}</span>
                        <span className='text-sm text-gray-700 dark:text-gray-400'>{work.date_start} - {work.date_end ?? 'until the moment'}</span>
                      </div>
                      <p className="mb-3 pt-3 font-normal text-white">{work.description}</p>
                    </div>
                  </div>
                )}
              </div>
            </figure>
          </div>
        </Container>
      </Layout>
    </>
  )
}

