import * as React from 'react'
import { Redirect, Route, Router as BrowserRouter, Switch } from 'react-router-dom'
import { catchChunkError } from '@reapit/utils-react'
import Routes from '../constants/routes'
import PrivateRoute from './private-route'
import PrivateRouteWrapper from './private-route-wrapper'
import { createBrowserHistory } from 'history'
import { Info } from '@reapit/elements-legacy'
import { PortalProvider } from '@reapit/elements-legacy'
import { OkayPage } from '@reapit/utils-react'

export const history = createBrowserHistory()
const CustomerRegister = React.lazy(() =>
  catchChunkError(() => import('../components/pages/register/customer-register')),
)
const Login = React.lazy(() => catchChunkError(() => import('../components/pages/login')))
const Register = React.lazy(() => catchChunkError(() => import('../components/pages/register')))
const Apps = React.lazy(() => catchChunkError(() => import('../components/pages/apps')))
const ApiDocsPage = React.lazy(() => catchChunkError(() => import('../components/pages/api-docs')))
const SwaggerPage = React.lazy(() => catchChunkError(() => import('../components/pages/swagger')))
const DesktopPage = React.lazy(() => catchChunkError(() => import('../components/pages/desktop')))
const AnalyticsPage = React.lazy(() => catchChunkError(() => import('../components/pages/analytics')))
const RegisterConfirm = React.lazy(() => catchChunkError(() => import('../components/pages/register-confirm')))
const WebhooksPage = React.lazy(() => catchChunkError(() => import('../components/pages/webhooks')))
const SettingsPage = React.lazy(() => catchChunkError(() => import('../components/pages/settings/')))
const Invite = React.lazy(() => catchChunkError(() => import('../components/pages/invite')))
const ElementsPage = React.lazy(() => catchChunkError(() => import('../components/pages/elements')))
const GraphQLPage = React.lazy(() => catchChunkError(() => import('../components/pages/graphql')))
const SelectRolePage = React.lazy(() => catchChunkError(() => import('../components/pages/login/select-role')))
const IaaS = React.lazy(() => catchChunkError(() => import('../components/pages/iaas')))
const EditionDownloadPage = React.lazy(() =>
  catchChunkError(() => import('../components/pages/developer-edition-download')),
)

const Router = () => {
  return (
    <BrowserRouter history={history}>
      <React.Suspense fallback={null}>
        <PortalProvider>
          <Switch>
            <Route path={Routes.OK} exact render={() => <OkayPage />} />
            <Route path={Routes.LOGIN} exact render={() => <Login />} />
            <Route path={Routes.REGISTER} render={() => <Register />} />
            <Route path={Routes.REGISTER_LEGACY} render={() => <Redirect to={Routes.SELECT_ROLE} />} />
            <Route path={Routes.SELECT_ROLE} exact component={SelectRolePage} />
            <Route path={Routes.REGISTER_CONFIRM} exact component={RegisterConfirm} />
            <Route path={Routes.FOUR_O_FOUR} exact render={() => <Info infoType="404" />} />
            <Route path={Routes.INVITE} component={Invite} />
            <PrivateRouteWrapper path="/">
              <Switch>
                <PrivateRoute path={Routes.CUSTOMER_REGISTER} exact component={CustomerRegister} />
                <PrivateRoute path={Routes.APPS} component={Apps} />
                <PrivateRoute path={Routes.ANALYTICS} component={AnalyticsPage} />
                <PrivateRoute path={Routes.API_DOCS} component={ApiDocsPage} />
                <PrivateRoute path={Routes.ANALYTICS_SCHEMA_DOCS} component={ApiDocsPage} />
                <PrivateRoute path={Routes.WEBHOOKS_MANAGE} component={WebhooksPage} />
                <PrivateRoute path={Routes.WEBHOOKS_ABOUT} component={WebhooksPage} />
                <PrivateRoute path={Routes.WEBHOOKS_NEW} component={WebhooksPage} />
                <PrivateRoute path={Routes.WEBHOOKS_LOGS} component={WebhooksPage} />
                <PrivateRoute path={Routes.SWAGGER} exact component={SwaggerPage} />
                <PrivateRoute path={Routes.DESKTOP} exact component={DesktopPage} fetcher />
                <PrivateRoute path={Routes.SETTINGS} component={SettingsPage} />
                <PrivateRoute path={Routes.DEVELOPER_EDITION_DOWNLOAD} component={EditionDownloadPage} />
                <PrivateRoute path={Routes.GRAPHQL} component={GraphQLPage} />
                <PrivateRoute path={Routes.ELEMENTS} exact component={ElementsPage} />
                <PrivateRoute path={Routes.IAAS} exact component={IaaS} />
                <Route render={() => <Info infoType="404" />} />
              </Switch>
            </PrivateRouteWrapper>
          </Switch>
        </PortalProvider>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default Router
