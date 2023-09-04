import React from 'react'
import ContentList from './ContentList'
import ContentCard from './ContentCard'
import { useSelector } from 'react-redux'

const ContentsActual = () => {
  const view=useSelector((state)=>state.view.listview)
  return (
    <>
    {view?<ContentList/>:<ContentCard/>}
    </>
  )
}

export default ContentsActual
