import { type IconType } from 'react-icons'
import {
  FaArrowRight,
  FaAward,
  FaBolt,
  FaBrain,
  FaBriefcase,
  FaChalkboardTeacher,
  FaChartBar,
  FaChevronRight,
  FaClock,
  FaCode,
  FaCodeBranch,
  FaCoffee,
  FaCoins,
  FaDatabase,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaFolder,
  FaGithub,
  FaGlobe,
  FaGraduationCap,
  FaHeart,
  FaLightbulb,
  FaLinkedin,
  FaMedal,
  FaMedium,
  FaPlane,
  FaPlay,
  FaProjectDiagram,
  FaRobot,
  FaRocket,
  FaStar,
  FaTerminal,
  FaTrophy,
  FaUser,
  FaYoutube,
} from 'react-icons/fa'
import {
  SiArxiv,
  SiBilibili,
  SiCsdn,
  SiGooglescholar,
  SiNotion,
  SiX,
  SiZhihu,
} from 'react-icons/si'

const icons: Record<string, IconType> = {
  FaArrowRight,
  FaAward,
  FaBolt,
  FaBrain,
  FaBriefcase,
  FaChalkboardTeacher,
  FaChartBar,
  FaChevronRight,
  FaClock,
  FaCode,
  FaCodeBranch,
  FaCoffee,
  FaCoins,
  FaDatabase,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaFolder,
  FaGithub,
  FaGlobe,
  FaGraduationCap,
  FaHeart,
  FaLightbulb,
  FaLinkedin,
  FaMedal,
  FaMedium,
  FaPlane,
  FaPlay,
  FaProjectDiagram,
  FaRobot,
  FaRocket,
  FaStar,
  FaTerminal,
  FaTrophy,
  FaUser,
  FaYoutube,
  SiArxiv,
  SiBilibili,
  SiCsdn,
  SiGooglescholar,
  SiNotion,
  SiX,
  SiZhihu,
}

interface DynamicIconProps extends React.SVGAttributes<SVGElement> {
  // For backward compatibility with Chakra props
  boxSize?: (number | string)[] | number | string
  name?: string
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ boxSize, name, ...props }) => {
  if (!name) return null
  const IconComponent = (icons as Record<string, IconType | undefined>)[name] ?? FaCode

  // Map boxSize to width/height if it's a number/string
  const size =
    typeof boxSize === 'number'
      ? `${String(boxSize * 4)}px`
      : typeof boxSize === 'string'
        ? boxSize
        : undefined

  return <IconComponent {...props} style={{ height: size, width: size, ...props.style }} />
}

export default DynamicIcon
