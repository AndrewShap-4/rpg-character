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
    };
  }

  constructor() {
    super();
    this.characterDesign = {
      base: 0,
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      size: 200,
      haircolor: 0,
    };
    this.seed = "00000000"; 
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          text-align: center;
          background-color: var(--ddd-theme-default-white);
        }

        .character-container {
          position: fixed;
          margin: var(--ddd-spacing-8px);
          left: 250px;
        }

        .controls-container {
          position: fixed;
          flex-direction: column;
          gap: 10px;
          padding: var(--ddd-spacing-4);
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: var(--ddd-theme-default-white);
          right: 75px;
        }

        .seed-text {
          font-size: 30px;
          font-family: Arial, Helvetica, sans-serif;
        }

        .slider-container {
          display: flex;
          flex-direction: column;
          align-items: flex-start; /* Aligns labels and sliders to the left */
          margin-bottom: 10px; /* Adds spacing between sliders */
        }


      `,
    ];
  }

  render() {
    return html`
    <div class="character-container">
      <div class="seed-text">
        <p>Seed: ${this.seed}</p>
      </div>

        <rpg-character
          style="width: ${this.characterDesign.size}px; height: ${this.characterDesign.size}px;"
          base="${this.characterDesign.base}"
          face="${this.characterDesign.face}"
          faceitem="${this.characterDesign.faceitem}"
          hair="${this.characterDesign.hair}"
          pants="${this.characterDesign.pants}"
          shirt="${this.characterDesign.shirt}"
          skin="${this.characterDesign.skin}"
          haircolor="${this.characterDesign.haircolor}"
        ></rpg-character>
      </div>

      <div class="controls-container">
        ${this._Checkbox("Show Hair", "base", 0, 1)}
        ${this._Slider("Face", "face", 0, 5)}
        ${this._Slider("Face Item", "faceitem", 0, 9)}
        ${this._Slider("Pants", "pants", 0, 9)}
        ${this._Slider("Shirt", "shirt", 0, 9)}
        ${this._Slider("Skin", "skin", 0, 9)}
        ${this._Slider("Size", "size", 100, 600)}
        ${this._Slider("Hair Color", "hair", 0, 9)}
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


  _Checkbox(label, property) {
    return html`
      <div class="checkbox-container">
        <label>${label}: </label>
        <wired-checkbox
          type="checkbox"
          ?checked="${this.characterDesign.base == 1}"
          @change="${(e) => this._toggleProperty(property, e.target.checked ? 1 : 0)}"
        ></wired-checkbox>
      </div>
    `;
  }


  _toggleProperty(property, checked) {
    this.characterDesign = {
      ...this.characterDesign, [property]: checked  
    };
    this._updateSeed();
    this.requestUpdate();
  }

  _updateCharacter(property, value) {
    this.characterDesign = { 
      ...this.characterDesign, 
      [property]: property === "size" ? parseInt(value, 10) : parseInt(value, 10) 
    };
    this._updateSeed();
  }

  _updateSeed() {
    const {
      base,
      face,
      faceitem,
      hair,
      pants,
      shirt,
      skin,
      size,
    } = this.characterDesign;
    this.seed = `${base}${face}${faceitem}${hair}${pants}${shirt}${skin}${size}`;
  }

}

globalThis.customElements.define(RPGMeElement.tag, RPGMeElement);
