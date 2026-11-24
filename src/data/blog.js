export const blogPosts = [
  {
    id: 'day-22-argocd-gitops',
    dayBadge: 'Day 22',
    date: 'Recent Journey',
    readTime: '4 min read',
    title: 'Demystifying GitOps: Why ArgoCD Changed How We Deploy on Kubernetes',
    excerpt:
      'Moving away from imperative kubectl scripts to declarative GitOps. How ArgoCD monitors Git repositories as the single source of truth, detects configuration drifts, and synchronizes live cluster state without manual intervention.',
    takeaway: 'Git is the single source of truth; no direct kubectl access needed in production.',
    tags: ['GitOps', 'ArgoCD', 'Kubernetes', 'CI/CD'],
    // TODO: replace with your actual LinkedIn post URL or personal blog article URL
    postUrl: 'https://www.linkedin.com/in/yashodip-jejurkar-6b3a44412/recent-activity/'
  },
  {
    id: 'day-25-k3s-on-ec2',
    dayBadge: 'Day 25',
    date: 'Recent Journey',
    readTime: '5 min read',
    title: 'Setting Up a Lightweight Kubernetes Cluster with k3s on AWS EC2',
    excerpt:
      'Standard Kubernetes can be resource-heavy for lean architectures. Here is how I bootstrapped a 2-node k3s cluster on AWS EC2, configured Flannel networking, and optimized memory usage while retaining full Kubernetes API compliance.',
    takeaway: 'k3s cuts memory consumption by over 50% without sacrificing standard Kubernetes APIs.',
    tags: ['k3s', 'Kubernetes', 'AWS EC2', 'Linux'],
    // TODO: replace with your actual LinkedIn post URL or personal blog article URL
    postUrl: 'https://www.linkedin.com/in/yashodip-jejurkar-6b3a44412/recent-activity/'
  },
  {
    id: 'day-28-postgres-replication',
    dayBadge: 'Day 28',
    date: 'Recent Journey',
    readTime: '6 min read',
    title: 'PostgreSQL Streaming Replication: Step-by-Step Deep Dive',
    excerpt:
      'How to establish primary-standby physical streaming replication on Linux EC2 instances using pg_basebackup, replication slots, and postgresql.conf parameter tuning for zero data loss and read offloading.',
    takeaway: 'Replication slots prevent the primary from discarding WAL logs before the replica ingests them.',
    tags: ['PostgreSQL', 'Databases', 'High Availability', 'Linux'],
    // TODO: replace with your actual LinkedIn post URL or personal blog article URL
    postUrl: 'https://www.linkedin.com/in/yashodip-jejurkar-6b3a44412/recent-activity/'
  },
  {
    id: 'day-30-rpo-rto-planning',
    dayBadge: 'Day 30',
    date: 'Recent Journey',
    readTime: '5 min read',
    title: 'Defining RPO and RTO in Cloud Disaster Recovery Architecture',
    excerpt:
      'Understanding the critical difference between Recovery Point Objective and Recovery Time Objective. How to architect automated cron backups, off-site encrypted S3 buckets, and standby failover playbooks to meet tough SLAs.',
    takeaway: 'Backups are useless until you have tested and timed the recovery procedure.',
    tags: ['Disaster Recovery', 'RPO/RTO', 'AWS S3', 'Cron Automation'],
    // TODO: replace with your actual LinkedIn post URL or personal blog article URL
    postUrl: 'https://www.linkedin.com/in/yashodip-jejurkar-6b3a44412/recent-activity/'
  },
  {
    id: 'day-32-jenkins-node-pipeline',
    dayBadge: 'Day 32',
    date: 'Recent Journey',
    readTime: '6 min read',
    title: 'Building a Production-Grade Jenkins Pipeline for Node.js Microservices',
    excerpt:
      'A deep dive into constructing robust declarative Jenkinsfiles. Covering multibranch triggers, Docker multi-stage builds, vulnerability scanning with Trivy, and automated Git manifest commits for ArgoCD pickup.',
    takeaway: 'Multi-stage Docker builds shrink runtime images from 850MB down to 120MB.',
    tags: ['Jenkins', 'Node.js', 'Docker', 'Automation'],
    // TODO: replace with your actual LinkedIn post URL or personal blog article URL
    postUrl: 'https://www.linkedin.com/in/yashodip-jejurkar-6b3a44412/recent-activity/'
  }
]
