import React from 'react'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PlayPause from './PlayPause'
import { playPause, setActiveSong } from '../redux/features/playerSlice'

function Card(item, i) {
  console.log(item["item"]["data"]["images"]["items"][0]["sources"][0]["url"])
  console.log(item["item"]["data"]["name"])
  return (
    <div style={{background: "rgba(0,0,0,0.5)", display: "flex", "flex-direction": "column", "align-items": "center", "padding-top": "10px"}}>
      <div>
    </div>
    <img style={{width:"10vw", height: "1"}} src={item["item"]["data"]["images"]["items"][0]["sources"][0]["url"]}></img>
      <Link><h4>{item["item"]["data"]["name"]}</h4></Link>
    </div>
    
  )
}

export default Card