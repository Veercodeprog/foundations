import * as React from 'react'
import { render } from '@testing-library/react'
import Header from '../index'
import { MockedProvider } from '@apollo/client/testing'
import routeData from 'react-router'
import { MemoryRouter } from 'react-router-dom'
import { Editor } from '@craftjs/core'

// mock react-tooltip's uuid generation to have consistent class names in the snapshots https://github.com/wwayne/react-tooltip/issues/595#issuecomment-730875047
jest.mock(
  (() => {
    // This will mock the version of uuid belonging to react-tooltip
    // if it exists, otherwise use the top-level uuid module
    try {
      require('react-tooltip/node_modules/uuid')
      return 'react-tooltip/node_modules/uuid'
    } catch (error) {
      return 'uuid'
    }
  })(),
  () => ({
    v4: () => '00000000-0000-0000-0000-000000000000',
  }),
)

describe('Header', () => {
  const mockParams = {
    appId: '123',
    pageId: '456',
  }
  const mockLocation = {
    pathname: '/123/456',
    hash: '',
    search: '',
    state: '',
  }
  beforeEach(() => {
    jest.spyOn(routeData, 'useParams').mockReturnValue(mockParams)
    jest.spyOn(routeData, 'useLocation').mockReturnValue(mockLocation)
  })
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <MemoryRouter>
          <Editor>
            <Header setBreakpoint={undefined} breakpoint={undefined} showNewPage={undefined} />
          </Editor>
        </MemoryRouter>
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
