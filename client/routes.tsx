import { createRoutesFromElements, Route } from 'react-router-dom'

import Home from './components/Home'
import Avatar from './components/Avatar'
import App from './components/App'
import Map from './components/Map'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="start" element={<Avatar />} />
    <Route path="map" element={<Map />} />
  </Route>
)
