import{n as e,w as t,b as i,r,p as o,y as s}from"./23843b75.js";import{S as l}from"./78af3006.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n,a;class c extends e{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=t(i,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!1)}render(){return i}}c.finalized=!0,c._$litElement$=!0,null===(n=globalThis.litElementHydrateSupport)||void 0===n||n.call(globalThis,{LitElement:c});const d=globalThis.litElementPolyfillSupport;null==d||d({LitElement:c}),(null!==(a=globalThis.litElementVersions)&&void 0!==a?a:globalThis.litElementVersions=[]).push("3.0.1");
/**
 * Copyright 2020 The Pennsylvania State University
 * @license Apache-2.0, see License.md for full text.
 */
const h=function(e){return class extends e{static get styles(){return[super.styles||[],r`:host{display:inline-flex;align-items:center;justify-content:center;position:relative;vertical-align:middle;height:var(--simple-icon-height,24px);width:var(--simple-icon-width,24px);color:var(--simple-icon-color,currentColor)}:host([dir=rtl]) svg{direction:rtl}:host([hidden]){display:none}#svg-polyfill{background-color:var(--simple-icon-color,currentColor);height:var(--simple-icon-height,24px);width:var(--simple-icon-width,24px)}svg{height:var(--simple-icon-height,24px);width:var(--simple-icon-width,24px);max-height:var(--simple-icon-height,24px);max-width:var(--simple-icon-width,24px);filter:var(--simple-icon-color, initial);pointer-events:none}feFlood{flood-color:var(--simple-icon-color,currentColor)}`]}render(){return this.useSafariPolyfill?o` <div id="svg-polyfill" style="mask:${this.safariMask};-webkit-mask:${this.safariMask}"></div> `:s`
        <svg xmlns="http://www.w3.org/2000/svg" part="simple-icon-svg" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
          <filter
            color-interpolation-filters="sRGB"
            x="0"
            y="0"
            height="24px"
            width="24px"
          >
            ${this.feFlood}
            <feComposite operator="in" in="COLOR" in2="SourceAlpha" />
          </filter>
          <image
            xlink:href=""
            width="24px"
            height="24px"
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
          ></image>
        </svg>
      `}get feFlood(){return this.noColorize?"":s`<feFlood result="COLOR"/>`}static get properties(){return{...super.properties,dir:{type:String,reflect:!0},src:{type:String},noColorize:{type:Boolean,attribute:"no-colorize"},icon:{type:String,attribute:"icon",reflect:!0}}}constructor(){super(),this.noColorize=!1,this.dir=this.documentDir}get documentDir(){return document.body.getAttribute("xml:dir")||document.body.getAttribute("dir")||document.documentElement.getAttribute("xml:dir")||document.documentElement.getAttribute("dir")||"ltr"}get useSafariPolyfill(){return navigator.userAgent.indexOf("Safari")>-1}get safariMask(){return this.src&&this.useSafariPolyfill?`url(${this.src}) no-repeat center / contain`:""}firstUpdated(e){if(super.firstUpdated&&super.firstUpdated(e),this.useSafariPolyfill)return;const t="f-"+Math.random().toString().slice(2,10);this.shadowRoot.querySelector("image").style.filter=`url(#${t})`,this.shadowRoot.querySelector("filter").setAttribute("id",t)}setSrcByIcon(e){return this.src=l.getIcon(this.icon,e),this.src}updated(e){super.updated&&super.updated(e),e.forEach(((e,t)=>{"icon"===t&&(this[t]?this.setSrcByIcon(this):this.src=null),"src"===t&&this[t]&&!this.useSafariPolyfill&&this.shadowRoot.querySelector("image").setAttribute("xlink:href",`${this[t]}`)}))}}};class p extends(h(c)){static get tag(){return"simple-icon-lite"}}customElements.define(p.tag,p);export{h as SimpleIconBehaviors,p as SimpleIconLite};
