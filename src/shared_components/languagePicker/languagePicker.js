// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { LitElement, html, css, unsafeCSS } from 'lit-element';
import style from './languagePicker.scss';

import flagIt from '../assets/flags/flag_it.svg';
import flagDe from '../assets/flags/flag_de.svg';
import flagEn from '../assets/flags/flag_en.svg';

const DEFAULT_LANGUAGES = {
  EN: 'en',
  DE: 'de',
  IT: 'it'
};

export class LanguagePicker extends LitElement {
  constructor() {
    super();

    this.isOpen = false;
    this.supportedLanguages = DEFAULT_LANGUAGES;
    this.language = DEFAULT_LANGUAGES.EN;
    this.changeLanguageAction = () => {};
  }

  static get styles() {
    return css`
      ${unsafeCSS(style)}
    `;
  }

  static get properties() {
    return {
      supportedLanguages: { type: Object },
      language: { type: String },
      changeLanguageAction: { type: Function },
      isOpen: { type: Boolean }
    };
  }

  handleInsideClick = (e) => {
    e.stopPropagation();
  };

  handleOutsideClick = (e) => {
    this.isOpen = false;
  };

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.addEventListener('click', this.handleInsideClick);
    document.addEventListener('click', this.handleOutsideClick);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.handleInsideClick);
    document.removeEventListener('click', this.handleOutsideClick);
    super.disconnectedCallback();
  }

  render() {
    const mapLanguageToFlag = {
      [this.supportedLanguages.IT]: flagIt,
      [this.supportedLanguages.DE]: flagDe,
      [this.supportedLanguages.EN]: flagEn
    };

    return html`<div class="languagePicker">
      <div class="languagePicker__trigger">
        <button
          type="button"
          class="languagePicker__flag"
          aria-label="Change language"
          @click="${() => {
            this.isOpen = !this.isOpen;
          }}"
        >
          <img src="${mapLanguageToFlag[this.language]}" alt="" />
        </button>
      </div>
      ${this.isOpen
        ? html` <div class="languagePicker__menu">
            <div
              class="languagePicker__menu__element"
              @click=${() => this.selectLanguage(this.supportedLanguages.IT)}
            >
              <img src=${flagIt} alt="italiano" />
              ${this.supportedLanguages.IT.toUpperCase()}
            </div>
            <div
              class="languagePicker__menu__element"
              @click=${() => this.selectLanguage(this.supportedLanguages.DE)}
            >
              <img src=${flagDe} alt="deutsch" />
              ${this.supportedLanguages.DE.toUpperCase()}
            </div>
            <div
              class="languagePicker__menu__element"
              @click=${() => this.selectLanguage(this.supportedLanguages.EN)}
            >
              <img src=${flagEn} alt="english" />
              ${this.supportedLanguages.EN.toUpperCase()}
            </div>
          </div>`
        : ''}
    </div>`;
  }

  selectLanguage(language) {
    this.isOpen = false;
    if (typeof this.changeLanguageAction === 'function') {
      this.changeLanguageAction(language);
    }
    this.dispatchEvent(
      new CustomEvent('language-change', {
        detail: { language },
        bubbles: true,
        composed: true
      })
    );
  }
}

customElements.get('wc-languagepicker') || customElements.define('wc-languagepicker', LanguagePicker);
