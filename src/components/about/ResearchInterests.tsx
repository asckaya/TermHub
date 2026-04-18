import { motion } from 'framer-motion'
import React from 'react'

interface ResearchInterestsProps {
  interests: string[]
}

const ResearchInterests: React.FC<ResearchInterestsProps> = ({ interests }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 w-full">
      {interests.map((interest, index) => (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="p-2 md:p-3 rounded-md shadow-sm text-center border bg-card text-card-foreground"
          initial={{ opacity: 0, y: 20 }}
          key={index}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -2 }}
        >
          <span className="text-xs md:text-sm font-medium opacity-80">{interest}</span>
        </motion.div>
      ))}
    </div>
  )
}

export default ResearchInterests
