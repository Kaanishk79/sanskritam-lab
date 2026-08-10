import { layoutHi } from './layout'
import { dashboardHi } from './dashboard'
import { authHi } from './auth'
import { learningHi } from './learning'
import { researchHi } from './research'
import { toolsHi } from './tools'
import { miscHi } from './misc'

export const translations: Record<string, string> = {
  ...layoutHi,
  ...dashboardHi,
  ...authHi,
  ...learningHi,
  ...researchHi,
  ...toolsHi,
  ...miscHi,
}