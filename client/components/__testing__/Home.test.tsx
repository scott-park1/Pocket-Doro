// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'

import { renderRoute } from '../../test-utils'

import Home from '../Home'

describe('<Home />', () => {
  it.todo('renders the title')

  it('displays a startlink that has the text start', () => {
    renderRoute('/start')
  })
})
