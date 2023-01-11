import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { PaymentModel, PropertyModel } from '@reapit/foundations-ts-definitions'
import axios from 'axios'
import { stringifyError } from '@reapit/utils-node'
import reapitConnectSession from '../core/connect-session'
import { PaymentsDto, PaymentsHeaders } from './dto'
import { PaymentWithPropertyModel } from '../types/payment'

@Injectable()
export class PaymentsProvider {
  async getPayment(paymentsHeaders: PaymentsHeaders, paymentId: string): Promise<PaymentWithPropertyModel> {
    const accessToken = await reapitConnectSession.connectAccessToken()
    const clientCode = paymentsHeaders['reapit-customer']
    const apiVersion = paymentsHeaders['api-version']

    if (!accessToken) throw new UnauthorizedException('No access token returned from Reapit Connect')

    const payment = await axios.get<PaymentModel>(`${process.env.PLATFORM_API_BASE_URL}/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'reapit-customer': clientCode,
        'api-version': apiVersion,
      },
    })

    if (payment.status >= 400 || !payment.data)
      throw new BadRequestException(
        `Payment not returned by platform: ${payment.status} ${stringifyError(payment.data)}`,
      )

    const propertyId = payment.data.propertyId

    if (!propertyId) return payment.data

    const property = await axios.get<PropertyModel>(`${process.env.PLATFORM_API_BASE_URL}/properties/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'reapit-customer': clientCode,
        'api-version': apiVersion ?? 'latest',
      },
    })

    if (property.status >= 400 || !property.data)
      throw new BadRequestException(
        `Property not returned by platform: ${property.status} ${stringifyError(property.data)}`,
      )

    return {
      ...payment.data,
      property: property.data,
    }
  }

  async patchPayment(paymentsHeaders: PaymentsHeaders, paymentPatch: PaymentsDto, paymentId: string): Promise<string> {
    const accessToken = await reapitConnectSession.connectAccessToken()
    const clientCode = paymentsHeaders['reapit-customer']
    const apiVersion = paymentsHeaders['api-version']
    const eTag = paymentsHeaders['If-Match']

    if (!accessToken) throw new BadRequestException('No access token returned from Reapit Connect')
    if (!eTag) throw new BadRequestException('No etag supplied in request')

    const payment = await axios.patch(`${process.env.PLATFORM_API_BASE_URL}/payments/${paymentId}`, paymentPatch, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'reapit-customer': clientCode,
        'api-version': apiVersion ?? 'latest',
        'If-Match': eTag,
      },
    })

    if (payment.status === 204) {
      return payment.data
    }

    throw new BadRequestException(`Payment not updated by platform: ${payment.status} ${stringifyError(payment.data)}`)
  }
}
