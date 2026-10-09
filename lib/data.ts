export const profile = {
  name: "Humza Khaliq",
  role: "Software QA Co-op @ Berkshire Grey",
  location: "Boston, MA",
  tagline:
    "I test robots for a living and build software, AI and hardware on the side. Mostly things that have to work when someone's actually using them.",
  email: "humza.khaliq03@gmail.com",
  linkedin: "https://www.linkedin.com/in/humza-khaliq/",
  github: "https://github.com/Humza-khaliq",
  resume: "/resume.pdf",
};

export type Experience = {
  company: string;
  mark: string;
  role: string;
  start: string;
  end: string;
  location: string;
  line: string;
  stack?: string[];
};

export const experience: Experience[] = [
  {
    company: "Berkshire Grey",
    mark: "BG",
    role: "Software QA Co-op",
    start: "Jul 2026",
    end: "Present",
    location: "Bedford, MA",
    line: "Testing the software behind robotic sortation systems: test execution, defect triage and Python/Playwright automation.",
    stack: ["Python", "Playwright", "Jira", "Kibana"],
  },
  {
    company: "Elevate The Game",
    mark: "ETG",
    role: "Website Developer",
    start: "Apr 2026",
    end: "Present",
    location: "Remote",
    line: "Built the full-stack site and authenticated client portal for partner onboarding and program visibility.",
    stack: ["Next.js", "Supabase", "Tailwind"],
  },
  {
    company: "The Cutfish",
    mark: "TC",
    role: "Founder & Developer",
    start: "Oct 2025",
    end: "Present",
    location: "Amherst, MA",
    line: "Started a haircutting business and built its booking app. 20+ appointments in the first 2 weeks.",
    stack: ["Flask", "Python", "SQL"],
  },
  {
    company: "Beats by Dre",
    mark: "B",
    role: "Insights Extern",
    start: "May 2025",
    end: "Jul 2025",
    location: "Remote",
    line: "Built an AI-enhanced dashboard tracking consumer sentiment across 30+ data points.",
    stack: ["Python", "Data viz"],
  },
  {
    company: "Techwards",
    mark: "TW",
    role: "Data Intern",
    start: "Jun 2023",
    end: "Aug 2024",
    location: "Remote",
    line: "Backend work and Python test cases for the Chatwards AI chatbot ahead of production releases.",
    stack: ["Python", "Linux"],
  },
];

export type Project = {
  slug: string;
  name: string;
  kicker: string;
  year: string;
  role: string;
  summary: string;
  description: string[];
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
  video?: { mp4: string; webm?: string };
  extraVideos?: string[];
  featured?: boolean;
  status?: string;
};

export const projects: Project[] = [
  {
    slug: "electrobuddy",
    name: "ElectroBuddy",
    kicker: "Hardware · Embedded · Computer vision",
    year: "2026",
    role: "Solo build: hardware, firmware and enclosure",
    status: "Live on my desk",
    summary:
      "A desk robot with OLED eyes that watches what I'm wiring, catches my mistakes, and talks me through the build.",
    description: [
      "ElectroBuddy started as an Arduino Uno driving a 128×64 OLED with animated robot eyes. It grew into a bench assistant: a camera tracks me and the parts on the desk, and a Raspberry Pi runs vision and speech so it can say when a component is wrong and what to do next.",
      "A capacitive touch sensor on its head switches its mood. A temperature sensor keeps an eye on the bench, and the eyes follow me around the desk. It all sits in a rounded, 3D-printed two-piece enclosure wired without a breadboard.",
    ],
    highlights: [
      "Animated OLED eyes (RoboEyes) with moods, blinking and idle glances",
      "Camera tracking: the eyes follow my movement across the desk",
      "Component recognition: identifies parts and flags wiring mistakes",
      "Speech in and out on a Raspberry Pi for spoken guidance",
      "Touch sensor to switch mood, temperature sensor on the bench",
      "Custom 3D-printed two-piece enclosure",
    ],
    stack: ["Arduino (C++)", "Raspberry Pi", "Python", "OpenCV", "SSD1306 OLED", "Sensors", "3D printing"],
    links: [],
    extraVideos: ["/videos/electrobuddy-2.mp4", "/videos/electrobuddy-1.mp4"],
    featured: true,
  },
  {
    slug: "jarvis",
    name: "JARVIS",
    kicker: "Voice AI · Agents · Memory",
    year: "2026",
    role: "Solo build",
    summary:
      "A voice-first personal assistant that runs on my MacBook. Wake word, long-term memory, calendar and web tools.",
    description: [
      "JARVIS listens for a wake word, transcribes me locally, reasons with an LLM that can call tools, and answers out loud. Once it's awake it stays in conversation, so I don't have to repeat the wake word, and it goes back to standby when I say goodnight.",
      "It remembers things across sessions: recent turns in short-term memory, everything else embedded in ChromaDB and pulled back into context when it matters. Tools cover Google Calendar (with timezone-safe event creation) and Tavily web search.",
    ],
    highlights: [
      "openWakeWord → faster-whisper STT → Groq Llama 3.3 70B → ElevenLabs TTS",
      "Short-term + ChromaDB long-term memory with retrieval",
      "Tool calling: Google Calendar and Tavily web search",
      "Follow-up mode and dismissal phrases, no LLM call wasted",
      "FastAPI backend with a web dashboard",
    ],
    stack: ["Python", "FastAPI", "Groq", "ChromaDB", "Whisper", "ElevenLabs"],
    links: [{ label: "GitHub", href: "https://github.com/Humza-khaliq" }],
  },
  {
    slug: "elevate-the-game",
    name: "Elevate The Game Portal",
    kicker: "Full-stack · Client portal",
    year: "2026",
    role: "Website Developer",
    summary:
      "Public site plus an authenticated client and admin portal for partner onboarding, resources and contracts.",
    description: [
      "Elevate The Game needed one place for partners to onboard, access curriculum, and track their program. I built the public site and a role-based portal on Next.js and Supabase.",
      "Clients see their presentations, contracts and curriculum files. Admins manage all of it. I validated every workflow end-to-end and tracked defects through to release.",
    ],
    highlights: [
      "Role-based auth for client and admin workflows",
      "Document hub for presentations, contracts and curriculum",
      "Validation testing across every portal flow",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Postgres", "Tailwind"],
    links: [{ label: "Live site", href: "https://etg-portal.vercel.app/" }],
    video: { mp4: "/videos/etg-portal.mp4", webm: "/videos/etg-portal.webm" },
  },
  {
    slug: "the-cutfish",
    name: "The Cutfish Barber",
    kicker: "Founder · Booking platform",
    year: "2025",
    role: "Founder & Developer",
    summary:
      "My haircutting business and the booking app I built for it. 20+ appointments in the first two weeks.",
    description: [
      "I started cutting hair at UMass and needed a booking system that didn't double-book me. So I built one in Flask with a relational SQL database.",
      "The booking flow is responsive and covered by automated tests. It's been running real appointments since launch.",
    ],
    highlights: [
      "20+ appointments booked in the first 2 weeks",
      "Conflict-free scheduling with automated test coverage",
      "Live at thecutfishbarber.com",
    ],
    stack: ["Flask", "Python", "SQL", "HTML/CSS"],
    links: [{ label: "Live site", href: "https://thecutfishbarber.com/" }],
    video: { mp4: "/videos/cutfish.mp4", webm: "/videos/cutfish.webm" },
  },
  {
    slug: "beats-sentiment",
    name: "Beats by Dre: Sentiment Analysis",
    kicker: "Data · NLP",
    year: "2025",
    role: "Insights Externship",
    summary:
      "25+ visualizations comparing customer sentiment across 5 Bluetooth speaker brands from 50+ Amazon reviews.",
    description: [
      "During my Beats by Dre externship I ran exploratory analysis and sentiment scoring on Amazon reviews of five competing speakers.",
      "The notebook covers polarity trends, review volume and keyword frequency. It has automated data-quality checks so the insights hold up.",
    ],
    highlights: [
      "25+ visualizations: word clouds, heatmaps, box and scatter plots",
      "Validation checks and automated data-quality scripts",
      "Competitive insights across 5 brands",
    ],
    stack: ["Python", "Pandas", "Matplotlib", "Seaborn", "Colab"],
    links: [
      {
        label: "Notebook",
        href: "https://drive.google.com/file/d/1rs6iz70-h9CD6F3QBx3ocS5OqV5Ks4P9/view?usp=sharing",
      },
    ],
    video: { mp4: "/videos/beats-demo.mp4", webm: "/videos/beats-demo.webm" },
  },
  {
    slug: "lume",
    name: "Lume: Wildfire Detection",
    kicker: "Computer vision · ML",
    year: "2025",
    role: "Developer",
    summary: "Real-time fire and smoke detection in video streams with YOLOv8, served through Flask.",
    description: [
      "Lume runs a YOLOv8 model, trained on Roboflow data, over live video to flag fire and smoke early.",
      "I built an edge-case test suite (fog, sunsets, steam) and kept iterating on the debugging workflow until false positives dropped.",
    ],
    highlights: [
      "Real-time detection on video streams",
      "Edge-case test suite for model reliability",
      "Flask app wrapping the detector",
    ],
    stack: ["Python", "YOLOv8", "Roboflow", "Flask", "Seaborn"],
    links: [{ label: "GitHub", href: "https://github.com/chaudharycoding/Lume" }],
    video: { mp4: "/videos/lume-demo.mp4" },
  },
];

export const skills: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "SQL", "Java", "R", "C++"] },
  { label: "Build", items: ["Next.js", "React", "FastAPI", "Flask", "Supabase", "Postgres", "Tailwind"] },
  { label: "AI & Data", items: ["LLM tool-calling", "RAG", "YOLOv8", "Whisper", "ChromaDB", "Pandas"] },
  { label: "Quality", items: ["Playwright", "Vitest", "Test design", "Defect triage", "Jira", "Kibana"] },
  { label: "Hardware", items: ["Arduino", "Raspberry Pi", "Sensors", "OLED", "3D printing"] },
];

export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
