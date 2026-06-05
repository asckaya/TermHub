import React from 'react'

interface RouteConsoleTriggerProps {
  children: React.ReactNode
}

export const RouteConsoleTrigger: React.FC<RouteConsoleTriggerProps> = ({ children }) => {
  return <div className="w-full">{children}</div>
}
