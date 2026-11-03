export const impactData = [
  {
    id: 'zero-manual-deployments',
    title: 'Zero Manual Interventions',
    stat: '100%',
    statLabel: 'Automated CI/CD Pipeline',
    badge: 'GitOps Driven',
    description:
      'Transformed manual server SSH scripts into declarative GitOps workflows with Jenkins & ArgoCD. Every push undergoes automated linting, container builds, and synchronized deployment to production without human touchpoints.',
    highlights: [
      'Eliminated manual SSH configuration drift',
      'Automated rollback upon probe failures',
      'Audit trail recorded via Git commits'
    ]
  },
  {
    id: 'strict-rpo-rto',
    title: 'Strict RPO & RTO Disaster Recovery',
    stat: '<15m',
    statLabel: 'RPO Data Loss Guarantee',
    badge: 'Disaster Recovery',
    description:
      'Engineered PostgreSQL primary-replica streaming replication and cron-driven encrypted S3 backups, achieving an RPO under 15 minutes and RTO under 30 minutes with documented restoration playbooks.',
    highlights: [
      'Continuous WAL streaming replication',
      'Automated cron sync to encrypted AWS S3',
      'Verified point-in-time recovery playbooks'
    ]
  },
  {
    id: 'cpu-elastic-scaling',
    title: 'Self-Healing & Elastic Scaling',
    stat: '70%',
    statLabel: 'Dynamic CPU HPA Threshold',
    badge: 'Kubernetes Orchestration',
    description:
      'Configured Horizontal Pod Autoscaler (HPA) inside k3s on AWS EC2. Pods automatically scale out from 2 up to 6 instances as traffic spikes cross the 70% CPU threshold, maintaining optimal responsiveness while controlling cloud compute costs.',
    highlights: [
      'Zero-downtime rolling deployments',
      'Dynamic workload scaling based on CPU',
      'Automated pod restart on container failure'
    ]
  },
  {
    id: 'cost-effective-ha',
    title: 'Resilient Multi-Node Cloud Architecture',
    stat: '2-Node',
    statLabel: 'Distributed AWS EC2 Topology',
    badge: 'AWS Infrastructure',
    description:
      'Separated Kubernetes control plane and compute worker onto distinct EC2 instances in a hardened VPC. Established least-privilege IAM security policies and encrypted EBS volumes for reliable 24/7 service availability.',
    highlights: [
      'Separation of master and worker workloads',
      'Hardened security groups and IAM roles',
      'Optimized AWS resource utilization'
    ]
  }
]
