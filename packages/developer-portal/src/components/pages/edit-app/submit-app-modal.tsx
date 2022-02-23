import { useReapitConnect } from '@reapit/connect-session'
import { ModalProps, BodyText, InputGroup, ButtonGroup, Button, Table, elMb6 } from '@reapit/elements'
import { useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { selectIsCustomer } from '../../../selector/auth'
import { selectCurrentMemberData } from '../../../selector/current-member'
import { selectSettingsPageDeveloperInformation } from '../../../selector/settings'
import { DeveloperModel, MemberModelPagedResult, UpdateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { useForm } from 'react-hook-form'
import { object, SchemaOf, string } from 'yup'
import errorMessages from '../../../constants/error-messages'
import { yupResolver } from '@hookform/resolvers/yup'

export interface SubmitAppModalProps {
  Modal: FC<Partial<ModalProps>>
  closeModal: () => void
  setIsListing: (isListing: boolean) => void
}

interface SubmitAppModalContentProps {
  currentOrganisation: DeveloperModel
  closeModal: () => void
  setIsListing: (isListing: boolean) => void
  isCustomer: boolean
  userRole?: string
  orgStatus?: string
}

const schema: SchemaOf<{ reapitReference: string }> = object().shape({
  reapitReference: string().trim().required(errorMessages.FIELD_REQUIRED),
  status: string().trim().required(errorMessages.FIELD_REQUIRED),
})

export const getTitle = (isCustomer: boolean, orgStatus?: string): string => {
  if (orgStatus === 'pending') {
    return 'Account Information is being verified'
  }

  if (!isCustomer) {
    return 'Account Information Required'
  }

  return 'Account Verification'
}

export const handleCloseModal =
  (setIsListing: (isListing: boolean) => void, updateDeveloperSuccess?: boolean) => () => {
    if (updateDeveloperSuccess) {
      setIsListing(false)
    }
  }

export const SubmitAppModalContent: FC<SubmitAppModalContentProps> = ({
  isCustomer,
  userRole,
  orgStatus,
  closeModal,
  setIsListing,
  currentOrganisation,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateDeveloperModel>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...currentOrganisation,
      companyName: currentOrganisation.company,
      status: 'pending',
      reapitReference: '',
    },
  })

  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [members] = useReapitGet<MemberModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDeveloperMembers],
    uriParams: {
      developerId: connectSession?.loginIdentity.developerId,
    },
    queryParams: {
      role: 'admin',
      status: 'active',
    },
    fetchWhenTrue: [connectSession?.loginIdentity.developerId],
  })

  const [updateDeveloperLoading, , updateDeveloper, updateDeveloperSuccess] = useReapitUpdate<
    UpdateDeveloperModel,
    UpdateDeveloperModel
  >({
    method: 'PUT',
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updateDeveloper],
    uriParams: {
      developerId: connectSession?.loginIdentity.developerId,
    },
  })

  useEffect(handleCloseModal(setIsListing, updateDeveloperSuccess), [updateDeveloperSuccess])

  if (!isCustomer) {
    return (
      <>
        <BodyText>Any changes have been saved successfully.</BodyText>
        <BodyText>
          However, before you can list an app in the AppMarket (&apos;Submit for approval&apos;), you will first need to
          submit your account information.
        </BodyText>
        <BodyText>
          Please{' '}
          <a
            href="mailto:dmann@reapit.com?subject=Submitting%20my%20app%20for%20approval%20/%20listing%20in%20the%20AppMarket"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            click here
          </a>{' '}
          to contact a member of the team.
        </BodyText>
        <ButtonGroup alignment="right">
          <Button intent="low" onClick={closeModal}>
            Close
          </Button>
        </ButtonGroup>
      </>
    )
  }

  if (orgStatus === 'pending') {
    return (
      <>
        <BodyText>
          We are currently verifying your account information. This is typically done within 1 – 2 working days. You
          will be notified via email when this has been completed and you can continue with your app submission.
        </BodyText>
        <ButtonGroup alignment="right">
          <Button intent="low" onClick={closeModal}>
            Close
          </Button>
        </ButtonGroup>
      </>
    )
  }

  if (userRole !== 'admin') {
    return (
      <>
        <BodyText>Any changes have been saved successfully.</BodyText>
        <BodyText>
          However, before an app can be submitted (either privately or publicly), we will first need to verify your
          account information (which can only be submitted by an Admin) as API Consumption charges will apply.
        </BodyText>
        <BodyText>Please contact one of the Admins listed below:</BodyText>
        <Table
          className={elMb6}
          rows={members?.data?.map((member) => ({
            cells: [
              {
                label: 'Name',
                value: member.name ?? '',
                icon: 'usernameSystem',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Email Admin',
                value: '',
                children: (
                  <a
                    href={`mailto:${member.email}?subject=Developer%20Portal%20–%20Listing%20our%20app&body=Before%20we%20can%20submit%20an%20app,%20we%20need%20to%20verify%20our%20Reapit%20Reference.%20Please%20can%20you%20login%20to%20the%20Developer%20Portal,%20submit%20the%20app%20and%20enter%20the%20required%20information.%20The%20Reapit%20Reference%20can%20be%20found%20on%20any%20Reapit%20correspondence%20under%20the%20‘Account’%20section.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Send Email
                  </a>
                ),
                icon: 'emailSystem',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
            ],
          }))}
        />
        <BodyText>
          Alternatively, you can request the option to become an Admin. Simply ask one of the Admins above to visit the
          ‘Organisation’ page to view the member options.
        </BodyText>
        <ButtonGroup alignment="right">
          <Button intent="low" onClick={closeModal}>
            Close
          </Button>
        </ButtonGroup>
      </>
    )
  }

  return (
    <form onSubmit={handleSubmit(updateDeveloper)}>
      <BodyText>Any changes have been saved successfully.</BodyText>
      <BodyText>
        However, before an app can be submitted (either privately or publicly), we will first need to verify your
        account information as API Consumption charges will apply.
      </BodyText>
      <InputGroup
        className={elMb6}
        {...register('reapitReference')}
        inputAddOnText={errors?.reapitReference?.message}
        type="text"
        label="Reapit Reference"
        placeholder="Enter your Reapit reference here"
        intent="danger"
      />
      <BodyText>
        You can find your Reapit Reference from any Reapit correspondence under the ‘Account’ section.
      </BodyText>
      <BodyText>
        The verification process is typically completed within 1 – 2 working days. You will be notified via email when
        this has been completed and you can continue with your app submission.
      </BodyText>
      <ButtonGroup alignment="right">
        <Button intent="low" onClick={closeModal}>
          Close
        </Button>
        <Button intent="primary" type="submit" disabled={updateDeveloperLoading} loading={updateDeveloperLoading}>
          Submit
        </Button>
      </ButtonGroup>
    </form>
  )
}

export const SubmitAppModal: FC<SubmitAppModalProps> = ({ Modal, closeModal, setIsListing }) => {
  const currentUser = useSelector(selectCurrentMemberData)
  const currentOrganisation = useSelector(selectSettingsPageDeveloperInformation)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const isCustomer = selectIsCustomer(connectSession)
  const userRole = currentUser.role
  const orgStatus = currentOrganisation.status

  const title = getTitle(isCustomer, orgStatus)

  return (
    <Modal title={title}>
      <SubmitAppModalContent
        currentOrganisation={currentOrganisation}
        isCustomer={isCustomer}
        userRole={userRole}
        orgStatus={orgStatus}
        closeModal={closeModal}
        setIsListing={setIsListing}
      />
    </Modal>
  )
}
