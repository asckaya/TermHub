import React from 'react'

import type { ComponentSlots } from './slots'

import { SlotContext } from './SlotContext'

export { SlotContext }

interface SlotProviderProps {
  children: React.ReactNode
  /** Resolved slot map (template defaults merged with user overrides) */
  slots: ComponentSlots
}

export const SlotProvider: React.FC<SlotProviderProps> = ({ children, slots }) => {
  return <SlotContext.Provider value={slots}>{children}</SlotContext.Provider>
}
