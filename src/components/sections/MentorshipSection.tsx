import { useColorMode } from '@/hooks/useColorMode'
import { useLocalizedData } from '@/hooks/useLocalizedData'

const MentorshipSection: React.FC = () => {
  const { about } = useLocalizedData()
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  const tc = {
    border: isDark ? 'rgb(31, 41, 55)' : 'rgb(243, 244, 246)', // gray-800 : gray-100
    line: isDark ? 'rgb(55, 65, 81)' : 'rgb(229, 231, 235)', // gray-700 : gray-200
    name: isDark ? 'rgb(229, 231, 235)' : 'rgb(55, 65, 81)', // gray-200 : gray-700
    text: isDark ? 'rgb(156, 163, 175)' : 'rgb(107, 114, 128)', // gray-400 : gray-500
  }

  if (!about.mentorship) return null

  return (
    <section className="w-full">
      <div className="max-w-full lg:max-w-7xl px-2 md:px-4 lg:px-8 mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-cyan-400 rounded-full flex-shrink-0 h-0.5 w-5" />
          <h3 className="text-base md:text-lg font-semibold">{about.mentorship.heading}</h3>
          <div className="flex-1 h-px" style={{ backgroundColor: tc.line }} />
        </div>
        {about.mentorship.description && (
          <p className="text-xs leading-relaxed mb-4" style={{ color: tc.text }}>
            {about.mentorship.description}
          </p>
        )}
        <div className="flex flex-col">
          {about.mentorship.mentees.map((mentee, index) => (
            <div
              className="flex items-center border-b gap-3 py-2.5"
              key={index}
              style={{ borderColor: tc.border }}
            >
              <div className="bg-cyan-400 rounded-full flex-shrink-0 h-1.5 w-1.5" />
              <a
                className="no-underline hover:no-underline group"
                href={mentee.url}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span
                  className="text-sm font-medium transition-colors group-hover:text-cyan-400"
                  style={{ color: tc.name }}
                >
                  {mentee.name}
                </span>
              </a>
              {mentee.note && (
                <span className="font-mono text-[10px]" style={{ color: tc.text }}>
                  {mentee.note}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MentorshipSection
