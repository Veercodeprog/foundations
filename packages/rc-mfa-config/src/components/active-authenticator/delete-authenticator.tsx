import React, { FC, useEffect } from 'react'
import { Button } from '@reapit/elements'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../core/connect-session'

interface DeleteAuthenticatorProps {
  authenticatorId?: string
  refreshAuthenticators: () => void
  userId?: string
}

export const handleDeleteAuthenticator = (deleteAuthenticator: SendFunction<void, boolean>) => () => {
  deleteAuthenticator()
}

export const handleRefresh = (refreshAuthenticators: () => void, hasDeleted?: boolean) => () => {
  if (hasDeleted) {
    refreshAuthenticators()
  }
}

export const DeleteAuthenticator: FC<DeleteAuthenticatorProps> = ({
  authenticatorId,
  userId,
  refreshAuthenticators,
}) => {
  const [deleteAuthenticatorLoading, , deleteAuthenticator, hasDeleted] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.deleteUserAuthenticator],
    method: 'DELETE',
    uriParams: {
      userId,
      authenticatorId,
    },
  })

  useEffect(handleRefresh(refreshAuthenticators, hasDeleted), [hasDeleted])

  return (
    <Button
      intent="primary"
      loading={deleteAuthenticatorLoading}
      disabled={deleteAuthenticatorLoading}
      onClick={handleDeleteAuthenticator(deleteAuthenticator)}
    >
      Reset Authenticator
    </Button>
  )
}
