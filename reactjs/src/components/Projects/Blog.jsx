import React, { useState } from "react";

export default function Blog() {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index); // Toggle between showing and hiding
  };

  return (
    <>
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2830&h=1500&q=80"
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center"
        />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">Our Blog</h2>
            <p className="mt-8 text-lg font-medium text-gray-300 sm:text-xl/8">
              Stay updated with the latest trends, insights, and success stories from the world of crowdfunding. Explore inspiring journeys, expert advice, and more.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              {
                title: "How to Launch a Successful Crowdfunding Campaign",
                shortDescription: "Discover essential strategies for planning, marketing, and executing a crowdfunding campaign that stands out.",
                fullDescription: "In this post, we delve deep into proven methods for launching a successful crowdfunding campaign, including tips for creating compelling content, engaging with potential backers, and leveraging social media.",
                image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3Jvd2RmdW5kaW5nfGVufDB8fDB8fHww"
              },
              {
                title: "Top Crowdfunding Success Stories",
                shortDescription: "Explore real-world examples of projects that exceeded expectations and learn what made them so successful.",
                fullDescription: "We showcase some of the most successful crowdfunding campaigns and highlight the key factors that contributed to their success. From engaging storytelling to effective marketing, discover how these projects hit their goals.",
                image: "https://images.unsplash.com/photo-1671469897777-333c4a988062?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3Jvd2RmdW5kaW5nfGVufDB8fDB8fHww"
              },
              {
                title: "The Future of Crowdfunding: Trends to Watch",
                shortDescription: "Stay ahead with insights into the latest innovations and market shifts shaping the crowdfunding landscape.",
                fullDescription: "As crowdfunding evolves, new trends and technologies are reshaping the way projects are funded. Learn about the latest developments, such as blockchain and decentralized finance (DeFi), and how they might impact the crowdfunding industry in the coming years.",
                image: "https://plus.unsplash.com/premium_photo-1680396766429-ccfb5626a40d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3Jvd2RmdW5kaW5nfGVufDB8fDB8fHww"
              },
              {
                title: "Effective Marketing Strategies for Crowdfunding",
                shortDescription: "Learn the most effective marketing strategies that can help your crowdfunding campaign go viral and attract more backers.",
                fullDescription: "From influencer partnerships to social media ads, we explore the marketing tactics that have made crowdfunding campaigns successful. Discover how to amplify your campaign's reach and engage with your audience.",
                image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080"
              },
              {
                title: "The Role of Community in Crowdfunding Success",
                shortDescription: "Explore how building a strong, supportive community can play a pivotal role in the success of your crowdfunding campaign.",
                fullDescription: "In this post, we look at the importance of community building in crowdfunding. Successful campaigns often stem from active, engaged backers who feel invested in the project's success. Learn how to nurture this relationship.",
                image: "https://images.unsplash.com/photo-1592184158011-4699e28a79b5?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080"
              },
              {
                title: "Crowdfunding for Nonprofits: A Growing Trend",
                shortDescription: "Nonprofits are increasingly turning to crowdfunding as a means of raising funds. Learn how this trend is changing the landscape for charitable organizations.",
                fullDescription: "We discuss how nonprofits are leveraging crowdfunding to support their missions, with case studies showing how grassroots campaigns can make a big impact. Learn how to effectively run a crowdfunding campaign for a charitable cause.",
                image: "https://images.unsplash.com/photo-1602297153695-900da44de736?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080"
              }
            ].map((post, index) => (
              <article key={index} className="bg-gray-100 rounded-lg shadow-lg p-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-2xl font-bold text-gray-900 mt-6">{post.title}</h3>
                <p className="mt-4 text-gray-600">
                  {expanded === index ? post.fullDescription : post.shortDescription}
                </p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleExpand(index);
                  }}
                  className="mt-4 inline-block text-indigo-600 font-semibold hover:underline"
                >
                  {expanded === index ? "Read less →" : "Read more →"}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
