import { useState } from 'react';
import { toast } from 'react-toastify';
import Container from '../components/container'
import Layout from '../components/layout'
import SocialMedias from '../components/social-medias';

import Head from 'next/head'

export default function Contact() {
	const [formPost, setFormPost] = useState({});

	const handleSubmit = async (e) => {
		let form = {};
		for (var it of e.target) {
			if (it.name !== "") {
				form[it.name] = it.value
			}
		}
		setFormPost(form);

		const res = await fetch("/api/send-email", {
			body: JSON.stringify({
				email: formPost,
				fullname: formPost.firstname + ' ' + formPost.lastname,
				subject: formPost.subject,
				message: formPost.message,
			}),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});
		setFormPost({});

		const { error } = await res.json();
		if (error) {
			toast.error("Oops, something wasn't right")
			return;
		}
	}

	return (
		<>
			<Layout>
				<Head>
					<title>Guilherme Motta | Blog </title>
				</Head>
				<Container>
					<div className="container mx-auto w-2/3">
						<div className='grid lg:grid-cols-3 gap-4 sm:grid-cols-1 md:grid-cols-1'>
							<div className='col-span-2 self-center mb-10'>
								<h1 className='text-white pb-5 text-5xl'>Contact</h1>
								<p className='text-white sm:text-1xl md:text-2xl lg:text-2xl'>Need to get in touch with me? Either fill out the form or use the links bellow with your inquiry</p>

								<SocialMedias className='rounded-full mx-auto' width={45} height={45} />
							</div>

							<div className='container mx-auto'>
								<form action="#" className="space-y-8" onSubmit={handleSubmit} autoComplete="none">
									<div className='flex justify-between flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row lg:space-x-2 xl:space-x-2 2xl:space-x-2'>
										<div>
											<label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First Name</label>
											<input type="firstName" name="firstname" id="firstName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light dark:bg-[#40444B]" required placeholder='First Name' />
										</div>
										<div className='mt-8 lg:mt-0 xl:mt-0 2xl:mt-0'>
											<label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last Name</label>
											<input type="lastName" name="lastname" id="lastName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light dark:bg-[#40444B]" required placeholder='Last Name' />
										</div>
									</div>
									<div>
										<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
										<input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5  dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light dark:bg-[#40444B]" required placeholder='Email' />
									</div>
									<div>
										<label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
										<input type="text" name="subject" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500  dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light dark:bg-[#40444B]" required placeholder='Subject' />
									</div>
									<div className="sm:col-span-2">
										<label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
										<textarea id="message" name="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500  dark:border-gray-600  dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:bg-[#40444B]" placeholder='Your message'></textarea>
									</div>
									<button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
										Submit
									</button>
								</form>
							</div>
						</div>
					</div>

				</Container>
			</Layout>
		</>

	)
}