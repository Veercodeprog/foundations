import {
  AppsBrowseConfigItemFiltersInterface,
  AppsBrowseConfigItemInterface,
  CategoryModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import React, { FC, createContext, useContext, useState, SetStateAction, Dispatch, useEffect } from 'react'
import { useReapitConnect } from '../../../connect-session/src'
import { registerUserHandler } from './analytics'
import { reapitConnectBrowserSession } from './connect-session'

export interface AppsBrowseConfigItemContent {
  brandColour?: string
  strapline?: string
  imageUrl?: string
  iconName?: string
  title?: string
}

export type AppsBrowseConfigType = 'featuredHeroApps' | 'heroApps' | 'appsFilters' | 'featuredApps' | 'simpleApps'

export interface AppBrowseLiveData {
  timeFrom?: string
  timeTo?: string
  isLive?: boolean
}

export interface AppsBrowseConfigCollection {
  items: AppsBrowseConfigItemInterface[]
}

export interface AppsBrowseStateHook {
  appsBrowseFilterState: AppsBrowseConfigItemFiltersInterface | null
  appsBrowseConfigState: AppsBrowseConfigCollection | null
  appsBrowseCategoriesState: CategoryModelPagedResult | null
  setAppsBrowseFilterState: Dispatch<SetStateAction<AppsBrowseConfigItemFiltersInterface | null>>
}

export const AppsBrowseStateContext = createContext<AppsBrowseStateHook>({} as AppsBrowseStateHook)

const { Provider } = AppsBrowseStateContext

export const AppsBrowseProvider: FC = ({ children }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [analyticsRegistered, setAnalyticsRegistered] = useState<boolean>(false)
  const [appsBrowseFilterState, setAppsBrowseFilterState] = useState<AppsBrowseConfigItemFiltersInterface | null>(null)

  useEffect(registerUserHandler(connectSession, analyticsRegistered, setAnalyticsRegistered), [connectSession])

  const [appsBrowseConfigCollection] = useReapitGet<AppsBrowseConfigCollection>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppMarketAdminLive],
    fetchWhenTrue: [connectSession],
    headers: {
      Authorization: connectSession?.idToken as string,
    },
  })

  const [appsBrowseCategoriesCollection] = useReapitGet<CategoryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getAppCategories],
    queryParams: { pageSize: 25 },
  })

  return (
    <Provider
      value={{
        appsBrowseFilterState,
        appsBrowseConfigState: appsBrowseConfigCollection,
        appsBrowseCategoriesState: appsBrowseCategoriesCollection,
        setAppsBrowseFilterState: setAppsBrowseFilterState,
      }}
    >
      {children}
    </Provider>
  )
}

export const useAppsBrowseState = (): AppsBrowseStateHook => {
  return useContext(AppsBrowseStateContext)
}
