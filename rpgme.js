/**
 * Copyright 2024 AndrewShap-4
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

/**
 * `rpg-character`
 * 
 * @demo index.html
 * @element rpg-character
 */
export class RPGMeElement extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "rpgme-element";
  }

  static get properties() {
    return {
      characterDesign: { type: Object },
      seed: { type: String, attribute: "seed" },
      name: { type: String },
    };
  }

  constructor() {
    super();
    this.characterDesign = {
      base: 0,
      hair: 0,
      face: 0,
      faceitem: 0,
      accessories: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      size: 200,
      fire: 0,
      walking: 0,
      hatcolor: 0,
    };
    this.seed = "000000000"; 
    this.name = "";
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          background-color: var(--ddd-theme-default-navy40);
          min-height: 100vh;
          padding: var(--ddd-spacing-5, 20px);
          box-sizing: border-box;
        }

        h1 {
          text-align: center;
          font-size: 2em;
          font-family: Arial, Helvetica, sans-serif;
        }
  
        .container {
          display: flex; 
          justify-content: center; 
          align-items: flex-start; 
          gap: 40px; 
          max-width: 1200px; 
          margin: 0 auto; 
        }
  
        .character-container {
          flex: 1; 
          text-align: center;
        }
  
        .controls-container {
          flex: 1; 
          display: flex;
          flex-direction: column;
          gap: 15px;
          background-color: var(--ddd-theme-default-white);
          padding: var(--ddd-spacing-5, 20px);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          border-radius: var(--ddd-radius-lg);
        }
  
        .seed-text {
          font-size: 1.5em;
          font-family: Arial, Helvetica, sans-serif;
          margin-bottom: 10px;
        }

        .name {
          font-size: 1.5em;
          font-family: Arial, Helvetica, sans-serif;
          padding: 50px;
        }

        .name-input {
          width: 190px;
          box-sizing: border-box;
          align-items: center;
        }
  
        .slider-container,
        .checkbox-container {
          display: flex;
          padding: var(--ddd-spacing-1, 2px);
        }

        .generate-button button {
          background-color: var(--ddd-theme-default-wonderPurple);
          border: var(--ddd-border-md);
          border-color: var(--ddd-theme-default-coalyGray);
          cursor: pointer;
          font-size: 1em;
          color: var(--ddd-theme-default-white);
        }

        .top-controls {
          display: flex;
          align-items: center;
        }

      `,
    ];
  }
  
  

  render() {
    return html`
    <h1>Create your Character!</h1>
      <div class="container">
        <div class="character-container">
          <div class="seed-text">
            <p>Seed: ${this.seed}</p>
          </div>
          <rpg-character
            style="width: ${this.characterDesign.size}px; height: ${this.characterDesign.size}px;"
            base="${this.characterDesign.base}"
            face="${this.characterDesign.face}"
            faceitem="${this.characterDesign.faceitem}"
            accessories="${this.characterDesign.accessories}"
            hair="${this.characterDesign.hair}"
            hatcolor="${this.characterDesign.hatcolor}"
            pants="${this.characterDesign.pants}"
            shirt="${this.characterDesign.shirt}"
            skin="${this.characterDesign.skin}"
            .fire="${this.characterDesign.fire}"
            .walking="${this.characterDesign.walking}"
          ></rpg-character>

          <div class="name"><p>Name: ${this.name}</p></div>

        </div>
  
        <div class="controls-container">
          <div class= "top-controls">
          ${this._Name()}
          ${this._Checkbox("Show Hair", "base")}
          ${this._Checkbox("On Fire?", "fire")}
          ${this._Checkbox("Walking?", "walking")}
          </div>
          ${this._Slider("Face", "face", 0, 5)}
          ${this._Slider("Face Item", "faceitem", 0, 9)}
          ${this._Slider("Accessories", "accessories", 0, 9)}
          ${this._Slider("Pants", "pants", 0, 9)}
          ${this._Slider("Shirt", "shirt", 0, 9)}
          ${this._Slider("Skin", "skin", 0, 9)}
          ${this._Slider("Size", "size", 100, 500)}
          ${this._Slider("Hair Color", "hair", 0, 9)}
          ${this._Slider("Hat Color", "hatcolor", 0, 9)}
          <div class="generate-button"><button @click="${this._button}">Share Your Character!</button></div>
      </div>
    </div>
    `;
  }
  

  _Slider(label, property, min, max) {
    return html`
      <div class="slider-container">
        <label>${label}: </label>
        <wired-slider
          min="${min}"
          max="${max}"
          step="1"
          value="${this.characterDesign[property]}"
          @change="${(e) => this._updateCharacter(property, e.target.value)}"
        ></wired-slider>
      </div>
    `;
  }

  _Name() {
    return html`
      <div class="name">
        <wired-input
          id="input" 
          class="name-input" 
          placeholder="Enter Name" 
          .value="${this.name}" 
          @input="${this._onInputChange}"
        ></wired-input>
      </div>
    `;
  }


  _Checkbox(label, property) {
    return html`
      <div class="checkbox-container">
        <label>${label}: </label>
        <wired-checkbox
          type="checkbox"
          ?checked="${this.characterDesign[property] == 1}"
          @change="${(e) => this._toggleProperty(property, e.target.checked ? 1 : 0)}"
        ></wired-checkbox>
      </div>
    `;
  }


  _toggleProperty(property, checked) {
    this.characterDesign = {
      ...this.characterDesign, [property]: checked ? 1 : 0, 
    };
    this._updateSeed();
    this.requestUpdate();
  }

  _updateCharacter(property, value) {
    this.characterDesign = { 
      ...this.characterDesign, 
      [property]: parseInt(value, 10) 
    };
    this._updateSeed();
  }

  _onInputChange(e) {
    this.name = e.target.value; 
    this.requestUpdate();
  }

  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);
    const seed = params.get("seed");
    if (seed && seed.length === 10) {
      this._applySeed(seed);
    }
  }
  
  _applySeed(seed) {
    const keys = ["base", "face", "faceitem", "pants", "shirt", "skin", "accessories", "hatcolor", "hair"];
    const values = seed.split("").map(Number);
    const newDesign = keys.reduce((design, key, index) => {
      design[key] = values[index] || 0; 
      return design;
    }, {});
    this.characterDesign = { ...this.characterDesign, ...newDesign };
    this.seed = seed;
  }
  
  _button() {
    const params = new URLSearchParams({
      seed: this.seed,
    });
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert(`Link copied to clipboard: ${shareUrl}`);
    });
  }
  
  

  _updateSeed() {
    const {
      base,
      face,
      faceitem,
      pants,
      shirt,
      skin,
      accessories,
      hatcolor,
      hair,
    } = this.characterDesign;
    this.seed = `${base}${face}${faceitem}${pants}${shirt}${skin}${accessories}${hatcolor}${hair}`;
    this._updateUrl();
  }

  _updateUrl() {
    const params = new URLSearchParams(window.location.search);
    params.set("seed", this.seed);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
  }

}

globalThis.customElements.define(RPGMeElement.tag, RPGMeElement);
