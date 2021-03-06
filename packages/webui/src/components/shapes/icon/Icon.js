import React from 'react'
import {DraggableCore} from 'react-draggable'
import Connector from '../../utils/Connector'
import Resizer from '../../utils/Resizer'
import {indexedIcons} from '../../IconLibrary'

const connectors = ['top', 'bottom', 'left', 'right']
export const getConnectors = () => connectors

export const getConnectorPosition = ({x, y, width}, connector) => {
  switch (connector) {
    case 'top':
      return {x: x + width / 2, y}

    case 'bottom':
      return {x: x + width / 2, y: y + width}

    case 'left':
      return {x, y: y + width / 2}

    case 'right':
      return {x: x + width, y: y + width / 2}

    default:
      return {x, y}
  }
}

const Icon = ({id, x, y, icon, label, width, color, filter, onMoveShape, moveConnector, dropConnector, onResize, currentDropTarget, onSelect, isSelected, isConnecting, isConnectingMe, connecting}) => {
  const IconComponent = indexedIcons[icon]

  return <g>
    <DraggableCore onDrag={(_, d) => onMoveShape(id, d.deltaX, d.deltaY)}>
      <g onClick={() => onSelect(id)}>
        <IconComponent
          x={x}
          y={y}
          width={width}
          height={width}
          nativeColor={color.primary}
        />

        <text
          x={x + width / 2}
          y={y + width / 2}
          fontSize={Math.min(20, width - 10)}
          fontFamily='Roboto'
          fill={color.text}
          textAnchor='middle'
          alignmentBaseline='central'
        >
          {label}
        </text>

      </g>
    </DraggableCore>

    <Resizer
      id={id}
      position='topLeft'
      x={x}
      y={y}
      onResize={onResize}
      isSelected={isSelected}
      isConnecting={isConnecting}
    />
    <Resizer
      id={id}
      position='topRight'
      x={x + width}
      y={y}
      onResize={onResize}
      isSelected={isSelected}
      isConnecting={isConnecting}
    />
    <Resizer
      id={id}
      position='bottomLeft'
      x={x}
      y={y + width}
      onResize={onResize}
      isSelected={isSelected}
      isConnecting={isConnecting}
    />
    <Resizer
      id={id}
      position='bottomRight'
      x={x + width}
      y={y + width}
      onResize={onResize}
      isSelected={isSelected}
      isConnecting={isConnecting}
    />

    <Connector
      draggedX={isConnectingMe && connecting.origin.connector === 'right' ? connecting.x : null}
      draggedY={isConnectingMe && connecting.origin.connector === 'right' ? connecting.y : null}
      originX={x + width}
      originY={y + (width / 2)}
      moveConnector={(dx, dy) => moveConnector({id, connector: 'right'}, dx, dy)}
      dropConnector={dropConnector}
      isCurrentDropTarget={currentDropTarget === 'right'}
      isPotentialDropTarget={!isConnectingMe && isConnecting}
      isSelected={isSelected}
      isConnecting={isConnecting}
      isConnectingMe={isConnectingMe && connecting.origin.connector === 'right'}
    />

    <Connector
      draggedX={isConnectingMe && connecting.origin.connector === 'left' ? connecting.x : null}
      draggedY={isConnectingMe && connecting.origin.connector === 'left' ? connecting.y : null}
      originX={x}
      originY={y + (width / 2)}
      moveConnector={(dx, dy) => moveConnector({id, connector: 'left'}, dx, dy)}
      dropConnector={dropConnector}
      isCurrentDropTarget={currentDropTarget === 'left'}
      isPotentialDropTarget={!isConnectingMe && isConnecting}
      isSelected={isSelected}
      isConnecting={isConnecting}
      isConnectingMe={isConnectingMe && connecting.origin.connector === 'left'}
    />

    <Connector
      draggedX={isConnectingMe && connecting.origin.connector === 'top' ? connecting.x : null}
      draggedY={isConnectingMe && connecting.origin.connector === 'top' ? connecting.y : null}
      originX={x + (width / 2)}
      originY={y}
      moveConnector={(dx, dy) => moveConnector({id, connector: 'top'}, dx, dy)}
      dropConnector={dropConnector}
      isCurrentDropTarget={currentDropTarget === 'top'}
      isPotentialDropTarget={!isConnectingMe && isConnecting}
      isSelected={isSelected}
      isConnecting={isConnecting}
      isConnectingMe={isConnectingMe && connecting.origin.connector === 'top'}
    />

    <Connector
      draggedX={isConnectingMe && connecting.origin.connector === 'bottom' ? connecting.x : null}
      draggedY={isConnectingMe && connecting.origin.connector === 'bottom' ? connecting.y : null}
      originX={x + (width / 2)}
      originY={y + width}
      moveConnector={(dx, dy) => moveConnector({id, connector: 'bottom'}, dx, dy)}
      dropConnector={dropConnector}
      isCurrentDropTarget={currentDropTarget === 'bottom'}
      isPotentialDropTarget={!isConnectingMe && isConnecting}
      isSelected={isSelected}
      isConnecting={isConnecting}
      isConnectingMe={isConnectingMe && connecting.origin.connector === 'bottom'}
    />
  </g>
}
export default Icon
