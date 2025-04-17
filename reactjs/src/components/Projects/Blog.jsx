import React, { useState } from "react";
import ProjectChatbot from '../Projects/ProjectChatbot';


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
                fullDescription: "Launching a crowdfunding campaign is an exciting and challenging venture. It requires a solid strategy and careful execution. This post covers the essential steps for planning a successful campaign. It starts with the importance of crafting a compelling story that resonates with your target audience. You'll also learn how to create high-quality visuals and videos to communicate your message effectively. Engaging with your potential backers through regular updates and answering their questions builds trust and strengthens the community. A key focus is on utilizing various social media platforms to reach a larger audience, along with tips on collaboration with influencers to amplify your message. Additionally, we provide advice on how to manage your campaign throughout its duration, ensuring a steady flow of donations and maximizing your funding potential.",
                image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3Jvd2RmdW5kaW5nfGVufDB8fDB8fHww"
              },
              {
                title: "Top Crowdfunding Success Stories",
                shortDescription: "Explore real-world examples of projects that exceeded expectations and learn what made them so successful.",
                fullDescription: "Crowdfunding has helped countless entrepreneurs, artists, and innovators bring their ideas to life. In this post, we dive into some of the most successful crowdfunding campaigns in history. From the initial challenges to the triumphs of achieving fundraising goals, we examine what made these projects stand out. Key elements like storytelling, establishing a personal connection with backers, and maintaining transparency are common themes in these success stories. We also analyze how these campaigns created buzz and excitement, whether through viral marketing or strategic use of social media. By studying these case studies, you can glean valuable lessons on how to position your own crowdfunding initiative for success.",
                image: "https://images.unsplash.com/photo-1671469897777-333c4a988062?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y3Jvd2RmdW5kaW5nfGVufDB8fDB8fHww"
              },
              {
                title: "The Future of Crowdfunding: Trends to Watch",
                shortDescription: "Stay ahead with insights into the latest innovations and market shifts shaping the crowdfunding landscape.",
                fullDescription: "Crowdfunding is not only a way to raise money; it’s also shaping the future of finance and entrepreneurship. This post explores the latest trends and innovations in the crowdfunding space. The rise of blockchain technology and decentralized finance (DeFi) is revolutionizing how funds are raised and managed. With decentralized platforms, backers can engage in projects without traditional intermediaries, making the process more transparent and secure. We also look at the rise of equity crowdfunding, where investors can actually own a part of the company they are funding. Additionally, we explore how AI is being used to predict project success and match backers with projects they’re likely to support. Understanding these trends will help you stay ahead of the curve and position your campaign for future success.",
                image: "https://plus.unsplash.com/premium_photo-1680396766429-ccfb5626a40d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3Jvd2RmdW5kaW5nfGVufDB8fDB8fHww"
              },
              {
                title: "Effective Marketing Strategies for Crowdfunding",
                shortDescription: "Learn the most effective marketing strategies that can help your crowdfunding campaign go viral and attract more backers.",
                fullDescription: "Marketing is critical to the success of a crowdfunding campaign, as it helps attract backers and generate excitement. This post covers the most effective marketing strategies that can help your crowdfunding campaign go viral. Starting with the importance of a well-crafted story, we discuss how to position your product or idea in a way that resonates with potential backers. We also delve into the role of influencer partnerships, which can significantly expand your reach. Social media ads, email marketing, and PR campaigns are other tools you can use to ensure your campaign gets noticed. Additionally, we explore strategies for building a strong email list and maintaining regular communication with your backers to keep them engaged throughout the campaign.",
                image: "https://images.unsplash.com/photo-1593642634367-d91a135587b5?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1080"
              },
              {
                title: "The Role of Community in Crowdfunding Success",
                shortDescription: "Explore how building a strong, supportive community can play a pivotal role in the success of your crowdfunding campaign.",
                fullDescription: "One of the most important aspects of a successful crowdfunding campaign is the community you build around it. This post explores how the involvement of a supportive community can be the key to meeting or exceeding your fundraising goals. We look at how engaging with backers, responding to their feedback, and creating a sense of belonging can motivate them to share your campaign with others. Successful campaigns often have active communities that feel a personal connection to the project’s mission. Learn how to cultivate this relationship by offering rewards, organizing virtual events, and regularly updating your supporters on the project’s progress. A strong community can turn casual backers into lifelong supporters.",
                image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29tbXVuaXR5fGVufDB8fDB8fHww"
              },
              {
                title: "Crowdfunding for Nonprofits: A Growing Trend",
                shortDescription: "Nonprofits are increasingly turning to crowdfunding as a means of raising funds. Learn how this trend is changing the landscape for charitable organizations.",
                fullDescription: "Crowdfunding has become an essential tool for nonprofits looking to raise funds, mobilize supporters, and increase awareness for their causes. In this post, we explore how nonprofits are embracing crowdfunding as a way to fuel their missions. With the rise of digital platforms, grassroots campaigns can now reach a global audience. We highlight several case studies of nonprofit campaigns that achieved significant success by effectively engaging their community and telling their stories. From environmental initiatives to social justice movements, crowdfunding has enabled nonprofits to mobilize resources quickly and efficiently. Learn how your organization can leverage crowdfunding, from crafting compelling appeals to selecting the right platform and maximizing your campaign’s impact.",
                image: "https://plus.unsplash.com/premium_photo-1661605653366-b1a6a6831cd4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29tbXVuaXR5fGVufDB8fDB8fHww"
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
        <ProjectChatbot />
      </div>
    </>
  );
}
