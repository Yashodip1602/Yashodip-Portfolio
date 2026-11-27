export const experienceData = [
  {
    id: 'exp-1',
    type: 'experience',
    role: 'DevOps & Backend Engineer',
    organization: 'Cloud-Native Project Work',
    location: 'Rahata, Maharashtra, India',
    period: '2024 - Present',
    current: true,
    description:
      'Building CI/CD pipelines, containerized deployments, and Node.js backends on AWS with hands-on GitOps and DevSecOps practice.',
    bulletPoints: [
      'Built an end-to-end CI/CD pipeline for the LogiChain backend: GitLab checkout, Docker build, push to Amazon ECR, and automated deploy to Amazon EKS behind an AWS Load Balancer.',
      'Set up GitOps delivery where Jenkins builds and pushes images, updates the manifest repo, and ArgoCD auto-syncs to the cluster.',
      'Added SonarQube code analysis and Trivy image scanning to the pipeline, running on a dedicated EC2 instance.',
      'Fixed PostgreSQL ownership errors on AWS RDS with a per-object script, and audited the schema for missing primary keys.',
      'Configured Jenkins email notifications (SMTP) and debugged failed builds using logs.',
      'Built Node.js REST APIs with Fastify, PostgreSQL, and JWT authentication.'
    ],
    skills: ['Jenkins', 'Docker', 'Kubernetes', 'AWS EKS', 'AWS ECR', 'ArgoCD', 'SonarQube', 'Trivy', 'GitLab', 'Node.js', 'Fastify', 'PostgreSQL']
  },
  {
    id: 'exp-2',
    type: 'experience',
    role: 'DevOps Learning and Practice',
    organization: 'DevOps Winter Arc (Learning in Public)',
    location: 'Maharashtra, India',
    period: '2023 - 2024',
    current: false,
    description:
      'Daily hands-on practice in Linux, monitoring, databases, and cloud infrastructure, shared publicly on LinkedIn.',
    bulletPoints: [
      'Automated routine tasks using Bash scripts, cron schedules, and systemd services.',
      'Practiced monitoring with Prometheus and Grafana, and load testing with Apache JMeter.',
      'Learning PostgreSQL replication and automated S3 backups with cron, including RPO and RTO planning.',
      'Writing a daily DevOps series covering topics like GitOps with ArgoCD, Jenkins, and Kubernetes.'
    ],
    skills: ['Linux', 'Bash Scripting', 'Prometheus', 'Grafana', 'Apache JMeter', 'AWS EC2', 'AWS S3', 'PostgreSQL', 'Git']
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
    name: 'AWS Cloud & Infrastructure Engineering Tranning',
    issuer: 'Amazon Web Services (AWS)',
    status: 'Practiced & Hands-On',
    date: '2026'
  },
  // {
  //   name: 'Kubernetes Container Orchestration',
  //   issuer: 'Cloud Native Computing Foundation (CNCF)',
  //   status: 'Hands-on Labs Completed',
  //   date: '2024'
  // },
  // {
  //   name: 'Docker & Node.js Production Backend Guide',
  //   issuer: 'Online Professional Learning',
  //   status: 'Completed',
  //   date: '2024'
  // }
]
