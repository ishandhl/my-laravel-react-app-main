import React, { useState, useRef, useEffect } from "react";
import AuthUser from "../Authentication/AuthUser";

export default function ProjectChatbot() {
  const { http } = AuthUser();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: "bot", 
      content: "Hello! I'm here to help you with information about our projects. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const messagesEndRef = useRef(null);

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
    http.get('/home')
      .then((response) => {
        setProjects(response.data.projects);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user message
    const userMessage = { type: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and show loading
    setInput("");
    setLoading(true);
    
    // Generate response
    setTimeout(() => {
      const botResponse = generateResponse(input, projects);
      setMessages(prev => [...prev, { type: "bot", content: botResponse }]);
      setLoading(false);
    }, 700); // Simulate API response time
  };

  const generateResponse = (query, projectsData) => {
    const lowerQuery = query.toLowerCase();
    
    // Project listing questions
    if (lowerQuery.includes("show all projects") || lowerQuery.includes("list projects") || lowerQuery.includes("what projects") || lowerQuery === "projects") {
      if (projectsData.length === 0) {
        return "I don't have any project information at the moment. Please try again later.";
      }
      
      return `We currently have ${projectsData.length} projects: \n\n${projectsData.map(p => `• **${p.project_title}** (${p.type})`).join('\n')}`;
    }
    
    // Project type questions
    if (lowerQuery.includes("crowdfund") || lowerQuery.includes("invest")) {
      const type = lowerQuery.includes("crowdfund") ? "Crowdfund" : "Invest";
      const filteredProjects = projectsData.filter(p => p.type === type);
      
      if (filteredProjects.length === 0) {
        return `We don't currently have any ${type.toLowerCase()} projects.`;
      }
      
      return `We have ${filteredProjects.length} ${type.toLowerCase()} projects: \n\n${filteredProjects.map(p => `• **${p.project_title}**`).join('\n')}`;
    }
    
    // Questions about specific projects
    for (const project of projectsData) {
      if (lowerQuery.includes(project.project_title.toLowerCase()) || 
          (project.short_description && lowerQuery.includes(project.short_description.toLowerCase().substring(0, 15)))) {
        
        // Format funding numbers
        const raised = parseFloat(project.total_amount_raised || 0).toLocaleString();
        const goal = parseFloat(project.funding_goal).toLocaleString();
        
        // Calculate funding percentage
        const fundingPercentage = ((parseFloat(project.total_amount_raised || 0) / parseFloat(project.funding_goal)) * 100).toFixed(2);
        
        // Calculate days remaining
        const endDate = new Date(project.end_date);
        const today = new Date();
        const diffTime = endDate - today;
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return `**${project.project_title}** (${project.type})\n\n` +
               `${project.short_description}\n\n` +
               `• Funding: Rs. ${raised} raised of Rs. ${goal} (${fundingPercentage}%)\n` +
               `• Status: ${daysLeft > 0 ? `${daysLeft} days remaining` : 'Campaign ended'}\n` +
               `• Created: ${new Date(project.created_at).toLocaleDateString()}\n\n` +
               `Would you like to know more about this project or see others?`;
      }
    }
    
    // Questions about funding goals
    if (lowerQuery.includes("highest funding") || lowerQuery.includes("biggest project")) {
      if (projectsData.length === 0) return "I don't have any project information at the moment.";
      
      const sortedByGoal = [...projectsData].sort((a, b) => parseFloat(b.funding_goal) - parseFloat(a.funding_goal));
      const highest = sortedByGoal[0];
      
      return `The project with the highest funding goal is **${highest.project_title}** with Rs. ${parseFloat(highest.funding_goal).toLocaleString()}.`;
    }
    
    // Questions about ending soon
    if (lowerQuery.includes("ending soon") || lowerQuery.includes("last chance")) {
      const today = new Date();
      const projectsWithDays = projectsData.map(p => {
        const endDate = new Date(p.end_date);
        const diffTime = endDate - today;
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { ...p, daysLeft };
      }).filter(p => p.daysLeft > 0);
      
      if (projectsWithDays.length === 0) {
        return "There are no active projects ending soon.";
      }
      
      const sortedByEndDate = projectsWithDays.sort((a, b) => a.daysLeft - b.daysLeft);
      const soonest = sortedByEndDate.slice(0, 3);
      
      return `Projects ending soon:\n\n${soonest.map(p => `• **${p.project_title}** - ${p.daysLeft} days left`).join('\n')}`;
    }
    
    // General help or unknown questions
    if (lowerQuery.includes("help") || lowerQuery.includes("what can you do")) {
      return "I can help you with information about our projects. You can ask me about:\n\n" +
             "• List of all projects\n" +
             "• Details about specific projects\n" +
             "• Crowdfunding or investment projects\n" +
             "• Projects ending soon\n" +
             "• Projects with highest funding goals\n\n" +
             "What would you like to know?";
    }
    
    // Default response for unknown queries
    return "I'm not sure I understand. You can ask me about our projects, like 'Show all projects', 'Tell me about Café Indigo', or 'Which projects are ending soon?'";
  };

  return (
    <>
      {/* Chat button fixed at bottom right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-20 right-6 w-96 bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 z-50 flex flex-col ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{ maxHeight: "80vh" }}
      >
        {/* Chat header */}
        <div className="bg-blue-600 text-white rounded-t-lg p-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="font-medium">Project Assistant</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: "50vh" }}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[80%] ${
                  message.type === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {/* Parse markdown for bold text within responses */}
                {message.content.split('\n').map((line, i) => (
                  <p key={i} className="whitespace-pre-line mb-1">
                    {line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
                  </p>
                ))}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start mb-4">
              <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none flex items-center">
                <div className="dot-typing"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="border-t p-4">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our projects..."
              className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12l10 10V2L2 12z" transform="rotate(90 12 12)" />
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
            box-shadow: 9984px 0 0 0 #6b7280, 9999px 0 0 0 #6b7280, 10014px 0 0 0 #6b7280;
            animation: dotTyping 1.5s infinite linear;
          }

          @keyframes dotTyping {
            0% {
              box-shadow: 9984px 0 0 0 #6b7280, 9999px 0 0 0 #6b7280, 10014px 0 0 0 #6b7280;
            }
            16.667% {
              box-shadow: 9984px -10px 0 0 #6b7280, 9999px 0 0 0 #6b7280, 10014px 0 0 0 #6b7280;
            }
            33.333% {
              box-shadow: 9984px 0 0 0 #6b7280, 9999px 0 0 0 #6b7280, 10014px 0 0 0 #6b7280;
            }
            50% {
              box-shadow: 9984px 0 0 0 #6b7280, 9999px -10px 0 0 #6b7280, 10014px 0 0 0 #6b7280;
            }
            66.667% {
              box-shadow: 9984px 0 0 0 #6b7280, 9999px 0 0 0 #6b7280, 10014px 0 0 0 #6b7280;
            }
            83.333% {
              box-shadow: 9984px 0 0 0 #6b7280, 9999px 0 0 0 #6b7280, 10014px -10px 0 0 #6b7280;
            }
            100% {
              box-shadow: 9984px 0 0 0 #6b7280, 9999px 0 0 0 #6b7280, 10014px 0 0 0 #6b7280;
            }
          }
        `}</style>
      </div>
    </>
  );
}