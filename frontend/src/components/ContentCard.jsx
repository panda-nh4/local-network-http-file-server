import React from "react";
import { useSelector } from "react-redux";
import CardItem from "./CardItem";
const ContentCard = ({ folders, files }) => {
  const sortedBy = useSelector((state) => state.sortContent.sortBy);
  const sortAscending = useSelector((state) => state.sortContent.sortAscending);
  const allSelected = useSelector((state) => state.select.allSelected);
  const selectedF = useSelector((state) => state.select.numberSelected);
  const showOptions=selectedF===0
  var sortedFolders = [...folders];
  var sortedFiles = [...files];
  const sortByModified = (fList) => {
    fList.sort((a, b) => {
      return new Date(a.mtime).getTime() - new Date(b.mtime).getTime();
    });
    fList.sort((a, b) => {
      return new Date(a.mtime).getTime() - new Date(b.mtime).getTime();
    });
  };
  const sortByName = (fList) => {
    fList.sort((a, b) => {
      return a.fName.toLowerCase() > b.fName.toLowerCase()
        ? 1
        : b.fName.toLowerCase() > a.fName.toLowerCase()
        ? -1
        : 0;
    });
  };
  const sortBySize = (fList) => {
    fList.sort((a, b) => {
      return parseInt(a.actualSize) - parseInt(b.actualSize);
    });
    fList.sort((a, b) => {
      return parseInt(a.size) - parseInt(b.size);
    });
  };
  const sorter = () => {
    if (sortedBy === "Name") {
      sortByName(sortedFolders);
      sortByName(sortedFiles);
    } else if (sortedBy === "Size") {
      sortBySize(sortedFolders);
      sortBySize(sortedFiles);
    } else {
      sortByModified(sortedFolders);
      sortByModified(sortedFiles);
    }
    if (!sortAscending) {
      sortedFiles.reverse();
      sortedFolders.reverse();
    }
  };
  sorter();
  return (
    // <div className='container mt-4'>
    // <Row className="g-4 px-4 mx-auto" style={{justifyContent:"left"}}>
    //   {Array.from({ length: 10 }).map((_, idx) => (
    //     <Col key={idx}>
    //       <CardItem/>
    //       </Col>))}
    // </Row>
    // </div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // paddingLeft:'85px',
        // paddingRight:'100px'
      }}
    >
      <div className="container m-4">
        <div
          className="row row-cols-1 row-cols-md-2
                    row-cols-lg-4 g-4"
        >
          {sortedFolders.map((_, idx) => (
            <div
              className="col"
              key={idx}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CardItem
                fName={_.fName}
                isFolder={true}
                size={_.actualSize}
                modified={_.mtime}
                selected={allSelected}
                showOptions={showOptions}
              />
            </div>
          ))}
          {sortedFiles.map((_, idx) => (
            <div
              className="col"
              key={idx}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <CardItem
                fName={_.fName}
                isFolder={false}
                size={_.size}
                modified={_.mtime}
                selected={allSelected}
                showOptions={showOptions}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
