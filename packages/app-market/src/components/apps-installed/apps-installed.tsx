import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitGet } from '@reapit/utils-react'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import {
  InstalledAppsCol,
  InstalledAppsContainer,
  InstalledAppsGrid,
  InstalledAppsIcon,
  InstalledAppsIconWrapper,
  InstalledAppsInnerContainer,
  InstalledAppsText,
} from './__styles__'
import { elFadeIn, Loader, PlaceholderImage } from '@reapit/elements'
import { AppsInstalledSuggested } from './apps-installed-suggested'
import { handleLaunchApp } from '../../utils/navigation'

export const AppsInstalled: FC = () => {
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity.clientId
  const developerId = connectSession?.loginIdentity.developerId
  const product = connectSession?.loginIdentity.orgProduct
  const baseParams = {
    clientId,
    onlyInstalled: true,
    showHiddenApps: true,
    isDirectApi: false,
    pageSize: 100,
    product,
  }

  const queryParams = developerId ? { ...baseParams, developerId } : baseParams

  const [apps, appsLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams,
    fetchWhenTrue: [clientId],
  })

  return (
    <InstalledAppsContainer>
      <InstalledAppsInnerContainer>
        {appsLoading ? (
          <Loader />
        ) : (
          <InstalledAppsGrid>
            {apps?.data?.map(({ id, name, iconUri, launchUri }) => (
              <InstalledAppsCol
                className={elFadeIn}
                key={id}
                onClick={handleLaunchApp(connectIsDesktop, id, launchUri)}
              >
                <InstalledAppsIconWrapper>
                  {iconUri ? (
                    <InstalledAppsIcon src={iconUri} alt={name} />
                  ) : (
                    <PlaceholderImage placeholder="placeholderSmall" size={64} />
                  )}
                </InstalledAppsIconWrapper>
                <InstalledAppsText>{name}</InstalledAppsText>
              </InstalledAppsCol>
            ))}
          </InstalledAppsGrid>
        )}
      </InstalledAppsInnerContainer>
      <AppsInstalledSuggested />
    </InstalledAppsContainer>
  )
}
