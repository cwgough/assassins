import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

const Display = () => {
  const params = useParams()
  const navigate = useNavigate()
  console.log(params.name)
  const [player, setPlayer] = useState({})

  useEffect(() => {
    axios
      .post('http://localhost:8000/survive', { name: params.name })
      .then((res) => {
        setPlayer({
          name: res.data[0].name,
          target: res.data[0].target,
          assassin: res.data[0].assassin,
          alive: res.data[0].alive,
          winner: res.data[0].winner
        })
      })
      .catch((err, res) => {
        res.send(`Error: ${err}`)
      })
  }, [params])

  const killTarget = () => {
    axios
      .patch('http://localhost:8000/survive/kill', { name: player.target })
      .then((res) => {
        setPlayer({
          name: res.data[0].name,
          target: res.data[0].target,
          assassin: res.data[0].assassin,
          alive: res.data[0].alive,
          winner: res.data[0].winner
        })
        navigate(`/${params.name}`)
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
        {player.alive===true ? (        <h1 className='displayText' > {displayText()} </h1>
): <h1 className='displayText'>You have been assassinated!</h1> }
      </div>

      <br></br>

      {(player.alive === true && player.winner === false) ? (
        <button className='KillButton' onClick={killTarget}>
          <h1 className='displayText'> {"Confirm kill"} </h1>
        </button>
      ) : null
      }

    </div>
  )
}

export default Display;