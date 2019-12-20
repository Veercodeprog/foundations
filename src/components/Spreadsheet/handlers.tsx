import * as React from 'react'
import ReactDataSheet from 'react-datasheet'
import { Cell, DoubleClickPayLoad, SelectedMatrix, SpreadsheetProps } from './types'
import { getMaxRowAndCol, parseCsvFile, convertToCompatibleData } from './utils'

export const valueRenderer = (cell: Cell): string => cell.value

/** Double click on first read-only cell */
export const onDoubleClickCell = (
  payload: DoubleClickPayLoad,
  setSelected: React.Dispatch<SelectedMatrix>,
  onDoubleClickDefault
) => (...args): boolean => {
  /* trigger default handler from lib */
  onDoubleClickDefault(...args)
  const { row, col, maxRowIndex, isReadOnly } = payload
  const isFirstRow = row === 0
  if (isFirstRow && isReadOnly) {
    /* select all row's cells */
    setSelected({
      start: { i: 0, j: col },
      end: { i: maxRowIndex, j: col }
    })
    return true
  }
  return false
}

export const onSelectCells = (setSelected: React.Dispatch<SelectedMatrix>) => ({ start, end }: SelectedMatrix) => {
  setSelected({ start, end })
}

/* export const handleContextMenu: ReactDataSheet.ContextMenuHandler<Cell, string> = (e, cell, i, j) => {
  console.log('sad')
} */

/** all the customization of cell go here */
export const customCellRenderer = (
  data: Cell[][],
  setData: React.Dispatch<Cell[][]>,
  setSelected: React.Dispatch<SelectedMatrix>
) => (props: ReactDataSheet.CellRendererProps<Cell>) => {
  const { style: defaultStyle, cell, onDoubleClick, ...restProps } = props
  const {
    CustomComponent = false,
    validate = () => true,
    className = '',
    readOnly,
    style: customStyle,
    ...restCell
  } = cell
  const isValid = validate(cell)
  const [maxRowIndex, maxColIndex] = getMaxRowAndCol(data)
  const payload = {
    row: props.row,
    col: props.col,
    maxRowIndex,
    maxColIndex,
    isReadOnly: readOnly
  }
  const style = {
    ...defaultStyle,
    ...customStyle
  }
  return (
    <td
      {...restProps}
      {...restCell}
      className={`${props.className} ${!isValid ? 'error-cell' : ''} ${className}`}
      style={style}
      onDoubleClick={onDoubleClickCell(payload, setSelected, onDoubleClick)}
    >
      {CustomComponent ? (
        <CustomComponent cellRenderProps={props} data={data} setData={setData} setSelected={setSelected} />
      ) : (
        props.children
      )}
    </td>
  )
}

export const handleAddNewRow = (data: Cell[][], setData: React.Dispatch<Cell[][]>) => () => {
  const [maxRow] = getMaxRowAndCol(data)
  const lastRow = data[maxRow - 1]
  /* [
      { readOnly: true, value: '' },
      { value: 'A', readOnly: true },
      { value: 'B', readOnly: true },
      { value: 'C', readOnly: true },
      { value: 'D', readOnly: true }
    ] */
  /* return new row with same type of last row */
  const newEmptyRow = lastRow.map(e => ({ ...e, value: '' }))
  const newData = [...data, newEmptyRow]
  setData(newData)
}

export const handleCellsChanged = (
  prevData: Cell[][],
  setData: React.Dispatch<Cell[][]> /* setData from useState*/
) => changes => {
  const newData = prevData.map(row => [...row])
  changes.forEach(({ row, col, value }) => {
    newData[row][col] = { ...newData[row][col], value }
  })
  setData(newData)
}

export const handleClickUpload = (ref: React.RefObject<HTMLInputElement>) => () => {
  if (ref && ref.current && typeof ref.current.click === 'function') {
    /* allow same file input */
    ref.current.value = ''
    ref.current.click()
    return true
  }
  return false
}

export const handleOnChangeInput = (
  validateUpload: SpreadsheetProps['validateUpload'],
  setData: React.Dispatch<Cell[][]>
) => async (event: { target: HTMLInputElement }) => {
  try {
    const { target } = event
    if (target && target.files && target.files[0]) {
      const file = target.files[0]
      const result = await parseCsvFile(file)
      const compatibleData = convertToCompatibleData(result)
      if (validateUpload && typeof validateUpload === 'function') {
        const dataValidated = validateUpload(compatibleData)
        setData(dataValidated)
        return dataValidated
      }
      /* if not set validate function */
      setData(compatibleData)
      return compatibleData
    }
  } catch (err) {
    console.log(err)
  }
}
