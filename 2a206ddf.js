import{s as e,r as t,p as i}from"./14085c5d.js";class r extends e{static get tag(){return"image-prompt"}static get styles(){return t`:host{display:block;width:320px;height:265px}img{display:flex;margin:25px auto auto;height:200px;width:275px;border:5px solid #fff;border-radius:19px;box-shadow:0 0 10px #000}.backgroundbox{display:flex;background-color:var(--simple-colors-default-theme-accent-4);border-radius:19px 19px 0 0;height:265px;width:320px}.overlay{position:relative}.overlay::before{content:'';width:100%;height:100%;position:absolute;border:1px;border-radius:19px 19px 0 0}simple-icon-lite{--simple-icon-height:100px;--simple-icon-width:100px;color:#fff;transform:translate(-50%,-190%);top:50%;left:50%;z-index:100}:host([status=pending]) .overlay::before{display:flex;background:0 0}:host([status=correct]) .overlay::before{display:flex;background:green;filter:opacity(.65)}:host([status=incorrect]) .overlay::before{display:flex;background:red;filter:opacity(.65)}`}constructor(){super(),void 0===this.imageKeyword?(this.imageKeyword="grey box",this.imageTagSrc=`https://loremflickr.com/320/240/${this.imageKeyword}`):this.imgTag=this.imageKeyword,this.status="pending",this.answerIcon=!1,this.icon=""}static get properties(){return{...super.properties,imgSrc:{type:String,reflect:!0,attribute:"img-src"},imgTag:{type:String},status:{type:String,reflect:!0},answerIcon:{type:Boolean,reflect:!0},icon:{type:String}}}updated(e){e.forEach(((e,t)=>{"status"===t&&"correct"===this[t]&&(this.answerIcon=!0,this.icon="check"),"status"===t&&"incorrect"===this[t]&&(this.answerIcon=!0,this.icon="cancel"),"status"===t&&"pending"===this[t]&&(this.answerIcon=!1),"imgTag"===t&&this.shadowRoot.querySelector("img").setAttribute("src",this[t])}))}firstUpdated(e){super.firstUpdated&&super.firstUpdated(e),this.imageKeyword.includes("http")?this.imageTagSrc=this.imageKeyword:this.imageTagSrc=`https://loremflickr.com/320/240/${this.imageKeyword}`}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback()}render(){return i` <div id="Nest"> <div class="overlay"> <div class="backgroundbox"> <img src="${this.imageTagSrc}" alt="default img"> </div> </div> ${this.answerIcon?i`<simple-icon-lite icon="${this.icon}"></simple-icon-lite>`:""} </div> `}static get haxProperties(){return new URL("../lib/FlashCard.haxProperties.json",import.meta.url).href}}customElements.define(r.tag,r);export{r as promptImg};
