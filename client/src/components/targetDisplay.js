import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

const Display = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [player, setPlayer] = useState({})

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/survive`, { name: params.name })
      .then((res) => {
        console.log(res)
        setPlayer({
          name: res.data[0].name,
          target: res.data[0].target,
          assassin: res.data[0].assassin,
          alive: res.data[0].alive,
          winner: res.data[0].winner,
          tagged: res.data[0].tagged
        })
      })
      .catch((err, res) => {
        //res.send(`Error: ${err}`)
        console.log(err)
      })
  }, [params])
  const updateTarget = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/survive/tag`, {name:player.target})
  }
  const confirmDeath = () => {
    axios
      .patch(`${process.env.REACT_APP_API_URL}/survive/kill`, { name: params.name })
      .then((res) => {
        setPlayer({
          name: res.data[0].name,
          target: res.data[0].target,
          assassin: res.data[0].assassin,
          alive: res.data[0].alive,
          winner: res.data[0].winner,
          tagged: false
        })
        navigate(`/${params.assasin}`)
      })
      .catch((err, res) => {
        res.send(`Error: ${err}`)
      })
  }

  const displayText = () => {
    if (params.name !== player.target) {
      return `Target: ${player.target}`
    } else {
      return `Congratulations, ${params.name}! You are the final survivor.`
    }
  }

  return (
    <div className='TargetDisplay'>
      <div >
        {/*
      {player.alive === true ? (
        <>
          <h1 className='displayText'>{displayText()}</h1>
          {(player.winner === false && player.tagged===false) ? (
            <button className='KillButton' onClick={updateTarget}>
            <h1 className='displayText'> {"Confirm kill"} </h1>
            </button>
            ) : (<button className='confirm-button'onClick={confirmDeath}>Confirm Death</button>)
          }
        </>
        ) : <h1 className='displayText'>You have been assassinated!</h1>}*/}
        {player.alive === true ? (
  <>
    <h1 className='displayText'>{displayText()}</h1>
    {player.winner === false && player.tagged === true ? (
      <button className='confirm-button' onClick={confirmDeath}>Confirm Death</button>
    ) : null}
    {player.winner === false && player.tagged === false ? (
      <button className='KillButton' onClick={updateTarget}>
        <h1 className='displayText'> {"Confirm kill"} </h1>
      </button>
    ) : null}
  </>
) : <h1 className='displayText'>You have been assassinated!</h1>}

      </div>

      <br></br>

      

    </div>
  )
}

export default Display;