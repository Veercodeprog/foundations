import React, { Dispatch, FC, SetStateAction } from 'react'
import { BodyText, Button, ButtonGroup, elMb11, elMb5, Icon, Loader, Table, useModal } from '@reapit/elements'
import { RulesModel } from '../../types/network'
import dayjs from 'dayjs'
import { IpTable } from './ip-table'
import { IpCreateModal } from './ip-create-modal'
import { handleModalAction, NetworkSelected, useNetworkState } from './use-network-state'
import { SendFunction, UpdateActionNames, updateActions, useReapitUpdate } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export const handleSetRuleId =
  (setNetworkSelected: Dispatch<SetStateAction<NetworkSelected>>, ruleId: string | null = null) =>
  () => {
    setNetworkSelected((networkSelected) => ({
      ...networkSelected,
      ruleId: ruleId === networkSelected?.ruleId ? null : ruleId,
    }))
  }

export const handleUpdateRule =
  (
    updateRule: SendFunction<Partial<RulesModel>, boolean>,
    refreshRules: () => void,
    enabled: boolean,
    ruleId?: string,
  ) =>
  async () => {
    if (!ruleId) return

    const ruleUpdated = await updateRule({ enabled }, { uriParams: { ruleId } })

    if (ruleUpdated) {
      refreshRules()
    }
  }

export const RulesTable: FC = () => {
  const { Modal: ModalIp, openModal: openModalIp, closeModal: closeModalIp, modalIsOpen: modalIsOpenIp } = useModal()
  const { Modal: ModalBi, openModal: openModalBi, closeModal: closeModalBi, modalIsOpen: modalIsOpenBi } = useModal()

  const { rules, ips, networkSelected, ipsLoading, setNetworkSelected, customerId, refreshRules } = useNetworkState()

  const ruleId = networkSelected?.ruleId

  const [ruleUpdating, , updateRule] = useReapitUpdate<Partial<RulesModel>, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.updateRule],
    method: 'PUT',
    uriParams: {
      customerId,
    },
  })

  const indexExpandedRow = ruleId ? rules?._embedded?.findIndex((rule) => rule.id === ruleId) : null

  return (
    <>
      <Table
        className={elMb11}
        indexExpandedRow={indexExpandedRow}
        rows={rules?._embedded?.map((rule: RulesModel) => {
          const { name, enabled, created, modified, id } = rule
          return {
            cells: [
              {
                label: 'Network Rule Name',
                value: name,
                icon: 'contact',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Enabled',
                value: enabled ? <Icon icon="check" intent="success" /> : <Icon icon="close" intent="danger" />,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Created',
                value: created ? dayjs(created).format('DD/MM/YYYY') : 'Unknown',
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Modified',
                value: modified ? dayjs(modified).format('DD/MM/YYYY') : 'Unknown',
                narrowTable: {
                  showLabel: true,
                },
              },
            ],
            expandableContent: {
              onClick: handleSetRuleId(setNetworkSelected, id),
              content: (
                <>
                  <ButtonGroup className={elMb5} alignment="right">
                    <Button
                      intent={enabled ? 'danger' : 'primary'}
                      onClick={handleUpdateRule(updateRule, refreshRules, !enabled, id)}
                      disabled={ruleUpdating}
                      loading={ruleUpdating}
                    >
                      {enabled ? 'Disable Rule' : 'Enable Rule'}
                    </Button>
                    <Button intent="primary" onClick={openModalBi} disabled={modalIsOpenBi}>
                      I Use PowerBI
                    </Button>
                    <Button
                      intent="primary"
                      onClick={handleModalAction(setNetworkSelected, openModalIp, 'ipRuleId', id)}
                      disabled={modalIsOpenIp}
                    >
                      Create Whitelisted IP
                    </Button>
                  </ButtonGroup>
                  {ipsLoading ? <Loader /> : ips && id === ruleId && <IpTable />}
                </>
              ),
            },
          }
        })}
      />
      <ModalIp title="Create Whitelisted IP">
        <IpCreateModal closeModal={closeModalIp} />
      </ModalIp>
      <ModalBi title="Power BI Users">
        <BodyText>
          If you use PowerBI to access the Data Warehouse, there are around 200 IPs that could potentially be
          whitelisted.
        </BodyText>
        <BodyText hasSectionMargin>
          To avoid having to do this manually, just send us an email with the pre-filled subject line by clicking the
          button below. One of our team will action the request as soon as possible and get back to you.
        </BodyText>
        <ButtonGroup alignment="right">
          <Button intent="default" type="button" onClick={closeModalBi}>
            Close
          </Button>
          <a
            href={`mailto:dwh@reapitfoundations.zendesk.com?subject=Data%20Warehouse%20PowerBI%20Setup%20Request%20For%20CustomerId%20${customerId}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button intent="primary">Open Mail Client</Button>
          </a>
        </ButtonGroup>
      </ModalBi>
    </>
  )
}

export default RulesTable
