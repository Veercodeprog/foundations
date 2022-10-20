import React, { FC, MouseEvent, useEffect } from 'react'
import { useHistory } from 'react-router'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import Routes from '../../../constants/routes'
import { BodyText, Button, ButtonGroup, Card, elFadeIn, useModal } from '@reapit/elements'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { updateActions, UpdateActionNames } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { navigate } from '../../../utils/navigation'
import defaultAppIcon from '../../../assets/images/default-app-icon.jpg'
import { useAppState } from '../state/use-app-state'
import { cx } from '@linaria/core'
import { cardCursor } from './__styles__'
import { Link } from 'react-router-dom'

export const handleDeleteApp = (deleteApp: SendFunction<void, boolean>) => (event?: MouseEvent) => {
  event?.stopPropagation()
  deleteApp()
}

export const handleRefreshApps = (appsRefresh: () => void, appDeleted?: boolean) => () => {
  if (appDeleted) {
    appsRefresh()
  }
}

export const handleOpenModal = (openModal: () => void) => (event?: MouseEvent) => {
  event?.stopPropagation()
  openModal()
}

export interface AppCardProps {
  app: AppSummaryModel
}

export const AppCard: FC<AppCardProps> = ({ app }) => {
  const history = useHistory()
  const { appsDataState } = useAppState()
  const { Modal, openModal, closeModal } = useModal()

  const { appsRefresh } = appsDataState
  const { id, name, isDirectApi, developer, iconUri, summary, deletionProtection } = app

  const [, , deleteApp, appDeleted] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.deleteApp],
    method: 'DELETE',
    uriParams: {
      appId: id,
    },
  })

  useEffect(handleRefreshApps(appsRefresh, appDeleted), [appDeleted])

  return (
    <>
      <Card
        className={cx(elFadeIn, cardCursor)}
        onClick={navigate(history, `${Routes.APPS}/${id}`)}
        hasMainCard
        mainContextMenuItems={[
          {
            icon: 'editSystem',
            onClick: navigate(history, `${Routes.APPS}/${id}/edit/general`),
            intent: 'primary',
          },
          {
            icon: 'trashSystem',
            onClick: handleOpenModal(openModal),
            intent: 'danger',
          },
        ]}
        mainCardHeading={name}
        mainCardSubHeading={developer}
        mainCardSubHeadingAdditional={isDirectApi ? 'Integration' : ''}
        mainCardBody={summary}
        mainCardImgUrl={iconUri ?? defaultAppIcon}
      />
      <Modal title={`Confirm ${name} Deletion`}>
        {deletionProtection ? (
          <BodyText>
            &lsquo;{name}&rsquo; has been set to&lsquo;delete protected&rsquo; to avoid accidental data loss. If you
            really want to delete the app, visit <Link to={`${Routes.APPS}/${id}/edit/app-listing`}>this page </Link>,
            uncheck the delete protection checkbox and save the revision.
          </BodyText>
        ) : (
          <BodyText>
            Are your sure you want to remove the app &lsquo;{name}&rsquo;? By clicking &lsquo;delete&rsquo; it will
            remove all app data including all revisions and listings.
          </BodyText>
        )}
        <ButtonGroup alignment="center">
          <Button fixedWidth intent="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button fixedWidth intent="danger" disabled={deletionProtection} onClick={handleDeleteApp(deleteApp)}>
            Confirm
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}
