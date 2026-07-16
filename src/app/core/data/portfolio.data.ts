// ════════════════════════════════════════════════════════════════
//  PORTFOLIO DATA — single source of truth
//  Customized for Amrit Pal Singh from resume, cover letter,
//  LinkedIn profile export, and project screenshots.
// ════════════════════════════════════════════════════════════════

export interface PersonalInfo {
  name:         string;
  firstName:    string;
  lastName:     string;
  role:         string;
  tagline:      string;
  subTagline:   string;
  location:     string;
  email:        string;
  resumeUrl:    string;
  resumeDocxUrl:string;
  coverLetterUrl:string;
  coverLetterDocxUrl:string;
  profileImage: string;
  bio:          string[];
  strengths:    { label: string; description: string }[];
  availability: string;
}

export interface SocialLink {
  name: string;
  url:  string;
}

export interface SkillCategory {
  name:   string;
  skills: string[];
}

export interface Project {
  id:          number;
  number:      string;
  title:       string;
  category:    string;
  year:        string;
  description: string;
  tech:        string[];
  image:       string;
  liveUrl:     string;
  githubUrl?:  string;
}

export interface Experience {
  id:           number;
  company:      string;
  role:         string;
  period:       string;
  location:     string;
  description:  string;
  achievements: string[];
}

export interface Achievement {
  id:          number;
  value:       string;
  label:       string;
  description: string;
}

export interface Testimonial {
  id:      number;
  quote:   string;
  author:  string;
  role:    string;
  company: string;
}

export interface PortfolioData {
  personal:        PersonalInfo;
  social:          SocialLink[];
  skillCategories: SkillCategory[];
  projects:        Project[];
  experience:      Experience[];
  achievements:    Achievement[];
  testimonials:    Testimonial[];
}

const github = 'https://github.com/gitamrit1443';
const linkedin = 'https://www.linkedin.com/in/amritpal-singh-900300414';

export const PORTFOLIO: PortfolioData = {
  personal: {
    name:         'Amrit Pal Singh',
    firstName:    'Amrit Pal',
    lastName:     'Singh',
    role:         'Full Stack Web Developer',
    tagline:      'Production-ready web apps with clean backend architecture',
    subTagline:   'I build full-stack applications with Angular, ASP.NET Core, C#, SQL Server, authentication systems, real-time updates, and deployment-ready product workflows.',
    location:     'Dehradun, Uttarakhand, India',
    email:        'amritpalsingh3136@outlook.com',
    resumeUrl:    '/assets/AmritPalSingh_Resume_v2.pdf',
    resumeDocxUrl:'/assets/AmritPalSingh_Resume_v2.docx',
    coverLetterUrl:'/assets/AmritPalSingh_Cover_Letter_v2.pdf',
    coverLetterDocxUrl:'/assets/AmritPalSingh_Cover_Letter_v2.docx',
    profileImage: '/assets/images/ProfilePic.png',
    bio: [
      'I am a B.Tech Computer Science graduate and full-stack developer focused on Angular, ASP.NET Core, C#, SQL Server, and clean REST API development.',
      'My work covers SaaS platforms, AI document workflows, incident management, authentication flows, SQL optimization, real-time alerts, and polished frontend experiences.',
      'I enjoy building from frontend to backend to database — turning product requirements into scalable, usable, and deployment-ready applications.',
    ],
    strengths: [
      {
        label: 'Full-Stack Architecture',
        description: 'Comfortable across Angular UI, ASP.NET Core APIs, SQL Server schema design, EF Core, and deployment flow.',
      },
      {
        label: 'Security & Auth Systems',
        description: 'Built JWT authentication, TOTP flows, RBAC, and role-specific user journeys for production-style applications.',
      },
      {
        label: 'Database-Backed Workflows',
        description: 'Optimized SQL Server queries and stored procedures, improving API response time by around 30% on high-traffic workflows.',
      },
    ],
    availability: 'Open to SDE / Full Stack Developer roles',
  },

  social: [
    { name: 'GitHub',   url: github },
    { name: 'LinkedIn', url: linkedin },
    { name: 'Email',    url: 'mailto:amritpalsingh3136@outlook.com' },
  ],

  skillCategories: [
    {
      name:   'Frontend',
      skills: ['Angular 20/21', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'DaisyUI', 'HTML5', 'CSS3', 'SCSS', 'Angular Signals'],
    },
    {
      name:   'Backend',
      skills: ['ASP.NET Core', 'ASP.NET Core Web API', 'C#', 'FastAPI', 'REST APIs', 'SignalR', 'Hangfire', 'Clean Architecture'],
    },
    {
      name:   'Database & Cloud',
      skills: ['SQL Server', 'PostgreSQL', 'Entity Framework Core', 'Stored Procedures', 'Azure', 'Vercel', 'Railway'],
    },
    {
      name:   'Tools & Languages',
      skills: ['Git', 'GitHub', 'Postman', 'Python', 'C++', 'RAG Pipeline', 'HuggingFace BERT', 'JWT', 'RBAC'],
    },
  ],

  projects: [
    {
      id:          1,
      number:      '01',
      title:       'HireFlow',
      category:    'Recruitment Pipeline SaaS',
      year:        '2026',
      description: 'A full-stack hiring platform with Kanban pipeline, recruiter/candidate access, interview scheduling, analytics dashboard, seeded demo data, JWT + TOTP authentication, RBAC, Hangfire background jobs, and clean backend structure.',
      tech:        ['ASP.NET Core 8', 'EF Core', 'SQL Server', 'Angular 20', 'Hangfire', 'Tailwind CSS'],
      image:       '/assets/images/HireFlow.png',
      liveUrl:     github,
      githubUrl:   github,
    },
    {
      id:          2,
      number:      '02',
      title:       'InsightFlow',
      category:    'AI Document Intelligence Platform',
      year:        '2026',
      description: 'Document intelligence workflow for uploads, summaries, semantic search, and Q&A over uploaded content using embeddings, retrieval-based response flow, FastAPI services, and Angular dashboards.',
      tech:        ['FastAPI', 'HuggingFace BERT', 'Angular 20', 'ASP.NET Core', 'SQL Server', 'RAG'],
      image:       '/assets/images/InsightFlow.png',
      liveUrl:     github,
      githubUrl:   github,
    },
    {
      id:          3,
      number:      '03',
      title:       'SignalOps',
      category:    'Incident Management Platform',
      year:        '2024',
      description: 'PagerDuty-inspired incident workflow with real-time alerts, on-call notifications, escalation tracking, SQL Server-backed incident records, SignalR live updates, and Hangfire scheduled tasks.',
      tech:        ['ASP.NET Core', 'Razor Pages', 'SQL Server', 'SignalR', 'Hangfire'],
      image:       '/assets/images/SignalOps.png',
      liveUrl:     github,
      githubUrl:   github,
    },
    {
      id:          4,
      number:      '04',
      title:       'MiniMunch',
      category:    'Premium Pancake Ordering SPA',
      year:        '2025',
      description: 'A polished Angular ordering SPA with cinematic hero section, interactive menu builder, cart flow, responsive layouts, premium UI sections, Angular Signals, Tailwind/SCSS styling, and scroll reveal interactions.',
      tech:        ['Angular 21', 'TypeScript', 'Tailwind CSS', 'SCSS', 'Angular Signals'],
      image:       '/assets/images/MiniMunch.png',
      liveUrl:     github,
      githubUrl:   github,
    },
  ],

  experience: [
    {
      id:          1,
      company:     'Cynoteck Technology Solutions',
      role:        'Back End Developer Intern',
      period:      'Feb 2026 — May 2026',
      location:    'Dehradun',
      description: 'Worked on production-level backend services consumed by client-facing Angular modules, with focus on REST API delivery, SQL Server optimization, and clean full-stack integration.',
      achievements: [
        'Developed RESTful API endpoints using ASP.NET Core Web API and C# for client-facing modules.',
        'Optimized Microsoft SQL Server queries and stored procedures, improving API response time by around 30% on high-traffic workflows.',
        'Integrated backend services with Angular modules, participated in Agile sprints and code reviews, and followed clean coding practices.',
      ],
    },
    {
      id:          2,
      company:     'Graphic Era Hill University',
      role:        'B.Tech — Computer Science & Engineering',
      period:      'May 2022 — Jul 2026',
      location:    'Dehradun, India',
      description: 'Built a strong computer science foundation while actively developing project-based full-stack applications across SaaS, AI/document, incident-management, and premium frontend UI use cases.',
      achievements: [
        'Graduating with Grade A in Computer Science & Engineering.',
        'Built a GitHub portfolio covering recruitment SaaS, document intelligence, incident management, and frontend SPA work.',
        'Regularly practiced coding, project-based learning, and full-stack implementation workflows.',
      ],
    },
  ],

  achievements: [
    { id: 1, value: '4',     label: 'Featured Projects',       description: 'SaaS, AI document intelligence, incident management, and premium SPA builds' },
    { id: 2, value: '30%',   label: 'API Response Improvement', description: 'SQL Server query and stored-procedure optimization during internship' },
    { id: 3, value: '2026',  label: 'CSE Graduate',             description: 'B.Tech Computer Science & Engineering, Grade A' },
    { id: 4, value: 'Azure', label: 'Cloud Certified',          description: 'Azure Cloud Services certification and deployment-focused learning' },
  ],

  testimonials: [
    {
      id:      1,
      quote:   'Built a recruitment pipeline SaaS with Kanban workflows, candidate/recruiter access, JWT + TOTP authentication, RBAC, Hangfire jobs, and an Angular 20 UI.',
      author:  'HireFlow',
      role:    'Recruitment SaaS',
      company: 'ASP.NET Core + Angular',
    },
    {
      id:      2,
      quote:   'Developed document upload, summary, semantic search, and Q&A workflows using FastAPI, HuggingFace BERT, embeddings, and a retrieval-based response flow.',
      author:  'InsightFlow',
      role:    'AI Document Intelligence',
      company: 'FastAPI + RAG',
    },
    {
      id:      3,
      quote:   'Created incident workflows with live SignalR alerts, on-call notification logic, escalation tracking, scheduled Hangfire jobs, and SQL Server-backed records.',
      author:  'SignalOps',
      role:    'Incident Management',
      company: 'SignalR + Hangfire',
    },
  ],
};
