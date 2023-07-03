import { getPlatformApiUrl } from './api-regions'

export type AppEnv = 'local' | 'development' | 'production'

export const ApiNames = {
  platform: getPlatformApiUrl(),
  pipeline:
    process.env.appEnv !== 'production'
      ? 'https://deployments.dev.paas.reapit.cloud'
      : 'https://deployments.prod.paas.reapit.cloud',
  apiKey:
    process.env.appEnv !== 'production'
      ? 'https://api-key.dev.paas.reapit.cloud/api-key'
      : 'https://api-key.prod.paas.reapit.cloud/api-key',
  iaas: `${process.env.appEnv !== 'production' ? '.dev' : 'prod'}.paas.reapit.cloud`,
  appMarketCms: `https://marketplace-cms.${process.env.appEnv !== 'production' ? 'dev' : 'prod'}.paas.reapit.cloud`,
  payments: `https://payments-service.${process.env.appEnv !== 'production' ? 'dev' : 'prod'}.paas.reapit.cloud`,
}

export enum PathNames {
  dwAccounts = '/dataMarketplace/accounts',
  dwDataSets = '/dataMarketplace/datasets',
  dwShares = '/dataMarketplace/shares',
  dwSharesId = '/dataMarketplace/shares/{shareId}',
  dwShareRefresh = '/dataMarketplace/shares/{shareId}/refresh',
  dwRequests = '/dataMarketplace/requests',
  dwAccountsId = '/dataMarketplace/accounts/{accountId}',
  apps = '/marketplace/apps',
  appsId = '/marketplace/apps/{appId}',
  installations = '/marketplace/installations',
  getPipeline = '/pipeline/{appId}',
  products = '/marketplace/products',
  sandboxes = '/marketplace/sandboxes',
  createPipeline = '/pipeline',
  updatePipeline = '/pipeline/{pipelineId}',
  getPipelineDeployments = '/pipeline/{pipelineId}/pipeline-runner',
  createPipelineDeployments = '/pipeline/{pipelineId}/pipeline-runner',
  appPermissions = '/marketplace/scopes',
  getApiKeyByUserId = '/user/{email}',
  createApiKeyByMember = '/user',
  getMember = '/marketplace/developers/{developerId}/members',
  deleteApiKey = '/{apiKeyId}',
  billingDataByMonth = '/trafficevents/billing/{month}/',
  getBillingDataByPeriod = '/trafficevents/billing/',
  developerById = '/marketplace/developers/{developerId}',
  customersById = '/marketplace/customers/{customerId}',
  developers = '/marketplace/developers',
  appSecretById = '/marketplace/apps/{appId}/secret',
  desktopIntegrationTypes = '/marketplace/desktopIntegrationTypes',
  appCategories = '/marketplace/categories',
  appRevision = '/marketplace/apps/{appId}/revisions',
  officeGroupId = '/organisations/organisations/{orgId}/officegroups/{groupId}',
  fileUpload = '/fileUpload',
  terminateInstallation = '/marketplace/installations/{installationId}/terminate',
  appRevisions = '/marketplace/apps/{appId}/revisions',
  cancelRevision = '/marketplace/apps/{appId}/revisions/{revisionId}/reject',
  paginatePipeline = '/pipeline',
  trafficStatistics = '/trafficevents/trafficStatistics',
  memberById = '/marketplace/developers/{developerId}/members/{memberId}',
  subscriptions = '/marketplace/subscriptions',
  subscriptionsById = '/marketplace/subscriptions/{subscriptionId}',
  webhooksPing = '/webhooks/subscriptions/{subscriptionId}/ping',
  webhookSubscriptions = '/webhooks/subscriptions',
  webhookSubscriptionsId = '/webhooks/subscriptions/{webhookId}',
  webhookTopics = '/webhooks/topics',
  webhookLogs = '/webhooks/logs',
  memberInviteAccept = '/marketplace/developers/{developerId}/members/{memberId}/accept',
  memberInviteReject = '/marketplace/developers/{developerId}/members/{memberId}/reject',
  getPipelineEnvironment = '/pipeline/{pipelineId}/parameter',
  upsertPipelineEnvironment = '/pipeline/{pipelineId}/parameter',
  publicWebhookKey = '/webhooks/signing',
  appConsents = '/marketplace/apps/{appId}/revisions/{revisionId}/consents',
  appConsentResend = '/marketplace/apps/{appId}/revisions/{revisionId}/consents/{consentId}/resend',
  appConsentApprove = '/marketplace/apps/{appId}/revisions/{revisionId}/consents/{consentId}/approve',
  cmsConfig = '/cms/config',
  cmsConfigLive = '/',
  cmsConfigPost = '/cms/config/{id}',
  propertyById = '/properties/{propertyId}',
  properties = '/properties',
  payments = '/payments',
  paymentById = '/payments/{paymentId}',
  appConsentApproveEmail = '/marketplace/apps/{id}/revisions/{revisionId}/consents/{consentId}/resend',
  userInfo = '/organisations/users/info',
  userById = '/organisations/users/{userId}',
  appByIdFeature = '/marketplace/apps/{appId}/feature',
  customers = '/marketplace/customers',
  approvals = '/marketplace/approvals',
  revisionById = '/marketplace/apps/{appId}/revisions/{revisionId}',
  revisionApprove = '/marketplace/apps/{appId}/revisions/{revisionId}/approve',
  revisionReject = '/marketplace/apps/{appId}/revisions/{revisionId}/reject',
  users = '/organisations/users',
  userAuthenticators = '/organisations/users/{userId}/authenticators',
  userAuthenticatorById = '/organisations/users/{userId}/authenticators/{authenticatorId}',
  userAuthenticatorVerify = '/organisations/users/{userId}/authenticators/{authenticatorId}/verify',
  referralTypes = '/referrals/types',
  orgGroups = '/organisations/organisations/{orgId}/officegroups',
  paymentsConfigPrivate = '/config/private/{clientCode}',
  paymentReceiptPrivate = '/receipt/private/{paymentId}',
  paymentsSession = '/session',
  paymentRequest = '/request/{paymentId}',
  opayoTransactions = '/opayo/private/transactions',
  opayoMerchantKeys = '/opayo/private/merchant-session-keys',
  authClient = '/marketplace/apps/{appId}/authClient',
  userGroups = '/organisations/groups',
  userByIdPassword = '/organisations/users/{userId}/password',
  userEmailSuppressions = '/organisations/emailSuppressions/{userId}',
  orgs = '/organisations/organisations',
  groupIdMembers = '/organisations/groups/{groupId}/members',
  groupIdMembersDelete = '/organisations/groups/{groupId}/members/{userId}',
  getOrgConfig = '/organisations/organisations/{orgId}/configuration/platform',
}
