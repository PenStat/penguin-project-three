import{s as r,r as t,p as e}from"./883f4d93.js";class i extends r{static get tag(){return"image-prompt"}static get styles(){return t`:host{display:block}:host([correct]){display:block;color:red;opacity:.5}img{display:flex;margin:auto;margin-top:30px;height:200px;width:275px;border:5px solid #fff;border-radius:19px;box-shadow:0 0 10px #000}.backgroundbox{display:flex;background-color:#dceeff;color:#dceeff;border:1px #dceeff;border-radius:19px 19px 0 0;height:300px}`}constructor(){super(),this.imgSrc="grey box",this.imgTag=`https://loremflickr.com/320/240/${this.imgSrc}`}static get properties(){return{...super.properties,imgSrc:{type:String,reflect:!0,attribute:"img-src"},imgTag:{type:String},correct:{type:Boolean,reflect:!0}}}updated(r){r.forEach(((r,t)=>{"correct"===t&&"joy"===this[t]&&this.classList.add("joyful")}))}firstUpdated(r){super.firstUpdated&&super.firstUpdated(r),this.imgTag=`https://loremflickr.com/320/240/${this.imgSrc}`}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}render(){return e` <div class="backgroundbox"> <img src="${this.imgTag}" alt="default img"> </div> `}static get haxProperties(){return new URL("../lib/FlashCard.haxProperties.json",import.meta.url).href}}customElements.define(i.tag,i);export{i as promptImg};