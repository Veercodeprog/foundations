import React, { Dispatch, FC, SetStateAction } from 'react'
import { UsageFilters } from '.'
import { useForm } from 'react-hook-form'
import {
  FormLayout,
  InputWrapFull,
  Subtitle,
  BodyText,
  InputWrap,
  InputGroup,
  SearchableDropdown,
  Label,
  Select,
} from '@reapit/elements'
import { fetchDevelopersList } from '../../../services/developers'
import { AppSummaryModelPagedResult, InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'

export interface FilterFormProps {
  setUsageFilters: Dispatch<SetStateAction<UsageFilters>>
  apps: AppSummaryModelPagedResult | null
  installations: InstallationModelPagedResult | null
}

export const FilterForm: FC<FilterFormProps> = ({ setUsageFilters, apps, installations }) => {
  const { register, handleSubmit, getValues } = useForm<UsageFilters>({ mode: 'all' })

  const { developerId, month, appId } = getValues()

  return (
    <form onChange={handleSubmit(setUsageFilters)}>
      <FormLayout hasMargin>
        <InputWrapFull>
          <Subtitle>Filters</Subtitle>
          <BodyText hasGreyText>Apply a filter to get started. Developer and month are required by default.</BodyText>
        </InputWrapFull>
        <InputWrap>
          <Label>Developer</Label>
          <SearchableDropdown
            id="developer-search-box"
            {...register('developerId')}
            getResults={(company: string) =>
              fetchDevelopersList({ company }).then((developers) => developers?.data ?? [])
            }
            getResultLabel={(result) => result.company ?? ''}
            getResultValue={(result) => result.id ?? ''}
            placeholder="Search developers"
          />
        </InputWrap>
        <InputWrap>
          <InputGroup
            {...register('month')}
            label="Month"
            type="month"
            defaultValue={dayjs(new Date()).subtract(1, 'month').format('YYYY-MM')}
          />
        </InputWrap>
        <InputWrap>
          <Label>App</Label>
          <InputGroup>
            <Select {...register('appId')} disabled={!developerId || !month || !apps}>
              <option value="">Please Select</option>
              {apps?.data?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </InputGroup>
        </InputWrap>
        <InputWrap>
          <Label>Customer</Label>
          <InputGroup>
            <Select {...register('customerId')} disabled={!developerId || !month || !appId || !installations}>
              <option value="">Please Select</option>
              {installations?.data?.map(({ customerName, id, client }) => (
                <option key={id} value={client}>
                  {customerName} (Code: {client})
                </option>
              ))}
            </Select>
          </InputGroup>
        </InputWrap>
      </FormLayout>
    </form>
  )
}
