import React from 'react'
import Card from '../components/Card'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { useGetTopPlaylistsQuery } from '../redux/services/spotifyCore'
import { useState } from 'react'

function DashboardContainer() {
  const { data, isFetching, error } = useGetTopPlaylistsQuery()
  const [expanded, setExpanded] = useState(false)

  if (isFetching) return <Loader title="loading..." />

  if (error) return <Error title="error" />

  console.log(data)
  return (
    <div style={{ width: "inherit", padding: "2vh 5vw" }}>
      <div className="title-container">
        <h2>Trending</h2>
        <button onClick={() => setExpanded(!expanded)}>{expanded ? "hide" : "see all"}</button>
      </div>

      <div className="cards-container">
        {expanded ? data["playlists"]["items"].map((item, i) => (<Card key={item.id} item={item} index={i} />)) : data["playlists"]["items"].slice(0, 4).map((item, i) => (<Card key={item.id} item={item} index={i} />))}
      </div>
    </div>
  )
}

export default DashboardContainer
