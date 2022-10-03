import React, { Component } from 'react';
import { VscGithubAlt } from 'react-icons/vsc';
import { AiOutlineLinkedin } from 'react-icons/ai';

import '../styles/footer.css';

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <section className='footer-logo'>
          <span>
            Machado
            <strong>Wallet</strong>
          </span>
        </section>
        <section className='social'>
          <p>Guilherme Machado</p>
          <article>
            <a href="https://www.linkedin.com/in/machadodev/"
              target="_blank" rel="noreferrer">
              <AiOutlineLinkedin className='linkedin' />
            </a>
            <a href="https://github.com/machadofguilherme"
              target="_blank" rel="noreferrer">
              <VscGithubAlt className='github' />
            </a>
          </article>
        </section>
      </footer>
    )
  }
}
