import React from "react";
import { BsArrowDown, BsArrowUp, BsList, BsGrid } from "react-icons/bs";
import {useSelector,useDispatch} from "react-redux"
import { changeView } from "../slices/viewSlice";
import Button from 'react-bootstrap/Button';
const ContentsOptions = () => {
  const viewType=useSelector((state)=>state.view.listview)
  const dispatch=useDispatch();

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
          <div>Name</div>
          <div style={{ paddingLeft: "7px" }}>
            {true ? <BsArrowDown /> : <BsArrowUp />}
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
          <div>Size</div>
          <div style={{ paddingLeft: "7px" }}>
            {true ? <BsArrowDown /> : <BsArrowUp />}
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
          <div>Modified</div>
          <div style={{ paddingLeft: "7px" }}>
            {true ? <BsArrowDown /> : <BsArrowUp />}
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
