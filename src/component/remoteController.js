import React from 'react'

function RemoteController() {
    const MoveForward = () =>{}
    const MoveLeft = () =>{}
    const MoveRight = () =>{}
    const MoveBack = () =>{}
    const Stop = () =>{}
  return (<>
  <h1> Rover Mars Remote Controller</h1>
 <div className="d-grid" style={{ gridTemplateColumns: "repeat(3, auto)", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
      <div></div>
      <button className="btn btn-primary btn-sm" onClick={MoveForward}>Forward</button>
      <div></div>
      <button className="btn btn-secondary btn-sm" onClick={MoveLeft}>Left</button>
      <button className="btn btn-danger btn-sm" onClick={Stop}>Stop</button>
      <button className="btn btn-secondary btn-sm" onClick={MoveRight}>Right</button>
      <div></div> 
      <button className="btn btn-primary btn-sm" onClick={MoveBack}>Back</button>
      <div></div>
    </div>
  </>
   
  )
}

export default RemoteController