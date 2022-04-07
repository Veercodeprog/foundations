import React from 'react'
import { shallow } from 'enzyme'
import { AppStateContextProps, AppStateProvider, defaultAppState, useAppState } from '../app-state'
import { renderHook, act } from '@testing-library/react-hooks'

describe('AppStateProvider', () => {
  it('should match snapshot', () => {
    expect(
      shallow(
        <AppStateProvider>
          <div />
        </AppStateProvider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('useAppState', () => {
  xit('should return appState and setAppState', async () => {
    const { result } = renderHook<{}, AppStateContextProps>(() => useAppState(), {
      wrapper: (props) => <AppStateProvider>{props.children}</AppStateProvider>,
    })

    expect(result.current.appState).toBe(defaultAppState)

    act(() => {
      result.current.setAppState({
        ...defaultAppState,
        hasGeoLocation: true,
      })
    })

    expect(result.current.appState.hasGeoLocation).toBe(true)
  })
})
