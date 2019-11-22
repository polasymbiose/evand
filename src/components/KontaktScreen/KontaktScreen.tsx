import axios from 'axios'
import React, { useState } from 'react'
import './kontakt.scss'

const KontaktScreen = () => {
  const API_PATH = '/index.php'
  const [kontakt, setKontakt] = useState({
    name: '',
    email: '',
    message: '',
    mailSent: false,
    error: false
  })

  const handleFormSubmit = (e: any) => {
    e.preventDefault()
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' },
      data: kontakt
    })
    .then(result => {
        setKontakt({
          ...kontakt,
          mailSent: true,
          error: false
        })
      })
      .catch(() =>{
        setKontakt({
          ...kontakt,
          error: true,
          mailSent: false
        })
      }
      )
  }

  return (
    <div className="kontakt">
      <div>
        <form action="/action_page.php">
          <label>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Dein Name..."
            onChange={e => setKontakt({ ...kontakt, name: e.target.value })}
          />
          <label>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Deine Email..."
            onChange={e => setKontakt({ ...kontakt, email: e.target.value })}
          />

          <label>Nachricht</label>
          <textarea
            id="subject"
            name="subject"
            placeholder="Deine Nachricht ..."
            rows={6}
            onChange={e => setKontakt({ ...kontakt, message: e.target.value })}
          />
          <input type="submit" value="Submit" onClick={e => !kontakt.error && handleFormSubmit(e)} />
          <div>
            {kontakt.mailSent && <p>Danke für deine Nachricht</p>}
            {kontakt.error && <p>Da ist etwas schief gelaufen. Versuche es nochmal</p>}
          </div>
        </form>
      </div>
    </div>
  )
}

export default KontaktScreen
