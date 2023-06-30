// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'

import { renderRoute } from '../../test-utils'

describe('<Home />', () => {
  it.todo('renders the title Pocket-Doro', () => {
    renderRoute('/')

    const title = screen.getByRole('heading', { name: /pocket/i })
    expect(title).toContainHTML('pocket')
  })

  it('renders a startlink that has the text start and a class name', () => {
    renderRoute('/')

    const startLink = screen.getByRole('link', { name: /start/i })
    expect(startLink).toContainHTML('start')
    expect(startLink).toBeInTheDocument()
  })
})
