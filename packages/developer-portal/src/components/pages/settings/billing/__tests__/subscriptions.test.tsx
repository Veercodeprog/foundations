import {
  TimeCell,
  genarateTableData,
  handleDeleteSubscription,
  Subcriptions,
  handleCloseConfirmModal,
} from '../subscriptions'
import { SubscriptionModel } from '@reapit/foundations-ts-definitions'
import { developerDeleteSubscription } from '@/actions/developer-subscriptions'
import * as ReactRedux from 'react-redux'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { subscriptionModelStub } from '@/sagas/__stubs__/developer-subscriptions'
import { mount } from 'enzyme'
import React from 'react'

describe('TimeCell', () => {
  it('should match snapshot', () => {
    expect(TimeCell({ cell: { value: '02-02-2020' } })).toMatchSnapshot()
  })
})

describe('genarateTableData', () => {
  it('should match snapshot', () => {
    const data = [subscriptionModelStub] as SubscriptionModel[]
    const fn = jest.fn()

    const result = genarateTableData(data, fn)
    const wrapper = result[0].cancel
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleDeleteSubscription', () => {
  it('should run correctly', () => {
    const dispatch = jest.fn()
    const closeModal = jest.fn()
    const id = 'id'
    const fn = handleDeleteSubscription(dispatch, id, closeModal)
    fn()
    expect(dispatch).toBeCalledWith(developerDeleteSubscription(id))
    expect(closeModal).toBeCalled()
  })
})

describe('Subcriptions', () => {
  it('should match snapshot', () => {
    /* mocking store */
    const mockStore = configureStore()
    const store = mockStore(appState)

    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <Subcriptions />
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleCloseConfirmModal', () => {
  it('should run correctly', () => {
    const setIsConfirmModalOpen = jest.fn()
    const fn = handleCloseConfirmModal(setIsConfirmModalOpen)
    fn()
    expect(setIsConfirmModalOpen).toBeCalledWith(false)
  })
})
