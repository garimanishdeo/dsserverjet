import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = (props) => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent {...props} businessList={props.businessList} eventsLists={props.eventsList} regionBoundary={props.regionBoundary}/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
