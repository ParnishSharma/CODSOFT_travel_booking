import React from 'react'
import { Link } from 'react-router-dom'
import'../App.css'

function Body() {
  return (
    <div
      style={{
        margin:'20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
      }}

    >
    <i class="far fa-circle-check fa-2x m-2 fa-animation-shake"></i>
      <h1
        style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '20px',
        }}
      >
        FLIGHT HAS BEEN BOOKED SUCCESSFULLY
      </h1>
      <Link
        to="/"
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '6px',
          fontSize: '20px',
          overflowY:'hidden'
        }}
      >
        Return To Home
      </Link>
    </div>
  )
}

export default Body
