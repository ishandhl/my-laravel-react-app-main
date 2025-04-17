import React, { useState, useRef, useEffect } from "react";
import AuthUser from "../Authentication/AuthUser";
import logoImage from "./logo.png";

export default function UjyaloBot() {
  const { http } = AuthUser();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "👋 Hello! I'm Ujyalo Bot. How can I assist you with our crowdfunding projects today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const messagesEndRef = useRef(null);

  // Enhanced default questions - 10 most useful questions
  const defaultQuestions = [
    "Show popular projects",
    "How to donate",
    "Projects ending soon", 
    "Payment methods",
    "My donations",
    "Success stories",
    "Start a project",
    "Find by category",
    "Contact support",
    "Project updates"
  ];

  // Fetch projects data on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Auto scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchProjects = () => {
    http
      .get("/home")
      .then((response) => {
        setProjects(response.data.projects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim() === "") return;

    // Add user message
    const userMessage = { type: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input and show loading
    const userQuery = input;
    setInput("");
    setLoading(true);

    // Generate response
    setTimeout(() => {
      const botResponse = generateResponse(userQuery, projects);
      setMessages((prev) => [...prev, { type: "bot", content: botResponse }]);
      setLoading(false);
    }, 700); // Simulate API response time
  };

  const handleQuickQuestion = (question) => {
    // Set input first
    setInput(question);
    
    // Add user message
    const userMessage = { type: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);
    
    // Clear input and show loading
    setInput("");
    setLoading(true);
    
    // Generate response
    setTimeout(() => {
      const botResponse = generateResponse(question, projects);
      setMessages((prev) => [...prev, { type: "bot", content: botResponse }]);
      setLoading(false);
    }, 700);
  };

  const generateResponse = (query, projectsData) => {
    const lowerQuery = query.toLowerCase();

    // Basic greeting responses
    if (
      lowerQuery.includes("hello") ||
      lowerQuery.includes("hi") ||
      lowerQuery.includes("hey") ||
      lowerQuery === "hi" ||
      lowerQuery === "hello"
    ) {
      return "👋 **Hello!** I'm Ujyalo Bot. I can help with information about our crowdfunding projects. How can I assist you today?";
    }

    // Project listing - improved formatting
    if (
      lowerQuery.includes("show project") ||
      lowerQuery.includes("list project") ||
      lowerQuery.includes("what project") ||
      lowerQuery === "projects"
    ) {
      if (projectsData.length === 0) {
        return "📊 **No Projects Available**\n\nI don't have any project information at the moment. Please try again later.";
      }

      return `📋 **Available Projects**

We currently have ${projectsData.length} projects seeking funding:

${projectsData
  .slice(0, 5)
  .map(
    (p) =>
      `• **${p.project_title}** (${p.type})
↳ Goal: Rs. ${parseFloat(p.funding_goal).toLocaleString()}
↳ ${p.short_description?.substring(0, 60)}${
        p.short_description?.length > 60 ? "..." : ""
      }`
  )
  .join("\n\n")}

Need more specific projects? Try asking "Find by category" or "Show popular projects".`;
    }

    // How to fund/donate - enhanced answer
    if (
      lowerQuery.includes("how to fund") ||
      lowerQuery.includes("how do i fund") ||
      lowerQuery.includes("how can i fund") ||
      lowerQuery.includes("funding process") ||
      lowerQuery.includes("donate") ||
      lowerQuery.includes("contribute") ||
      lowerQuery.includes("investment") ||
      lowerQuery.includes("support project")
    ) {
      return `💰 **How to Donate**

Follow these simple steps:

• Select a project that inspires you
• Click "Fund This Project" on the project page
• Choose your contribution amount
• Select your payment method
• Complete the payment process

After donating, you'll receive:
• Confirmation email with details
• Regular project updates
• Rewards (if applicable)

Want to see projects needing support? Ask to "Show popular projects".`;
    }

    // Project type questions - focus on crowdfunding
    if (
      lowerQuery.includes("crowdfund") ||
      lowerQuery.includes("about crowdfunding") ||
      lowerQuery.includes("why crowdfunding") ||
      lowerQuery.includes("why should i")
    ) {
      const crowdfundProjects = projectsData.filter(
        (p) => p.type === "Crowdfund"
      );

      // First explain crowdfunding benefits
      return `ℹ️ **About Crowdfunding**

Crowdfunding creates a community of supporters who bring innovative ideas to life:

• Direct impact on projects you care about
• Join others to make big changes possible
• Receive exclusive rewards based on your support
• 100% of funds go to verified project creators

Would you like to see our current crowdfunding opportunities?`;
    }

    // Popular projects / Where should I donate
    if (
      lowerQuery.includes("popular project") ||
      lowerQuery.includes("where should i donate") ||
      lowerQuery.includes("suggest project") ||
      lowerQuery.includes("recommend project")
    ) {
      if (projectsData.length === 0)
        return "I don't have any project information at the moment.";

      const projectsWithPercentage = projectsData.map((p) => {
        const percentage =
          (parseFloat(p.total_amount_raised || 0) /
            parseFloat(p.funding_goal)) *
          100;
        return { ...p, fundingPercentage: percentage };
      });

      const sortedByFunding = [...projectsWithPercentage].sort(
        (a, b) => b.fundingPercentage - a.fundingPercentage
      );
      const topFunded = sortedByFunding.slice(0, 3);

      return `🌟 **Top Recommended Projects**

These popular projects are making waves:

${topFunded
  .map(
    (p) =>
      `• **${p.project_title}** (${p.type})
↳ ${p.fundingPercentage.toFixed(1)}% funded of Rs. ${parseFloat(
        p.funding_goal
      ).toLocaleString()}
↳ ${p.short_description?.substring(0, 60)}${
        p.short_description?.length > 60 ? "..." : ""
      }`
  )
  .join("\n\n")}

Would you like details about any of these projects?`;
    }

    // Find by category - NEW FEATURE
    if (
      lowerQuery.includes("category") ||
      lowerQuery.includes("find by") ||
      lowerQuery.includes("by type") ||
      lowerQuery.includes("browse by")
    ) {
      if (projectsData.length === 0) {
        return "📊 **No Projects Available**\n\nI don't have any project information at the moment. Please try again later.";
      }

      // Extract unique categories
      const categories = [...new Set(projectsData.map(p => p.type))];
      
      return `🔍 **Projects by Category**

Browse our projects by category:

${categories.map(cat => `• **${cat}**: ${projectsData.filter(p => p.type === cat).length} projects available`).join('\n')}

Which category interests you most?`;
    }

    // Questions about specific projects
    for (const project of projectsData) {
      if (
        lowerQuery.includes(project.project_title.toLowerCase()) ||
        (project.short_description &&
          lowerQuery.includes(
            project.short_description.toLowerCase().substring(0, 15)
          ))
      ) {
        // Format funding numbers
        const raised = parseFloat(
          project.total_amount_raised || 0
        ).toLocaleString();
        const goal = parseFloat(project.funding_goal).toLocaleString();

        // Calculate funding percentage
        const fundingPercentage = (
          (parseFloat(project.total_amount_raised || 0) /
            parseFloat(project.funding_goal)) *
          100
        ).toFixed(1);

        // Calculate days remaining
        const endDate = new Date(project.end_date);
        const today = new Date();
        const diffTime = endDate - today;
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Get project status with emoji
        const isExpired = daysLeft <= 0;
        const hasReachedGoal =
          parseFloat(project.total_amount_raised || 0) >=
          parseFloat(project.funding_goal);

        let statusText = "";
        if (isExpired && hasReachedGoal) statusText = "✅ Successfully Funded";
        else if (isExpired) statusText = "⏱️ Campaign Ended";
        else if (hasReachedGoal) statusText = "🎉 Goal Reached!";
        else statusText = `⏳ Active - ${daysLeft} days remaining`;

        return `📊 **${project.project_title}**

${project.short_description}

• Funding: Rs. ${raised} of Rs. ${goal}
• Progress: ${fundingPercentage}% complete
• Status: ${statusText}

Ready to support this project? Click "Fund This Project" on the project page!`;
      }
    }

    // Enhanced ending soon with progress info
    if (
      lowerQuery.includes("ending soon") ||
      lowerQuery.includes("last chance")
    ) {
      const today = new Date();
      const projectsWithDays = projectsData
        .map((p) => {
          const endDate = new Date(p.end_date);
          const diffTime = endDate - today;
          const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const fundingPercentage = (
            (parseFloat(p.total_amount_raised || 0) /
              parseFloat(p.funding_goal)) *
            100
          ).toFixed(1);
          return { ...p, daysLeft, fundingPercentage };
        })
        .filter((p) => p.daysLeft > 0 && p.daysLeft < 14); // Only show projects ending within 2 weeks

      if (projectsWithDays.length === 0) {
        return "⏰ **No Urgent Projects**\n\nThere are no projects ending soon at the moment.";
      }

      const sortedByEndDate = projectsWithDays.sort(
        (a, b) => a.daysLeft - b.daysLeft
      );
      const soonest = sortedByEndDate.slice(0, 3);

      return `⏰ **Last Chance Projects**

These projects need your support soon:

${soonest
  .map(
    (p) =>
      `• **${p.project_title}**
↳ Only ${p.daysLeft} days left!
↳ Currently at ${p.fundingPercentage}% of goal`
  )
  .join("\n\n")}

Which project would you like to support before time runs out?`;
    }

    // Payment related questions - enhanced response
    if (
      lowerQuery.includes("payment") ||
      lowerQuery.includes("pay") ||
      lowerQuery.includes("transaction") ||
      lowerQuery.includes("credit card") ||
      lowerQuery.includes("debit card") ||
      lowerQuery.includes("bank transfer")
    ) {
      return `💳 **Payment Options**

We offer these secure payment methods:

• **Mobile Wallet**: Quick via Khalti
• **Bank Transfer**: Direct deposit
• **ConnectIPS**: Instant payments

All transactions are secure and encrypted. After payment, you'll receive:
• Email confirmation
• Receipt for your records
• Project updates

Do you have questions about a specific payment method?`;
    }

    // My donations / track my donations
    if (
      lowerQuery.includes("my donation") ||
      lowerQuery.includes("track donation") ||
      lowerQuery.includes("my contribution") ||
      lowerQuery.includes("donation history")
    ) {
      return `📱 **My Donations**

View all your donations by:

• Log into your account
• Visit your profile page
• Click the "My Donations" tab

There you'll find:
• Complete contribution history
• Current project status
• Impact reports
• Tax receipts

Need help finding a specific donation?`;
    }

    // Project updates - NEW FEATURE
    if (
      lowerQuery.includes("project update") ||
      lowerQuery.includes("update") ||
      lowerQuery.includes("progress report") ||
      lowerQuery.includes("status update")
    ) {
      return `📢 **Project Updates**

Stay informed about your supported projects:

• Updates appear on your dashboard
• Email notifications for major milestones
• Monthly progress summaries
• Impact reports after completion

You can customize update frequency in your account settings.

Would you like to see updates from a specific project?`;
    }

    // Success stories
    if (
      lowerQuery.includes("success stories") ||
      lowerQuery.includes("success") ||
      lowerQuery.includes("completed project") ||
      lowerQuery.includes("successful project")
    ) {
      return `🎉 **Success Stories**

Our platform has helped bring amazing projects to life:

• **Community Garden**: Exceeded goal by 127%, created green spaces in 5 neighborhoods

• **Clean Water Initiative**: Reached 115% funding, providing clean water to 2,000+ people

• **Mobile Education Lab**: Funded at 143%, now serves 15 rural schools

Would you like to browse all our successfully funded projects?`;
    }

    // How to start a project
    if (
      lowerQuery.includes("start a project") ||
      lowerQuery.includes("create project") ||
      lowerQuery.includes("submit project") ||
      lowerQuery.includes("propose project") ||
      lowerQuery.includes("project application")
    ) {
      return `🚀 **Start a Project**

Ready to bring your idea to life? Follow these steps:

• Click "Start a Project" in the main menu
• Complete our guided application form
• Include photos and detailed descriptions
• Set a realistic funding goal and timeline
• Submit for review (2-3 days)

Our team is available to help you create a compelling campaign.

Need guidance on any specific part of this process?`;
    }

    // Contact support
    if (
      lowerQuery.includes("contact") ||
      lowerQuery.includes("support") ||
      lowerQuery.includes("help desk") ||
      lowerQuery.includes("customer service") ||
      lowerQuery.includes("talk to human") ||
      lowerQuery.includes("real person")
    ) {
      return `📞 **Contact Support**

Our support team is here to help:

• **Email**: support@ujyalo.com
• **Phone**: +977-01-123456
• **Live Chat**: 9AM-6PM NPT weekdays
• **Office**: Ujyalo Foundation, Kathmandu

For urgent payment or security issues, call our priority line: +977-01-654321

What kind of assistance do you need today?`;
    }

    // General help with enhanced options
    if (lowerQuery.includes("help") || lowerQuery.includes("what can you do")) {
      return `👋 **I'm Here to Help!**

I can assist with:

• Finding projects that match your interests
• Explaining how to donate
• Showing projects ending soon
• Explaining payment options
• Tracking your donations
• Starting your own project
• Contacting our support team

Feel free to ask anything about our platform!`;
    }

    // Default response for unknown queries
    return "I'm not sure I understand. You can ask me about our projects, how to donate, payment methods, or starting your own project. Try one of the quick options below.";
  };

  return (
    <>
      {/* Chat button fixed at bottom right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat window - increased height */}
      <div
        className={`fixed bottom-20 right-6 w-96 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 z-50 flex flex-col ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{ maxHeight: "85vh" }}
      >
        {/* Chat header with logo space */}
        <div className="bg-blue-600 text-white rounded-t-lg p-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo space */}
            <div className="h-8 w-8 bg-white rounded-full mr-2 flex items-center justify-center overflow-hidden">
              {/* Actual logo image */}
              <img
                src={logoImage}
                alt="Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="font-medium">Ujyalo Bot</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages area - increased height */}
        <div
          className="flex-1 p-4 overflow-y-auto"
          style={{ maxHeight: "60vh" }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.type === "bot" && (
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2 flex-shrink-0">
                  {/* Bot icon - you can replace with your logo */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              )}
              <div
                className={`px-3 py-2 rounded-lg max-w-[80%] ${
                  message.type === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {/* Parse markdown for bold text and emojis within responses */}
                <div className="whitespace-pre-line">
                  {message.content.split("\n").map((line, i) => (
                    <p
                      key={i}
                      className="mb-1"
                      dangerouslySetInnerHTML={{
                        __html: line.replace(
                          /\*\*(.*?)\*\*/g,
                          "<strong>$1</strong>"
                        ),
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-2 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg rounded-bl-none flex items-center">
                <div className="dot-typing"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick questions - better organized */}
        <div className="px-4 py-3 bg-gray-50 border-t border-b border-gray-200">
          <p className="text-xs text-gray-500 mb-2">Quick Questions:</p>
          <div className="flex flex-wrap gap-2">
            {defaultQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="bg-white border border-blue-300 hover:bg-blue-50 text-blue-600 text-xs py-1 px-3 rounded-full transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="p-3">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
              disabled={input.trim() === ""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2 12l10 10V2L2 12z"
                  transform="rotate(90 12 12)"
                />
              </svg>
            </button>
          </div>
        </form>

        {/* CSS for typing animation */}
        <style jsx>{`
          .dot-typing {
            position: relative;
            left: -9999px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #6b7280;
            color: #6b7280;
            box-shadow: 9984px 0 0 0 #6b7280, 9999px 0 0 0 #6b7280,
              10014px 0 0 0 #6b7280;
            animation: dotTyping 1.5s infinite linear;
          }

          @keyframes dotTyping {
            0% {
              box-shadow: 9984px 0 0 0 #6b7280, 9999px 0 0 0 #6b7280,
                10014px 0 0 0 #6b7280;
            }
            16.667% {
              box-shadow: 9984px -10px 0 0 #6b7280, 9999px 0 0 0 #6b7280,
                10014px 0 0 0 #6b7280;
            }
            33.333% {
              box-shadow: 9984px 0 0 0 #6b7280, 9999px 0 0 0 #6b7280,
                10014px 0 0 0 #6b7280;
            }
            50% {
              box-shadow: 9984px 0 0 0 #6b7280, 9999px -10px 0 0 #6b7280,
                10014px 0 0 0 #6b7280;
            }
            66.667% {
              box-shadow: 9984px 0 0 0 #6b7280, 9999px 0 0 0 #6b7280,
                10014px 0 0 0 #6b7280;
            }
            83.333% {
              box-shadow: 9984px 0 0 0 #6b7280, 9999px 0 0 0 #6b7280,
                10014px -10px 0 0 #6b7280;
            }
            100% {
              box-shadow: 9984px 0 0 0 #6b7280, 9999px 0 0 0 #6b7280,
                10014px 0 0 0 #6b7280;
            }
          }
        `}</style>
      </div>
    </>
  );
}