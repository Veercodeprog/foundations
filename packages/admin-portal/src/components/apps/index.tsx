import { Loader, PageContainer, Pagination, Title } from '@reapit/elements'
import React, { FC, useState } from 'react'
import { FilterForm } from './filter-form'
import { AppsTable } from './apps-table'
import { objectToQuery, useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { Statistics } from '../statistics'

export interface AppsFilters {
  searchTerm?: string
  companyName?: string
  registeredFrom?: string
  registeredTo?: string
}

export const AppsPage: FC = () => {
  const [appsFilters, setAppsFilters] = useState<AppsFilters>({})
  const queryParams = objectToQuery(appsFilters)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)

  const [apps, appsLoading, , appsRefresh] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: {
      ...queryParams,
      pageNumber,
      pageSize,
    },
  })

  return (
    <PageContainer>
      <Title>Apps Management</Title>
      <FilterForm setAppsFilters={setAppsFilters} apps={apps} />
      {appsLoading ? (
        <Loader />
      ) : (
        <>
          <Statistics area="APPS" data={apps} setPageSize={setPageSize} />
          <AppsTable apps={apps} appsRefresh={appsRefresh} />
          <Pagination
            callback={setPageNumber}
            currentPage={pageNumber}
            numberPages={Math.ceil((apps?.totalCount ?? 1) / (apps?.pageSize ?? 1))}
          />
        </>
      )}
    </PageContainer>
  )
}

export default AppsPage
