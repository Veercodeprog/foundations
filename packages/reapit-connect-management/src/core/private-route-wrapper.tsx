import * as React from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { Loader, Section, FlexContainerResponsive, AppNavContainer, FlexContainerBasic } from '@reapit/elements'
import Menu from '@/components/ui/menu'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useLocation, Redirect } from 'react-router'
import Routes from '@/constants/routes'

const { Suspense } = React

export type PrivateRouteWrapperProps = {}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children }) => {
  const { connectSession, connectInternalRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const currentUri = `${location.pathname}${location.search}`

  if (!connectSession) {
    return (
      <AppNavContainer>
        <FlexContainerBasic flexColumn isScrollable>
          <FlexContainerResponsive hasPadding flexColumn>
            <Loader />
          </FlexContainerResponsive>
        </FlexContainerBasic>
      </AppNavContainer>
    )
  }

  if (window.location.pathname === '/') {
    return <Redirect to={Routes.OFFICES} />
  }

  if (connectInternalRedirect && currentUri !== connectInternalRedirect) {
    return <Redirect to={connectInternalRedirect} />
  }
  return (
    <AppNavContainer>
      <Menu />
      <FlexContainerBasic flexColumn isScrollable>
        <FlexContainerResponsive hasPadding flexColumn>
          <Suspense
            fallback={
              <Section>
                <Loader />
              </Section>
            }
          >
            {children}
          </Suspense>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </AppNavContainer>
  )
}

export default PrivateRouteWrapper
