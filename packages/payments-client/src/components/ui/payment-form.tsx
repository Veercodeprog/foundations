import React, { useState } from 'react'
import { Section, Formik, Form, CardInputGroup, Input, LevelRight, Button, Helper, FadeIn } from '@reapit/elements'
import { Routes } from '../../constants/routes'
import { history } from '../../core/router'
import { MerchantKey } from '../../types/opayo'
import { PaymentWithPropertyModel } from '../../types/payment'
import { ResendConfirmButton } from './payment-resend-confirm-button'
import { onHandleSubmit } from './payment-handlers'

export interface CardDetails {
  customerFirstName: string
  customerLastName: string
  address1: string
  city: string
  postalCode: string
  country: string
  cardholderName: string
  cardNumber: string
  expiryDate: string
  securityCode: string
  cardIdentifier: string
  email: string
}

const PaymentForm: React.FC<{
  payment: PaymentWithPropertyModel
  merchantKey: MerchantKey
  paymentId: string
  session?: string
  refetchPayment: () => void
}> = ({ payment, merchantKey, paymentId, session, refetchPayment }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const onSubmit = onHandleSubmit(merchantKey, payment, paymentId, setIsLoading, refetchPayment, session)
  const { customer, status } = payment
  const { forename = '', surname = '', email = '', primaryAddress = {} } = customer || {}
  const { buildingName, buildingNumber, line1, line3, line4, postcode = '', countryId = '' } = primaryAddress
  const redirectToDashboard = () => history.push(Routes.PAYMENTS)

  const address1 =
    buildingName && line1
      ? `${buildingName} ${line1}`
      : buildingNumber && line1
      ? `${buildingNumber} ${line1}`
      : buildingName || buildingNumber || line1 || ''

  return (
    <Formik
      initialValues={{
        customerFirstName: forename,
        customerLastName: surname,
        address1,
        city: line3 || line4 || '',
        postalCode: postcode,
        country: countryId,
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        securityCode: '',
        cardIdentifier: '',
        email: email,
      }}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="form">
          {status === 'rejected' && (
            <FadeIn>
              <Helper variant="warning">
                This payment has failed. Please check the details submitted are correct and try again.
              </Helper>
            </FadeIn>
          )}
          {status === 'posted' && (
            <FadeIn>
              <Helper variant="info">
                This payment has been successfully submitted and confirmation of payment has been emailed to the address
                supplied. If no email was received, you can send again by clicking the button below.
              </Helper>
              <Section>
                <LevelRight>
                  {!session && (
                    <Button variant="secondary" type="button" onClick={redirectToDashboard}>
                      Back to dashboard
                    </Button>
                  )}
                  <ResendConfirmButton payment={payment} />
                </LevelRight>
              </Section>
            </FadeIn>
          )}
          {status !== 'posted' && (
            <FadeIn>
              <CardInputGroup hasBillingAddress whiteListTestCards={['4929000000006']} />
              <Section>
                <LevelRight>
                  <Button variant="primary" type="submit" loading={isLoading} disabled={isLoading}>
                    Make Payment
                  </Button>
                </LevelRight>
              </Section>
              <Input id="cardIdentifier" type="hidden" name="cardIdentifier" />
            </FadeIn>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default PaymentForm
