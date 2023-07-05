// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'

import { renderRoute } from '../../test-utils'
import nock from 'nock'

describe('<TaskList>', () => {
  it('should render a loading indicator', () => {
    nock('http://localhost').get('/api/v1/task').reply(200, {
      id: 'test1',
      name: 'test2',
    })

    renderRoute('/start')

    expect(screen.getByText(/loading your tasks/i)).toBeInTheDocument()
  })

  it('should render an error message when things go wrong', async () => {
    const scope = nock('http://localhost').get('/api/v1/task').reply(500)

    renderRoute('/start')

    await waitForElementToBeRemoved(() =>
      screen.queryByText(/loading your tasks/i)
    )

    expect(
      screen.getByText(/there was an error trying to get the tasks/i)
    ).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })
})
