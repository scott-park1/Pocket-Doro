import { createRoutesFromElements, Route } from 'react-router-dom'

import Home from './components/Home'
import Avatar from './components/Avatar'

export const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<Home />} />
    <Route path="/start" element={<Avatar />} />
  </>
)
