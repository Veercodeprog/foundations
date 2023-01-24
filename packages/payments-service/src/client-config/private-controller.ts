import { Body, Controller, Delete, Get, Put, Post, Param } from '@nestjs/common'
import { ClientConfigDto, ClientConfigParams } from './dto'
import { ClientConfigProvider } from './provider'
import { ClientConfigModel } from './model'

@Controller('config/private')
export class ClientConfigPrivateController {
  constructor(private readonly clientConfigProvider: ClientConfigProvider) {}

  @Get('/:clientCode')
  async getConfig(@Param() { clientCode }: ClientConfigParams): Promise<ClientConfigModel> {
    return this.clientConfigProvider.get(clientCode)
  }

  @Post('/:clientCode')
  async createConfig(
    @Param() { clientCode }: ClientConfigParams,
    @Body() configModel: ClientConfigDto,
  ): Promise<ClientConfigModel> {
    return this.clientConfigProvider.create(clientCode, configModel)
  }

  @Put('/:clientCode')
  async updateConfig(
    @Param() { clientCode }: ClientConfigParams,
    @Body() configModel: ClientConfigDto,
  ): Promise<ClientConfigModel> {
    return this.clientConfigProvider.update(clientCode, configModel)
  }

  @Delete('/:clientCode')
  async deleteConfig(@Param() { clientCode }: ClientConfigParams): Promise<ClientConfigModel> {
    return this.clientConfigProvider.delete(clientCode)
  }
}
