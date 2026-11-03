export const experienceData = [
  {
    id: 'exp-1',
    type: 'experience',
    role: 'Backend & DevOps Engineer',
    organization: 'Cloud-Native & Production Engineering Projects',
    location: 'Nashik, Maharashtra, India',
    period: '2024 — Present',
    current: true,
    description:
      'Designing and deploying scalable Node.js/TypeScript REST APIs, containerized microservices, and automated AWS CI/CD pipelines.',
    bulletPoints: [
      'Engineered a high-performance blog platform backend using Fastify, optimized PostgreSQL queries, and JWT authentication.',
      'Built a production-ready pipeline integrating Jenkins and AWS ECR to automate container orchestration on AWS EKS.',
      'Managed declarative Kubernetes manifests to deploy scalable, highly-available workloads with zero-downtime rolling updates.',
      'Automated application delivery using Jenkins CI/CD pipelines and Docker containerization to eliminate manual release overhead.'
    ],
    skills: ['Node.js', 'Fastify', 'Docker', 'Kubernetes', 'AWS EKS', 'Jenkins', 'PostgreSQL', 'Linux']
  },
  {
    id: 'exp-2',
    type: 'experience',
    role: 'Cloud & Systems Engineering Practice',
    organization: 'DevOps & Infrastructure Lab',
    location: 'Maharashtra, India',
    period: '2023 — 2024',
    current: false,
    description:
      'Hands-on engineering in Linux server administration, database replication, container optimization, and cloud infrastructure.',
    bulletPoints: [
      'Automated routine operational tasks using Bash shell scripting, systemd units, and cron schedules.',
      'Implemented PostgreSQL primary-replica streaming replication on EC2 with automated backup scripts to AWS S3.',
      'Configured AWS VPC subnets, route tables, IAM roles, and security groups with security best practices.'
    ],
    skills: ['Linux', 'Docker', 'AWS EC2', 'AWS S3', 'PostgreSQL', 'Bash Scripting', 'Git']
  }
]

export const educationData = [
  {
    id: 'edu-1',
    type: 'education',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Mysore University',
    location: 'Mysore / Online, India',
    period: '2025 — 2028 (Expected)',
    grade: 'In Progress',
    highlights: [
      'Core coursework: Software Development Methodologies, Database Management Systems (SQL), and Web Technologies.',
      'Focusing on distributed backend architecture, modern web APIs, and cloud infrastructure.'
    ]
  },
  {
    id: 'edu-2',
    type: 'education',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Pune University',
    location: 'Maharashtra, India',
    period: '2023 — 2025',
    grade: 'Completed',
    highlights: [
      'Higher secondary education curriculum with core focus on science and computer foundations.'
    ]
  },
  {
    id: 'edu-3',
    type: 'education',
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Pune University',
    location: 'Maharashtra, India',
    period: 'Up to 2023',
    grade: 'Completed',
    highlights: [
      'Foundational secondary education in science, mathematics, and analytical reasoning.'
    ]
  }
]

export const certificationsData = [
  {
    name: 'AWS Cloud & Infrastructure Engineering',
    issuer: 'Amazon Web Services (AWS)',
    status: 'Practiced & Hands-On',
    date: '2024'
  },
  {
    name: 'Kubernetes Container Orchestration',
    issuer: 'Cloud Native Computing Foundation (CNCF)',
    status: 'Hands-on Labs Completed',
    date: '2024'
  },
  {
    name: 'Docker & Node.js Production Backend Guide',
    issuer: 'Online Professional Learning',
    status: 'Completed',
    date: '2024'
  }
]
