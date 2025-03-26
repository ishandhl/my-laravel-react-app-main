import React from "react";

export default function AboutUs() {
  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply" alt="" className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">About Us</h2>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8"> Welcome to our platform! We are dedicated to providing a seamless experience for creators and investors alike. Our journey began with a simple idea: to empower individuals to bring their projects to life while offering investors unique opportunities to support innovative ventures.</p>
          </div>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600"></h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">Our Vision</p>
            <p className="mt-6 text-lg/8 text-gray-600"> At our core, we believe in the power of collaboration and creativity. Our vision is to cultivate a community where ideas flourish and dreams become reality. Whether you're a budding entrepreneur or a seasoned investor, we're here to support you every step of the way.</p>
          </div>
          <div className="mx-auto max-w-2xl lg:text-center mt-10">
            <h2 className="text-base/7 font-semibold text-indigo-600"></h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">Who We Are</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                    </svg>
                  </div>
                  The Founders
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">Our platform was founded by a passionate team of individuals who share a common goal: to democratize access to funding and foster innovation. With diverse backgrounds spanning technology, finance, and entrepreneurship, we bring a wealth of experience to the table.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                  </div>
                  Our Mission
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">Our mission is simple: to connect visionaries with the resources they need to succeed. We strive to break down barriers and provide a platform where ideas can thrive, regardless of background or experience. By harnessing the power of technology and community, we're paving the way for a brighter future.</dd>
              </div>
            </dl>
          </div>
          <div className="mx-auto max-w-2xl lg:text-center mt-10">
            <h2 className="text-base/7 font-semibold text-indigo-600"></h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">What We Offer</p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              
              <div className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </div>
                  For Creators
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">QFor creators, our platform offers a gateway to turn ideas into reality. Whether you're launching a new product, starting a passion project, or seeking funding for your startup, we provide the tools and support you need to bring your vision to life. From crowdfunding campaigns to investment opportunities, we offer flexible solutions tailored to your needs.</dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
                    </svg>
                  </div>
                  For Investors
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">For investors, our platform offers a curated selection of innovative projects and startups. Whether you're looking to diversify your portfolio or support causes you're passionate about, we provide access to exciting investment opportunities across various industries. With transparent communication and robust due diligence processes, we strive to ensure that every investment is backed by potential and purpose.</dd>
              </div>
            </dl>
          </div>
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600"></h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">Get Involved</p>
            <p className="mt-6 text-lg/8 text-gray-600 mb-5">Ready to join our community? Whether you're a creator with a groundbreaking idea or an investor seeking the next big opportunity, we invite you to explore our platform and become part of something special. Together, we can turn dreams into reality and build a brighter future for generations to come.</p>
            <div className="text-center">
            <a href="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-colors duration-300 transform hover:scale-105">
              Explore Our Platform
            </a>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
