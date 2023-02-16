import React, { FC, useEffect } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import {
  BodyText,
  Button,
  ButtonGroup,
  elFadeIn,
  elMb3,
  elMb5,
  elMb7,
  ElToggleItem,
  FlexContainer,
  FormLayout,
  Icon,
  InputError,
  InputGroup,
  InputWrap,
  InputWrapMed,
  Label,
  PageContainer,
  PersistentNotification,
  SecondaryNavContainer,
  SmallText,
  Subtitle,
  Title,
  Toggle,
  useModal,
} from '@reapit/elements'
import { ClientConfigCreateModel, ClientConfigDeleteModel, ClientConfigModel, PaymentLogo } from '@reapit/payments-ui'
import { SendFunction, UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import { ErrorBoundary } from '@sentry/react'
import { openNewPage } from '../../core/nav'
import { useForm, UseFormReset } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useConfigState } from '../../core/use-config-state'
import { cx } from '@linaria/core'
import { validationSchema } from './validation-schema'

export const handleResetForm =
  (config: ClientConfigModel | null, configNotConfigured: boolean, reset: UseFormReset<ClientConfigCreateModel>) =>
  () => {
    if (config) {
      const { clientCode, companyName, logoUri, isLive, configId } = config
      reset({
        clientCode,
        companyName,
        logoUri,
        isLive,
        configId,
      })
    } else if (configNotConfigured) {
      reset({
        companyName: '',
        logoUri: '',
        isLive: false,
        configId: '',
        vendorName: '',
        integrationKey: '',
        passKey: '',
      })
    }
  }

export const handleCloseModal = (closeModal: () => void, shouldClose: boolean, refreshConfig?: () => void) => () => {
  if (shouldClose) {
    closeModal()
    refreshConfig && refreshConfig()
  }
}

export const handleDelete =
  (
    deleteSubmit: SendFunction<ClientConfigDeleteModel, boolean>,
    config: ClientConfigModel | null,
    clearConfigCache?: () => void,
  ) =>
  () => {
    deleteSubmit({ configId: config?.configId })
    clearConfigCache && clearConfigCache()
  }

export const sanitiseConfigPayload = (config: ClientConfigCreateModel, clientCode: string): ClientConfigCreateModel => {
  const { companyName, logoUri, isLive, configId, vendorName, integrationKey, passKey } = config
  const trimmedIntegrationKey = integrationKey?.trim()
  const trimmedPassKey = passKey?.trim()
  const trimmedVendorName = vendorName?.trim()

  const cleanConfigId = configId ? { configId } : {}
  const cleanVendorName = trimmedVendorName ? { vendorName: trimmedVendorName } : {}
  const cleanIntegrationKey = trimmedIntegrationKey ? { integrationKey: trimmedIntegrationKey } : {}
  const cleanPassKey = trimmedPassKey ? { passKey: trimmedPassKey } : {}

  return {
    clientCode,
    companyName,
    logoUri,
    isLive,
    ...cleanVendorName,
    ...cleanConfigId,
    ...cleanIntegrationKey,
    ...cleanPassKey,
  }
}

export const AdminPage: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { Modal: UpdateModal, openModal: openUpdateModal, closeModal: closeUpdateModal } = useModal()
  const { Modal: DeleteModal, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal()
  const { config, refreshConfig, clearConfigCache } = useConfigState()
  const configNotConfigured = !config?.isConfigured

  const clientCode = connectSession?.loginIdentity?.clientId ?? ''
  const idToken = connectSession?.idToken ?? ''

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientConfigCreateModel>({
    resolver: yupResolver(validationSchema),
  })

  const [deleteLoading, , deleteSubmit, deleteSubmitSuccess] = useReapitUpdate<ClientConfigDeleteModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.paymentsClientConfigDelete],
    method: 'DELETE',
    headers: {
      Authorization: idToken,
    },
    uriParams: {
      clientCode,
    },
  })

  const [createLoading, , createSubmit, createSubmitSuccess] = useReapitUpdate<ClientConfigCreateModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.paymentsClientConfigCreate],
    method: 'POST',
    headers: {
      Authorization: idToken,
    },
    uriParams: {
      clientCode,
    },
  })

  const [updateLoading, , updateSubmit, updateSubmitSuccess] = useReapitUpdate<ClientConfigCreateModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.paymentsClientConfigUpdate],
    method: 'PATCH',
    headers: {
      Authorization: idToken,
    },
    uriParams: {
      clientCode,
    },
  })

  const updateModalShouldClose = Boolean(createSubmitSuccess || updateSubmitSuccess)

  useEffect(handleResetForm(config, configNotConfigured, reset), [config, configNotConfigured])
  useEffect(handleCloseModal(closeUpdateModal, updateModalShouldClose, refreshConfig), [
    createSubmitSuccess,
    updateSubmitSuccess,
  ])
  useEffect(handleCloseModal(closeDeleteModal, Boolean(deleteSubmitSuccess), refreshConfig), [deleteSubmitSuccess])

  const submitAction = config ? updateSubmit : createSubmit
  const submitHandler = handleSubmit((configForm) => submitAction(sanitiseConfigPayload(configForm, clientCode)))

  const isLoading = createLoading || updateLoading || deleteLoading

  return (
    <>
      <SecondaryNavContainer>
        <Title>Admin</Title>
        <Icon className={elMb5} iconSize="large" icon="lockedInfographic" />
        <SmallText hasGreyText>This form is required to get started with Reapit Payments.</SmallText>
        <SmallText hasGreyText>
          Please take the time to read the documentation at the below link before proceeding as this details the setup
          intructions you need to perform in your Opayo account to complete this configuration.
        </SmallText>
        <Button className={elMb3} intent="neutral" onClick={openNewPage('')}>
          View Docs
        </Button>
        <Button
          className={elMb3}
          disabled={isLoading}
          loading={updateLoading || createLoading}
          intent="critical"
          onClick={openUpdateModal}
        >
          Save Config
        </Button>
        <Button
          className={elMb3}
          disabled={isLoading}
          loading={deleteLoading}
          intent="danger"
          onClick={openDeleteModal}
        >
          Delete Config
        </Button>
      </SecondaryNavContainer>
      <PageContainer>
        <ErrorBoundary>
          <FlexContainer isFlexJustifyBetween>
            <Title>Reapit Payments App Configuration</Title>
            <PaymentLogo />
          </FlexContainer>
          {config?.isConfigured ? (
            <PersistentNotification className={cx(elFadeIn, elMb7)} intent="success" isExpanded isFullWidth isInline>
              Your app is currently configured to use Reapit Payments. You can update your details however, you will be
              editing production configuration so please ensure the fields are valid as failure to do so can lead to the
              app failing for all users.
            </PersistentNotification>
          ) : config || configNotConfigured ? (
            <PersistentNotification className={cx(elFadeIn, elMb7)} intent="danger" isExpanded isFullWidth isInline>
              Your app is not fully configured to use Reapit Payments. For the app to work correctly, you will need to
              provide us with both your Opayo Credentials as specified in the documentation, your company name and a url
              to your company logo. Please ensure these credentials are entered accurately as failure to do so can lead
              to the app failing for all users.
            </PersistentNotification>
          ) : null}
          <form>
            <Subtitle>Company Details</Subtitle>
            <BodyText hasGreyText>
              These details are required to personalise emails sent to your customers, both receipts and requests for
              payment.
            </BodyText>
            <FormLayout hasMargin>
              <InputWrap>
                <InputGroup {...register('companyName')} type="email" label="Company Name" />
                {errors.companyName?.message && <InputError message={errors.companyName.message} />}
              </InputWrap>
              <InputWrapMed>
                <InputGroup {...register('logoUri')} type="email" label="Email Logo Url" />
                {errors.logoUri?.message && <InputError message={errors.logoUri.message} />}
              </InputWrapMed>
            </FormLayout>
            <Subtitle>Opayo Credientials</Subtitle>
            <BodyText hasGreyText>
              These details are required by Opayo to make payments in a live or test environment. You can update your
              credentials at any time by entering new keys in the form below.
            </BodyText>
            <BodyText hasGreyText hasBoldText>
              Please note: for security reasons. after they have been saved, your Opayo Keys are stored in an encryped
              format and never surfaced again in the app.
            </BodyText>
            <FormLayout hasMargin>
              <InputWrap>
                <InputGroup {...register('vendorName')} type="email" label="Opayo Vendor Name" />
                {errors.vendorName?.message && <InputError message={errors.vendorName.message} />}
              </InputWrap>
              <InputWrap>
                <InputGroup>
                  <Label>Live Opayo Environment or Test</Label>
                  <Toggle id="is-live-env" {...register('isLive')} hasGreyBg>
                    <ElToggleItem>Live</ElToggleItem>
                    <ElToggleItem>Test</ElToggleItem>
                  </Toggle>
                </InputGroup>
                {errors.isLive?.message && <InputError message={errors.isLive.message} />}
              </InputWrap>
              <InputWrapMed>
                <InputGroup {...register('integrationKey')} type="email" label="Opayo Integration Key" />
                {errors.integrationKey?.message && <InputError message={errors.integrationKey.message} />}
              </InputWrapMed>
              <InputWrapMed>
                <InputGroup {...register('passKey')} type="email" label="Opayo Pass Key" />
                {errors.passKey?.message && <InputError message={errors.passKey.message} />}
              </InputWrapMed>
              <InputGroup {...register('configId')} type="hidden" />
            </FormLayout>
          </form>
          <UpdateModal title="Confirm Update of Credentials">
            <PersistentNotification className={elMb7} intent="danger" isExpanded isFullWidth isInline>
              By confirming this update, you understand that your changes will take effect immediately for all users of
              the app and that you have validated that all credentials are accurate.
            </PersistentNotification>
            <ButtonGroup alignment="center">
              <Button intent="low" onClick={closeUpdateModal}>
                Cancel
              </Button>
              <Button
                intent="critical"
                disabled={isLoading}
                loading={updateLoading || createLoading}
                onClick={submitHandler}
              >
                Confirm Update
              </Button>
            </ButtonGroup>
          </UpdateModal>
          <DeleteModal title="Confirm Delete of Credentials">
            <PersistentNotification className={elMb7} intent="danger" isExpanded isFullWidth isInline>
              By confirming deletion of your credentials, you understand that your changes will take effect immediately
              and that the app will no longer function for all users.
            </PersistentNotification>
            <ButtonGroup alignment="center">
              <Button intent="low" onClick={closeDeleteModal}>
                Cancel
              </Button>
              <Button
                intent="danger"
                disabled={isLoading}
                loading={deleteLoading}
                onClick={handleDelete(deleteSubmit, config, clearConfigCache)}
              >
                Confirm Delete
              </Button>
            </ButtonGroup>
          </DeleteModal>
        </ErrorBoundary>
      </PageContainer>
    </>
  )
}

export default AdminPage
