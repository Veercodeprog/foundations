/**
 * Representation of an authenticator
 */
export interface AuthenticatorModel {
  /**
   * The unique identifier of the authenticator
   */
  id?: string
  /**
   * The unique identifier of the user associated to the authenticator
   */
  userId?: string
  /**
   * The status of the authenticator (inProgress/active/disabled)
   */
  status?: string
  /**
   * The status of the authenticator (mfa/sms)
   */
  type?: string
  /**
   * The date and time when the authenticator was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the authenticator was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
}
/**
 * Representation of a user or organisation claim
 */
export interface ClaimModel {
  /**
   * The name of the claim
   */
  claim?: string
  /**
   * The value of the claim
   */
  value?: string
  /**
   * The unique identifier of the organisation the claim relates too
   */
  organisationId?: string
  /**
   * Flag determining whether or not the claim should be included in identity tokens generated by the identity provider
   */
  includeInToken?: boolean
}
/**
 * Model to capture information to create a new group membership
 * example:
 * [object Object]
 */
export interface CreateGroupMembershipModel {
  /**
   * The id of the user to become a member of this group
   */
  userId?: string
}
/**
 * Model to create a new group
 * example:
 * [object Object]
 */
export interface CreateGroupModel {
  /**
   * The identifier (as it will appear in the IDP)
   */
  id: string
  /**
   * The description of this group
   */
  description: string
}
/**
 * Request body used to create a new identity source
 */
export interface CreateIdentitySourceModel {
  /**
   * The external identifier of the identity source in the third party IdP
   * For AWS identity federation, this must match the "Provider Name" exactly
   */
  externalId?: string
  /**
   * The identifier of the organisation to associate with the identity source
   */
  organisationId?: string
}
/**
 * Request body used to create a new office group
 * example:
 * [object Object]
 */
export interface CreateOfficeGroupModel {
  /**
   * The name of the office group
   */
  name?: string
  /**
   * The office ids to associate with the group
   */
  officeIds?: string
}
/**
 * Request body used to set the address details
 */
export interface CreateOrganisationAddressModel {
  /**
   * The building name
   */
  buildingName?: string
  /**
   * The building number
   */
  buildingNumber?: string
  /**
   * The first line of the address
   */
  line1?: string
  /**
   * The second line of the address
   */
  line2?: string
  /**
   * The third line of the address
   */
  line3?: string
  /**
   * The fourth line of the address
   */
  line4?: string
  /**
   * The postcode
   */
  postcode?: string
  /**
   * The ISO-3166 country code that the address resides within
   */
  countryId?: string
}
/**
 * Request body used to create a new organisation claim
 * example:
 * [object Object]
 */
export interface CreateOrganisationClaimModel {
  /**
   * The name of the claim being set
   */
  claim: string
  /**
   * The value of the claim being set
   */
  value: string
  /**
   * Flag determining whether or not the claim should be included in identity tokens generated by the identity provider for users associated with the organisation
   * the claim is attached to
   */
  includeInToken?: boolean
}
/**
 * Model to create a new organisation group member
 * example:
 * [object Object]
 */
export interface CreateOrganisationGroupMemberModel {
  /**
   * The unique identifier of the organisation
   */
  organisationId?: string
}
/**
 * Model to create a new organisation group
 * example:
 * [object Object]
 */
export interface CreateOrganisationGroupModel {
  /**
   * The name of the organisation group
   */
  name: string
}
/**
 * Model to create a new organisation
 * example:
 * [object Object]
 */
export interface CreateOrganisationModel {
  /**
   * The id of the organisation in agency cloud (if a customer)
   */
  agencyCloudId?: string
  /**
   * The id of the organisation in marketplace (if a developer)
   */
  marketplaceId?: string
  /**
   * The name of the organisation
   */
  name: string
  /**
   * The public website of the organisation
   */
  website?: string
  taxNumber?: string
  /**
   * The registration number of the organisation
   */
  registrationNumber?: string
  /**
   * The email address to use for billing correspondence
   */
  billingEmail?: string
  /**
   * The telephone number to use for billing correspondence
   */
  billingTelephone?: string
  /**
   * The name of the person to contact for billing correspondence
   */
  billingName?: string
  /**
   * The reference that our accounts department use internally for billing this organisation
   */
  billingReference?: string
  /**
   * A flag specifying if the organisation has registered tax
   */
  noTaxRegistration?: boolean
  /**
   * The organisations national insurance
   */
  nationalInsurance?: string
  /**
   * The product the organisation is using
   */
  product?: string
  address?: CreateOrganisationAddressModel
  /**
   * Any claims to associate with this organisation
   */
  claims?: CreateOrganisationClaimModel[]
}
/**
 * Request body used to create a new user authenticator
 */
export interface CreateUserAuthenticatorModel {
  /**
   * The type of authenticator (sms/softwareToken)
   */
  type?: string
}
/**
 * Request body used to create a new user claim
 * example:
 * [object Object]
 */
export interface CreateUserClaimModel {
  /**
   * The name of the claim being set
   */
  claim: string
  /**
   * The value of the claim being set
   */
  value: string
  /**
   * The id of the organisation the claim is associated with
   */
  organisationId?: string
  /**
   * Flag determining whether or not the claim should be included in identity tokens generated by the identity provider
   */
  includeInToken?: boolean
}
/**
 * Model to create a new user
 * example:
 * [object Object]
 */
export interface CreateUserModel {
  /**
   * The email of this user
   */
  email: string
  /**
   * The name of this user
   */
  name: string
  /**
   * Gets or sets the agency cloud identifier that the user occupies in the customers database
   */
  agencyCloudNegotiatorId?: string
  /**
   * The job title of the user
   */
  jobTitle?: string
  /**
   * The mobile telephone of the user
   */
  mobile?: string
  /**
   * The landline telephone of the user
   */
  landline?: string
  /**
   * The id of the organisation that this user should belong to
   */
  organisationId: string
  /**
   * Listing of the group ids that this user is a member of
   */
  groupIds: string[]
  /**
   * A flag to decide whether a user is pushed to the identity provider
   */
  addToIdp?: boolean
  /**
   * A flag to determine whether to force recreation of the user when a matching email address is already added
   */
  overwrite?: boolean
  /**
   * Any claims to associate with this user
   */
  claims?: CreateUserClaimModel[]
}
/**
 * Request body used to create a new user product
 */
export interface CreateUserProductModel {
  /**
   * The id of the organisation the product is associated with
   */
  organisationId?: string
}
/**
 * Model to delete an existing user claim
 */
export interface DeleteUserClaimModel {
  /**
   * The id of the organisation the claim is associated with
   */
  organisationId?: string
}
/**
 * Request body used to delete a user product
 */
export interface DeleteUserProductModel {
  /**
   * The id of the organisation the product is associated with
   */
  organisationId?: string
}
/**
 * Model used to describe items on the email suppression list in the third party email provider
 */
export interface EmailSuppressionModel {
  /**
   * The id of the user on the suppression list
   */
  userId?: string
  /**
   * The email address on the suppression list
   */
  emailAddress?: string
  /**
   * The date and time the item on the suppression list was last updated (eg status change from Bounce -> Permanent)
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  lastUpdated?: string // date-time
  /**
   * The reason the email address is on the suppression list
   */
  reason?: string
  /**
   * The region in which the email address is on the suppression list
   */
  region?: string
}
export interface EmailSuppressionModelPagedResult {
  _embedded?: EmailSuppressionModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}
export interface EmailSuppressions {
  getEmailSuppressionsQuery?: any
}
/**
 * Query responsible for fetching a list of email addresses on the suppression list in the third party email provider
 */
export interface GetEmailSuppressionsQuery {}
/**
 * Representation of a group member
 */
export interface GroupMembershipModel {
  /**
   * The unique id of the user belonging to the group
   */
  id?: string
  /**
   * The date and time when the user was added to the group
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The user's email address
   */
  email?: string
  /**
   * Gets or sets the name of this user
   */
  name?: string
  /**
   * Flag determining if this instance is inactive
   */
  inactive?: boolean
  /**
   * The organisation id that this user is a member of
   */
  organisationId?: string
  /**
   * The name of the organisation this user is a member of
   */
  organisationName?: string
}
export interface GroupMembershipModelPagedResult {
  _embedded?: GroupMembershipModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}
/**
 * Representation of a user group
 */
export interface GroupModel {
  /**
   * The unique identifier of the group
   */
  id?: string
  /**
   * The date and time when the group was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the group was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The description of the group
   */
  description?: string
  /**
   * The number of members in the group
   */
  memberCount?: number // int32
}
export interface GroupModelPagedResult {
  _embedded?: GroupModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}
export interface Groups {
  pageNumber?: number
  pageSize?: number
  id?: string[]
  organisationId?: string
}
/**
 * Representation of user information in third party IdP
 */
export interface IdentityClientUserInfoModel {
  /**
   * Flag indicating whether or not the user exists in the third party IdP
   */
  exists?: boolean
  /**
   * The id of the user in the third party IdP
   */
  id?: string
  /**
   * Flag indicating whether or not the user is enabled in the third party IdP
   * Note that this does not necessarily mean active in all IdPs
   */
  enabled?: boolean
  /**
   * The date and time the user was created in the third party IdP
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The status of the user in the third party IdP
   * Refer to IdP specific documentation for available values
   */
  status?: string
  /**
   * The list of last authentication events for this user in the third party IdP,
   * where this information is available
   */
  authEvents?: string[]
}
/**
 * Representation of an external identity source, used for federated identity login
 */
export interface IdentitySourceModel {
  /**
   * The unique identifier of the identity source
   */
  id?: string
  /**
   * The date and time when the identity source was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the identity source was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The external identifier of the identity source in the third party identity provider
   */
  externalId?: string
  /**
   * The unique identifier of the organisation that the identity source is associated with
   */
  organisationId?: string
  organisation?: OrganisationModel
}
export interface IdentitySourceModelPagedResult {
  _embedded?: IdentitySourceModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}
export interface IdentitySources {
  pageSize?: number
  pageNumber?: number
  agencyCloudId?: string
  organisationId?: string
  externalId?: string
}
export interface MigrationsKeys {
  applicationId?: string
}
/**
 * Representation of a defined collection of offices within an organisation which can be used to ring fence data and other operations
 */
export interface OfficeGroupModel {
  /**
   * The unique identifier of the office group
   */
  id?: string
  /**
   * The date and time when the office group was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the office group was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The unique identifier of the organisation the office group belongs to
   */
  organisationId?: string
  /**
   * The customer id that will be used for users associated with an office in the office group
   */
  customerId?: string
  /**
   * The name of the office group
   */
  name?: string
  /**
   * The tag associated with the office group which is appended to the end of the parent customer id
   */
  tag?: string
  /**
   * The office ids associated to the office group
   */
  officeIds?: string
  /**
   * The status of the office group (active/inactive)
   */
  status?: string
}
export interface OfficeGroupModelPagedResult {
  _embedded?: OfficeGroupModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}
/**
 * Representation of the physical address of a building or premise
 */
export interface OrganisationAddressModel {
  /**
   * The building name
   */
  buildingName?: string
  /**
   * The building number
   */
  buildingNumber?: string
  /**
   * The first line of the address
   */
  line1?: string
  /**
   * The second line of the address
   */
  line2?: string
  /**
   * The third line of the address
   */
  line3?: string
  /**
   * The fourth line of the address
   */
  line4?: string
  /**
   * The postcode
   */
  postcode?: string
  /**
   * The ISO-3166 country code that the address resides in
   */
  countryId?: string
}
/**
 * Representation of an organisation group member
 */
export interface OrganisationGroupMemberModel {
  /**
   * The unique identifier of the organisation group membership
   */
  id?: string
  /**
   * The date and time of when the organisation group membership was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time of when the organisation group membership was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The unique identifier of the organisation
   */
  organisationId?: string
  /**
   * The unique identifier of the organisation group
   */
  organisationGroupId?: string
  /**
   * The customer's Id
   */
  customerId?: string
  /**
   * The name of the organisation
   */
  name?: string
}
export interface OrganisationGroupMemberModelPagedResult {
  _embedded?: OrganisationGroupMemberModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}
/**
 * Representation of an organisation group
 */
export interface OrganisationGroupModel {
  /**
   * The unique identifier of the organisation group
   */
  id?: string
  /**
   * The date and time when the organisation group was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the organisation group was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The name of the organisation group
   */
  name?: string
}
export interface OrganisationGroupModelPagedResult {
  _embedded?: OrganisationGroupModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}
export interface OrganisationGroups {
  pageNumber?: number
  pageSize?: number
}
/**
 * Representation of an organisation, such as a Reapit customer or external developer
 */
export interface OrganisationModel {
  /**
   * The unique identifier of the organisation
   */
  id?: string
  /**
   * The date and time when the organisation was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the organisation was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The name of the organisation
   */
  name?: string
  /**
   * The id of the Reapit Agency Cloud customer that the organisation is associated with, where applicable
   */
  agencyCloudId?: string
  /**
   * The id of the Reapit Marketplace developer organisation that the organisation is associated with, where applicable
   */
  marketplaceId?: string
  /**
   * A flag determining whether or not the organisation is currently inactive
   */
  inactive?: boolean
  /**
   * The URL of the organisation's public website
   */
  website?: string
  taxNumber?: string
  /**
   * The company registration number (CRN) of the organisation
   */
  registrationNumber?: string
  /**
   * The email address to use for billing correspondence
   */
  billingEmail?: string
  /**
   * The telephone number to use for billing correspondence
   */
  billingTelephone?: string
  /**
   * The name of the person to contact for billing correspondence
   */
  billingName?: string
  /**
   * The reference that the Reapit Accounts department use internally for billing the organisation
   */
  billingReference?: string
  /**
   * A flag determining whether or not the organisation is registered to pay tax
   */
  noTaxRegistration?: boolean
  /**
   * The National Insurance number of the organisation
   */
  nationalInsurance?: string
  /**
   * The product the organisation is using
   */
  product?: string
  /**
   * The products the organisation is using
   */
  products?: string[]
  address?: OrganisationAddressModel
  /**
   * A collection of claims associated to the organisation, which are optionally included in tokens generated by the identity provider for users belonging to the organisation
   */
  claims?: ClaimModel[]
}
export interface OrganisationModelPagedResult {
  _embedded?: OrganisationModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}
export interface Organisations {
  pageNumber?: number
  pageSize?: number
  id?: string[]
  agencyCloudId?: string[]
  claim?: string[]
  marketplaceId?: string[]
  name?: string
}
export interface PagingLinkModel {
  href?: string
}
/**
 * Platform configuration information for a organisation
 */
export interface PlatformConfigModel {
  /**
   * The location at which customer assets (ie images) are publicly accessible
   */
  publicAssetsLocation?: string
  /**
   * A list of semi structured fields that can be requested via the Platform APIs
   */
  extrasWhitelist?: string
}
export interface PlatformConfigModelPagedResult {
  _embedded?: PlatformConfigModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}
/**
 * Outward representation of JWK item
 */
export interface PublicKeyModel {
  kty?: string
  e?: string
  use?: string
  kid?: string
  n?: string
}
/**
 * Representation of a public key
 */
export interface PublicKeysModel {
  /**
   * The public keys
   */
  keys?: PublicKeyModel[]
}
/**
 * example:
 * [object Object]
 */
export interface UpdateGroupModel {
  /**
   * The description of this group
   */
  description: string
}
/**
 * Request body used to update an existing office group
 * example:
 * [object Object]
 */
export interface UpdateOfficeGroupModel {
  /**
   * The name of the office group
   */
  name?: string
  /**
   * The office ids to associate with the group
   */
  officeIds?: string
  /**
   * The status of the office group (active/inactive)
   */
  status?: string
}
export interface UpdateOrganisationAddressModel {
  /**
   * The building name
   */
  buildingName?: string
  /**
   * The building number
   */
  buildingNumber?: string
  /**
   * The first line of the address
   */
  line1?: string
  /**
   * The second line of the address
   */
  line2?: string
  /**
   * The third line of the address
   */
  line3?: string
  /**
   * The fourth line of the address
   */
  line4?: string
  /**
   * The postcode
   */
  postcode?: string
  /**
   * The ISO-3166 country code that the address resides within
   */
  countryId?: string
}
/**
 * Model to update an existing organisation claim
 * example:
 * [object Object]
 */
export interface UpdateOrganisationClaimModel {
  /**
   * The value of the claim being set
   */
  value?: string
  /**
   * Flag denoting whether or not the claim should be included in identity tokens
   * issued for users signing in that are linked to the associated organisation
   */
  includeInToken?: boolean
}
/**
 * example:
 * [object Object]
 */
export interface UpdateOrganisationModel {
  /**
   * The id of the organisation in agency cloud (if a customer)
   */
  agencyCloudId?: string
  /**
   * The id of the organisation in marketplace (if a developer)
   */
  marketplaceId?: string
  /**
   * The name of the organisation
   */
  name: string
  /**
   * A value indicating whether this organisation should be inactive.
   */
  inactive?: boolean
  /**
   * The public website of the organisation
   */
  website?: string
  taxNumber?: string
  /**
   * The registration number of the organisation
   */
  registrationNumber?: string
  /**
   * The email address to use for billing correspondence
   */
  billingEmail?: string
  /**
   * The telephone number to use for billing correspondence
   */
  billingTelephone?: string
  /**
   * The name of the person to contact for billing correspondence
   */
  billingName?: string
  /**
   * The reference that our accounts department use internally for billing this organisation
   */
  billingReference?: string
  /**
   * A flag specifying if the organisation has registered tax
   */
  noTaxRegistration?: boolean
  /**
   * The organisations national insurance
   */
  nationalInsurance?: string
  /**
   * The product the organisation is using
   */
  product?: string
  address?: UpdateOrganisationAddressModel
}
/**
 * Model to update platform configuration
 */
export interface UpdatePlatformConfigurationModel {
  /**
   * The location at which customer assets (ie images) are publicly accessible
   */
  publicAssetsLocation?: string
  /**
   * A list of semi structured fields that can be requested via the Platform APIs
   */
  extrasWhitelist?: string
}
/**
 * Model to update an existing user claim
 * example:
 * [object Object]
 */
export interface UpdateUserClaimModel {
  /**
   * The value of the claim being set
   */
  value?: string
  /**
   * Flag denoting whether or not the claim should be included in identity tokens
   * issued for users signing in that are linked to the associated organisation
   */
  includeInToken?: boolean
  /**
   * The id of the organisation the claim is associated with
   */
  organisationId?: string
}
/**
 * Model to update an existing user
 * example:
 * [object Object]
 */
export interface UpdateUserModel {
  /**
   * The name of this user
   */
  name: string
  /**
   * Flag whether this user should be marked as inactive
   */
  inactive?: boolean
  /**
   * Gets or sets the job title of the user
   */
  jobTitle?: string
  /**
   * The mobile telephone of the user
   */
  mobile?: string
  /**
   * The landline telephone of the user
   */
  landline?: string
  /**
   * The agency cloud negotiator id of the user, if applicable
   */
  agencyCloudNegotiatorId?: string
  /**
   * The status of the user in the third party identity provider (active/inactive)
   */
  idpStatus?: string
  /**
   * Flag indicating whether or not the user has provided consent for their actions to be tracked in Reapit's products
   */
  consentToTrack?: boolean
}
/**
 * Request body used to update a user's password to a specific value
 * example:
 * [object Object]
 */
export interface UpdateUserPasswordModel {
  /**
   * The user's current password
   */
  current: string
  /**
   * The user's new password
   */
  new: string
  /**
   * Flag determining whether or not the provided password should be permanent
   * or set as a one-time temporary password
   */
  permanent?: boolean
}
/**
 * Representation of the user information
 */
export interface UserInfoModel {
  /**
   * The unique identifier of the user
   */
  id?: string
  /**
   * The date and time when the user was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the user was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The user's email address
   */
  emailAddress?: string
  /**
   * The user's name
   */
  name?: string
  /**
   * The id of the parent organisation that the user belongs to
   */
  organisationId?: string
  /**
   * The id of the customer the user is directly associated with (via the parent organisation), outside the scope of organisation groups.
   * Note that this will always be populated regardless of the presence of organisation group data
   */
  userCustomerId?: string
  /**
   * The name of the parent organisation that the user belongs to
   */
  organisationName?: string
  /**
   * The id of the parent organisation group that the user's organisation belongs to
   */
  organisationGroupId?: string
  /**
   * The name of the parent organisation group that the user's organisation belongs to
   */
  organisationGroupName?: string
  /**
   * The product the parent organisation that the user belongs to is using
   */
  organisationProduct?: string
  /**
   * Flag indicating whether or not the user has given consent for their actions to be tracked whilst using Reapit products
   */
  consentToTrack?: boolean
  /**
   * Flag indicating whether or not the user has an active secondary authenticator against their account (MFA)
   */
  mfaEnabled?: boolean
  /**
   * The id of the negotiator the user relates to
   */
  negotiatorId?: string
  /**
   * The id of the office the user belongs to
   */
  officeId?: string
  /**
   * The name of the office group the user belongs to
   */
  officeGroupName?: string
  /**
   * The ids of the offices belonging to the group
   */
  officeGroupIds?: string
  /**
   * The List of members that the parent organisation group governs
   */
  organisationGroupMembers?: OrganisationGroupMemberModel[]
  /**
   * The List of groups that the user making this request is a member of
   */
  userGroups?: string[]
  idpData?: IdentityClientUserInfoModel
}
/**
 * Representation of a user
 */
export interface UserModel {
  /**
   * The unique identifier of the user
   */
  id?: string
  /**
   * The date and time when the user was created
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  created?: string // date-time
  /**
   * The date and time when the user was last modified
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  modified?: string // date-time
  /**
   * The user's email address
   */
  email?: string
  /**
   * The user's full name
   */
  name?: string
  /**
   * The mobile phone number of the user
   */
  mobile?: string
  /**
   * The landline phone number of the user
   */
  landline?: string
  /**
   * The job title of the user
   */
  jobTitle?: string
  /**
   * The status of the user in the third party identity provider (active/inactive)
   */
  idpStatus?: string
  /**
   * A flag determining whether or not the user is currently inactive
   */
  inactive?: boolean
  /**
   * The id of the parent organisation that the user belongs to
   */
  organisationId?: string
  /**
   * The name of the parent organisation that the user belongs to
   */
  organisationName?: string
  /**
   * A collection of organisation identifiers that the user belongs too
   */
  organisationIds?: string[]
  /**
   * The product the parent organisation that the user belongs to is using
   */
  organisationProduct?: string
  /**
   * The id of the Reapit Marketplace developer organisation that the user belongs to, where applicable
   */
  marketplaceDeveloperId?: string
  /**
   * The id of the Reapit Agency Cloud customer that the user belongs to, where applicable
   */
  agencyCloudCustomerId?: string
  /**
   * The id of the Reapit Agency Cloud negotiator that the user is associated with, where applicable
   */
  agencyCloudNegotiatorId?: string
  /**
   * Flag indicating whether or not the user has given consent for their actions to be tracked whilst using Reapit products
   */
  consentToTrack?: boolean
  /**
   * Flag indicating whether or not the user has an active secondary authenticator against their account (MFA)
   */
  mfaEnabled?: boolean
  /**
   * The date and time that the user last updated their tracking consent status
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  consentToTrackModified?: string // date-time
  /**
   * A copllection of groups that the user belongs to
   */
  groups?: string[]
  /**
   * A collection of claims associated to the user, which are optionally included in tokens generated by the identity provider
   */
  userClaims?: ClaimModel[]
  /**
   * A collection of claims associated to the user's organisation, which are optionally included in tokens generated by the identity provider
   */
  organisationClaims?: ClaimModel[]
  /**
   * A collection of products associated to the user
   */
  products?: UserProductModel[]
}
export interface UserModelPagedResult {
  _embedded?: UserModel[]
  pageNumber?: number // int32
  pageSize?: number // int32
  pageCount?: number // int32
  totalPageCount?: number // int32
  totalCount?: number // int32
  _links?: {
    [name: string]: PagingLinkModel
  }
}
/**
 * Representation of a user product
 */
export interface UserProductModel {
  /**
   * The products identifier
   */
  id?: string
  /**
   * The unique identifier of the organisation the product relates too
   */
  organisationId?: string
}
/**
 * Details for an attempt to sign in to the IDP
 */
export interface UserSignInRequest {
  /**
   * The email address of the user to attempt sign in for
   */
  email?: string
  /**
   * The password for the provided email address
   */
  password?: string
  /**
   * The id of the app client the user wishes to sign in to
   */
  appClientId?: string
}
export interface UserSignInResponse {
  /**
   * The UTC date time of the sign in event
   * example:
   * 2019-08-14T12:30:02.0000000Z
   */
  timestamp?: string // date-time
  /**
   * A flag indicating whether a successful sign in occurred
   */
  success?: boolean
  /**
   * The email address of the sign in attempt
   */
  emailAddress?: string
  /**
   * If this request failed, the reason why
   */
  failureReason?: string
  /**
   * The agency cloud id of the customer that this user belongs to
   */
  agencyCloudCustomerId?: string
  /**
   * The agency cloud id that this user is associated to, relative to the specified agency cloud customer database
   */
  agencyCloudNegotiatorId?: string
  /**
   * Gets the identity token issued from the IDP
   */
  identityToken?: string
  /**
   * Gets the access token issued from the IDP
   */
  accessToken?: string
  /**
   * Gets the refresh token issued from the IDP
   */
  refreshToken?: string
}
export interface Users {
  pageSize?: number
  pageNumber?: number
  agencyCloudId?: string
  claim?: string[]
  organisationId?: string
  groupId?: string
  name?: string
  email?: string
  organisationName?: string
  mfaEnabled?: boolean
  createdFrom?: string
  createdTo?: string
  active?: boolean
}
export interface UsersInfo {
  email?: string
  includeIdpData?: boolean
}
/**
 * Request body used to verify a user authenticator
 */
export interface VerifyUserAuthenticatorModel {
  /**
   * The code to verify the authenticator
   */
  code?: string
}
