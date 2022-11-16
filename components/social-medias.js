import Image from 'next/image'
import Link from 'next/link'

import LinkedinIcon from '../public/assets/photo/linkedin.svg';
import GithubIcon from '../public/assets/photo/github.svg';

export default function SocialMedias({ className, width, height }) {
    return (
        <>
            <div className={`${className}`}>
                <ul className="inline-block">
                    <li className="inline-block cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                        <Link href='https://www.linkedin.com/in/guilherme-motta-31a964142/' >
                            <Image width={width} src={LinkedinIcon} />
                        </Link>
                    </li>
                    <li className="inline-block cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                        <Link href="https://github.com/guilhermefmotta" >
                            <Image width={height} src={GithubIcon} />
                        </Link>
                    </li>
                </ul>

            </div>
        </>
    );
}