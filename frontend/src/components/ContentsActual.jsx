import React from 'react'
import ContentList from './ContentList'
import ContentCard from './ContentCard'

const ContentsActual = () => {
  return (
    <>
    {false?<ContentList/>:<ContentCard/>}
    </>
  )
}

export default ContentsActual
