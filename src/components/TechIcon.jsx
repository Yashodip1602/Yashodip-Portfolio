import {
  SiJenkins,
  SiArgo,
  SiDocker,
  SiKubernetes,
  SiPostgresql,
  SiNodedotjs,
  SiFastify,
  SiLinux,
  SiGit,
  SiTerraform,
  SiPrometheus,
  SiGrafana,
  SiRedis,
  SiGitlab,
  SiSonarqubeserver,
  SiTrivy
} from 'react-icons/si'
import { FaAws, FaGithub } from 'react-icons/fa6'
import {
  Server,
  Database,
  ShieldCheck,
  Clock,
  RefreshCw,
  Cpu,
  Layers,
  Box,
  Terminal,
  Activity,
  HardDrive
} from 'lucide-react'

export const TechIcon = ({ name, className = 'w-6 h-6' }) => {
  const iconKey = (name || '').toLowerCase()

  switch (iconKey) {
    case 'jenkins':
      return <SiJenkins className={`${className} text-[#D24939]`} />
    case 'argocd':
    case 'argo':
      return <SiArgo className={`${className} text-[#EF7B4D]`} />
    case 'docker':
      return <SiDocker className={`${className} text-[#2496ED]`} />
    case 'kubernetes':
    case 'k3s':
      return <SiKubernetes className={`${className} text-[#326CE5]`} />
    case 'aws':
    case 'aws ec2':
    case 'aws s3':
    case 'aws eks':
    case 'eks':
      return <FaAws className={`${className} text-[#FF9900]`} />
    case 'postgresql':
    case 'postgres':
      return <SiPostgresql className={`${className} text-[#4169E1]`} />
    case 'nodejs':
    case 'node.js':
      return <SiNodedotjs className={`${className} text-[#5FA04E]`} />
    case 'fastify':
      return <SiFastify className={`${className} text-text`} />
    case 'linux':
    case 'bash':
      return <SiLinux className={`${className} text-[#FCC624]`} />
    case 'git':
      return <SiGit className={`${className} text-[#F05032]`} />
    case 'github':
      return <FaGithub className={`${className} text-text`} />
    case 'terraform':
      return <SiTerraform className={`${className} text-[#7B42BC]`} />
    case 'prometheus':
      return <SiPrometheus className={`${className} text-[#E6522C]`} />
    case 'grafana':
      return <SiGrafana className={`${className} text-[#F46800]`} />
    case 'redis':
      return <SiRedis className={`${className} text-[#DC382D]`} />
    case 'gitlab':
      return <SiGitlab className={`${className} text-[#FC6D26]`} />
    case 'sonarqube':
    case 'sonar':
      return <SiSonarqubeserver className={`${className} text-[#4E9BCD]`} />
    case 'trivy':
      return <SiTrivy className={`${className} text-[#1904DA]`} />
    case 'registry':
      return <Box className={`${className} text-accent`} />
    case 'concept-ha':
      return <Layers className={`${className} text-emerald-500`} />
    case 'concept-rpo':
      return <Clock className={`${className} text-amber-500`} />
    case 'concept-rto':
      return <RefreshCw className={`${className} text-accent`} />
    case 'concept-backup':
      return <HardDrive className={`${className} text-blue-500`} />
    case 'cpu':
      return <Cpu className={`${className} text-emerald-500`} />
    case 'shield':
      return <ShieldCheck className={`${className} text-teal-500`} />
    case 'database-icon':
      return <Database className={`${className} text-indigo-500`} />
    case 'server':
      return <Server className={`${className} text-sky-500`} />
    case 'monitoring':
      return <Activity className={`${className} text-orange-500`} />
    default:
      return <Terminal className={`${className} text-accent`} />
  }
}

export default TechIcon
