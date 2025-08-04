import React from 'react'
import './About.css'

function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About iNotebook</h1>
      <div className="about-content">
        <p className="about-description">
          iNotebook is your personal note-taking application that offers a
          seamless, user-friendly experience. With an intuitive design, it
          allows you to securely store and organize your notes with ease.
        </p>
        <p className="about-description">
          <strong>Functionality Highlights:</strong> Enjoy an encrypted note-taking
          experience that ensures your data is accessible only to you. Whether
          you're planning a project, managing tasks, or writing down important
          ideas, iNotebook makes it simple and secure.
        </p>
        <p className="about-description">
          Our platform is built for your privacy. Each note you create is
          encrypted and securely stored, ensuring that no one but you can
          access it.
        </p>
        <p className="about-description">
          <strong>Want to suggest improvements?</strong> We value your feedback!
          iNotebook is an entry-level app, and we are continuously improving it.
          Feel free to suggest new features or improvements by visiting our <a
            href="https://github.com/your-repo-link"
            className="github-link"
            target="_blank"
            rel="noopener noreferrer"
          >
          GitHub page
          </a>.
          
        </p>
      </div>
    </div>
  )
}

export default About
