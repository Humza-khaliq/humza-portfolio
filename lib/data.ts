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
  bullets: string[];
  stack?: string[];
};

export const experience: Experience[] = [
  {
    company: "Berkshire Grey",
    mark: "BG",
    role: "Software Quality Co-op",
    start: "Jul 2026",
    end: "Present",
    location: "Bedford, MA",
    bullets: [
      "Designed and executed 50+ Python E2E and integration test suites with Playwright, expanding automated coverage by 22% across API and UI workflows.",
      "Troubleshot edge cases across REST API and system-level tests, driving root cause analyses that cut recurring failures by 25%.",
      "Automated test execution across 10+ CI/CD pipeline stages with n8n and Jenkins, reducing manual QA effort by 35%.",
      "Worked with developers in Agile/Scrum sprints and code reviews to prioritize and resolve high-risk defects.",
    ],
    stack: ["Python", "Playwright", "REST APIs", "n8n", "Jenkins"],
  },
  {
    company: "Elevate The Game",
    mark: "ETG",
    role: "Full Stack Engineer",
    start: "Apr 2026",
    end: "Jun 2026",
    location: "Remote",
    bullets: [
      "Built a full-stack client portal in Next.js, TypeScript and Supabase (Postgres) with role-based access control and REST API integrations, onboarding 15+ partners.",
      "Wrote 50+ unit and integration tests across client and admin workflows, reducing pre-launch defects by 20%.",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Postgres"],
  },
  {
    company: "The Cutfish",
    mark: "TC",
    role: "Founder & Developer",
    start: "Oct 2025",
    end: "Present",
    location: "Amherst, MA",
    bullets: [
      "Built a full-stack booking platform with Flask and RESTful APIs, scheduling 20+ appointments in the first 2 weeks.",
      "Designed a responsive booking flow with automated test coverage to catch conflicts early, cutting scheduling errors by 30%.",
    ],
    stack: ["Flask", "Python", "REST APIs"],
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
  video?: { mp4: string; webm?: string; poster?: string };
  status?: string;
};

export const projects: Project[] = [
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
    slug: "volt",
    name: "Volt",
    kicker: "Hardware · Embedded · Computer vision",
    year: "2026",
    role: "Solo build: hardware, firmware and enclosure",
    status: "Live on my desk",
    summary:
      "A desk robot with OLED eyes that watches what I'm wiring, catches my mistakes, and talks me through the build.",
    description: [
      "Volt started as an Arduino Uno driving a 128×64 OLED with animated robot eyes. It grew into a bench assistant: a camera tracks me and the parts on the desk, and a Raspberry Pi runs vision and speech so it can say when a component is wrong and what to do next.",
      "A touch sensor on its head switches its mood, a temperature sensor keeps an eye on the bench, and the eyes follow me around the desk. It all sits in a rounded, 3D-printed two-piece enclosure.",
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
  },
  {
    slug: "elevate-the-game",
    name: "Elevate The Game Portal",
    kicker: "Full-stack · Client portal",
    year: "2026",
    role: "Full Stack Engineer",
    summary:
      "Full-stack client portal with role-based access for partners and admins. Onboarded 15+ partners.",
    description: [
      "Elevate The Game needed one place for partners to onboard, access curriculum, and track their program. I built the public site and a role-based portal on Next.js and Supabase.",
      "Clients see their presentations, contracts and curriculum files. Admins manage all of it. I validated every workflow end-to-end and tracked defects through to release.",
    ],
    highlights: [
      "Role-based auth for client and admin workflows",
      "Document hub for presentations, contracts and curriculum",
      "50+ unit and integration tests, cutting pre-launch defects by 20%",
      "15+ partners onboarded",
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
      "Automated test coverage that cut scheduling errors by 30%",
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
      "AI-enhanced sentiment dashboard built from 150+ survey responses, surfacing 5+ actionable consumer trends.",
    description: [
      "During my Beats by Dre externship I turned 150+ survey responses into an AI-enhanced sentiment dashboard, quantifying sentiment shifts across 4 key themes to guide product messaging and feature priorities.",
      "I also benchmarked competitive positioning by mapping competitor attributes across 5 product lines with sentiment analysis.",
    ],
    highlights: [
      "5+ actionable consumer trends uncovered from 150+ responses",
      "Sentiment shifts quantified across 4 key themes",
      "10+ insight-driven recommendations for roadmap trade-offs",
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
      "30+ test cases exposing detection gaps across edge cases",
      "Tuned detection thresholds: +15% accuracy, fewer false positives",
      "Flask app wrapping the detector",
    ],
    stack: ["Python", "YOLOv8", "Roboflow", "Flask", "Seaborn"],
    links: [{ label: "GitHub", href: "https://github.com/chaudharycoding/Lume" }],
    video: { mp4: "/videos/lume-demo.mp4", webm: "/videos/lume-demo.webm", poster: "/media/lume-demo.png" },
  },
];

export type SkillCard = { title: string; icon: string; items: string[] };
export type SkillGroup = { title: string; icon: string; cards: SkillCard[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Software",
    icon: "terminal",
    cards: [
      { title: "Languages", icon: "code", items: ["Python", "Java", "TypeScript", "JavaScript", "Go", "SQL", "HTML/CSS", "R", "C++"] },
      { title: "Frameworks", icon: "layers", items: ["React", "Next.js", "Angular", "Node.js", "FastAPI", "Flask", "REST APIs", "Tailwind"] },
      { title: "Databases and Cloud", icon: "database", items: ["Postgres", "SQL Server", "Supabase", "ChromaDB", "AWS", "Docker", "Vercel"] },
    ],
  },
  {
    title: "AI and Data",
    icon: "sparkles",
    cards: [
      { title: "AI and Agents", icon: "brain", items: ["LLM workflows", "RAG pipelines", "AI agents", "Tool calling", "Whisper", "Claude Code", "Copilot"] },
      { title: "Automation and ML", icon: "workflow", items: ["n8n", "YOLOv8", "Pandas", "Sentiment analysis", "EDA"] },
      { title: "Observability and Dashboards", icon: "chart", items: ["Kibana", "Elasticsearch", "Tableau", "Power BI"] },
    ],
  },
  {
    title: "Quality and Hardware",
    icon: "cpu",
    cards: [
      { title: "Testing and QA", icon: "test", items: ["Pytest", "Playwright", "Vitest", "Unit & Integration Testing", "Test Automation", "Defect triage", "Jira"] },
      { title: "DevOps and Practices", icon: "git", items: ["CI/CD", "Jenkins", "GitHub Actions", "Git", "Linux/Unix", "OOP", "Microservices", "Agile/Scrum", "Code Reviews", "Quality Engineering"] },
      { title: "Hardware and Fabrication", icon: "box", items: ["Arduino", "ESP32", "Raspberry Pi", "Sensors", "OLED", "Onshape", "Bambu Studio", "3D printing"] },
    ],
  },
];

export const sections = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;
