export const skillCategories = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'cicd', label: 'CI/CD & GitOps' },
  { id: 'containers', label: 'Containers & K8s' },
  { id: 'cloud', label: 'Cloud Infrastructure' },
  { id: 'database', label: 'Databases & Storage' },
  { id: 'concepts', label: 'Concepts & Architecture' }
]

export const skillsData = [
  // CI/CD
  {
    name: 'Jenkins',
    category: 'cicd',
    categoryLabel: 'CI/CD',
    iconType: 'jenkins',
    level: 'Advanced',
    highlight: 'Automated multibranch pipelines, webhook triggers, Docker build stages, and artifact validation.',
    tags: ['Pipelines', 'Webhooks', 'Docker in Docker']
  },
  {
    name: 'ArgoCD',
    category: 'cicd',
    categoryLabel: 'GitOps CD',
    iconType: 'argocd',
    level: 'Advanced',
    highlight: 'Declarative continuous delivery, automated manifest synchronization, drift detection, and canary rollouts.',
    tags: ['GitOps', 'Drift Detection', 'Sync Policies']
  },
  // Containers & Orchestration
  {
    name: 'Docker',
    category: 'containers',
    categoryLabel: 'Containerization',
    iconType: 'docker',
    level: 'Advanced',
    highlight: 'Multi-stage Dockerfiles, image size minimization, vulnerability scanning, and Docker Compose environments.',
    tags: ['Multi-Stage', 'Compose', 'Image Optimization']
  },
  {
    name: 'k3s / Kubernetes',
    category: 'containers',
    categoryLabel: 'Orchestration',
    iconType: 'kubernetes',
    level: 'Advanced',
    highlight: 'Lightweight multi-node cluster administration, HPA CPU auto-scaling, ingress controllers, and ConfigMaps/Secrets.',
    tags: ['Cluster Ops', 'HPA Scaling', 'Kube-Proxy']
  },
  // Cloud
  {
    name: 'AWS (EKS, ECR, EC2, S3)',
    category: 'cloud',
    categoryLabel: 'Cloud Compute & K8s',
    iconType: 'aws',
    level: 'Advanced',
    highlight: 'Production container orchestration on AWS EKS, image pushes to AWS ECR, EC2 compute clustering, and S3 object storage.',
    tags: ['AWS EKS', 'AWS ECR', 'AWS EC2', 'AWS S3']
  },
  {
    name: 'AWS S3',
    category: 'cloud',
    categoryLabel: 'Object Storage',
    iconType: 'aws',
    level: 'Advanced',
    highlight: 'Automated disaster recovery backup buckets, lifecycle expiration policies, server-side encryption, and versioning.',
    tags: ['Disaster Recovery', 'Lifecycle Rules', 'Encryption']
  },
  // Database
  {
    name: 'PostgreSQL',
    category: 'database',
    categoryLabel: 'Relational Database',
    iconType: 'postgresql',
    level: 'Advanced',
    highlight: 'PostgreSQL database design, Sequelize ORM schemas, primary-replica streaming replication, and automated pg_dump backups.',
    tags: ['Sequelize ORM', 'Schema Design', 'Streaming Replication', 'Failover']
  },
  // Backend & Scripting
  {
    name: 'Fastify & REST APIs',
    category: 'containers',
    categoryLabel: 'Backend Framework',
    iconType: 'fastify',
    level: 'Advanced',
    highlight: 'Architecting high-performance backend microservices, JWT authentication, structured request validation, and clean REST APIs.',
    tags: ['Fastify', 'REST APIs', 'JWT Auth', 'Validation']
  },
  {
    name: 'Node.js',
    category: 'containers',
    categoryLabel: 'Backend Runtime',
    iconType: 'nodejs',
    level: 'Advanced',
    highlight: 'Production microservices deployment, health check probes (/healthz), PM2 clustering, and TypeScript/JavaScript backend services.',
    tags: ['Node.js', 'REST APIs', 'Microservices', 'TypeScript']
  },
  {
    name: 'Linux & Bash',
    category: 'cloud',
    categoryLabel: 'Systems & Shell',
    iconType: 'linux',
    level: 'Advanced',
    highlight: 'Automated maintenance cron scripts, systemd unit services, disk telemetry, network troubleshooting, and security hardening.',
    tags: ['Cron Jobs', 'Systemd', 'Troubleshooting']
  },
  // Concepts
  {
    name: 'High Availability (HA)',
    category: 'concepts',
    categoryLabel: 'Architecture',
    iconType: 'concept-ha',
    level: 'Architecture Principle',
    highlight: 'Designing redundant multi-node topologies across availability zones with automatic health check self-healing.',
    tags: ['Redundancy', 'Multi-AZ', 'Fault Tolerance']
  },
  {
    name: 'RPO (Recovery Point Objective)',
    category: 'concepts',
    categoryLabel: 'Disaster Recovery',
    iconType: 'concept-rpo',
    level: 'Target: <15 Minutes',
    highlight: 'Minimizing permissible data loss through continuous WAL streaming and automated frequent snapshot cadences.',
    tags: ['Data Loss Minimization', 'WAL Streaming', 'Snapshots']
  },
  {
    name: 'RTO (Recovery Time Objective)',
    category: 'concepts',
    categoryLabel: 'Disaster Recovery',
    iconType: 'concept-rto',
    level: 'Target: <30 Minutes',
    highlight: 'Automating point-in-time recovery playbooks and standby promotion scripts to restore service swiftly upon outage.',
    tags: ['Restoration Speed', 'Failover Scripts', 'Testing']
  },
  {
    name: 'Backup & Recovery Planning',
    category: 'concepts',
    categoryLabel: 'Data Protection',
    iconType: 'concept-backup',
    level: 'SOP & Automation',
    highlight: 'Cron-triggered incremental backups, off-site encrypted storage in AWS S3, and scheduled restore verification drills.',
    tags: ['Cron Automation', 'S3 Offsite', 'Verification Drills']
  }
]
