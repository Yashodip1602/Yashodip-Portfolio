export const projectsData = [
  {
    id: 'master-aws-k3s-cicd',
    featured: true,
    title: 'Master Project: Node.js Enterprise Deployment on AWS',
    subtitle: 'End-to-End GitOps CI/CD Pipeline across Multi-Node AWS EC2 with k3s & ArgoCD',
    description:
      'Engineered a production-ready, resilient Node.js deployment spanning two AWS EC2 instances (master control plane & worker node). Automated the full lifecycle using Jenkins for continuous integration, Docker for multi-stage container packaging, k3s for lightweight Kubernetes orchestration, and ArgoCD for declarative GitOps continuous delivery.',
    architectureDetails: [
      'Multi-Node Topology: Master control plane node and dedicated worker node on AWS EC2 in custom VPC with restricted security groups.',
      'Continuous Integration: Jenkins webhook triggers on Git push, runs unit test suite, and builds optimized multi-stage Docker images.',
      'GitOps Continuous Delivery: ArgoCD continuously reconciles cluster state against declarative Kubernetes manifests in Git.',
      'CPU-Based Auto-Scaling (HPA): Implemented Kubernetes Horizontal Pod Autoscaler targeting 70% CPU threshold, dynamically scaling replicas between 2 and 6 pods during traffic surges.',
      'Zero-Downtime Releases: Rolling deployment strategy ensuring 100% service availability with automated rollback upon liveness probe failure.'
    ],
    scalingPlan: {
      metric: 'CPU Utilization',
      threshold: '70% Target Utilization',
      minReplicas: 2,
      maxReplicas: 6,
      strategy: 'RollingUpdate (maxSurge: 1, maxUnavailable: 0)',
      healthCheck: 'HTTP GET /healthz interval 10s'
    },
    pipelineSteps: [
      {
        step: 1,
        title: 'Git Push',
        desc: 'Developer pushes code to GitHub repository main branch',
        icon: 'git'
      },
      {
        step: 2,
        title: 'Jenkins CI',
        desc: 'Webhook triggers pipeline: test, lint, and security scan',
        icon: 'jenkins'
      },
      {
        step: 3,
        title: 'Docker Build',
        desc: 'Multi-stage image built and tagged with commit SHA',
        icon: 'docker'
      },
      {
        step: 4,
        title: 'Registry',
        desc: 'Image pushed to secure container registry with hash',
        icon: 'registry'
      },
      {
        step: 5,
        title: 'ArgoCD Sync',
        desc: 'Detects manifest changes & initiates GitOps synchronization',
        icon: 'argocd'
      },
      {
        step: 6,
        title: 'k3s Cluster',
        desc: 'Deploys across 2 AWS EC2 nodes with CPU autoscaling (HPA)',
        icon: 'k3s'
      }
    ],
    tags: ['AWS EC2', 'Jenkins', 'Docker', 'k3s', 'ArgoCD', 'Node.js', 'GitOps', 'HPA Scaling', 'Linux'],
    // TODO: replace with your actual GitHub repository URL
    githubUrl: 'https://github.com/yashodipjejurkar/master-devops-nodejs-aws-k3s',
    // TODO: replace with your live demo or architecture docs link
    liveUrl: 'https://github.com/yashodipjejurkar/master-devops-nodejs-aws-k3s#architecture-walkthrough'
  },
  {
    id: 'postgres-replication-s3-backup',
    featured: false,
    title: 'PostgreSQL High-Availability Replication & S3 Backup',
    subtitle: 'Primary-Replica Clustering on AWS EC2 with Automated Cron Disasters Recovery',
    description:
      'Configured a high-availability PostgreSQL cluster on AWS EC2 featuring real-time physical streaming replication between primary (read/write) and standby replica (read-only) nodes. Built automated scheduled backup cron daemons that compress, encrypt, and push database dumps to AWS S3 with stringent disaster recovery SLA guarantees.',
    architectureDetails: [
      'Physical Streaming Replication: Configured Write-Ahead Logging (WAL) streaming via replication slots for real-time replica synchrony.',
      'Automated S3 Offsite Archiving: Bash cron scripts executing daily full dumps and hourly WAL differential syncs to an encrypted AWS S3 bucket.',
      'RPO Target (< 15 Minutes): Recovery Point Objective bounded by continuous WAL archiving, ensuring minimal permissible data loss.',
      'RTO Target (< 30 Minutes): Recovery Time Objective streamlined via scripted standby promotion and DNS/VIP failover playbooks.',
      'Lifecycle Policies: S3 bucket lifecycle rules transitioning 30-day dumps to Glacier and auto-expiring obsolete archives to optimize storage costs.'
    ],
    scalingPlan: {
      rpo: '< 15 Minutes (Continuous WAL streaming to S3)',
      rto: '< 30 Minutes (Scripted standby promotion & DNS reroute)',
      backupCadence: 'Hourly incremental + Daily full compressed backup',
      retention: '30-day standard S3 storage, 90-day Glacier archive'
    },
    tags: ['PostgreSQL', 'AWS EC2', 'AWS S3', 'WAL Replication', 'Bash Scripting', 'Cron Automation', 'RPO/RTO', 'DR Playbook'],
    // TODO: replace with your actual GitHub repository URL
    githubUrl: 'https://github.com/yashodipjejurkar/postgres-replication-s3-backup',
    liveUrl: 'https://github.com/yashodipjejurkar/postgres-replication-s3-backup#disaster-recovery-plan'
  },
  {
    id: 'blog-management-platform',
    featured: false,
    title: 'High-Performance Blog Management Platform Backend',
    subtitle: 'Node.js, Fastify REST APIs & Optimized PostgreSQL with Structured Validation',
    description:
      'Architected and deployed a production-ready blog platform backend using Fastify for high-performance, low-latency request handling and optimized PostgreSQL relational queries. Engineered end-to-end content workflows including article creation, publishing pipelines, and hierarchical comment management with structured data validation.',
    architectureDetails: [
      'High-Throughput Fastify Engine: Leveraging Fastify schema compilation for sub-millisecond serialization and minimal latency.',
      'PostgreSQL & Sequelize ORM: Normalized relational schema design, indexed queries, connection pooling, and transactional integrity.',
      'JWT Authentication & Authorization: Role-based access control (RBAC) securing author endpoints, editorial workflows, and reader permissions.',
      'Structured Data Validation: Strict payload sanitization and error handling preventing injection vulnerabilities.'
    ],
    scalingPlan: {
      alerting: 'P95 response latency < 25ms, zero unhandled rejections',
      metricsRetention: 'Structured JSON application logging with Winston',
      iacWorkflow: 'Fastify -> Sequelize -> PostgreSQL Container'
    },
    tags: ['Node.js', 'Fastify', 'PostgreSQL', 'Sequelize', 'REST APIs', 'JWT Auth'],
    githubUrl: 'https://github.com/yashodipjejurkar/blog-management-platform',
    liveUrl: 'https://github.com/yashodipjejurkar/blog-management-platform#api-documentation'
  },
  {
    id: 'terraform-aws-observability-stack',
    featured: false,
    title: 'Cloud Infrastructure as Code & Observability Stack',
    subtitle: 'Automated AWS Multi-AZ Provisioning with Prometheus & Grafana Monitoring',
    description:
      'Designed declarative Terraform modules to provision immutable AWS cloud infrastructure including VPC, public/private subnets, internet gateways, and EC2 instances. Coupled the infrastructure with a containerized observability stack using Prometheus, Node Exporter, and Grafana to track compute metrics, disk I/O, and container health in real-time.',
    architectureDetails: [
      'Modular Terraform: Reusable Terraform modules with remote S3 state locking via DynamoDB to prevent race conditions during updates.',
      'Security Hardened: Principle of least privilege applied to AWS IAM policies and strict security group ingress/egress CIDR rules.',
      'Prometheus Telemetry: Metric scraping from Kubernetes nodes, container cAdvisor endpoints, and database connection pools at 15s intervals.',
      'Grafana Visualizations: Pre-configured dashboards showcasing CPU saturation, memory exhaustion alerts, and network throughput.'
    ],
    scalingPlan: {
      alerting: 'Alertmanager integration for CPU > 85% and disk usage > 80%',
      metricsRetention: '15 days on dedicated persistent EBS volume',
      iacWorkflow: 'Terraform plan -> static security check -> automated apply'
    },
    tags: ['Terraform', 'AWS VPC', 'Prometheus', 'Grafana', 'Docker Compose', 'Linux Monitoring', 'IaC'],
    githubUrl: 'https://github.com/yashodipjejurkar/terraform-aws-observability',
    liveUrl: 'https://github.com/yashodipjejurkar/terraform-aws-observability#dashboard-preview'
  }
]
