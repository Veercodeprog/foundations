import Routes from '@/constants/routes'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { pipelineRunnerCreate, pipelineRunnerPaginate, pipelineServiceGet } from '@/platform-api/pipelines'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { Breadcrumb, BreadcrumbItem, FlexContainerBasic, H1, Section, H3 } from '@reapit/elements-legacy'
import { Button, Label, Loader, StatusIndicator, Table, Intent } from '@reapit/elements'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  DeploymentStatus,
  PipelineModelInterface,
  PipelineRunnerModelInterface,
  TaskModelInterface,
} from '@reapit/foundations-ts-definitions'
import { Pagination } from 'nestjs-typeorm-paginate'

const pipelineStatusToIntent = (status: DeploymentStatus): Intent => {
  switch (status) {
    case DeploymentStatus.CANCELED:
      return 'neutral'
    case DeploymentStatus.FAILED:
      return 'danger'
    case DeploymentStatus.RUNNING:
      return 'critical'
    case DeploymentStatus.SUCCESS:
      return 'success'
    default:
      return 'neutral'
  }
}

const findRelevantTask = (tasks: TaskModelInterface[]): TaskModelInterface => {
  const priority: { [key in DeploymentStatus]: number } = {
    [DeploymentStatus.CANCELED]: 1,
    [DeploymentStatus.FAILED]: 4,
    [DeploymentStatus.SUCCESS]: 3,
    [DeploymentStatus.RUNNING]: 5,
    [DeploymentStatus.PENDING]: 2,
  }

  return tasks.sort((a, b) => {
    return priority[a.status as DeploymentStatus] - priority[b.status as DeploymentStatus]
  })[0]
}

export default () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [loading, setLoading] = useState<boolean>(false)
  const [pipeline, setPipeline] = useState<PipelineModelInterface | undefined>()
  const params = useParams<{ pipelineId: string }>()
  const [runnerLoading, setRunnerLoading] = useState<boolean>(false)
  const [pipelineRunners, setPipelineRunners] = useState<Pagination<PipelineRunnerModelInterface>>()
  const [deployLoading, setDeployLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchPipeline = async () => {
      setLoading(true)
      const serviceResponse = await pipelineServiceGet(connectSession as ReapitConnectSession, params.pipelineId)
      setLoading(false)
      if (serviceResponse) {
        setPipeline(serviceResponse)
      }
    }
    if (connectSession) {
      fetchPipeline()
    }
  }, [connectSession])

  useEffect(() => {
    const fetchPipelineRunners = async () => {
      setRunnerLoading(true)

      const response = await pipelineRunnerPaginate(
        connectSession as ReapitConnectSession,
        pipeline as PipelineModelInterface,
      )

      setPipelineRunners(response)
      setRunnerLoading(false)
    }

    if (pipeline) {
      fetchPipelineRunners()
    }
  }, [pipeline])

  const deployPipeline = async () => {
    if (!pipeline || deployLoading) {
      return
    }
    setDeployLoading(true)
    const runner = await pipelineRunnerCreate(connectSession as ReapitConnectSession, pipeline)
    setDeployLoading(false)
    if (pipelineRunners && runner) {
      setPipelineRunners({
        ...pipelineRunners,
        items: [runner, ...pipelineRunners.items],
      })
    }

    console.log('runner', runner)
  }

  const pipelineRunnerMapped = pipelineRunners?.items.map((pipeline) => ({
    cells: [
      {
        label: 'Started',
        value: pipeline.created as string,
      },
      {
        label: 'Tasks',
        value: Array.isArray(pipeline.tasks)
          ? pipeline.buildStatus === DeploymentStatus.RUNNING
            ? (findRelevantTask(pipeline.tasks).status as DeploymentStatus)
            : pipeline.tasks.length.toString()
          : '0',
      },
      {
        label: 'Status',
        value: pipeline.buildStatus?.toString() || '',
        children: (
          <>
            <StatusIndicator intent={pipelineStatusToIntent(pipeline.buildStatus as DeploymentStatus)} />{' '}
            {pipeline.buildStatus}
          </>
        ),
      },
    ],
    expandableContent: (
      <div>
        <H3>Tasks</H3>
        <ul>
          {pipeline.tasks?.map((task) => (
            <li key={task.id}>
              <StatusIndicator intent={pipelineStatusToIntent(task.status as DeploymentStatus)} /> {task.functionName}
            </li>
          ))}
        </ul>
      </div>
    ),
  }))

  return loading ? (
    <FlexContainerBasic centerContent flexColumn hasBackground hasPadding>
      <Loader />
    </FlexContainerBasic>
  ) : pipeline ? (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to={Routes.PIPELINES}>Pipelines</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent={true}>
          <a href="#">{pipeline?.name}</a>
        </BreadcrumbItem>
      </Breadcrumb>
      <Section>
        <H1>Pipeline {pipeline?.name}</H1>
        <div>
          <Button loading={deployLoading} onClick={() => deployPipeline()} intent="success">
            Deploy
          </Button>
        </div>
        <Label>Package Manager</Label>
        <p>{pipeline?.packageManager}</p>
        <Label>Build Command</Label>
        <p>{pipeline?.buildCommand}</p>
        <Label>Repository</Label>
        <p>{pipeline?.repository}</p>
      </Section>
      <Section>
        {runnerLoading ? (
          <FlexContainerBasic centerContent flexColumn hasBackground hasPadding>
            <Loader />
          </FlexContainerBasic>
        ) : pipelineRunners ? (
          <Table rows={pipelineRunnerMapped} expandableContentSize="small" />
        ) : (
          <H1>Error loading pipelines</H1>
        )}
      </Section>
    </>
  ) : (
    <>
      <H1>No pipeline found</H1>
      <Link to={Routes.PIPELINES}>Back</Link>
    </>
  )
}
