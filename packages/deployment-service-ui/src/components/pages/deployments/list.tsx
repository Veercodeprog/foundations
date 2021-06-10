import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { H3, Section } from '@reapit/elements'
import { Button, Table } from '@reapit/elements'
import { Loader } from '@reapit/elements/v3'
import { DeploymentModelInterface } from '@reapit/foundations-ts-definitions'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deploymentServiceDelete, deploymentServicePaginate } from '../../../platform-api/deployments'

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [deployments, setDeployments] = useState<DeploymentModelInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [deletionLoading, setDeletionLoading] = useState<string[]>([])

  useEffect(() => {
    const fetchDeployments = async () => {
      setLoading(true)
      const serviceResponse = await deploymentServicePaginate(connectSession as ReapitConnectSession)
      setLoading(false)
      if (serviceResponse) {
        setDeployments([...deployments, ...serviceResponse])
      }
    }
    if (connectSession) {
      fetchDeployments()
    }
  }, [connectSession])

  const deleteDeployment = async (id: string) => {
    setDeletionLoading([...deletionLoading, id])

    await deploymentServiceDelete(connectSession as ReapitConnectSession, id)

    setDeletionLoading(deletionLoading.filter((del) => del !== id))
    setDeployments(deployments.filter((deployment) => deployment.id !== id))
  }

  return (
    <Section>
      <H3>Deployments</H3>
      <Link to={Routes.DEPLOYMENTS_CREATION}>
        <Button type="button" variant="primary">
          Create new Deployment
        </Button>
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <Table
          data={deployments}
          columns={[
            {
              Header: 'Name',
              accessor: 'name',
            },
            // {
            //   Header: 'Created',
            //   accessor: 'created',
            //   Cell: (cell: { value }) => {
            //     const int = shleemy(cell.value)

            //     return <span>{int.forHumans}</span>
            //   },
            // },
            {
              id: 'Delete',
              Cell: ({ row }: { row: { original: any } }) => (
                <Button onClick={() => deleteDeployment(row.original.id)} variant="danger">
                  Delete
                </Button>
              ),
            },
            {
              id: 'Deployment',
              Cell: () => (
                <Button variant="info">
                  Run Deployment
                </Button>
              ),
            },
          ]}
        />
      )}
    </Section>
  )
}
