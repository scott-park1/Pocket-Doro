import { createRoutesFromElements, Route } from 'react-router-dom'

import Home from './components/Home'
import App from './components/App'
import Start from './components/Start'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="start" element={<Start />} />
  </Route>
)
