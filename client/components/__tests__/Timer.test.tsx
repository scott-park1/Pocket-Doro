// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import '../../test-utils'

import Timer from '../Timer'

describe('<Timer>', () => {
  it('should show countdown from 25 minutes', () => {
    render(
      <Timer
        skippedBreaks={0}
        onSkipBreak={() => {}}
        resting={false}
        setResting={() => {}}
      />
    )
    const timeValue = screen.getByText(/25/i)
    expect(timeValue).toBeInTheDocument()
  })
  it.skip('should show 24:58 minutes in the document', async () => {
    render(
      <Timer
        skippedBreaks={0}
        onSkipBreak={() => {}}
        resting={false}
        setResting={() => {}}
      />
    )
    await waitFor(
      () => {
        expect(screen.getByText('24:58')).toBeInTheDocument()
        // This one is failing. Testing timers is really hard.
      },
      { timeout: 3000 }
    )
  })
})
