import React from 'react'

const ContentItem = () => {
  return (
    <div style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        paddingRight: "80px",
        paddingLeft: "50px",
      }}>
      <input type="checkbox"/>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          // paddingRight: "00px",
          paddingLeft: "10px",
        }}
      >
  
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>Name</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>Size</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>Modified</div>
        </div>
        <div></div>
      </div>
      </div>
  )
}

export default ContentItem
