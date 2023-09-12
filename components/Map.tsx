'use client'

import { Map as MapComponent } from 'react-amap'
import classNames from 'classnames'
import { HTMLAttributes } from 'react'

interface MapProps {
  center: [number, number]
}

const Map = (props: MapProps & HTMLAttributes<HTMLDivElement>) => {
  const {
    center = [0, 0],
    ...attrs
  } = props

  return (
    <div
      {...attrs}
      className={classNames(
        'rounded-t-2xl overflow-hidden',
        attrs.className
      )}>
      <MapComponent
        amapkey='36ecdf9b33554f1688d80e2ce3b5f4b8'
        center={props.center}
        zoom={17.5}
      >
        {attrs.children}
      </MapComponent>
    </div>
  )
}

export default Map