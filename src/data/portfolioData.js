import helperLogo from '../assets/Helperlogo.jpeg';
import auranotesLogo from '../assets/auranotes.jpeg';
import cognivueLogo from '../assets/cognivue.jpeg';

export const personalData = {
    name: "Divyansh Kumawat",
    tagline: "MERN Stack Developer | AI/ML Enthusiast | Data Science & AWS Certified ",
    bio: "Passionate full stack developer with 3+ years of experience creating innovative web applications. I specialize in React, Node.js, and cloud technologies, DevOps and Computer Networking with a keen eye for design and user experience. Always eager to tackle complex challenges and learn new technologies.",
    // Condensed for the About panel, where the photo carries the frame.
    shortBio: "Full stack developer with 3+ years creating innovative web applications — specialising in React, Node.js, cloud and DevOps, with a keen eye for design and user experience.",
    email: "divyanshmcp@gmail.com",
    phone: "+91 9024858973",
    location: "India",
    resumeUrl: "https://drive.google.com/file/d/1M9LzzS7f3gac7kQKunoO4DdWlUWFcP_y/view?usp=sharing", // Direct download link
    social: {
        github: "https://github.com/Divyansh-Kumawat",
        linkedin: "https://www.linkedin.com/in/divyansh-kumawat",
        twitter: "https://x.com/DivyanshMcp",
    },
    // Place your slideshow images in the assets folder and uncomment these imports later:
    // slideImages: [me1, me2, me3]
    slideImages: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80"
    ]
};

export const projects = [
    {
        id: 1,
        title: "Helper - Realtime Service booking App",
        description: "A full-stack service booking application. Features include user authentication, real-time booking management, Chatting facility and an admin dashboard.",
        image: helperLogo,
        tech: ["Express.js", "Socket.io", "MongoDB", "JWT", "React.js", "Multer", "RESTful APIs", "Nodemailer", "Typescript"],
        category: "Web",
        github: "https://github.com/Divyansh-Kumawat/Helper--Book-help-now",
        live: "https://preview--service-at-home.lovable.app/",
    },
    {
        id: 2,
        title: "AuraNotes- Notes Taking App",
        description: "An notes taking application using RESTFul APIs. Added an collaboration feature where multiple users can edit a note simultaneously in real-time.",
        image: auranotesLogo,
        tech: ["React.js", "Node.js", "Express", "MongoDB", "RESTful APIs", "Socket.io"],
        category: "Web",
        github: "https://github.com/Divyansh-Kumawat/AuraNoteBackend",
        live: "https://aura-note-frontendd-ten.vercel.app/login",
    },
    {
        id: 3,
        title: "WebSage - AI-Powered Website Builder",
        description: "A web-based platform that utilizes AI to help users create stunning websites effortlessly. Features include drag-and-drop editing, customizable templates, and real-time collaboration.",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
        tech: ["React", "Node.js", "Web Containers", "Express", "TypeScript", "Gemini API", "Stripe", "CDN"],
        category: "AI",
        github: "https://github.com/Divyansh-Kumawat/Websage",
        live: "https://web-sage-sigma.vercel.app/",
    },
    {
        id: 4,
        title: "CogniVue - AI powered Interview platform",
        description: "AI-powered interview platform that provides real-time feedback and analytics to improve candidate performance.",
        image: cognivueLogo,
        tech: ["React", "TypeScript", "Node.js", "Express", "AI Integration"],
        category: "AI",
        github: "https://github.com/Divyansh-Kumawat/CogniVue",
        // cognivue.software no longer resolves (NXDOMAIN), so no live link.
    },
    {
        id: 5,
        title: "StockUp - Real Time Stock App",
        description: "A real-time stock trading application that provides live market data, portfolio tracking, and trading capabilities with an intuitive user interface.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
        tech: ["Next.js", "TypeScript", "Real-time APIs", "Chart.js", "Express", "MongoDB"],
        category: "Web",
        github: "https://github.com/Divyansh-Kumawat/StockUp--real-time-stock-APP",
        live: "https://stock-up-real-time-stock-app.vercel.app",
    },
    {
        id: 6,
        title: "Glimpz - AI Shopping Platform",
        description: "A smart shopping web app using YOLO-based object detection to identify objects from uploaded images, captured photos and live camera streams — matching them to products with over 85% confidence and linking straight to e-commerce listings.",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
        tech: ["Python", "YOLO", "Computer Vision", "Object Detection", "Flask", "OpenCV"],
        category: "AI",
        github: "https://github.com/Divyansh-Kumawat/Glimpz-AI-Powered-Shoping-Platform",
    },
    {
        id: 7,
        title: "Recall IQ - AI Video Assistant",
        description: "A production-ready tool that transcribes videos, summarises them, extracts action items and lets you chat with your meetings — turning long recordings into searchable, actionable notes.",
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80",
        tech: ["Python", "LLM", "Speech-to-Text", "RAG", "LangChain", "Streamlit"],
        category: "AI",
        github: "https://github.com/Divyansh-Kumawat/Recall-IQ-AI-Video-Assistant",
    },
    {
        id: 8,
        title: "Dive - Multi-Agent AI System",
        description: "A multi-agent AI research system built from scratch with LangChain and LLMs. Orchestrates specialised agents as a pipeline — searching the web, scraping content and writing full reports.",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
        tech: ["LangChain", "LLM", "Multi-Agent", "JavaScript", "Node.js", "Web Scraping"],
        category: "AI",
        github: "https://github.com/Divyansh-Kumawat/Dive-Multi-Agent-AI-System",
    },
    {
        id: 9,
        title: "CodeThinker - AI Code Reviewer",
        description: "An AI-powered code review platform that analyses submitted code, flags issues and suggests improvements — giving developers instant, structured feedback.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
        tech: ["JavaScript", "Node.js", "Express", "AI Integration", "React"],
        category: "AI",
        github: "https://github.com/Divyansh-Kumawat/CodeThinker",
        live: "https://code-thinker-lemon.vercel.app",
    },
    {
        id: 10,
        title: "Insyd - Lead Orchestration Platform",
        description: "An intelligent lead orchestration platform for material brands — automating lead capture, classification and nurturing so sales teams can focus on the highest-intent prospects.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        tech: ["TypeScript", "Next.js", "React", "Automation", "REST APIs"],
        category: "Web",
        github: "https://github.com/Divyansh-Kumawat/insyd",
        live: "https://insyd-seven.vercel.app",
    }
];

export const skills = [
    { name: "React/Next.js", level: 95 },
    { name: "Node.js/Express", level: 90 },
    { name: "AI/ML", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "Python", level: 85 },
    { name: "SQL/NoSQL", level: 82 },
    { name: "AWS/Cloud", level: 80 },
    { name: "React Native", level: 78 },
    { name: "Docker/DevOps", level: 50 },
];

export const technicalSkills = {
    languages: ["JavaScript", "Python", "C++", "Java", "PHP"],
    frontend: ["HTML", "CSS", "Tailwind CSS", "React.js", "Next.js"],
    backend: ["Node.js", "Express.js"],
    database: ["MongoDB", "MySQL"],
    cloud: ["AWS", "Microsoft Azure", "Docker", "Kubernetes", "Git", "GitHub"],
    ai_ml: ["TensorFlow", "NLP", "LangChain", "Machine Learning", "Data Science", "GenAI"],
    other: ["UI/UX Design (Figma)", "SEO Optimization", "API Integration"]
};

export const experiences = [
    {
        id: 1,
        title: "Full Stack Developer",
        company: "Best Jaipur- Tech Digital Marketing Company",
        period: "15th May - 5th July 2025",
        description: "Developed responsive websites and optimized SEO, improving organic traffic by 30%. Worked with MERN stack and client-based projects.",
        type: "experience"
    },
    {
        id: 2,
        title: "Btech in Computer Science",
        company: "Vellore Institute of Technology, Vellore",
        period: "2022 - ongoing",
        description: "Relevant Coursework: Data Structures, DBMS, OS, CN, Software Engineering",
        type: "education"
    },
    {
        id: 3,
        title: "Higher Secondary Education",
        company: "St. Xavier's School, Nevta",
        period: "2020-2022",
        description: "Successfully completed my Schooling with 86.8% in Xth and 90% in XIIth with Science Stream.",
        type: "education"
    }
];

export const certifications = [
    "Microsoft Azure DP-900 – Azure Data Fundamentals",
    "AWS Cloud Practitioner",
    "OCI Certified Generative AI Professional – Oracle",
    "OCI Certified Data Science Professional – Oracle",
];

export const testimonials = [
    {
        id: 1,
        name: "Arnav Sharaswat",
        role: "Co-founder at Best Jaipur",
        content: "Divyansh is an exceptional developer who consistently delivers high-quality solutions. His attention to detail and ability to understand complex requirements make him invaluable to any team.",
        avatar: "https://media.licdn.com/dms/image/v2/D5603AQGtPvjAEgwSIQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1731607074575?e=1762387200&v=beta&t=mLoreunowoFYjC7jwaatSRo-z8WueqIlwi8zE9qiHfQ"
    },
    {
        id: 2,
        name: "Priyank Kumawat",
        role: "Project Manager",
        content: "Working with Divyansh was a game-changer. He not only built amazing products but also established best practices that we still follow today.",
        avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
];

export const blogPosts = [
    {
        id: 1,
        title: "Building Scalable React Applications",
        excerpt: "Learn best practices for structuring and scaling React applications for enterprise-level projects.",
        date: "2024-01-15",
        readTime: "8 min read",
        link: "#",
        image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
        id: 2,
        title: "The Future of Web Development",
        excerpt: "Exploring upcoming trends and technologies that will shape the future of web development.",
        date: "2024-01-08",
        readTime: "6 min read",
        link: "#",
        image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
];
