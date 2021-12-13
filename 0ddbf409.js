import{s as t,r as e,p as i}from"./a52640d6.js";import"./2bf2e7e3.js";import"./20aa081b.js";import"./78af3006.js";class r extends t{static get tag(){return"image-prompt"}static get styles(){return e`
      :host {
        display: block;
        width: 320px;
        height: 265px;
      }

      img {
        display: flex;
        margin: 25px auto auto;
        height: 200px;
        width: 275px;
        border: 5px solid white;
        border-radius: 19px;
        box-shadow: 0 0 10px black;
      }

      .backgroundbox {
        display: flex;
        background-color: var(--simple-colors-default-theme-blue-11);
        color: var(
          --simple-colors-default-theme-accent-3
        ); // Not sure where these are appearing
        border: 1px var(--simple-colors-default-theme-accent-6);
        border-radius: 19px 19px 0 0;
        height: 265px;
        width: 320px;
      }

      .overlay {
        position: relative;
      }

      .overlay::before {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        border: 1px;
        border-radius: 19px 19px 0px 0px;
      }

      simple-icon-lite {
        --simple-icon-height: 100px;
        --simple-icon-width: 100px;
        color: white;
        transform: translate(-50%, -190%);
        top: 50%;
        left: 50%;
        z-index: 100;
      }

      :host([status='pending']) .overlay::before {
        display: flex;
        background: transparent;
      }

      :host([status='correct']) .overlay::before {
        display: flex;
        background: green;
        filter: opacity(0.65);
      }

      :host([status='incorrect']) .overlay::before {
        display: flex;
        background: red;
        filter: opacity(0.65);
      }
    `}constructor(){super(),void 0===this.imgSrc?(this.imgSrc="grey box",this.imgTag=`https://loremflickr.com/320/240/${this.imgSrc}`):this.imgTag=this.imgSrc,this.status="pending",this.answerIcon=!1,this.icon=""}static get properties(){return{...super.properties,imgSrc:{type:String,reflect:!0,attribute:"img-src"},imgTag:{type:String},status:{type:String,reflect:!0},answerIcon:{type:Boolean,reflect:!0},icon:{type:String}}}updated(t){t.forEach(((t,e)=>{"status"===e&&"correct"===this[e]&&(this.answerIcon=!0,this.icon="check"),"status"===e&&"incorrect"===this[e]&&(this.answerIcon=!0,this.icon="cancel"),"status"===e&&"pending"===this[e]&&(this.answerIcon=!1)}))}firstUpdated(t){super.firstUpdated&&super.firstUpdated(t),console.log(this.imgSrc),this.imgSrc.includes("http")?this.imgTag=this.imgSrc:(console.log("hit"),this.imgTag=`https://loremflickr.com/320/240/${this.imgSrc}`)}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}render(){return i` <div> <div class="overlay"> <div class="backgroundbox"> <img src="${this.imgTag}" alt="default img"> </div> </div> ${this.answerIcon?i`<simple-icon-lite icon="${this.icon}"></simple-icon-lite>`:""} </div> `}static get haxProperties(){return new URL("../lib/FlashCard.haxProperties.json",import.meta.url).href}}customElements.define(r.tag,r);export{r as promptImg};