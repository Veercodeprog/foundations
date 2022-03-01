import { useNode } from '@craftjs/core'
import React, { FC } from 'react'
import { cx } from '@linaria/core'
import { elFlex, elFlexJustifyBetween, elMt6, elMt3, elPx3 } from '@reapit/elements'
import { cursorPointer } from '../styles'

interface ToolbarSectionProps {
  children: React.ReactNode
  title: string
  summary: (nodeProps: any) => React.ReactNode
  props: any
}

interface DisplayToolbarSectionProps {
  children: React.ReactNode
  title: string
  summaryText: string
}

export const ToolbarSection = ({ children, title, summary, props }: ToolbarSectionProps) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res: any, key: any) => {
        res[key] = node.data.props[key] || null
        return res
      }, {}),
  }))

  const summaryText = summary && props && nodeProps && summary(nodeProps)

  return (
    <DisplayToolbarSection title={title} summaryText={summaryText}>
      {children}
    </DisplayToolbarSection>
  )
}

export const DisplayToolbarSection: FC<DisplayToolbarSectionProps> = ({
  title,
  summaryText,
  children,
}: DisplayToolbarSectionProps) => (
  <details>
    <summary className={cx(elFlex, elFlexJustifyBetween, elPx3, elMt6, cursorPointer)}>
      <span>{title}</span>
      {summaryText && <span>{summaryText}</span>}
    </summary>
    <div className={cx(elMt3)}>{children}</div>
  </details>
)
