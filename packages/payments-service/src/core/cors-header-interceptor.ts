import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { Response } from 'express'

const allowedOrigins = [
  'https://payments.dev.paas.reapit.cloud',
  'https://payments.prod.paas.reapit.cloud',
  'https://payments-portal.dev.paas.reapit.cloud',
  'https://payments-portal.prod.paas.reapit.cloud',
]

if (process.env.APP_ENV !== 'production') {
  allowedOrigins.push('http://localhost:8080')
}

@Injectable()
export class CorsHeaderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>()

    response.setHeader('Access-Control-Allow-Origin', allowedOrigins.join(','))

    return next.handle()
  }
}
