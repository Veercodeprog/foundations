import { appsBrowseConfigCollection } from '../config'

export const mockAppsBrowseState = {
  appsBrowseDataState: {},
  appsBrowseFilterState: null,
  appsBrowseConfigState: appsBrowseConfigCollection,
  setAppsBrowseFilterState: jest.fn(),
}

export const useWebhooksState = jest.fn(() => mockAppsBrowseState)
