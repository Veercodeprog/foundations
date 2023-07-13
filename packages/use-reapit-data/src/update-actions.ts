import { ApiNames, PathNames } from './api-constants'

export interface UpdateAction {
  api: string
  path: PathNames
  errorMessage?: string
  successMessage?: string
}

export enum UpdateActionNames {
  updatePipeline = 'updatePipeline',
  createPipelineDeployment = 'createPipelineDeployment',
  createPipeline = 'createPipeline',
  createApp = 'createApp',
  createApiKeyByMember = 'createApiKeyByMember',
  updateDeveloper = 'updateDeveloper',
  deleteDeveloper = 'deleteDeveloper',
  updateCustomer = 'updateCustomer',
  createDeveloper = 'createDeveloper',
  deleteApp = 'deleteApp',
  createAppRevsion = 'createAppRevsion',
  deleteOfficeGroup = 'deleteOfficeGroup',
  deletePipeline = 'deletePipeline',
  fileUpload = 'fileUpload',
  terminateInstallation = 'terminateInstallation',
  cancelRevision = 'cancelRevision',
  updateMember = 'updateMember',
  deleteMember = 'deleteMember',
  inviteMember = 'inviteMember',
  deleteSubscription = 'deleteSubscription',
  createSubscription = 'createSubscription',
  pingWebhook = 'pingWebhook',
  createWebhook = 'createWebhook',
  updateWebhook = 'updateWebhook',
  deleteWebhook = 'deleteWebhook',
  acceptInviteMember = 'acceptInviteMember',
  rejectInviteMember = 'rejectInviteMember',
  upsertPipelineEnvironment = 'upsertPipelineEnvironment',
  createConsentEmails = 'createConsentEmails',
  resendConsentEmail = 'resendConsentEmail',
  approveConsent = 'approveConsent',
  installApp = 'installApp',
  appConsentApproveEmail = 'appConsentApproveEmail',
  updateUser = 'updateUser',
  featureApp = 'featureApp',
  unFeatureApp = 'unFeatureApp',
  approveRevision = 'approveRevision',
  rejectRevision = 'rejectRevision',
  createDwAccount = 'createDwAccount',
  updateDwAccount = 'updateDwAccount',
  deleteDwAccount = 'deleteDwAccount',
  createDwRequest = 'createDwRequest',
  deleteDwShare = 'deleteDwShare',
  refreshDwShare = 'refreshDwShare',
  createUserAuthenticator = 'createUserAuthenticator',
  verifyUserAuthenticator = 'verifyUserAuthenticator',
  deleteUserAuthenticator = 'deleteUserAuthenticator',
  submitPrivatePaymentReceipt = 'submitPrivatePaymentReceipt',
  privatePaymentUpdate = 'privatePaymentUpdate',
  paymentsSessionCreate = 'paymentsSessionCreate',
  paymentRequestCreate = 'paymentRequestCreate',
  paymentsClientConfigCreate = 'paymentsClientConfigCreate',
  paymentsClientConfigUpdate = 'paymentsClientConfigUpdate',
  paymentsClientConfigDelete = 'paymentsClientConfigDelete',
  getOpayoMerchantKey = 'getOpayoMerchantKey',
  submitOpayoTransaction = 'submitOpayoTransaction',
  createAuthClient = 'createAuthClient',
  deleteAuthClient = 'deleteAuthClient',
  deleteUserPassword = 'deleteUserPassword',
  deleteUserSuppressionList = 'deleteUserSuppressionList',
  removeMemberFromGroup = 'removeMemberFromGroup',
  addMemberToGroup = 'addMemberToGroup',
  updatePlatformConfig = 'updatePlatformConfig',
  updateApp = 'updateApp',
  updateInstallation = 'updateInstallation',
}

export type UpdateActions = { [key in UpdateActionNames]: UpdateAction }

export const updateActions = {
  [UpdateActionNames.updatePipeline]: {
    api: ApiNames.pipeline,
    path: PathNames.updatePipeline,
    errorMessage:
      'Something went wrong updating your pipleline, this has been logged. Please check for errors and resubmit.',
    successMessage: 'Your pipeline has been successfully updated',
  },
  [UpdateActionNames.createPipeline]: {
    api: ApiNames.pipeline,
    path: PathNames.createPipeline,
    errorMessage:
      'Something went wrong creating your pipleline, this has been logged. Please check for errors and resubmit.',
    successMessage: 'Your pipeline has been successfully created',
  },
  [UpdateActionNames.createPipelineDeployment]: {
    api: ApiNames.pipeline,
    path: PathNames.createPipelineDeployments,
  },
  [UpdateActionNames.createApp]: {
    api: ApiNames.platform,
    path: PathNames.apps,
    errorMessage: 'Something went wrong creating your app, please check for errors and resubmit.',
    successMessage: 'Your app has been successfully created',
  },
  [UpdateActionNames.deleteApp]: {
    api: ApiNames.platform,
    path: PathNames.appsId,
    errorMessage: 'Something went wrong deleting your app, please try again.',
    successMessage: 'Your app has been successfully deleted',
  },
  [UpdateActionNames.createApiKeyByMember]: {
    api: ApiNames.apiKey,
    path: PathNames.createApiKeyByMember,
  },
  [UpdateActionNames.updateDeveloper]: {
    api: ApiNames.platform,
    path: PathNames.developerById,
    errorMessage: 'Developer update failed, please check for errors and try again.',
    successMessage: 'Your developer record has been successfully updated',
  },
  [UpdateActionNames.deleteDeveloper]: {
    api: ApiNames.platform,
    path: PathNames.developerById,
    errorMessage: 'Developer delete failed, please check for errors and try again.',
    successMessage: 'Developer successfully deleted',
  },
  [UpdateActionNames.updateCustomer]: {
    api: ApiNames.platform,
    path: PathNames.customersById,
    errorMessage: 'Update to terms failed, please try again',
  },
  [UpdateActionNames.createDeveloper]: {
    api: ApiNames.platform,
    path: PathNames.developers,
    errorMessage: 'Failed to create developer organisation, please try again',
    successMessage: 'Your developer account has been successfully created',
  },
  [UpdateActionNames.createAppRevsion]: {
    api: ApiNames.platform,
    path: PathNames.appRevision,
    errorMessage: 'Failed to create an app revision, please check for errors and try again',
    successMessage: 'App revision created successfully',
  },
  [UpdateActionNames.deleteOfficeGroup]: {
    api: ApiNames.platform,
    path: PathNames.officeGroupId,
    errorMessage: 'Failed to delete this office group, please try again',
    successMessage: 'Successfully deleted office group',
  },
  [UpdateActionNames.deletePipeline]: {
    api: ApiNames.pipeline,
    path: PathNames.getPipeline,
    errorMessage: 'Failed to delete Pipeline',
    successMessage: 'Pipeline deleting',
  },
  [UpdateActionNames.fileUpload]: {
    api: ApiNames.platform,
    path: PathNames.fileUpload,
    errorMessage: 'Failed to upload one of your files',
  },
  [UpdateActionNames.terminateInstallation]: {
    api: ApiNames.platform,
    path: PathNames.terminateInstallation,
    errorMessage: 'Failed to uninstall your app',
    successMessage: 'App successfully uninstalled',
  },
  [UpdateActionNames.cancelRevision]: {
    api: ApiNames.platform,
    path: PathNames.cancelRevision,
    errorMessage: 'Failed to cancel pending revision',
    successMessage: 'Successfully cancelled pending revision',
  },
  [UpdateActionNames.updateMember]: {
    api: ApiNames.platform,
    path: PathNames.memberById,
    errorMessage: 'Failed to update developer organisation member',
    successMessage: 'Successfully updated developer organisation member',
  },
  [UpdateActionNames.deleteMember]: {
    api: ApiNames.platform,
    path: PathNames.memberById,
    errorMessage: 'Failed to delete developer organisation member',
    successMessage: 'Successfully developer developer organisation member',
  },
  [UpdateActionNames.inviteMember]: {
    api: ApiNames.platform,
    path: PathNames.getMember,
    errorMessage: 'Failed to invite member, this has been logged. Please try again.',
    successMessage: 'Successfully invited developer organisation member',
  },
  [UpdateActionNames.deleteSubscription]: {
    api: ApiNames.platform,
    path: PathNames.subscriptionsById,
    errorMessage: 'Failed to cancel subscription, this has been logged. Please try again.',
    successMessage: 'Successfully cancelled subscription',
  },
  [UpdateActionNames.createSubscription]: {
    api: ApiNames.platform,
    path: PathNames.subscriptions,
    errorMessage: 'Failed to create subscription, this has been logged. Please try again.',
    successMessage: 'Successfully created subscription',
  },
  [UpdateActionNames.pingWebhook]: {
    api: ApiNames.platform,
    path: PathNames.webhooksPing,
    errorMessage: 'Failed to ping webhook, this has been logged. Please try again.',
    successMessage: 'Successfully pinged webhook',
  },
  [UpdateActionNames.createWebhook]: {
    api: ApiNames.platform,
    path: PathNames.webhookSubscriptions,
    errorMessage: 'Failed to create webhook, this has been logged. Please try again.',
    successMessage: 'Successfully created webhook',
  },
  [UpdateActionNames.updateWebhook]: {
    api: ApiNames.platform,
    path: PathNames.webhookSubscriptionsId,
    errorMessage: 'Failed to update webhook, this has been logged. Please try again.',
    successMessage: 'Successfully updated webhook',
  },
  [UpdateActionNames.deleteWebhook]: {
    api: ApiNames.platform,
    path: PathNames.webhookSubscriptionsId,
    errorMessage: 'Failed to delete webhook, this has been logged. Please try again.',
    successMessage: 'Successfully deleted webhook',
  },
  [UpdateActionNames.acceptInviteMember]: {
    api: ApiNames.platform,
    path: PathNames.memberInviteAccept,
    errorMessage: 'Failed to accept invite, this has been logged. Please try again.',
    successMessage: 'Successfully accepted invite',
  },
  [UpdateActionNames.rejectInviteMember]: {
    api: ApiNames.platform,
    path: PathNames.memberInviteReject,
    errorMessage: 'Failed to reject invite, this has been logged. Please try again.',
    successMessage: 'Successfully rejected invite',
  },
  [UpdateActionNames.upsertPipelineEnvironment]: {
    api: ApiNames.pipeline,
    path: PathNames.upsertPipelineEnvironment,
    successMessage: 'Added Environment variable',
    errorMessage: 'Failed to add Environment variable',
  },
  [UpdateActionNames.createConsentEmails]: {
    api: ApiNames.platform,
    path: PathNames.appConsents,
    successMessage: 'Sent consent request emails',
    errorMessage: 'Failed to send consent request emails',
  },
  [UpdateActionNames.resendConsentEmail]: {
    api: ApiNames.platform,
    path: PathNames.appConsentResend,
    successMessage: 'Resent consent request email',
    errorMessage: 'Failed to resense consent request email',
  },
  [UpdateActionNames.approveConsent]: {
    api: ApiNames.platform,
    path: PathNames.appConsentApprove,
    successMessage: 'App permission change request accepted',
    errorMessage: 'Failed to accept app permission change, this has been logged. Please try again.',
  },
  [UpdateActionNames.installApp]: {
    api: ApiNames.platform,
    path: PathNames.installations,
    successMessage: 'Successfully installed app',
    errorMessage: 'Failed to install app, this has been logged. Please try again.',
  },
  [UpdateActionNames.appConsentApproveEmail]: {
    api: ApiNames.platform,
    path: PathNames.appConsentApproveEmail,
    successMessage: 'Successfully sent email',
    errorMessage: 'Failed to send to new email address. Please try again',
  },
  [UpdateActionNames.updateUser]: {
    api: ApiNames.platform,
    path: PathNames.userById,
    successMessage: 'Successfully updated user info.',
    errorMessage: 'Failed to update user info.',
  },
  [UpdateActionNames.featureApp]: {
    api: ApiNames.platform,
    path: PathNames.appByIdFeature,
    successMessage: 'Successfully updated app.',
    errorMessage: 'Failed to update app.',
  },
  [UpdateActionNames.unFeatureApp]: {
    api: ApiNames.platform,
    path: PathNames.appByIdFeature,
    successMessage: 'Successfully updated app.',
    errorMessage: 'Failed to update app.',
  },
  [UpdateActionNames.approveRevision]: {
    api: ApiNames.platform,
    path: PathNames.revisionApprove,
    successMessage: 'Successfully approved revision.',
    errorMessage: 'Failed to approve revision.',
  },
  [UpdateActionNames.rejectRevision]: {
    api: ApiNames.platform,
    path: PathNames.revisionReject,
    successMessage: 'Successfully rejected revision.',
    errorMessage: 'Failed to reject revision.',
  },
  [UpdateActionNames.createDwAccount]: {
    api: ApiNames.platform,
    path: PathNames.dwAccounts,
    successMessage: 'Successfully created account.',
    errorMessage: 'Failed to create account.',
  },
  [UpdateActionNames.updateDwAccount]: {
    api: ApiNames.platform,
    path: PathNames.dwAccountsId,
    successMessage: 'Successfully updated account.',
    errorMessage: 'Failed to update account.',
  },
  [UpdateActionNames.deleteDwAccount]: {
    api: ApiNames.platform,
    path: PathNames.dwAccountsId,
    successMessage: 'Successfully deleted account.',
    errorMessage: 'Failed to delete account.',
  },
  [UpdateActionNames.createDwRequest]: {
    api: ApiNames.platform,
    path: PathNames.dwRequests,
    successMessage: 'Successfully created data share.',
    errorMessage: 'Failed to create data share.',
  },
  [UpdateActionNames.deleteDwShare]: {
    api: ApiNames.platform,
    path: PathNames.dwSharesId,
    successMessage: 'Successfully deleted data share.',
    errorMessage: 'Failed to delete data share.',
  },
  [UpdateActionNames.refreshDwShare]: {
    api: ApiNames.platform,
    path: PathNames.dwShareRefresh,
    successMessage: 'Successfully refreshed data share.',
    errorMessage: 'Failed to refresh data share.',
  },
  [UpdateActionNames.createUserAuthenticator]: {
    api: ApiNames.platform,
    path: PathNames.userAuthenticators,
    successMessage: 'Successfully fetched QR code.',
    errorMessage: 'Failed to fetch QR code. This error has been logged',
  },
  [UpdateActionNames.deleteUserAuthenticator]: {
    api: ApiNames.platform,
    path: PathNames.userAuthenticatorById,
    successMessage: 'Successfully reset authenticator.',
    errorMessage: 'Failed to reset authenticator. This error has been logged',
  },
  [UpdateActionNames.verifyUserAuthenticator]: {
    api: ApiNames.platform,
    path: PathNames.userAuthenticatorVerify,
    successMessage: 'Successfully verified authenticator.',
    errorMessage: 'Failed to verify authenticator. This error has been logged',
  },
  [UpdateActionNames.submitPrivatePaymentReceipt]: {
    api: ApiNames.payments,
    path: PathNames.paymentReceiptPrivate,
    successMessage: 'Successfully sent receipt request.',
    errorMessage: 'Failed to send receipt. This error has been logged',
  },
  [UpdateActionNames.privatePaymentUpdate]: {
    api: ApiNames.platform,
    path: PathNames.paymentById,
    errorMessage: 'Failed to update payment request. This error has been logged',
  },
  [UpdateActionNames.paymentsSessionCreate]: {
    api: ApiNames.payments,
    path: PathNames.paymentsSession,
    errorMessage: 'Failed to create payment request. This error has been logged',
  },
  [UpdateActionNames.paymentRequestCreate]: {
    api: ApiNames.payments,
    path: PathNames.paymentRequest,
    successMessage: 'Successfully created payment request.',
    errorMessage: 'Failed to create payment request. This error has been logged',
  },
  [UpdateActionNames.paymentsClientConfigCreate]: {
    api: ApiNames.payments,
    path: PathNames.paymentsConfigPrivate,
    successMessage: 'Successfully created a client configuration.',
    errorMessage: 'Failed to create payment config. This error has been logged',
  },
  [UpdateActionNames.paymentsClientConfigUpdate]: {
    api: ApiNames.payments,
    path: PathNames.paymentsConfigPrivate,
    successMessage: 'Successfully updated a client configuration.',
    errorMessage: 'Failed to update payment config. This error has been logged',
  },
  [UpdateActionNames.paymentsClientConfigDelete]: {
    api: ApiNames.payments,
    path: PathNames.paymentsConfigPrivate,
    successMessage: 'Successfully deleted a client configuration.',
    errorMessage: 'Failed to delete payment config. This error has been logged',
  },
  [UpdateActionNames.submitOpayoTransaction]: {
    api: ApiNames.payments,
    path: PathNames.opayoTransactions,
    errorMessage: 'Failed to submit payment transaction. This error has been logged',
  },
  [UpdateActionNames.getOpayoMerchantKey]: {
    api: ApiNames.payments,
    path: PathNames.opayoMerchantKeys,
    errorMessage: 'Failed to configure app for payments. This error has been logged',
  },
  [UpdateActionNames.createAuthClient]: {
    api: ApiNames.platform,
    path: PathNames.authClient,
    errorMessage: 'Failed to create new auth credentials. This error has been logged',
  },
  [UpdateActionNames.deleteAuthClient]: {
    api: ApiNames.platform,
    path: PathNames.authClient,
    errorMessage: 'Failed to delete old auth credentials. This error has been logged',
  },
  [UpdateActionNames.deleteUserPassword]: {
    api: ApiNames.platform,
    path: PathNames.userByIdPassword,
    successMessage: 'Successfully reset password.',
    errorMessage: 'Failed to reset password.',
  },
  [UpdateActionNames.deleteUserSuppressionList]: {
    api: ApiNames.platform,
    path: PathNames.userEmailSuppressions,
    successMessage: 'Successfully removed user from list.',
    errorMessage: 'Failed to remove user from list.',
  },
  [UpdateActionNames.removeMemberFromGroup]: {
    api: ApiNames.platform,
    path: PathNames.groupIdMembersDelete,
    successMessage: 'Successfully removed user from group.',
    errorMessage: 'Failed to remove user from group.',
  },
  [UpdateActionNames.addMemberToGroup]: {
    api: ApiNames.platform,
    path: PathNames.groupIdMembers,
    successMessage: 'Successfully added user to group.',
    errorMessage: 'Failed to remove user from group.',
  },
  [UpdateActionNames.updatePlatformConfig]: {
    api: ApiNames.platform,
    path: PathNames.getOrgConfig,
    successMessage: 'Successfully updated platform config.',
    errorMessage: 'Failed to update platform config.',
  },
  [UpdateActionNames.updateApp]: {
    api: ApiNames.platform,
    path: PathNames.appsId,
    successMessage: 'Successfully updated app',
    errorMessage: 'Failed to update app',
  },
  [UpdateActionNames.updateInstallation]: {
    api: ApiNames.platform,
    path: PathNames.installationsId,
    successMessage: 'Successfully updated installation',
    errorMessage: 'Failed to update installation',
  },
}
