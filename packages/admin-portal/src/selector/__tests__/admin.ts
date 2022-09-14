import { ReduxState } from '@/types/core'
import { selectApprovals, selectDeveloperListState } from '../admin'
import appState from '@/reducers/__stubs__/app-state'

describe('admin', () => {
  const mockState = appState

  describe('selectApprovals', () => {
    it('should run correctly', () => {
      const result = selectApprovals(mockState)
      expect(result).toEqual(mockState.apps.approvals)
    })
    it('should run correctly and return undefined', () => {
      const input = {} as ReduxState
      const result = selectApprovals(input)
      expect(result).toEqual(undefined)
    })
  })

  describe('selectDeveloperListState', () => {
    it('should run correctly', () => {
      const result = selectDeveloperListState(mockState)
      expect(result).toEqual(appState.developers.list)
    })
  })
})
