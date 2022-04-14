import React from 'react'
import { getIntentFromStatus, handleRefreshMembers, SettingsMembersPage } from '..'
import { render } from '../../../../tests/react-testing'
import { mockMembersPagedResult } from '../../../../tests/__stubs__/members'

jest.mock('../../../../core/use-global-state')

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockMembersPagedResult, true]),
  useReapitUpdate: jest.fn(() => []),
}))

describe('SettingsMembersPage', () => {
  it('should match snapshot', () => {
    expect(render(<SettingsMembersPage />)).toMatchSnapshot()
  })
})

describe('getIntentFromStatus', () => {
  const statuses = [
    { status: 'active', intent: 'success' },
    { status: 'rejected', intent: 'danger' },
    { status: 'pending', intent: 'critical' },
    { status: 'any', intent: 'low' },
  ]

  statuses.forEach((status) => {
    it(`should return the intent for ${status}`, () => {
      expect(getIntentFromStatus(status.status)).toEqual(status.intent)
    })
  })
})

describe('handleRefreshMembers', () => {
  it('should handle member update', () => {
    const membersShouldRefresh = true
    const setMembersShouldRefresh = jest.fn()
    const refreshMembers = jest.fn()

    const curried = handleRefreshMembers(membersShouldRefresh, setMembersShouldRefresh, refreshMembers)

    curried()

    expect(refreshMembers).toHaveBeenCalledTimes(1)
    expect(setMembersShouldRefresh).toHaveBeenCalledWith(false)
  })
})
