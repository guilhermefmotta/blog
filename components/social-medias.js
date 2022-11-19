import Image from 'next/image'
import Link from 'next/link'

export default function SocialMedias({ className, width, height }) {
    return (
        <>
            <div className={`${className}`}>
                <ul className="inline-block">
                    <li className="inline-block cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                        <Link href='https://www.linkedin.com/in/guilherme-motta-31a964142/' >
                            <Image width={width} height={height} src="/assets/photo/linkedin.svg" />
                        </Link>
                    </li>
                    <li className="inline-block cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                        <Link href="https://github.com/guilhermefmotta" >
                            <Image width={height} height={height} src="/assets/photo/github.svg" />
                        </Link>
                    </li>
                </ul>

            </div>
        </>
    );
}