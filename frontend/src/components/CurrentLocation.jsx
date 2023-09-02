import React from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { StyledBreadcrumbItem } from './styles.jsx'
const CurrentLocation = () => {


  return (
    <div className='px-5'>
    <Breadcrumb >
      <StyledBreadcrumbItem href='#'>Redo</StyledBreadcrumbItem>
      <StyledBreadcrumbItem href="#">
        In
      </StyledBreadcrumbItem>
      <StyledBreadcrumbItem active>MUI</StyledBreadcrumbItem>
    </Breadcrumb>
    </div>
  )
}

export default CurrentLocation
