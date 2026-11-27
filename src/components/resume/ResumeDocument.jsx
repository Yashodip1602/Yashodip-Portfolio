import { Document, Link, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import { personalData } from '../../data/personal'
import { skillsData } from '../../data/skills'
import { certificationsData, educationData, experienceData } from '../../data/experience'
import { projectsData } from '../../data/projects'
import { impactData } from '../../data/impact'

const ACCENT_TEAL = '#0f766e'
const TEXT_BLACK = '#000000'
const RULE_COLOR = '#0f766e'

const SKILL_GROUPS = [
  { id: 'cicd', label: 'CI/CD' },
  { id: 'containers', label: 'Containers and Orchestration' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'iac-security', label: 'IaC and Security' },
  { id: 'monitoring', label: 'Monitoring' },
  { id: 'backend-db', label: 'Backend and Databases' },
  { id: 'system', label: 'OS and Scripting' }
]

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.14,
    color: TEXT_BLACK,
    backgroundColor: '#ffffff',
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 36
  },
  header: {
    marginBottom: 5
  },
  name: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    color: ACCENT_TEAL,
    lineHeight: 1.1,
    marginBottom: 1.5
  },
  title: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10.5,
    color: TEXT_BLACK,
    lineHeight: 1.14,
    marginBottom: 2
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    fontSize: 9,
    lineHeight: 1.15,
    color: TEXT_BLACK
  },
  contactLink: {
    color: TEXT_BLACK,
    textDecoration: 'none'
  },
  separator: {
    marginHorizontal: 4,
    color: TEXT_BLACK
  },
  section: {
    marginBottom: 4.5
  },
  sectionHeading: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 11,
    color: ACCENT_TEAL,
    textTransform: 'uppercase',
    letterSpacing: 0.35,
    paddingBottom: 1,
    borderBottomWidth: 0.75,
    borderBottomColor: RULE_COLOR,
    marginBottom: 2.5
  },
  bodyText: {
    fontSize: 10,
    lineHeight: 1.14,
    color: TEXT_BLACK
  },
  skillRow: {
    fontSize: 10,
    lineHeight: 1.14,
    marginBottom: 0.75
  },
  skillLabel: {
    fontFamily: 'Helvetica-Bold'
  },
  entryBlock: {
    marginBottom: 3
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1
  },
  entryTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: TEXT_BLACK,
    flex: 1,
    paddingRight: 8
  },
  entryMeta: {
    fontSize: 9.5,
    color: TEXT_BLACK
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0.5,
    paddingLeft: 3
  },
  bulletMarker: {
    width: 9,
    fontSize: 10,
    lineHeight: 1.14
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.14
  },
  projectLink: {
    fontSize: 9,
    color: TEXT_BLACK,
    textDecoration: 'underline'
  },
  compactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 1
  },
  compactLeft: {
    flex: 1,
    paddingRight: 8,
    fontSize: 10,
    lineHeight: 1.14
  },
  compactRight: {
    fontSize: 9.5,
    lineHeight: 1.14
  }
})

function normalizeTitle(role) {
  return role.replace(/\s*&\s*/g, ' | ')
}

function formatLocation(location) {
  return location.replace(/,\s*India$/i, '')
}

function buildSkillRows() {
  return SKILL_GROUPS.map(group => {
    const items = skillsData
      .filter(skill => skill.category === group.id)
      .map(skill => skill.name)

    return {
      id: group.id,
      label: group.label,
      itemsText: items.join(', ')
    }
  }).filter(group => group.itemsText.length > 0)
}

export function ResumeDocument() {
  const { name, role, bioShort, contact } = personalData
  const skillRows = buildSkillRows()
  const portfolioUrl = contact.portfolio || 'https://yashodip.me'
  const portfolioLabel = portfolioUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
  const headerTitle = normalizeTitle(role)
  const shortLocation = formatLocation(contact.location)
  const phoneHref = `tel:${contact.phone.replace(/\s+/g, '')}`

  return (
    <Document
      title={`${name} - ${headerTitle}`}
      author={name}
      subject="DevOps Engineer and Backend Developer Resume"
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{headerTitle}</Text>
          <View style={styles.contactRow}>
            <Link src={`mailto:${contact.email}`} style={styles.contactLink}>
              {contact.email}
            </Link>
            <Text style={styles.separator}>|</Text>
            <Link src={phoneHref} style={styles.contactLink}>
              {contact.phone}
            </Link>
            <Text style={styles.separator}>|</Text>
            <Text>{shortLocation}</Text>
            <Text style={styles.separator}>|</Text>
            <Link src={contact.github} style={styles.contactLink}>
              GitHub
            </Link>
            <Text style={styles.separator}>|</Text>
            <Link src={contact.linkedin} style={styles.contactLink}>
              LinkedIn
            </Link>
            <Text style={styles.separator}>|</Text>
            <Link src={portfolioUrl} style={styles.contactLink}>
              {portfolioLabel}
            </Link>
          </View>
        </View>

        {/* Professional Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading} minPresenceAhead={40}>
            Professional Summary
          </Text>
          <Text style={styles.bodyText}>{bioShort}</Text>
        </View>

        {/* Technical Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading} minPresenceAhead={40}>
            Technical Skills
          </Text>
          {skillRows.map(group => (
            <Text key={group.id} style={styles.skillRow}>
              <Text style={styles.skillLabel}>{group.label}: </Text>
              <Text>{group.itemsText}</Text>
            </Text>
          ))}
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading} minPresenceAhead={40}>
            Experience
          </Text>
          {experienceData.map(item => (
            <View key={item.id} style={styles.entryBlock} wrap={false}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>
                  {item.role} — {item.organization} ({formatLocation(item.location)})
                </Text>
                <Text style={styles.entryMeta}>{item.period}</Text>
              </View>
              {item.bulletPoints.slice(0, 4).map((bullet, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={styles.bulletMarker}>•</Text>
                  <Text style={styles.bulletText}>{bullet}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Key Projects and Impact */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading} minPresenceAhead={40}>
            Key Projects and Impact
          </Text>
          {projectsData.map(project => (
            <View key={project.id} style={styles.entryBlock} wrap={false}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>{project.title}</Text>
                {project.githubUrl ? (
                  <Link src={project.githubUrl} style={styles.projectLink}>
                    GitHub Repository
                  </Link>
                ) : null}
              </View>
              {(project.architectureDetails || []).slice(0, 4).map((detail, index) => (
                <View key={index} style={styles.bulletRow}>
                  <Text style={styles.bulletMarker}>•</Text>
                  <Text style={styles.bulletText}>{detail}</Text>
                </View>
              ))}
            </View>
          ))}
          {impactData.length > 0 && (
            <View style={styles.entryBlock} wrap={false}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryTitle}>Production Engineering Impact</Text>
              </View>
              {impactData.slice(0, 4).map(impact => (
                <View key={impact.id} style={styles.bulletRow}>
                  <Text style={styles.bulletMarker}>•</Text>
                  <Text style={styles.bulletText}>
                    <Text style={styles.skillLabel}>{impact.title}: </Text>
                    {impact.description}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading} minPresenceAhead={40}>
            Education
          </Text>
          {educationData.map(edu => (
            <View key={edu.id} style={styles.compactRow} wrap={false}>
              <Text style={styles.compactLeft}>
                <Text style={styles.skillLabel}>{edu.degree}</Text> — {edu.institution} ({edu.grade})
              </Text>
              <Text style={styles.compactRight}>{edu.period}</Text>
            </View>
          ))}
        </View>

        {/* Certifications */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading} minPresenceAhead={40}>
            Certifications
          </Text>
          {certificationsData.map((cert, index) => (
            <View key={index} style={styles.compactRow} wrap={false}>
              <Text style={styles.compactLeft}>
                <Text style={styles.skillLabel}>{cert.name}</Text> — {cert.issuer} ({cert.status})
              </Text>
              <Text style={styles.compactRight}>{cert.date}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default ResumeDocument
