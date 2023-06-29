// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '../../test-utils'

import Timer from '../Timer'

describe('<Timer>', () => {
  it('should show countdown from 25 minutes', () => {
    render(<Timer />)
    const timeValue = screen.getByText(/25/i)
    expect(timeValue).toBeInTheDocument()
  })
  it('should show 24:58 minutes in the document', async () => {
    render(<Timer />)
    await waitFor(
      () => {
        expect(screen.getByText('24:58')).toBeInTheDocument()
      },
      { timeout: 3000 }
    )
    screen.debug()
  })
})
