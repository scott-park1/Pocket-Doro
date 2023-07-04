// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'

import { renderRoute } from '../../test-utils'

describe('<Start>', () => {
  it('should render PocketDoro', () => {
    renderRoute('/start')
    expect(
      screen.getByRole('heading', { name: /pocket doro/i })
    ).toBeInTheDocument()
  })

  it('should render information about the timer and how much you worked on', async () => {
    renderRoute('/start')
    const timertext = screen.getByTestId('timer-information')
    expect(timertext).toBeInTheDocument()
  })
})
