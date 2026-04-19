import React from 'react'

import { MotionBox } from '@/components/animations/MotionList'
import BioSection from '@/components/sections/BioSection'

import { AboutPageHeader } from './about/AboutPageHeader'
import { ProfileSidebar } from './about/ProfileSidebar'
import { TerminalTypewriter } from './about/TerminalTypewriter'

const AboutPage: React.FC = () => {
  return (
    <div className="py-4 md:py-6 lg:py-8 w-full">
      <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-8">
        <AboutPageHeader />

        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 mt-6">
          {/* Sidebar */}
          <div className="w-full lg:w-[280px] xl:w-[300px] flex-shrink-0">
            <MotionBox delay={0.1}>
              <ProfileSidebar />
            </MotionBox>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <MotionBox delay={0.2}>
              <div className="flex flex-col gap-6 md:gap-7 lg:gap-8">
                {/* Typewriter terminal — self intro */}
                <TerminalTypewriter />

                {/* Bio */}
                <BioSection />
              </div>
            </MotionBox>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
