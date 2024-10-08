import { LitElement, html, css } from 'lit';

export class MyCard extends LitElement {
  static get tag() {
    return 'my-card';
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      imgSrc: { type: String },
      adText: { type: String },
      link: { type: String },
      fancy: { type: Boolean, reflect: true },
      selectedAnswers: { type: Array }, 
      feedback: { type: String } 
    };
  }

  constructor() {
    super();
    this.title = 'Hax the Web with your Skills';
    this.description = 'Join our HaxTheWeb club to hack and code the web!';
    this.imgSrc = 'https://miro.medium.com/v2/resize:fit:1280/0*ngAthWxOvKZHvsw9';
    this.adText = 'Join Today';
    this.link = 'https://hax.psu.edu';
    this.fancy = false;
    this.selectedAnswers = []; 
    this.feedback = ''; 
  }

  static get styles() {
    return css`
      :host {
        display: block;
        margin: 16px;
      }
      :host([fancy]) {
        background-color: pink;
        border: 2px solid fuchsia;
        box-shadow: 10px 5px 5px red;
      }
      .card {
        width: 100%;
        max-width: 360px;
        border-radius: 16px;
        background-color: white;
        border: 1px solid #ccc;
        padding: 16px;
        text-align: center;
      }
      .card__head {
        margin: 0;
        font-size: 24px;
        color: black;
      }
      .card__descr {
        font-size: 20px;
        color: black;
        margin: 16px 0;
      }
      .card__img {
        width: 100%;
        max-width: 280px;
        height: auto; 
        max-height: 200px;
        border-radius: 8px;
        object-fit: cover;
      }
      .card__ad {
        color: black;
        font-size: 16px;
      }
      .card__apply {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: navy;
        border: none;
        border-radius: 16px;
        margin: 16px 0;
        padding: 12px 24px;
        text-align: center;
      }
      .card__apply a {
        color: white;
        text-decoration: none;
        font-size: 16px;
      }
      .card__apply:hover {
        background-color: darkblue;
      }
      .multiple-choice {
        text-align: left;
        margin-top: 16px;
      }
      .feedback {
        font-weight: bold;
        color: green;
        margin-top: 10px;
      }
      .feedback.incorrect {
        color: red;
      }
      button {
        display: inline-block;
        margin-top: 16px;
        padding: 10px 20px;
        background-color: navy;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }
      button:hover {
        background-color: darkblue;
      }
    `;
  }

  handleSelection(e) {
    const value = e.target.value;
    if (e.target.checked) {
      this.selectedAnswers = [...this.selectedAnswers, value]; 
    } else {
      this.selectedAnswers = this.selectedAnswers.filter(ans => ans !== value); 
    }
  }

  checkAnswer() {
    const correctAnswers = ['Genji']; 
    const isCorrect = this.selectedAnswers.length === correctAnswers.length &&
                      this.selectedAnswers.every(ans => correctAnswers.includes(ans));

    this.feedback = isCorrect ? "HES HIM" : "Nah"; 
  }

  render() {
    return html`
      <div class="card">
        <h1 class="card__head">${this.title}</h1>
         <details ?open="${this.fancy}" @toggle="${this.openChanged}">
          <summary> Hack the web and come on down to our free classes.</summary>
          <div>
            <slot>${this.description}</slot>
          </div>
          <button class="card__apply">
            <a href="${this.link}" class="card__link">Details</a>
          </button>
          <div class="multiple-choice">
            <p>Whos the best hero?</p>
            <label>
              <input type="checkbox" value="Reaper" @change="${this.handleSelection}"> Reaper
            </label>
            <br />
            <label>
              <input type="checkbox" value="Genji" @change="${this.handleSelection}"> Genji
            </label>
            <br />
            <label>
              <input type="checkbox" value="Dva" @change="${this.handleSelection}"> Dva
            </label>
            <br />
            <label>
              <input type="checkbox" value="Some Guy" @change="${this.handleSelection}"> Some Guy
            </label>
            <br />
            <button @click="${this.checkAnswer}">Check Answer</button>
            <div class="feedback ${this.feedback.includes('Incorrect') ? 'incorrect' : ''}">
              ${this.feedback}
            </div>
          </div>
        </details>
        <img class="card__img" src="${this.imgSrc}" alt="Card Image">
        <p class="card__ad">${this.adText}</p>
      </div>
    `;
  }

  openChanged(e) {
    this.fancy = e.target.open;
  }
}

customElements.define(MyCard.tag, MyCard);

