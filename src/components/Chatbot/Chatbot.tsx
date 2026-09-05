import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Knowledge base from Muhammad Waqas's CV
const knowledgeBase: { keywords: string[]; response: string }[] = [
  {
    keywords: ["hello", "hi", "hey", "assalam", "salam", "greet"],
    response:
      "Assalam-o-Alaikum! 👋 I'm Waqas's portfolio assistant. I can tell you about his skills, projects, experience, education, or contact details. What would you like to know?",
  },
  {
    keywords: ["name", "who", "kaun", "about", "introduce", "yourself"],
    response:
      "I'm the portfolio assistant of **Muhammad Waqas** — a Backend & PWA Developer from Vehari, Punjab, Pakistan. He specializes in building scalable RESTful APIs, Progressive Web Apps, and production-grade systems using Node.js, Express.js, and MongoDB.",
  },
  {
    keywords: ["skill", "technology", "tech", "stack", "tools", "kya aata"],
    response:
      "🛠️ **Waqas's Core Skills:**\n\n**Backend:** Node.js, Express.js, REST APIs, MVC Architecture\n**Database:** MongoDB, Mongoose, MySQL, SQL Server\n**Auth & Security:** JWT, RBAC, bcrypt, Custom Middlewares\n**PWA:** Service Workers, Offline-first, Installable Apps\n**DevOps:** AWS, Railway, Render, Vercel, Nginx, SSL, Custom Domain Setup\n**Tools:** Git, GitHub, Postman, Cloudinary, Redis\n**Frontend Basics:** React.js, HTML5, CSS3, JavaScript ES6+",
  },
  {
    keywords: ["project", "work", "portfolio", "kaam", "banaya", "built"],
    response:
      "🚀 **Key Projects:**\n\n1️⃣ **Cheema Milk Collection & Distribution** — Full dairy logistics platform (Team Lead & Backend/PWA Dev)\n🔗 cheemamilkcollection.com\n\n2️⃣ **Pro-Pakistan HMS** — Hospital Management System with RBAC & live deployment\n🔗 codedcloudshms.com\n\n3️⃣ **HRM System** — Enterprise HR with attendance, payroll, leave & task tracking\n\n4️⃣ **Pro-Pakistan Web Platform** — Full-featured PWA with independent hosting\n🔗 pakistanrecoveryoasis.com",
  },
  {
    keywords: ["experience", "career", "job", "company", "work history", "tajruba", "kahan"],
    response:
      "💼 **Work Experience:**\n\n🔹 **Backend Developer & Team Lead** — Coded Clouds, Lahore (June 2026 – Present)\nLead Backend/PWA Developer for multiple production platforms.\n\n🔹 **Backend Developer (Remote)** — Whole Cure Tech (April 2026 – Present)\nBuilt HRM with RBAC, attendance, payroll & JWT security.\n\n🔹 **Backend Developer** — Convert Generation Technology, Faisalabad (Dec 2024 – June 2025)\nE-commerce backends, payment gateways & AI data processing systems.",
  },
  {
    keywords: ["education", "degree", "university", "study", "padhai", "qualification"],
    response:
      "🎓 **Education:**\n\n📘 **BS Software Engineering** — The Islamia University of Bahawalpur (2020 – 2024)\nSpecialized in Software Architecture, Database Systems & Web Engineering.\n\n📗 **ICS (Intermediate in Computer Science)** — Superior College Vehari, BISE Multan (2018 – 2020)\n\n📙 **Matriculation (Science)** — Abdul Khaliq School, Vehari (2016 – 2018)\n\n📜 Certified in Microsoft Office & Digital Skills.",
  },
  {
    keywords: ["contact", "email", "phone", "number", "reach", "hire", "rabta", "call", "whatsapp"],
    response:
      "📬 **Contact Muhammad Waqas:**\n\n💬 WhatsApp: (+92) 306-9377493 (Click the green WhatsApp button on the bottom-right!)\n📧 Email: mwaqasjutt17@gmail.com\n📱 Phone: (+92) 306-9377493\n📍 Location: Vehari, Punjab, Pakistan\n🌐 Portfolio: engrmwaqas.online\n💼 LinkedIn: engr-muhammad-waqas\n💻 GitHub: muhammad-engr-waqas\n\nHe's currently **available for work** and open to new opportunities!",
  },
  {
    keywords: ["hms", "hospital", "management"],
    response:
      "🏥 **Pro-Pakistan HMS** is a complete Hospital Management System built by Waqas.\n\n• End-to-end backend with Node.js, Express.js & MongoDB\n• Role-Based Access Control (RBAC) for different user roles\n• Custom domain setup & production deployment\n• Live at: codedcloudshms.com",
  },
  {
    keywords: ["cheema", "milk", "dairy"],
    response:
      "🥛 **Cheema Milk Collection & Distribution** is a full dairy logistics platform.\n\nWaqas served as **Team Lead & Backend/PWA Developer**:\n• Complete backend architecture & RESTful APIs\n• MongoDB schema design for dairy operations\n• Progressive Web App for field usage\n• Live at: cheemamilkcollection.com",
  },
  {
    keywords: ["hrm", "hr", "human resource", "payroll", "attendance"],
    response:
      "👥 **Human Resource Management (HRM)** System features:\n\n• RBAC for CEO, HR, Manager & Employee roles\n• Employee management, attendance tracking & payroll\n• Leave management & task tracking modules\n• Secure JWT authentication & Cloudinary integration\n• Built with Node.js, Express.js & MongoDB",
  },
  {
    keywords: ["backend", "api", "node", "express", "server"],
    response:
      "⚡ Waqas is a specialized **Backend Developer** with deep expertise in:\n\n• **Node.js & Express.js** — Building scalable RESTful APIs\n• **MongoDB & Mongoose** — Complex schema design & aggregation\n• **MVC Architecture** — Clean, maintainable code structure\n• **JWT & RBAC** — Secure authentication & authorization\n• **Production Deployment** — AWS, Railway, Render, Vercel",
  },
  {
    keywords: ["pwa", "progressive", "offline", "installable"],
    response:
      "📱 Waqas builds **Progressive Web Apps (PWAs)** that are:\n\n• ⚡ Fast & performant with service workers\n• 📴 Offline-capable for field use\n• 📲 Installable on any device\n• 🔄 Auto-updating with cache strategies\n\nHe has deployed multiple production PWAs including the Cheema Dairy platform and Pro-Pakistan Website.",
  },
  {
    keywords: ["available", "hire", "freelance", "open", "kaam milega"],
    response:
      "✅ Yes! Muhammad Waqas is currently **available for work** and open to:\n\n• Full-time backend development roles\n• Remote freelance projects\n• Contract-based development work\n• Team lead positions\n\nReach out at mwaqasjutt17@gmail.com or call (+92) 306-9377493!",
  },
  {
    keywords: ["location", "city", "where", "kahan", "country"],
    response:
      "📍 Muhammad Waqas is based in **Vehari, Punjab, Pakistan**.\nHe works both on-site and remotely, and is open to remote opportunities worldwide.",
  },
  {
    keywords: ["language", "zubaan", "boli"],
    response:
      "🗣️ Waqas speaks **English**, **Urdu**, and **Punjabi** fluently.",
  },
  {
    keywords: ["thank", "shukriya", "thanks", "bye", "goodbye", "alvida"],
    response:
      "You're welcome! 😊 Feel free to reach out anytime. You can contact Waqas at mwaqasjutt17@gmail.com. Have a great day! 🚀",
  },
];

function getBotResponse(userInput: string): string {
  const input = userInput.toLowerCase().trim();

  for (const entry of knowledgeBase) {
    for (const keyword of entry.keywords) {
      if (input.includes(keyword.toLowerCase())) {
        return entry.response;
      }
    }
  }

  return "I'm not sure about that, but I can help you with:\n\n• 💼 **Skills & Technologies**\n• 🚀 **Projects**\n• 🎓 **Education**\n• 💼 **Work Experience**\n• 📬 **Contact Info**\n\nTry asking about any of these topics!";
}

const quickQuestions = [
  "What are your skills?",
  "Show me projects",
  "Work experience",
  "Contact info",
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Assalam-o-Alaikum! 👋 I'm Waqas's AI assistant. Ask me about his skills, projects, experience, or anything else!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(messageText);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-[1000] w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 via-primary to-indigo-500 text-white shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] flex items-center justify-center transition-shadow duration-300"
            aria-label="Open Chat"
          >
            <MessageCircle className="w-6 h-6" />
            {/* Ping animation */}
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white dark:border-gray-900"></span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 left-6 z-[1000] w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-3rem)] rounded-3xl overflow-hidden shadow-2xl shadow-black/30 border border-foreground/10 flex flex-col bg-background"
            style={{
              backgroundColor: "var(--color-background, hsl(240 10% 3.9%))",
            }}
          >
            {/* Header */}
            <div className="relative px-5 py-4 bg-gradient-to-r from-purple-700 via-primary to-indigo-600 text-white flex items-center justify-between shrink-0">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">
                    Waqas's Assistant
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[11px] text-white/80 font-medium">
                      Online — Ask me anything
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative z-10 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth bg-background" style={{ scrollbarWidth: "thin" }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-1 ${
                      msg.sender === "bot"
                        ? "bg-primary/15 text-primary border border-primary/25"
                        : "bg-foreground/10 text-foreground border border-foreground/15"
                    }`}
                  >
                    {msg.sender === "bot" ? (
                      <Sparkles className="w-3.5 h-3.5" />
                    ) : (
                      <User className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl whitespace-pre-line ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-md"
                        : "bg-muted text-foreground border border-border/50 rounded-tl-md"
                    }`}
                  >
                    {msg.text.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
                      if (part.startsWith("**") && part.endsWith("**")) {
                        return (
                          <strong key={i} className="font-bold">
                            {part.slice(2, -2)}
                          </strong>
                        );
                      }
                      return <span key={i}>{part}</span>;
                    })}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/15 text-primary border border-primary/25 flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-muted border border-border/50 px-4 py-3 rounded-2xl rounded-tl-md flex gap-1.5 items-center">
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 bg-background">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/30 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="px-4 py-3 border-t border-border/50 bg-background shrink-0">
              <div className="flex items-center gap-2 bg-muted rounded-xl border border-border/50 px-3 py-1 focus-within:border-primary/40 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about skills, projects..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none py-2.5"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground/50 text-center mt-2 font-medium">
                Powered by Waqas's Portfolio • AI Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
