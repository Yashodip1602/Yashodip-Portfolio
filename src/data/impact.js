export const impactData = [
  {
    id: 'gitops-cicd',
    title: 'Automated GitOps CI/CD',
    stat: 'Git Push',
    statLabel: 'Triggers Full Production Deploy',
    badge: 'GitOps Driven',
    description:
      'Jenkins builds the Docker image, pushes it to AWS ECR, and updates the Git manifest repo. ArgoCD then auto-syncs the new version to the k3s cluster.',
    highlights: [
      'Git is the single source of truth',
      'App repo on GitLab, config repo on GitHub',
      'Full audit trail via Git commits'
    ]
  },
  {
    id: 'devsecops-gates',
    title: 'DevSecOps Quality Gates',
    stat: 'Shift-Left',
    statLabel: 'Security and Quality Scans in Pipeline',
    badge: 'DevSecOps',
    description:
      'Added SonarQube for code smell analysis and Trivy for container image vulnerability scanning. Both run on a separate, dedicated EC2 instance.',
    highlights: [
      'SonarQube checks code quality',
      'Trivy scans the pushed ECR image',
      'Jenkins triggers the scan over SSH'
    ]
  },
  {
    id: 'rds-ownership-fix',
    title: 'RDS Ownership Fix',
    stat: 'Fixed',
    statLabel: 'RDS Ownership Errors Resolved',
    badge: 'Database Reliability',
    description:
      'REASSIGN OWNED failed on AWS RDS. I wrote a per-object script (tables, sequences, views) to move ownership to the app role and removed permission errors.',
    highlights: [
      'ALTER OWNER TO for tables, sequences, views',
      'Works within RDS permission limits',
      'Fixed app role access errors'
    ]
  },
  {
    id: 'ecr-lifecycle',
    title: 'Clean Container Registry',
    stat: 'Auto-Clean',
    statLabel: 'Only Last 7 Images Retained',
    badge: 'AWS Cost Control',
    description:
      'Configured an ECR lifecycle policy that keeps only the last 7 images, so the registry stays clean and storage cost stays low.',
    highlights: [
      'Old images expire automatically',
      'Policy managed in AWS, not in the pipeline',
      'Images pushed to ap-south-1 (Mumbai)'
    ]
  },
  {
    id: 'separated-infra',
    title: 'Separated CI, Runtime and Scan Nodes',
    stat: 'Isolated',
    statLabel: 'Workloads on Dedicated EC2 Instances',
    badge: 'AWS Infrastructure',
    description:
      'Jenkins and Docker run on one EC2 instance. k3s, ArgoCD, and the application run on another. SonarQube and Trivy run on their own instance, so builds and scans never slow down production.',
    highlights: [
      'CI load kept away from runtime',
      'Dedicated instance for security scans',
      'Simple and cost-aware AWS setup'
    ]
  }
]