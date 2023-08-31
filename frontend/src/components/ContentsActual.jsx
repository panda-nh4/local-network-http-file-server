import React from 'react'
import ContentList from './ContentList'
import ContentCard from './ContentCard'

const ContentsActual = () => {
  return (
    <>
    {true?<ContentList/>:<ContentCard/>}
    </>
  )
}

export default ContentsActual
