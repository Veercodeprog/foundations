import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router'
import { Route } from 'react-router-dom'
import Routes from '../../constants/routes'
import OfficesTab from '../ui/offices/offices-tab'
import OfficesGroupsTab from '../ui/offices/offices-groups-tab'
import {
  BodyText,
  Button,
  elHFull,
  elMb5,
  elMb9,
  FlexContainer,
  Icon,
  PageContainer,
  SecondaryNav,
  SecondaryNavContainer,
  SecondaryNavItem,
  Title,
} from '@reapit/elements'
import { navigate } from '../ui/nav/nav'
import OfficeGroupCreate from '../ui/offices/office-group-create'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { OFFICE_GROUPS_DOCS_URL } from '../../constants/api'
import { OrgIdSelect } from '../hocs/org-id-select'

export const handleDocs = (connectIsDesktop: Boolean) => () => {
  return connectIsDesktop
    ? (window.location.href = `agencycloud://process/webpage?url=${OFFICE_GROUPS_DOCS_URL}`)
    : window.open(OFFICE_GROUPS_DOCS_URL, '_blank')
}

const OfficesPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Offices</Title>
        <SecondaryNav className={elMb9}>
          <SecondaryNavItem onClick={navigate(history, Routes.OFFICES)} active={pathname === Routes.OFFICES}>
            Offices
          </SecondaryNavItem>
          <SecondaryNavItem
            onClick={navigate(history, Routes.OFFICES_GROUPS)}
            active={pathname.includes(Routes.OFFICES_GROUPS)}
          >
            Office Groups
          </SecondaryNavItem>
        </SecondaryNav>
        <Icon className={elMb5} icon="developmentInfographic" iconSize="large" />
        <BodyText hasGreyText>
          {pathname === Routes.OFFICES
            ? 'This list contains all ‘Offices’ within your organisation. To create or manage an Office Group, please visit the ‘Groups’ page.'
            : pathname === Routes.OFFICES_GROUPS
            ? 'This list contains all ‘Offices’ within your organisation. To create or manage an Office Group, please visit the ‘Office Groups’ page.'
            : 'You can create an office group with this wizard. If you want to update the information later, refer to the office groups page.'}
        </BodyText>
        {pathname === Routes.OFFICES_GROUPS && (
          <>
            <Button className={elMb5} intent="primary" onClick={navigate(history, Routes.OFFICES_GROUPS_NEW)}>
              Create Group
            </Button>
            <Button className={elMb5} onClick={handleDocs(connectIsDesktop)}>
              Docs
            </Button>
          </>
        )}
        <OrgIdSelect />
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Route path={Routes.OFFICES} component={OfficesTab} exact />
        <Route path={Routes.OFFICES_GROUPS} component={OfficesGroupsTab} exact />
        <Route path={Routes.OFFICES_GROUPS_NEW} component={OfficeGroupCreate} exact />
      </PageContainer>
    </FlexContainer>
  )
}

export default OfficesPage
