interface Course {
  course: string
  institution: string
  year: string
}

interface EducationSectionProps {
  courses: Course[]
  logos?: Record<string, string>
}

const EducationSection: React.FC<EducationSectionProps> = ({ courses, logos = {} }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 w-full">
      {courses.map((course, index) => {
        const logo = logos[course.institution]
        return (
          <div
            className="p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border bg-card text-card-foreground"
            key={index}
          >
            <div className="flex items-start gap-3">
              {logo ? (
                <img
                  alt={course.institution}
                  className="w-9 md:w-11 h-9 md:h-11 rounded-md flex-shrink-0 mt-0.5 object-contain"
                  src={logo}
                />
              ) : (
                <div className="w-9 md:w-11 h-9 md:h-11 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center bg-blue-50 dark:bg-blue-900/30">
                  <span className="text-blue-500 text-lg md:text-xl font-bold">
                    {course.institution.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <span className="text-blue-500 text-[10px] md:text-xs font-medium">
                  {course.year}
                </span>
                <h4 className="text-xs md:text-sm font-bold leading-short">{course.course}</h4>
                <p className="text-[10px] md:text-xs opacity-70">{course.institution}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default EducationSection
