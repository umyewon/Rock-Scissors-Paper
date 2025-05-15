import React from 'react'

const Box = (props) => {
  //console.log("props : " , props)
 
  return (
    <div>
      {/* <div className="box"> */}
      <div className={`box` + (' box-' + props.result)}>
          <h1>{props.title}</h1>
          {props.item ? <img className="item-img" 
            // 최초 로딩 시 클릭된 값이 없으므로 item이 null이라 방어코딩
            src={props.item.img}/>  : <p className="item-img" ></p>} 
          <h2>{props.result}</h2>
      </div>
    </div>
  )
}

export default Box