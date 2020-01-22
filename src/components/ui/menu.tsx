import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import { LoginType, LoginMode } from '@reapit/cognito-auth'
import { ReduxState } from '@/types/core'
import { authLogout } from '@/actions/auth'
import Routes from '../../constants/routes'
import { Location } from 'history'
import {
  FaCheck,
  FaSignOutAlt,
  FaCloud,
  FaReadme,
  FaCloudUploadAlt,
  FaCloudDownloadAlt,
  FaCog,
  FaDesktop,
  FaNetworkWired,
  FaClipboardList,
  FaPortrait,
  FaTable,
  FaChartBar
} from 'react-icons/fa'
import { MdHelp } from 'react-icons/md'
import { GoDatabase, GoCode, GoPackage } from 'react-icons/go'

export const generateMenuConfig = (
  logoutCallback: () => void,
  location: Location<any>,
  mode: LoginMode
): { [key: string]: MenuConfig } => {
  return {
    ADMIN: {
      defaultActiveKey: 'APPROVALS',
      mode,
      location,
      menu: [
        {
          key: 'LOGO',
          icon: <ReapitLogo className="nav-item-icon" />,
          type: 'LOGO'
        },
        {
          title: 'Approvals',
          key: 'APPROVALS',
          url: Routes.ADMIN_APPROVALS,
          icon: <FaCheck className="nav-item-icon" />,
          type: 'PRIMARY'
        },
        {
          title: 'Apps',
          key: 'APPS',
          url: Routes.ADMIN_APPS,
          icon: <FaClipboardList className="nav-item-icon" />,
          type: 'PRIMARY'
        },
        {
          title: 'Developers',
          key: 'DEV_MANAGEMENT',
          url: Routes.ADMIN_DEV_MANAGEMENT,
          icon: <FaPortrait className="nav-item-icon" />,
          type: 'PRIMARY'
        },
        {
          title: 'Stats',
          key: 'STATS',
          url: Routes.ADMIN_STATS,
          icon: <FaTable className="nav-item-icon" />,
          type: 'PRIMARY'
        },
        {
          title: 'Logout',
          key: 'LOGOUT',
          callback: logoutCallback,
          icon: <FaSignOutAlt className="nav-item-icon" />,
          type: 'SECONDARY'
        }
      ]
    },
    DEVELOPER: {
      defaultActiveKey: 'MANAGE_APPS',
      mode,
      location,
      menu: [
        {
          key: 'LOGO',
          icon: <ReapitLogo className="nav-item-icon" />,
          type: 'LOGO'
        },
        {
          title: 'Apps',
          key: 'MANAGE_APPS',
          url: Routes.DEVELOPER_MY_APPS,
          type: 'PRIMARY',
          icon: <FaCloud className="nav-item-icon" />
        },
        {
          title: 'Submit',
          key: 'SUBMIT_APP',
          url: Routes.SUBMIT_APP,
          type: 'PRIMARY',
          icon: <FaCloudUploadAlt className="nav-item-icon" />
        },
        {
          title: 'Analytics',
          key: 'DEVELOPER_ANALYTICS',
          url: Routes.DEVELOPER_ANALYTICS,
          type: 'PRIMARY',
          icon: <FaChartBar className="nav-item-icon" />
        },
        {
          title: 'API',
          key: 'SWAGGER',
          url: Routes.DEVELOPER_SWAGGER,
          type: 'PRIMARY',
          icon: <GoDatabase className="nav-item-icon" />
        },
        {
          title: 'Docs',
          key: 'API_DOCS',
          url: Routes.DEVELOPER_API_DOCS,
          type: 'PRIMARY',
          icon: <FaReadme className="nav-item-icon" />
        },
        {
          title: 'Desktop',
          key: 'DESKTOP_DOCS',
          url: Routes.DEVELOPER_DESKTOP_DOCS,
          type: 'PRIMARY',
          icon: <FaDesktop className="nav-item-icon" />
        },
        {
          title: 'Elements',
          key: 'ELEMENTS',
          url: Routes.DEVELOPER_ELEMENTS,
          type: 'PRIMARY',
          icon: <GoCode className="nav-item-icon" />
        },
        {
          title: 'Packages',
          key: 'PACKAGES',
          url: Routes.DEVELOPER_PACKAGE_DOCS,
          type: 'PRIMARY',
          icon: <GoPackage className="nav-item-icon" />
        },
        {
          title: 'Web',
          key: 'WEB_COMPONENTS',
          url: Routes.DEVELOPER_WEB_COMPONENTS,
          type: 'PRIMARY',
          icon: <FaNetworkWired className="nav-item-icon" />
        },
        {
          title: 'Settings',
          key: 'SETTINGS',
          url: Routes.SETTINGS,
          icon: <FaCog className="nav-item-icon" />,
          type: 'PRIMARY'
        },
        // {
        //   title: 'Forum',
        //   key: 'FORUM',
        //   url: Routes.FORUM,
        //   icon: <FaComments className="nav-item-icon" />,
        //   type: 'PRIMARY'
        // },
        {
          title: 'Help',
          key: 'HELP',
          url: Routes.DEVELOPER_HELP,
          type: 'PRIMARY',
          icon: <MdHelp className="nav-item-icon" />
        },
        {
          title: 'Logout',
          key: 'LOGOUT',
          callback: logoutCallback,
          icon: <FaSignOutAlt className="nav-item-icon" />,
          type: 'SECONDARY'
        }
      ]
    },
    CLIENT: {
      defaultActiveKey: 'BROWSE_APPS',
      mode,
      location,
      menu: [
        {
          key: 'LOGO',
          icon: <ReapitLogo className="nav-item-icon" />,
          type: 'LOGO'
        },
        {
          title: 'Browse',
          key: 'BROWSE_APPS',
          url: Routes.CLIENT,
          type: 'PRIMARY',
          icon: <FaCloud className="nav-item-icon" />
        },
        {
          title: 'Installed',
          key: 'INSTALLED',
          url: Routes.INSTALLED_APPS,
          type: 'PRIMARY',
          icon: <FaCloudDownloadAlt className="nav-item-icon" />
        },
        {
          title: 'Manage',
          key: 'MY_APPS',
          url: Routes.MY_APPS,
          type: 'PRIMARY',
          icon: <FaClipboardList className="nav-item-icon" />
        },
        {
          title: 'Logout',
          key: 'LOGOUT',
          callback: logoutCallback,
          icon: <FaSignOutAlt className="nav-item-icon" />,
          type: 'SECONDARY'
        }
      ]
    }
  }
}

export interface MenuMappedProps {
  loginType: LoginType
  mode: LoginMode
}

export interface MenuMappedActions {
  logout: () => void
}

export type MenuProps = MenuMappedProps & MenuMappedActions & RouteComponentProps & {}

export const Menu: React.FunctionComponent<MenuProps> = ({ logout, loginType, location, mode }) => {
  const logoutCallback = () => logout()
  const menuConfigs = generateMenuConfig(logoutCallback, location, mode)
  return <Sidebar {...menuConfigs[loginType]} location={location} />
}

export const mapStateToProps = (state: ReduxState): MenuMappedProps => ({
  loginType: state.auth.loginType,
  mode: state?.auth?.refreshSession?.mode || 'WEB'
})

export const mapDispatchToProps = (dispatch: any): MenuMappedActions => ({
  logout: () => dispatch(authLogout())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))
