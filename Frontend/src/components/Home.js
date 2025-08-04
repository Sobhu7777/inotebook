import React from 'react'
import './Home.css'
import AddNote from './AddNote'
import RecentNotes from './RecentNotes'
function Home() {
  return (
    <div className="container ">
      <AddNote/>
      <RecentNotes/>
  </div>
  )
}

export default Home