export const skillCategories = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'cicd', label: 'CI/CD' },
  { id: 'containers', label: 'Containers & K8s' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'iac-security', label: 'IaC & Security' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'backend-db', label: 'Backend & DB' },
  { id: 'system', label: 'System' }
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
    name: 'GitHub',
    category: 'cicd',
    categoryLabel: 'CI/CD',
    iconType: 'github',
    level: 'Advanced',
    highlight: 'Automating build, test, and release workflows with GitHub Actions and managing repository security.',
    tags: ['GitHub Actions', 'Workflows', 'Branch Protection', 'CI Automation']
  },
  {
    name: 'GitLab',
    category: 'cicd',
    categoryLabel: 'CI/CD',
    iconType: 'gitlab',
    level: 'Proficient',
    highlight: 'Building declarative .gitlab-ci.yml multi-stage pipelines with custom GitLab Runners and artifact caching.',
    tags: ['GitLab CI/CD', 'Runners', 'Artifact Caching', 'Auto Deploy']
  },

  // Containers & K8s
  {
    name: 'Docker',
    category: 'containers',
    categoryLabel: 'Containers & K8s',
    iconType: 'docker',
    level: 'Advanced',
    highlight: 'Multi-stage Dockerfiles, image size minimization, vulnerability scanning, and Docker Compose environments.',
    tags: ['Multi-Stage', 'Compose', 'Image Optimization']
  },
  {
    name: 'k3s / Kubernetes',
    category: 'containers',
    categoryLabel: 'Containers & K8s',
    iconType: 'kubernetes',
    level: 'Advanced',
    highlight: 'Lightweight multi-node cluster administration, HPA CPU auto-scaling, ingress controllers, and ConfigMaps/Secrets.',
    tags: ['Cluster Ops', 'HPA Scaling', 'Kube-Proxy']
  },

  // Cloud
  {
    name: 'AWS',
    category: 'cloud',
    categoryLabel: 'Cloud',
    iconType: 'aws',
    level: 'Advanced',
    highlight: 'Architecting resilient cloud infrastructure with IAM least privilege, VPC networking, security groups, and S3.',
    tags: ['IAM Roles', 'VPC Networking', 'Security Groups', 'S3']
  },
  {
    name: 'AWS EKS',
    category: 'cloud',
    categoryLabel: 'Cloud',
    iconType: 'aws eks',
    level: 'Advanced',
    highlight: 'Deploying and managing production-grade Kubernetes clusters, managed worker node groups, and IRSA.',
    tags: ['Managed K8s', 'Node Groups', 'IRSA', 'Pod Networking']
  },
  {
    name: 'AWS EC2',
    category: 'cloud',
    categoryLabel: 'Cloud',
    iconType: 'aws ec2',
    level: 'Advanced',
    highlight: 'Configuring Linux EC2 instances, EBS persistent volumes, load balancing, and Auto Scaling groups.',
    tags: ['EC2 Compute', 'EBS Volumes', 'Auto Scaling', 'System Tuning']
  },

  // IaC & Security
  {
    name: 'Terraform',
    category: 'iac-security',
    categoryLabel: 'IaC & Security',
    iconType: 'terraform',
    level: 'Proficient',
    highlight: 'Writing declarative infrastructure modules with state locking, variable definitions, and reproducible cloud environments.',
    tags: ['IaC', 'Modules', 'Remote State', 'AWS Provider']
  },
  {
    name: 'SonarQube',
    category: 'iac-security',
    categoryLabel: 'IaC & Security',
    iconType: 'sonarqube',
    level: 'Proficient',
    highlight: 'Integrating static code analysis (SAST) into CI pipelines, setting quality gates, and remediating security hotspots.',
    tags: ['SAST', 'Quality Gates', 'Code Smells', 'Vulnerabilities']
  },
  {
    name: 'Trivy',
    category: 'iac-security',
    categoryLabel: 'IaC & Security',
    iconType: 'trivy',
    level: 'Proficient',
    highlight: 'Scanning container images, file systems, and Git repositories for CVE vulnerabilities and security misconfigurations.',
    tags: ['CVE Scanning', 'Image Audits', 'Vulnerability Scan', 'Container Security']
  },

  // Monitoring
  {
    name: 'Prometheus',
    category: 'monitoring',
    categoryLabel: 'Monitoring',
    iconType: 'prometheus',
    level: 'Proficient',
    highlight: 'Scraping system and application metrics using node-exporter and configuring PromQL alerting rules.',
    tags: ['PromQL', 'Node Exporter', 'Metrics Scraping', 'Alerts']
  },
  {
    name: 'Grafana',
    category: 'monitoring',
    categoryLabel: 'Monitoring',
    iconType: 'grafana',
    level: 'Proficient',
    highlight: 'Designing intuitive real-time monitoring dashboards for server telemetry, cluster resources, and error rates.',
    tags: ['Dashboards', 'Telemetry', 'Prometheus Source', 'Observability']
  },

  // Backend & DB
  {
    name: 'Node.js',
    category: 'backend-db',
    categoryLabel: 'Backend & DB',
    iconType: 'nodejs',
    level: 'Advanced',
    highlight: 'Production microservices deployment, health check probes (/healthz), PM2 clustering, and TypeScript/JavaScript backend services.',
    tags: ['Node.js', 'REST APIs', 'Microservices', 'TypeScript']
  },
  {
    name: 'Fastify & REST APIs',
    category: 'backend-db',
    categoryLabel: 'Backend & DB',
    iconType: 'fastify',
    level: 'Advanced',
    highlight: 'Architecting high-performance backend microservices, JWT authentication, structured request validation, and clean REST APIs.',
    tags: ['Fastify', 'REST APIs', 'JWT Auth', 'Validation']
  },
  {
    name: 'PostgreSQL',
    category: 'backend-db',
    categoryLabel: 'Backend & DB',
    iconType: 'postgresql',
    level: 'Advanced',
    highlight: 'PostgreSQL database design, Sequelize ORM schemas, primary-replica streaming replication, and automated pg_dump backups.',
    tags: ['Sequelize ORM', 'Schema Design', 'Streaming Replication', 'Failover']
  },
  {
    name: 'Redis',
    category: 'backend-db',
    categoryLabel: 'Backend & DB',
    iconType: 'redis',
    level: 'Proficient',
    highlight: 'In-memory data caching for sub-millisecond response times, session persistence, and pub/sub messaging queues.',
    tags: ['In-Memory Cache', 'Session Store', 'Pub/Sub', 'Key-Value']
  },

  // System
  {
    name: 'Linux & Bash',
    category: 'system',
    categoryLabel: 'System',
    iconType: 'linux',
    level: 'Advanced',
    highlight: 'Automated maintenance cron scripts, systemd unit services, disk telemetry, network troubleshooting, and security hardening.',
    tags: ['Cron Jobs', 'Systemd', 'Troubleshooting']
  }
]
