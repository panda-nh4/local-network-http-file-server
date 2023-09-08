import React from "react";
import { BsArrowDown, BsArrowUp, BsList, BsGrid } from "react-icons/bs";
import {useSelector,useDispatch} from "react-redux"
import { changeView } from "../slices/viewSlice";
import Button from 'react-bootstrap/Button';
import { setSortAscending, setSortBy } from "../slices/sortSlice";
const ContentsOptions = () => {
  const viewType=useSelector((state)=>state.view.listview)
  const dispatch=useDispatch();
  const sortedBy=useSelector((state)=>state.sortContent.sortBy)
  const sortAscending=useSelector((state)=>state.sortContent.sortAscending)
  const arrowType=sortAscending?<BsArrowUp/>:<BsArrowDown/>
  const clicked=(toSortBy)=>{
    if (sortedBy===toSortBy){
      dispatch(setSortAscending(!sortAscending))
    }
    else{
      dispatch(setSortBy(toSortBy))
    }

  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
         paddingRight: "3%",
         paddingLeft: "3%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "4%",
          justifyContent: "start",
          alignItems:"center"
          // paddingRight: "00px",
        }}
      >
        <input type="checkbox" />
      </div>
      <div
        style={{
          display: "flex",
          width: "84%",
          // justifyContent: "space-between",
          // paddingRight: "00px",
          paddingLeft: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "43%",
          }}
        >
          <div style={{cursor:"pointer"}} onClick={()=>clicked("Name")}>Name</div>
          <div style={{ paddingLeft: "7px",cursor:"pointer"}} onClick={()=>clicked("Name")}>
            {sortedBy==="Name" ? arrowType:<></>}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "20%",
          }}
        >
          <div style={{cursor:"pointer"}} onClick={()=>clicked("Size")}>Size</div>
          <div style={{ paddingLeft: "7px",cursor:"pointer" }}onClick={()=>clicked("Size")} >
          {sortedBy==="Size" ? arrowType:<></>}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:"center",
            width: "35%",
          }}
        >
          <div style={{cursor:"pointer"}} onClick={()=>clicked("Modified")}>Modified</div>
          <div style={{ paddingLeft: "7px",cursor:"pointer" }} onClick={()=>clicked("Modified")}>
          {sortedBy==="Modified" ? arrowType:<></>}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          paddingLeft: "0px",
          width:"6%"
        }}
      >
        
        {viewType? <Button variant="light" style={{background:"white"}} onClick={()=>dispatch(changeView())}><BsGrid/></Button>:<Button variant="light" style={{background:"white"}} onClick={()=>dispatch(changeView())}><BsList/></Button>}
      </div>
    </div>
  );
};

export default ContentsOptions;
