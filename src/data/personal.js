export const personalData = {
  name: 'Yashodip Jejurkar',
  role: 'DevOps Engineer & Backend Developer',
  location: 'Rahata, Maharashtra, India',
  availability: 'Open for Backend, DevOps & Cloud Roles',
  
  // Hero headline & quick bio from resume
  headline: 'Building scalable Node.js REST APIs, automated CI/CD pipelines, and cloud-native Kubernetes infrastructure on AWS.',
  bioShort: 'DevOps Engineer and Backend Developer specialized in building scalable Node.js/TypeScript REST APIs, PostgreSQL database architectures, Docker containerization, and automated Jenkins CI/CD pipelines on AWS.',
  
  // Extended about bio
  bioFull: [
    'I am a DevOps Engineer and Backend Developer based in Rahata, Maharashtra, India. Specialized in building scalable Node.js/TypeScript REST APIs and cloud-native infrastructure with a focus on modern cloud engineering practices.',
    'My hands-on expertise includes high-performance backend development with Fastify, PostgreSQL database design and Sequelize ORM, containerization with Docker and Kubernetes (AWS EKS & k3s), and automating CI/CD pipelines on AWS.',
    'I have a proven track record in deploying secure, production-ready applications—from structured content workflows and JWT authentication to zero-downtime container deployments and high-availability database replication.'
  ],

  // Core metrics & counters
  stats: [
    {
      id: 'projects',
      value: 15,
      suffix: '+',
      label: 'Backend & DevOps Projects',
      description: 'Production-ready APIs, automated pipelines & K8s deployments'
    },
    {
      id: 'tools',
      value: 20,
      suffix: '+',
      label: 'Tools & Technologies',
      description: 'Node.js, Fastify, Docker, K8s, AWS, Jenkins, PostgreSQL'
    },
    {
      id: 'deployments',
      value: 120,
      suffix: '+',
      label: 'Automated Deployments',
      description: 'Zero-manual builds & container releases deployed on AWS'
    },
    {
      id: 'uptime',
      value: 99.9,
      suffix: '%',
      label: 'Target Infrastructure SLA',
      description: 'High availability, monitoring & health-checked workloads'
    }
  ],

  // Contact details & links from resume
  contact: {
    email: 'jejurkaryashodip@gmail.com',
    phone: '+91 9021504940',
    location: 'Rahata, Maharashtra, India',
    linkedin: 'https://www.linkedin.com/in/yashodip-jejurkar-6b3a44412/',
    github: 'https://github.com/Yashodip1602',
    twitter: 'https://x.com/YashodipRootX',
    resumeUrl: '/resume.pdf'
  },

  // Terminal commands for the interactive terminal component
  terminalCommands: [
    {
      id: 'nodes',
      label: 'kubectl get nodes',
      command: 'kubectl get nodes -o wide',
      output: [
        'NAME           STATUS   ROLES                  AGE   VERSION        INTERNAL-IP',
        'k3s-master-01  Ready    control-plane,master   45d   v1.28.2+k3s1   10.0.1.12',
        'k3s-worker-01  Ready    worker                 45d   v1.28.2+k3s1   10.0.1.48'
      ]
    },
    {
      id: 'pods',
      label: 'kubectl get pods',
      command: 'kubectl get pods -n production',
      output: [
        'NAME                         READY   STATUS    RESTARTS   AGE',
        'nodejs-api-7b8f9c64d-2g8k4   1/1     Running   0          4h12m',
        'nodejs-api-7b8f9c64d-9v1z2   1/1     Running   0          4h12m',
        'postgres-primary-0           1/1     Running   0          18d',
        'postgres-replica-0           1/1     Running   0          18d'
      ]
    },
    {
      id: 'docker',
      label: 'docker ps',
      command: 'docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"',
      output: [
        'NAMES                 STATUS         PORTS',
        'argocd-server         Up 3 weeks     0.0.0.0:443->8080/tcp',
        'jenkins-controller    Up 3 weeks     0.0.0.0:8080->8080/tcp',
        'node-exporter-agent   Up 3 weeks     0.0.0.0:9100->9100/tcp'
      ]
    },
    {
      id: 'jenkins',
      label: 'jenkins build',
      command: 'jenkins-cli build deploy-prod --wait',
      output: [
        'Triggering pipeline "deploy-prod"...',
        'Stage 1: Lint & Unit Tests [PASSED - 14s]',
        'Stage 2: Docker Multi-Stage Build [SUCCESS - 28s]',
        'Stage 3: Trivy Security Scan [0 HIGH / 0 CRITICAL - 9s]',
        'Stage 4: GitOps Repo Commit & Push [HASH: 9a4ef1b]',
        'Stage 5: ArgoCD Sync Triggered [HEALTHY & SYNCED]',
        'BUILD #42 SUCCESSFUL (Total elapsed: 51s)'
      ]
    }
  ]
}
