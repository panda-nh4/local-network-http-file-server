import React from 'react'
import ContentList from './ContentList'
import ContentCard from './ContentCard'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getContents } from '../slices/contentSlice'
const ContentsActual = () => {
  const dispatch=useDispatch()
  const view=useSelector((state)=>state.view.listview)
  const contents=useSelector((state)=>state.contents.content)
  const status=useSelector((state)=>state.contents.status)
  const error =useSelector((state)=>state.contents.error)
  const path = useSelector((state) => state.path.currentPath)
  useEffect(()=>{
    if(status==='idle'){
      dispatch(getContents(path))
    }
  },[status,path,dispatch])

  let contentfrag;
  if (status==='loading'){
    contentfrag=<p>Loading...</p>
  }
  else if(status==='success'){
    contentfrag=view?<ContentList contents={contents}/>:<ContentCard contents={contents}/>
  }
  else if(status==='fail')
  {
    contentfrag=error
  }
  return (
    <>
    {contentfrag}
    </>
  )
}

export default ContentsActual
