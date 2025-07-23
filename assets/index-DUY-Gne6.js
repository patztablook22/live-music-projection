(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();var Sn=function({regl:e,precision:t,label:r="",width:n,height:i}){this.regl=e,this.precision=t,this.label=r,this.positionBuffer=this.regl.buffer([[-2,0],[0,-2],[2,2]]),this.draw=()=>{},this.init(),this.pingPongIndex=0,this.fbos=Array(2).fill().map(()=>this.regl.framebuffer({color:this.regl.texture({mag:"nearest",width:n,height:i,format:"rgba"}),depthStencil:!1}))};Sn.prototype.resize=function(e,t){this.fbos.forEach(r=>{r.resize(e,t)})};Sn.prototype.getCurrent=function(){return this.fbos[this.pingPongIndex]};Sn.prototype.getTexture=function(){var e=this.pingPongIndex?0:1;return this.fbos[e]};Sn.prototype.init=function(){return this.transformIndex=0,this.fragHeader=`
  precision ${this.precision} float;

  uniform float time;
  varying vec2 uv;
  `,this.fragBody="",this.vert=`
  precision ${this.precision} float;
  attribute vec2 position;
  varying vec2 uv;

  void main () {
    uv = position;
    gl_Position = vec4(2.0 * position - 1.0, 0, 1);
  }`,this.attributes={position:this.positionBuffer},this.uniforms={time:this.regl.prop("time"),resolution:this.regl.prop("resolution")},this.frag=`
       ${this.fragHeader}

      void main () {
        vec4 c = vec4(0, 0, 0, 0);
        vec2 st = uv;
        ${this.fragBody}
        gl_FragColor = c;
      }
  `,this};Sn.prototype.render=function(e){let t=e[0];var r=this,n=Object.assign(t.uniforms,{prevBuffer:()=>r.fbos[r.pingPongIndex]});r.draw=r.regl({frag:t.frag,vert:r.vert,attributes:r.attributes,uniforms:n,count:3,framebuffer:()=>(r.pingPongIndex=r.pingPongIndex?0:1,r.fbos[r.pingPongIndex])})};Sn.prototype.tick=function(e){this.draw(e)};function Yd(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Uo={exports:{}},Hc;function Wb(){return Hc||(Hc=1,typeof Object.create=="function"?Uo.exports=function(t,r){r&&(t.super_=r,t.prototype=Object.create(r.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:Uo.exports=function(t,r){if(r){t.super_=r;var n=function(){};n.prototype=r.prototype,t.prototype=new n,t.prototype.constructor=t}}),Uo.exports}var kl,jc;function qb(){if(jc)return kl;jc=1;function e(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}kl=e,e.EventEmitter=e,e.prototype._events=void 0,e.prototype._maxListeners=void 0,e.defaultMaxListeners=10,e.prototype.setMaxListeners=function(s){if(!r(s)||s<0||isNaN(s))throw TypeError("n must be a positive number");return this._maxListeners=s,this},e.prototype.emit=function(s){var o,u,d,f,h,m;if(this._events||(this._events={}),s==="error"&&(!this._events.error||n(this._events.error)&&!this._events.error.length)){if(o=arguments[1],o instanceof Error)throw o;var g=new Error('Uncaught, unspecified "error" event. ('+o+")");throw g.context=o,g}if(u=this._events[s],i(u))return!1;if(t(u))switch(arguments.length){case 1:u.call(this);break;case 2:u.call(this,arguments[1]);break;case 3:u.call(this,arguments[1],arguments[2]);break;default:f=Array.prototype.slice.call(arguments,1),u.apply(this,f)}else if(n(u))for(f=Array.prototype.slice.call(arguments,1),m=u.slice(),d=m.length,h=0;h<d;h++)m[h].apply(this,f);return!0},e.prototype.addListener=function(s,o){var u;if(!t(o))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",s,t(o.listener)?o.listener:o),this._events[s]?n(this._events[s])?this._events[s].push(o):this._events[s]=[this._events[s],o]:this._events[s]=o,n(this._events[s])&&!this._events[s].warned&&(i(this._maxListeners)?u=e.defaultMaxListeners:u=this._maxListeners,u&&u>0&&this._events[s].length>u&&(this._events[s].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[s].length),typeof console.trace=="function"&&console.trace())),this},e.prototype.on=e.prototype.addListener,e.prototype.once=function(s,o){if(!t(o))throw TypeError("listener must be a function");var u=!1;function d(){this.removeListener(s,d),u||(u=!0,o.apply(this,arguments))}return d.listener=o,this.on(s,d),this},e.prototype.removeListener=function(s,o){var u,d,f,h;if(!t(o))throw TypeError("listener must be a function");if(!this._events||!this._events[s])return this;if(u=this._events[s],f=u.length,d=-1,u===o||t(u.listener)&&u.listener===o)delete this._events[s],this._events.removeListener&&this.emit("removeListener",s,o);else if(n(u)){for(h=f;h-- >0;)if(u[h]===o||u[h].listener&&u[h].listener===o){d=h;break}if(d<0)return this;u.length===1?(u.length=0,delete this._events[s]):u.splice(d,1),this._events.removeListener&&this.emit("removeListener",s,o)}return this},e.prototype.removeAllListeners=function(s){var o,u;if(!this._events)return this;if(!this._events.removeListener)return arguments.length===0?this._events={}:this._events[s]&&delete this._events[s],this;if(arguments.length===0){for(o in this._events)o!=="removeListener"&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events={},this}if(u=this._events[s],t(u))this.removeListener(s,u);else if(u)for(;u.length;)this.removeListener(s,u[u.length-1]);return delete this._events[s],this},e.prototype.listeners=function(s){var o;return!this._events||!this._events[s]?o=[]:t(this._events[s])?o=[this._events[s]]:o=this._events[s].slice(),o},e.prototype.listenerCount=function(s){if(this._events){var o=this._events[s];if(t(o))return 1;if(o)return o.length}return 0},e.listenerCount=function(s,o){return s.listenerCount(o)};function t(s){return typeof s=="function"}function r(s){return typeof s=="number"}function n(s){return typeof s=="object"&&s!==null}function i(s){return s===void 0}return kl}var Al,Kc;function Hb(){return Kc||(Kc=1,Al=window.performance&&window.performance.now?function(){return performance.now()}:Date.now||function(){return+new Date}),Al}var ss={exports:{}},vn={exports:{}},jb=vn.exports,Xc;function Kb(){return Xc||(Xc=1,(function(){var e,t,r,n,i,s;typeof performance<"u"&&performance!==null&&performance.now?vn.exports=function(){return performance.now()}:typeof process<"u"&&process!==null&&process.hrtime?(vn.exports=function(){return(e()-i)/1e6},t=process.hrtime,e=function(){var o;return o=t(),o[0]*1e9+o[1]},n=e(),s=process.uptime()*1e9,i=n-s):Date.now?(vn.exports=function(){return Date.now()-r},r=Date.now()):(vn.exports=function(){return new Date().getTime()-r},r=new Date().getTime())}).call(jb)),vn.exports}var Yc;function Xb(){if(Yc)return ss.exports;Yc=1;for(var e=Kb(),t=window,r=["moz","webkit"],n="AnimationFrame",i=t["request"+n],s=t["cancel"+n]||t["cancelRequest"+n],o=0;!i&&o<r.length;o++)i=t[r[o]+"Request"+n],s=t[r[o]+"Cancel"+n]||t[r[o]+"CancelRequest"+n];if(!i||!s){var u=0,d=0,f=[],h=1e3/60;i=function(m){if(f.length===0){var g=e(),v=Math.max(0,h-(g-u));u=v+g,setTimeout(function(){var _=f.slice(0);f.length=0;for(var $=0;$<_.length;$++)if(!_[$].cancelled)try{_[$].callback(u)}catch(L){setTimeout(function(){throw L},0)}},Math.round(v))}return f.push({handle:++d,callback:m,cancelled:!1}),d},s=function(m){for(var g=0;g<f.length;g++)f[g].handle===m&&(f[g].cancelled=!0)}}return ss.exports=function(m){return i.call(t,m)},ss.exports.cancel=function(){s.apply(t,arguments)},ss.exports.polyfill=function(m){m||(m=t),m.requestAnimationFrame=i,m.cancelAnimationFrame=s},ss.exports}var Il,Qc;function Yb(){if(Qc)return Il;Qc=1;var e=Wb(),t=qb().EventEmitter,r=Hb(),n=Xb();Il=i;function i(s){if(!(this instanceof i))return new i(s);this.running=!1,this.last=r(),this._frame=0,this._tick=this.tick.bind(this),s&&this.on("tick",s)}return e(i,t),i.prototype.start=function(){if(!this.running)return this.running=!0,this.last=r(),this._frame=n(this._tick),this},i.prototype.stop=function(){return this.running=!1,this._frame!==0&&n.cancel(this._frame),this._frame=0,this},i.prototype.tick=function(){this._frame=n(this._tick);var s=r(),o=s-this.last;this.emit("tick",o),this.last=s},Il}var Qb=Yb();const Zb=Yd(Qb);function Jb(e){return navigator.mediaDevices.enumerateDevices().then(t=>t.filter(r=>r.kind==="videoinput")).then(t=>{let r={audio:!1,video:!0};return t[e]&&(r.video={deviceId:{exact:t[e].deviceId}}),window.navigator.mediaDevices.getUserMedia(r)}).then(t=>{const r=document.createElement("video");return r.setAttribute("autoplay",""),r.setAttribute("muted",""),r.setAttribute("playsinline",""),r.srcObject=t,new Promise((n,i)=>{r.addEventListener("loadedmetadata",()=>{r.play().then(()=>n({video:r}))})})}).catch(console.log.bind(console))}function ew(e){return new Promise(function(t,r){navigator.mediaDevices.getDisplayMedia(e).then(n=>{const i=document.createElement("video");i.srcObject=n,i.addEventListener("loadedmetadata",()=>{i.play(),t({video:i})})}).catch(n=>r(n))})}class tw{constructor({regl:t,width:r,height:n,pb:i,label:s=""}){this.label=s,this.regl=t,this.src=null,this.dynamic=!0,this.width=r,this.height=n,this.tex=this.regl.texture({shape:[1,1]}),this.pb=i}init(t,r){"src"in t&&(this.src=t.src,this.tex=this.regl.texture({data:this.src,...r})),"dynamic"in t&&(this.dynamic=t.dynamic)}initCam(t,r){const n=this;Jb(t).then(i=>{n.src=i.video,n.dynamic=!0,n.tex=n.regl.texture({data:n.src,...r})}).catch(i=>console.log("could not get camera",i))}initVideo(t="",r){const n=document.createElement("video");n.crossOrigin="anonymous",n.autoplay=!0,n.loop=!0,n.muted=!0,n.addEventListener("loadeddata",()=>{this.src=n,n.play(),this.tex=this.regl.texture({data:this.src,...r}),this.dynamic=!0}),n.src=t}initImage(t="",r){const n=document.createElement("img");n.crossOrigin="anonymous",n.src=t,n.onload=()=>{this.src=n,this.dynamic=!1,this.tex=this.regl.texture({data:this.src,...r})}}initStream(t,r){let n=this;t&&this.pb&&(this.pb.initSource(t),this.pb.on("got video",function(i,s){i===t&&(n.src=s,n.dynamic=!0,n.tex=n.regl.texture({data:n.src,...r}))}))}initScreen(t=0,r){const n=this;ew().then(function(i){n.src=i.video,n.tex=n.regl.texture({data:n.src,...r}),n.dynamic=!0}).catch(i=>console.log("could not get screen",i))}resize(t,r){this.width=t,this.height=r}clear(){this.src&&this.src.srcObject&&this.src.srcObject.getTracks&&this.src.srcObject.getTracks().forEach(t=>t.stop()),this.src=null,this.tex=this.regl.texture({shape:[1,1]})}tick(t){this.src!==null&&this.dynamic===!0&&(this.src.videoWidth&&this.src.videoWidth!==this.tex.width&&(console.log(this.src.videoWidth,this.src.videoHeight,this.tex.width,this.tex.height),this.tex.resize(this.src.videoWidth,this.src.videoHeight)),this.src.width&&this.src.width!==this.tex.width&&this.tex.resize(this.src.width,this.src.height),this.tex.subimage(this.src))}getTexture(){return this.tex}}const wa={};function rw(e){if(typeof e=="object"){if("buttons"in e)return e.buttons;if("which"in e){var t=e.which;if(t===2)return 4;if(t===3)return 2;if(t>0)return 1<<t-1}else if("button"in e){var t=e.button;if(t===1)return 4;if(t===2)return 2;if(t>=0)return 1<<t}}return 0}wa.buttons=rw;function aw(e){return e.target||e.srcElement||window}wa.element=aw;function nw(e){return typeof e=="object"&&"pageX"in e?e.pageX:0}wa.x=nw;function iw(e){return typeof e=="object"&&"pageY"in e?e.pageY:0}wa.y=iw;function sw(e,t){t||(t=e,e=window);var r=0,n=0,i=0,s={shift:!1,alt:!1,control:!1,meta:!1},o=!1;function u(b){var N=!1;return"altKey"in b&&(N=N||b.altKey!==s.alt,s.alt=!!b.altKey),"shiftKey"in b&&(N=N||b.shiftKey!==s.shift,s.shift=!!b.shiftKey),"ctrlKey"in b&&(N=N||b.ctrlKey!==s.control,s.control=!!b.ctrlKey),"metaKey"in b&&(N=N||b.metaKey!==s.meta,s.meta=!!b.metaKey),N}function d(b,N){var B=wa.x(N),W=wa.y(N);"buttons"in N&&(b=N.buttons|0),(b!==r||B!==n||W!==i||u(N))&&(r=b|0,n=B||0,i=W||0,t&&t(r,n,i,s))}function f(b){d(0,b)}function h(){(r||n||i||s.shift||s.alt||s.meta||s.control)&&(n=i=0,r=0,s.shift=s.alt=s.control=s.meta=!1,t&&t(0,0,0,s))}function m(b){u(b)&&t&&t(r,n,i,s)}function g(b){wa.buttons(b)===0?d(0,b):d(r,b)}function v(b){d(r|wa.buttons(b),b)}function _(b){d(r&~wa.buttons(b),b)}function $(){o||(o=!0,e.addEventListener("mousemove",g),e.addEventListener("mousedown",v),e.addEventListener("mouseup",_),e.addEventListener("mouseleave",f),e.addEventListener("mouseenter",f),e.addEventListener("mouseout",f),e.addEventListener("mouseover",f),e.addEventListener("blur",h),e.addEventListener("keyup",m),e.addEventListener("keydown",m),e.addEventListener("keypress",m),e!==window&&(window.addEventListener("blur",h),window.addEventListener("keyup",m),window.addEventListener("keydown",m),window.addEventListener("keypress",m)))}function L(){o&&(o=!1,e.removeEventListener("mousemove",g),e.removeEventListener("mousedown",v),e.removeEventListener("mouseup",_),e.removeEventListener("mouseleave",f),e.removeEventListener("mouseenter",f),e.removeEventListener("mouseout",f),e.removeEventListener("mouseover",f),e.removeEventListener("blur",h),e.removeEventListener("keyup",m),e.removeEventListener("keydown",m),e.removeEventListener("keypress",m),e!==window&&(window.removeEventListener("blur",h),window.removeEventListener("keyup",m),window.removeEventListener("keydown",m),window.removeEventListener("keypress",m)))}$();var T={element:e};return Object.defineProperties(T,{enabled:{get:function(){return o},set:function(b){b?$():L()},enumerable:!0},buttons:{get:function(){return r},enumerable:!0},x:{get:function(){return n},enumerable:!0},y:{get:function(){return i},enumerable:!0},mods:{get:function(){return s},enumerable:!0}}),T}var au={exports:{}},ow=au.exports,Zc;function uw(){return Zc||(Zc=1,function(e,t){(function(r,n){e.exports=n()})(ow,function(){function r(F,R,te){for(var U,J=0,$e=R.length;J<$e;J++)!U&&J in R||(U||(U=Array.prototype.slice.call(R,0,J)),U[J]=R[J]);return F.concat(U||Array.prototype.slice.call(R))}var n=Object.freeze({__proto__:null,blackman:function(F){for(var R=new Float32Array(F),te=2*Math.PI/(F-1),U=2*te,J=0;J<F/2;J++)R[J]=.42-.5*Math.cos(J*te)+.08*Math.cos(J*U);for(J=Math.ceil(F/2);J>0;J--)R[F-J]=R[J-1];return R},hamming:function(F){for(var R=new Float32Array(F),te=0;te<F;te++)R[te]=.54-.46*Math.cos(2*Math.PI*(te/F-1));return R},hanning:function(F){for(var R=new Float32Array(F),te=0;te<F;te++)R[te]=.5-.5*Math.cos(2*Math.PI*te/(F-1));return R},sine:function(F){for(var R=Math.PI/(F-1),te=new Float32Array(F),U=0;U<F;U++)te[U]=Math.sin(R*U);return te}}),i={};function s(F){for(;F%2==0&&F>1;)F/=2;return F===1}function o(F,R){if(R!=="rect"){if(R!==""&&R||(R="hanning"),i[R]||(i[R]={}),!i[R][F.length])try{i[R][F.length]=n[R](F.length)}catch{throw new Error("Invalid windowing function")}F=function(te,U){for(var J=[],$e=0;$e<Math.min(te.length,U.length);$e++)J[$e]=te[$e]*U[$e];return J}(F,i[R][F.length])}return F}function u(F,R,te){for(var U=new Float32Array(F),J=0;J<U.length;J++)U[J]=J*R/te,U[J]=13*Math.atan(U[J]/1315.8)+3.5*Math.atan(Math.pow(U[J]/7518,2));return U}function d(F){return Float32Array.from(F)}function f(F){return 1125*Math.log(1+F/700)}function h(F,R,te){for(var U,J=new Float32Array(F+2),$e=new Float32Array(F+2),Oe=R/2,He=f(0),ie=(f(Oe)-He)/(F+1),me=new Array(F+2),Ve=0;Ve<J.length;Ve++)J[Ve]=Ve*ie,$e[Ve]=(U=J[Ve],700*(Math.exp(U/1125)-1)),me[Ve]=Math.floor((te+1)*$e[Ve]/R);for(var de=new Array(F),We=0;We<de.length;We++){for(de[We]=new Array(te/2+1).fill(0),Ve=me[We];Ve<me[We+1];Ve++)de[We][Ve]=(Ve-me[We])/(me[We+1]-me[We]);for(Ve=me[We+1];Ve<me[We+2];Ve++)de[We][Ve]=(me[We+2]-Ve)/(me[We+2]-me[We+1])}return de}function m(F,R,te,U,J,$e,Oe){U===void 0&&(U=5),J===void 0&&(J=2),$e===void 0&&($e=!0),Oe===void 0&&(Oe=440);var He=Math.floor(te/2)+1,ie=new Array(te).fill(0).map(function(Et,Jt){return F*function(er,hr){return Math.log2(16*er/hr)}(R*Jt/te,Oe)});ie[0]=ie[1]-1.5*F;var me,Ve,de,We=ie.slice(1).map(function(Et,Jt){return Math.max(Et-ie[Jt])},1).concat([1]),Dt=Math.round(F/2),Ut=new Array(F).fill(0).map(function(Et,Jt){return ie.map(function(er){return(10*F+Dt+er-Jt)%F-Dt})}),zt=Ut.map(function(Et,Jt){return Et.map(function(er,hr){return Math.exp(-.5*Math.pow(2*Ut[Jt][hr]/We[hr],2))})});if(Ve=(me=zt)[0].map(function(){return 0}),de=me.reduce(function(Et,Jt){return Jt.forEach(function(er,hr){Et[hr]+=Math.pow(er,2)}),Et},Ve).map(Math.sqrt),zt=me.map(function(Et,Jt){return Et.map(function(er,hr){return er/(de[hr]||1)})}),J){var Mt=ie.map(function(Et){return Math.exp(-.5*Math.pow((Et/F-U)/J,2))});zt=zt.map(function(Et){return Et.map(function(Jt,er){return Jt*Mt[er]})})}return $e&&(zt=r(r([],zt.slice(3),!0),zt.slice(0,3))),zt.map(function(Et){return Et.slice(0,He)})}function g(F,R){for(var te=0,U=0,J=0;J<R.length;J++)te+=Math.pow(J,F)*Math.abs(R[J]),U+=R[J];return te/U}function v(F){var R=F.ampSpectrum,te=F.barkScale,U=F.numberOfBarkBands,J=U===void 0?24:U;if(typeof R!="object"||typeof te!="object")throw new TypeError;var $e=J,Oe=new Float32Array($e),He=0,ie=R,me=new Int32Array($e+1);me[0]=0;for(var Ve=te[ie.length-1]/$e,de=1,We=0;We<ie.length;We++)for(;te[We]>Ve;)me[de++]=We,Ve=de*te[ie.length-1]/$e;for(me[$e]=ie.length-1,We=0;We<$e;We++){for(var Dt=0,Ut=me[We];Ut<me[We+1];Ut++)Dt+=ie[Ut];Oe[We]=Math.pow(Dt,.23)}for(We=0;We<Oe.length;We++)He+=Oe[We];return{specific:Oe,total:He}}function _(F){var R=F.ampSpectrum;if(typeof R!="object")throw new TypeError;for(var te=new Float32Array(R.length),U=0;U<te.length;U++)te[U]=Math.pow(R[U],2);return te}function $(F){var R=F.ampSpectrum,te=F.melFilterBank,U=F.bufferSize;if(typeof R!="object")throw new TypeError("Valid ampSpectrum is required to generate melBands");if(typeof te!="object")throw new TypeError("Valid melFilterBank is required to generate melBands");for(var J=_({ampSpectrum:R}),$e=te.length,Oe=Array($e),He=new Float32Array($e),ie=0;ie<He.length;ie++){Oe[ie]=new Float32Array(U/2),He[ie]=0;for(var me=0;me<U/2;me++)Oe[ie][me]=te[ie][me]*J[me],He[ie]+=Oe[ie][me];He[ie]=Math.log(He[ie]+1)}return Array.prototype.slice.call(He)}function L(F){return F&&F.__esModule&&Object.prototype.hasOwnProperty.call(F,"default")?F.default:F}var T=null,b=L(function(F,R){var te=F.length;return R=R||2,T&&T[te]||function(U){(T=T||{})[U]=new Array(U*U);for(var J=Math.PI/U,$e=0;$e<U;$e++)for(var Oe=0;Oe<U;Oe++)T[U][Oe+$e*U]=Math.cos(J*(Oe+.5)*$e)}(te),F.map(function(){return 0}).map(function(U,J){return R*F.reduce(function($e,Oe,He,ie){return $e+Oe*T[te][He+J*te]},0)})}),N=Object.freeze({__proto__:null,amplitudeSpectrum:function(F){return F.ampSpectrum},buffer:function(F){return F.signal},chroma:function(F){var R=F.ampSpectrum,te=F.chromaFilterBank;if(typeof R!="object")throw new TypeError("Valid ampSpectrum is required to generate chroma");if(typeof te!="object")throw new TypeError("Valid chromaFilterBank is required to generate chroma");var U=te.map(function($e,Oe){return R.reduce(function(He,ie,me){return He+ie*$e[me]},0)}),J=Math.max.apply(Math,U);return J?U.map(function($e){return $e/J}):U},complexSpectrum:function(F){return F.complexSpectrum},energy:function(F){var R=F.signal;if(typeof R!="object")throw new TypeError;for(var te=0,U=0;U<R.length;U++)te+=Math.pow(Math.abs(R[U]),2);return te},loudness:v,melBands:$,mfcc:function(F){var R=F.ampSpectrum,te=F.melFilterBank,U=F.numberOfMFCCCoefficients,J=F.bufferSize,$e=Math.min(40,Math.max(1,U||13));if(te.length<$e)throw new Error("Insufficient filter bank for requested number of coefficients");var Oe=$({ampSpectrum:R,melFilterBank:te,bufferSize:J});return b(Oe).slice(0,$e)},perceptualSharpness:function(F){for(var R=v({ampSpectrum:F.ampSpectrum,barkScale:F.barkScale}),te=R.specific,U=0,J=0;J<te.length;J++)U+=J<15?(J+1)*te[J+1]:.066*Math.exp(.171*(J+1));return U*=.11/R.total},perceptualSpread:function(F){for(var R=v({ampSpectrum:F.ampSpectrum,barkScale:F.barkScale}),te=0,U=0;U<R.specific.length;U++)R.specific[U]>te&&(te=R.specific[U]);return Math.pow((R.total-te)/R.total,2)},powerSpectrum:_,rms:function(F){var R=F.signal;if(typeof R!="object")throw new TypeError;for(var te=0,U=0;U<R.length;U++)te+=Math.pow(R[U],2);return te/=R.length,te=Math.sqrt(te)},spectralCentroid:function(F){var R=F.ampSpectrum;if(typeof R!="object")throw new TypeError;return g(1,R)},spectralCrest:function(F){var R=F.ampSpectrum;if(typeof R!="object")throw new TypeError;var te=0,U=-1/0;return R.forEach(function(J){te+=Math.pow(J,2),U=J>U?J:U}),te/=R.length,te=Math.sqrt(te),U/te},spectralFlatness:function(F){var R=F.ampSpectrum;if(typeof R!="object")throw new TypeError;for(var te=0,U=0,J=0;J<R.length;J++)te+=Math.log(R[J]),U+=R[J];return Math.exp(te/R.length)*R.length/U},spectralFlux:function(F){var R=F.signal,te=F.previousSignal,U=F.bufferSize;if(typeof R!="object"||typeof te!="object")throw new TypeError;for(var J=0,$e=-U/2;$e<R.length/2-1;$e++)x=Math.abs(R[$e])-Math.abs(te[$e]),J+=(x+Math.abs(x))/2;return J},spectralKurtosis:function(F){var R=F.ampSpectrum;if(typeof R!="object")throw new TypeError;var te=R,U=g(1,te),J=g(2,te),$e=g(3,te),Oe=g(4,te);return(-3*Math.pow(U,4)+6*U*J-4*U*$e+Oe)/Math.pow(Math.sqrt(J-Math.pow(U,2)),4)},spectralRolloff:function(F){var R=F.ampSpectrum,te=F.sampleRate;if(typeof R!="object")throw new TypeError;for(var U=R,J=te/(2*(U.length-1)),$e=0,Oe=0;Oe<U.length;Oe++)$e+=U[Oe];for(var He=.99*$e,ie=U.length-1;$e>He&&ie>=0;)$e-=U[ie],--ie;return(ie+1)*J},spectralSkewness:function(F){var R=F.ampSpectrum;if(typeof R!="object")throw new TypeError;var te=g(1,R),U=g(2,R),J=g(3,R);return(2*Math.pow(te,3)-3*te*U+J)/Math.pow(Math.sqrt(U-Math.pow(te,2)),3)},spectralSlope:function(F){var R=F.ampSpectrum,te=F.sampleRate,U=F.bufferSize;if(typeof R!="object")throw new TypeError;for(var J=0,$e=0,Oe=new Float32Array(R.length),He=0,ie=0,me=0;me<R.length;me++){J+=R[me];var Ve=me*te/U;Oe[me]=Ve,He+=Ve*Ve,$e+=Ve,ie+=Ve*R[me]}return(R.length*ie-$e*J)/(J*(He-Math.pow($e,2)))},spectralSpread:function(F){var R=F.ampSpectrum;if(typeof R!="object")throw new TypeError;return Math.sqrt(g(2,R)-Math.pow(g(1,R),2))},zcr:function(F){var R=F.signal;if(typeof R!="object")throw new TypeError;for(var te=0,U=1;U<R.length;U++)(R[U-1]>=0&&R[U]<0||R[U-1]<0&&R[U]>=0)&&te++;return te}});function B(F){if(Array.isArray(F)){for(var R=0,te=Array(F.length);R<F.length;R++)te[R]=F[R];return te}return Array.from(F)}var W={},ae={},Q={bitReverseArray:function(F){if(W[F]===void 0){for(var R=(F-1).toString(2).length,te="0".repeat(R),U={},J=0;J<F;J++){var $e=J.toString(2);$e=te.substr($e.length)+$e,$e=[].concat(B($e)).reverse().join(""),U[J]=parseInt($e,2)}W[F]=U}return W[F]},multiply:function(F,R){return{real:F.real*R.real-F.imag*R.imag,imag:F.real*R.imag+F.imag*R.real}},add:function(F,R){return{real:F.real+R.real,imag:F.imag+R.imag}},subtract:function(F,R){return{real:F.real-R.real,imag:F.imag-R.imag}},euler:function(F,R){var te=-2*Math.PI*F/R;return{real:Math.cos(te),imag:Math.sin(te)}},conj:function(F){return F.imag*=-1,F},constructComplexArray:function(F){var R={};R.real=F.real===void 0?F.slice():F.real.slice();var te=R.real.length;return ae[te]===void 0&&(ae[te]=Array.apply(null,Array(te)).map(Number.prototype.valueOf,0)),R.imag=ae[te].slice(),R}},ge=function(F){var R={};F.real===void 0||F.imag===void 0?R=Q.constructComplexArray(F):(R.real=F.real.slice(),R.imag=F.imag.slice());var te=R.real.length,U=Math.log2(te);if(Math.round(U)!=U)throw new Error("Input size must be a power of 2.");if(R.real.length!=R.imag.length)throw new Error("Real and imaginary components must have the same length.");for(var J=Q.bitReverseArray(te),$e={real:[],imag:[]},Oe=0;Oe<te;Oe++)$e.real[J[Oe]]=R.real[Oe],$e.imag[J[Oe]]=R.imag[Oe];for(var He=0;He<te;He++)R.real[He]=$e.real[He],R.imag[He]=$e.imag[He];for(var ie=1;ie<=U;ie++)for(var me=Math.pow(2,ie),Ve=0;Ve<me/2;Ve++)for(var de=Q.euler(Ve,me),We=0;We<te/me;We++){var Dt=me*We+Ve,Ut=me*We+Ve+me/2,zt={real:R.real[Dt],imag:R.imag[Dt]},Mt={real:R.real[Ut],imag:R.imag[Ut]},Et=Q.multiply(de,Mt),Jt=Q.subtract(zt,Et);R.real[Ut]=Jt.real,R.imag[Ut]=Jt.imag;var er=Q.add(Et,zt);R.real[Dt]=er.real,R.imag[Dt]=er.imag}return R},ze=ge,Xe=function(){function F(R,te){var U=this;if(this._m=te,!R.audioContext)throw this._m.errors.noAC;if(R.bufferSize&&!s(R.bufferSize))throw this._m._errors.notPow2;if(!R.source)throw this._m._errors.noSource;this._m.audioContext=R.audioContext,this._m.bufferSize=R.bufferSize||this._m.bufferSize||256,this._m.hopSize=R.hopSize||this._m.hopSize||this._m.bufferSize,this._m.sampleRate=R.sampleRate||this._m.audioContext.sampleRate||44100,this._m.callback=R.callback,this._m.windowingFunction=R.windowingFunction||"hanning",this._m.featureExtractors=N,this._m.EXTRACTION_STARTED=R.startImmediately||!1,this._m.channel=typeof R.channel=="number"?R.channel:0,this._m.inputs=R.inputs||1,this._m.outputs=R.outputs||1,this._m.numberOfMFCCCoefficients=R.numberOfMFCCCoefficients||this._m.numberOfMFCCCoefficients||13,this._m.numberOfBarkBands=R.numberOfBarkBands||this._m.numberOfBarkBands||24,this._m.spn=this._m.audioContext.createScriptProcessor(this._m.bufferSize,this._m.inputs,this._m.outputs),this._m.spn.connect(this._m.audioContext.destination),this._m._featuresToExtract=R.featureExtractors||[],this._m.barkScale=u(this._m.bufferSize,this._m.sampleRate,this._m.bufferSize),this._m.melFilterBank=h(Math.max(this._m.melBands,this._m.numberOfMFCCCoefficients),this._m.sampleRate,this._m.bufferSize),this._m.inputData=null,this._m.previousInputData=null,this._m.frame=null,this._m.previousFrame=null,this.setSource(R.source),this._m.spn.onaudioprocess=function(J){var $e;U._m.inputData!==null&&(U._m.previousInputData=U._m.inputData),U._m.inputData=J.inputBuffer.getChannelData(U._m.channel),U._m.previousInputData?(($e=new Float32Array(U._m.previousInputData.length+U._m.inputData.length-U._m.hopSize)).set(U._m.previousInputData.slice(U._m.hopSize)),$e.set(U._m.inputData,U._m.previousInputData.length-U._m.hopSize)):$e=U._m.inputData;var Oe=function(He,ie,me){if(He.length<ie)throw new Error("Buffer is too short for frame length");if(me<1)throw new Error("Hop length cannot be less that 1");if(ie<1)throw new Error("Frame length cannot be less that 1");var Ve=1+Math.floor((He.length-ie)/me);return new Array(Ve).fill(0).map(function(de,We){return He.slice(We*me,We*me+ie)})}($e,U._m.bufferSize,U._m.hopSize);Oe.forEach(function(He){U._m.frame=He;var ie=U._m.extract(U._m._featuresToExtract,U._m.frame,U._m.previousFrame);typeof U._m.callback=="function"&&U._m.EXTRACTION_STARTED&&U._m.callback(ie),U._m.previousFrame=U._m.frame})}}return F.prototype.start=function(R){this._m._featuresToExtract=R||this._m._featuresToExtract,this._m.EXTRACTION_STARTED=!0},F.prototype.stop=function(){this._m.EXTRACTION_STARTED=!1},F.prototype.setSource=function(R){this._m.source&&this._m.source.disconnect(this._m.spn),this._m.source=R,this._m.source.connect(this._m.spn)},F.prototype.setChannel=function(R){R<=this._m.inputs?this._m.channel=R:console.error("Channel ".concat(R," does not exist. Make sure you've provided a value for 'inputs' that is greater than ").concat(R," when instantiating the MeydaAnalyzer"))},F.prototype.get=function(R){return this._m.inputData?this._m.extract(R||this._m._featuresToExtract,this._m.inputData,this._m.previousInputData):null},F}(),nt={audioContext:null,spn:null,bufferSize:512,sampleRate:44100,melBands:26,chromaBands:12,callback:null,windowingFunction:"hanning",featureExtractors:N,EXTRACTION_STARTED:!1,numberOfMFCCCoefficients:13,numberOfBarkBands:24,_featuresToExtract:[],windowing:o,_errors:{notPow2:new Error("Meyda: Buffer size must be a power of 2, e.g. 64 or 512"),featureUndef:new Error("Meyda: No features defined."),invalidFeatureFmt:new Error("Meyda: Invalid feature format"),invalidInput:new Error("Meyda: Invalid input."),noAC:new Error("Meyda: No AudioContext specified."),noSource:new Error("Meyda: No source node specified.")},createMeydaAnalyzer:function(F){return new Xe(F,Object.assign({},nt))},listAvailableFeatureExtractors:function(){return Object.keys(this.featureExtractors)},extract:function(F,R,te){var U=this;if(!R)throw this._errors.invalidInput;if(typeof R!="object")throw this._errors.invalidInput;if(!F)throw this._errors.featureUndef;if(!s(R.length))throw this._errors.notPow2;this.barkScale!==void 0&&this.barkScale.length==this.bufferSize||(this.barkScale=u(this.bufferSize,this.sampleRate,this.bufferSize)),this.melFilterBank!==void 0&&this.barkScale.length==this.bufferSize&&this.melFilterBank.length==this.melBands||(this.melFilterBank=h(Math.max(this.melBands,this.numberOfMFCCCoefficients),this.sampleRate,this.bufferSize)),this.chromaFilterBank!==void 0&&this.chromaFilterBank.length==this.chromaBands||(this.chromaFilterBank=m(this.chromaBands,this.sampleRate,this.bufferSize)),"buffer"in R&&R.buffer===void 0?this.signal=d(R):this.signal=R;var J=Je(R,this.windowingFunction,this.bufferSize);if(this.signal=J.windowedSignal,this.complexSpectrum=J.complexSpectrum,this.ampSpectrum=J.ampSpectrum,te){var $e=Je(te,this.windowingFunction,this.bufferSize);this.previousSignal=$e.windowedSignal,this.previousComplexSpectrum=$e.complexSpectrum,this.previousAmpSpectrum=$e.ampSpectrum}var Oe=function(He){return U.featureExtractors[He]({ampSpectrum:U.ampSpectrum,chromaFilterBank:U.chromaFilterBank,complexSpectrum:U.complexSpectrum,signal:U.signal,bufferSize:U.bufferSize,sampleRate:U.sampleRate,barkScale:U.barkScale,melFilterBank:U.melFilterBank,previousSignal:U.previousSignal,previousAmpSpectrum:U.previousAmpSpectrum,previousComplexSpectrum:U.previousComplexSpectrum,numberOfMFCCCoefficients:U.numberOfMFCCCoefficients,numberOfBarkBands:U.numberOfBarkBands})};if(typeof F=="object")return F.reduce(function(He,ie){var me;return Object.assign({},He,((me={})[ie]=Oe(ie),me))},{});if(typeof F=="string")return Oe(F);throw this._errors.invalidFeatureFmt}},Je=function(F,R,te){var U={};F.buffer===void 0?U.signal=d(F):U.signal=F,U.windowedSignal=o(U.signal,R),U.complexSpectrum=ze(U.windowedSignal),U.ampSpectrum=new Float32Array(te/2);for(var J=0;J<te/2;J++)U.ampSpectrum[J]=Math.sqrt(Math.pow(U.complexSpectrum.real[J],2)+Math.pow(U.complexSpectrum.imag[J],2));return U};return typeof window<"u"&&(window.Meyda=nt),nt})}(au)),au.exports}var lw=uw();const dw=Yd(lw);class fw{constructor({numBins:t=4,cutoff:r=2,smooth:n=.4,max:i=15,scale:s=10,isDrawing:o=!1,parentEl:u=document.body}){this.vol=0,this.scale=s,this.max=i,this.cutoff=r,this.smooth=n,this.setBins(t),this.beat={holdFrames:20,threshold:40,_cutoff:0,decay:.98,_framesSinceBeat:0},this.onBeat=()=>{},this.canvas=document.createElement("canvas"),this.canvas.width=100,this.canvas.height=80,this.canvas.style.width="100px",this.canvas.style.height="80px",this.canvas.style.position="absolute",this.canvas.style.right="0px",this.canvas.style.bottom="0px",u.appendChild(this.canvas),this.isDrawing=o,this.ctx=this.canvas.getContext("2d"),this.ctx.fillStyle="#DFFFFF",this.ctx.strokeStyle="#0ff",this.ctx.lineWidth=.5,window.navigator.mediaDevices&&window.navigator.mediaDevices.getUserMedia({video:!1,audio:!0}).then(d=>{this.stream=d,this.context=new AudioContext;let f=this.context.createMediaStreamSource(d);this.meyda=dw.createMeydaAnalyzer({audioContext:this.context,source:f,featureExtractors:["loudness"]})}).catch(d=>console.log("ERROR",d))}detectBeat(t){t>this.beat._cutoff&&t>this.beat.threshold?(this.onBeat(),this.beat._cutoff=t*1.2,this.beat._framesSinceBeat=0):this.beat._framesSinceBeat<=this.beat.holdFrames?this.beat._framesSinceBeat++:(this.beat._cutoff*=this.beat.decay,this.beat._cutoff=Math.max(this.beat._cutoff,this.beat.threshold))}tick(){if(this.meyda){var t=this.meyda.get();if(t&&t!==null){this.vol=t.loudness.total,this.detectBeat(this.vol);const r=(i,s)=>i+s;let n=Math.floor(t.loudness.specific.length/this.bins.length);this.prevBins=this.bins.slice(0),this.bins=this.bins.map((i,s)=>t.loudness.specific.slice(s*n,(s+1)*n).reduce(r)).map((i,s)=>i*(1-this.settings[s].smooth)+this.prevBins[s]*this.settings[s].smooth),this.fft=this.bins.map((i,s)=>Math.max(0,(i-this.settings[s].cutoff)/this.settings[s].scale)),this.isDrawing&&this.draw()}}}setCutoff(t){this.cutoff=t,this.settings=this.settings.map(r=>(r.cutoff=t,r))}setSmooth(t){this.smooth=t,this.settings=this.settings.map(r=>(r.smooth=t,r))}setBins(t){this.bins=Array(t).fill(0),this.prevBins=Array(t).fill(0),this.fft=Array(t).fill(0),this.settings=Array(t).fill(0).map(()=>({cutoff:this.cutoff,scale:this.scale,smooth:this.smooth})),this.bins.forEach((r,n)=>{window["a"+n]=(i=1,s=0)=>()=>a.fft[n]*i+s})}setScale(t){this.scale=t,this.settings=this.settings.map(r=>(r.scale=t,r))}setMax(t){this.max=t,console.log("set max is deprecated")}hide(){this.isDrawing=!1,this.canvas.style.display="none"}show(){this.isDrawing=!0,this.canvas.style.display="block"}draw(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);var t=this.canvas.width/this.bins.length,r=this.canvas.height/(this.max*2);this.bins.forEach((n,i)=>{var s=n*r;this.ctx.fillRect(i*t,this.canvas.height-s,t,s);var o=this.canvas.height-r*this.settings[i].cutoff;this.ctx.beginPath(),this.ctx.moveTo(i*t,o),this.ctx.lineTo((i+1)*t,o),this.ctx.stroke();var u=this.canvas.height-r*(this.settings[i].scale+this.settings[i].cutoff);this.ctx.beginPath(),this.ctx.moveTo(i*t,u),this.ctx.lineTo((i+1)*t,u),this.ctx.stroke()})}}class cw{constructor(t){this.mediaSource=new MediaSource,this.stream=t,this.output=document.createElement("video"),this.output.autoplay=!0,this.output.loop=!0;let r=this;this.mediaSource.addEventListener("sourceopen",()=>{console.log("MediaSource opened"),r.sourceBuffer=r.mediaSource.addSourceBuffer('video/webm; codecs="vp8"'),console.log("Source buffer: ",sourceBuffer)})}start(){let t={mimeType:"video/webm;codecs=vp9"};this.recordedBlobs=[];try{this.mediaRecorder=new MediaRecorder(this.stream,t)}catch(r){console.log("Unable to create MediaRecorder with options Object: ",r);try{t={mimeType:"video/webm,codecs=vp9"},this.mediaRecorder=new MediaRecorder(this.stream,t)}catch(n){console.log("Unable to create MediaRecorder with options Object: ",n);try{t="video/vp8",this.mediaRecorder=new MediaRecorder(this.stream,t)}catch(i){alert(`MediaRecorder is not supported by this browser.

Try Firefox 29 or later, or Chrome 47 or later, with Enable experimental Web Platform features enabled from chrome://flags.`),console.error("Exception while creating MediaRecorder:",i);return}}}console.log("Created MediaRecorder",this.mediaRecorder,"with options",t),this.mediaRecorder.onstop=this._handleStop.bind(this),this.mediaRecorder.ondataavailable=this._handleDataAvailable.bind(this),this.mediaRecorder.start(100),console.log("MediaRecorder started",this.mediaRecorder)}stop(){this.mediaRecorder.stop()}_handleStop(){const t=new Blob(this.recordedBlobs,{type:this.mediaRecorder.mimeType}),r=window.URL.createObjectURL(t);this.output.src=r;const n=document.createElement("a");n.style.display="none",n.href=r;let i=new Date;n.download=`hydra-${i.getFullYear()}-${i.getMonth()+1}-${i.getDate()}-${i.getHours()}.${i.getMinutes()}.${i.getSeconds()}.webm`,document.body.appendChild(n),n.click(),setTimeout(()=>{document.body.removeChild(n),window.URL.revokeObjectURL(r)},300)}_handleDataAvailable(t){t.data&&t.data.size>0&&this.recordedBlobs.push(t.data)}}const Cl={linear:function(e){return e},easeInQuad:function(e){return e*e},easeOutQuad:function(e){return e*(2-e)},easeInOutQuad:function(e){return e<.5?2*e*e:-1+(4-2*e)*e},easeInCubic:function(e){return e*e*e},easeOutCubic:function(e){return--e*e*e+1},easeInOutCubic:function(e){return e<.5?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1},easeInQuart:function(e){return e*e*e*e},easeOutQuart:function(e){return 1- --e*e*e*e},easeInOutQuart:function(e){return e<.5?8*e*e*e*e:1-8*--e*e*e*e},easeInQuint:function(e){return e*e*e*e*e},easeOutQuint:function(e){return 1+--e*e*e*e*e},easeInOutQuint:function(e){return e<.5?16*e*e*e*e*e:1+16*--e*e*e*e*e},sin:function(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}};var pw=(e,t,r,n,i)=>(e-t)*(i-n)/(r-t)+n;const Lg={init:()=>{Array.prototype.fast=function(e=1){return this._speed=e,this},Array.prototype.smooth=function(e=1){return this._smooth=e,this},Array.prototype.ease=function(e="linear"){return typeof e=="function"?(this._smooth=1,this._ease=e):Cl[e]&&(this._smooth=1,this._ease=Cl[e]),this},Array.prototype.offset=function(e=.5){return this._offset=e%1,this},Array.prototype.fit=function(e=0,t=1){let r=Math.min(...this),n=Math.max(...this);var i=this.map(s=>pw(s,r,n,e,t));return i._speed=this._speed,i._smooth=this._smooth,i._ease=this._ease,i}},getValue:(e=[])=>({time:t,bpm:r})=>{let n=e._speed?e._speed:1,i=e._smooth?e._smooth:0,s=t*n*(r/60)+(e._offset||0);if(i!==0){let o=e._ease?e._ease:Cl.linear,u=s-i/2,d=e[Math.floor(u%e.length)],f=e[Math.floor((u+1)%e.length)],h=Math.min(u%1/i,1);return o(h)*(f-d)+d}else return e[Math.floor(s%e.length)],e[Math.floor(s%e.length)]}},hw=e=>{var t="",r=i(t),n=(s,o)=>{t+=`
      var ${s} = ${o}
    `,r=i(t)};return{addToContext:n,eval:s=>r.eval(s)};function i(s){globalThis.eval(s);var o=function(u){globalThis.eval(u)};return{eval:o}}};class mw{constructor(t,r,n=[]){this.makeGlobal=r,this.sandbox=hw(),this.parent=t;var i=Object.keys(t);i.forEach(s=>this.add(s)),this.userProps=n}add(t){this.makeGlobal&&(window[t]=this.parent[t])}set(t,r){this.makeGlobal&&(window[t]=r),this.parent[t]=r}tick(){this.makeGlobal&&this.userProps.forEach(t=>{this.parent[t]=window[t]})}eval(t){this.sandbox.eval(t)}}const gw={float:{vec4:{name:"sum",args:[[1,1,1,1]]},vec2:{name:"sum",args:[[1,1]]}}},Ol=e=>(e=e.toString(),e.indexOf(".")<0&&(e+="."),e);function yw(e,t,r){const n=e.transform.inputs,i=e.userArgs,{generators:s}=e.synth,{src:o}=s;return n.map((u,d)=>{const f={value:u.default,type:u.type,isUniform:!1,name:u.name,vecLen:0};if(f.type==="float"&&(f.value=Ol(u.default)),u.type.startsWith("vec"))try{f.vecLen=Number.parseInt(u.type.substr(3))}catch{console.log(`Error determining length of vector input type ${u.type} (${u.name})`)}if(i.length>d&&(f.value=i[d],typeof i[d]=="function"?(f.value=(g,v,_)=>{try{const $=i[d](v);return typeof $=="number"?$:(console.warn("function does not return a number",i[d]),u.default)}catch($){return console.warn("ERROR",$),u.default}},f.isUniform=!0):i[d].constructor===Array&&(f.value=(g,v,_)=>Lg.getValue(i[d])(v),f.isUniform=!0)),!(t<0)){if(f.value&&f.value.transforms){const g=f.value.transforms[f.value.transforms.length-1];if(g.transform.glsl_return_type!==u.type){const v=gw[u.type];if(typeof v<"u"){const _=v[g.transform.glsl_return_type];if(typeof _<"u"){const{name:$,args:L}=_;f.value=f.value[$](...L)}}}f.isUniform=!1}else if(f.type==="float"&&typeof f.value=="number")f.value=Ol(f.value);else if(f.type.startsWith("vec")&&typeof f.value=="object"&&Array.isArray(f.value))f.isUniform=!1,f.value=`${f.type}(${f.value.map(Ol).join(", ")})`;else if(u.type==="sampler2D"){var h=f.value;f.value=()=>h.getTexture(),f.isUniform=!0}else if(f.value.getTexture&&u.type==="vec4"){var m=f.value;f.value=o(m),f.isUniform=!1}f.isUniform&&(f.name+=t)}return f})}function vw(e){var t={uniforms:[],glslFunctions:[],fragColor:""},r=ou(e,t)("st");t.fragColor=r;let n={};return t.uniforms.forEach(i=>n[i.name]=i),t.uniforms=Object.values(n),t}function ou(e,t){var r=()=>"";return e.forEach(n=>{var i=yw(n,t.uniforms.length);i.forEach(u=>{u.isUniform&&t.uniforms.push(u)}),_w(n,t.glslFunctions)||t.glslFunctions.push(n);var s=r;if(n.transform.type==="src")r=u=>`${os(u,n.name,i,t)}`;else if(n.transform.type==="coord")r=u=>`${s(`${os(u,n.name,i,t)}`)}`;else if(n.transform.type==="color")r=u=>`${os(`${s(u)}`,n.name,i,t)}`;else if(n.transform.type==="combine"){var o=i[0].value&&i[0].value.transforms?u=>`${ou(i[0].value.transforms,t)(u)}`:i[0].isUniform?()=>i[0].name:()=>i[0].value;r=u=>`${os(`${s(u)}, ${o(u)}`,n.name,i.slice(1),t)}`}else if(n.transform.type==="combineCoord"){var o=i[0].value&&i[0].value.transforms?d=>`${ou(i[0].value.transforms,t)(d)}`:i[0].isUniform?()=>i[0].name:()=>i[0].value;r=d=>`${s(`${os(`${d}, ${o(d)}`,n.name,i.slice(1),t)}`)}`}}),r}function os(e,t,r,n){const i=r.map(s=>s.isUniform?s.name:s.value&&s.value.transforms?`${ou(s.value.transforms,n)("st")}`:s.value).reduce((s,o)=>`${s}, ${o}`,"");return`${t}(${e}${i})`}function _w(e,t){for(var r=0;r<t.length;r++)if(e.name==t[r].name)return!0;return!1}const bw={_luminance:{type:"util",glsl:`float _luminance(vec3 rgb){
      const vec3 W = vec3(0.2125, 0.7154, 0.0721);
      return dot(rgb, W);
    }`},_noise:{type:"util",glsl:`
    //	Simplex 3D Noise
    //	by Ian McEwan, Ashima Arts
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float _noise(vec3 v){
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

  // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //  x0 = x0 - 0. + 0.0 * C
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

  // Permutations
    i = mod(i, 289.0 );
    vec4 p = permute( permute( permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  // Gradients
  // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

  //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

  // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                  dot(p2,x2), dot(p3,x3) ) );
  }
    `},_rgbToHsv:{type:"util",glsl:`vec3 _rgbToHsv(vec3 c){
            vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
            vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
            vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

            float d = q.x - min(q.w, q.y);
            float e = 1.0e-10;
            return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
        }`},_hsvToRgb:{type:"util",glsl:`vec3 _hsvToRgb(vec3 c){
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }`}};var Is=function(e){return this.transforms=[],this.transforms.push(e),this.defaultOutput=e.defaultOutput,this.synth=e.synth,this.type="GlslSource",this.defaultUniforms=e.defaultUniforms,this};Is.prototype.addTransform=function(e){this.transforms.push(e)};Is.prototype.out=function(e){var t=e||this.defaultOutput,r=this.glsl(t);if(this.synth.currentFunctions=[],t)try{t.render(r)}catch(n){console.log("shader could not compile",n)}};Is.prototype.glsl=function(){var e=[],t=[];return this.transforms.forEach(r=>{r.transform.type==="renderpass"?console.warn("no support for renderpass"):t.push(r)}),t.length>0&&e.push(this.compile(t)),e};Is.prototype.compile=function(e){var t=vw(e,this.synth),r={};t.uniforms.forEach(i=>{r[i.name]=i.value});var n=`
  precision ${this.defaultOutput.precision} float;
  ${Object.values(t.uniforms).map(i=>{let s=i.type;switch(i.type){case"texture":s="sampler2D";break}return`
      uniform ${s} ${i.name};`}).join("")}
  uniform float time;
  uniform vec2 resolution;
  varying vec2 uv;
  uniform sampler2D prevBuffer;

  ${Object.values(bw).map(i=>`
            ${i.glsl}
          `).join("")}

  ${t.glslFunctions.map(i=>`
            ${i.transform.glsl}
          `).join("")}

  void main () {
    vec4 c = vec4(1, 0, 0, 1);
    vec2 st = gl_FragCoord.xy/resolution.xy;
    gl_FragColor = ${t.fragColor};
  }
  `;return{frag:n,uniforms:Object.assign({},this.defaultUniforms,r)}};const ww=()=>[{name:"noise",type:"src",inputs:[{type:"float",name:"scale",default:10},{type:"float",name:"offset",default:.1}],glsl:"   return vec4(vec3(_noise(vec3(_st*scale, offset*time))), 1.0);"},{name:"voronoi",type:"src",inputs:[{type:"float",name:"scale",default:5},{type:"float",name:"speed",default:.3},{type:"float",name:"blending",default:.3}],glsl:`   vec3 color = vec3(.0);
   // Scale
   _st *= scale;
   // Tile the space
   vec2 i_st = floor(_st);
   vec2 f_st = fract(_st);
   float m_dist = 10.;  // minimun distance
   vec2 m_point;        // minimum point
   for (int j=-1; j<=1; j++ ) {
   for (int i=-1; i<=1; i++ ) {
   vec2 neighbor = vec2(float(i),float(j));
   vec2 p = i_st + neighbor;
   vec2 point = fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
   point = 0.5 + 0.5*sin(time*speed + 6.2831*point);
   vec2 diff = neighbor + point - f_st;
   float dist = length(diff);
   if( dist < m_dist ) {
   m_dist = dist;
   m_point = point;
   }
   }
   }
   // Assign a color using the closest point position
   color += dot(m_point,vec2(.3,.6));
   color *= 1.0 - blending*m_dist;
   return vec4(color, 1.0);`},{name:"osc",type:"src",inputs:[{type:"float",name:"frequency",default:60},{type:"float",name:"sync",default:.1},{type:"float",name:"offset",default:0}],glsl:`   vec2 st = _st;
   float r = sin((st.x-offset/frequency+time*sync)*frequency)*0.5  + 0.5;
   float g = sin((st.x+time*sync)*frequency)*0.5 + 0.5;
   float b = sin((st.x+offset/frequency+time*sync)*frequency)*0.5  + 0.5;
   return vec4(r, g, b, 1.0);`},{name:"shape",type:"src",inputs:[{type:"float",name:"sides",default:3},{type:"float",name:"radius",default:.3},{type:"float",name:"smoothing",default:.01}],glsl:`   vec2 st = _st * 2. - 1.;
   // Angle and radius from the current pixel
   float a = atan(st.x,st.y)+3.1416;
   float r = (2.*3.1416)/sides;
   float d = cos(floor(.5+a/r)*r-a)*length(st);
   return vec4(vec3(1.0-smoothstep(radius,radius + smoothing + 0.0000001,d)), 1.0);`},{name:"gradient",type:"src",inputs:[{type:"float",name:"speed",default:0}],glsl:"   return vec4(_st, sin(time*speed), 1.0);"},{name:"src",type:"src",inputs:[{type:"sampler2D",name:"tex",default:NaN}],glsl:`   //  vec2 uv = gl_FragCoord.xy/vec2(1280., 720.);
   return texture2D(tex, fract(_st));`},{name:"solid",type:"src",inputs:[{type:"float",name:"r",default:0},{type:"float",name:"g",default:0},{type:"float",name:"b",default:0},{type:"float",name:"a",default:1}],glsl:"   return vec4(r, g, b, a);"},{name:"rotate",type:"coord",inputs:[{type:"float",name:"angle",default:10},{type:"float",name:"speed",default:0}],glsl:`   vec2 xy = _st - vec2(0.5);
   float ang = angle + speed *time;
   xy = mat2(cos(ang),-sin(ang), sin(ang),cos(ang))*xy;
   xy += 0.5;
   return xy;`},{name:"scale",type:"coord",inputs:[{type:"float",name:"amount",default:1.5},{type:"float",name:"xMult",default:1},{type:"float",name:"yMult",default:1},{type:"float",name:"offsetX",default:.5},{type:"float",name:"offsetY",default:.5}],glsl:`   vec2 xy = _st - vec2(offsetX, offsetY);
   xy*=(1.0/vec2(amount*xMult, amount*yMult));
   xy+=vec2(offsetX, offsetY);
   return xy;
   `},{name:"pixelate",type:"coord",inputs:[{type:"float",name:"pixelX",default:20},{type:"float",name:"pixelY",default:20}],glsl:`   vec2 xy = vec2(pixelX, pixelY);
   return (floor(_st * xy) + 0.5)/xy;`},{name:"posterize",type:"color",inputs:[{type:"float",name:"bins",default:3},{type:"float",name:"gamma",default:.6}],glsl:`   vec4 c2 = pow(_c0, vec4(gamma));
   c2 *= vec4(bins);
   c2 = floor(c2);
   c2/= vec4(bins);
   c2 = pow(c2, vec4(1.0/gamma));
   return vec4(c2.xyz, _c0.a);`},{name:"shift",type:"color",inputs:[{type:"float",name:"r",default:.5},{type:"float",name:"g",default:0},{type:"float",name:"b",default:0},{type:"float",name:"a",default:0}],glsl:`   vec4 c2 = vec4(_c0);
   c2.r = fract(c2.r + r);
   c2.g = fract(c2.g + g);
   c2.b = fract(c2.b + b);
   c2.a = fract(c2.a + a);
   return vec4(c2.rgba);`},{name:"repeat",type:"coord",inputs:[{type:"float",name:"repeatX",default:3},{type:"float",name:"repeatY",default:3},{type:"float",name:"offsetX",default:0},{type:"float",name:"offsetY",default:0}],glsl:`   vec2 st = _st * vec2(repeatX, repeatY);
   st.x += step(1., mod(st.y,2.0)) * offsetX;
   st.y += step(1., mod(st.x,2.0)) * offsetY;
   return fract(st);`},{name:"modulateRepeat",type:"combineCoord",inputs:[{type:"float",name:"repeatX",default:3},{type:"float",name:"repeatY",default:3},{type:"float",name:"offsetX",default:.5},{type:"float",name:"offsetY",default:.5}],glsl:`   vec2 st = _st * vec2(repeatX, repeatY);
   st.x += step(1., mod(st.y,2.0)) + _c0.r * offsetX;
   st.y += step(1., mod(st.x,2.0)) + _c0.g * offsetY;
   return fract(st);`},{name:"repeatX",type:"coord",inputs:[{type:"float",name:"reps",default:3},{type:"float",name:"offset",default:0}],glsl:`   vec2 st = _st * vec2(reps, 1.0);
   //  float f =  mod(_st.y,2.0);
   st.y += step(1., mod(st.x,2.0))* offset;
   return fract(st);`},{name:"modulateRepeatX",type:"combineCoord",inputs:[{type:"float",name:"reps",default:3},{type:"float",name:"offset",default:.5}],glsl:`   vec2 st = _st * vec2(reps, 1.0);
   //  float f =  mod(_st.y,2.0);
   st.y += step(1., mod(st.x,2.0)) + _c0.r * offset;
   return fract(st);`},{name:"repeatY",type:"coord",inputs:[{type:"float",name:"reps",default:3},{type:"float",name:"offset",default:0}],glsl:`   vec2 st = _st * vec2(1.0, reps);
   //  float f =  mod(_st.y,2.0);
   st.x += step(1., mod(st.y,2.0))* offset;
   return fract(st);`},{name:"modulateRepeatY",type:"combineCoord",inputs:[{type:"float",name:"reps",default:3},{type:"float",name:"offset",default:.5}],glsl:`   vec2 st = _st * vec2(reps, 1.0);
   //  float f =  mod(_st.y,2.0);
   st.x += step(1., mod(st.y,2.0)) + _c0.r * offset;
   return fract(st);`},{name:"kaleid",type:"coord",inputs:[{type:"float",name:"nSides",default:4}],glsl:`   vec2 st = _st;
   st -= 0.5;
   float r = length(st);
   float a = atan(st.y, st.x);
   float pi = 2.*3.1416;
   a = mod(a,pi/nSides);
   a = abs(a-pi/nSides/2.);
   return r*vec2(cos(a), sin(a));`},{name:"modulateKaleid",type:"combineCoord",inputs:[{type:"float",name:"nSides",default:4}],glsl:`   vec2 st = _st - 0.5;
   float r = length(st);
   float a = atan(st.y, st.x);
   float pi = 2.*3.1416;
   a = mod(a,pi/nSides);
   a = abs(a-pi/nSides/2.);
   return (_c0.r+r)*vec2(cos(a), sin(a));`},{name:"scroll",type:"coord",inputs:[{type:"float",name:"scrollX",default:.5},{type:"float",name:"scrollY",default:.5},{type:"float",name:"speedX",default:0},{type:"float",name:"speedY",default:0}],glsl:`
   _st.x += scrollX + time*speedX;
   _st.y += scrollY + time*speedY;
   return fract(_st);`},{name:"scrollX",type:"coord",inputs:[{type:"float",name:"scrollX",default:.5},{type:"float",name:"speed",default:0}],glsl:`   _st.x += scrollX + time*speed;
   return fract(_st);`},{name:"modulateScrollX",type:"combineCoord",inputs:[{type:"float",name:"scrollX",default:.5},{type:"float",name:"speed",default:0}],glsl:`   _st.x += _c0.r*scrollX + time*speed;
   return fract(_st);`},{name:"scrollY",type:"coord",inputs:[{type:"float",name:"scrollY",default:.5},{type:"float",name:"speed",default:0}],glsl:`   _st.y += scrollY + time*speed;
   return fract(_st);`},{name:"modulateScrollY",type:"combineCoord",inputs:[{type:"float",name:"scrollY",default:.5},{type:"float",name:"speed",default:0}],glsl:`   _st.y += _c0.r*scrollY + time*speed;
   return fract(_st);`},{name:"add",type:"combine",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return (_c0+_c1)*amount + _c0*(1.0-amount);"},{name:"sub",type:"combine",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return (_c0-_c1)*amount + _c0*(1.0-amount);"},{name:"layer",type:"combine",inputs:[],glsl:"   return vec4(mix(_c0.rgb, _c1.rgb, _c1.a), clamp(_c0.a + _c1.a, 0.0, 1.0));"},{name:"blend",type:"combine",inputs:[{type:"float",name:"amount",default:.5}],glsl:"   return _c0*(1.0-amount)+_c1*amount;"},{name:"mult",type:"combine",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return _c0*(1.0-amount)+(_c0*_c1)*amount;"},{name:"diff",type:"combine",inputs:[],glsl:"   return vec4(abs(_c0.rgb-_c1.rgb), max(_c0.a, _c1.a));"},{name:"modulate",type:"combineCoord",inputs:[{type:"float",name:"amount",default:.1}],glsl:`   //  return fract(st+(_c0.xy-0.5)*amount);
   return _st + _c0.xy*amount;`},{name:"modulateScale",type:"combineCoord",inputs:[{type:"float",name:"multiple",default:1},{type:"float",name:"offset",default:1}],glsl:`   vec2 xy = _st - vec2(0.5);
   xy*=(1.0/vec2(offset + multiple*_c0.r, offset + multiple*_c0.g));
   xy+=vec2(0.5);
   return xy;`},{name:"modulatePixelate",type:"combineCoord",inputs:[{type:"float",name:"multiple",default:10},{type:"float",name:"offset",default:3}],glsl:`   vec2 xy = vec2(offset + _c0.x*multiple, offset + _c0.y*multiple);
   return (floor(_st * xy) + 0.5)/xy;`},{name:"modulateRotate",type:"combineCoord",inputs:[{type:"float",name:"multiple",default:1},{type:"float",name:"offset",default:0}],glsl:`   vec2 xy = _st - vec2(0.5);
   float angle = offset + _c0.x * multiple;
   xy = mat2(cos(angle),-sin(angle), sin(angle),cos(angle))*xy;
   xy += 0.5;
   return xy;`},{name:"modulateHue",type:"combineCoord",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return _st + (vec2(_c0.g - _c0.r, _c0.b - _c0.g) * amount * 1.0/resolution);"},{name:"invert",type:"color",inputs:[{type:"float",name:"amount",default:1}],glsl:"   return vec4((1.0-_c0.rgb)*amount + _c0.rgb*(1.0-amount), _c0.a);"},{name:"contrast",type:"color",inputs:[{type:"float",name:"amount",default:1.6}],glsl:`   vec4 c = (_c0-vec4(0.5))*vec4(amount) + vec4(0.5);
   return vec4(c.rgb, _c0.a);`},{name:"brightness",type:"color",inputs:[{type:"float",name:"amount",default:.4}],glsl:"   return vec4(_c0.rgb + vec3(amount), _c0.a);"},{name:"mask",type:"combine",inputs:[],glsl:`   float a = _luminance(_c1.rgb);
  return vec4(_c0.rgb*a, a*_c0.a);`},{name:"luma",type:"color",inputs:[{type:"float",name:"threshold",default:.5},{type:"float",name:"tolerance",default:.1}],glsl:`   float a = smoothstep(threshold-(tolerance+0.0000001), threshold+(tolerance+0.0000001), _luminance(_c0.rgb));
   return vec4(_c0.rgb*a, a);`},{name:"thresh",type:"color",inputs:[{type:"float",name:"threshold",default:.5},{type:"float",name:"tolerance",default:.04}],glsl:"   return vec4(vec3(smoothstep(threshold-(tolerance+0.0000001), threshold+(tolerance+0.0000001), _luminance(_c0.rgb))), _c0.a);"},{name:"color",type:"color",inputs:[{type:"float",name:"r",default:1},{type:"float",name:"g",default:1},{type:"float",name:"b",default:1},{type:"float",name:"a",default:1}],glsl:`   vec4 c = vec4(r, g, b, a);
   vec4 pos = step(0.0, c); // detect whether negative
   // if > 0, return r * _c0
   // if < 0 return (1.0-r) * _c0
   return vec4(mix((1.0-_c0)*abs(c), c*_c0, pos));`},{name:"saturate",type:"color",inputs:[{type:"float",name:"amount",default:2}],glsl:`   const vec3 W = vec3(0.2125, 0.7154, 0.0721);
   vec3 intensity = vec3(dot(_c0.rgb, W));
   return vec4(mix(intensity, _c0.rgb, amount), _c0.a);`},{name:"hue",type:"color",inputs:[{type:"float",name:"hue",default:.4}],glsl:`   vec3 c = _rgbToHsv(_c0.rgb);
   c.r += hue;
   //  c.r = fract(c.r);
   return vec4(_hsvToRgb(c), _c0.a);`},{name:"colorama",type:"color",inputs:[{type:"float",name:"amount",default:.005}],glsl:`   vec3 c = _rgbToHsv(_c0.rgb);
   c += vec3(amount);
   c = _hsvToRgb(c);
   c = fract(c);
   return vec4(c, _c0.a);`},{name:"prev",type:"src",inputs:[],glsl:"   return texture2D(prevBuffer, fract(_st));"},{name:"sum",type:"color",inputs:[{type:"vec4",name:"scale",default:1}],glsl:`   vec4 v = _c0 * s;
   return v.r + v.g + v.b + v.a;
   }
   float sum(vec2 _st, vec4 s) { // vec4 is not a typo, because argument type is not overloaded
   vec2 v = _st.xy * s.xy;
   return v.x + v.y;`},{name:"r",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.r * scale + offset);"},{name:"g",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.g * scale + offset);"},{name:"b",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.b * scale + offset);"},{name:"a",type:"color",inputs:[{type:"float",name:"scale",default:1},{type:"float",name:"offset",default:0}],glsl:"   return vec4(_c0.a * scale + offset);"}];class xw{constructor({defaultUniforms:t,defaultOutput:r,extendTransforms:n=[],changeListener:i=()=>{}}={}){this.defaultOutput=r,this.defaultUniforms=t,this.changeListener=i,this.extendTransforms=n,this.generators={},this.init()}init(){const t=ww();return this.glslTransforms={},this.generators=Object.entries(this.generators).reduce((r,[n,i])=>(this.changeListener({type:"remove",synth:this,method:n}),r),{}),this.sourceClass=class extends Is{},Array.isArray(this.extendTransforms)?t.concat(this.extendTransforms):typeof this.extendTransforms=="object"&&this.extendTransforms.type&&t.push(this.extendTransforms),t.map(r=>this.setFunction(r))}_addMethod(t,r){const n=this;if(this.glslTransforms[t]=r,r.type==="src"){const i=(...s)=>new this.sourceClass({name:t,transform:r,userArgs:s,defaultOutput:this.defaultOutput,defaultUniforms:this.defaultUniforms,synth:n});return this.generators[t]=i,this.changeListener({type:"add",synth:this,method:t}),i}else this.sourceClass.prototype[t]=function(...i){return this.transforms.push({name:t,transform:r,userArgs:i,synth:n}),this}}setFunction(t){var r=Ew(t);r&&this._addMethod(t.name,r)}}const $w={src:{returnType:"vec4",args:["vec2 _st"]},coord:{returnType:"vec2",args:["vec2 _st"]},color:{returnType:"vec4",args:["vec4 _c0"]},combine:{returnType:"vec4",args:["vec4 _c0","vec4 _c1"]},combineCoord:{returnType:"vec2",args:["vec2 _st","vec4 _c0"]}};function Ew(e){let t=$w[e.type];if(t){let r=t.args.map(o=>o).join(", "),n=e.inputs.map(o=>`${o.type} ${o.name}`).join(", "),i=`${r}${n.length>0?", "+n:""}`,s=`
  ${t.returnType} ${e.name}(${i}) {
      ${e.glsl}
  }
`;return(e.type==="combine"||e.type==="combineCoord")&&e.inputs.unshift({name:"color",type:"vec4"}),Object.assign({},e,{glsl:s})}else console.warn(`type ${e.type} not recognized`,e)}var nu={exports:{}},Sw=nu.exports,Jc;function Tw(){return Jc||(Jc=1,function(e,t){(function(r,n){e.exports=n()})(Sw,function(){var r=function(p){return p instanceof Uint8Array||p instanceof Uint16Array||p instanceof Uint32Array||p instanceof Int8Array||p instanceof Int16Array||p instanceof Int32Array||p instanceof Float32Array||p instanceof Float64Array||p instanceof Uint8ClampedArray},n=function(p,S){for(var M=Object.keys(S),ne=0;ne<M.length;++ne)p[M[ne]]=S[M[ne]];return p},i=`
`;function s(p){return typeof atob<"u"?atob(p):"base64:"+p}function o(p){var S=new Error("(regl) "+p);throw console.error(S),S}function u(p,S){p||o(S)}function d(p){return p?": "+p:""}function f(p,S,M){p in S||o("unknown parameter ("+p+")"+d(M)+". possible values: "+Object.keys(S).join())}function h(p,S){r(p)||o("invalid parameter type"+d(S)+". must be a typed array")}function m(p,S){switch(S){case"number":return typeof p=="number";case"object":return typeof p=="object";case"string":return typeof p=="string";case"boolean":return typeof p=="boolean";case"function":return typeof p=="function";case"undefined":return typeof p>"u";case"symbol":return typeof p=="symbol"}}function g(p,S,M){m(p,S)||o("invalid parameter type"+d(M)+". expected "+S+", got "+typeof p)}function v(p,S){p>=0&&(p|0)===p||o("invalid parameter type, ("+p+")"+d(S)+". must be a nonnegative integer")}function _(p,S,M){S.indexOf(p)<0&&o("invalid value"+d(M)+". must be one of: "+S)}var $=["gl","canvas","container","attributes","pixelRatio","extensions","optionalExtensions","profile","onDone"];function L(p){Object.keys(p).forEach(function(S){$.indexOf(S)<0&&o('invalid regl constructor argument "'+S+'". must be one of '+$)})}function T(p,S){for(p=p+"";p.length<S;)p=" "+p;return p}function b(){this.name="unknown",this.lines=[],this.index={},this.hasErrors=!1}function N(p,S){this.number=p,this.line=S,this.errors=[]}function B(p,S,M){this.file=p,this.line=S,this.message=M}function W(){var p=new Error,S=(p.stack||p).toString(),M=/compileProcedure.*\n\s*at.*\((.*)\)/.exec(S);if(M)return M[1];var ne=/compileProcedure.*\n\s*at\s+(.*)(\n|$)/.exec(S);return ne?ne[1]:"unknown"}function ae(){var p=new Error,S=(p.stack||p).toString(),M=/at REGLCommand.*\n\s+at.*\((.*)\)/.exec(S);if(M)return M[1];var ne=/at REGLCommand.*\n\s+at\s+(.*)\n/.exec(S);return ne?ne[1]:"unknown"}function Q(p,S){var M=p.split(`
`),ne=1,pe=0,re={unknown:new b,0:new b};re.unknown.name=re[0].name=S||W(),re.unknown.lines.push(new N(0,""));for(var oe=0;oe<M.length;++oe){var Ee=M[oe],Te=/^\s*#\s*(\w+)\s+(.+)\s*$/.exec(Ee);if(Te)switch(Te[1]){case"line":var Ce=/(\d+)(\s+\d+)?/.exec(Te[2]);Ce&&(ne=Ce[1]|0,Ce[2]&&(pe=Ce[2]|0,pe in re||(re[pe]=new b)));break;case"define":var ke=/SHADER_NAME(_B64)?\s+(.*)$/.exec(Te[2]);ke&&(re[pe].name=ke[1]?s(ke[2]):ke[2]);break}re[pe].lines.push(new N(ne++,Ee))}return Object.keys(re).forEach(function(Be){var Pe=re[Be];Pe.lines.forEach(function(Se){Pe.index[Se.number]=Se})}),re}function ge(p){var S=[];return p.split(`
`).forEach(function(M){if(!(M.length<5)){var ne=/^ERROR:\s+(\d+):(\d+):\s*(.*)$/.exec(M);ne?S.push(new B(ne[1]|0,ne[2]|0,ne[3].trim())):M.length>0&&S.push(new B("unknown",0,M))}}),S}function ze(p,S){S.forEach(function(M){var ne=p[M.file];if(ne){var pe=ne.index[M.line];if(pe){pe.errors.push(M),ne.hasErrors=!0;return}}p.unknown.hasErrors=!0,p.unknown.lines[0].errors.push(M)})}function Xe(p,S,M,ne,pe){if(!p.getShaderParameter(S,p.COMPILE_STATUS)){var re=p.getShaderInfoLog(S),oe=ne===p.FRAGMENT_SHADER?"fragment":"vertex";J(M,"string",oe+" shader source must be a string",pe);var Ee=Q(M,pe),Te=ge(re);ze(Ee,Te),Object.keys(Ee).forEach(function(Ce){var ke=Ee[Ce];if(!ke.hasErrors)return;var Be=[""],Pe=[""];function Se(Le,X){Be.push(Le),Pe.push(X||"")}Se("file number "+Ce+": "+ke.name+`
`,"color:red;text-decoration:underline;font-weight:bold"),ke.lines.forEach(function(Le){if(Le.errors.length>0){Se(T(Le.number,4)+"|  ","background-color:yellow; font-weight:bold"),Se(Le.line+i,"color:red; background-color:yellow; font-weight:bold");var X=0;Le.errors.forEach(function(ue){var Ie=ue.message,Ue=/^\s*'(.*)'\s*:\s*(.*)$/.exec(Ie);if(Ue){var _e=Ue[1];switch(Ie=Ue[2],_e){case"assign":_e="=";break}X=Math.max(Le.line.indexOf(_e,X),0)}else X=0;Se(T("| ",6)),Se(T("^^^",X+3)+i,"font-weight:bold"),Se(T("| ",6)),Se(Ie+i,"font-weight:bold")}),Se(T("| ",6)+i)}else Se(T(Le.number,4)+"|  "),Se(Le.line+i,"color:red")}),typeof document<"u"&&!window.chrome?(Pe[0]=Be.join("%c"),console.log.apply(console,Pe)):console.log(Be.join(""))}),u.raise("Error compiling "+oe+" shader, "+Ee[0].name)}}function nt(p,S,M,ne,pe){if(!p.getProgramParameter(S,p.LINK_STATUS)){var re=p.getProgramInfoLog(S),oe=Q(M,pe),Ee=Q(ne,pe),Te='Error linking program with vertex shader, "'+Ee[0].name+'", and fragment shader "'+oe[0].name+'"';typeof document<"u"?console.log("%c"+Te+i+"%c"+re,"color:red;text-decoration:underline;font-weight:bold","color:red"):console.log(Te+i+re),u.raise(Te)}}function Je(p){p._commandRef=W()}function F(p,S,M,ne){Je(p);function pe(Te){return Te?ne.id(Te):0}p._fragId=pe(p.static.frag),p._vertId=pe(p.static.vert);function re(Te,Ce){Object.keys(Ce).forEach(function(ke){Te[ne.id(ke)]=!0})}var oe=p._uniformSet={};re(oe,S.static),re(oe,S.dynamic);var Ee=p._attributeSet={};re(Ee,M.static),re(Ee,M.dynamic),p._hasCount="count"in p.static||"count"in p.dynamic||"elements"in p.static||"elements"in p.dynamic}function R(p,S){var M=ae();o(p+" in command "+(S||W())+(M==="unknown"?"":" called from "+M))}function te(p,S,M){p||R(S,M||W())}function U(p,S,M,ne){p in S||R("unknown parameter ("+p+")"+d(M)+". possible values: "+Object.keys(S).join(),ne||W())}function J(p,S,M,ne){m(p,S)||R("invalid parameter type"+d(M)+". expected "+S+", got "+typeof p,ne||W())}function $e(p){p()}function Oe(p,S,M){p.texture?_(p.texture._texture.internalformat,S,"unsupported texture format for attachment"):_(p.renderbuffer._renderbuffer.format,M,"unsupported renderbuffer format for attachment")}var He=33071,ie=9728,me=9984,Ve=9985,de=9986,We=9987,Dt=5120,Ut=5121,zt=5122,Mt=5123,Et=5124,Jt=5125,er=5126,hr=32819,Ea=32820,fi=33635,Gr=34042,Cs=36193,mr={};mr[Dt]=mr[Ut]=1,mr[zt]=mr[Mt]=mr[Cs]=mr[fi]=mr[hr]=mr[Ea]=2,mr[Et]=mr[Jt]=mr[er]=mr[Gr]=4;function Os(p,S){return p===Ea||p===hr||p===fi?2:p===Gr?4:mr[p]*S}function An(p){return!(p&p-1)&&!!p}function ci(p,S,M){var ne,pe=S.width,re=S.height,oe=S.channels;u(pe>0&&pe<=M.maxTextureSize&&re>0&&re<=M.maxTextureSize,"invalid texture shape"),(p.wrapS!==He||p.wrapT!==He)&&u(An(pe)&&An(re),"incompatible wrap mode for texture, both width and height must be power of 2"),S.mipmask===1?pe!==1&&re!==1&&u(p.minFilter!==me&&p.minFilter!==de&&p.minFilter!==Ve&&p.minFilter!==We,"min filter requires mipmap"):(u(An(pe)&&An(re),"texture must be a square power of 2 to support mipmapping"),u(S.mipmask===(pe<<1)-1,"missing or incomplete mipmap data")),S.type===er&&(M.extensions.indexOf("oes_texture_float_linear")<0&&u(p.minFilter===ie&&p.magFilter===ie,"filter not supported, must enable oes_texture_float_linear"),u(!p.genMipmaps,"mipmap generation not supported with float textures"));var Ee=S.images;for(ne=0;ne<16;++ne)if(Ee[ne]){var Te=pe>>ne,Ce=re>>ne;u(S.mipmask&1<<ne,"missing mipmap data");var ke=Ee[ne];if(u(ke.width===Te&&ke.height===Ce,"invalid shape for mip images"),u(ke.format===S.format&&ke.internalformat===S.internalformat&&ke.type===S.type,"incompatible type for mip image"),!ke.compressed)if(ke.data){var Be=Math.ceil(Os(ke.type,oe)*Te/ke.unpackAlignment)*ke.unpackAlignment;u(ke.data.byteLength===Be*Ce,"invalid data for image, buffer size is inconsistent with image format")}else ke.element||ke.copy}else p.genMipmaps||u((S.mipmask&1<<ne)===0,"extra mipmap data");S.compressed&&u(!p.genMipmaps,"mipmap generation for compressed images not supported")}function Rs(p,S,M,ne){var pe=p.width,re=p.height,oe=p.channels;u(pe>0&&pe<=ne.maxTextureSize&&re>0&&re<=ne.maxTextureSize,"invalid texture shape"),u(pe===re,"cube map must be square"),u(S.wrapS===He&&S.wrapT===He,"wrap mode not supported by cube map");for(var Ee=0;Ee<M.length;++Ee){var Te=M[Ee];u(Te.width===pe&&Te.height===re,"inconsistent cube map face shape"),S.genMipmaps&&(u(!Te.compressed,"can not generate mipmap for compressed textures"),u(Te.mipmask===1,"can not specify mipmaps and generate mipmaps"));for(var Ce=Te.images,ke=0;ke<16;++ke){var Be=Ce[ke];if(Be){var Pe=pe>>ke,Se=re>>ke;u(Te.mipmask&1<<ke,"missing mipmap data"),u(Be.width===Pe&&Be.height===Se,"invalid shape for mip images"),u(Be.format===p.format&&Be.internalformat===p.internalformat&&Be.type===p.type,"incompatible type for mip image"),Be.compressed||(Be.data?u(Be.data.byteLength===Pe*Se*Math.max(Os(Be.type,oe),Be.unpackAlignment),"invalid data for image, buffer size is inconsistent with image format"):Be.element||Be.copy)}}}}var I=n(u,{optional:$e,raise:o,commandRaise:R,command:te,parameter:f,commandParameter:U,constructor:L,type:g,commandType:J,isTypedArray:h,nni:v,oneOf:_,shaderError:Xe,linkError:nt,callSite:ae,saveCommandRef:Je,saveDrawInfo:F,framebufferFormat:Oe,guessCommand:W,texture2D:ci,textureCube:Rs}),zs=0,ta=0,Ft=5,pi=6;function ra(p,S){this.id=zs++,this.type=p,this.data=S}function In(p){return p.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}function Tr(p){if(p.length===0)return[];var S=p.charAt(0),M=p.charAt(p.length-1);if(p.length>1&&S===M&&(S==='"'||S==="'"))return['"'+In(p.substr(1,p.length-2))+'"'];var ne=/\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(p);if(ne)return Tr(p.substr(0,ne.index)).concat(Tr(ne[1])).concat(Tr(p.substr(ne.index+ne[0].length)));var pe=p.split(".");if(pe.length===1)return['"'+In(p)+'"'];for(var re=[],oe=0;oe<pe.length;++oe)re=re.concat(Tr(pe[oe]));return re}function Sa(p){return"["+Tr(p).join("][")+"]"}function Bs(p,S){return new ra(p,Sa(S+""))}function ca(p){return typeof p=="function"&&!p._reglType||p instanceof ra}function hi(p,S){if(typeof p=="function")return new ra(ta,p);if(typeof p=="number"||typeof p=="boolean")return new ra(Ft,p);if(Array.isArray(p))return new ra(pi,p.map((M,ne)=>hi(M,S+"["+ne+"]")));if(p instanceof ra)return p;I(!1,"invalid option type in uniform "+S)}var _r={DynamicVariable:ra,define:Bs,isDynamic:ca,unbox:hi,accessor:Sa},Cn={next:typeof requestAnimationFrame=="function"?function(p){return requestAnimationFrame(p)}:function(p){return setTimeout(p,16)},cancel:typeof cancelAnimationFrame=="function"?function(p){return cancelAnimationFrame(p)}:clearTimeout},mi=typeof performance<"u"&&performance.now?function(){return performance.now()}:function(){return+new Date};function _u(){var p={"":0},S=[""];return{id:function(M){var ne=p[M];return ne||(ne=p[M]=S.length,S.push(M),ne)},str:function(M){return S[M]}}}function bu(p,S,M){var ne=document.createElement("canvas");n(ne.style,{border:0,margin:0,padding:0,top:0,left:0}),p.appendChild(ne),p===document.body&&(ne.style.position="absolute",n(p.style,{margin:0,padding:0}));function pe(){var Ee=window.innerWidth,Te=window.innerHeight;if(p!==document.body){var Ce=p.getBoundingClientRect();Ee=Ce.right-Ce.left,Te=Ce.bottom-Ce.top}ne.width=M*Ee,ne.height=M*Te,n(ne.style,{width:Ee+"px",height:Te+"px"})}var re;p!==document.body&&typeof ResizeObserver=="function"?(re=new ResizeObserver(function(){setTimeout(pe)}),re.observe(p)):window.addEventListener("resize",pe,!1);function oe(){re?re.disconnect():window.removeEventListener("resize",pe),p.removeChild(ne)}return pe(),{canvas:ne,onDestroy:oe}}function wu(p,S){function M(ne){try{return p.getContext(ne,S)}catch{return null}}return M("webgl")||M("experimental-webgl")||M("webgl-experimental")}function xu(p){return typeof p.nodeName=="string"&&typeof p.appendChild=="function"&&typeof p.getBoundingClientRect=="function"}function Ls(p){return typeof p.drawArrays=="function"||typeof p.drawElements=="function"}function gi(p){return typeof p=="string"?p.split():(I(Array.isArray(p),"invalid extension array"),p)}function yi(p){return typeof p=="string"?(I(typeof document<"u","not supported outside of DOM"),document.querySelector(p)):p}function Ms(p){var S=p||{},M,ne,pe,re,oe={},Ee=[],Te=[],Ce=typeof window>"u"?1:window.devicePixelRatio,ke=!1,Be=function(Le){Le&&I.raise(Le)},Pe=function(){};if(typeof S=="string"?(I(typeof document<"u","selector queries only supported in DOM enviroments"),M=document.querySelector(S),I(M,"invalid query string for element")):typeof S=="object"?xu(S)?M=S:Ls(S)?(re=S,pe=re.canvas):(I.constructor(S),"gl"in S?re=S.gl:"canvas"in S?pe=yi(S.canvas):"container"in S&&(ne=yi(S.container)),"attributes"in S&&(oe=S.attributes,I.type(oe,"object","invalid context attributes")),"extensions"in S&&(Ee=gi(S.extensions)),"optionalExtensions"in S&&(Te=gi(S.optionalExtensions)),"onDone"in S&&(I.type(S.onDone,"function","invalid or missing onDone callback"),Be=S.onDone),"profile"in S&&(ke=!!S.profile),"pixelRatio"in S&&(Ce=+S.pixelRatio,I(Ce>0,"invalid pixel ratio"))):I.raise("invalid arguments to regl"),M&&(M.nodeName.toLowerCase()==="canvas"?pe=M:ne=M),!re){if(!pe){I(typeof document<"u","must manually specify webgl context outside of DOM environments");var Se=bu(ne||document.body,Be,Ce);if(!Se)return null;pe=Se.canvas,Pe=Se.onDestroy}oe.premultipliedAlpha===void 0&&(oe.premultipliedAlpha=!0),re=wu(pe,oe)}return re?{gl:re,canvas:pe,container:ne,extensions:Ee,optionalExtensions:Te,pixelRatio:Ce,profile:ke,onDone:Be,onDestroy:Pe}:(Pe(),Be("webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org"),null)}function Xt(p,S){var M={};function ne(oe){I.type(oe,"string","extension name must be string");var Ee=oe.toLowerCase(),Te;try{Te=M[Ee]=p.getExtension(Ee)}catch{}return!!Te}for(var pe=0;pe<S.extensions.length;++pe){var re=S.extensions[pe];if(!ne(re))return S.onDestroy(),S.onDone('"'+re+'" extension is not supported by the current WebGL context, try upgrading your system or a different browser'),null}return S.optionalExtensions.forEach(ne),{extensions:M,restore:function(){Object.keys(M).forEach(function(oe){if(M[oe]&&!ne(oe))throw new Error("(regl): error restoring extension "+oe)})}}}function gr(p,S){for(var M=Array(p),ne=0;ne<p;++ne)M[ne]=S(ne);return M}var Ns=5120,Ds=5121,Ta=5122,Ps=5123,Gs=5124,Fs=5125,Us=5126;function Vs(p){for(var S=16;S<=1<<28;S*=16)if(p<=S)return S;return 0}function vi(p){var S,M;return S=(p>65535)<<4,p>>>=S,M=(p>255)<<3,p>>>=M,S|=M,M=(p>15)<<2,p>>>=M,S|=M,M=(p>3)<<1,p>>>=M,S|=M,S|p>>1}function _i(){var p=gr(8,function(){return[]});function S(re){var oe=Vs(re),Ee=p[vi(oe)>>2];return Ee.length>0?Ee.pop():new ArrayBuffer(oe)}function M(re){p[vi(re.byteLength)>>2].push(re)}function ne(re,oe){var Ee=null;switch(re){case Ns:Ee=new Int8Array(S(oe),0,oe);break;case Ds:Ee=new Uint8Array(S(oe),0,oe);break;case Ta:Ee=new Int16Array(S(2*oe),0,oe);break;case Ps:Ee=new Uint16Array(S(2*oe),0,oe);break;case Gs:Ee=new Int32Array(S(4*oe),0,oe);break;case Fs:Ee=new Uint32Array(S(4*oe),0,oe);break;case Us:Ee=new Float32Array(S(4*oe),0,oe);break;default:return null}return Ee.length!==oe?Ee.subarray(0,oe):Ee}function pe(re){M(re.buffer)}return{alloc:S,free:M,allocType:ne,freeType:pe}}var Wt=_i();Wt.zero=_i();var Ws=3408,qs=3410,Hs=3411,js=3412,aa=3413,$u=3414,zr=3415,bi=33901,wi=33902,Fr=3379,Ks=3386,Eu=34921,na=36347,Su=36348,xi=35661,Ur=35660,$i=34930,yr=36349,kr=34076,Ei=34024,Tu=7936,ku=7937,Au=7938,Iu=35724,Cu=34047,Ou=36063,Ru=34852,qa=3553,Xs=34067,zu=34069,Bu=33984,Ha=6408,Si=5126,Ys=5121,Ti=36160,Lu=36053,Mu=36064,ki=16384,Ai=function(p,S){var M=1;S.ext_texture_filter_anisotropic&&(M=p.getParameter(Cu));var ne=1,pe=1;S.webgl_draw_buffers&&(ne=p.getParameter(Ru),pe=p.getParameter(Ou));var re=!!S.oes_texture_float;if(re){var oe=p.createTexture();p.bindTexture(qa,oe),p.texImage2D(qa,0,Ha,1,1,0,Ha,Si,null);var Ee=p.createFramebuffer();if(p.bindFramebuffer(Ti,Ee),p.framebufferTexture2D(Ti,Mu,qa,oe,0),p.bindTexture(qa,null),p.checkFramebufferStatus(Ti)!==Lu)re=!1;else{p.viewport(0,0,1,1),p.clearColor(1,0,0,1),p.clear(ki);var Te=Wt.allocType(Si,4);p.readPixels(0,0,1,1,Ha,Si,Te),p.getError()?re=!1:(p.deleteFramebuffer(Ee),p.deleteTexture(oe),re=Te[0]===1),Wt.freeType(Te)}}var Ce=typeof navigator<"u"&&(/MSIE/.test(navigator.userAgent)||/Trident\//.test(navigator.appVersion)||/Edge/.test(navigator.userAgent)),ke=!0;if(!Ce){var Be=p.createTexture(),Pe=Wt.allocType(Ys,36);p.activeTexture(Bu),p.bindTexture(Xs,Be),p.texImage2D(zu,0,Ha,3,3,0,Ha,Ys,Pe),Wt.freeType(Pe),p.bindTexture(Xs,null),p.deleteTexture(Be),ke=!p.getError()}return{colorBits:[p.getParameter(qs),p.getParameter(Hs),p.getParameter(js),p.getParameter(aa)],depthBits:p.getParameter($u),stencilBits:p.getParameter(zr),subpixelBits:p.getParameter(Ws),extensions:Object.keys(S).filter(function(Se){return!!S[Se]}),maxAnisotropic:M,maxDrawbuffers:ne,maxColorAttachments:pe,pointSizeDims:p.getParameter(bi),lineWidthDims:p.getParameter(wi),maxViewportDims:p.getParameter(Ks),maxCombinedTextureUnits:p.getParameter(xi),maxCubeMapSize:p.getParameter(kr),maxRenderbufferSize:p.getParameter(Ei),maxTextureUnits:p.getParameter($i),maxTextureSize:p.getParameter(Fr),maxAttributes:p.getParameter(Eu),maxVertexUniforms:p.getParameter(na),maxVertexTextureUnits:p.getParameter(Ur),maxVaryingVectors:p.getParameter(Su),maxFragmentUniforms:p.getParameter(yr),glsl:p.getParameter(Iu),renderer:p.getParameter(ku),vendor:p.getParameter(Tu),version:p.getParameter(Au),readFloat:re,npotTextureCube:ke}};function br(p){return!!p&&typeof p=="object"&&Array.isArray(p.shape)&&Array.isArray(p.stride)&&typeof p.offset=="number"&&p.shape.length===p.stride.length&&(Array.isArray(p.data)||r(p.data))}var xr=function(p){return Object.keys(p).map(function(S){return p[S]})},ka={shape:Js,flatten:On};function Nu(p,S,M){for(var ne=0;ne<S;++ne)M[ne]=p[ne]}function Du(p,S,M,ne){for(var pe=0,re=0;re<S;++re)for(var oe=p[re],Ee=0;Ee<M;++Ee)ne[pe++]=oe[Ee]}function Qs(p,S,M,ne,pe,re){for(var oe=re,Ee=0;Ee<S;++Ee)for(var Te=p[Ee],Ce=0;Ce<M;++Ce)for(var ke=Te[Ce],Be=0;Be<ne;++Be)pe[oe++]=ke[Be]}function Zs(p,S,M,ne,pe){for(var re=1,oe=M+1;oe<S.length;++oe)re*=S[oe];var Ee=S[M];if(S.length-M===4){var Te=S[M+1],Ce=S[M+2],ke=S[M+3];for(oe=0;oe<Ee;++oe)Qs(p[oe],Te,Ce,ke,ne,pe),pe+=re}else for(oe=0;oe<Ee;++oe)Zs(p[oe],S,M+1,ne,pe),pe+=re}function On(p,S,M,ne){var pe=1;if(S.length)for(var re=0;re<S.length;++re)pe*=S[re];else pe=0;var oe=ne||Wt.allocType(M,pe);switch(S.length){case 0:break;case 1:Nu(p,S[0],oe);break;case 2:Du(p,S[0],S[1],oe);break;case 3:Qs(p,S[0],S[1],S[2],oe,0);break;default:Zs(p,S,0,oe,0)}return oe}function Js(p){for(var S=[],M=p;M.length;M=M[0])S.push(M.length);return S}var Ii={"[object Int8Array]":5120,"[object Int16Array]":5122,"[object Int32Array]":5124,"[object Uint8Array]":5121,"[object Uint8ClampedArray]":5121,"[object Uint16Array]":5123,"[object Uint32Array]":5125,"[object Float32Array]":5126,"[object Float64Array]":5121,"[object ArrayBuffer]":5121},Pu=5120,Rn=5122,ia=5124,Br=5121,eo=5123,zn=5125,to=5126,ro=5126,pa={int8:Pu,int16:Rn,int32:ia,uint8:Br,uint16:eo,uint32:zn,float:to,float32:ro},Ci=35048,Gu=35040,ja={dynamic:Ci,stream:Gu,static:35044},Oi=ka.flatten,Ka=ka.shape,ao=35044,Fu=35040,Aa=5121,Ri=5126,sa=[];sa[5120]=1,sa[5122]=2,sa[5124]=4,sa[5121]=1,sa[5123]=2,sa[5125]=4,sa[5126]=4;function Xa(p){return Ii[Object.prototype.toString.call(p)]|0}function no(p,S){for(var M=0;M<S.length;++M)p[M]=S[M]}function io(p,S,M,ne,pe,re,oe){for(var Ee=0,Te=0;Te<M;++Te)for(var Ce=0;Ce<ne;++Ce)p[Ee++]=S[pe*Te+re*Ce+oe]}function Uu(p,S,M,ne){var pe=0,re={};function oe(X){this.id=pe++,this.buffer=p.createBuffer(),this.type=X,this.usage=ao,this.byteLength=0,this.dimension=1,this.dtype=Aa,this.persistentData=null,M.profile&&(this.stats={size:0})}oe.prototype.bind=function(){p.bindBuffer(this.type,this.buffer)},oe.prototype.destroy=function(){Pe(this)};var Ee=[];function Te(X,ue){var Ie=Ee.pop();return Ie||(Ie=new oe(X)),Ie.bind(),Be(Ie,ue,Fu,0,1,!1),Ie}function Ce(X){Ee.push(X)}function ke(X,ue,Ie){X.byteLength=ue.byteLength,p.bufferData(X.type,ue,Ie)}function Be(X,ue,Ie,Ue,_e,qe){var xe;if(X.usage=Ie,Array.isArray(ue)){if(X.dtype=Ue||Ri,ue.length>0){var Me;if(Array.isArray(ue[0])){xe=Ka(ue);for(var we=1,Ne=1;Ne<xe.length;++Ne)we*=xe[Ne];X.dimension=we,Me=Oi(ue,xe,X.dtype),ke(X,Me,Ie),qe?X.persistentData=Me:Wt.freeType(Me)}else if(typeof ue[0]=="number"){X.dimension=_e;var tt=Wt.allocType(X.dtype,ue.length);no(tt,ue),ke(X,tt,Ie),qe?X.persistentData=tt:Wt.freeType(tt)}else r(ue[0])?(X.dimension=ue[0].length,X.dtype=Ue||Xa(ue[0])||Ri,Me=Oi(ue,[ue.length,ue[0].length],X.dtype),ke(X,Me,Ie),qe?X.persistentData=Me:Wt.freeType(Me)):I.raise("invalid buffer data")}}else if(r(ue))X.dtype=Ue||Xa(ue),X.dimension=_e,ke(X,ue,Ie),qe&&(X.persistentData=new Uint8Array(new Uint8Array(ue.buffer)));else if(br(ue)){xe=ue.shape;var dt=ue.stride,Ge=ue.offset,Re=0,ve=0,lt=0,ht=0;xe.length===1?(Re=xe[0],ve=1,lt=dt[0],ht=0):xe.length===2?(Re=xe[0],ve=xe[1],lt=dt[0],ht=dt[1]):I.raise("invalid shape"),X.dtype=Ue||Xa(ue.data)||Ri,X.dimension=ve;var Ye=Wt.allocType(X.dtype,Re*ve);io(Ye,ue.data,Re,ve,lt,ht,Ge),ke(X,Ye,Ie),qe?X.persistentData=Ye:Wt.freeType(Ye)}else ue instanceof ArrayBuffer?(X.dtype=Aa,X.dimension=_e,ke(X,ue,Ie),qe&&(X.persistentData=new Uint8Array(new Uint8Array(ue)))):I.raise("invalid buffer data")}function Pe(X){S.bufferCount--,ne(X);var ue=X.buffer;I(ue,"buffer must not be deleted already"),p.deleteBuffer(ue),X.buffer=null,delete re[X.id]}function Se(X,ue,Ie,Ue){S.bufferCount++;var _e=new oe(ue);re[_e.id]=_e;function qe(we){var Ne=ao,tt=null,dt=0,Ge=0,Re=1;return Array.isArray(we)||r(we)||br(we)||we instanceof ArrayBuffer?tt=we:typeof we=="number"?dt=we|0:we&&(I.type(we,"object","buffer arguments must be an object, a number or an array"),"data"in we&&(I(tt===null||Array.isArray(tt)||r(tt)||br(tt),"invalid data for buffer"),tt=we.data),"usage"in we&&(I.parameter(we.usage,ja,"invalid buffer usage"),Ne=ja[we.usage]),"type"in we&&(I.parameter(we.type,pa,"invalid buffer type"),Ge=pa[we.type]),"dimension"in we&&(I.type(we.dimension,"number","invalid dimension"),Re=we.dimension|0),"length"in we&&(I.nni(dt,"buffer length must be a nonnegative integer"),dt=we.length|0)),_e.bind(),tt?Be(_e,tt,Ne,Ge,Re,Ue):(dt&&p.bufferData(_e.type,dt,Ne),_e.dtype=Ge||Aa,_e.usage=Ne,_e.dimension=Re,_e.byteLength=dt),M.profile&&(_e.stats.size=_e.byteLength*sa[_e.dtype]),qe}function xe(we,Ne){I(Ne+we.byteLength<=_e.byteLength,"invalid buffer subdata call, buffer is too small.  Can't write data of size "+we.byteLength+" starting from offset "+Ne+" to a buffer of size "+_e.byteLength),p.bufferSubData(_e.type,Ne,we)}function Me(we,Ne){var tt=(Ne||0)|0,dt;if(_e.bind(),r(we)||we instanceof ArrayBuffer)xe(we,tt);else if(Array.isArray(we)){if(we.length>0)if(typeof we[0]=="number"){var Ge=Wt.allocType(_e.dtype,we.length);no(Ge,we),xe(Ge,tt),Wt.freeType(Ge)}else if(Array.isArray(we[0])||r(we[0])){dt=Ka(we);var Re=Oi(we,dt,_e.dtype);xe(Re,tt),Wt.freeType(Re)}else I.raise("invalid buffer data")}else if(br(we)){dt=we.shape;var ve=we.stride,lt=0,ht=0,Ye=0,bt=0;dt.length===1?(lt=dt[0],ht=1,Ye=ve[0],bt=0):dt.length===2?(lt=dt[0],ht=dt[1],Ye=ve[0],bt=ve[1]):I.raise("invalid shape");var ft=Array.isArray(we.data)?_e.dtype:Xa(we.data),yt=Wt.allocType(ft,lt*ht);io(yt,we.data,lt,ht,Ye,bt,we.offset),xe(yt,tt),Wt.freeType(yt)}else I.raise("invalid data for buffer subdata");return qe}return Ie||qe(X),qe._reglType="buffer",qe._buffer=_e,qe.subdata=Me,M.profile&&(qe.stats=_e.stats),qe.destroy=function(){Pe(_e)},qe}function Le(){xr(re).forEach(function(X){X.buffer=p.createBuffer(),p.bindBuffer(X.type,X.buffer),p.bufferData(X.type,X.persistentData||X.byteLength,X.usage)})}return M.profile&&(S.getTotalBufferSize=function(){var X=0;return Object.keys(re).forEach(function(ue){X+=re[ue].stats.size}),X}),{create:Se,createStream:Te,destroyStream:Ce,clear:function(){xr(re).forEach(Pe),Ee.forEach(Pe)},getBuffer:function(X){return X&&X._buffer instanceof oe?X._buffer:null},restore:Le,_initBuffer:Be}}var so=0,Vu=0,Wu=1,qu=1,Hu=4,ju=4,Ia={points:so,point:Vu,lines:Wu,line:qu,triangles:Hu,triangle:ju,"line loop":2,"line strip":3,"triangle strip":5,"triangle fan":6},Ku=0,Xu=1,Ya=4,Yu=5120,Ca=5121,oo=5122,ha=5123,zi=5124,oa=5125,Bi=34963,Qu=35040,uo=35044;function lo(p,S,M,ne){var pe={},re=0,oe={uint8:Ca,uint16:ha};S.oes_element_index_uint&&(oe.uint32=oa);function Ee(Le){this.id=re++,pe[this.id]=this,this.buffer=Le,this.primType=Ya,this.vertCount=0,this.type=0}Ee.prototype.bind=function(){this.buffer.bind()};var Te=[];function Ce(Le){var X=Te.pop();return X||(X=new Ee(M.create(null,Bi,!0,!1)._buffer)),Be(X,Le,Qu,-1,-1,0,0),X}function ke(Le){Te.push(Le)}function Be(Le,X,ue,Ie,Ue,_e,qe){Le.buffer.bind();var xe;if(X){var Me=qe;!qe&&(!r(X)||br(X)&&!r(X.data))&&(Me=S.oes_element_index_uint?oa:ha),M._initBuffer(Le.buffer,X,ue,Me,3)}else p.bufferData(Bi,_e,ue),Le.buffer.dtype=xe||Ca,Le.buffer.usage=ue,Le.buffer.dimension=3,Le.buffer.byteLength=_e;if(xe=qe,!qe){switch(Le.buffer.dtype){case Ca:case Yu:xe=Ca;break;case ha:case oo:xe=ha;break;case oa:case zi:xe=oa;break;default:I.raise("unsupported type for element array")}Le.buffer.dtype=xe}Le.type=xe,I(xe!==oa||!!S.oes_element_index_uint,"32 bit element buffers not supported, enable oes_element_index_uint first");var we=Ue;we<0&&(we=Le.buffer.byteLength,xe===ha?we>>=1:xe===oa&&(we>>=2)),Le.vertCount=we;var Ne=Ie;if(Ie<0){Ne=Ya;var tt=Le.buffer.dimension;tt===1&&(Ne=Ku),tt===2&&(Ne=Xu),tt===3&&(Ne=Ya)}Le.primType=Ne}function Pe(Le){ne.elementsCount--,I(Le.buffer!==null,"must not double destroy elements"),delete pe[Le.id],Le.buffer.destroy(),Le.buffer=null}function Se(Le,X){var ue=M.create(null,Bi,!0),Ie=new Ee(ue._buffer);ne.elementsCount++;function Ue(_e){if(!_e)ue(),Ie.primType=Ya,Ie.vertCount=0,Ie.type=Ca;else if(typeof _e=="number")ue(_e),Ie.primType=Ya,Ie.vertCount=_e|0,Ie.type=Ca;else{var qe=null,xe=uo,Me=-1,we=-1,Ne=0,tt=0;Array.isArray(_e)||r(_e)||br(_e)?qe=_e:(I.type(_e,"object","invalid arguments for elements"),"data"in _e&&(qe=_e.data,I(Array.isArray(qe)||r(qe)||br(qe),"invalid data for element buffer")),"usage"in _e&&(I.parameter(_e.usage,ja,"invalid element buffer usage"),xe=ja[_e.usage]),"primitive"in _e&&(I.parameter(_e.primitive,Ia,"invalid element buffer primitive"),Me=Ia[_e.primitive]),"count"in _e&&(I(typeof _e.count=="number"&&_e.count>=0,"invalid vertex count for elements"),we=_e.count|0),"type"in _e&&(I.parameter(_e.type,oe,"invalid buffer type"),tt=oe[_e.type]),"length"in _e?Ne=_e.length|0:(Ne=we,tt===ha||tt===oo?Ne*=2:(tt===oa||tt===zi)&&(Ne*=4))),Be(Ie,qe,xe,Me,we,Ne,tt)}return Ue}return Ue(Le),Ue._reglType="elements",Ue._elements=Ie,Ue.subdata=function(_e,qe){return ue.subdata(_e,qe),Ue},Ue.destroy=function(){Pe(Ie)},Ue}return{create:Se,createStream:Ce,destroyStream:ke,getElements:function(Le){return typeof Le=="function"&&Le._elements instanceof Ee?Le._elements:null},clear:function(){xr(pe).forEach(Pe)}}}var Oa=new Float32Array(1),Zu=new Uint32Array(Oa.buffer),fo=5123;function co(p){for(var S=Wt.allocType(fo,p.length),M=0;M<p.length;++M)if(isNaN(p[M]))S[M]=65535;else if(p[M]===1/0)S[M]=31744;else if(p[M]===-1/0)S[M]=64512;else{Oa[0]=p[M];var ne=Zu[0],pe=ne>>>31<<15,re=(ne<<1>>>24)-127,oe=ne>>13&1023;if(re<-24)S[M]=pe;else if(re<-14){var Ee=-14-re;S[M]=pe+(oe+1024>>Ee)}else re>15?S[M]=pe+31744:S[M]=pe+(re+15<<10)+oe}return S}function qt(p){return Array.isArray(p)||r(p)}var po=function(p){return!(p&p-1)&&!!p},Li=34467,Ir=3553,Mi=34067,Bn=34069,ma=6408,Ni=6406,Ln=6407,Qa=6409,Mn=6410,ho=32854,Di=32855,Za=36194,Ja=32819,mo=32820,Ju=33635,el=34042,en=6402,Ra=34041,Nn=35904,Dn=35906,ga=36193,Pn=33776,Gn=33777,Fn=33778,Pi=33779,Gi=35986,Fi=35987,tn=34798,ut=35840,go=35841,Ui=35842,Vi=35843,rn=36196,vr=5121,za=5123,an=5125,Ba=5126,yo=10242,vo=10243,Wi=10497,Un=33071,_o=33648,bo=10240,Vn=10241,nn=9728,qi=9729,Wn=9984,Hi=9985,ji=9986,qn=9987,wo=33170,l=4352,c=4353,y=4354,w=34046,k=3317,j=37440,ye=37441,De=37443,je=37444,et=33984,vt=[Wn,ji,Hi,qn],At=[0,Qa,Mn,Ln,ma],Tt={};Tt[Qa]=Tt[Ni]=Tt[en]=1,Tt[Ra]=Tt[Mn]=2,Tt[Ln]=Tt[Nn]=3,Tt[ma]=Tt[Dn]=4;function Ht(p){return"[object "+p+"]"}var ya=Ht("HTMLCanvasElement"),xo=Ht("OffscreenCanvas"),Cf=Ht("CanvasRenderingContext2D"),Of=Ht("ImageBitmap"),Rf=Ht("HTMLImageElement"),zf=Ht("HTMLVideoElement"),T0=Object.keys(Ii).concat([ya,xo,Cf,Of,Rf,zf]),Hn=[];Hn[vr]=1,Hn[Ba]=4,Hn[ga]=2,Hn[za]=2,Hn[an]=4;var dr=[];dr[ho]=2,dr[Di]=2,dr[Za]=2,dr[Ra]=4,dr[Pn]=.5,dr[Gn]=.5,dr[Fn]=1,dr[Pi]=1,dr[Gi]=.5,dr[Fi]=1,dr[tn]=1,dr[ut]=.5,dr[go]=.25,dr[Ui]=.5,dr[Vi]=.25,dr[rn]=.5;function Bf(p){return Array.isArray(p)&&(p.length===0||typeof p[0]=="number")}function Lf(p){if(!Array.isArray(p))return!1;var S=p.length;return!(S===0||!qt(p[0]))}function sn(p){return Object.prototype.toString.call(p)}function Mf(p){return sn(p)===ya}function Nf(p){return sn(p)===xo}function k0(p){return sn(p)===Cf}function A0(p){return sn(p)===Of}function I0(p){return sn(p)===Rf}function C0(p){return sn(p)===zf}function tl(p){if(!p)return!1;var S=sn(p);return T0.indexOf(S)>=0?!0:Bf(p)||Lf(p)||br(p)}function Df(p){return Ii[Object.prototype.toString.call(p)]|0}function O0(p,S){var M=S.length;switch(p.type){case vr:case za:case an:case Ba:var ne=Wt.allocType(p.type,M);ne.set(S),p.data=ne;break;case ga:p.data=co(S);break;default:I.raise("unsupported texture type, must specify a typed array")}}function Pf(p,S){return Wt.allocType(p.type===ga?Ba:p.type,S)}function Gf(p,S){p.type===ga?(p.data=co(S),Wt.freeType(S)):p.data=S}function R0(p,S,M,ne,pe,re){for(var oe=p.width,Ee=p.height,Te=p.channels,Ce=oe*Ee*Te,ke=Pf(p,Ce),Be=0,Pe=0;Pe<Ee;++Pe)for(var Se=0;Se<oe;++Se)for(var Le=0;Le<Te;++Le)ke[Be++]=S[M*Se+ne*Pe+pe*Le+re];Gf(p,ke)}function $o(p,S,M,ne,pe,re){var oe;if(typeof dr[p]<"u"?oe=dr[p]:oe=Tt[p]*Hn[S],re&&(oe*=6),pe){for(var Ee=0,Te=M;Te>=1;)Ee+=oe*Te*Te,Te/=2;return Ee}else return oe*M*ne}function z0(p,S,M,ne,pe,re,oe){var Ee={"don't care":l,"dont care":l,nice:y,fast:c},Te={repeat:Wi,clamp:Un,mirror:_o},Ce={nearest:nn,linear:qi},ke=n({mipmap:qn,"nearest mipmap nearest":Wn,"linear mipmap nearest":Hi,"nearest mipmap linear":ji,"linear mipmap linear":qn},Ce),Be={none:0,browser:je},Pe={uint8:vr,rgba4:Ja,rgb565:Ju,"rgb5 a1":mo},Se={alpha:Ni,luminance:Qa,"luminance alpha":Mn,rgb:Ln,rgba:ma,rgba4:ho,"rgb5 a1":Di,rgb565:Za},Le={};S.ext_srgb&&(Se.srgb=Nn,Se.srgba=Dn),S.oes_texture_float&&(Pe.float32=Pe.float=Ba),S.oes_texture_half_float&&(Pe.float16=Pe["half float"]=ga),S.webgl_depth_texture&&(n(Se,{depth:en,"depth stencil":Ra}),n(Pe,{uint16:za,uint32:an,"depth stencil":el})),S.webgl_compressed_texture_s3tc&&n(Le,{"rgb s3tc dxt1":Pn,"rgba s3tc dxt1":Gn,"rgba s3tc dxt3":Fn,"rgba s3tc dxt5":Pi}),S.webgl_compressed_texture_atc&&n(Le,{"rgb atc":Gi,"rgba atc explicit alpha":Fi,"rgba atc interpolated alpha":tn}),S.webgl_compressed_texture_pvrtc&&n(Le,{"rgb pvrtc 4bppv1":ut,"rgb pvrtc 2bppv1":go,"rgba pvrtc 4bppv1":Ui,"rgba pvrtc 2bppv1":Vi}),S.webgl_compressed_texture_etc1&&(Le["rgb etc1"]=rn);var X=Array.prototype.slice.call(p.getParameter(Li));Object.keys(Le).forEach(function(z){var se=Le[z];X.indexOf(se)>=0&&(Se[z]=se)});var ue=Object.keys(Se);M.textureFormats=ue;var Ie=[];Object.keys(Se).forEach(function(z){var se=Se[z];Ie[se]=z});var Ue=[];Object.keys(Pe).forEach(function(z){var se=Pe[z];Ue[se]=z});var _e=[];Object.keys(Ce).forEach(function(z){var se=Ce[z];_e[se]=z});var qe=[];Object.keys(ke).forEach(function(z){var se=ke[z];qe[se]=z});var xe=[];Object.keys(Te).forEach(function(z){var se=Te[z];xe[se]=z});var Me=ue.reduce(function(z,se){var ee=Se[se];return ee===Qa||ee===Ni||ee===Qa||ee===Mn||ee===en||ee===Ra||S.ext_srgb&&(ee===Nn||ee===Dn)?z[ee]=ee:ee===Di||se.indexOf("rgba")>=0?z[ee]=ma:z[ee]=Ln,z},{});function we(){this.internalformat=ma,this.format=ma,this.type=vr,this.compressed=!1,this.premultiplyAlpha=!1,this.flipY=!1,this.unpackAlignment=1,this.colorSpace=je,this.width=0,this.height=0,this.channels=0}function Ne(z,se){z.internalformat=se.internalformat,z.format=se.format,z.type=se.type,z.compressed=se.compressed,z.premultiplyAlpha=se.premultiplyAlpha,z.flipY=se.flipY,z.unpackAlignment=se.unpackAlignment,z.colorSpace=se.colorSpace,z.width=se.width,z.height=se.height,z.channels=se.channels}function tt(z,se){if(!(typeof se!="object"||!se)){if("premultiplyAlpha"in se&&(I.type(se.premultiplyAlpha,"boolean","invalid premultiplyAlpha"),z.premultiplyAlpha=se.premultiplyAlpha),"flipY"in se&&(I.type(se.flipY,"boolean","invalid texture flip"),z.flipY=se.flipY),"alignment"in se&&(I.oneOf(se.alignment,[1,2,4,8],"invalid texture unpack alignment"),z.unpackAlignment=se.alignment),"colorSpace"in se&&(I.parameter(se.colorSpace,Be,"invalid colorSpace"),z.colorSpace=Be[se.colorSpace]),"type"in se){var ee=se.type;I(S.oes_texture_float||!(ee==="float"||ee==="float32"),"you must enable the OES_texture_float extension in order to use floating point textures."),I(S.oes_texture_half_float||!(ee==="half float"||ee==="float16"),"you must enable the OES_texture_half_float extension in order to use 16-bit floating point textures."),I(S.webgl_depth_texture||!(ee==="uint16"||ee==="uint32"||ee==="depth stencil"),"you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."),I.parameter(ee,Pe,"invalid texture type"),z.type=Pe[ee]}var Ke=z.width,wt=z.height,C=z.channels,E=!1;"shape"in se?(I(Array.isArray(se.shape)&&se.shape.length>=2,"shape must be an array"),Ke=se.shape[0],wt=se.shape[1],se.shape.length===3&&(C=se.shape[2],I(C>0&&C<=4,"invalid number of channels"),E=!0),I(Ke>=0&&Ke<=M.maxTextureSize,"invalid width"),I(wt>=0&&wt<=M.maxTextureSize,"invalid height")):("radius"in se&&(Ke=wt=se.radius,I(Ke>=0&&Ke<=M.maxTextureSize,"invalid radius")),"width"in se&&(Ke=se.width,I(Ke>=0&&Ke<=M.maxTextureSize,"invalid width")),"height"in se&&(wt=se.height,I(wt>=0&&wt<=M.maxTextureSize,"invalid height")),"channels"in se&&(C=se.channels,I(C>0&&C<=4,"invalid number of channels"),E=!0)),z.width=Ke|0,z.height=wt|0,z.channels=C|0;var P=!1;if("format"in se){var K=se.format;I(S.webgl_depth_texture||!(K==="depth"||K==="depth stencil"),"you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."),I.parameter(K,Se,"invalid texture format");var Y=z.internalformat=Se[K];z.format=Me[Y],K in Pe&&("type"in se||(z.type=Pe[K])),K in Le&&(z.compressed=!0),P=!0}!E&&P?z.channels=Tt[z.format]:E&&!P?z.channels!==At[z.format]&&(z.format=z.internalformat=At[z.channels]):P&&E&&I(z.channels===Tt[z.format],"number of channels inconsistent with specified format")}}function dt(z){p.pixelStorei(j,z.flipY),p.pixelStorei(ye,z.premultiplyAlpha),p.pixelStorei(De,z.colorSpace),p.pixelStorei(k,z.unpackAlignment)}function Ge(){we.call(this),this.xOffset=0,this.yOffset=0,this.data=null,this.needsFree=!1,this.element=null,this.needsCopy=!1}function Re(z,se){var ee=null;if(tl(se)?ee=se:se&&(I.type(se,"object","invalid pixel data type"),tt(z,se),"x"in se&&(z.xOffset=se.x|0),"y"in se&&(z.yOffset=se.y|0),tl(se.data)&&(ee=se.data)),I(!z.compressed||ee instanceof Uint8Array,"compressed texture data must be stored in a uint8array"),se.copy){I(!ee,"can not specify copy and data field for the same texture");var Ke=pe.viewportWidth,wt=pe.viewportHeight;z.width=z.width||Ke-z.xOffset,z.height=z.height||wt-z.yOffset,z.needsCopy=!0,I(z.xOffset>=0&&z.xOffset<Ke&&z.yOffset>=0&&z.yOffset<wt&&z.width>0&&z.width<=Ke&&z.height>0&&z.height<=wt,"copy texture read out of bounds")}else if(!ee)z.width=z.width||1,z.height=z.height||1,z.channels=z.channels||4;else if(r(ee))z.channels=z.channels||4,z.data=ee,!("type"in se)&&z.type===vr&&(z.type=Df(ee));else if(Bf(ee))z.channels=z.channels||4,O0(z,ee),z.alignment=1,z.needsFree=!0;else if(br(ee)){var C=ee.data;!Array.isArray(C)&&z.type===vr&&(z.type=Df(C));var E=ee.shape,P=ee.stride,K,Y,V,G,q,O;E.length===3?(V=E[2],O=P[2]):(I(E.length===2,"invalid ndarray pixel data, must be 2 or 3D"),V=1,O=1),K=E[0],Y=E[1],G=P[0],q=P[1],z.alignment=1,z.width=K,z.height=Y,z.channels=V,z.format=z.internalformat=At[V],z.needsFree=!0,R0(z,C,G,q,O,ee.offset)}else if(Mf(ee)||Nf(ee)||k0(ee))Mf(ee)||Nf(ee)?z.element=ee:z.element=ee.canvas,z.width=z.element.width,z.height=z.element.height,z.channels=4;else if(A0(ee))z.element=ee,z.width=ee.width,z.height=ee.height,z.channels=4;else if(I0(ee))z.element=ee,z.width=ee.naturalWidth,z.height=ee.naturalHeight,z.channels=4;else if(C0(ee))z.element=ee,z.width=ee.videoWidth,z.height=ee.videoHeight,z.channels=4;else if(Lf(ee)){var D=z.width||ee[0].length,A=z.height||ee.length,H=z.channels;qt(ee[0][0])?H=H||ee[0][0].length:H=H||1;for(var Z=ka.shape(ee),ce=1,he=0;he<Z.length;++he)ce*=Z[he];var le=Pf(z,ce);ka.flatten(ee,Z,"",le),Gf(z,le),z.alignment=1,z.width=D,z.height=A,z.channels=H,z.format=z.internalformat=At[H],z.needsFree=!0}z.type===Ba?I(M.extensions.indexOf("oes_texture_float")>=0,"oes_texture_float extension not enabled"):z.type===ga&&I(M.extensions.indexOf("oes_texture_half_float")>=0,"oes_texture_half_float extension not enabled")}function ve(z,se,ee){var Ke=z.element,wt=z.data,C=z.internalformat,E=z.format,P=z.type,K=z.width,Y=z.height;dt(z),Ke?p.texImage2D(se,ee,E,E,P,Ke):z.compressed?p.compressedTexImage2D(se,ee,C,K,Y,0,wt):z.needsCopy?(ne(),p.copyTexImage2D(se,ee,E,z.xOffset,z.yOffset,K,Y,0)):p.texImage2D(se,ee,E,K,Y,0,E,P,wt||null)}function lt(z,se,ee,Ke,wt){var C=z.element,E=z.data,P=z.internalformat,K=z.format,Y=z.type,V=z.width,G=z.height;dt(z),C?p.texSubImage2D(se,wt,ee,Ke,K,Y,C):z.compressed?p.compressedTexSubImage2D(se,wt,ee,Ke,P,V,G,E):z.needsCopy?(ne(),p.copyTexSubImage2D(se,wt,ee,Ke,z.xOffset,z.yOffset,V,G)):p.texSubImage2D(se,wt,ee,Ke,V,G,K,Y,E)}var ht=[];function Ye(){return ht.pop()||new Ge}function bt(z){z.needsFree&&Wt.freeType(z.data),Ge.call(z),ht.push(z)}function ft(){we.call(this),this.genMipmaps=!1,this.mipmapHint=l,this.mipmask=0,this.images=Array(16)}function yt(z,se,ee){var Ke=z.images[0]=Ye();z.mipmask=1,Ke.width=z.width=se,Ke.height=z.height=ee,Ke.channels=z.channels=4}function It(z,se){var ee=null;if(tl(se))ee=z.images[0]=Ye(),Ne(ee,z),Re(ee,se),z.mipmask=1;else if(tt(z,se),Array.isArray(se.mipmap))for(var Ke=se.mipmap,wt=0;wt<Ke.length;++wt)ee=z.images[wt]=Ye(),Ne(ee,z),ee.width>>=wt,ee.height>>=wt,Re(ee,Ke[wt]),z.mipmask|=1<<wt;else ee=z.images[0]=Ye(),Ne(ee,z),Re(ee,se),z.mipmask=1;Ne(z,z.images[0]),z.compressed&&(z.internalformat===Pn||z.internalformat===Gn||z.internalformat===Fn||z.internalformat===Pi)&&I(z.width%4===0&&z.height%4===0,"for compressed texture formats, mipmap level 0 must have width and height that are a multiple of 4")}function rr(z,se){for(var ee=z.images,Ke=0;Ke<ee.length;++Ke){if(!ee[Ke])return;ve(ee[Ke],se,Ke)}}var or=[];function St(){var z=or.pop()||new ft;we.call(z),z.mipmask=0;for(var se=0;se<16;++se)z.images[se]=null;return z}function nr(z){for(var se=z.images,ee=0;ee<se.length;++ee)se[ee]&&bt(se[ee]),se[ee]=null;or.push(z)}function Pt(){this.minFilter=nn,this.magFilter=nn,this.wrapS=Un,this.wrapT=Un,this.anisotropic=1,this.genMipmaps=!1,this.mipmapHint=l}function ar(z,se){if("min"in se){var ee=se.min;I.parameter(ee,ke),z.minFilter=ke[ee],vt.indexOf(z.minFilter)>=0&&!("faces"in se)&&(z.genMipmaps=!0)}if("mag"in se){var Ke=se.mag;I.parameter(Ke,Ce),z.magFilter=Ce[Ke]}var wt=z.wrapS,C=z.wrapT;if("wrap"in se){var E=se.wrap;typeof E=="string"?(I.parameter(E,Te),wt=C=Te[E]):Array.isArray(E)&&(I.parameter(E[0],Te),I.parameter(E[1],Te),wt=Te[E[0]],C=Te[E[1]])}else{if("wrapS"in se){var P=se.wrapS;I.parameter(P,Te),wt=Te[P]}if("wrapT"in se){var K=se.wrapT;I.parameter(K,Te),C=Te[K]}}if(z.wrapS=wt,z.wrapT=C,"anisotropic"in se){var Y=se.anisotropic;I(typeof Y=="number"&&Y>=1&&Y<=M.maxAnisotropic,"aniso samples must be between 1 and "),z.anisotropic=se.anisotropic}if("mipmap"in se){var V=!1;switch(typeof se.mipmap){case"string":I.parameter(se.mipmap,Ee,"invalid mipmap hint"),z.mipmapHint=Ee[se.mipmap],z.genMipmaps=!0,V=!0;break;case"boolean":V=z.genMipmaps=se.mipmap;break;case"object":I(Array.isArray(se.mipmap),"invalid mipmap type"),z.genMipmaps=!1,V=!0;break;default:I.raise("invalid mipmap type")}V&&!("min"in se)&&(z.minFilter=Wn)}}function ir(z,se){p.texParameteri(se,Vn,z.minFilter),p.texParameteri(se,bo,z.magFilter),p.texParameteri(se,yo,z.wrapS),p.texParameteri(se,vo,z.wrapT),S.ext_texture_filter_anisotropic&&p.texParameteri(se,w,z.anisotropic),z.genMipmaps&&(p.hint(wo,z.mipmapHint),p.generateMipmap(se))}var sr=0,ur={},fr=M.maxTextureUnits,Yt=Array(fr).map(function(){return null});function mt(z){we.call(this),this.mipmask=0,this.internalformat=ma,this.id=sr++,this.refCount=1,this.target=z,this.texture=p.createTexture(),this.unit=-1,this.bindCount=0,this.texInfo=new Pt,oe.profile&&(this.stats={size:0})}function cr(z){p.activeTexture(et),p.bindTexture(z.target,z.texture)}function Rt(){var z=Yt[0];z?p.bindTexture(z.target,z.texture):p.bindTexture(Ir,null)}function it(z){var se=z.texture;I(se,"must not double destroy texture");var ee=z.unit,Ke=z.target;ee>=0&&(p.activeTexture(et+ee),p.bindTexture(Ke,null),Yt[ee]=null),p.deleteTexture(se),z.texture=null,z.params=null,z.pixels=null,z.refCount=0,delete ur[z.id],re.textureCount--}n(mt.prototype,{bind:function(){var z=this;z.bindCount+=1;var se=z.unit;if(se<0){for(var ee=0;ee<fr;++ee){var Ke=Yt[ee];if(Ke){if(Ke.bindCount>0)continue;Ke.unit=-1}Yt[ee]=z,se=ee;break}se>=fr&&I.raise("insufficient number of texture units"),oe.profile&&re.maxTextureUnits<se+1&&(re.maxTextureUnits=se+1),z.unit=se,p.activeTexture(et+se),p.bindTexture(z.target,z.texture)}return se},unbind:function(){this.bindCount-=1},decRef:function(){--this.refCount<=0&&it(this)}});function $t(z,se){var ee=new mt(Ir);ur[ee.id]=ee,re.textureCount++;function Ke(E,P){var K=ee.texInfo;Pt.call(K);var Y=St();return typeof E=="number"?typeof P=="number"?yt(Y,E|0,P|0):yt(Y,E|0,E|0):E?(I.type(E,"object","invalid arguments to regl.texture"),ar(K,E),It(Y,E)):yt(Y,1,1),K.genMipmaps&&(Y.mipmask=(Y.width<<1)-1),ee.mipmask=Y.mipmask,Ne(ee,Y),I.texture2D(K,Y,M),ee.internalformat=Y.internalformat,Ke.width=Y.width,Ke.height=Y.height,cr(ee),rr(Y,Ir),ir(K,Ir),Rt(),nr(Y),oe.profile&&(ee.stats.size=$o(ee.internalformat,ee.type,Y.width,Y.height,K.genMipmaps,!1)),Ke.format=Ie[ee.internalformat],Ke.type=Ue[ee.type],Ke.mag=_e[K.magFilter],Ke.min=qe[K.minFilter],Ke.wrapS=xe[K.wrapS],Ke.wrapT=xe[K.wrapT],Ke}function wt(E,P,K,Y){I(!!E,"must specify image data");var V=P|0,G=K|0,q=Y|0,O=Ye();return Ne(O,ee),O.width=0,O.height=0,Re(O,E),O.width=O.width||(ee.width>>q)-V,O.height=O.height||(ee.height>>q)-G,I(ee.type===O.type&&ee.format===O.format&&ee.internalformat===O.internalformat,"incompatible format for texture.subimage"),I(V>=0&&G>=0&&V+O.width<=ee.width&&G+O.height<=ee.height,"texture.subimage write out of bounds"),I(ee.mipmask&1<<q,"missing mipmap data"),I(O.data||O.element||O.needsCopy,"missing image data"),cr(ee),lt(O,Ir,V,G,q),Rt(),bt(O),Ke}function C(E,P){var K=E|0,Y=P|0||K;if(K===ee.width&&Y===ee.height)return Ke;Ke.width=ee.width=K,Ke.height=ee.height=Y,cr(ee);for(var V=0;ee.mipmask>>V;++V){var G=K>>V,q=Y>>V;if(!G||!q)break;p.texImage2D(Ir,V,ee.format,G,q,0,ee.format,ee.type,null)}return Rt(),oe.profile&&(ee.stats.size=$o(ee.internalformat,ee.type,K,Y,!1,!1)),Ke}return Ke(z,se),Ke.subimage=wt,Ke.resize=C,Ke._reglType="texture2d",Ke._texture=ee,oe.profile&&(Ke.stats=ee.stats),Ke.destroy=function(){ee.decRef()},Ke}function kt(z,se,ee,Ke,wt,C){var E=new mt(Mi);ur[E.id]=E,re.cubeCount++;var P=new Array(6);function K(G,q,O,D,A,H){var Z,ce=E.texInfo;for(Pt.call(ce),Z=0;Z<6;++Z)P[Z]=St();if(typeof G=="number"||!G){var he=G|0||1;for(Z=0;Z<6;++Z)yt(P[Z],he,he)}else if(typeof G=="object")if(q)It(P[0],G),It(P[1],q),It(P[2],O),It(P[3],D),It(P[4],A),It(P[5],H);else if(ar(ce,G),tt(E,G),"faces"in G){var le=G.faces;for(I(Array.isArray(le)&&le.length===6,"cube faces must be a length 6 array"),Z=0;Z<6;++Z)I(typeof le[Z]=="object"&&!!le[Z],"invalid input for cube map face"),Ne(P[Z],E),It(P[Z],le[Z])}else for(Z=0;Z<6;++Z)It(P[Z],G);else I.raise("invalid arguments to cube map");for(Ne(E,P[0]),M.npotTextureCube||I(po(E.width)&&po(E.height),"your browser does not support non power or two texture dimensions"),ce.genMipmaps?E.mipmask=(P[0].width<<1)-1:E.mipmask=P[0].mipmask,I.textureCube(E,ce,P,M),E.internalformat=P[0].internalformat,K.width=P[0].width,K.height=P[0].height,cr(E),Z=0;Z<6;++Z)rr(P[Z],Bn+Z);for(ir(ce,Mi),Rt(),oe.profile&&(E.stats.size=$o(E.internalformat,E.type,K.width,K.height,ce.genMipmaps,!0)),K.format=Ie[E.internalformat],K.type=Ue[E.type],K.mag=_e[ce.magFilter],K.min=qe[ce.minFilter],K.wrapS=xe[ce.wrapS],K.wrapT=xe[ce.wrapT],Z=0;Z<6;++Z)nr(P[Z]);return K}function Y(G,q,O,D,A){I(!!q,"must specify image data"),I(typeof G=="number"&&G===(G|0)&&G>=0&&G<6,"invalid face");var H=O|0,Z=D|0,ce=A|0,he=Ye();return Ne(he,E),he.width=0,he.height=0,Re(he,q),he.width=he.width||(E.width>>ce)-H,he.height=he.height||(E.height>>ce)-Z,I(E.type===he.type&&E.format===he.format&&E.internalformat===he.internalformat,"incompatible format for texture.subimage"),I(H>=0&&Z>=0&&H+he.width<=E.width&&Z+he.height<=E.height,"texture.subimage write out of bounds"),I(E.mipmask&1<<ce,"missing mipmap data"),I(he.data||he.element||he.needsCopy,"missing image data"),cr(E),lt(he,Bn+G,H,Z,ce),Rt(),bt(he),K}function V(G){var q=G|0;if(q!==E.width){K.width=E.width=q,K.height=E.height=q,cr(E);for(var O=0;O<6;++O)for(var D=0;E.mipmask>>D;++D)p.texImage2D(Bn+O,D,E.format,q>>D,q>>D,0,E.format,E.type,null);return Rt(),oe.profile&&(E.stats.size=$o(E.internalformat,E.type,K.width,K.height,!1,!0)),K}}return K(z,se,ee,Ke,wt,C),K.subimage=Y,K.resize=V,K._reglType="textureCube",K._texture=E,oe.profile&&(K.stats=E.stats),K.destroy=function(){E.decRef()},K}function Qt(){for(var z=0;z<fr;++z)p.activeTexture(et+z),p.bindTexture(Ir,null),Yt[z]=null;xr(ur).forEach(it),re.cubeCount=0,re.textureCount=0}oe.profile&&(re.getTotalTextureSize=function(){var z=0;return Object.keys(ur).forEach(function(se){z+=ur[se].stats.size}),z});function la(){for(var z=0;z<fr;++z){var se=Yt[z];se&&(se.bindCount=0,se.unit=-1,Yt[z]=null)}xr(ur).forEach(function(ee){ee.texture=p.createTexture(),p.bindTexture(ee.target,ee.texture);for(var Ke=0;Ke<32;++Ke)if((ee.mipmask&1<<Ke)!==0)if(ee.target===Ir)p.texImage2D(Ir,Ke,ee.internalformat,ee.width>>Ke,ee.height>>Ke,0,ee.internalformat,ee.type,null);else for(var wt=0;wt<6;++wt)p.texImage2D(Bn+wt,Ke,ee.internalformat,ee.width>>Ke,ee.height>>Ke,0,ee.internalformat,ee.type,null);ir(ee.texInfo,ee.target)})}function pn(){for(var z=0;z<fr;++z){var se=Yt[z];se&&(se.bindCount=0,se.unit=-1,Yt[z]=null),p.activeTexture(et+z),p.bindTexture(Ir,null),p.bindTexture(Mi,null)}}return{create2D:$t,createCube:kt,clear:Qt,getTexture:function(z){return null},restore:la,refresh:pn}}var La=36161,Eo=32854,Ff=32855,Uf=36194,Vf=33189,Wf=36168,qf=34041,Hf=35907,jf=34836,Kf=34842,Xf=34843,Vr=[];Vr[Eo]=2,Vr[Ff]=2,Vr[Uf]=2,Vr[Vf]=2,Vr[Wf]=1,Vr[qf]=4,Vr[Hf]=4,Vr[jf]=16,Vr[Kf]=8,Vr[Xf]=6;function Yf(p,S,M){return Vr[p]*S*M}var B0=function(p,S,M,ne,pe){var re={rgba4:Eo,rgb565:Uf,"rgb5 a1":Ff,depth:Vf,stencil:Wf,"depth stencil":qf};S.ext_srgb&&(re.srgba=Hf),S.ext_color_buffer_half_float&&(re.rgba16f=Kf,re.rgb16f=Xf),S.webgl_color_buffer_float&&(re.rgba32f=jf);var oe=[];Object.keys(re).forEach(function(Se){var Le=re[Se];oe[Le]=Se});var Ee=0,Te={};function Ce(Se){this.id=Ee++,this.refCount=1,this.renderbuffer=Se,this.format=Eo,this.width=0,this.height=0,pe.profile&&(this.stats={size:0})}Ce.prototype.decRef=function(){--this.refCount<=0&&ke(this)};function ke(Se){var Le=Se.renderbuffer;I(Le,"must not double destroy renderbuffer"),p.bindRenderbuffer(La,null),p.deleteRenderbuffer(Le),Se.renderbuffer=null,Se.refCount=0,delete Te[Se.id],ne.renderbufferCount--}function Be(Se,Le){var X=new Ce(p.createRenderbuffer());Te[X.id]=X,ne.renderbufferCount++;function ue(Ue,_e){var qe=0,xe=0,Me=Eo;if(typeof Ue=="object"&&Ue){var we=Ue;if("shape"in we){var Ne=we.shape;I(Array.isArray(Ne)&&Ne.length>=2,"invalid renderbuffer shape"),qe=Ne[0]|0,xe=Ne[1]|0}else"radius"in we&&(qe=xe=we.radius|0),"width"in we&&(qe=we.width|0),"height"in we&&(xe=we.height|0);"format"in we&&(I.parameter(we.format,re,"invalid renderbuffer format"),Me=re[we.format])}else typeof Ue=="number"?(qe=Ue|0,typeof _e=="number"?xe=_e|0:xe=qe):Ue?I.raise("invalid arguments to renderbuffer constructor"):qe=xe=1;if(I(qe>0&&xe>0&&qe<=M.maxRenderbufferSize&&xe<=M.maxRenderbufferSize,"invalid renderbuffer size"),!(qe===X.width&&xe===X.height&&Me===X.format))return ue.width=X.width=qe,ue.height=X.height=xe,X.format=Me,p.bindRenderbuffer(La,X.renderbuffer),p.renderbufferStorage(La,Me,qe,xe),I(p.getError()===0,"invalid render buffer format"),pe.profile&&(X.stats.size=Yf(X.format,X.width,X.height)),ue.format=oe[X.format],ue}function Ie(Ue,_e){var qe=Ue|0,xe=_e|0||qe;return qe===X.width&&xe===X.height||(I(qe>0&&xe>0&&qe<=M.maxRenderbufferSize&&xe<=M.maxRenderbufferSize,"invalid renderbuffer size"),ue.width=X.width=qe,ue.height=X.height=xe,p.bindRenderbuffer(La,X.renderbuffer),p.renderbufferStorage(La,X.format,qe,xe),I(p.getError()===0,"invalid render buffer format"),pe.profile&&(X.stats.size=Yf(X.format,X.width,X.height))),ue}return ue(Se,Le),ue.resize=Ie,ue._reglType="renderbuffer",ue._renderbuffer=X,pe.profile&&(ue.stats=X.stats),ue.destroy=function(){X.decRef()},ue}pe.profile&&(ne.getTotalRenderbufferSize=function(){var Se=0;return Object.keys(Te).forEach(function(Le){Se+=Te[Le].stats.size}),Se});function Pe(){xr(Te).forEach(function(Se){Se.renderbuffer=p.createRenderbuffer(),p.bindRenderbuffer(La,Se.renderbuffer),p.renderbufferStorage(La,Se.format,Se.width,Se.height)}),p.bindRenderbuffer(La,null)}return{create:Be,clear:function(){xr(Te).forEach(ke)},restore:Pe}},va=36160,rl=36161,on=3553,So=34069,Qf=36064,Zf=36096,Jf=36128,ec=33306,tc=36053,L0=36054,M0=36055,N0=36057,D0=36061,P0=36193,G0=5121,F0=5126,rc=6407,ac=6408,U0=6402,V0=[rc,ac],al=[];al[ac]=4,al[rc]=3;var To=[];To[G0]=1,To[F0]=4,To[P0]=2;var W0=32854,q0=32855,H0=36194,j0=33189,K0=36168,nc=34041,X0=35907,Y0=34836,Q0=34842,Z0=34843,J0=[W0,q0,H0,X0,Q0,Z0,Y0],jn={};jn[tc]="complete",jn[L0]="incomplete attachment",jn[N0]="incomplete dimensions",jn[M0]="incomplete, missing attachment",jn[D0]="unsupported";function eb(p,S,M,ne,pe,re){var oe={cur:null,next:null,dirty:!1,setFBO:null},Ee=["rgba"],Te=["rgba4","rgb565","rgb5 a1"];S.ext_srgb&&Te.push("srgba"),S.ext_color_buffer_half_float&&Te.push("rgba16f","rgb16f"),S.webgl_color_buffer_float&&Te.push("rgba32f");var Ce=["uint8"];S.oes_texture_half_float&&Ce.push("half float","float16"),S.oes_texture_float&&Ce.push("float","float32");function ke(Ge,Re,ve){this.target=Ge,this.texture=Re,this.renderbuffer=ve;var lt=0,ht=0;Re?(lt=Re.width,ht=Re.height):ve&&(lt=ve.width,ht=ve.height),this.width=lt,this.height=ht}function Be(Ge){Ge&&(Ge.texture&&Ge.texture._texture.decRef(),Ge.renderbuffer&&Ge.renderbuffer._renderbuffer.decRef())}function Pe(Ge,Re,ve){if(Ge)if(Ge.texture){var lt=Ge.texture._texture,ht=Math.max(1,lt.width),Ye=Math.max(1,lt.height);I(ht===Re&&Ye===ve,"inconsistent width/height for supplied texture"),lt.refCount+=1}else{var bt=Ge.renderbuffer._renderbuffer;I(bt.width===Re&&bt.height===ve,"inconsistent width/height for renderbuffer"),bt.refCount+=1}}function Se(Ge,Re){Re&&(Re.texture?p.framebufferTexture2D(va,Ge,Re.target,Re.texture._texture.texture,0):p.framebufferRenderbuffer(va,Ge,rl,Re.renderbuffer._renderbuffer.renderbuffer))}function Le(Ge){var Re=on,ve=null,lt=null,ht=Ge;typeof Ge=="object"&&(ht=Ge.data,"target"in Ge&&(Re=Ge.target|0)),I.type(ht,"function","invalid attachment data");var Ye=ht._reglType;return Ye==="texture2d"?(ve=ht,I(Re===on)):Ye==="textureCube"?(ve=ht,I(Re>=So&&Re<So+6,"invalid cube map target")):Ye==="renderbuffer"?(lt=ht,Re=rl):I.raise("invalid regl object for attachment"),new ke(Re,ve,lt)}function X(Ge,Re,ve,lt,ht){if(ve){var Ye=ne.create2D({width:Ge,height:Re,format:lt,type:ht});return Ye._texture.refCount=0,new ke(on,Ye,null)}else{var bt=pe.create({width:Ge,height:Re,format:lt});return bt._renderbuffer.refCount=0,new ke(rl,null,bt)}}function ue(Ge){return Ge&&(Ge.texture||Ge.renderbuffer)}function Ie(Ge,Re,ve){Ge&&(Ge.texture?Ge.texture.resize(Re,ve):Ge.renderbuffer&&Ge.renderbuffer.resize(Re,ve),Ge.width=Re,Ge.height=ve)}var Ue=0,_e={};function qe(){this.id=Ue++,_e[this.id]=this,this.framebuffer=p.createFramebuffer(),this.width=0,this.height=0,this.colorAttachments=[],this.depthAttachment=null,this.stencilAttachment=null,this.depthStencilAttachment=null}function xe(Ge){Ge.colorAttachments.forEach(Be),Be(Ge.depthAttachment),Be(Ge.stencilAttachment),Be(Ge.depthStencilAttachment)}function Me(Ge){var Re=Ge.framebuffer;I(Re,"must not double destroy framebuffer"),p.deleteFramebuffer(Re),Ge.framebuffer=null,re.framebufferCount--,delete _e[Ge.id]}function we(Ge){var Re;p.bindFramebuffer(va,Ge.framebuffer);var ve=Ge.colorAttachments;for(Re=0;Re<ve.length;++Re)Se(Qf+Re,ve[Re]);for(Re=ve.length;Re<M.maxColorAttachments;++Re)p.framebufferTexture2D(va,Qf+Re,on,null,0);p.framebufferTexture2D(va,ec,on,null,0),p.framebufferTexture2D(va,Zf,on,null,0),p.framebufferTexture2D(va,Jf,on,null,0),Se(Zf,Ge.depthAttachment),Se(Jf,Ge.stencilAttachment),Se(ec,Ge.depthStencilAttachment);var lt=p.checkFramebufferStatus(va);!p.isContextLost()&&lt!==tc&&I.raise("framebuffer configuration not supported, status = "+jn[lt]),p.bindFramebuffer(va,oe.next?oe.next.framebuffer:null),oe.cur=oe.next,p.getError()}function Ne(Ge,Re){var ve=new qe;re.framebufferCount++;function lt(Ye,bt){var ft;I(oe.next!==ve,"can not update framebuffer which is currently in use");var yt=0,It=0,rr=!0,or=!0,St=null,nr=!0,Pt="rgba",ar="uint8",ir=1,sr=null,ur=null,fr=null,Yt=!1;if(typeof Ye=="number")yt=Ye|0,It=bt|0||yt;else if(!Ye)yt=It=1;else{I.type(Ye,"object","invalid arguments for framebuffer");var mt=Ye;if("shape"in mt){var cr=mt.shape;I(Array.isArray(cr)&&cr.length>=2,"invalid shape for framebuffer"),yt=cr[0],It=cr[1]}else"radius"in mt&&(yt=It=mt.radius),"width"in mt&&(yt=mt.width),"height"in mt&&(It=mt.height);("color"in mt||"colors"in mt)&&(St=mt.color||mt.colors,Array.isArray(St)&&I(St.length===1||S.webgl_draw_buffers,"multiple render targets not supported")),St||("colorCount"in mt&&(ir=mt.colorCount|0,I(ir>0,"invalid color buffer count")),"colorTexture"in mt&&(nr=!!mt.colorTexture,Pt="rgba4"),"colorType"in mt&&(ar=mt.colorType,nr?(I(S.oes_texture_float||!(ar==="float"||ar==="float32"),"you must enable OES_texture_float in order to use floating point framebuffer objects"),I(S.oes_texture_half_float||!(ar==="half float"||ar==="float16"),"you must enable OES_texture_half_float in order to use 16-bit floating point framebuffer objects")):ar==="half float"||ar==="float16"?(I(S.ext_color_buffer_half_float,"you must enable EXT_color_buffer_half_float to use 16-bit render buffers"),Pt="rgba16f"):(ar==="float"||ar==="float32")&&(I(S.webgl_color_buffer_float,"you must enable WEBGL_color_buffer_float in order to use 32-bit floating point renderbuffers"),Pt="rgba32f"),I.oneOf(ar,Ce,"invalid color type")),"colorFormat"in mt&&(Pt=mt.colorFormat,Ee.indexOf(Pt)>=0?nr=!0:Te.indexOf(Pt)>=0?nr=!1:nr?I.oneOf(mt.colorFormat,Ee,"invalid color format for texture"):I.oneOf(mt.colorFormat,Te,"invalid color format for renderbuffer"))),("depthTexture"in mt||"depthStencilTexture"in mt)&&(Yt=!!(mt.depthTexture||mt.depthStencilTexture),I(!Yt||S.webgl_depth_texture,"webgl_depth_texture extension not supported")),"depth"in mt&&(typeof mt.depth=="boolean"?rr=mt.depth:(sr=mt.depth,or=!1)),"stencil"in mt&&(typeof mt.stencil=="boolean"?or=mt.stencil:(ur=mt.stencil,rr=!1)),"depthStencil"in mt&&(typeof mt.depthStencil=="boolean"?rr=or=mt.depthStencil:(fr=mt.depthStencil,rr=!1,or=!1))}var Rt=null,it=null,$t=null,kt=null;if(Array.isArray(St))Rt=St.map(Le);else if(St)Rt=[Le(St)];else for(Rt=new Array(ir),ft=0;ft<ir;++ft)Rt[ft]=X(yt,It,nr,Pt,ar);I(S.webgl_draw_buffers||Rt.length<=1,"you must enable the WEBGL_draw_buffers extension in order to use multiple color buffers."),I(Rt.length<=M.maxColorAttachments,"too many color attachments, not supported"),yt=yt||Rt[0].width,It=It||Rt[0].height,sr?it=Le(sr):rr&&!or&&(it=X(yt,It,Yt,"depth","uint32")),ur?$t=Le(ur):or&&!rr&&($t=X(yt,It,!1,"stencil","uint8")),fr?kt=Le(fr):!sr&&!ur&&or&&rr&&(kt=X(yt,It,Yt,"depth stencil","depth stencil")),I(!!sr+!!ur+!!fr<=1,"invalid framebuffer configuration, can specify exactly one depth/stencil attachment");var Qt=null;for(ft=0;ft<Rt.length;++ft)if(Pe(Rt[ft],yt,It),I(!Rt[ft]||Rt[ft].texture&&V0.indexOf(Rt[ft].texture._texture.format)>=0||Rt[ft].renderbuffer&&J0.indexOf(Rt[ft].renderbuffer._renderbuffer.format)>=0,"framebuffer color attachment "+ft+" is invalid"),Rt[ft]&&Rt[ft].texture){var la=al[Rt[ft].texture._texture.format]*To[Rt[ft].texture._texture.type];Qt===null?Qt=la:I(Qt===la,"all color attachments much have the same number of bits per pixel.")}return Pe(it,yt,It),I(!it||it.texture&&it.texture._texture.format===U0||it.renderbuffer&&it.renderbuffer._renderbuffer.format===j0,"invalid depth attachment for framebuffer object"),Pe($t,yt,It),I(!$t||$t.renderbuffer&&$t.renderbuffer._renderbuffer.format===K0,"invalid stencil attachment for framebuffer object"),Pe(kt,yt,It),I(!kt||kt.texture&&kt.texture._texture.format===nc||kt.renderbuffer&&kt.renderbuffer._renderbuffer.format===nc,"invalid depth-stencil attachment for framebuffer object"),xe(ve),ve.width=yt,ve.height=It,ve.colorAttachments=Rt,ve.depthAttachment=it,ve.stencilAttachment=$t,ve.depthStencilAttachment=kt,lt.color=Rt.map(ue),lt.depth=ue(it),lt.stencil=ue($t),lt.depthStencil=ue(kt),lt.width=ve.width,lt.height=ve.height,we(ve),lt}function ht(Ye,bt){I(oe.next!==ve,"can not resize a framebuffer which is currently in use");var ft=Math.max(Ye|0,1),yt=Math.max(bt|0||ft,1);if(ft===ve.width&&yt===ve.height)return lt;for(var It=ve.colorAttachments,rr=0;rr<It.length;++rr)Ie(It[rr],ft,yt);return Ie(ve.depthAttachment,ft,yt),Ie(ve.stencilAttachment,ft,yt),Ie(ve.depthStencilAttachment,ft,yt),ve.width=lt.width=ft,ve.height=lt.height=yt,we(ve),lt}return lt(Ge,Re),n(lt,{resize:ht,_reglType:"framebuffer",_framebuffer:ve,destroy:function(){Me(ve),xe(ve)},use:function(Ye){oe.setFBO({framebuffer:lt},Ye)}})}function tt(Ge){var Re=Array(6);function ve(ht){var Ye;I(Re.indexOf(oe.next)<0,"can not update framebuffer which is currently in use");var bt={color:null},ft=0,yt=null,It="rgba",rr="uint8",or=1;if(typeof ht=="number")ft=ht|0;else if(!ht)ft=1;else{I.type(ht,"object","invalid arguments for framebuffer");var St=ht;if("shape"in St){var nr=St.shape;I(Array.isArray(nr)&&nr.length>=2,"invalid shape for framebuffer"),I(nr[0]===nr[1],"cube framebuffer must be square"),ft=nr[0]}else"radius"in St&&(ft=St.radius|0),"width"in St?(ft=St.width|0,"height"in St&&I(St.height===ft,"must be square")):"height"in St&&(ft=St.height|0);("color"in St||"colors"in St)&&(yt=St.color||St.colors,Array.isArray(yt)&&I(yt.length===1||S.webgl_draw_buffers,"multiple render targets not supported")),yt||("colorCount"in St&&(or=St.colorCount|0,I(or>0,"invalid color buffer count")),"colorType"in St&&(I.oneOf(St.colorType,Ce,"invalid color type"),rr=St.colorType),"colorFormat"in St&&(It=St.colorFormat,I.oneOf(St.colorFormat,Ee,"invalid color format for texture"))),"depth"in St&&(bt.depth=St.depth),"stencil"in St&&(bt.stencil=St.stencil),"depthStencil"in St&&(bt.depthStencil=St.depthStencil)}var Pt;if(yt)if(Array.isArray(yt))for(Pt=[],Ye=0;Ye<yt.length;++Ye)Pt[Ye]=yt[Ye];else Pt=[yt];else{Pt=Array(or);var ar={radius:ft,format:It,type:rr};for(Ye=0;Ye<or;++Ye)Pt[Ye]=ne.createCube(ar)}for(bt.color=Array(Pt.length),Ye=0;Ye<Pt.length;++Ye){var ir=Pt[Ye];I(typeof ir=="function"&&ir._reglType==="textureCube","invalid cube map"),ft=ft||ir.width,I(ir.width===ft&&ir.height===ft,"invalid cube map shape"),bt.color[Ye]={target:So,data:Pt[Ye]}}for(Ye=0;Ye<6;++Ye){for(var sr=0;sr<Pt.length;++sr)bt.color[sr].target=So+Ye;Ye>0&&(bt.depth=Re[0].depth,bt.stencil=Re[0].stencil,bt.depthStencil=Re[0].depthStencil),Re[Ye]?Re[Ye](bt):Re[Ye]=Ne(bt)}return n(ve,{width:ft,height:ft,color:Pt})}function lt(ht){var Ye,bt=ht|0;if(I(bt>0&&bt<=M.maxCubeMapSize,"invalid radius for cube fbo"),bt===ve.width)return ve;var ft=ve.color;for(Ye=0;Ye<ft.length;++Ye)ft[Ye].resize(bt);for(Ye=0;Ye<6;++Ye)Re[Ye].resize(bt);return ve.width=ve.height=bt,ve}return ve(Ge),n(ve,{faces:Re,resize:lt,_reglType:"framebufferCube",destroy:function(){Re.forEach(function(ht){ht.destroy()})}})}function dt(){oe.cur=null,oe.next=null,oe.dirty=!0,xr(_e).forEach(function(Ge){Ge.framebuffer=p.createFramebuffer(),we(Ge)})}return n(oe,{getFramebuffer:function(Ge){if(typeof Ge=="function"&&Ge._reglType==="framebuffer"){var Re=Ge._framebuffer;if(Re instanceof qe)return Re}return null},create:Ne,createCube:tt,clear:function(){xr(_e).forEach(Me)},restore:dt})}var tb=5126,ic=34962;function nl(){this.state=0,this.x=0,this.y=0,this.z=0,this.w=0,this.buffer=null,this.size=0,this.normalized=!1,this.type=tb,this.offset=0,this.stride=0,this.divisor=0}function rb(p,S,M,ne,pe){for(var re=M.maxAttributes,oe=new Array(re),Ee=0;Ee<re;++Ee)oe[Ee]=new nl;var Te=0,Ce={},ke={Record:nl,scope:{},state:oe,currentVAO:null,targetVAO:null,restore:Pe()?_e:function(){},createVAO:qe,getVAO:Le,destroyBuffer:Be,setVAO:Pe()?X:ue,clear:Pe()?Ie:function(){}};function Be(xe){for(var Me=0;Me<oe.length;++Me){var we=oe[Me];we.buffer===xe&&(p.disableVertexAttribArray(Me),we.buffer=null)}}function Pe(){return S.oes_vertex_array_object}function Se(){return S.angle_instanced_arrays}function Le(xe){return typeof xe=="function"&&xe._vao?xe._vao:null}function X(xe){if(xe!==ke.currentVAO){var Me=Pe();xe?Me.bindVertexArrayOES(xe.vao):Me.bindVertexArrayOES(null),ke.currentVAO=xe}}function ue(xe){if(xe!==ke.currentVAO){if(xe)xe.bindAttrs();else for(var Me=Se(),we=0;we<oe.length;++we){var Ne=oe[we];Ne.buffer?(p.enableVertexAttribArray(we),p.vertexAttribPointer(we,Ne.size,Ne.type,Ne.normalized,Ne.stride,Ne.offfset),Me&&Ne.divisor&&Me.vertexAttribDivisorANGLE(we,Ne.divisor)):(p.disableVertexAttribArray(we),p.vertexAttrib4f(we,Ne.x,Ne.y,Ne.z,Ne.w))}ke.currentVAO=xe}}function Ie(){xr(Ce).forEach(function(xe){xe.destroy()})}function Ue(){this.id=++Te,this.attributes=[];var xe=Pe();xe?this.vao=xe.createVertexArrayOES():this.vao=null,Ce[this.id]=this,this.buffers=[]}Ue.prototype.bindAttrs=function(){for(var xe=Se(),Me=this.attributes,we=0;we<Me.length;++we){var Ne=Me[we];Ne.buffer?(p.enableVertexAttribArray(we),p.bindBuffer(ic,Ne.buffer.buffer),p.vertexAttribPointer(we,Ne.size,Ne.type,Ne.normalized,Ne.stride,Ne.offset),xe&&Ne.divisor&&xe.vertexAttribDivisorANGLE(we,Ne.divisor)):(p.disableVertexAttribArray(we),p.vertexAttrib4f(we,Ne.x,Ne.y,Ne.z,Ne.w))}for(var tt=Me.length;tt<re;++tt)p.disableVertexAttribArray(tt)},Ue.prototype.refresh=function(){var xe=Pe();xe&&(xe.bindVertexArrayOES(this.vao),this.bindAttrs(),ke.currentVAO=this)},Ue.prototype.destroy=function(){if(this.vao){var xe=Pe();this===ke.currentVAO&&(ke.currentVAO=null,xe.bindVertexArrayOES(null)),xe.deleteVertexArrayOES(this.vao),this.vao=null}Ce[this.id]&&(delete Ce[this.id],ne.vaoCount-=1)};function _e(){var xe=Pe();xe&&xr(Ce).forEach(function(Me){Me.refresh()})}function qe(xe){var Me=new Ue;ne.vaoCount+=1;function we(Ne){I(Array.isArray(Ne),"arguments to vertex array constructor must be an array"),I(Ne.length<re,"too many attributes"),I(Ne.length>0,"must specify at least one attribute");var tt={},dt=Me.attributes;dt.length=Ne.length;for(var Ge=0;Ge<Ne.length;++Ge){var Re=Ne[Ge],ve=dt[Ge]=new nl,lt=Re.data||Re;if(Array.isArray(lt)||r(lt)||br(lt)){var ht;Me.buffers[Ge]&&(ht=Me.buffers[Ge],r(lt)&&ht._buffer.byteLength>=lt.byteLength?ht.subdata(lt):(ht.destroy(),Me.buffers[Ge]=null)),Me.buffers[Ge]||(ht=Me.buffers[Ge]=pe.create(Re,ic,!1,!0)),ve.buffer=pe.getBuffer(ht),ve.size=ve.buffer.dimension|0,ve.normalized=!1,ve.type=ve.buffer.dtype,ve.offset=0,ve.stride=0,ve.divisor=0,ve.state=1,tt[Ge]=1}else pe.getBuffer(Re)?(ve.buffer=pe.getBuffer(Re),ve.size=ve.buffer.dimension|0,ve.normalized=!1,ve.type=ve.buffer.dtype,ve.offset=0,ve.stride=0,ve.divisor=0,ve.state=1):pe.getBuffer(Re.buffer)?(ve.buffer=pe.getBuffer(Re.buffer),ve.size=(+Re.size||ve.buffer.dimension)|0,ve.normalized=!!Re.normalized||!1,"type"in Re?(I.parameter(Re.type,pa,"invalid buffer type"),ve.type=pa[Re.type]):ve.type=ve.buffer.dtype,ve.offset=(Re.offset||0)|0,ve.stride=(Re.stride||0)|0,ve.divisor=(Re.divisor||0)|0,ve.state=1,I(ve.size>=1&&ve.size<=4,"size must be between 1 and 4"),I(ve.offset>=0,"invalid offset"),I(ve.stride>=0&&ve.stride<=255,"stride must be between 0 and 255"),I(ve.divisor>=0,"divisor must be positive"),I(!ve.divisor||!!S.angle_instanced_arrays,"ANGLE_instanced_arrays must be enabled to use divisor")):"x"in Re?(I(Ge>0,"first attribute must not be a constant"),ve.x=+Re.x||0,ve.y=+Re.y||0,ve.z=+Re.z||0,ve.w=+Re.w||0,ve.state=2):I(!1,"invalid attribute spec for location "+Ge)}for(var Ye=0;Ye<Me.buffers.length;++Ye)!tt[Ye]&&Me.buffers[Ye]&&(Me.buffers[Ye].destroy(),Me.buffers[Ye]=null);return Me.refresh(),we}return we.destroy=function(){for(var Ne=0;Ne<Me.buffers.length;++Ne)Me.buffers[Ne]&&Me.buffers[Ne].destroy();Me.buffers.length=0,Me.destroy()},we._vao=Me,we._reglType="vao",we(xe)}return ke}var sc=35632,ab=35633,nb=35718,ib=35721;function sb(p,S,M,ne){var pe={},re={};function oe(X,ue,Ie,Ue){this.name=X,this.id=ue,this.location=Ie,this.info=Ue}function Ee(X,ue){for(var Ie=0;Ie<X.length;++Ie)if(X[Ie].id===ue.id){X[Ie].location=ue.location;return}X.push(ue)}function Te(X,ue,Ie){var Ue=X===sc?pe:re,_e=Ue[ue];if(!_e){var qe=S.str(ue);_e=p.createShader(X),p.shaderSource(_e,qe),p.compileShader(_e),I.shaderError(p,_e,qe,X,Ie),Ue[ue]=_e}return _e}var Ce={},ke=[],Be=0;function Pe(X,ue){this.id=Be++,this.fragId=X,this.vertId=ue,this.program=null,this.uniforms=[],this.attributes=[],this.refCount=1,ne.profile&&(this.stats={uniformsCount:0,attributesCount:0})}function Se(X,ue,Ie){var Ue,_e,qe=Te(sc,X.fragId),xe=Te(ab,X.vertId),Me=X.program=p.createProgram();if(p.attachShader(Me,qe),p.attachShader(Me,xe),Ie)for(Ue=0;Ue<Ie.length;++Ue){var we=Ie[Ue];p.bindAttribLocation(Me,we[0],we[1])}p.linkProgram(Me),I.linkError(p,Me,S.str(X.fragId),S.str(X.vertId),ue);var Ne=p.getProgramParameter(Me,nb);ne.profile&&(X.stats.uniformsCount=Ne);var tt=X.uniforms;for(Ue=0;Ue<Ne;++Ue)if(_e=p.getActiveUniform(Me,Ue),_e)if(_e.size>1)for(var dt=0;dt<_e.size;++dt){var Ge=_e.name.replace("[0]","["+dt+"]");Ee(tt,new oe(Ge,S.id(Ge),p.getUniformLocation(Me,Ge),_e))}else Ee(tt,new oe(_e.name,S.id(_e.name),p.getUniformLocation(Me,_e.name),_e));var Re=p.getProgramParameter(Me,ib);ne.profile&&(X.stats.attributesCount=Re);var ve=X.attributes;for(Ue=0;Ue<Re;++Ue)_e=p.getActiveAttrib(Me,Ue),_e&&Ee(ve,new oe(_e.name,S.id(_e.name),p.getAttribLocation(Me,_e.name),_e))}ne.profile&&(M.getMaxUniformsCount=function(){var X=0;return ke.forEach(function(ue){ue.stats.uniformsCount>X&&(X=ue.stats.uniformsCount)}),X},M.getMaxAttributesCount=function(){var X=0;return ke.forEach(function(ue){ue.stats.attributesCount>X&&(X=ue.stats.attributesCount)}),X});function Le(){pe={},re={};for(var X=0;X<ke.length;++X)Se(ke[X],null,ke[X].attributes.map(function(ue){return[ue.location,ue.name]}))}return{clear:function(){var X=p.deleteShader.bind(p);xr(pe).forEach(X),pe={},xr(re).forEach(X),re={},ke.forEach(function(ue){p.deleteProgram(ue.program)}),ke.length=0,Ce={},M.shaderCount=0},program:function(X,ue,Ie,Ue){I.command(X>=0,"missing vertex shader",Ie),I.command(ue>=0,"missing fragment shader",Ie);var _e=Ce[ue];_e||(_e=Ce[ue]={});var qe=_e[X];if(qe&&(qe.refCount++,!Ue))return qe;var xe=new Pe(ue,X);return M.shaderCount++,Se(xe,Ie,Ue),qe||(_e[X]=xe),ke.push(xe),n(xe,{destroy:function(){if(xe.refCount--,xe.refCount<=0){p.deleteProgram(xe.program);var Me=ke.indexOf(xe);ke.splice(Me,1),M.shaderCount--}_e[xe.vertId].refCount<=0&&(p.deleteShader(re[xe.vertId]),delete re[xe.vertId],delete Ce[xe.fragId][xe.vertId]),Object.keys(Ce[xe.fragId]).length||(p.deleteShader(pe[xe.fragId]),delete pe[xe.fragId],delete Ce[xe.fragId])}})},restore:Le,shader:Te,frag:-1,vert:-1}}var ob=6408,Ki=5121,ub=3333,ko=5126;function lb(p,S,M,ne,pe,re,oe){function Ee(ke){var Be;S.next===null?(I(pe.preserveDrawingBuffer,'you must create a webgl context with "preserveDrawingBuffer":true in order to read pixels from the drawing buffer'),Be=Ki):(I(S.next.colorAttachments[0].texture!==null,"You cannot read from a renderbuffer"),Be=S.next.colorAttachments[0].texture._texture.type,re.oes_texture_float?(I(Be===Ki||Be===ko,"Reading from a framebuffer is only allowed for the types 'uint8' and 'float'"),Be===ko&&I(oe.readFloat,"Reading 'float' values is not permitted in your browser. For a fallback, please see: https://www.npmjs.com/package/glsl-read-float")):I(Be===Ki,"Reading from a framebuffer is only allowed for the type 'uint8'"));var Pe=0,Se=0,Le=ne.framebufferWidth,X=ne.framebufferHeight,ue=null;r(ke)?ue=ke:ke&&(I.type(ke,"object","invalid arguments to regl.read()"),Pe=ke.x|0,Se=ke.y|0,I(Pe>=0&&Pe<ne.framebufferWidth,"invalid x offset for regl.read"),I(Se>=0&&Se<ne.framebufferHeight,"invalid y offset for regl.read"),Le=(ke.width||ne.framebufferWidth-Pe)|0,X=(ke.height||ne.framebufferHeight-Se)|0,ue=ke.data||null),ue&&(Be===Ki?I(ue instanceof Uint8Array,"buffer must be 'Uint8Array' when reading from a framebuffer of type 'uint8'"):Be===ko&&I(ue instanceof Float32Array,"buffer must be 'Float32Array' when reading from a framebuffer of type 'float'")),I(Le>0&&Le+Pe<=ne.framebufferWidth,"invalid width for read pixels"),I(X>0&&X+Se<=ne.framebufferHeight,"invalid height for read pixels"),M();var Ie=Le*X*4;return ue||(Be===Ki?ue=new Uint8Array(Ie):Be===ko&&(ue=ue||new Float32Array(Ie))),I.isTypedArray(ue,"data buffer for regl.read() must be a typedarray"),I(ue.byteLength>=Ie,"data buffer for regl.read() too small"),p.pixelStorei(ub,4),p.readPixels(Pe,Se,Le,X,ob,Be,ue),ue}function Te(ke){var Be;return S.setFBO({framebuffer:ke.framebuffer},function(){Be=Ee(ke)}),Be}function Ce(ke){return!ke||!("framebuffer"in ke)?Ee(ke):Te(ke)}return Ce}function Kn(p){return Array.prototype.slice.call(p)}function Xn(p){return Kn(p).join("")}function db(){var p=0,S=[],M=[];function ne(Be){for(var Pe=0;Pe<M.length;++Pe)if(M[Pe]===Be)return S[Pe];var Se="g"+p++;return S.push(Se),M.push(Be),Se}function pe(){var Be=[];function Pe(){Be.push.apply(Be,Kn(arguments))}var Se=[];function Le(){var X="v"+p++;return Se.push(X),arguments.length>0&&(Be.push(X,"="),Be.push.apply(Be,Kn(arguments)),Be.push(";")),X}return n(Pe,{def:Le,toString:function(){return Xn([Se.length>0?"var "+Se.join(",")+";":"",Xn(Be)])}})}function re(){var Be=pe(),Pe=pe(),Se=Be.toString,Le=Pe.toString;function X(ue,Ie){Pe(ue,Ie,"=",Be.def(ue,Ie),";")}return n(function(){Be.apply(Be,Kn(arguments))},{def:Be.def,entry:Be,exit:Pe,save:X,set:function(ue,Ie,Ue){X(ue,Ie),Be(ue,Ie,"=",Ue,";")},toString:function(){return Se()+Le()}})}function oe(){var Be=Xn(arguments),Pe=re(),Se=re(),Le=Pe.toString,X=Se.toString;return n(Pe,{then:function(){return Pe.apply(Pe,Kn(arguments)),this},else:function(){return Se.apply(Se,Kn(arguments)),this},toString:function(){var ue=X();return ue&&(ue="else{"+ue+"}"),Xn(["if(",Be,"){",Le(),"}",ue])}})}var Ee=pe(),Te={};function Ce(Be,Pe){var Se=[];function Le(){var _e="a"+Se.length;return Se.push(_e),_e}Pe=Pe||0;for(var X=0;X<Pe;++X)Le();var ue=re(),Ie=ue.toString,Ue=Te[Be]=n(ue,{arg:Le,toString:function(){return Xn(["function(",Se.join(),"){",Ie(),"}"])}});return Ue}function ke(){var Be=['"use strict";',Ee,"return {"];Object.keys(Te).forEach(function(Le){Be.push('"',Le,'":',Te[Le].toString(),",")}),Be.push("}");var Pe=Xn(Be).replace(/;/g,`;
`).replace(/}/g,`}
`).replace(/{/g,`{
`),Se=Function.apply(null,S.concat(Pe));return Se.apply(null,M)}return{global:Ee,link:ne,block:pe,proc:Ce,scope:re,cond:oe,compile:ke}}var Yn="xyzw".split(""),oc=5121,Qn=1,il=2,sl=0,ol=1,ul=2,ll=3,Ao=4,uc=5,lc=6,dc="dither",fc="blend.enable",cc="blend.color",dl="blend.equation",fl="blend.func",pc="depth.enable",hc="depth.func",mc="depth.range",gc="depth.mask",cl="colorMask",yc="cull.enable",vc="cull.face",pl="frontFace",hl="lineWidth",_c="polygonOffset.enable",ml="polygonOffset.offset",bc="sample.alpha",wc="sample.enable",gl="sample.coverage",xc="stencil.enable",$c="stencil.mask",yl="stencil.func",vl="stencil.opFront",Xi="stencil.opBack",Ec="scissor.enable",Io="scissor.box",_a="viewport",Yi="profile",un="framebuffer",Qi="vert",Zi="frag",ln="elements",dn="primitive",fn="count",Co="offset",Oo="instances",Ji="vao",_l="Width",bl="Height",Zn=un+_l,Jn=un+bl,fb=_a+_l,cb=_a+bl,Sc="drawingBuffer",Tc=Sc+_l,kc=Sc+bl,pb=[fl,dl,yl,vl,Xi,gl,_a,Io,ml],ei=34962,hb=34963,mb=35632,gb=35633,Ac=3553,yb=34067,vb=2884,_b=3042,bb=3024,wb=2960,xb=2929,$b=3089,Eb=32823,Sb=32926,Tb=32928,wl=5126,Ro=35664,zo=35665,Bo=35666,xl=5124,Lo=35667,Mo=35668,No=35669,$l=35670,Do=35671,Po=35672,Go=35673,es=35674,ts=35675,rs=35676,as=35678,ns=35680,Ic=4,is=1028,cn=1029,Cc=2304,El=2305,kb=32775,Ab=32776,Ib=519,Ma=7680,Oc=0,Rc=1,zc=32774,Cb=513,Bc=36160,Ob=36064,ua={0:0,1:1,zero:0,one:1,"src color":768,"one minus src color":769,"src alpha":770,"one minus src alpha":771,"dst color":774,"one minus dst color":775,"dst alpha":772,"one minus dst alpha":773,"constant color":32769,"one minus constant color":32770,"constant alpha":32771,"one minus constant alpha":32772,"src alpha saturate":776},Lc=["constant color, constant alpha","one minus constant color, constant alpha","constant color, one minus constant alpha","one minus constant color, one minus constant alpha","constant alpha, constant color","constant alpha, one minus constant color","one minus constant alpha, constant color","one minus constant alpha, one minus constant color"],ti={never:512,less:513,"<":513,equal:514,"=":514,"==":514,"===":514,lequal:515,"<=":515,greater:516,">":516,notequal:517,"!=":517,"!==":517,gequal:518,">=":518,always:519},Na={0:0,zero:0,keep:7680,replace:7681,increment:7682,decrement:7683,"increment wrap":34055,"decrement wrap":34056,invert:5386},Mc={frag:mb,vert:gb},Sl={cw:Cc,ccw:El};function Fo(p){return Array.isArray(p)||r(p)||br(p)}function Nc(p){return p.sort(function(S,M){return S===_a?-1:M===_a?1:S<M?-1:1})}function $r(p,S,M,ne){this.thisDep=p,this.contextDep=S,this.propDep=M,this.append=ne}function Da(p){return p&&!(p.thisDep||p.contextDep||p.propDep)}function tr(p){return new $r(!1,!1,!1,p)}function Ar(p,S){var M=p.type;if(M===sl){var ne=p.data.length;return new $r(!0,ne>=1,ne>=2,S)}else if(M===Ao){var pe=p.data;return new $r(pe.thisDep,pe.contextDep,pe.propDep,S)}else{if(M===uc)return new $r(!1,!1,!1,S);if(M===lc){for(var re=!1,oe=!1,Ee=!1,Te=0;Te<p.data.length;++Te){var Ce=p.data[Te];if(Ce.type===ol)Ee=!0;else if(Ce.type===ul)oe=!0;else if(Ce.type===ll)re=!0;else if(Ce.type===sl){re=!0;var ke=Ce.data;ke>=1&&(oe=!0),ke>=2&&(Ee=!0)}else Ce.type===Ao&&(re=re||Ce.data.thisDep,oe=oe||Ce.data.contextDep,Ee=Ee||Ce.data.propDep)}return new $r(re,oe,Ee,S)}else return new $r(M===ll,M===ul,M===ol,S)}}var Dc=new $r(!1,!1,!1,function(){});function Rb(p,S,M,ne,pe,re,oe,Ee,Te,Ce,ke,Be,Pe,Se,Le){var X=Ce.Record,ue={add:32774,subtract:32778,"reverse subtract":32779};M.ext_blend_minmax&&(ue.min=kb,ue.max=Ab);var Ie=M.angle_instanced_arrays,Ue=M.webgl_draw_buffers,_e={dirty:!0,profile:Le.profile},qe={},xe=[],Me={},we={};function Ne(C){return C.replace(".","_")}function tt(C,E,P){var K=Ne(C);xe.push(C),qe[K]=_e[K]=!!P,Me[K]=E}function dt(C,E,P){var K=Ne(C);xe.push(C),Array.isArray(P)?(_e[K]=P.slice(),qe[K]=P.slice()):_e[K]=qe[K]=P,we[K]=E}tt(dc,bb),tt(fc,_b),dt(cc,"blendColor",[0,0,0,0]),dt(dl,"blendEquationSeparate",[zc,zc]),dt(fl,"blendFuncSeparate",[Rc,Oc,Rc,Oc]),tt(pc,xb,!0),dt(hc,"depthFunc",Cb),dt(mc,"depthRange",[0,1]),dt(gc,"depthMask",!0),dt(cl,cl,[!0,!0,!0,!0]),tt(yc,vb),dt(vc,"cullFace",cn),dt(pl,pl,El),dt(hl,hl,1),tt(_c,Eb),dt(ml,"polygonOffset",[0,0]),tt(bc,Sb),tt(wc,Tb),dt(gl,"sampleCoverage",[1,!1]),tt(xc,wb),dt($c,"stencilMask",-1),dt(yl,"stencilFunc",[Ib,0,-1]),dt(vl,"stencilOpSeparate",[is,Ma,Ma,Ma]),dt(Xi,"stencilOpSeparate",[cn,Ma,Ma,Ma]),tt(Ec,$b),dt(Io,"scissor",[0,0,p.drawingBufferWidth,p.drawingBufferHeight]),dt(_a,_a,[0,0,p.drawingBufferWidth,p.drawingBufferHeight]);var Ge={gl:p,context:Pe,strings:S,next:qe,current:_e,draw:Be,elements:re,buffer:pe,shader:ke,attributes:Ce.state,vao:Ce,uniforms:Te,framebuffer:Ee,extensions:M,timer:Se,isBufferArgs:Fo},Re={primTypes:Ia,compareFuncs:ti,blendFuncs:ua,blendEquations:ue,stencilOps:Na,glTypes:pa,orientationType:Sl};I.optional(function(){Ge.isArrayLike=qt}),Ue&&(Re.backBuffer=[cn],Re.drawBuffer=gr(ne.maxDrawbuffers,function(C){return C===0?[0]:gr(C,function(E){return Ob+E})}));var ve=0;function lt(){var C=db(),E=C.link,P=C.global;C.id=ve++,C.batchId="0";var K=E(Ge),Y=C.shared={props:"a0"};Object.keys(Ge).forEach(function(D){Y[D]=P.def(K,".",D)}),I.optional(function(){C.CHECK=E(I),C.commandStr=I.guessCommand(),C.command=E(C.commandStr),C.assert=function(D,A,H){D("if(!(",A,"))",this.CHECK,".commandRaise(",E(H),",",this.command,");")},Re.invalidBlendCombinations=Lc});var V=C.next={},G=C.current={};Object.keys(we).forEach(function(D){Array.isArray(_e[D])&&(V[D]=P.def(Y.next,".",D),G[D]=P.def(Y.current,".",D))});var q=C.constants={};Object.keys(Re).forEach(function(D){q[D]=P.def(JSON.stringify(Re[D]))}),C.invoke=function(D,A){switch(A.type){case sl:var H=["this",Y.context,Y.props,C.batchId];return D.def(E(A.data),".call(",H.slice(0,Math.max(A.data.length+1,4)),")");case ol:return D.def(Y.props,A.data);case ul:return D.def(Y.context,A.data);case ll:return D.def("this",A.data);case Ao:return A.data.append(C,D),A.data.ref;case uc:return A.data.toString();case lc:return A.data.map(function(Z){return C.invoke(D,Z)})}},C.attribCache={};var O={};return C.scopeAttrib=function(D){var A=S.id(D);if(A in O)return O[A];var H=Ce.scope[A];H||(H=Ce.scope[A]=new X);var Z=O[A]=E(H);return Z},C}function ht(C){var E=C.static,P=C.dynamic,K;if(Yi in E){var Y=!!E[Yi];K=tr(function(G,q){return Y}),K.enable=Y}else if(Yi in P){var V=P[Yi];K=Ar(V,function(G,q){return G.invoke(q,V)})}return K}function Ye(C,E){var P=C.static,K=C.dynamic;if(un in P){var Y=P[un];return Y?(Y=Ee.getFramebuffer(Y),I.command(Y,"invalid framebuffer object"),tr(function(G,q){var O=G.link(Y),D=G.shared;q.set(D.framebuffer,".next",O);var A=D.context;return q.set(A,"."+Zn,O+".width"),q.set(A,"."+Jn,O+".height"),O})):tr(function(G,q){var O=G.shared;q.set(O.framebuffer,".next","null");var D=O.context;return q.set(D,"."+Zn,D+"."+Tc),q.set(D,"."+Jn,D+"."+kc),"null"})}else if(un in K){var V=K[un];return Ar(V,function(G,q){var O=G.invoke(q,V),D=G.shared,A=D.framebuffer,H=q.def(A,".getFramebuffer(",O,")");I.optional(function(){G.assert(q,"!"+O+"||"+H,"invalid framebuffer object")}),q.set(A,".next",H);var Z=D.context;return q.set(Z,"."+Zn,H+"?"+H+".width:"+Z+"."+Tc),q.set(Z,"."+Jn,H+"?"+H+".height:"+Z+"."+kc),H})}else return null}function bt(C,E,P){var K=C.static,Y=C.dynamic;function V(O){if(O in K){var D=K[O];I.commandType(D,"object","invalid "+O,P.commandStr);var A=!0,H=D.x|0,Z=D.y|0,ce,he;return"width"in D?(ce=D.width|0,I.command(ce>=0,"invalid "+O,P.commandStr)):A=!1,"height"in D?(he=D.height|0,I.command(he>=0,"invalid "+O,P.commandStr)):A=!1,new $r(!A&&E&&E.thisDep,!A&&E&&E.contextDep,!A&&E&&E.propDep,function(Ze,gt){var Qe=Ze.shared.context,ot=ce;"width"in D||(ot=gt.def(Qe,".",Zn,"-",H));var pt=he;return"height"in D||(pt=gt.def(Qe,".",Jn,"-",Z)),[H,Z,ot,pt]})}else if(O in Y){var le=Y[O],Ae=Ar(le,function(Ze,gt){var Qe=Ze.invoke(gt,le);I.optional(function(){Ze.assert(gt,Qe+"&&typeof "+Qe+'==="object"',"invalid "+O)});var ot=Ze.shared.context,pt=gt.def(Qe,".x|0"),Ct=gt.def(Qe,".y|0"),jt=gt.def('"width" in ',Qe,"?",Qe,".width|0:","(",ot,".",Zn,"-",pt,")"),Er=gt.def('"height" in ',Qe,"?",Qe,".height|0:","(",ot,".",Jn,"-",Ct,")");return I.optional(function(){Ze.assert(gt,jt+">=0&&"+Er+">=0","invalid "+O)}),[pt,Ct,jt,Er]});return E&&(Ae.thisDep=Ae.thisDep||E.thisDep,Ae.contextDep=Ae.contextDep||E.contextDep,Ae.propDep=Ae.propDep||E.propDep),Ae}else return E?new $r(E.thisDep,E.contextDep,E.propDep,function(Ze,gt){var Qe=Ze.shared.context;return[0,0,gt.def(Qe,".",Zn),gt.def(Qe,".",Jn)]}):null}var G=V(_a);if(G){var q=G;G=new $r(G.thisDep,G.contextDep,G.propDep,function(O,D){var A=q.append(O,D),H=O.shared.context;return D.set(H,"."+fb,A[2]),D.set(H,"."+cb,A[3]),A})}return{viewport:G,scissor_box:V(Io)}}function ft(C,E){var P=C.static,K=typeof P[Zi]=="string"&&typeof P[Qi]=="string";if(K){if(Object.keys(E.dynamic).length>0)return null;var Y=E.static,V=Object.keys(Y);if(V.length>0&&typeof Y[V[0]]=="number"){for(var G=[],q=0;q<V.length;++q)I(typeof Y[V[q]]=="number","must specify all vertex attribute locations when using vaos"),G.push([Y[V[q]]|0,V[q]]);return G}}return null}function yt(C,E,P){var K=C.static,Y=C.dynamic;function V(A){if(A in K){var H=S.id(K[A]);I.optional(function(){ke.shader(Mc[A],H,I.guessCommand())});var Z=tr(function(){return H});return Z.id=H,Z}else if(A in Y){var ce=Y[A];return Ar(ce,function(he,le){var Ae=he.invoke(le,ce),Ze=le.def(he.shared.strings,".id(",Ae,")");return I.optional(function(){le(he.shared.shader,".shader(",Mc[A],",",Ze,",",he.command,");")}),Ze})}return null}var G=V(Zi),q=V(Qi),O=null,D;return Da(G)&&Da(q)?(O=ke.program(q.id,G.id,null,P),D=tr(function(A,H){return A.link(O)})):D=new $r(G&&G.thisDep||q&&q.thisDep,G&&G.contextDep||q&&q.contextDep,G&&G.propDep||q&&q.propDep,function(A,H){var Z=A.shared.shader,ce;G?ce=G.append(A,H):ce=H.def(Z,".",Zi);var he;q?he=q.append(A,H):he=H.def(Z,".",Qi);var le=Z+".program("+he+","+ce;return I.optional(function(){le+=","+A.command}),H.def(le+")")}),{frag:G,vert:q,progVar:D,program:O}}function It(C,E){var P=C.static,K=C.dynamic;function Y(){if(ln in P){var A=P[ln];Fo(A)?A=re.getElements(re.create(A,!0)):A&&(A=re.getElements(A),I.command(A,"invalid elements",E.commandStr));var H=tr(function(ce,he){if(A){var le=ce.link(A);return ce.ELEMENTS=le,le}return ce.ELEMENTS=null,null});return H.value=A,H}else if(ln in K){var Z=K[ln];return Ar(Z,function(ce,he){var le=ce.shared,Ae=le.isBufferArgs,Ze=le.elements,gt=ce.invoke(he,Z),Qe=he.def("null"),ot=he.def(Ae,"(",gt,")"),pt=ce.cond(ot).then(Qe,"=",Ze,".createStream(",gt,");").else(Qe,"=",Ze,".getElements(",gt,");");return I.optional(function(){ce.assert(pt.else,"!"+gt+"||"+Qe,"invalid elements")}),he.entry(pt),he.exit(ce.cond(ot).then(Ze,".destroyStream(",Qe,");")),ce.ELEMENTS=Qe,Qe})}return null}var V=Y();function G(){if(dn in P){var A=P[dn];return I.commandParameter(A,Ia,"invalid primitve",E.commandStr),tr(function(Z,ce){return Ia[A]})}else if(dn in K){var H=K[dn];return Ar(H,function(Z,ce){var he=Z.constants.primTypes,le=Z.invoke(ce,H);return I.optional(function(){Z.assert(ce,le+" in "+he,"invalid primitive, must be one of "+Object.keys(Ia))}),ce.def(he,"[",le,"]")})}else if(V)return Da(V)?V.value?tr(function(Z,ce){return ce.def(Z.ELEMENTS,".primType")}):tr(function(){return Ic}):new $r(V.thisDep,V.contextDep,V.propDep,function(Z,ce){var he=Z.ELEMENTS;return ce.def(he,"?",he,".primType:",Ic)});return null}function q(A,H){if(A in P){var Z=P[A]|0;return I.command(!H||Z>=0,"invalid "+A,E.commandStr),tr(function(he,le){return H&&(he.OFFSET=Z),Z})}else if(A in K){var ce=K[A];return Ar(ce,function(he,le){var Ae=he.invoke(le,ce);return H&&(he.OFFSET=Ae,I.optional(function(){he.assert(le,Ae+">=0","invalid "+A)})),Ae})}else if(H&&V)return tr(function(he,le){return he.OFFSET="0",0});return null}var O=q(Co,!0);function D(){if(fn in P){var A=P[fn]|0;return I.command(typeof A=="number"&&A>=0,"invalid vertex count",E.commandStr),tr(function(){return A})}else if(fn in K){var H=K[fn];return Ar(H,function(he,le){var Ae=he.invoke(le,H);return I.optional(function(){he.assert(le,"typeof "+Ae+'==="number"&&'+Ae+">=0&&"+Ae+"===("+Ae+"|0)","invalid vertex count")}),Ae})}else if(V)if(Da(V)){if(V)return O?new $r(O.thisDep,O.contextDep,O.propDep,function(he,le){var Ae=le.def(he.ELEMENTS,".vertCount-",he.OFFSET);return I.optional(function(){he.assert(le,Ae+">=0","invalid vertex offset/element buffer too small")}),Ae}):tr(function(he,le){return le.def(he.ELEMENTS,".vertCount")});var Z=tr(function(){return-1});return I.optional(function(){Z.MISSING=!0}),Z}else{var ce=new $r(V.thisDep||O.thisDep,V.contextDep||O.contextDep,V.propDep||O.propDep,function(he,le){var Ae=he.ELEMENTS;return he.OFFSET?le.def(Ae,"?",Ae,".vertCount-",he.OFFSET,":-1"):le.def(Ae,"?",Ae,".vertCount:-1")});return I.optional(function(){ce.DYNAMIC=!0}),ce}return null}return{elements:V,primitive:G(),count:D(),instances:q(Oo,!1),offset:O}}function rr(C,E){var P=C.static,K=C.dynamic,Y={};return xe.forEach(function(V){var G=Ne(V);function q(O,D){if(V in P){var A=O(P[V]);Y[G]=tr(function(){return A})}else if(V in K){var H=K[V];Y[G]=Ar(H,function(Z,ce){return D(Z,ce,Z.invoke(ce,H))})}}switch(V){case yc:case fc:case dc:case xc:case pc:case Ec:case _c:case bc:case wc:case gc:return q(function(O){return I.commandType(O,"boolean",V,E.commandStr),O},function(O,D,A){return I.optional(function(){O.assert(D,"typeof "+A+'==="boolean"',"invalid flag "+V,O.commandStr)}),A});case hc:return q(function(O){return I.commandParameter(O,ti,"invalid "+V,E.commandStr),ti[O]},function(O,D,A){var H=O.constants.compareFuncs;return I.optional(function(){O.assert(D,A+" in "+H,"invalid "+V+", must be one of "+Object.keys(ti))}),D.def(H,"[",A,"]")});case mc:return q(function(O){return I.command(qt(O)&&O.length===2&&typeof O[0]=="number"&&typeof O[1]=="number"&&O[0]<=O[1],"depth range is 2d array",E.commandStr),O},function(O,D,A){I.optional(function(){O.assert(D,O.shared.isArrayLike+"("+A+")&&"+A+".length===2&&typeof "+A+'[0]==="number"&&typeof '+A+'[1]==="number"&&'+A+"[0]<="+A+"[1]","depth range must be a 2d array")});var H=D.def("+",A,"[0]"),Z=D.def("+",A,"[1]");return[H,Z]});case fl:return q(function(O){I.commandType(O,"object","blend.func",E.commandStr);var D="srcRGB"in O?O.srcRGB:O.src,A="srcAlpha"in O?O.srcAlpha:O.src,H="dstRGB"in O?O.dstRGB:O.dst,Z="dstAlpha"in O?O.dstAlpha:O.dst;return I.commandParameter(D,ua,G+".srcRGB",E.commandStr),I.commandParameter(A,ua,G+".srcAlpha",E.commandStr),I.commandParameter(H,ua,G+".dstRGB",E.commandStr),I.commandParameter(Z,ua,G+".dstAlpha",E.commandStr),I.command(Lc.indexOf(D+", "+H)===-1,"unallowed blending combination (srcRGB, dstRGB) = ("+D+", "+H+")",E.commandStr),[ua[D],ua[H],ua[A],ua[Z]]},function(O,D,A){var H=O.constants.blendFuncs;I.optional(function(){O.assert(D,A+"&&typeof "+A+'==="object"',"invalid blend func, must be an object")});function Z(Qe,ot){var pt=D.def('"',Qe,ot,'" in ',A,"?",A,".",Qe,ot,":",A,".",Qe);return I.optional(function(){O.assert(D,pt+" in "+H,"invalid "+V+"."+Qe+ot+", must be one of "+Object.keys(ua))}),pt}var ce=Z("src","RGB"),he=Z("dst","RGB");I.optional(function(){var Qe=O.constants.invalidBlendCombinations;O.assert(D,Qe+".indexOf("+ce+'+", "+'+he+") === -1 ","unallowed blending combination for (srcRGB, dstRGB)")});var le=D.def(H,"[",ce,"]"),Ae=D.def(H,"[",Z("src","Alpha"),"]"),Ze=D.def(H,"[",he,"]"),gt=D.def(H,"[",Z("dst","Alpha"),"]");return[le,Ze,Ae,gt]});case dl:return q(function(O){if(typeof O=="string")return I.commandParameter(O,ue,"invalid "+V,E.commandStr),[ue[O],ue[O]];if(typeof O=="object")return I.commandParameter(O.rgb,ue,V+".rgb",E.commandStr),I.commandParameter(O.alpha,ue,V+".alpha",E.commandStr),[ue[O.rgb],ue[O.alpha]];I.commandRaise("invalid blend.equation",E.commandStr)},function(O,D,A){var H=O.constants.blendEquations,Z=D.def(),ce=D.def(),he=O.cond("typeof ",A,'==="string"');return I.optional(function(){function le(Ae,Ze,gt){O.assert(Ae,gt+" in "+H,"invalid "+Ze+", must be one of "+Object.keys(ue))}le(he.then,V,A),O.assert(he.else,A+"&&typeof "+A+'==="object"',"invalid "+V),le(he.else,V+".rgb",A+".rgb"),le(he.else,V+".alpha",A+".alpha")}),he.then(Z,"=",ce,"=",H,"[",A,"];"),he.else(Z,"=",H,"[",A,".rgb];",ce,"=",H,"[",A,".alpha];"),D(he),[Z,ce]});case cc:return q(function(O){return I.command(qt(O)&&O.length===4,"blend.color must be a 4d array",E.commandStr),gr(4,function(D){return+O[D]})},function(O,D,A){return I.optional(function(){O.assert(D,O.shared.isArrayLike+"("+A+")&&"+A+".length===4","blend.color must be a 4d array")}),gr(4,function(H){return D.def("+",A,"[",H,"]")})});case $c:return q(function(O){return I.commandType(O,"number",G,E.commandStr),O|0},function(O,D,A){return I.optional(function(){O.assert(D,"typeof "+A+'==="number"',"invalid stencil.mask")}),D.def(A,"|0")});case yl:return q(function(O){I.commandType(O,"object",G,E.commandStr);var D=O.cmp||"keep",A=O.ref||0,H="mask"in O?O.mask:-1;return I.commandParameter(D,ti,V+".cmp",E.commandStr),I.commandType(A,"number",V+".ref",E.commandStr),I.commandType(H,"number",V+".mask",E.commandStr),[ti[D],A,H]},function(O,D,A){var H=O.constants.compareFuncs;I.optional(function(){function le(){O.assert(D,Array.prototype.join.call(arguments,""),"invalid stencil.func")}le(A+"&&typeof ",A,'==="object"'),le('!("cmp" in ',A,")||(",A,".cmp in ",H,")")});var Z=D.def('"cmp" in ',A,"?",H,"[",A,".cmp]",":",Ma),ce=D.def(A,".ref|0"),he=D.def('"mask" in ',A,"?",A,".mask|0:-1");return[Z,ce,he]});case vl:case Xi:return q(function(O){I.commandType(O,"object",G,E.commandStr);var D=O.fail||"keep",A=O.zfail||"keep",H=O.zpass||"keep";return I.commandParameter(D,Na,V+".fail",E.commandStr),I.commandParameter(A,Na,V+".zfail",E.commandStr),I.commandParameter(H,Na,V+".zpass",E.commandStr),[V===Xi?cn:is,Na[D],Na[A],Na[H]]},function(O,D,A){var H=O.constants.stencilOps;I.optional(function(){O.assert(D,A+"&&typeof "+A+'==="object"',"invalid "+V)});function Z(ce){return I.optional(function(){O.assert(D,'!("'+ce+'" in '+A+")||("+A+"."+ce+" in "+H+")","invalid "+V+"."+ce+", must be one of "+Object.keys(Na))}),D.def('"',ce,'" in ',A,"?",H,"[",A,".",ce,"]:",Ma)}return[V===Xi?cn:is,Z("fail"),Z("zfail"),Z("zpass")]});case ml:return q(function(O){I.commandType(O,"object",G,E.commandStr);var D=O.factor|0,A=O.units|0;return I.commandType(D,"number",G+".factor",E.commandStr),I.commandType(A,"number",G+".units",E.commandStr),[D,A]},function(O,D,A){I.optional(function(){O.assert(D,A+"&&typeof "+A+'==="object"',"invalid "+V)});var H=D.def(A,".factor|0"),Z=D.def(A,".units|0");return[H,Z]});case vc:return q(function(O){var D=0;return O==="front"?D=is:O==="back"&&(D=cn),I.command(!!D,G,E.commandStr),D},function(O,D,A){return I.optional(function(){O.assert(D,A+'==="front"||'+A+'==="back"',"invalid cull.face")}),D.def(A,'==="front"?',is,":",cn)});case hl:return q(function(O){return I.command(typeof O=="number"&&O>=ne.lineWidthDims[0]&&O<=ne.lineWidthDims[1],"invalid line width, must be a positive number between "+ne.lineWidthDims[0]+" and "+ne.lineWidthDims[1],E.commandStr),O},function(O,D,A){return I.optional(function(){O.assert(D,"typeof "+A+'==="number"&&'+A+">="+ne.lineWidthDims[0]+"&&"+A+"<="+ne.lineWidthDims[1],"invalid line width")}),A});case pl:return q(function(O){return I.commandParameter(O,Sl,G,E.commandStr),Sl[O]},function(O,D,A){return I.optional(function(){O.assert(D,A+'==="cw"||'+A+'==="ccw"',"invalid frontFace, must be one of cw,ccw")}),D.def(A+'==="cw"?'+Cc+":"+El)});case cl:return q(function(O){return I.command(qt(O)&&O.length===4,"color.mask must be length 4 array",E.commandStr),O.map(function(D){return!!D})},function(O,D,A){return I.optional(function(){O.assert(D,O.shared.isArrayLike+"("+A+")&&"+A+".length===4","invalid color.mask")}),gr(4,function(H){return"!!"+A+"["+H+"]"})});case gl:return q(function(O){I.command(typeof O=="object"&&O,G,E.commandStr);var D="value"in O?O.value:1,A=!!O.invert;return I.command(typeof D=="number"&&D>=0&&D<=1,"sample.coverage.value must be a number between 0 and 1",E.commandStr),[D,A]},function(O,D,A){I.optional(function(){O.assert(D,A+"&&typeof "+A+'==="object"',"invalid sample.coverage")});var H=D.def('"value" in ',A,"?+",A,".value:1"),Z=D.def("!!",A,".invert");return[H,Z]})}}),Y}function or(C,E){var P=C.static,K=C.dynamic,Y={};return Object.keys(P).forEach(function(V){var G=P[V],q;if(typeof G=="number"||typeof G=="boolean")q=tr(function(){return G});else if(typeof G=="function"){var O=G._reglType;O==="texture2d"||O==="textureCube"?q=tr(function(D){return D.link(G)}):O==="framebuffer"||O==="framebufferCube"?(I.command(G.color.length>0,'missing color attachment for framebuffer sent to uniform "'+V+'"',E.commandStr),q=tr(function(D){return D.link(G.color[0])})):I.commandRaise('invalid data for uniform "'+V+'"',E.commandStr)}else qt(G)?q=tr(function(D){var A=D.global.def("[",gr(G.length,function(H){return I.command(typeof G[H]=="number"||typeof G[H]=="boolean","invalid uniform "+V,D.commandStr),G[H]}),"]");return A}):I.commandRaise('invalid or missing data for uniform "'+V+'"',E.commandStr);q.value=G,Y[V]=q}),Object.keys(K).forEach(function(V){var G=K[V];Y[V]=Ar(G,function(q,O){return q.invoke(O,G)})}),Y}function St(C,E){var P=C.static,K=C.dynamic,Y={};return Object.keys(P).forEach(function(V){var G=P[V],q=S.id(V),O=new X;if(Fo(G))O.state=Qn,O.buffer=pe.getBuffer(pe.create(G,ei,!1,!0)),O.type=0;else{var D=pe.getBuffer(G);if(D)O.state=Qn,O.buffer=D,O.type=0;else if(I.command(typeof G=="object"&&G,"invalid data for attribute "+V,E.commandStr),"constant"in G){var A=G.constant;O.buffer="null",O.state=il,typeof A=="number"?O.x=A:(I.command(qt(A)&&A.length>0&&A.length<=4,"invalid constant for attribute "+V,E.commandStr),Yn.forEach(function(Ze,gt){gt<A.length&&(O[Ze]=A[gt])}))}else{Fo(G.buffer)?D=pe.getBuffer(pe.create(G.buffer,ei,!1,!0)):D=pe.getBuffer(G.buffer),I.command(!!D,'missing buffer for attribute "'+V+'"',E.commandStr);var H=G.offset|0;I.command(H>=0,'invalid offset for attribute "'+V+'"',E.commandStr);var Z=G.stride|0;I.command(Z>=0&&Z<256,'invalid stride for attribute "'+V+'", must be integer betweeen [0, 255]',E.commandStr);var ce=G.size|0;I.command(!("size"in G)||ce>0&&ce<=4,'invalid size for attribute "'+V+'", must be 1,2,3,4',E.commandStr);var he=!!G.normalized,le=0;"type"in G&&(I.commandParameter(G.type,pa,"invalid type for attribute "+V,E.commandStr),le=pa[G.type]);var Ae=G.divisor|0;"divisor"in G&&(I.command(Ae===0||Ie,'cannot specify divisor for attribute "'+V+'", instancing not supported',E.commandStr),I.command(Ae>=0,'invalid divisor for attribute "'+V+'"',E.commandStr)),I.optional(function(){var Ze=E.commandStr,gt=["buffer","offset","divisor","normalized","type","size","stride"];Object.keys(G).forEach(function(Qe){I.command(gt.indexOf(Qe)>=0,'unknown parameter "'+Qe+'" for attribute pointer "'+V+'" (valid parameters are '+gt+")",Ze)})}),O.buffer=D,O.state=Qn,O.size=ce,O.normalized=he,O.type=le||D.dtype,O.offset=H,O.stride=Z,O.divisor=Ae}}Y[V]=tr(function(Ze,gt){var Qe=Ze.attribCache;if(q in Qe)return Qe[q];var ot={isStream:!1};return Object.keys(O).forEach(function(pt){ot[pt]=O[pt]}),O.buffer&&(ot.buffer=Ze.link(O.buffer),ot.type=ot.type||ot.buffer+".dtype"),Qe[q]=ot,ot})}),Object.keys(K).forEach(function(V){var G=K[V];function q(O,D){var A=O.invoke(D,G),H=O.shared,Z=O.constants,ce=H.isBufferArgs,he=H.buffer;I.optional(function(){O.assert(D,A+"&&(typeof "+A+'==="object"||typeof '+A+'==="function")&&('+ce+"("+A+")||"+he+".getBuffer("+A+")||"+he+".getBuffer("+A+".buffer)||"+ce+"("+A+'.buffer)||("constant" in '+A+"&&(typeof "+A+'.constant==="number"||'+H.isArrayLike+"("+A+".constant))))",'invalid dynamic attribute "'+V+'"')});var le={isStream:D.def(!1)},Ae=new X;Ae.state=Qn,Object.keys(Ae).forEach(function(ot){le[ot]=D.def(""+Ae[ot])});var Ze=le.buffer,gt=le.type;D("if(",ce,"(",A,")){",le.isStream,"=true;",Ze,"=",he,".createStream(",ei,",",A,");",gt,"=",Ze,".dtype;","}else{",Ze,"=",he,".getBuffer(",A,");","if(",Ze,"){",gt,"=",Ze,".dtype;",'}else if("constant" in ',A,"){",le.state,"=",il,";","if(typeof "+A+'.constant === "number"){',le[Yn[0]],"=",A,".constant;",Yn.slice(1).map(function(ot){return le[ot]}).join("="),"=0;","}else{",Yn.map(function(ot,pt){return le[ot]+"="+A+".constant.length>"+pt+"?"+A+".constant["+pt+"]:0;"}).join(""),"}}else{","if(",ce,"(",A,".buffer)){",Ze,"=",he,".createStream(",ei,",",A,".buffer);","}else{",Ze,"=",he,".getBuffer(",A,".buffer);","}",gt,'="type" in ',A,"?",Z.glTypes,"[",A,".type]:",Ze,".dtype;",le.normalized,"=!!",A,".normalized;");function Qe(ot){D(le[ot],"=",A,".",ot,"|0;")}return Qe("size"),Qe("offset"),Qe("stride"),Qe("divisor"),D("}}"),D.exit("if(",le.isStream,"){",he,".destroyStream(",Ze,");","}"),le}Y[V]=Ar(G,q)}),Y}function nr(C,E){var P=C.static,K=C.dynamic;if(Ji in P){var Y=P[Ji];return Y!==null&&Ce.getVAO(Y)===null&&(Y=Ce.createVAO(Y)),tr(function(G){return G.link(Ce.getVAO(Y))})}else if(Ji in K){var V=K[Ji];return Ar(V,function(G,q){var O=G.invoke(q,V);return q.def(G.shared.vao+".getVAO("+O+")")})}return null}function Pt(C){var E=C.static,P=C.dynamic,K={};return Object.keys(E).forEach(function(Y){var V=E[Y];K[Y]=tr(function(G,q){return typeof V=="number"||typeof V=="boolean"?""+V:G.link(V)})}),Object.keys(P).forEach(function(Y){var V=P[Y];K[Y]=Ar(V,function(G,q){return G.invoke(q,V)})}),K}function ar(C,E,P,K,Y){var V=C.static,G=C.dynamic;I.optional(function(){var Qe=[un,Qi,Zi,ln,dn,Co,fn,Oo,Yi,Ji].concat(xe);function ot(pt){Object.keys(pt).forEach(function(Ct){I.command(Qe.indexOf(Ct)>=0,'unknown parameter "'+Ct+'"',Y.commandStr)})}ot(V),ot(G)});var q=ft(C,E),O=Ye(C),D=bt(C,O,Y),A=It(C,Y),H=rr(C,Y),Z=yt(C,Y,q);function ce(Qe){var ot=D[Qe];ot&&(H[Qe]=ot)}ce(_a),ce(Ne(Io));var he=Object.keys(H).length>0,le={framebuffer:O,draw:A,shader:Z,state:H,dirty:he,scopeVAO:null,drawVAO:null,useVAO:!1,attributes:{}};if(le.profile=ht(C),le.uniforms=or(P,Y),le.drawVAO=le.scopeVAO=nr(C),!le.drawVAO&&Z.program&&!q&&M.angle_instanced_arrays){var Ae=!0,Ze=Z.program.attributes.map(function(Qe){var ot=E.static[Qe];return Ae=Ae&&!!ot,ot});if(Ae&&Ze.length>0){var gt=Ce.getVAO(Ce.createVAO(Ze));le.drawVAO=new $r(null,null,null,function(Qe,ot){return Qe.link(gt)}),le.useVAO=!0}}return q?le.useVAO=!0:le.attributes=St(E,Y),le.context=Pt(K),le}function ir(C,E,P){var K=C.shared,Y=K.context,V=C.scope();Object.keys(P).forEach(function(G){E.save(Y,"."+G);var q=P[G],O=q.append(C,E);Array.isArray(O)?V(Y,".",G,"=[",O.join(),"];"):V(Y,".",G,"=",O,";")}),E(V)}function sr(C,E,P,K){var Y=C.shared,V=Y.gl,G=Y.framebuffer,q;Ue&&(q=E.def(Y.extensions,".webgl_draw_buffers"));var O=C.constants,D=O.drawBuffer,A=O.backBuffer,H;P?H=P.append(C,E):H=E.def(G,".next"),K||E("if(",H,"!==",G,".cur){"),E("if(",H,"){",V,".bindFramebuffer(",Bc,",",H,".framebuffer);"),Ue&&E(q,".drawBuffersWEBGL(",D,"[",H,".colorAttachments.length]);"),E("}else{",V,".bindFramebuffer(",Bc,",null);"),Ue&&E(q,".drawBuffersWEBGL(",A,");"),E("}",G,".cur=",H,";"),K||E("}")}function ur(C,E,P){var K=C.shared,Y=K.gl,V=C.current,G=C.next,q=K.current,O=K.next,D=C.cond(q,".dirty");xe.forEach(function(A){var H=Ne(A);if(!(H in P.state)){var Z,ce;if(H in G){Z=G[H],ce=V[H];var he=gr(_e[H].length,function(Ae){return D.def(Z,"[",Ae,"]")});D(C.cond(he.map(function(Ae,Ze){return Ae+"!=="+ce+"["+Ze+"]"}).join("||")).then(Y,".",we[H],"(",he,");",he.map(function(Ae,Ze){return ce+"["+Ze+"]="+Ae}).join(";"),";"))}else{Z=D.def(O,".",H);var le=C.cond(Z,"!==",q,".",H);D(le),H in Me?le(C.cond(Z).then(Y,".enable(",Me[H],");").else(Y,".disable(",Me[H],");"),q,".",H,"=",Z,";"):le(Y,".",we[H],"(",Z,");",q,".",H,"=",Z,";")}}}),Object.keys(P.state).length===0&&D(q,".dirty=false;"),E(D)}function fr(C,E,P,K){var Y=C.shared,V=C.current,G=Y.current,q=Y.gl;Nc(Object.keys(P)).forEach(function(O){var D=P[O];if(!(K&&!K(D))){var A=D.append(C,E);if(Me[O]){var H=Me[O];Da(D)?A?E(q,".enable(",H,");"):E(q,".disable(",H,");"):E(C.cond(A).then(q,".enable(",H,");").else(q,".disable(",H,");")),E(G,".",O,"=",A,";")}else if(qt(A)){var Z=V[O];E(q,".",we[O],"(",A,");",A.map(function(ce,he){return Z+"["+he+"]="+ce}).join(";"),";")}else E(q,".",we[O],"(",A,");",G,".",O,"=",A,";")}})}function Yt(C,E){Ie&&(C.instancing=E.def(C.shared.extensions,".angle_instanced_arrays"))}function mt(C,E,P,K,Y){var V=C.shared,G=C.stats,q=V.current,O=V.timer,D=P.profile;function A(){return typeof performance>"u"?"Date.now()":"performance.now()"}var H,Z;function ce(Qe){H=E.def(),Qe(H,"=",A(),";"),typeof Y=="string"?Qe(G,".count+=",Y,";"):Qe(G,".count++;"),Se&&(K?(Z=E.def(),Qe(Z,"=",O,".getNumPendingQueries();")):Qe(O,".beginQuery(",G,");"))}function he(Qe){Qe(G,".cpuTime+=",A(),"-",H,";"),Se&&(K?Qe(O,".pushScopeStats(",Z,",",O,".getNumPendingQueries(),",G,");"):Qe(O,".endQuery();"))}function le(Qe){var ot=E.def(q,".profile");E(q,".profile=",Qe,";"),E.exit(q,".profile=",ot,";")}var Ae;if(D){if(Da(D)){D.enable?(ce(E),he(E.exit),le("true")):le("false");return}Ae=D.append(C,E),le(Ae)}else Ae=E.def(q,".profile");var Ze=C.block();ce(Ze),E("if(",Ae,"){",Ze,"}");var gt=C.block();he(gt),E.exit("if(",Ae,"){",gt,"}")}function cr(C,E,P,K,Y){var V=C.shared;function G(O){switch(O){case Ro:case Lo:case Do:return 2;case zo:case Mo:case Po:return 3;case Bo:case No:case Go:return 4;default:return 1}}function q(O,D,A){var H=V.gl,Z=E.def(O,".location"),ce=E.def(V.attributes,"[",Z,"]"),he=A.state,le=A.buffer,Ae=[A.x,A.y,A.z,A.w],Ze=["buffer","normalized","offset","stride"];function gt(){E("if(!",ce,".buffer){",H,".enableVertexAttribArray(",Z,");}");var ot=A.type,pt;if(A.size?pt=E.def(A.size,"||",D):pt=D,E("if(",ce,".type!==",ot,"||",ce,".size!==",pt,"||",Ze.map(function(jt){return ce+"."+jt+"!=="+A[jt]}).join("||"),"){",H,".bindBuffer(",ei,",",le,".buffer);",H,".vertexAttribPointer(",[Z,pt,ot,A.normalized,A.stride,A.offset],");",ce,".type=",ot,";",ce,".size=",pt,";",Ze.map(function(jt){return ce+"."+jt+"="+A[jt]+";"}).join(""),"}"),Ie){var Ct=A.divisor;E("if(",ce,".divisor!==",Ct,"){",C.instancing,".vertexAttribDivisorANGLE(",[Z,Ct],");",ce,".divisor=",Ct,";}")}}function Qe(){E("if(",ce,".buffer){",H,".disableVertexAttribArray(",Z,");",ce,".buffer=null;","}if(",Yn.map(function(ot,pt){return ce+"."+ot+"!=="+Ae[pt]}).join("||"),"){",H,".vertexAttrib4f(",Z,",",Ae,");",Yn.map(function(ot,pt){return ce+"."+ot+"="+Ae[pt]+";"}).join(""),"}")}he===Qn?gt():he===il?Qe():(E("if(",he,"===",Qn,"){"),gt(),E("}else{"),Qe(),E("}"))}K.forEach(function(O){var D=O.name,A=P.attributes[D],H;if(A){if(!Y(A))return;H=A.append(C,E)}else{if(!Y(Dc))return;var Z=C.scopeAttrib(D);I.optional(function(){C.assert(E,Z+".state","missing attribute "+D)}),H={},Object.keys(new X).forEach(function(ce){H[ce]=E.def(Z,".",ce)})}q(C.link(O),G(O.info.type),H)})}function Rt(C,E,P,K,Y){for(var V=C.shared,G=V.gl,q,O=0;O<K.length;++O){var D=K[O],A=D.name,H=D.info.type,Z=P.uniforms[A],ce=C.link(D),he=ce+".location",le;if(Z){if(!Y(Z))continue;if(Da(Z)){var Ae=Z.value;if(I.command(Ae!==null&&typeof Ae<"u",'missing uniform "'+A+'"',C.commandStr),H===as||H===ns){I.command(typeof Ae=="function"&&(H===as&&(Ae._reglType==="texture2d"||Ae._reglType==="framebuffer")||H===ns&&(Ae._reglType==="textureCube"||Ae._reglType==="framebufferCube")),"invalid texture for uniform "+A,C.commandStr);var Ze=C.link(Ae._texture||Ae.color[0]._texture);E(G,".uniform1i(",he,",",Ze+".bind());"),E.exit(Ze,".unbind();")}else if(H===es||H===ts||H===rs){I.optional(function(){I.command(qt(Ae),"invalid matrix for uniform "+A,C.commandStr),I.command(H===es&&Ae.length===4||H===ts&&Ae.length===9||H===rs&&Ae.length===16,"invalid length for matrix uniform "+A,C.commandStr)});var gt=C.global.def("new Float32Array(["+Array.prototype.slice.call(Ae)+"])"),Qe=2;H===ts?Qe=3:H===rs&&(Qe=4),E(G,".uniformMatrix",Qe,"fv(",he,",false,",gt,");")}else{switch(H){case wl:I.commandType(Ae,"number","uniform "+A,C.commandStr),q="1f";break;case Ro:I.command(qt(Ae)&&Ae.length===2,"uniform "+A,C.commandStr),q="2f";break;case zo:I.command(qt(Ae)&&Ae.length===3,"uniform "+A,C.commandStr),q="3f";break;case Bo:I.command(qt(Ae)&&Ae.length===4,"uniform "+A,C.commandStr),q="4f";break;case $l:I.commandType(Ae,"boolean","uniform "+A,C.commandStr),q="1i";break;case xl:I.commandType(Ae,"number","uniform "+A,C.commandStr),q="1i";break;case Do:I.command(qt(Ae)&&Ae.length===2,"uniform "+A,C.commandStr),q="2i";break;case Lo:I.command(qt(Ae)&&Ae.length===2,"uniform "+A,C.commandStr),q="2i";break;case Po:I.command(qt(Ae)&&Ae.length===3,"uniform "+A,C.commandStr),q="3i";break;case Mo:I.command(qt(Ae)&&Ae.length===3,"uniform "+A,C.commandStr),q="3i";break;case Go:I.command(qt(Ae)&&Ae.length===4,"uniform "+A,C.commandStr),q="4i";break;case No:I.command(qt(Ae)&&Ae.length===4,"uniform "+A,C.commandStr),q="4i";break}E(G,".uniform",q,"(",he,",",qt(Ae)?Array.prototype.slice.call(Ae):Ae,");")}continue}else le=Z.append(C,E)}else{if(!Y(Dc))continue;le=E.def(V.uniforms,"[",S.id(A),"]")}H===as?(I(!Array.isArray(le),"must specify a scalar prop for textures"),E("if(",le,"&&",le,'._reglType==="framebuffer"){',le,"=",le,".color[0];","}")):H===ns&&(I(!Array.isArray(le),"must specify a scalar prop for cube maps"),E("if(",le,"&&",le,'._reglType==="framebufferCube"){',le,"=",le,".color[0];","}")),I.optional(function(){function Er(Wr,qc){C.assert(E,Wr,'bad data or missing for uniform "'+A+'".  '+qc)}function Tl(Wr){I(!Array.isArray(le),"must not specify an array type for uniform"),Er("typeof "+le+'==="'+Wr+'"',"invalid type, expected "+Wr)}function Lr(Wr,qc){Array.isArray(le)?I(le.length===Wr,"must have length "+Wr):Er(V.isArrayLike+"("+le+")&&"+le+".length==="+Wr,"invalid vector, should have length "+Wr,C.commandStr)}function Wc(Wr){I(!Array.isArray(le),"must not specify a value type"),Er("typeof "+le+'==="function"&&'+le+'._reglType==="texture'+(Wr===Ac?"2d":"Cube")+'"',"invalid texture type",C.commandStr)}switch(H){case xl:Tl("number");break;case Lo:Lr(2);break;case Mo:Lr(3);break;case No:Lr(4);break;case wl:Tl("number");break;case Ro:Lr(2);break;case zo:Lr(3);break;case Bo:Lr(4);break;case $l:Tl("boolean");break;case Do:Lr(2);break;case Po:Lr(3);break;case Go:Lr(4);break;case es:Lr(4);break;case ts:Lr(9);break;case rs:Lr(16);break;case as:Wc(Ac);break;case ns:Wc(yb);break}});var ot=1;switch(H){case as:case ns:var pt=E.def(le,"._texture");E(G,".uniform1i(",he,",",pt,".bind());"),E.exit(pt,".unbind();");continue;case xl:case $l:q="1i";break;case Lo:case Do:q="2i",ot=2;break;case Mo:case Po:q="3i",ot=3;break;case No:case Go:q="4i",ot=4;break;case wl:q="1f";break;case Ro:q="2f",ot=2;break;case zo:q="3f",ot=3;break;case Bo:q="4f",ot=4;break;case es:q="Matrix2fv";break;case ts:q="Matrix3fv";break;case rs:q="Matrix4fv";break}if(E(G,".uniform",q,"(",he,","),q.charAt(0)==="M"){var Ct=Math.pow(H-es+2,2),jt=C.global.def("new Float32Array(",Ct,")");Array.isArray(le)?E("false,(",gr(Ct,function(Er){return jt+"["+Er+"]="+le[Er]}),",",jt,")"):E("false,(Array.isArray(",le,")||",le," instanceof Float32Array)?",le,":(",gr(Ct,function(Er){return jt+"["+Er+"]="+le+"["+Er+"]"}),",",jt,")")}else ot>1?E(gr(ot,function(Er){return Array.isArray(le)?le[Er]:le+"["+Er+"]"})):(I(!Array.isArray(le),"uniform value must not be an array"),E(le));E(");")}}function it(C,E,P,K){var Y=C.shared,V=Y.gl,G=Y.draw,q=K.draw;function O(){var pt=q.elements,Ct,jt=E;return pt?((pt.contextDep&&K.contextDynamic||pt.propDep)&&(jt=P),Ct=pt.append(C,jt)):Ct=jt.def(G,".",ln),Ct&&jt("if("+Ct+")"+V+".bindBuffer("+hb+","+Ct+".buffer.buffer);"),Ct}function D(){var pt=q.count,Ct,jt=E;return pt?((pt.contextDep&&K.contextDynamic||pt.propDep)&&(jt=P),Ct=pt.append(C,jt),I.optional(function(){pt.MISSING&&C.assert(E,"false","missing vertex count"),pt.DYNAMIC&&C.assert(jt,Ct+">=0","missing vertex count")})):(Ct=jt.def(G,".",fn),I.optional(function(){C.assert(jt,Ct+">=0","missing vertex count")})),Ct}var A=O();function H(pt){var Ct=q[pt];return Ct?Ct.contextDep&&K.contextDynamic||Ct.propDep?Ct.append(C,P):Ct.append(C,E):E.def(G,".",pt)}var Z=H(dn),ce=H(Co),he=D();if(typeof he=="number"){if(he===0)return}else P("if(",he,"){"),P.exit("}");var le,Ae;Ie&&(le=H(Oo),Ae=C.instancing);var Ze=A+".type",gt=q.elements&&Da(q.elements);function Qe(){function pt(){P(Ae,".drawElementsInstancedANGLE(",[Z,he,Ze,ce+"<<(("+Ze+"-"+oc+")>>1)",le],");")}function Ct(){P(Ae,".drawArraysInstancedANGLE(",[Z,ce,he,le],");")}A?gt?pt():(P("if(",A,"){"),pt(),P("}else{"),Ct(),P("}")):Ct()}function ot(){function pt(){P(V+".drawElements("+[Z,he,Ze,ce+"<<(("+Ze+"-"+oc+")>>1)"]+");")}function Ct(){P(V+".drawArrays("+[Z,ce,he]+");")}A?gt?pt():(P("if(",A,"){"),pt(),P("}else{"),Ct(),P("}")):Ct()}Ie&&(typeof le!="number"||le>=0)?typeof le=="string"?(P("if(",le,">0){"),Qe(),P("}else if(",le,"<0){"),ot(),P("}")):Qe():ot()}function $t(C,E,P,K,Y){var V=lt(),G=V.proc("body",Y);return I.optional(function(){V.commandStr=E.commandStr,V.command=V.link(E.commandStr)}),Ie&&(V.instancing=G.def(V.shared.extensions,".angle_instanced_arrays")),C(V,G,P,K),V.compile().body}function kt(C,E,P,K){Yt(C,E),P.useVAO?P.drawVAO?E(C.shared.vao,".setVAO(",P.drawVAO.append(C,E),");"):E(C.shared.vao,".setVAO(",C.shared.vao,".targetVAO);"):(E(C.shared.vao,".setVAO(null);"),cr(C,E,P,K.attributes,function(){return!0})),Rt(C,E,P,K.uniforms,function(){return!0}),it(C,E,E,P)}function Qt(C,E){var P=C.proc("draw",1);Yt(C,P),ir(C,P,E.context),sr(C,P,E.framebuffer),ur(C,P,E),fr(C,P,E.state),mt(C,P,E,!1,!0);var K=E.shader.progVar.append(C,P);if(P(C.shared.gl,".useProgram(",K,".program);"),E.shader.program)kt(C,P,E,E.shader.program);else{P(C.shared.vao,".setVAO(null);");var Y=C.global.def("{}"),V=P.def(K,".id"),G=P.def(Y,"[",V,"]");P(C.cond(G).then(G,".call(this,a0);").else(G,"=",Y,"[",V,"]=",C.link(function(q){return $t(kt,C,E,q,1)}),"(",K,");",G,".call(this,a0);"))}Object.keys(E.state).length>0&&P(C.shared.current,".dirty=true;")}function la(C,E,P,K){C.batchId="a1",Yt(C,E);function Y(){return!0}cr(C,E,P,K.attributes,Y),Rt(C,E,P,K.uniforms,Y),it(C,E,E,P)}function pn(C,E,P,K){Yt(C,E);var Y=P.contextDep,V=E.def(),G="a0",q="a1",O=E.def();C.shared.props=O,C.batchId=V;var D=C.scope(),A=C.scope();E(D.entry,"for(",V,"=0;",V,"<",q,";++",V,"){",O,"=",G,"[",V,"];",A,"}",D.exit);function H(Ze){return Ze.contextDep&&Y||Ze.propDep}function Z(Ze){return!H(Ze)}if(P.needsContext&&ir(C,A,P.context),P.needsFramebuffer&&sr(C,A,P.framebuffer),fr(C,A,P.state,H),P.profile&&H(P.profile)&&mt(C,A,P,!1,!0),K)P.useVAO?P.drawVAO?H(P.drawVAO)?A(C.shared.vao,".setVAO(",P.drawVAO.append(C,A),");"):D(C.shared.vao,".setVAO(",P.drawVAO.append(C,D),");"):D(C.shared.vao,".setVAO(",C.shared.vao,".targetVAO);"):(D(C.shared.vao,".setVAO(null);"),cr(C,D,P,K.attributes,Z),cr(C,A,P,K.attributes,H)),Rt(C,D,P,K.uniforms,Z),Rt(C,A,P,K.uniforms,H),it(C,D,A,P);else{var ce=C.global.def("{}"),he=P.shader.progVar.append(C,A),le=A.def(he,".id"),Ae=A.def(ce,"[",le,"]");A(C.shared.gl,".useProgram(",he,".program);","if(!",Ae,"){",Ae,"=",ce,"[",le,"]=",C.link(function(Ze){return $t(la,C,P,Ze,2)}),"(",he,");}",Ae,".call(this,a0[",V,"],",V,");")}}function z(C,E){var P=C.proc("batch",2);C.batchId="0",Yt(C,P);var K=!1,Y=!0;Object.keys(E.context).forEach(function(ce){K=K||E.context[ce].propDep}),K||(ir(C,P,E.context),Y=!1);var V=E.framebuffer,G=!1;V?(V.propDep?K=G=!0:V.contextDep&&K&&(G=!0),G||sr(C,P,V)):sr(C,P,null),E.state.viewport&&E.state.viewport.propDep&&(K=!0);function q(ce){return ce.contextDep&&K||ce.propDep}ur(C,P,E),fr(C,P,E.state,function(ce){return!q(ce)}),(!E.profile||!q(E.profile))&&mt(C,P,E,!1,"a1"),E.contextDep=K,E.needsContext=Y,E.needsFramebuffer=G;var O=E.shader.progVar;if(O.contextDep&&K||O.propDep)pn(C,P,E,null);else{var D=O.append(C,P);if(P(C.shared.gl,".useProgram(",D,".program);"),E.shader.program)pn(C,P,E,E.shader.program);else{P(C.shared.vao,".setVAO(null);");var A=C.global.def("{}"),H=P.def(D,".id"),Z=P.def(A,"[",H,"]");P(C.cond(Z).then(Z,".call(this,a0,a1);").else(Z,"=",A,"[",H,"]=",C.link(function(ce){return $t(pn,C,E,ce,2)}),"(",D,");",Z,".call(this,a0,a1);"))}}Object.keys(E.state).length>0&&P(C.shared.current,".dirty=true;")}function se(C,E){var P=C.proc("scope",3);C.batchId="a2";var K=C.shared,Y=K.current;ir(C,P,E.context),E.framebuffer&&E.framebuffer.append(C,P),Nc(Object.keys(E.state)).forEach(function(G){var q=E.state[G],O=q.append(C,P);qt(O)?O.forEach(function(D,A){P.set(C.next[G],"["+A+"]",D)}):P.set(K.next,"."+G,O)}),mt(C,P,E,!0,!0),[ln,Co,fn,Oo,dn].forEach(function(G){var q=E.draw[G];q&&P.set(K.draw,"."+G,""+q.append(C,P))}),Object.keys(E.uniforms).forEach(function(G){var q=E.uniforms[G].append(C,P);Array.isArray(q)&&(q="["+q.join()+"]"),P.set(K.uniforms,"["+S.id(G)+"]",q)}),Object.keys(E.attributes).forEach(function(G){var q=E.attributes[G].append(C,P),O=C.scopeAttrib(G);Object.keys(new X).forEach(function(D){P.set(O,"."+D,q[D])})}),E.scopeVAO&&P.set(K.vao,".targetVAO",E.scopeVAO.append(C,P));function V(G){var q=E.shader[G];q&&P.set(K.shader,"."+G,q.append(C,P))}V(Qi),V(Zi),Object.keys(E.state).length>0&&(P(Y,".dirty=true;"),P.exit(Y,".dirty=true;")),P("a1(",C.shared.context,",a0,",C.batchId,");")}function ee(C){if(!(typeof C!="object"||qt(C))){for(var E=Object.keys(C),P=0;P<E.length;++P)if(_r.isDynamic(C[E[P]]))return!0;return!1}}function Ke(C,E,P){var K=E.static[P];if(!K||!ee(K))return;var Y=C.global,V=Object.keys(K),G=!1,q=!1,O=!1,D=C.global.def("{}");V.forEach(function(H){var Z=K[H];if(_r.isDynamic(Z)){typeof Z=="function"&&(Z=K[H]=_r.unbox(Z));var ce=Ar(Z,null);G=G||ce.thisDep,O=O||ce.propDep,q=q||ce.contextDep}else{switch(Y(D,".",H,"="),typeof Z){case"number":Y(Z);break;case"string":Y('"',Z,'"');break;case"object":Array.isArray(Z)&&Y("[",Z.join(),"]");break;default:Y(C.link(Z));break}Y(";")}});function A(H,Z){V.forEach(function(ce){var he=K[ce];if(_r.isDynamic(he)){var le=H.invoke(Z,he);Z(D,".",ce,"=",le,";")}})}E.dynamic[P]=new _r.DynamicVariable(Ao,{thisDep:G,contextDep:q,propDep:O,ref:D,append:A}),delete E.static[P]}function wt(C,E,P,K,Y){var V=lt();V.stats=V.link(Y),Object.keys(E.static).forEach(function(q){Ke(V,E,q)}),pb.forEach(function(q){Ke(V,C,q)});var G=ar(C,E,P,K,V);return Qt(V,G),se(V,G),z(V,G),n(V.compile(),{destroy:function(){G.shader.program.destroy()}})}return{next:qe,current:_e,procs:function(){var C=lt(),E=C.proc("poll"),P=C.proc("refresh"),K=C.block();E(K),P(K);var Y=C.shared,V=Y.gl,G=Y.next,q=Y.current;K(q,".dirty=false;"),sr(C,E),sr(C,P,null,!0);var O;Ie&&(O=C.link(Ie)),M.oes_vertex_array_object&&P(C.link(M.oes_vertex_array_object),".bindVertexArrayOES(null);");for(var D=0;D<ne.maxAttributes;++D){var A=P.def(Y.attributes,"[",D,"]"),H=C.cond(A,".buffer");H.then(V,".enableVertexAttribArray(",D,");",V,".bindBuffer(",ei,",",A,".buffer.buffer);",V,".vertexAttribPointer(",D,",",A,".size,",A,".type,",A,".normalized,",A,".stride,",A,".offset);").else(V,".disableVertexAttribArray(",D,");",V,".vertexAttrib4f(",D,",",A,".x,",A,".y,",A,".z,",A,".w);",A,".buffer=null;"),P(H),Ie&&P(O,".vertexAttribDivisorANGLE(",D,",",A,".divisor);")}return P(C.shared.vao,".currentVAO=null;",C.shared.vao,".setVAO(",C.shared.vao,".targetVAO);"),Object.keys(Me).forEach(function(Z){var ce=Me[Z],he=K.def(G,".",Z),le=C.block();le("if(",he,"){",V,".enable(",ce,")}else{",V,".disable(",ce,")}",q,".",Z,"=",he,";"),P(le),E("if(",he,"!==",q,".",Z,"){",le,"}")}),Object.keys(we).forEach(function(Z){var ce=we[Z],he=_e[Z],le,Ae,Ze=C.block();if(Ze(V,".",ce,"("),qt(he)){var gt=he.length;le=C.global.def(G,".",Z),Ae=C.global.def(q,".",Z),Ze(gr(gt,function(Qe){return le+"["+Qe+"]"}),");",gr(gt,function(Qe){return Ae+"["+Qe+"]="+le+"["+Qe+"];"}).join("")),E("if(",gr(gt,function(Qe){return le+"["+Qe+"]!=="+Ae+"["+Qe+"]"}).join("||"),"){",Ze,"}")}else le=K.def(G,".",Z),Ae=K.def(q,".",Z),Ze(le,");",q,".",Z,"=",le,";"),E("if(",le,"!==",Ae,"){",Ze,"}");P(Ze)}),C.compile()}(),compile:wt}}function zb(){return{vaoCount:0,bufferCount:0,elementsCount:0,framebufferCount:0,shaderCount:0,textureCount:0,cubeCount:0,renderbufferCount:0,maxTextureUnits:0}}var Bb=34918,Lb=34919,Pc=35007,Mb=function(p,S){if(!S.ext_disjoint_timer_query)return null;var M=[];function ne(){return M.pop()||S.ext_disjoint_timer_query.createQueryEXT()}function pe(Ie){M.push(Ie)}var re=[];function oe(Ie){var Ue=ne();S.ext_disjoint_timer_query.beginQueryEXT(Pc,Ue),re.push(Ue),Se(re.length-1,re.length,Ie)}function Ee(){S.ext_disjoint_timer_query.endQueryEXT(Pc)}function Te(){this.startQueryIndex=-1,this.endQueryIndex=-1,this.sum=0,this.stats=null}var Ce=[];function ke(){return Ce.pop()||new Te}function Be(Ie){Ce.push(Ie)}var Pe=[];function Se(Ie,Ue,_e){var qe=ke();qe.startQueryIndex=Ie,qe.endQueryIndex=Ue,qe.sum=0,qe.stats=_e,Pe.push(qe)}var Le=[],X=[];function ue(){var Ie,Ue,_e=re.length;if(_e!==0){X.length=Math.max(X.length,_e+1),Le.length=Math.max(Le.length,_e+1),Le[0]=0,X[0]=0;var qe=0;for(Ie=0,Ue=0;Ue<re.length;++Ue){var xe=re[Ue];S.ext_disjoint_timer_query.getQueryObjectEXT(xe,Lb)?(qe+=S.ext_disjoint_timer_query.getQueryObjectEXT(xe,Bb),pe(xe)):re[Ie++]=xe,Le[Ue+1]=qe,X[Ue+1]=Ie}for(re.length=Ie,Ie=0,Ue=0;Ue<Pe.length;++Ue){var Me=Pe[Ue],we=Me.startQueryIndex,Ne=Me.endQueryIndex;Me.sum+=Le[Ne]-Le[we];var tt=X[we],dt=X[Ne];dt===tt?(Me.stats.gpuTime+=Me.sum/1e6,Be(Me)):(Me.startQueryIndex=tt,Me.endQueryIndex=dt,Pe[Ie++]=Me)}Pe.length=Ie}}return{beginQuery:oe,endQuery:Ee,pushScopeStats:Se,update:ue,getNumPendingQueries:function(){return re.length},clear:function(){M.push.apply(M,re);for(var Ie=0;Ie<M.length;Ie++)S.ext_disjoint_timer_query.deleteQueryEXT(M[Ie]);re.length=0,M.length=0},restore:function(){re.length=0,M.length=0}}},Nb=16384,Db=256,Pb=1024,Gb=34962,Gc="webglcontextlost",Fc="webglcontextrestored",Uc=1,Fb=2,Ub=3;function Vc(p,S){for(var M=0;M<p.length;++M)if(p[M]===S)return M;return-1}function Vb(p){var S=Ms(p);if(!S)return null;var M=S.gl,ne=M.getContextAttributes(),pe=M.isContextLost(),re=Xt(M,S);if(!re)return null;var oe=_u(),Ee=zb(),Te=re.extensions,Ce=Mb(M,Te),ke=mi(),Be=M.drawingBufferWidth,Pe=M.drawingBufferHeight,Se={tick:0,time:0,viewportWidth:Be,viewportHeight:Pe,framebufferWidth:Be,framebufferHeight:Pe,drawingBufferWidth:Be,drawingBufferHeight:Pe,pixelRatio:S.pixelRatio},Le={},X={elements:null,primitive:4,count:-1,offset:0,instances:-1},ue=Ai(M,Te),Ie=Uu(M,Ee,S,_e),Ue=rb(M,Te,ue,Ee,Ie);function _e(it){return Ue.destroyBuffer(it)}var qe=lo(M,Te,Ie,Ee),xe=sb(M,oe,Ee,S),Me=z0(M,Te,ue,function(){tt.procs.poll()},Se,Ee,S),we=B0(M,Te,ue,Ee,S),Ne=eb(M,Te,ue,Me,we,Ee),tt=Rb(M,oe,Te,ue,Ie,qe,Me,Ne,Le,Ue,xe,X,Se,Ce,S),dt=lb(M,Ne,tt.procs.poll,Se,ne,Te,ue),Ge=tt.next,Re=M.canvas,ve=[],lt=[],ht=[],Ye=[S.onDestroy],bt=null;function ft(){if(ve.length===0){Ce&&Ce.update(),bt=null;return}bt=Cn.next(ft),fr();for(var it=ve.length-1;it>=0;--it){var $t=ve[it];$t&&$t(Se,null,0)}M.flush(),Ce&&Ce.update()}function yt(){!bt&&ve.length>0&&(bt=Cn.next(ft))}function It(){bt&&(Cn.cancel(ft),bt=null)}function rr(it){it.preventDefault(),pe=!0,It(),lt.forEach(function($t){$t()})}function or(it){M.getError(),pe=!1,re.restore(),xe.restore(),Ie.restore(),Me.restore(),we.restore(),Ne.restore(),Ue.restore(),Ce&&Ce.restore(),tt.procs.refresh(),yt(),ht.forEach(function($t){$t()})}Re&&(Re.addEventListener(Gc,rr,!1),Re.addEventListener(Fc,or,!1));function St(){ve.length=0,It(),Re&&(Re.removeEventListener(Gc,rr),Re.removeEventListener(Fc,or)),xe.clear(),Ne.clear(),we.clear(),Me.clear(),qe.clear(),Ie.clear(),Ue.clear(),Ce&&Ce.clear(),Ye.forEach(function(it){it()})}function nr(it){I(!!it,"invalid args to regl({...})"),I.type(it,"object","invalid args to regl({...})");function $t(Y){var V=n({},Y);delete V.uniforms,delete V.attributes,delete V.context,delete V.vao,"stencil"in V&&V.stencil.op&&(V.stencil.opBack=V.stencil.opFront=V.stencil.op,delete V.stencil.op);function G(q){if(q in V){var O=V[q];delete V[q],Object.keys(O).forEach(function(D){V[q+"."+D]=O[D]})}}return G("blend"),G("depth"),G("cull"),G("stencil"),G("polygonOffset"),G("scissor"),G("sample"),"vao"in Y&&(V.vao=Y.vao),V}function kt(Y,V){var G={},q={};return Object.keys(Y).forEach(function(O){var D=Y[O];if(_r.isDynamic(D)){q[O]=_r.unbox(D,O);return}else if(V&&Array.isArray(D)){for(var A=0;A<D.length;++A)if(_r.isDynamic(D[A])){q[O]=_r.unbox(D,O);return}}G[O]=D}),{dynamic:q,static:G}}var Qt=kt(it.context||{},!0),la=kt(it.uniforms||{},!0),pn=kt(it.attributes||{},!1),z=kt($t(it),!1),se={gpuTime:0,cpuTime:0,count:0},ee=tt.compile(z,pn,la,Qt,se),Ke=ee.draw,wt=ee.batch,C=ee.scope,E=[];function P(Y){for(;E.length<Y;)E.push(null);return E}function K(Y,V){var G;if(pe&&I.raise("context lost"),typeof Y=="function")return C.call(this,null,Y,0);if(typeof V=="function")if(typeof Y=="number")for(G=0;G<Y;++G)C.call(this,null,V,G);else if(Array.isArray(Y))for(G=0;G<Y.length;++G)C.call(this,Y[G],V,G);else return C.call(this,Y,V,0);else if(typeof Y=="number"){if(Y>0)return wt.call(this,P(Y|0),Y|0)}else if(Array.isArray(Y)){if(Y.length)return wt.call(this,Y,Y.length)}else return Ke.call(this,Y)}return n(K,{stats:se,destroy:function(){ee.destroy()}})}var Pt=Ne.setFBO=nr({framebuffer:_r.define.call(null,Uc,"framebuffer")});function ar(it,$t){var kt=0;tt.procs.poll();var Qt=$t.color;Qt&&(M.clearColor(+Qt[0]||0,+Qt[1]||0,+Qt[2]||0,+Qt[3]||0),kt|=Nb),"depth"in $t&&(M.clearDepth(+$t.depth),kt|=Db),"stencil"in $t&&(M.clearStencil($t.stencil|0),kt|=Pb),I(!!kt,"called regl.clear with no buffer specified"),M.clear(kt)}function ir(it){if(I(typeof it=="object"&&it,"regl.clear() takes an object as input"),"framebuffer"in it)if(it.framebuffer&&it.framebuffer_reglType==="framebufferCube")for(var $t=0;$t<6;++$t)Pt(n({framebuffer:it.framebuffer.faces[$t]},it),ar);else Pt(it,ar);else ar(null,it)}function sr(it){I.type(it,"function","regl.frame() callback must be a function"),ve.push(it);function $t(){var kt=Vc(ve,it);I(kt>=0,"cannot cancel a frame twice");function Qt(){var la=Vc(ve,Qt);ve[la]=ve[ve.length-1],ve.length-=1,ve.length<=0&&It()}ve[kt]=Qt}return yt(),{cancel:$t}}function ur(){var it=Ge.viewport,$t=Ge.scissor_box;it[0]=it[1]=$t[0]=$t[1]=0,Se.viewportWidth=Se.framebufferWidth=Se.drawingBufferWidth=it[2]=$t[2]=M.drawingBufferWidth,Se.viewportHeight=Se.framebufferHeight=Se.drawingBufferHeight=it[3]=$t[3]=M.drawingBufferHeight}function fr(){Se.tick+=1,Se.time=mt(),ur(),tt.procs.poll()}function Yt(){Me.refresh(),ur(),tt.procs.refresh(),Ce&&Ce.update()}function mt(){return(mi()-ke)/1e3}Yt();function cr(it,$t){I.type($t,"function","listener callback must be a function");var kt;switch(it){case"frame":return sr($t);case"lost":kt=lt;break;case"restore":kt=ht;break;case"destroy":kt=Ye;break;default:I.raise("invalid event, must be one of frame,lost,restore,destroy")}return kt.push($t),{cancel:function(){for(var Qt=0;Qt<kt.length;++Qt)if(kt[Qt]===$t){kt[Qt]=kt[kt.length-1],kt.pop();return}}}}var Rt=n(nr,{clear:ir,prop:_r.define.bind(null,Uc),context:_r.define.bind(null,Fb),this:_r.define.bind(null,Ub),draw:nr({}),buffer:function(it){return Ie.create(it,Gb,!1,!1)},elements:function(it){return qe.create(it,!1)},texture:Me.create2D,cube:Me.createCube,renderbuffer:we.create,framebuffer:Ne.create,framebufferCube:Ne.createCube,vao:Ue.createVAO,attributes:ne,frame:sr,on:cr,limits:ue,hasExtension:function(it){return ue.extensions.indexOf(it.toLowerCase())>=0},read:dt,destroy:St,_gl:M,_refresh:Yt,poll:function(){fr(),Ce&&Ce.update()},now:mt,stats:Ee});return S.onDone(null,Rt),Rt}return Vb})}(nu)),nu.exports}var kw=Tw();const Aw=Yd(kw),Iw=sw();class Cw{constructor({pb:t=null,width:r=1280,height:n=720,numSources:i=4,numOutputs:s=4,makeGlobal:o=!0,autoLoop:u=!0,detectAudio:d=!0,enableStreamCapture:f=!0,canvas:h,precision:m,extendTransforms:g={}}={}){if(Lg.init(),this.pb=t,this.width=r,this.height=n,this.renderAll=!1,this.detectAudio=d,this._initCanvas(h),this.synth={time:0,bpm:30,width:this.width,height:this.height,fps:void 0,stats:{fps:0},speed:1,mouse:Iw,render:this._render.bind(this),setResolution:this.setResolution.bind(this),update:_=>{},hush:this.hush.bind(this),tick:this.tick.bind(this)},o&&(window.loadScript=this.loadScript),this.timeSinceLastUpdate=0,this._time=0,m&&["lowp","mediump","highp"].includes(m.toLowerCase()))this.precision=m.toLowerCase();else{let _=(/iPad|iPhone|iPod/.test(navigator.platform)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)&&!window.MSStream;this.precision=_?"highp":"mediump"}if(this.extendTransforms=g,this.saveFrame=!1,this.captureStream=null,this.generator=void 0,this._initRegl(),this._initOutputs(s),this._initSources(i),this._generateGlslTransforms(),this.synth.screencap=()=>{this.saveFrame=!0},f)try{this.captureStream=this.canvas.captureStream(25),this.synth.vidRecorder=new cw(this.captureStream)}catch(_){console.warn(`[hydra-synth warning]
new MediaSource() is not currently supported on iOS.`),console.error(_)}d&&this._initAudio(),u&&Zb(this.tick.bind(this)).start(),this.sandbox=new mw(this.synth,o,["speed","update","bpm","fps"])}eval(t){this.sandbox.eval(t)}getScreenImage(t){this.imageCallback=t,this.saveFrame=!0}hush(){this.s.forEach(t=>{t.clear()}),this.o.forEach(t=>{this.synth.solid(0,0,0,0).out(t)}),this.synth.render(this.o[0]),this.sandbox.set("update",t=>{})}loadScript(t=""){return new Promise((n,i)=>{var s=document.createElement("script");s.onload=function(){console.log(`loaded script ${t}`),n()},s.onerror=o=>{console.log(`error loading script ${t}`,"log-error"),n()},s.src=t,document.head.appendChild(s)})}setResolution(t,r){this.canvas.width=t,this.canvas.height=r,this.width=t,this.height=r,this.sandbox.set("width",t),this.sandbox.set("height",r),console.log(this.width),this.o.forEach(n=>{n.resize(t,r)}),this.s.forEach(n=>{n.resize(t,r)}),this.regl._refresh(),console.log(this.canvas.width)}canvasToImage(t){const r=document.createElement("a");r.style.display="none";let n=new Date;r.download=`hydra-${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}-${n.getHours()}.${n.getMinutes()}.${n.getSeconds()}.png`,document.body.appendChild(r);var i=this;this.canvas.toBlob(s=>{i.imageCallback?(i.imageCallback(s),delete i.imageCallback):(r.href=URL.createObjectURL(s),console.log(r.href),r.click())},"image/png"),setTimeout(()=>{document.body.removeChild(r),window.URL.revokeObjectURL(r.href)},300)}_initAudio(){this.synth.a=new fw({numBins:4,parentEl:this.canvas.parentNode})}_initCanvas(t){t?(this.canvas=t,this.width=t.width,this.height=t.height):(this.canvas=document.createElement("canvas"),this.canvas.width=this.width,this.canvas.height=this.height,this.canvas.style.width="100%",this.canvas.style.height="100%",this.canvas.style.imageRendering="pixelated",document.body.appendChild(this.canvas))}_initRegl(){this.regl=Aw({canvas:this.canvas,pixelRatio:1}),this.regl.clear({color:[0,0,0,1]}),this.renderAll=this.regl({frag:`
      precision ${this.precision} float;
      varying vec2 uv;
      uniform sampler2D tex0;
      uniform sampler2D tex1;
      uniform sampler2D tex2;
      uniform sampler2D tex3;

      void main () {
        vec2 st = vec2(1.0 - uv.x, uv.y);
        st*= vec2(2);
        vec2 q = floor(st).xy*(vec2(2.0, 1.0));
        int quad = int(q.x) + int(q.y);
        st.x += step(1., mod(st.y,2.0));
        st.y += step(1., mod(st.x,2.0));
        st = fract(st);
        if(quad==0){
          gl_FragColor = texture2D(tex0, st);
        } else if(quad==1){
          gl_FragColor = texture2D(tex1, st);
        } else if (quad==2){
          gl_FragColor = texture2D(tex2, st);
        } else {
          gl_FragColor = texture2D(tex3, st);
        }

      }
      `,vert:`
      precision ${this.precision} float;
      attribute vec2 position;
      varying vec2 uv;

      void main () {
        uv = position;
        gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
      }`,attributes:{position:[[-2,0],[0,-2],[2,2]]},uniforms:{tex0:this.regl.prop("tex0"),tex1:this.regl.prop("tex1"),tex2:this.regl.prop("tex2"),tex3:this.regl.prop("tex3")},count:3,depth:{enable:!1}}),this.renderFbo=this.regl({frag:`
      precision ${this.precision} float;
      varying vec2 uv;
      uniform vec2 resolution;
      uniform sampler2D tex0;

      void main () {
        gl_FragColor = texture2D(tex0, vec2(1.0 - uv.x, uv.y));
      }
      `,vert:`
      precision ${this.precision} float;
      attribute vec2 position;
      varying vec2 uv;

      void main () {
        uv = position;
        gl_Position = vec4(1.0 - 2.0 * position, 0, 1);
      }`,attributes:{position:[[-2,0],[0,-2],[2,2]]},uniforms:{tex0:this.regl.prop("tex0"),resolution:this.regl.prop("resolution")},count:3,depth:{enable:!1}})}_initOutputs(t){const r=this;this.o=Array(t).fill().map((n,i)=>{var s=new Sn({regl:this.regl,width:this.width,height:this.height,precision:this.precision,label:`o${i}`});return s.id=i,r.synth["o"+i]=s,s}),this.output=this.o[0]}_initSources(t){this.s=[];for(var r=0;r<t;r++)this.createSource(r)}createSource(t){let r=new tw({regl:this.regl,pb:this.pb,width:this.width,height:this.height,label:`s${t}`});return this.synth["s"+this.s.length]=r,this.s.push(r),r}_generateGlslTransforms(){var t=this;this.generator=new xw({defaultOutput:this.o[0],defaultUniforms:this.o[0].uniforms,extendTransforms:this.extendTransforms,changeListener:({type:r,method:n,synth:i})=>{r==="add"&&(t.synth[n]=i.generators[n],t.sandbox&&t.sandbox.add(n))}}),this.synth.setFunction=this.generator.setFunction.bind(this.generator)}_render(t){t?(this.output=t,this.isRenderingAll=!1):this.isRenderingAll=!0}tick(t,r){if(this.sandbox.tick(),this.detectAudio===!0&&this.synth.a.tick(),this.sandbox.set("time",this.synth.time+=t*.001*this.synth.speed),this.timeSinceLastUpdate+=t,!this.synth.fps||this.timeSinceLastUpdate>=1e3/this.synth.fps){if(this.synth.stats.fps=Math.ceil(1e3/this.timeSinceLastUpdate),this.synth.update)try{this.synth.update(this.timeSinceLastUpdate)}catch(n){console.log(n)}for(let n=0;n<this.s.length;n++)this.s[n].tick(this.synth.time);for(let n=0;n<this.o.length;n++)this.o[n].tick({time:this.synth.time,mouse:this.synth.mouse,bpm:this.synth.bpm,resolution:[this.canvas.width,this.canvas.height]});this.isRenderingAll?this.renderAll({tex0:this.o[0].getCurrent(),tex1:this.o[1].getCurrent(),tex2:this.o[2].getCurrent(),tex3:this.o[3].getCurrent(),resolution:[this.canvas.width,this.canvas.height]}):this.renderFbo({tex0:this.output.getCurrent(),resolution:[this.canvas.width,this.canvas.height]}),this.timeSinceLastUpdate=0}this.saveFrame===!0&&(this.canvasToImage(),this.saveFrame=!1)}}/*!
 * ONNX Runtime Web v1.22.0
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */var Qd=Object.defineProperty,Ow=Object.getOwnPropertyDescriptor,Rw=Object.getOwnPropertyNames,zw=Object.prototype.hasOwnProperty,Bw=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),Fe=(e,t)=>()=>(e&&(t=e(e=0)),t),di=(e,t)=>{for(var r in t)Qd(e,r,{get:t[r],enumerable:!0})},Lw=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Rw(t))!zw.call(e,i)&&i!==r&&Qd(e,i,{get:()=>t[i],enumerable:!(n=Ow(t,i))||n.enumerable});return e},Ts=e=>Lw(Qd({},"__esModule",{value:!0}),e),us,Pa,ni,ep,Mg,Ng=Fe(()=>{us=new Map,Pa=[],ni=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let n=us.get(e);if(n===void 0)us.set(e,{backend:t,priority:r});else{if(n.priority>r)return;if(n.priority===r&&n.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let i=Pa.indexOf(e);i!==-1&&Pa.splice(i,1);for(let s=0;s<Pa.length;s++)if(us.get(Pa[s]).priority<=r){Pa.splice(s,0,e);return}Pa.push(e)}return}throw new TypeError("not a valid backend")},ep=async e=>{let t=us.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(n){return r||(t.error=`${n}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Mg=async e=>{let t=e.executionProviders||[],r=t.map(d=>typeof d=="string"?d:d.name),n=r.length===0?Pa:r,i,s=[],o=new Set;for(let d of n){let f=await ep(d);typeof f=="string"?s.push({name:d,err:f}):(i||(i=f),i===f&&o.add(d))}if(!i)throw new Error(`no available backend found. ERR: ${s.map(d=>`[${d.name}] ${d.err}`).join(", ")}`);for(let{name:d,err:f}of s)r.includes(d)&&console.warn(`removing requested execution provider "${d}" from session options because it is not available: ${f}`);let u=t.filter(d=>o.has(typeof d=="string"?d:d.name));return[i,new Proxy(e,{get:(d,f)=>f==="executionProviders"?u:Reflect.get(d,f)})]}}),Mw=Fe(()=>{Ng()}),Dg,Nw=Fe(()=>{Dg="1.22.0"}),Rl,Nr,Pg=Fe(()=>{Nw(),Rl="warning",Nr={wasm:{},webgl:{},webgpu:{},versions:{common:Dg},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Rl=e}},get logLevel(){return Rl}},Object.defineProperty(Nr,"logLevel",{enumerable:!0})}),Vt,Dw=Fe(()=>{Pg(),Vt=Nr}),Gg,Fg,Pw=Fe(()=>{Gg=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let n=r.getContext("2d");if(n!=null){let i,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],s=e.dims[3]):(i=e.dims[3],s=e.dims[2]);let o=t?.format!==void 0?t.format:"RGB",u=t?.norm,d,f;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?f=[0,0,0,0]:typeof u.bias=="number"?f=[u.bias,u.bias,u.bias,u.bias]:(f=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(f[3]=u.bias[3]));let h=s*i,m=0,g=h,v=h*2,_=-1;o==="RGBA"?(m=0,g=h,v=h*2,_=h*3):o==="RGB"?(m=0,g=h,v=h*2):o==="RBG"&&(m=0,v=h,g=h*2);for(let $=0;$<s;$++)for(let L=0;L<i;L++){let T=(e.data[m++]-f[0])*d[0],b=(e.data[g++]-f[1])*d[1],N=(e.data[v++]-f[2])*d[2],B=_===-1?255:(e.data[_++]-f[3])*d[3];n.fillStyle="rgba("+T+","+b+","+N+","+B+")",n.fillRect(L,$,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Fg=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),n;if(r!=null){let i,s,o;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(i=e.dims[2],s=e.dims[1],o=e.dims[3]):(i=e.dims[3],s=e.dims[2],o=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",d=t?.norm,f,h;d===void 0||d.mean===void 0?f=[255,255,255,255]:typeof d.mean=="number"?f=[d.mean,d.mean,d.mean,d.mean]:(f=[d.mean[0],d.mean[1],d.mean[2],255],d.mean[3]!==void 0&&(f[3]=d.mean[3])),d===void 0||d.bias===void 0?h=[0,0,0,0]:typeof d.bias=="number"?h=[d.bias,d.bias,d.bias,d.bias]:(h=[d.bias[0],d.bias[1],d.bias[2],0],d.bias[3]!==void 0&&(h[3]=d.bias[3]));let m=s*i;if(t!==void 0&&(t.format!==void 0&&o===4&&t.format!=="RGBA"||o===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let g=4,v=0,_=1,$=2,L=3,T=0,b=m,N=m*2,B=-1;u==="RGBA"?(T=0,b=m,N=m*2,B=m*3):u==="RGB"?(T=0,b=m,N=m*2):u==="RBG"&&(T=0,N=m,b=m*2),n=r.createImageData(i,s);for(let W=0;W<s*i;v+=g,_+=g,$+=g,L+=g,W++)n.data[v]=(e.data[T++]-h[0])*f[0],n.data[_]=(e.data[b++]-h[1])*f[1],n.data[$]=(e.data[N++]-h[2])*f[2],n.data[L]=B===-1?255:(e.data[B++]-h[3])*f[3]}else throw new Error("Can not access image data");return n}}),Vo,Ug,Vg,Wg,qg,Hg,Gw=Fe(()=>{Zd(),Vo=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:n}=t,i=t.norm??{mean:255,bias:0},s,o;typeof i.mean=="number"?s=[i.mean,i.mean,i.mean,i.mean]:s=[i.mean[0],i.mean[1],i.mean[2],i.mean[3]??255],typeof i.bias=="number"?o=[i.bias,i.bias,i.bias,i.bias]:o=[i.bias[0],i.bias[1],i.bias[2],i.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",d=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",f=r*n,h=d==="RGBA"?new Float32Array(f*4):new Float32Array(f*3),m=4,g=0,v=1,_=2,$=3,L=0,T=f,b=f*2,N=-1;u==="RGB"&&(m=3,g=0,v=1,_=2,$=-1),d==="RGBA"?N=f*3:d==="RBG"?(L=0,b=f,T=f*2):d==="BGR"&&(b=0,T=f,L=f*2);for(let B=0;B<f;B++,g+=m,_+=m,v+=m,$+=m)h[L++]=(e[g]+o[0])/s[0],h[T++]=(e[v]+o[1])/s[1],h[b++]=(e[_]+o[2])/s[2],N!==-1&&$!==-1&&(h[N++]=(e[$]+o[3])/s[3]);return d==="RGBA"?new Or("float32",h,[1,4,r,n]):new Or("float32",h,[1,3,r,n])},Ug=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,n=typeof ImageData<"u"&&e instanceof ImageData,i=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,s=typeof e=="string",o,u=t??{},d=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},f=h=>typeof HTMLCanvasElement<"u"&&h instanceof HTMLCanvasElement||h instanceof OffscreenCanvas?h.getContext("2d"):null;if(r){let h=d();h.width=e.width,h.height=e.height;let m=f(h);if(m!=null){let g=e.height,v=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(g=t.resizedHeight,v=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=g,u.width=v}else u.tensorFormat="RGBA",u.height=g,u.width=v;m.drawImage(e,0,0),o=m.getImageData(0,0,v,g).data}else throw new Error("Can not access image data")}else if(n){let h,m;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(h=t.resizedHeight,m=t.resizedWidth):(h=e.height,m=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=h,u.width=m,t!==void 0){let g=d();g.width=m,g.height=h;let v=f(g);if(v!=null)v.putImageData(e,0,0),o=v.getImageData(0,0,m,h).data;else throw new Error("Can not access image data")}else o=e.data}else if(i){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let h=d();h.width=e.width,h.height=e.height;let m=f(h);if(m!=null){let g=e.height,v=e.width;return m.drawImage(e,0,0,v,g),o=m.getImageData(0,0,v,g).data,u.height=g,u.width=v,Vo(o,u)}else throw new Error("Can not access image data")}else{if(s)return new Promise((h,m)=>{let g=d(),v=f(g);if(!e||!v)return m();let _=new Image;_.crossOrigin="Anonymous",_.src=e,_.onload=()=>{g.width=_.width,g.height=_.height,v.drawImage(_,0,0,g.width,g.height);let $=v.getImageData(0,0,g.width,g.height);u.height=g.height,u.width=g.width,h(Vo($.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(o!==void 0)return Vo(o,u);throw new Error("Input data provided is not supported - aborted tensor creation")},Vg=(e,t)=>{let{width:r,height:n,download:i,dispose:s}=t,o=[1,n,r,4];return new Or({location:"texture",type:"float32",texture:e,dims:o,download:i,dispose:s})},Wg=(e,t)=>{let{dataType:r,dims:n,download:i,dispose:s}=t;return new Or({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:n,download:i,dispose:s})},qg=(e,t)=>{let{dataType:r,dims:n,download:i,dispose:s}=t;return new Or({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:n,download:i,dispose:s})},Hg=(e,t,r)=>new Or({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),_n,_s,zl,jg,Fw=Fe(()=>{_n=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),_s=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),zl=!1,jg=()=>{if(!zl){zl=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,n=typeof r<"u"&&r.from;e&&(_n.set("int64",BigInt64Array),_s.set(BigInt64Array,"int64")),t&&(_n.set("uint64",BigUint64Array),_s.set(BigUint64Array,"uint64")),n?(_n.set("float16",r),_s.set(r,"float16")):_n.set("float16",Uint16Array)}}}),Kg,Xg,Uw=Fe(()=>{Zd(),Kg=e=>{let t=1;for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="number"||!Number.isSafeInteger(n))throw new TypeError(`dims[${r}] must be an integer, got: ${n}`);if(n<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${n}`);t*=n}return t},Xg=(e,t)=>{switch(e.location){case"cpu":return new Or(e.type,e.data,t);case"cpu-pinned":return new Or({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Or({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Or({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Or({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Or,Zd=Fe(()=>{Pw(),Gw(),Fw(),Uw(),Or=class{constructor(e,t,r){jg();let n,i;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,n=e.type,i=e.dims,e.location){case"cpu-pinned":{let o=_n.get(n);if(!o)throw new TypeError(`unsupported type "${n}" to create tensor from pinned buffer`);if(!(e.data instanceof o))throw new TypeError(`buffer should be of type ${o.name}`);this.cpuData=e.data;break}case"texture":{if(n!=="float32")throw new TypeError(`unsupported type "${n}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(n!=="float32"&&n!=="float16"&&n!=="int32"&&n!=="int64"&&n!=="uint32"&&n!=="uint8"&&n!=="bool"&&n!=="uint4"&&n!=="int4")throw new TypeError(`unsupported type "${n}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(n!=="float32"&&n!=="float16"&&n!=="int32"&&n!=="int64"&&n!=="uint32"&&n!=="uint64"&&n!=="int8"&&n!=="uint8"&&n!=="bool"&&n!=="uint4"&&n!=="int4")throw new TypeError(`unsupported type "${n}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let o,u;if(typeof e=="string")if(n=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");o=t}else{let d=_n.get(e);if(d===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&d===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${d.name} as data.`);e==="uint64"||e==="int64"?o=d.from(t,BigInt):o=d.from(t)}else if(t instanceof d)o=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")o=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&d!==Uint16Array)o=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${n} tensor's data must be type of ${d}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let d=typeof e[0];if(d==="string")n="string",o=e;else if(d==="boolean")n="bool",o=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${d}.`)}else if(e instanceof Uint8ClampedArray)n="uint8",o=Uint8Array.from(e);else{let d=_s.get(e.constructor);if(d===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);n=d,o=e}if(u===void 0)u=[o.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");i=u,this.cpuData=o,this.dataLocation="cpu"}let s=Kg(i);if(this.cpuData&&s!==this.cpuData.length&&!((n==="uint4"||n==="int4")&&Math.ceil(s/2)===this.cpuData.length))throw new Error(`Tensor's size(${s}) does not match data length(${this.cpuData.length}).`);this.type=n,this.dims=i,this.size=s}static async fromImage(e,t){return Ug(e,t)}static fromTexture(e,t){return Vg(e,t)}static fromGpuBuffer(e,t){return Wg(e,t)}static fromMLTensor(e,t){return qg(e,t)}static fromPinnedBuffer(e,t,r){return Hg(e,t,r)}toDataURL(e){return Gg(this,e)}toImageData(e){return Fg(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return Xg(this,e)}}}),Pr,Yg=Fe(()=>{Zd(),Pr=Or}),uu,Bl,fa,Jr,Qg=Fe(()=>{Pg(),uu=(e,t)=>{(typeof Nr.trace>"u"?!Nr.wasm.trace:!Nr.trace)||console.timeStamp(`${e}::ORT::${t}`)},Bl=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],n=!1;for(let i=0;i<r.length;i++){if(n&&!r[i].includes("TRACE_FUNC")){let s=`FUNC_${e}::${r[i].trim().split(" ")[1]}`;t&&(s+=`::${t}`),uu("CPU",s);return}r[i].includes("TRACE_FUNC")&&(n=!0)}},fa=e=>{(typeof Nr.trace>"u"?!Nr.wasm.trace:!Nr.trace)||Bl("BEGIN",e)},Jr=e=>{(typeof Nr.trace>"u"?!Nr.wasm.trace:!Nr.trace)||Bl("END",e)}}),Zg,Vw=Fe(()=>{Ng(),Yg(),Qg(),Zg=class Jg{constructor(t){this.handler=t}async run(t,r,n){fa();let i={},s={};if(typeof t!="object"||t===null||t instanceof Pr||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let o=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Pr)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");o=!1;for(let f of r){if(typeof f!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(f)===-1)throw new RangeError(`'fetches' contains invalid output name: ${f}.`);i[f]=null}if(typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else{let f=!1,h=Object.getOwnPropertyNames(r);for(let m of this.outputNames)if(h.indexOf(m)!==-1){let g=r[m];(g===null||g instanceof Pr)&&(f=!0,o=!1,i[m]=g)}if(f){if(typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else s=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let f of this.inputNames)if(typeof t[f]>"u")throw new Error(`input '${f}' is missing in 'feeds'.`);if(o)for(let f of this.outputNames)i[f]=null;let u=await this.handler.run(t,i,s),d={};for(let f in u)if(Object.hasOwnProperty.call(u,f)){let h=u[f];h instanceof Pr?d[f]=h:d[f]=new Pr(h.type,h.data,h.dims)}return Jr(),d}async release(){return this.handler.dispose()}static async create(t,r,n,i){fa();let s,o={};if(typeof t=="string"){if(s=t,typeof r=="object"&&r!==null)o=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(s=t,typeof r=="object"&&r!==null)o=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let h=t,m=0,g=t.byteLength;if(typeof r=="object"&&r!==null)o=r;else if(typeof r=="number"){if(m=r,!Number.isSafeInteger(m))throw new RangeError("'byteOffset' must be an integer.");if(m<0||m>=h.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${h.byteLength}).`);if(g=t.byteLength-m,typeof n=="number"){if(g=n,!Number.isSafeInteger(g))throw new RangeError("'byteLength' must be an integer.");if(g<=0||m+g>h.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${h.byteLength-m}].`);if(typeof i=="object"&&i!==null)o=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(typeof n<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");s=new Uint8Array(h,m,g)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,d]=await Mg(o),f=await u.createInferenceSessionHandler(s,d);return Jr(),new Jg(f)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Jd,Ww=Fe(()=>{Vw(),Jd=Zg}),qw=Fe(()=>{}),Hw=Fe(()=>{}),jw=Fe(()=>{}),Kw=Fe(()=>{}),Xw={};di(Xw,{InferenceSession:()=>Jd,TRACE:()=>uu,TRACE_FUNC_BEGIN:()=>fa,TRACE_FUNC_END:()=>Jr,Tensor:()=>Pr,env:()=>Vt,registerBackend:()=>ni});var ea=Fe(()=>{Mw(),Dw(),Ww(),Yg(),qw(),Hw(),Qg(),jw(),Kw()}),ef=Fe(()=>{}),ey={};di(ey,{default:()=>ty});var Ll,Ml,ty,Yw=Fe(()=>{s0(),Tn(),tf(),Ll="ort-wasm-proxy-worker",Ml=globalThis.self?.name===Ll,Ml&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":rf(r.wasm).then(()=>{bf(r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})})},n=>{postMessage({type:t,err:n})});break;case"init-ep":{let{epName:n,env:i}=r;wf(i,n).then(()=>{postMessage({type:t})},s=>{postMessage({type:t,err:s})});break}case"copy-from":{let{buffer:n}=r,i=mu(n);postMessage({type:t,out:i});break}case"create":{let{model:n,options:i}=r;xf(n,i).then(s=>{postMessage({type:t,out:s})},s=>{postMessage({type:t,err:s})});break}case"release":$f(r),postMessage({type:t});break;case"run":{let{sessionId:n,inputIndices:i,inputs:s,outputIndices:o,options:u}=r;Ef(n,i,s,o,new Array(o.length).fill(null),u).then(d=>{d.some(f=>f[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:d},Tf([...s,...d]))},d=>{postMessage({type:t,err:d})});break}case"end-profiling":Sf(r),postMessage({type:t});break;default:}}catch(n){postMessage({type:t,err:n})}}),ty=Ml?null:e=>new Worker(e??Cr,{type:"module",name:Ll})}),ry={};di(ry,{default:()=>ay});var Nl,Dl,ay,tp,Qw=Fe(()=>{Dl=(Nl=import.meta.url,async function(e={}){var t,r,n=e,i=new Promise((l,c)=>{t=l,r=c}),s=typeof window=="object",o=typeof WorkerGlobalScope<"u",u=o&&self.name?.startsWith("em-pthread");n.mountExternalData=(l,c)=>{l.startsWith("./")&&(l=l.substring(2)),(n.Fb||(n.Fb=new Map)).set(l,c)},n.unmountExternalData=()=>{delete n.Fb};var d=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let f=l=>async(...c)=>{try{if(n.Gb)throw Error("Session already started");let y=n.Gb={ec:c[0],errors:[]},w=await l(...c);if(n.Gb!==y)throw Error("Session mismatch");n.Kb?.flush();let k=y.errors;if(0<k.length){let j=await Promise.all(k);if(j=j.filter(ye=>ye),0<j.length)throw Error(j.join(`
`))}return w}finally{n.Gb=null}};n.jsepInit=(l,c)=>{if(l==="webgpu"){[n.Kb,n.Vb,n.Zb,n.Lb,n.Yb,n.kb,n.$b,n.bc,n.Wb,n.Xb,n.ac]=c;let y=n.Kb;n.jsepRegisterBuffer=(w,k,j,ye)=>y.registerBuffer(w,k,j,ye),n.jsepGetBuffer=w=>y.getBuffer(w),n.jsepCreateDownloader=(w,k,j)=>y.createDownloader(w,k,j),n.jsepOnCreateSession=w=>{y.onCreateSession(w)},n.jsepOnReleaseSession=w=>{y.onReleaseSession(w)},n.jsepOnRunStart=w=>y.onRunStart(w),n.cc=(w,k)=>{y.upload(w,k)}}else if(l==="webnn"){let y=c[0];[n.oc,n.Ob,n.webnnEnsureTensor,n.Pb,n.webnnDownloadTensor]=c.slice(1),n.webnnReleaseTensorId=n.Ob,n.webnnUploadTensor=n.Pb,n.webnnOnRunStart=w=>y.onRunStart(w),n.webnnOnRunEnd=y.onRunEnd.bind(y),n.webnnRegisterMLContext=(w,k)=>{y.registerMLContext(w,k)},n.webnnOnReleaseSession=w=>{y.onReleaseSession(w)},n.webnnCreateMLTensorDownloader=(w,k)=>y.createMLTensorDownloader(w,k),n.webnnRegisterMLTensor=(w,k,j,ye)=>y.registerMLTensor(w,k,j,ye),n.webnnCreateMLContext=w=>y.createMLContext(w),n.webnnRegisterMLConstant=(w,k,j,ye,De,je)=>y.registerMLConstant(w,k,j,ye,De,n.Fb,je),n.webnnRegisterGraphInput=y.registerGraphInput.bind(y),n.webnnIsGraphInput=y.isGraphInput.bind(y),n.webnnRegisterGraphOutput=y.registerGraphOutput.bind(y),n.webnnIsGraphOutput=y.isGraphOutput.bind(y),n.webnnCreateTemporaryTensor=y.createTemporaryTensor.bind(y),n.webnnIsGraphInputOutputTypeSupported=y.isGraphInputOutputTypeSupported.bind(y)}};let h=()=>{let l=(c,y,w)=>(...k)=>{let j=Br,ye=y?.();k=c(...k);let De=y?.();return ye!==De&&(c=De,w(ye),y=w=null),Br!=j?new Promise((je,et)=>{Ci={resolve:je,reject:et}}):k};(()=>{for(let c of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])n[c]=l(n[c],()=>n[c],y=>n[c]=y)})(),f!==void 0&&(n._OrtRun=f(n._OrtRun),n._OrtRunWithBinding=f(n._OrtRunWithBinding)),h=void 0};n.asyncInit=()=>{h?.()};var m,g,v=Object.assign({},n),_=(l,c)=>{throw c},$="";(s||o)&&(o?$=self.location.href:typeof document<"u"&&document.currentScript&&($=document.currentScript.src),Nl&&($=Nl),$=$.startsWith("blob:")?"":$.slice(0,$.replace(/[?#].*/,"").lastIndexOf("/")+1),o&&(g=l=>{var c=new XMLHttpRequest;return c.open("GET",l,!1),c.responseType="arraybuffer",c.send(null),new Uint8Array(c.response)}),m=async l=>{if(Oe(l))return new Promise((y,w)=>{var k=new XMLHttpRequest;k.open("GET",l,!0),k.responseType="arraybuffer",k.onload=()=>{k.status==200||k.status==0&&k.response?y(k.response):w(k.status)},k.onerror=w,k.send(null)});var c=await fetch(l,{credentials:"same-origin"});if(c.ok)return c.arrayBuffer();throw Error(c.status+" : "+c.url)});var L=console.log.bind(console),T=console.error.bind(console),b=L,N=T;Object.assign(n,v),v=null;var B,W,ae,Q,ge,ze,Xe,nt,Je,F,R,te,U,J=n.wasmBinary,$e=!1,Oe=l=>l.startsWith("file://");function He(){return B.buffer!=Q.buffer&&Et(),Q}function ie(){return B.buffer!=Q.buffer&&Et(),ge}function me(){return B.buffer!=Q.buffer&&Et(),ze}function Ve(){return B.buffer!=Q.buffer&&Et(),Xe}function de(){return B.buffer!=Q.buffer&&Et(),nt}function We(){return B.buffer!=Q.buffer&&Et(),Je}function Dt(){return B.buffer!=Q.buffer&&Et(),F}function Ut(){return B.buffer!=Q.buffer&&Et(),U}if(u){let l=function(c){try{var y=c.data,w=y.Cb;if(w==="load"){let k=[];self.onmessage=j=>k.push(j),self.startWorker=()=>{postMessage({Cb:"loaded"});for(let j of k)l(j);self.onmessage=l};for(let j of y.Sb)n[j]&&!n[j].proxy||(n[j]=(...ye)=>{postMessage({Cb:"callHandler",Rb:j,args:ye})},j=="print"&&(b=n[j]),j=="printErr"&&(N=n[j]));B=y.lc,Et(),zt(y.mc)}else if(w==="run"){_u(y.Bb),an(y.Bb,0,0,1,0,0),_r(),Ai(y.Bb),Mt||(Vi(),Mt=!0);try{bu(y.hc,y.Ib)}catch(k){if(k!="unwind")throw k}}else y.target!=="setimmediate"&&(w==="checkMailbox"?Mt&&br():w&&(N(`worker: received unknown command ${w}`),N(y)))}catch(k){throw Ba(),k}};var zt,Mt=!1;N=function(...c){c=c.join(" "),console.error(c)},self.alert=function(...c){postMessage({Cb:"alert",text:c.join(" "),jc:rn()})},self.onunhandledrejection=c=>{throw c.reason||c},self.onmessage=l}function Et(){var l=B.buffer;n.HEAP8=Q=new Int8Array(l),n.HEAP16=ze=new Int16Array(l),n.HEAPU8=ge=new Uint8Array(l),n.HEAPU16=Xe=new Uint16Array(l),n.HEAP32=nt=new Int32Array(l),n.HEAPU32=Je=new Uint32Array(l),n.HEAPF32=F=new Float32Array(l),n.HEAPF64=U=new Float64Array(l),n.HEAP64=R=new BigInt64Array(l),n.HEAPU64=te=new BigUint64Array(l)}function Jt(){u?startWorker(n):ut.Da()}u||(B=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Et());var er,hr=0,Ea=null;function fi(){if(--hr==0&&Ea){var l=Ea;Ea=null,l()}}function Gr(l){throw N(l="Aborted("+l+")"),$e=!0,l=new WebAssembly.RuntimeError(l+". Build with -sASSERTIONS for more info."),r(l),l}function Cs(){return{a:{L:An,Aa:Os,b:xu,$:gi,A:gr,pa:Ns,X:Ps,Z:Gs,qa:Fs,na:Us,ga:Vs,ma:vi,J:_i,Y:Wt,V:Ws,oa:qs,W:Hs,va:$u,E:Eu,Q:Su,O:ku,D:Iu,v:Cu,r:Ou,P:Ru,z:Ti,R:Lu,ja:Mu,T:xr,aa:Nu,M:Du,F:Qs,ia:Ai,sa:Zs,t:Ii,Ca:Pu,w:Oi,o:ao,m:Ri,c:$i,Ba:sa,n:no,j:Vu,u:Wu,p:qu,f:Hu,s:ju,l:Ia,e:Ku,k:Xu,h:Ya,g:Yu,d:Ca,da:oo,ea:Bi,fa:Qu,ba:uo,ca:lo,N:fo,xa:co,ua:po,i:Mi,C:Bn,G:ma,ta:qt,x:Ni,ra:Ln,U:Qa,q:Zu,y:Mn,K:ho,S:Di,za:Ju,ya:el,ka:Dn,la:ga,_:In,B:Pn,I:Gn,ha:Fn,H:Gi,a:B,wa:pi}}}var mr={840156:(l,c,y,w,k)=>{if(n===void 0||!n.Fb)return 1;if((l=Xt(Number(l>>>0))).startsWith("./")&&(l=l.substring(2)),!(l=n.Fb.get(l)))return 2;if(c=Number(c>>>0),y=Number(y>>>0),w=Number(w>>>0),c+y>l.byteLength)return 3;try{let j=l.subarray(c,c+y);switch(k){case 0:ie().set(j,w>>>0);break;case 1:n.nc?n.nc(w,j):n.cc(w,j);break;default:return 4}return 0}catch{return 4}},840980:(l,c,y)=>{n.Pb(l,ie().subarray(c>>>0,c+y>>>0))},841044:()=>n.oc(),841086:l=>{n.Ob(l)},841123:()=>{n.Wb()},841154:()=>{n.Xb()},841183:()=>{n.ac()},841208:l=>n.Vb(l),841241:l=>n.Zb(l),841273:(l,c,y)=>{n.Lb(Number(l),Number(c),Number(y),!0)},841336:(l,c,y)=>{n.Lb(Number(l),Number(c),Number(y))},841393:()=>typeof wasmOffsetConverter<"u",841450:l=>{n.kb("Abs",l,void 0)},841501:l=>{n.kb("Neg",l,void 0)},841552:l=>{n.kb("Floor",l,void 0)},841605:l=>{n.kb("Ceil",l,void 0)},841657:l=>{n.kb("Reciprocal",l,void 0)},841715:l=>{n.kb("Sqrt",l,void 0)},841767:l=>{n.kb("Exp",l,void 0)},841818:l=>{n.kb("Erf",l,void 0)},841869:l=>{n.kb("Sigmoid",l,void 0)},841924:(l,c,y)=>{n.kb("HardSigmoid",l,{alpha:c,beta:y})},842003:l=>{n.kb("Log",l,void 0)},842054:l=>{n.kb("Sin",l,void 0)},842105:l=>{n.kb("Cos",l,void 0)},842156:l=>{n.kb("Tan",l,void 0)},842207:l=>{n.kb("Asin",l,void 0)},842259:l=>{n.kb("Acos",l,void 0)},842311:l=>{n.kb("Atan",l,void 0)},842363:l=>{n.kb("Sinh",l,void 0)},842415:l=>{n.kb("Cosh",l,void 0)},842467:l=>{n.kb("Asinh",l,void 0)},842520:l=>{n.kb("Acosh",l,void 0)},842573:l=>{n.kb("Atanh",l,void 0)},842626:l=>{n.kb("Tanh",l,void 0)},842678:l=>{n.kb("Not",l,void 0)},842729:(l,c,y)=>{n.kb("Clip",l,{min:c,max:y})},842798:l=>{n.kb("Clip",l,void 0)},842850:(l,c)=>{n.kb("Elu",l,{alpha:c})},842908:l=>{n.kb("Gelu",l,void 0)},842960:l=>{n.kb("Relu",l,void 0)},843012:(l,c)=>{n.kb("LeakyRelu",l,{alpha:c})},843076:(l,c)=>{n.kb("ThresholdedRelu",l,{alpha:c})},843146:(l,c)=>{n.kb("Cast",l,{to:c})},843204:l=>{n.kb("Add",l,void 0)},843255:l=>{n.kb("Sub",l,void 0)},843306:l=>{n.kb("Mul",l,void 0)},843357:l=>{n.kb("Div",l,void 0)},843408:l=>{n.kb("Pow",l,void 0)},843459:l=>{n.kb("Equal",l,void 0)},843512:l=>{n.kb("Greater",l,void 0)},843567:l=>{n.kb("GreaterOrEqual",l,void 0)},843629:l=>{n.kb("Less",l,void 0)},843681:l=>{n.kb("LessOrEqual",l,void 0)},843740:(l,c,y,w,k)=>{n.kb("ReduceMean",l,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:w?Array.from(de().subarray(Number(w)>>>0,Number(k)>>>0)):[]})},843915:(l,c,y,w,k)=>{n.kb("ReduceMax",l,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:w?Array.from(de().subarray(Number(w)>>>0,Number(k)>>>0)):[]})},844089:(l,c,y,w,k)=>{n.kb("ReduceMin",l,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:w?Array.from(de().subarray(Number(w)>>>0,Number(k)>>>0)):[]})},844263:(l,c,y,w,k)=>{n.kb("ReduceProd",l,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:w?Array.from(de().subarray(Number(w)>>>0,Number(k)>>>0)):[]})},844438:(l,c,y,w,k)=>{n.kb("ReduceSum",l,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:w?Array.from(de().subarray(Number(w)>>>0,Number(k)>>>0)):[]})},844612:(l,c,y,w,k)=>{n.kb("ReduceL1",l,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:w?Array.from(de().subarray(Number(w)>>>0,Number(k)>>>0)):[]})},844785:(l,c,y,w,k)=>{n.kb("ReduceL2",l,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:w?Array.from(de().subarray(Number(w)>>>0,Number(k)>>>0)):[]})},844958:(l,c,y,w,k)=>{n.kb("ReduceLogSum",l,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:w?Array.from(de().subarray(Number(w)>>>0,Number(k)>>>0)):[]})},845135:(l,c,y,w,k)=>{n.kb("ReduceSumSquare",l,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:w?Array.from(de().subarray(Number(w)>>>0,Number(k)>>>0)):[]})},845315:(l,c,y,w,k)=>{n.kb("ReduceLogSumExp",l,{keepDims:!!c,noopWithEmptyAxes:!!y,axes:w?Array.from(de().subarray(Number(w)>>>0,Number(k)>>>0)):[]})},845495:l=>{n.kb("Where",l,void 0)},845548:(l,c,y)=>{n.kb("Transpose",l,{perm:c?Array.from(de().subarray(Number(c)>>>0,Number(y)>>>0)):[]})},845672:(l,c,y,w)=>{n.kb("DepthToSpace",l,{blocksize:c,mode:Xt(y),format:w?"NHWC":"NCHW"})},845805:(l,c,y,w)=>{n.kb("DepthToSpace",l,{blocksize:c,mode:Xt(y),format:w?"NHWC":"NCHW"})},845938:(l,c,y,w,k,j,ye,De,je,et,vt,At,Tt,Ht,ya)=>{n.kb("ConvTranspose",l,{format:je?"NHWC":"NCHW",autoPad:c,dilations:[y],group:w,kernelShape:[k],pads:[j,ye],strides:[De],wIsConst:()=>!!He()[et>>>0],outputPadding:vt?Array.from(de().subarray(Number(vt)>>>0,Number(At)>>>0)):[],outputShape:Tt?Array.from(de().subarray(Number(Tt)>>>0,Number(Ht)>>>0)):[],activation:Xt(ya)})},846371:(l,c,y,w,k,j,ye,De,je,et,vt,At,Tt,Ht)=>{n.kb("ConvTranspose",l,{format:De?"NHWC":"NCHW",autoPad:c,dilations:Array.from(de().subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),group:w,kernelShape:Array.from(de().subarray(Number(k)>>>0,2+(Number(k)>>>0)>>>0)),pads:Array.from(de().subarray(Number(j)>>>0,4+(Number(j)>>>0)>>>0)),strides:Array.from(de().subarray(Number(ye)>>>0,2+(Number(ye)>>>0)>>>0)),wIsConst:()=>!!He()[je>>>0],outputPadding:et?Array.from(de().subarray(Number(et)>>>0,Number(vt)>>>0)):[],outputShape:At?Array.from(de().subarray(Number(At)>>>0,Number(Tt)>>>0)):[],activation:Xt(Ht)})},847032:(l,c,y,w,k,j,ye,De,je,et,vt,At,Tt,Ht,ya)=>{n.kb("ConvTranspose",l,{format:je?"NHWC":"NCHW",autoPad:c,dilations:[y],group:w,kernelShape:[k],pads:[j,ye],strides:[De],wIsConst:()=>!!He()[et>>>0],outputPadding:vt?Array.from(de().subarray(Number(vt)>>>0,Number(At)>>>0)):[],outputShape:Tt?Array.from(de().subarray(Number(Tt)>>>0,Number(Ht)>>>0)):[],activation:Xt(ya)})},847465:(l,c,y,w,k,j,ye,De,je,et,vt,At,Tt,Ht)=>{n.kb("ConvTranspose",l,{format:De?"NHWC":"NCHW",autoPad:c,dilations:Array.from(de().subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),group:w,kernelShape:Array.from(de().subarray(Number(k)>>>0,2+(Number(k)>>>0)>>>0)),pads:Array.from(de().subarray(Number(j)>>>0,4+(Number(j)>>>0)>>>0)),strides:Array.from(de().subarray(Number(ye)>>>0,2+(Number(ye)>>>0)>>>0)),wIsConst:()=>!!He()[je>>>0],outputPadding:et?Array.from(de().subarray(Number(et)>>>0,Number(vt)>>>0)):[],outputShape:At?Array.from(de().subarray(Number(At)>>>0,Number(Tt)>>>0)):[],activation:Xt(Ht)})},848126:(l,c)=>{n.kb("GlobalAveragePool",l,{format:c?"NHWC":"NCHW"})},848217:(l,c,y,w,k,j,ye,De,je,et,vt,At,Tt,Ht)=>{n.kb("AveragePool",l,{format:Ht?"NHWC":"NCHW",auto_pad:c,ceil_mode:y,count_include_pad:w,storage_order:k,dilations:j?Array.from(de().subarray(Number(j)>>>0,Number(ye)>>>0)):[],kernel_shape:De?Array.from(de().subarray(Number(De)>>>0,Number(je)>>>0)):[],pads:et?Array.from(de().subarray(Number(et)>>>0,Number(vt)>>>0)):[],strides:At?Array.from(de().subarray(Number(At)>>>0,Number(Tt)>>>0)):[]})},848696:(l,c)=>{n.kb("GlobalAveragePool",l,{format:c?"NHWC":"NCHW"})},848787:(l,c,y,w,k,j,ye,De,je,et,vt,At,Tt,Ht)=>{n.kb("AveragePool",l,{format:Ht?"NHWC":"NCHW",auto_pad:c,ceil_mode:y,count_include_pad:w,storage_order:k,dilations:j?Array.from(de().subarray(Number(j)>>>0,Number(ye)>>>0)):[],kernel_shape:De?Array.from(de().subarray(Number(De)>>>0,Number(je)>>>0)):[],pads:et?Array.from(de().subarray(Number(et)>>>0,Number(vt)>>>0)):[],strides:At?Array.from(de().subarray(Number(At)>>>0,Number(Tt)>>>0)):[]})},849266:(l,c)=>{n.kb("GlobalMaxPool",l,{format:c?"NHWC":"NCHW"})},849353:(l,c,y,w,k,j,ye,De,je,et,vt,At,Tt,Ht)=>{n.kb("MaxPool",l,{format:Ht?"NHWC":"NCHW",auto_pad:c,ceil_mode:y,count_include_pad:w,storage_order:k,dilations:j?Array.from(de().subarray(Number(j)>>>0,Number(ye)>>>0)):[],kernel_shape:De?Array.from(de().subarray(Number(De)>>>0,Number(je)>>>0)):[],pads:et?Array.from(de().subarray(Number(et)>>>0,Number(vt)>>>0)):[],strides:At?Array.from(de().subarray(Number(At)>>>0,Number(Tt)>>>0)):[]})},849828:(l,c)=>{n.kb("GlobalMaxPool",l,{format:c?"NHWC":"NCHW"})},849915:(l,c,y,w,k,j,ye,De,je,et,vt,At,Tt,Ht)=>{n.kb("MaxPool",l,{format:Ht?"NHWC":"NCHW",auto_pad:c,ceil_mode:y,count_include_pad:w,storage_order:k,dilations:j?Array.from(de().subarray(Number(j)>>>0,Number(ye)>>>0)):[],kernel_shape:De?Array.from(de().subarray(Number(De)>>>0,Number(je)>>>0)):[],pads:et?Array.from(de().subarray(Number(et)>>>0,Number(vt)>>>0)):[],strides:At?Array.from(de().subarray(Number(At)>>>0,Number(Tt)>>>0)):[]})},850390:(l,c,y,w,k)=>{n.kb("Gemm",l,{alpha:c,beta:y,transA:w,transB:k})},850494:l=>{n.kb("MatMul",l,void 0)},850548:(l,c,y,w)=>{n.kb("ArgMax",l,{keepDims:!!c,selectLastIndex:!!y,axis:w})},850656:(l,c,y,w)=>{n.kb("ArgMin",l,{keepDims:!!c,selectLastIndex:!!y,axis:w})},850764:(l,c)=>{n.kb("Softmax",l,{axis:c})},850827:(l,c)=>{n.kb("Concat",l,{axis:c})},850887:(l,c,y,w,k)=>{n.kb("Split",l,{axis:c,numOutputs:y,splitSizes:w?Array.from(de().subarray(Number(w)>>>0,Number(k)>>>0)):[]})},851043:l=>{n.kb("Expand",l,void 0)},851097:(l,c)=>{n.kb("Gather",l,{axis:Number(c)})},851168:(l,c)=>{n.kb("GatherElements",l,{axis:Number(c)})},851247:(l,c)=>{n.kb("GatherND",l,{batch_dims:Number(c)})},851326:(l,c,y,w,k,j,ye,De,je,et,vt)=>{n.kb("Resize",l,{antialias:c,axes:y?Array.from(de().subarray(Number(y)>>>0,Number(w)>>>0)):[],coordinateTransformMode:Xt(k),cubicCoeffA:j,excludeOutside:ye,extrapolationValue:De,keepAspectRatioPolicy:Xt(je),mode:Xt(et),nearestMode:Xt(vt)})},851688:(l,c,y,w,k,j,ye)=>{n.kb("Slice",l,{starts:c?Array.from(de().subarray(Number(c)>>>0,Number(y)>>>0)):[],ends:w?Array.from(de().subarray(Number(w)>>>0,Number(k)>>>0)):[],axes:j?Array.from(de().subarray(Number(j)>>>0,Number(ye)>>>0)):[]})},851952:l=>{n.kb("Tile",l,void 0)},852004:(l,c,y)=>{n.kb("InstanceNormalization",l,{epsilon:c,format:y?"NHWC":"NCHW"})},852118:(l,c,y)=>{n.kb("InstanceNormalization",l,{epsilon:c,format:y?"NHWC":"NCHW"})},852232:l=>{n.kb("Range",l,void 0)},852285:(l,c)=>{n.kb("Einsum",l,{equation:Xt(c)})},852366:(l,c,y,w,k)=>{n.kb("Pad",l,{mode:c,value:y,pads:w?Array.from(de().subarray(Number(w)>>>0,Number(k)>>>0)):[]})},852509:(l,c,y,w,k,j)=>{n.kb("BatchNormalization",l,{epsilon:c,momentum:y,spatial:!!k,trainingMode:!!w,format:j?"NHWC":"NCHW"})},852678:(l,c,y,w,k,j)=>{n.kb("BatchNormalization",l,{epsilon:c,momentum:y,spatial:!!k,trainingMode:!!w,format:j?"NHWC":"NCHW"})},852847:(l,c,y)=>{n.kb("CumSum",l,{exclusive:Number(c),reverse:Number(y)})},852944:(l,c,y)=>{n.kb("DequantizeLinear",l,{axis:c,blockSize:y})},853034:(l,c,y,w,k)=>{n.kb("GridSample",l,{align_corners:c,mode:Xt(y),padding_mode:Xt(w),format:k?"NHWC":"NCHW"})},853204:(l,c,y,w,k)=>{n.kb("GridSample",l,{align_corners:c,mode:Xt(y),padding_mode:Xt(w),format:k?"NHWC":"NCHW"})},853374:(l,c)=>{n.kb("ScatterND",l,{reduction:Xt(c)})},853459:(l,c,y,w,k,j,ye,De,je)=>{n.kb("Attention",l,{numHeads:c,isUnidirectional:y,maskFilterValue:w,scale:k,doRotary:j,qkvHiddenSizes:ye?Array.from(de().subarray(Number(De)>>>0,Number(De)+ye>>>0)):[],pastPresentShareBuffer:!!je})},853731:l=>{n.kb("BiasAdd",l,void 0)},853786:l=>{n.kb("BiasSplitGelu",l,void 0)},853847:l=>{n.kb("FastGelu",l,void 0)},853903:(l,c,y,w,k,j,ye,De,je,et,vt,At,Tt,Ht,ya,xo)=>{n.kb("Conv",l,{format:At?"NHWC":"NCHW",auto_pad:c,dilations:y?Array.from(de().subarray(Number(y)>>>0,Number(w)>>>0)):[],group:k,kernel_shape:j?Array.from(de().subarray(Number(j)>>>0,Number(ye)>>>0)):[],pads:De?Array.from(de().subarray(Number(De)>>>0,Number(je)>>>0)):[],strides:et?Array.from(de().subarray(Number(et)>>>0,Number(vt)>>>0)):[],w_is_const:()=>!!He()[Number(Tt)>>>0],activation:Xt(Ht),activation_params:ya?Array.from(Dt().subarray(Number(ya)>>>0,Number(xo)>>>0)):[]})},854487:l=>{n.kb("Gelu",l,void 0)},854539:(l,c,y,w,k,j,ye,De,je)=>{n.kb("GroupQueryAttention",l,{numHeads:c,kvNumHeads:y,scale:w,softcap:k,doRotary:j,rotaryInterleaved:ye,smoothSoftmax:De,localWindowSize:je})},854756:(l,c,y,w)=>{n.kb("LayerNormalization",l,{axis:c,epsilon:y,simplified:!!w})},854867:(l,c,y,w)=>{n.kb("LayerNormalization",l,{axis:c,epsilon:y,simplified:!!w})},854978:(l,c,y,w,k,j)=>{n.kb("MatMulNBits",l,{k:c,n:y,accuracyLevel:w,bits:k,blockSize:j})},855105:(l,c,y,w,k,j)=>{n.kb("MultiHeadAttention",l,{numHeads:c,isUnidirectional:y,maskFilterValue:w,scale:k,doRotary:j})},855264:(l,c)=>{n.kb("QuickGelu",l,{alpha:c})},855328:(l,c,y,w,k)=>{n.kb("RotaryEmbedding",l,{interleaved:!!c,numHeads:y,rotaryEmbeddingDim:w,scale:k})},855467:(l,c,y)=>{n.kb("SkipLayerNormalization",l,{epsilon:c,simplified:!!y})},855569:(l,c,y)=>{n.kb("SkipLayerNormalization",l,{epsilon:c,simplified:!!y})},855671:(l,c,y,w)=>{n.kb("GatherBlockQuantized",l,{gatherAxis:c,quantizeAxis:y,blockSize:w})},855792:l=>{n.$b(l)},855826:(l,c)=>n.bc(Number(l),Number(c),n.Gb.ec,n.Gb.errors)};function Os(l,c,y){return ja(async()=>{await n.Yb(Number(l),Number(c),Number(y))})}function An(){return typeof wasmOffsetConverter<"u"}class ci{name="ExitStatus";constructor(c){this.message=`Program terminated with exit(${c})`,this.status=c}}var Rs=l=>{l.terminate(),l.onmessage=()=>{}},I=[],zs=l=>{Tr.length==0&&(mi(),Cn(Tr[0]));var c=Tr.pop();if(!c)return 6;Sa.push(c),ca[l.Bb]=c,c.Bb=l.Bb;var y={Cb:"run",hc:l.fc,Ib:l.Ib,Bb:l.Bb};return c.postMessage(y,l.Nb),0},ta=0,Ft=(l,c,...y)=>{for(var w=2*y.length,k=qi(),j=nn(8*w),ye=j>>>3,De=0;De<y.length;De++){var je=y[De];typeof je=="bigint"?(R[ye+2*De]=1n,R[ye+2*De+1]=je):(R[ye+2*De]=0n,Ut()[ye+2*De+1>>>0]=je)}return l=yo(l,0,w,j,c),Vn(k),l};function pi(l){if(u)return Ft(0,1,l);if(ae=l,!(0<ta)){for(var c of Sa)Rs(c);for(c of Tr)Rs(c);Tr=[],Sa=[],ca={},$e=!0}_(0,new ci(l))}function ra(l){if(u)return Ft(1,0,l);In(l)}var In=l=>{if(ae=l,u)throw ra(l),"unwind";pi(l)},Tr=[],Sa=[],Bs=[],ca={},hi=l=>{var c=l.Bb;delete ca[c],Tr.push(l),Sa.splice(Sa.indexOf(l),1),l.Bb=0,vo(c)};function _r(){Bs.forEach(l=>l())}var Cn=l=>new Promise(c=>{l.onmessage=k=>{var j=(k=k.data).Cb;if(k.Hb&&k.Hb!=rn()){var ye=ca[k.Hb];ye?ye.postMessage(k,k.Nb):N(`Internal error! Worker sent a message "${j}" to target pthread ${k.Hb}, but that thread no longer exists!`)}else j==="checkMailbox"?br():j==="spawnThread"?zs(k):j==="cleanupThread"?hi(ca[k.ic]):j==="loaded"?(l.loaded=!0,c(l)):j==="alert"?alert(`Thread ${k.jc}: ${k.text}`):k.target==="setimmediate"?l.postMessage(k):j==="callHandler"?n[k.Rb](...k.args):j&&N(`worker sent an unknown command ${j}`)},l.onerror=k=>{throw N(`worker sent an error! ${k.filename}:${k.lineno}: ${k.message}`),k};var y,w=[];for(y of[])n.propertyIsEnumerable(y)&&w.push(y);l.postMessage({Cb:"load",Sb:w,lc:B,mc:W})});function mi(){var l=new Worker((()=>{let c=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new c("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});Tr.push(l)}var _u=l=>{Et();var c=We()[l+52>>>2>>>0];l=We()[l+56>>>2>>>0],bo(c,c-l),Vn(c)},bu=(l,c)=>{ta=0,l=Wn(l,c),0<ta?ae=l:Wi(l)};class wu{constructor(c){this.Jb=c-24}}function xu(l,c,y){var w=new wu(l>>>=0);throw c>>>=0,y>>>=0,We()[w.Jb+16>>>2>>>0]=0,We()[w.Jb+4>>>2>>>0]=c,We()[w.Jb+8>>>2>>>0]=y,l}function Ls(l,c,y,w){return u?Ft(2,1,l,c,y,w):gi(l,c,y,w)}function gi(l,c,y,w){if(l>>>=0,y>>>=0,w>>>=0,d===void 0)return 6;var k=[];return u&&k.length===0?Ls(l,c>>>=0,y,w):(l={fc:y,Bb:l,Ib:w,Nb:k},u?(l.Cb="spawnThread",postMessage(l,k),0):zs(l))}var yi=typeof TextDecoder<"u"?new TextDecoder:void 0,Ms=(l,c=0,y=NaN)=>{var w=(c>>>=0)+y;for(y=c;l[y]&&!(y>=w);)++y;if(16<y-c&&l.buffer&&yi)return yi.decode(l.buffer instanceof ArrayBuffer?l.subarray(c,y):l.slice(c,y));for(w="";c<y;){var k=l[c++];if(128&k){var j=63&l[c++];if((224&k)==192)w+=String.fromCharCode((31&k)<<6|j);else{var ye=63&l[c++];65536>(k=(240&k)==224?(15&k)<<12|j<<6|ye:(7&k)<<18|j<<12|ye<<6|63&l[c++])?w+=String.fromCharCode(k):(k-=65536,w+=String.fromCharCode(55296|k>>10,56320|1023&k))}}else w+=String.fromCharCode(k)}return w},Xt=(l,c)=>(l>>>=0)?Ms(ie(),l,c):"";function gr(l,c,y){return u?Ft(3,1,l,c,y):0}function Ns(l,c){if(u)return Ft(4,1,l,c)}var Ds=l=>{for(var c=0,y=0;y<l.length;++y){var w=l.charCodeAt(y);127>=w?c++:2047>=w?c+=2:55296<=w&&57343>=w?(c+=4,++y):c+=3}return c},Ta=(l,c,y)=>{var w=ie();if(c>>>=0,0<y){var k=c;y=c+y-1;for(var j=0;j<l.length;++j){var ye=l.charCodeAt(j);if(55296<=ye&&57343>=ye&&(ye=65536+((1023&ye)<<10)|1023&l.charCodeAt(++j)),127>=ye){if(c>=y)break;w[c++>>>0]=ye}else{if(2047>=ye){if(c+1>=y)break;w[c++>>>0]=192|ye>>6}else{if(65535>=ye){if(c+2>=y)break;w[c++>>>0]=224|ye>>12}else{if(c+3>=y)break;w[c++>>>0]=240|ye>>18,w[c++>>>0]=128|ye>>12&63}w[c++>>>0]=128|ye>>6&63}w[c++>>>0]=128|63&ye}}w[c>>>0]=0,l=c-k}else l=0;return l};function Ps(l,c){if(u)return Ft(5,1,l,c)}function Gs(l,c,y){if(u)return Ft(6,1,l,c,y)}function Fs(l,c,y){return u?Ft(7,1,l,c,y):0}function Us(l,c){if(u)return Ft(8,1,l,c)}function Vs(l,c,y){if(u)return Ft(9,1,l,c,y)}function vi(l,c,y,w){if(u)return Ft(10,1,l,c,y,w)}function _i(l,c,y,w){if(u)return Ft(11,1,l,c,y,w)}function Wt(l,c,y,w){if(u)return Ft(12,1,l,c,y,w)}function Ws(l){if(u)return Ft(13,1,l)}function qs(l,c){if(u)return Ft(14,1,l,c)}function Hs(l,c,y){if(u)return Ft(15,1,l,c,y)}var js,aa,$u=()=>Gr(""),zr=l=>{for(var c="";ie()[l>>>0];)c+=js[ie()[l++>>>0]];return c},bi={},wi={};function Fr(l,c,y={}){return function(w,k,j={}){var ye=k.name;if(!w)throw new aa(`type "${ye}" must have a positive integer typeid pointer`);if(wi.hasOwnProperty(w)){if(j.Tb)return;throw new aa(`Cannot register type '${ye}' twice`)}wi[w]=k,bi.hasOwnProperty(w)&&(k=bi[w],delete bi[w],k.forEach(De=>De()))}(l,c,y)}var Ks=(l,c,y)=>{switch(c){case 1:return y?w=>He()[w>>>0]:w=>ie()[w>>>0];case 2:return y?w=>me()[w>>>1>>>0]:w=>Ve()[w>>>1>>>0];case 4:return y?w=>de()[w>>>2>>>0]:w=>We()[w>>>2>>>0];case 8:return y?w=>R[w>>>3]:w=>te[w>>>3];default:throw new TypeError(`invalid integer width (${c}): ${l}`)}};function Eu(l,c,y){y>>>=0,Fr(l>>>=0,{name:c=zr(c>>>0),fromWireType:w=>w,toWireType:function(w,k){if(typeof k!="bigint"&&typeof k!="number")throw k=k===null?"null":(w=typeof k)=="object"||w==="array"||w==="function"?k.toString():""+k,new TypeError(`Cannot convert "${k}" to ${this.name}`);return typeof k=="number"&&(k=BigInt(k)),k},Db:na,readValueFromPointer:Ks(c,y,c.indexOf("u")==-1),Eb:null})}var na=8;function Su(l,c,y,w){Fr(l>>>=0,{name:c=zr(c>>>0),fromWireType:function(k){return!!k},toWireType:function(k,j){return j?y:w},Db:na,readValueFromPointer:function(k){return this.fromWireType(ie()[k>>>0])},Eb:null})}var xi=[],Ur=[];function $i(l){9<(l>>>=0)&&--Ur[l+1]==0&&(Ur[l]=void 0,xi.push(l))}var yr=l=>{if(!l)throw new aa("Cannot use deleted val. handle = "+l);return Ur[l]},kr=l=>{switch(l){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let c=xi.pop()||Ur.length;return Ur[c]=l,Ur[c+1]=1,c}};function Ei(l){return this.fromWireType(We()[l>>>2>>>0])}var Tu={name:"emscripten::val",fromWireType:l=>{var c=yr(l);return $i(l),c},toWireType:(l,c)=>kr(c),Db:na,readValueFromPointer:Ei,Eb:null};function ku(l){return Fr(l>>>0,Tu)}var Au=(l,c)=>{switch(c){case 4:return function(y){return this.fromWireType(Dt()[y>>>2>>>0])};case 8:return function(y){return this.fromWireType(Ut()[y>>>3>>>0])};default:throw new TypeError(`invalid float width (${c}): ${l}`)}};function Iu(l,c,y){y>>>=0,Fr(l>>>=0,{name:c=zr(c>>>0),fromWireType:w=>w,toWireType:(w,k)=>k,Db:na,readValueFromPointer:Au(c,y),Eb:null})}function Cu(l,c,y,w,k){if(l>>>=0,y>>>=0,c=zr(c>>>0),k===-1&&(k=4294967295),k=De=>De,w===0){var j=32-8*y;k=De=>De<<j>>>j}var ye=c.includes("unsigned")?function(De,je){return je>>>0}:function(De,je){return je};Fr(l,{name:c,fromWireType:k,toWireType:ye,Db:na,readValueFromPointer:Ks(c,y,w!==0),Eb:null})}function Ou(l,c,y){function w(j){var ye=We()[j>>>2>>>0];return j=We()[j+4>>>2>>>0],new k(He().buffer,j,ye)}var k=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][c];Fr(l>>>=0,{name:y=zr(y>>>0),fromWireType:w,Db:na,readValueFromPointer:w},{Tb:!0})}function Ru(l,c){Fr(l>>>=0,{name:c=zr(c>>>0),fromWireType:function(y){for(var w,k=We()[y>>>2>>>0],j=y+4,ye=j,De=0;De<=k;++De){var je=j+De;De!=k&&ie()[je>>>0]!=0||(ye=Xt(ye,je-ye),w===void 0?w=ye:(w+="\0",w+=ye),ye=je+1)}return vr(y),w},toWireType:function(y,w){w instanceof ArrayBuffer&&(w=new Uint8Array(w));var k=typeof w=="string";if(!(k||w instanceof Uint8Array||w instanceof Uint8ClampedArray||w instanceof Int8Array))throw new aa("Cannot pass non-string to std::string");var j=k?Ds(w):w.length,ye=za(4+j+1),De=ye+4;if(We()[ye>>>2>>>0]=j,k)Ta(w,De,j+1);else if(k)for(k=0;k<j;++k){var je=w.charCodeAt(k);if(255<je)throw vr(ye),new aa("String has UTF-16 code units that do not fit in 8 bits");ie()[De+k>>>0]=je}else for(k=0;k<j;++k)ie()[De+k>>>0]=w[k];return y!==null&&y.push(vr,ye),ye},Db:na,readValueFromPointer:Ei,Eb(y){vr(y)}})}var qa=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Xs=(l,c)=>{for(var y=l>>1,w=y+c/2;!(y>=w)&&Ve()[y>>>0];)++y;if(32<(y<<=1)-l&&qa)return qa.decode(ie().slice(l,y));for(y="",w=0;!(w>=c/2);++w){var k=me()[l+2*w>>>1>>>0];if(k==0)break;y+=String.fromCharCode(k)}return y},zu=(l,c,y)=>{if(y??=2147483647,2>y)return 0;var w=c;y=(y-=2)<2*l.length?y/2:l.length;for(var k=0;k<y;++k){var j=l.charCodeAt(k);me()[c>>>1>>>0]=j,c+=2}return me()[c>>>1>>>0]=0,c-w},Bu=l=>2*l.length,Ha=(l,c)=>{for(var y=0,w="";!(y>=c/4);){var k=de()[l+4*y>>>2>>>0];if(k==0)break;++y,65536<=k?(k-=65536,w+=String.fromCharCode(55296|k>>10,56320|1023&k)):w+=String.fromCharCode(k)}return w},Si=(l,c,y)=>{if(c>>>=0,y??=2147483647,4>y)return 0;var w=c;y=w+y-4;for(var k=0;k<l.length;++k){var j=l.charCodeAt(k);if(55296<=j&&57343>=j&&(j=65536+((1023&j)<<10)|1023&l.charCodeAt(++k)),de()[c>>>2>>>0]=j,(c+=4)+4>y)break}return de()[c>>>2>>>0]=0,c-w},Ys=l=>{for(var c=0,y=0;y<l.length;++y){var w=l.charCodeAt(y);55296<=w&&57343>=w&&++y,c+=4}return c};function Ti(l,c,y){if(l>>>=0,c>>>=0,y=zr(y>>>=0),c===2)var w=Xs,k=zu,j=Bu,ye=De=>Ve()[De>>>1>>>0];else c===4&&(w=Ha,k=Si,j=Ys,ye=De=>We()[De>>>2>>>0]);Fr(l,{name:y,fromWireType:De=>{for(var je,et=We()[De>>>2>>>0],vt=De+4,At=0;At<=et;++At){var Tt=De+4+At*c;At!=et&&ye(Tt)!=0||(vt=w(vt,Tt-vt),je===void 0?je=vt:(je+="\0",je+=vt),vt=Tt+c)}return vr(De),je},toWireType:(De,je)=>{if(typeof je!="string")throw new aa(`Cannot pass non-string to C++ string type ${y}`);var et=j(je),vt=za(4+et+c);return We()[vt>>>2>>>0]=et/c,k(je,vt+4,et+c),De!==null&&De.push(vr,vt),vt},Db:na,readValueFromPointer:Ei,Eb(De){vr(De)}})}function Lu(l,c){Fr(l>>>=0,{Ub:!0,name:c=zr(c>>>0),Db:0,fromWireType:()=>{},toWireType:()=>{}})}function Mu(l){an(l>>>0,!o,1,!s,131072,!1),_r()}var ki=l=>{if(!$e)try{if(l(),!(0<ta))try{u?Wi(ae):In(ae)}catch(c){c instanceof ci||c=="unwind"||_(0,c)}}catch(c){c instanceof ci||c=="unwind"||_(0,c)}};function Ai(l){l>>>=0,typeof Atomics.kc=="function"&&(Atomics.kc(de(),l>>>2,l).value.then(br),l+=128,Atomics.store(de(),l>>>2,1))}var br=()=>{var l=rn();l&&(Ai(l),ki(_o))};function xr(l,c){(l>>>=0)==c>>>0?setTimeout(br):u?postMessage({Hb:l,Cb:"checkMailbox"}):(l=ca[l])&&l.postMessage({Cb:"checkMailbox"})}var ka=[];function Nu(l,c,y,w,k){for(c>>>=0,w/=2,ka.length=w,y=k>>>0>>>3,k=0;k<w;k++)ka[k]=R[y+2*k]?R[y+2*k+1]:Ut()[y+2*k+1>>>0];return(c?mr[c]:go[l])(...ka)}var Du=()=>{ta=0};function Qs(l){l>>>=0,u?postMessage({Cb:"cleanupThread",ic:l}):hi(ca[l])}function Zs(l){}var On=(l,c)=>{var y=wi[l];if(y===void 0)throw l=Ui(l),y=zr(l),vr(l),new aa(`${c} has unknown type ${y}`);return y},Js=(l,c,y)=>{var w=[];return l=l.toWireType(w,y),w.length&&(We()[c>>>2>>>0]=kr(w)),l};function Ii(l,c,y){return c>>>=0,y>>>=0,l=yr(l>>>0),c=On(c,"emval::as"),Js(c,y,l)}function Pu(l,c){return c>>>=0,l=yr(l>>>0),(c=On(c,"emval::as")).toWireType(null,l)}var Rn=l=>{try{l()}catch(c){Gr(c)}},ia=0,Br=null,eo=0,zn=[],to={},ro={},pa=0,Ci=null,Gu=[];function ja(l){return function(c){if(!$e){if(ia===0){var y=!1,w=!1;c((k=0)=>{if(!$e&&(eo=k,y=!0,w)){ia=2,Rn(()=>qn(Br)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),k=!1;try{var j=function(){var je=de()[Br+8>>>2>>>0];return je=ut[ro[je]],--ta,je()}()}catch(je){j=je,k=!0}var ye=!1;if(!Br){var De=Ci;De&&(Ci=null,(k?De.reject:De.resolve)(j),ye=!0)}if(k&&!ye)throw j}}),w=!0,y||(ia=1,Br=function(){var k=za(65548),j=k+12;We()[k>>>2>>>0]=j,We()[k+4>>>2>>>0]=j+65536,j=zn[0];var ye=to[j];return ye===void 0&&(ye=pa++,to[j]=ye,ro[ye]=j),j=ye,de()[k+8>>>2>>>0]=j,k}(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),Rn(()=>Hi(Br)))}else ia===2?(ia=0,Rn(wo),vr(Br),Br=null,Gu.forEach(ki)):Gr(`invalid state: ${ia}`);return eo}}(c=>{l().then(c)})}function Oi(l){return l>>>=0,ja(async()=>{var c=await yr(l);return kr(c)})}var Ka=[];function ao(l,c,y,w){return y>>>=0,w>>>=0,(l=Ka[l>>>0])(null,c=yr(c>>>0),y,w)}var Fu={},Aa=l=>{var c=Fu[l];return c===void 0?zr(l):c};function Ri(l,c,y,w,k){return y>>>=0,w>>>=0,k>>>=0,(l=Ka[l>>>0])(c=yr(c>>>0),c[y=Aa(y)],w,k)}function sa(l,c){return c>>>=0,(l=yr(l>>>0))==yr(c)}var Xa=()=>typeof globalThis=="object"?globalThis:Function("return this")();function no(l){return(l>>>=0)==0?kr(Xa()):(l=Aa(l),kr(Xa()[l]))}var io=l=>{var c=Ka.length;return Ka.push(l),c},Uu=(l,c)=>{for(var y=Array(l),w=0;w<l;++w)y[w]=On(We()[c+4*w>>>2>>>0],"parameter "+w);return y},so=(l,c)=>Object.defineProperty(c,"name",{value:l});function Vu(l,c,y){var w=(c=Uu(l,c>>>0)).shift();l--;var k=`return function (obj, func, destructorsRef, args) {
`,j=0,ye=[];y===0&&ye.push("obj");for(var De=["retType"],je=[w],et=0;et<l;++et)ye.push("arg"+et),De.push("argType"+et),je.push(c[et]),k+=`  var arg${et} = argType${et}.readValueFromPointer(args${j?"+"+j:""});
`,j+=c[et].Db;return k+=`  var rv = ${y===1?"new func":"func.call"}(${ye.join(", ")});
`,w.Ub||(De.push("emval_returnValue"),je.push(Js),k+=`  return emval_returnValue(retType, destructorsRef, rv);
`),De.push(k+`};
`),l=function(vt){var At=Function;if(!(At instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof At} which is not a function`);var Tt=so(At.name||"unknownFunctionName",function(){});return Tt.prototype=At.prototype,Tt=new Tt,(vt=At.apply(Tt,vt))instanceof Object?vt:Tt}(De)(...je),y=`methodCaller<(${c.map(vt=>vt.name).join(", ")}) => ${w.name}>`,io(so(y,l))}function Wu(l){return l=Aa(l>>>0),kr(n[l])}function qu(l,c){return c>>>=0,l=yr(l>>>0),c=yr(c),kr(l[c])}function Hu(l){9<(l>>>=0)&&(Ur[l+1]+=1)}function ju(){return kr([])}function Ia(l){l=yr(l>>>0);for(var c=Array(l.length),y=0;y<l.length;y++)c[y]=l[y];return kr(c)}function Ku(l){return kr(Aa(l>>>0))}function Xu(){return kr({})}function Ya(l){for(var c=yr(l>>>=0);c.length;){var y=c.pop();c.pop()(y)}$i(l)}function Yu(l,c,y){c>>>=0,y>>>=0,l=yr(l>>>0),c=yr(c),y=yr(y),l[c]=y}function Ca(l,c){return c>>>=0,l=(l=On(l>>>0,"_emval_take_value")).readValueFromPointer(c),kr(l)}function oo(l,c){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),c>>>=0,l=new Date(1e3*l),de()[c>>>2>>>0]=l.getUTCSeconds(),de()[c+4>>>2>>>0]=l.getUTCMinutes(),de()[c+8>>>2>>>0]=l.getUTCHours(),de()[c+12>>>2>>>0]=l.getUTCDate(),de()[c+16>>>2>>>0]=l.getUTCMonth(),de()[c+20>>>2>>>0]=l.getUTCFullYear()-1900,de()[c+24>>>2>>>0]=l.getUTCDay(),l=(l.getTime()-Date.UTC(l.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,de()[c+28>>>2>>>0]=l}var ha=l=>l%4==0&&(l%100!=0||l%400==0),zi=[0,31,60,91,121,152,182,213,244,274,305,335],oa=[0,31,59,90,120,151,181,212,243,273,304,334];function Bi(l,c){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),c>>>=0,l=new Date(1e3*l),de()[c>>>2>>>0]=l.getSeconds(),de()[c+4>>>2>>>0]=l.getMinutes(),de()[c+8>>>2>>>0]=l.getHours(),de()[c+12>>>2>>>0]=l.getDate(),de()[c+16>>>2>>>0]=l.getMonth(),de()[c+20>>>2>>>0]=l.getFullYear()-1900,de()[c+24>>>2>>>0]=l.getDay();var y=(ha(l.getFullYear())?zi:oa)[l.getMonth()]+l.getDate()-1|0;de()[c+28>>>2>>>0]=y,de()[c+36>>>2>>>0]=-60*l.getTimezoneOffset(),y=new Date(l.getFullYear(),6,1).getTimezoneOffset();var w=new Date(l.getFullYear(),0,1).getTimezoneOffset();l=0|(y!=w&&l.getTimezoneOffset()==Math.min(w,y)),de()[c+32>>>2>>>0]=l}function Qu(l){l>>>=0;var c=new Date(de()[l+20>>>2>>>0]+1900,de()[l+16>>>2>>>0],de()[l+12>>>2>>>0],de()[l+8>>>2>>>0],de()[l+4>>>2>>>0],de()[l>>>2>>>0],0),y=de()[l+32>>>2>>>0],w=c.getTimezoneOffset(),k=new Date(c.getFullYear(),6,1).getTimezoneOffset(),j=new Date(c.getFullYear(),0,1).getTimezoneOffset(),ye=Math.min(j,k);return 0>y?de()[l+32>>>2>>>0]=+(k!=j&&ye==w):0<y!=(ye==w)&&(k=Math.max(j,k),c.setTime(c.getTime()+6e4*((0<y?ye:k)-w))),de()[l+24>>>2>>>0]=c.getDay(),y=(ha(c.getFullYear())?zi:oa)[c.getMonth()]+c.getDate()-1|0,de()[l+28>>>2>>>0]=y,de()[l>>>2>>>0]=c.getSeconds(),de()[l+4>>>2>>>0]=c.getMinutes(),de()[l+8>>>2>>>0]=c.getHours(),de()[l+12>>>2>>>0]=c.getDate(),de()[l+16>>>2>>>0]=c.getMonth(),de()[l+20>>>2>>>0]=c.getYear(),l=c.getTime(),BigInt(isNaN(l)?-1:l/1e3)}function uo(l,c,y,w,k,j,ye){return u?Ft(16,1,l,c,y,w,k,j,ye):-52}function lo(l,c,y,w,k,j){if(u)return Ft(17,1,l,c,y,w,k,j)}var Oa={},Zu=()=>performance.timeOrigin+performance.now();function fo(l,c){if(u)return Ft(18,1,l,c);if(Oa[l]&&(clearTimeout(Oa[l].id),delete Oa[l]),!c)return 0;var y=setTimeout(()=>{delete Oa[l],ki(()=>Un(l,performance.timeOrigin+performance.now()))},c);return Oa[l]={id:y,rc:c},0}function co(l,c,y,w){l>>>=0,c>>>=0,y>>>=0,w>>>=0;var k=new Date().getFullYear(),j=new Date(k,0,1).getTimezoneOffset();k=new Date(k,6,1).getTimezoneOffset();var ye=Math.max(j,k);We()[l>>>2>>>0]=60*ye,de()[c>>>2>>>0]=+(j!=k),l=(c=De=>{var je=Math.abs(De);return`UTC${0<=De?"-":"+"}${String(Math.floor(je/60)).padStart(2,"0")}${String(je%60).padStart(2,"0")}`})(j),c=c(k),k<j?(Ta(l,y,17),Ta(c,w,17)):(Ta(l,w,17),Ta(c,y,17))}var qt=()=>Date.now();function po(l,c,y){return 0<=l&&3>=l?(l===0?l=Date.now():l=performance.timeOrigin+performance.now(),R[y>>>0>>>3]=BigInt(Math.round(1e6*l)),0):28}var Li=[],Ir=(l,c)=>{Li.length=0;for(var y;y=ie()[l++>>>0];){var w=y!=105;c+=(w&=y!=112)&&c%8?4:0,Li.push(y==112?We()[c>>>2>>>0]:y==106?R[c>>>3]:y==105?de()[c>>>2>>>0]:Ut()[c>>>3>>>0]),c+=w?8:4}return Li};function Mi(l,c,y){return l>>>=0,c=Ir(c>>>0,y>>>0),mr[l](...c)}function Bn(l,c,y){return l>>>=0,c=Ir(c>>>0,y>>>0),mr[l](...c)}var ma=()=>{};function Ni(l,c){return N(Xt(l>>>0,c>>>0))}var Ln=()=>{throw ta+=1,"unwind"};function Qa(){return 4294901760}var Mn=()=>navigator.hardwareConcurrency;function ho(){return Gr("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Di(l){l>>>=0;var c=ie().length;if(l<=c||4294901760<l)return!1;for(var y=1;4>=y;y*=2){var w=c*(1+.2/y);w=Math.min(w,l+100663296);e:{w=(Math.min(4294901760,65536*Math.ceil(Math.max(l,w)/65536))-B.buffer.byteLength+65535)/65536|0;try{B.grow(w),Et();var k=1;break e}catch{}k=void 0}if(k)return!0}return!1}var Za=()=>(Gr("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Ja={},mo=l=>{l.forEach(c=>{Za()})};function Ju(){var l=Error().stack.toString().split(`
`);return l[0]=="Error"&&l.shift(),mo(l),Ja.Mb=Za(),Ja.dc=l,Ja.Mb}function el(l,c,y){if(l>>>=0,c>>>=0,Ja.Mb==l)var w=Ja.dc;else(w=Error().stack.toString().split(`
`))[0]=="Error"&&w.shift(),mo(w);for(var k=3;w[k]&&Za()!=l;)++k;for(l=0;l<y&&w[l+k];++l)de()[c+4*l>>>2>>>0]=Za();return l}var en,Ra={},Nn=()=>{if(!en){var l,c={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(l in Ra)Ra[l]===void 0?delete c[l]:c[l]=Ra[l];var y=[];for(l in c)y.push(`${l}=${c[l]}`);en=y}return en};function Dn(l,c){if(u)return Ft(19,1,l,c);l>>>=0,c>>>=0;var y=0;return Nn().forEach((w,k)=>{var j=c+y;for(k=We()[l+4*k>>>2>>>0]=j,j=0;j<w.length;++j)He()[k++>>>0]=w.charCodeAt(j);He()[k>>>0]=0,y+=w.length+1}),0}function ga(l,c){if(u)return Ft(20,1,l,c);l>>>=0,c>>>=0;var y=Nn();We()[l>>>2>>>0]=y.length;var w=0;return y.forEach(k=>w+=k.length+1),We()[c>>>2>>>0]=w,0}function Pn(l){return u?Ft(21,1,l):52}function Gn(l,c,y,w){return u?Ft(22,1,l,c,y,w):52}function Fn(l,c,y,w){return u?Ft(23,1,l,c,y,w):70}var Pi=[null,[],[]];function Gi(l,c,y,w){if(u)return Ft(24,1,l,c,y,w);c>>>=0,y>>>=0,w>>>=0;for(var k=0,j=0;j<y;j++){var ye=We()[c>>>2>>>0],De=We()[c+4>>>2>>>0];c+=8;for(var je=0;je<De;je++){var et=ie()[ye+je>>>0],vt=Pi[l];et===0||et===10?((l===1?b:N)(Ms(vt)),vt.length=0):vt.push(et)}k+=De}return We()[w>>>2>>>0]=k,0}u||function(){for(var l=n.numThreads-1;l--;)mi();I.unshift(()=>{hr++,function(c){u?c():Promise.all(Tr.map(Cn)).then(c)}(()=>fi())})}();for(var Fi=Array(256),tn=0;256>tn;++tn)Fi[tn]=String.fromCharCode(tn);js=Fi,aa=n.BindingError=class extends Error{constructor(l){super(l),this.name="BindingError"}},n.InternalError=class extends Error{constructor(l){super(l),this.name="InternalError"}},Ur.push(0,1,void 0,1,null,1,!0,1,!1,1),n.count_emval_handles=()=>Ur.length/2-5-xi.length;var ut,go=[pi,ra,Ls,gr,Ns,Ps,Gs,Fs,Us,Vs,vi,_i,Wt,Ws,qs,Hs,uo,lo,fo,Dn,ga,Pn,Gn,Fn,Gi];(async function(){function l(w,k){return ut=w.exports,ut=function(){var j=ut,ye={};for(let[De,je]of Object.entries(j))ye[De]=typeof je=="function"?(...et)=>{zn.push(De);try{return je(...et)}finally{$e||(zn.pop(),Br&&ia===1&&zn.length===0&&(ia=0,ta+=1,Rn(ji),typeof Fibers<"u"&&Fibers.sc()))}}:je;return ye}(),ut=function(){var j=ut,ye=je=>et=>je(et)>>>0,De=je=>()=>je()>>>0;return(j=Object.assign({},j)).Ea=ye(j.Ea),j.gb=De(j.gb),j.ib=ye(j.ib),j.ub=ye(j.ub),j.vb=De(j.vb),j.__cxa_get_exception_ptr=ye(j.__cxa_get_exception_ptr),j}(),Bs.push(ut.jb),W=k,fi(),ut}hr++;var c=Cs();if(n.instantiateWasm)return new Promise(w=>{n.instantiateWasm(c,(k,j)=>{l(k,j),w(k.exports)})});if(u)return new Promise(w=>{zt=k=>{var j=new WebAssembly.Instance(k,Cs());w(l(j,k))}});er??=n.locateFile?n.locateFile?n.locateFile("ort-wasm-simd-threaded.jsep.wasm",$):$+"ort-wasm-simd-threaded.jsep.wasm":new URL("/live-music-projection/assets/ort-wasm-simd-threaded.jsep-CLPRrI3A.wasm",import.meta.url).href;try{var y=await async function(w){var k=er;if(!J&&typeof WebAssembly.instantiateStreaming=="function"&&!Oe(k))try{var j=fetch(k,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(j,w)}catch(ye){N(`wasm streaming compile failed: ${ye}`),N("falling back to ArrayBuffer instantiation")}return async function(ye,De){try{var je=await async function(et){if(!J)try{var vt=await m(et);return new Uint8Array(vt)}catch{}if(et==er&&J)et=new Uint8Array(J);else{if(!g)throw"both async and sync fetching of the wasm failed";et=g(et)}return et}(ye);return await WebAssembly.instantiate(je,De)}catch(et){N(`failed to asynchronously prepare wasm: ${et}`),Gr(et)}}(k,w)}(c);return l(y.instance,y.module)}catch(w){return r(w),Promise.reject(w)}})();var Ui=l=>(Ui=ut.Ea)(l),Vi=()=>(Vi=ut.Fa)();n._OrtInit=(l,c)=>(n._OrtInit=ut.Ga)(l,c),n._OrtGetLastError=(l,c)=>(n._OrtGetLastError=ut.Ha)(l,c),n._OrtCreateSessionOptions=(l,c,y,w,k,j,ye,De,je,et)=>(n._OrtCreateSessionOptions=ut.Ia)(l,c,y,w,k,j,ye,De,je,et),n._OrtAppendExecutionProvider=(l,c,y,w,k)=>(n._OrtAppendExecutionProvider=ut.Ja)(l,c,y,w,k),n._OrtAddFreeDimensionOverride=(l,c,y)=>(n._OrtAddFreeDimensionOverride=ut.Ka)(l,c,y),n._OrtAddSessionConfigEntry=(l,c,y)=>(n._OrtAddSessionConfigEntry=ut.La)(l,c,y),n._OrtReleaseSessionOptions=l=>(n._OrtReleaseSessionOptions=ut.Ma)(l),n._OrtCreateSession=(l,c,y)=>(n._OrtCreateSession=ut.Na)(l,c,y),n._OrtReleaseSession=l=>(n._OrtReleaseSession=ut.Oa)(l),n._OrtGetInputOutputCount=(l,c,y)=>(n._OrtGetInputOutputCount=ut.Pa)(l,c,y),n._OrtGetInputOutputMetadata=(l,c,y,w)=>(n._OrtGetInputOutputMetadata=ut.Qa)(l,c,y,w),n._OrtFree=l=>(n._OrtFree=ut.Ra)(l),n._OrtCreateTensor=(l,c,y,w,k,j)=>(n._OrtCreateTensor=ut.Sa)(l,c,y,w,k,j),n._OrtGetTensorData=(l,c,y,w,k)=>(n._OrtGetTensorData=ut.Ta)(l,c,y,w,k),n._OrtReleaseTensor=l=>(n._OrtReleaseTensor=ut.Ua)(l),n._OrtCreateRunOptions=(l,c,y,w)=>(n._OrtCreateRunOptions=ut.Va)(l,c,y,w),n._OrtAddRunConfigEntry=(l,c,y)=>(n._OrtAddRunConfigEntry=ut.Wa)(l,c,y),n._OrtReleaseRunOptions=l=>(n._OrtReleaseRunOptions=ut.Xa)(l),n._OrtCreateBinding=l=>(n._OrtCreateBinding=ut.Ya)(l),n._OrtBindInput=(l,c,y)=>(n._OrtBindInput=ut.Za)(l,c,y),n._OrtBindOutput=(l,c,y,w)=>(n._OrtBindOutput=ut._a)(l,c,y,w),n._OrtClearBoundOutputs=l=>(n._OrtClearBoundOutputs=ut.$a)(l),n._OrtReleaseBinding=l=>(n._OrtReleaseBinding=ut.ab)(l),n._OrtRunWithBinding=(l,c,y,w,k)=>(n._OrtRunWithBinding=ut.bb)(l,c,y,w,k),n._OrtRun=(l,c,y,w,k,j,ye,De)=>(n._OrtRun=ut.cb)(l,c,y,w,k,j,ye,De),n._OrtEndProfiling=l=>(n._OrtEndProfiling=ut.db)(l),n._JsepOutput=(l,c,y)=>(n._JsepOutput=ut.eb)(l,c,y),n._JsepGetNodeName=l=>(n._JsepGetNodeName=ut.fb)(l);var rn=()=>(rn=ut.gb)(),vr=n._free=l=>(vr=n._free=ut.hb)(l),za=n._malloc=l=>(za=n._malloc=ut.ib)(l),an=(l,c,y,w,k,j)=>(an=ut.lb)(l,c,y,w,k,j),Ba=()=>(Ba=ut.mb)(),yo=(l,c,y,w,k)=>(yo=ut.nb)(l,c,y,w,k),vo=l=>(vo=ut.ob)(l),Wi=l=>(Wi=ut.pb)(l),Un=(l,c)=>(Un=ut.qb)(l,c),_o=()=>(_o=ut.rb)(),bo=(l,c)=>(bo=ut.sb)(l,c),Vn=l=>(Vn=ut.tb)(l),nn=l=>(nn=ut.ub)(l),qi=()=>(qi=ut.vb)(),Wn=n.dynCall_ii=(l,c)=>(Wn=n.dynCall_ii=ut.wb)(l,c),Hi=l=>(Hi=ut.xb)(l),ji=()=>(ji=ut.yb)(),qn=l=>(qn=ut.zb)(l),wo=()=>(wo=ut.Ab)();return n.stackSave=()=>qi(),n.stackRestore=l=>Vn(l),n.stackAlloc=l=>nn(l),n.setValue=function(l,c,y="i8"){switch(y.endsWith("*")&&(y="*"),y){case"i1":case"i8":He()[l>>>0]=c;break;case"i16":me()[l>>>1>>>0]=c;break;case"i32":de()[l>>>2>>>0]=c;break;case"i64":R[l>>>3]=BigInt(c);break;case"float":Dt()[l>>>2>>>0]=c;break;case"double":Ut()[l>>>3>>>0]=c;break;case"*":We()[l>>>2>>>0]=c;break;default:Gr(`invalid type for setValue: ${y}`)}},n.getValue=function(l,c="i8"){switch(c.endsWith("*")&&(c="*"),c){case"i1":case"i8":return He()[l>>>0];case"i16":return me()[l>>>1>>>0];case"i32":return de()[l>>>2>>>0];case"i64":return R[l>>>3];case"float":return Dt()[l>>>2>>>0];case"double":return Ut()[l>>>3>>>0];case"*":return We()[l>>>2>>>0];default:Gr(`invalid type for getValue: ${c}`)}},n.UTF8ToString=Xt,n.stringToUTF8=Ta,n.lengthBytesUTF8=Ds,function l(){if(0<hr)Ea=l;else if(u)t(n),Jt();else{for(;0<I.length;)I.shift()(n);0<hr?Ea=l:(n.calledRun=!0,$e||(Jt(),t(n)))}}(),n.PTR_SIZE=4,i}),ay=Dl,tp=globalThis.self?.name?.startsWith("em-pthread"),tp&&Dl()}),Pl,zd,rp,Cr,ny,Wo,ap,np,Gl,ip,Fl,iy,Ul,sy,tf=Fe(()=>{ef(),Pl=typeof location>"u"?void 0:location.origin,zd=import.meta.url>"file:"&&import.meta.url<"file;",rp=()=>{{if(zd){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Pl).href}return import.meta.url}},Cr=rp(),ny=()=>{if(Cr&&!Cr.startsWith("blob:"))return Cr.substring(0,Cr.lastIndexOf("/")+1)},Wo=(e,t)=>{try{let r=t??Cr;return(r?new URL(e,r):new URL(e)).origin===Pl}catch{return!1}},ap=(e,t)=>{let r=t??Cr;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},np=(e,t)=>`${t??"./"}${e}`,Gl=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},ip=async e=>(await import(e)).default,Fl=(Yw(),Ts(ey)).default,iy=async()=>{if(!Cr)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Wo(Cr))return[void 0,Fl()];let e=await Gl(Cr);return[e,Fl(e)]},Ul=(Qw(),Ts(ry)).default,sy=async(e,t,r)=>{if(!e&&!t&&Ul&&Cr&&Wo(Cr))return[void 0,Ul];{let n="ort-wasm-simd-threaded.jsep.mjs",i=e??ap(n,t),s=r&&i&&!Wo(i,t),o=s?await Gl(i):i??np(n,t);return[s?o:void 0,await ip(o)]}}}),Vl,qo,ls,Wl,sp,op,up,rf,Gt,Tn=Fe(()=>{tf(),qo=!1,ls=!1,Wl=!1,sp=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},op=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},up=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},rf=async e=>{if(qo)return Promise.resolve();if(ls)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Wl)throw new Error("previous call to 'initializeWebAssembly()' failed.");ls=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!up())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!op())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let n=sp();r>1&&!n&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let i=e.wasmPaths,s=typeof i=="string"?i:void 0,o=i?.mjs,u=o?.href??o,d=i?.wasm,f=d?.href??d,h=e.wasmBinary,[m,g]=await sy(u,s,r>1),v=!1,_=[];if(t>0&&_.push(new Promise($=>{setTimeout(()=>{v=!0,$()},t)})),_.push(new Promise(($,L)=>{let T={numThreads:r};if(h)T.wasmBinary=h;else if(f||s)T.locateFile=b=>f??s+b;else if(u&&u.indexOf("blob:")!==0)T.locateFile=b=>new URL(b,u).href;else if(m){let b=ny();b&&(T.locateFile=N=>b+N)}g(T).then(b=>{ls=!1,qo=!0,Vl=b,$(),m&&URL.revokeObjectURL(m)},b=>{ls=!1,Wl=!0,L(b)})})),await Promise.race(_),v)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},Gt=()=>{if(qo&&Vl)return Vl;throw new Error("WebAssembly is not initialized yet.")}}),Yr,lu,Nt,af=Fe(()=>{Tn(),Yr=(e,t)=>{let r=Gt(),n=r.lengthBytesUTF8(e)+1,i=r._malloc(n);return r.stringToUTF8(e,i,n),t.push(i),i},lu=(e,t,r,n)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([i,s])=>{let o=t?t+i:i;if(typeof s=="object")lu(s,o+".",r,n);else if(typeof s=="string"||typeof s=="number")n(o,s.toString());else if(typeof s=="boolean")n(o,s?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof s}`)})},Nt=e=>{let t=Gt(),r=t.stackSave();try{let n=t.PTR_SIZE,i=t.stackAlloc(2*n);t._OrtGetLastError(i,i+n);let s=Number(t.getValue(i,n===4?"i32":"i64")),o=t.getValue(i+n,"*"),u=o?t.UTF8ToString(o):"";throw new Error(`${e} ERROR_CODE: ${s}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),oy,Zw=Fe(()=>{Tn(),af(),oy=e=>{let t=Gt(),r=0,n=[],i=e||{};try{if(e?.logSeverityLevel===void 0)i.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)i.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(i.terminate=!1);let s=0;return e?.tag!==void 0&&(s=Yr(e.tag,n)),r=t._OrtCreateRunOptions(i.logSeverityLevel,i.logVerbosityLevel,!!i.terminate,s),r===0&&Nt("Can't create run options."),e?.extra!==void 0&&lu(e.extra,"",new WeakSet,(o,u)=>{let d=Yr(o,n),f=Yr(u,n);t._OrtAddRunConfigEntry(r,d,f)!==0&&Nt(`Can't set a run config entry: ${o} - ${u}.`)}),[r,n]}catch(s){throw r!==0&&t._OrtReleaseRunOptions(r),n.forEach(o=>t._free(o)),s}}}),lp,dp,fp,ds,cp,uy,Jw=Fe(()=>{Tn(),af(),lp=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},dp=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},fp=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},ds=(e,t,r,n)=>{let i=Yr(t,n),s=Yr(r,n);Gt()._OrtAddSessionConfigEntry(e,i,s)!==0&&Nt(`Can't set a session config entry: ${t} - ${r}.`)},cp=async(e,t,r)=>{for(let n of t){let i=typeof n=="string"?n:n.name,s=[];switch(i){case"webnn":if(i="WEBNN",typeof n!="string"){let h=n?.deviceType;h&&ds(e,"deviceType",h,r)}break;case"webgpu":if(i="JS",typeof n!="string"){let h=n;if(h?.preferredLayout){if(h.preferredLayout!=="NCHW"&&h.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${h.preferredLayout}`);ds(e,"preferredLayout",h.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${i}`)}let o=Yr(i,r),u=s.length,d=0,f=0;if(u>0){d=Gt()._malloc(u*Gt().PTR_SIZE),r.push(d),f=Gt()._malloc(u*Gt().PTR_SIZE),r.push(f);for(let h=0;h<u;h++)Gt().setValue(d+h*Gt().PTR_SIZE,s[h][0],"*"),Gt().setValue(f+h*Gt().PTR_SIZE,s[h][1],"*")}await Gt()._OrtAppendExecutionProvider(e,o,d,f,u)!==0&&Nt(`Can't append execution provider: ${i}.`)}},uy=async e=>{let t=Gt(),r=0,n=[],i=e||{};fp(i);try{let s=lp(i.graphOptimizationLevel??"all"),o=dp(i.executionMode??"sequential"),u=typeof i.logId=="string"?Yr(i.logId,n):0,d=i.logSeverityLevel??2;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log serverity level is not valid: ${d}`);let f=i.logVerbosityLevel??0;if(!Number.isInteger(f)||f<0||f>4)throw new Error(`log verbosity level is not valid: ${f}`);let h=typeof i.optimizedModelFilePath=="string"?Yr(i.optimizedModelFilePath,n):0;if(r=t._OrtCreateSessionOptions(s,!!i.enableCpuMemArena,!!i.enableMemPattern,o,!!i.enableProfiling,0,u,d,f,h),r===0&&Nt("Can't create session options."),i.executionProviders&&await cp(r,i.executionProviders,n),i.enableGraphCapture!==void 0){if(typeof i.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${i.enableGraphCapture}`);ds(r,"enableGraphCapture",i.enableGraphCapture.toString(),n)}if(i.freeDimensionOverrides)for(let[m,g]of Object.entries(i.freeDimensionOverrides)){if(typeof m!="string")throw new Error(`free dimension override name must be a string: ${m}`);if(typeof g!="number"||!Number.isInteger(g)||g<0)throw new Error(`free dimension override value must be a non-negative integer: ${g}`);let v=Yr(m,n);t._OrtAddFreeDimensionOverride(r,v,g)!==0&&Nt(`Can't set a free dimension override: ${m} - ${g}.`)}return i.extra!==void 0&&lu(i.extra,"",new WeakSet,(m,g)=>{ds(r,m,g,n)}),[r,n]}catch(s){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&Nt("Can't release session options."),n.forEach(o=>t._free(o)),s}}}),bn,xa,wn,vu,du,nf,sf,Bd,ct=Fe(()=>{bn=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},xa=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},wn=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],n=typeof t=="number"?t:t.reduce((i,s)=>i*s,1);return r>0?Math.ceil(n*r):void 0},vu=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},du=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},nf=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",sf=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Bd=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),of,ly=Fe(()=>{ef(),of=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),n=r?parseInt(r,10):0;if(n<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let i=t.body.getReader(),s;try{s=new ArrayBuffer(n)}catch(u){if(u instanceof RangeError){let d=Math.ceil(n/65536);s=new WebAssembly.Memory({initial:d,maximum:d}).buffer}else throw u}let o=0;for(;;){let{done:u,value:d}=await i.read();if(u)break;let f=d.byteLength;new Uint8Array(s,o,f).set(d),o+=f}return new Uint8Array(s,0,n)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),pp,hp,mp,gp,uf,yp,Ot,$a=Fe(()=>{ct(),pp=["V","I","W","E","F"],hp=(e,t)=>{console.log(`[${pp[e]},${new Date().toISOString()}]${t}`)},uf=(e,t)=>{mp=e,gp=t},yp=(e,t)=>{let r=du(e),n=du(mp);r>=n&&hp(r,typeof t=="function"?t():t)},Ot=(...e)=>{gp&&yp(...e)}}),vp,ui,fe,fu,dy,fy,cy,_t=Fe(()=>{vp=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},ui=class{static calcShape(e,t,r=!1){let n=e.length,i=t.length;if(n===0)return t;if(i===0)return e;let s=Math.max(e.length,t.length),o=new Array(s);if(r){if(n<2||i<2)return;let u=vp.calcMatMulShape([e[n-2],e[n-1]],[t[i-2],t[i-1]]);if(u===void 0)return;[o[s-2],o[s-1]]=u}for(let u=r?3:1;u<=s;u++){let d=n-u<0?1:e[n-u],f=i-u<0?1:t[i-u];if(d!==f&&d>1&&f>1)return;let h=Math.max(d,f);if(d&&f)o[s-u]=Math.max(d,f);else{if(h>1)return;o[s-u]=0}}return o}static isValidBroadcast(e,t){let r=e.length,n=t.length;if(r>n)return!1;for(let i=1;i<=r;i++)if(e[r-i]!==1&&e[r-i]!==t[n-i])return!1;return!0}},fe=class iu{static size(t){return iu.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let n=t.length;if(n===0)return[];let i=new Array(n),s=n-1;for(;s>=0;){if(t[s]%r===0){i[s]=t[s]/r;break}if(r%t[s]!==0)throw new Error("cannot convert shape");i[s]=1,r/=t[s],s--}for(s--;s>=0;s--)i[s]=t[s];return i}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return iu.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return iu.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,n){let i=1;for(let s=r;s<n;s++){if(t[s]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");i*=Number(t[s])}return i}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let n=new Array(r);n[r-1]=1,n[r-2]=t[r-1];for(let i=r-3;i>=0;--i)n[i]=n[i+1]*t[i+1];return n}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(n=>this.normalizeAxis(n,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(n=>t[n]):t.slice().reverse()}static padShape(t,r){let n=t.length;return t.map((i,s)=>i+r[s]+r[s+n])}static areEqual(t,r){return t.length!==r.length?!1:t.every((n,i)=>n===r[i])}},fu=class bs{static adjustPoolAttributes(t,r,n,i,s,o){if(!t&&n.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=n.length?n.push(r[u+2]):n[u]=r[u+2];for(let u=0;u<n.length;u++)if(u<i.length){if(i[u]<0)throw new Error("strides should be greater than or equal to 1")}else i.push(1);for(let u=0;u<n.length;u++)if(u<s.length){if(s[u]<0)throw new Error("dilations should be greater than or equal to 1")}else s.push(1);for(let u=0;u<n.length*2;u++)if(u<o.length){if(o[u]<0)throw new Error("pad should be greater than or equal to 1")}else o.push(0);for(let u=0;u<n.length;u++){if(n[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(o[u]>=n[u]||o[u+n.length]>=n[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,n,i,s,o,u){if(u){if(s.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(i.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let d=0;d<t.length-2;d++)bs.adjustPadAndReturnShape(t[d+(o?1:2)],r[d],n[d],i[d],s,d,d+t.length-2,u)}}static computePoolOutputShape(t,r,n,i,s,o,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let d=[r[0],r[1]];return bs.computeShapeHelper(t,r,d,n,i,s,o,u),d}static computeConvOutputShape(t,r,n,i,s,o,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let d=[t[0],r[0]];return bs.computeShapeHelper(!1,t,d,n,i,s,o,u),d}static computeShapeHelper(t,r,n,i,s,o,u,d){if(t)for(let f=0;f<r.length-2;f++)n.push(1);else for(let f=0;f<r.length-2;f++)n.push(bs.adjustPadAndReturnShape(r[f+2],i[f],s[f],o[f],u,f,f+r.length-2,d))}static adjustPadAndReturnShape(t,r,n,i,s,o,u,d){let f=n*(i-1)+1;if(d&&d!=="NOTSET")switch(d){case"VALID":return s[o]=0,s[u]=0,Math.floor((t-f)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(n!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let h=((t+r-1)/r-1)*r+i-t;return s[o]=Math.floor(d==="SAME_LOWER"?(h+1)/2:h/2),s[u]=h-s[o],Math.floor((t+h-i)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+s[o]+s[u]-f)/r+1)}},dy=class{static getShapeOfGemmResult(e,t,r,n,i){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let s,o,u;t?(s=e[1],o=e[0]):(s=e[0],o=e[1]);let d=-1;if(n?(u=r[0],d=1):(u=r[1],d=0),r[d]!==o)throw new Error("dimension mismatch");if(s<=0||u<=0||o<=0)throw new Error("invalid shape specified");if(i&&!ui.isValidBroadcast(i,[s,u]))throw new Error("gemm: invalid bias shape for broadcast");return[s,u,o]}},fy=-34028234663852886e22,cy=34028234663852886e22}),lf,py=Fe(()=>{ct(),lf=(e,t)=>new(vu(t))(e)}),ql,Ld,Hl,_p,jl,bp,Kl,Xl,Yl,wp,hy,e1=Fe(()=>{ct(),$a(),ql=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),Ld=(e,t)=>{if(t==="int32")return e;let r=ql.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let n=r/8;if(e.byteLength%n!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${n}.`);let i=e.byteLength/n,s=new(vu(t))(e.buffer,e.byteOffset,i);switch(t){case"int64":case"uint64":{let o=new Int32Array(i);for(let u=0;u<i;u++){let d=s[u];if(d>2147483647n||d<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");o[u]=Number(d)}return new Uint8Array(o.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&s.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let o=Int32Array.from(s,Number);return new Uint8Array(o.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Hl=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,n=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let i=BigInt64Array.from(n,BigInt);return new Uint8Array(i.buffer)}case"uint64":{if(n.some(s=>s<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let i=BigUint64Array.from(n,BigInt);return new Uint8Array(i.buffer)}case"int8":{if(n.some(s=>s<-128||s>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let i=Int8Array.from(n,Number);return new Uint8Array(i.buffer)}case"uint8":{if(n.some(i=>i<0||i>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(n,Number)}case"uint32":{if(n.some(s=>s<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let i=Uint32Array.from(n,Number);return new Uint8Array(i.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},_p=1,jl=()=>_p++,bp=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Kl=(e,t)=>{let r=ql.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((n,i)=>n*i)*r/8):0},Xl=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:n,dataType:i,shape:s,fallbackDataType:o}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=n,this.dataType=i,this.tensorShape=s,this.fallbackDataType=o}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Kl(this.dataType,this.tensorShape)}destroy(){Ot("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=Hl(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((n,i)=>n===r[i])}setIsDataConverted(e){this.isDataConverted=e}},Yl=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,n){let i=this.tensorManager.getMLContext(e),s;if(!i.opSupportLimits().input.dataTypes.includes(t)){if(s=bp.get(t),!s||!i.opSupportLimits().input.dataTypes.includes(s))throw new Error(`WebNN backend does not support data type: ${t}`);Ot("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${s}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(i,t,r))return this.wrapper.tensor;if(n){if(this.wrapper.byteLength!==Kl(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let o=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,o,!0,!0,s),n&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=Ld(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else Ot("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Hl(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},wp=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=jl();return this.tensorTrackersById.set(e,new Yl(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,n,i){Ot("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${n}, copyOld: ${i}}`);let s=this.tensorTrackersById.get(t);if(!s)throw new Error("Tensor not found.");return s.ensureTensor(e,r,n,i)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){Ot("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,n){let i=this.getMLContext(e),s=jl(),o=new Xl({sessionId:e,context:i,tensor:t,dataType:r,shape:n});return this.tensorTrackersById.set(s,new Yl(this,o)),this.externalTensors.add(o),s}async getCachedTensor(e,t,r,n,i,s,o){let u=this.getMLContext(e);for(let[f,h]of this.freeTensors.entries())if(h.canReuseTensor(u,t,r)){Ot("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:""} shape: ${r}`);let m=this.freeTensors.splice(f,1)[0];return m.sessionId=e,m}Ot("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${o?`fallbackDataType: ${o},`:""} shape: ${r}}`);let d=await u.createTensor({dataType:o??t,shape:r,dimensions:r,usage:n,writable:i,readable:s});return new Xl({sessionId:e,context:u,tensor:d,dataType:t,shape:r,fallbackDataType:o})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},hy=(...e)=>new wp(...e)}),fs,xp,my,t1=Fe(()=>{ct(),Tn(),py(),e1(),$a(),fs=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),xp=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),n=Object.keys(t).sort();return r.length===n.length&&r.every((i,s)=>i===n[s]&&e[i]===t[i])},my=class{constructor(e){this.tensorManager=hy(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,uf(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){Ot("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){Ot("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)Ot("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(n=>n.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:n}),n}}else if(e===void 0){let r=this.mlContextCache.findIndex(n=>n.options===void 0&&n.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let n=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:n}),n}}let t=this.mlContextCache.findIndex(r=>xp(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let n=this.mlContextCache.findIndex(i=>i.mlContext===t);n!==-1&&this.mlContextCache.splice(n,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){Ot("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,n,i){let s=fs.get(r);if(!s)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,s,n,i)}async createTemporaryTensor(e,t,r){Ot("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let n=fs.get(t);if(!n)throw new Error(`Unsupported ONNX data type: ${t}`);let i=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,i,n,r,!1);let s=this.temporarySessionTensorIds.get(e);return s?s.push(i):this.temporarySessionTensorIds.set(e,[i]),i}uploadTensor(e,t){if(!Gt().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");Ot("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return lf(r,t)}}registerMLTensor(e,t,r,n){let i=fs.get(r);if(!i)throw new Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.registerTensor(e,t,i,n);return Ot("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${i}, dimensions: ${n}} -> {tensorId: ${s}}`),s}registerMLConstant(e,t,r,n,i,s,o=!1){if(!s)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let d=s.get(u);if(!d)throw new Error(`File with name ${u} not found in preloaded files.`);if(t+r>d.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let f=d.slice(t,t+r).buffer,h;switch(i.dataType){case"float32":h=new Float32Array(f);break;case"float16":h=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(f):new Uint16Array(f);break;case"int32":h=new Int32Array(f);break;case"uint32":h=new Uint32Array(f);break;case"int64":if(o){let m=Ld(new Uint8Array(f),"int64");h=new Int32Array(m.buffer),i.dataType="int32"}else h=new BigInt64Array(f);break;case"uint64":h=new BigUint64Array(f);break;case"int8":h=new Int8Array(f);break;case"int4":case"uint4":case"uint8":h=new Uint8Array(f);break;default:throw new Error(`Unsupported data type: ${i.dataType} in creating WebNN Constant from external data.`)}return Ot("verbose",()=>`[WebNN] registerMLConstant {dataType: ${i.dataType}, shape: ${i.shape}}} ${o?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),n.constant(i,h)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let n=this.mlContextBySessionId.get(e),i=fs.get(bn(t));return typeof i>"u"?!1:r?!!n?.opSupportLimits().input.dataTypes.includes(i):!!n?.opSupportLimits().output.dataTypes.includes(i)}flush(){}}}),df=Fe(()=>{}),Ql,Ho,jo,$p,Ep,Zl,Md,Sp,gy,r1=Fe(()=>{$a(),df(),Ql=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Ho=[],jo=e=>Math.ceil(Number(e)/16)*16,$p=e=>{for(let t=0;t<Ho.length;t++){let r=Ho[t];if(e<=r)return r}return Math.ceil(e/16)*16},Ep=1,Zl=()=>Ep++,Md=async(e,t,r,n)=>{let i=jo(r),s=e.device.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=e.getCommandEncoder();e.endComputePass(),o.copyBufferToBuffer(t,0,s,0,i),e.flush(),await s.mapAsync(GPUMapMode.READ);let u=s.getMappedRange();if(n){let d=n();return d.set(new Uint8Array(u,0,r)),d}else return new Uint8Array(u.slice(0,r))}finally{s.destroy()}},Sp=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Ql)Ho.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,n=t.byteOffset,i=t.byteLength,s=jo(i),o=this.storageCache.get(e);if(!o)throw new Error("gpu data for uploading does not exist");if(Number(o.originalSize)!==i)throw new Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${i}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:s,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),d=u.getMappedRange();new Uint8Array(d).set(new Uint8Array(r,n,i)),u.unmap();let f=this.backend.device.createCommandEncoder();f.copyBufferToBuffer(u,0,o.gpuData.buffer,0,s),this.backend.device.queue.submit([f.finish()]),u.destroy(),Ot("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let n=this.storageCache.get(t);if(!n)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==n.originalSize)throw new Error("inconsistent source and destination gpu data size");let i=jo(r.originalSize),s=this.backend.getCommandEncoder();this.backend.endComputePass(),s.copyBufferToBuffer(r.gpuData.buffer,0,n.gpuData.buffer,0,i)}registerExternalBuffer(e,t,r){let n;if(r){if(n=r[0],e===r[1])return Ot("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, buffer is the same, skip.`),n;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else n=Zl();return this.storageCache.set(n,{gpuData:{id:n,type:0,buffer:e},originalSize:t}),Ot("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${n}, registered.`),n}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),Ot("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=$p(e),n,i=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,s=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(i||s){let u=(i?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?n=u.pop():n=this.backend.device.createBuffer({size:r,usage:t}):n=this.backend.device.createBuffer({size:r,usage:t})}else n=this.backend.device.createBuffer({size:r,usage:t});let o={id:Zl(),type:0,buffer:n};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(e)}),Ot("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${o.id}`),o}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return Ot("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await Md(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Ql.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(Ot("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},gy=(...e)=>new Sp(...e)}),Tp,Lt,Zt=Fe(()=>{Tp=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},Lt=e=>new Tp(e)}),li,Ko,lr,wr,st,Kt,Nd,ii,Va,at,cs,be,rt,yy,ff,kp,vy,xt=Fe(()=>{ct(),_t(),li=64,Ko=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},lr=(e,t=1)=>{let r=Ko(e,t);return typeof r=="string"?r:r[0]},wr=(e,t=1)=>{let r=Ko(e,t);return typeof r=="string"?r:r[1]},st=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:fe.computeStrides(r)})}),t},Kt=e=>e%4===0?4:e%2===0?2:1,Nd=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,ii=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,Va=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,at=(e,t,r,n)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?n==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:n==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,cs=(e,t,r,n,i)=>{let s=typeof r=="number",o=s?r:r.length,u=[...new Array(o).keys()],d=o<2?"u32":o<=4?`vec${o}<u32>`:`array<u32, ${o}>`,f=Ko(t,i),h=typeof f=="string"?f:f[1],m=typeof f=="string"?f:f[0],g={indices:d,value:h,storage:m,tensor:t},v=ie=>typeof ie=="string"?ie:`${ie}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},$=s?"uniforms.":"",L=`${$}${e}_shape`,T=`${$}${e}_strides`,b="";for(let ie=0;ie<o-1;ie++)b+=`
    let dim${ie} = current / ${at(T,ie,o)};
    let rest${ie} = current % ${at(T,ie,o)};
    indices[${ie}] = dim${ie};
    current = rest${ie};
    `;b+=`indices[${o-1}] = current;`;let N=o<2?"":`
  fn o2i_${e}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${b}
    return indices;
  }`,B=ie=>(_.offsetToIndices=!0,o<2?ie:`o2i_${e}(${ie})`),W=[];if(o>=2)for(let ie=o-1;ie>=0;ie--)W.push(`${at(T,ie,o)} * (indices[${ie}])`);let ae=o<2?"":`
  fn i2o_${e}(indices: ${g.indices}) -> u32 {
    return ${W.join("+")};
  }`,Q=ie=>(_.indicesToOffset=!0,o<2?ie:`i2o_${e}(${ie})`),ge=(...ie)=>o===0?"0u":`${g.indices}(${ie.map(v).join(",")})`,ze=(ie,me)=>o<2?`${ie}`:`${at(ie,me,o)}`,Xe=(ie,me,Ve)=>o<2?`${ie}=${Ve};`:`${at(ie,me,o)}=${Ve};`,nt={},Je=(ie,me)=>{_.broadcastedIndicesToOffset=!0;let Ve=`${me.name}broadcastedIndicesTo${e}Offset`;if(Ve in nt)return`${Ve}(${ie})`;let de=[];for(let We=o-1;We>=0;We--){let Dt=me.indicesGet("outputIndices",We+me.rank-o);de.push(`${ze(T,We)} * (${Dt} % ${ze(L,We)})`)}return nt[Ve]=`fn ${Ve}(outputIndices: ${me.type.indices}) -> u32 {
             return ${de.length>0?de.join("+"):"0u"};
           }`,`${Ve}(${ie})`},F=(ie,me)=>(()=>{if(g.storage===g.value)return`${e}[${ie}]=${me};`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`${e}[${ie}]=vec2<u32>(u32(${me}), select(0u, 0xFFFFFFFFu, ${me} < 0));`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`${e}[${ie}]=vec2<u32>(u32(${me}), 0u);`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`${e}[${ie}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${me}));`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),R=ie=>(()=>{if(g.storage===g.value)return`${e}[${ie}]`;if(g.storage==="vec2<u32>"&&g.value==="i32")return`i32(${e}[${ie}].x)`;if(g.storage==="vec2<u32>"&&g.value==="u32")return`u32(${e}[${ie}].x)`;if(g.storage==="u32"&&g.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${ie}] & 0xFFu), bool(${e}[${ie}] & 0xFF00u), bool(${e}[${ie}] & 0xFF0000u), bool(${e}[${ie}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),te=o<2?"":`
  fn get_${e}ByIndices(indices: ${g.indices}) -> ${h} {
    return ${R(`i2o_${e}(indices)`)};
  }`,U=o<2?"":(()=>{let ie=u.map(Ve=>`d${Ve}: u32`).join(", "),me=u.map(Ve=>`d${Ve}`).join(", ");return`
  fn get_${e}(${ie}) -> ${h} {
    return get_${e}ByIndices(${ge(me)});
  }`})(),J=(...ie)=>{if(ie.length!==o)throw new Error(`indices length must be ${o}`);let me=ie.map(v).join(",");return o===0?R("0u"):o===1?R(me[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}(${me})`)},$e=ie=>o<2?R(ie):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${e}ByIndices(${ie})`),Oe=o<2?"":`
  fn set_${e}ByIndices(indices: ${g.indices}, value: ${h}) {
    ${F(`i2o_${e}(indices)`,"value")}
  }`,He=o<2?"":(()=>{let ie=u.map(Ve=>`d${Ve}: u32`).join(", "),me=u.map(Ve=>`d${Ve}`).join(", ");return`
  fn set_${e}(${ie}, value: ${h}) {
    set_${e}ByIndices(${ge(me)}, value);
  }`})();return{impl:()=>{let ie=[],me=!1;return _.offsetToIndices&&(ie.push(N),me=!0),_.indicesToOffset&&(ie.push(ae),me=!0),_.broadcastedIndicesToOffset&&(Object.values(nt).forEach(Ve=>ie.push(Ve)),me=!0),_.set&&(ie.push(He),me=!0),_.setByIndices&&(ie.push(Oe),me=!0),_.get&&(ie.push(U),me=!0),_.getByIndices&&(ie.push(te),me=!0),!s&&me&&ie.unshift(`const ${L} = ${g.indices}(${r.join(",")});`,`const ${T} = ${g.indices}(${fe.computeStrides(r).join(",")});`),ie.join(`
`)},type:g,offsetToIndices:B,indicesToOffset:Q,broadcastedIndicesToOffset:Je,indices:ge,indicesGet:ze,indicesSet:Xe,set:(...ie)=>{if(ie.length!==o+1)throw new Error(`indices length must be ${o}`);let me=ie[o];if(typeof me!="string")throw new Error("value must be string");let Ve=ie.slice(0,o).map(v).join(",");return o===0?F("0u",me):o===1?F(Ve[0],me):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}(${Ve}, ${me})`)},setByOffset:F,setByIndices:(ie,me)=>o<2?F(ie,me):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${e}ByIndices(${ie}, ${me});`),get:J,getByOffset:R,getByIndices:$e,usage:n,name:e,strides:T,shape:L,rank:o}},be=(e,t,r,n=1)=>cs(e,t,r,"input",n),rt=(e,t,r,n=1)=>cs(e,t,r,"output",n),yy=(e,t,r)=>cs(e,t,r,"atomicOutput",1),ff=(e,t,r,n=1)=>cs(e,t,r,"internal",n),kp=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=li){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],n=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||n>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*n>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${n}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let i=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,s=i?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,o=i?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*n}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${n})
  fn main(${s}) {
    ${o}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",n=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${n}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:n}of this.uniforms)if(n&&n>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(n/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(n/4)}>`);else{let i=n==null||n===1?r:`vec${n}<${r}>`;e.push(`${t}:${i}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},vy=(e,t)=>new kp(e,t)}),Ap,Jl,Ip,Cp,Op,Rp,Rr,_y,by,Wa=Fe(()=>{ct(),_t(),Zt(),xt(),Ap=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Jl=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Ip=(e,t)=>fe.sortBasedOnPerm(e,Jl(e.length,t)),Cp=(e,t,r,n)=>{let i=`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let s=0;s<t;++s)i+=`a[${e[s]}]=i[${s}];`;return i+="return a;}"},Op=(e,t)=>{let r=[],n=[];for(let i=0;i<e.length;++i)e[i]!==1&&r.push(e[i]),e[t[i]]!==1&&n.push(t[i]);return{newShape:r,newPerm:n}},Rp=(e,t)=>{let r=0;for(let n=0;n<e.length;++n)if(t[e[n]]!==1){if(e[n]<r)return!1;r=e[n]}return!0},Rr=(e,t)=>{let r=e.dataType,n=e.dims.length,i=Jl(n,t),s=Ip(e.dims,i),o=e.dims,u=s,d=n<2||Rp(i,e.dims),f;if(d)return f=_=>{let $=be("input",r,o,4),L=rt("output",r,u,4);return`
  ${_.registerUniform("output_size","u32").declareVariables($,L)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=fe.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64/4)},programUniforms:[{type:12,data:Math.ceil(_/4)}]}},getShaderSource:f};let{newShape:h,newPerm:m}=Op(e.dims,i),g=fe.areEqual(m,[2,3,1]),v=fe.areEqual(m,[3,1,2]);if(h.length===2||g||v){o=g?[h[0],h[1]*h[2]]:v?[h[0]*h[1],h[2]]:h,u=[o[1],o[0]];let _=16;return f=$=>{let L=be("a",r,o.length),T=rt("output",r,u.length);return`
  ${$.registerUniform("output_size","u32").declareVariables(L,T)}
  var<workgroup> tile : array<array<${T.type.value}, ${_+1}>, ${_}>;
  ${$.mainStart([_,_,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${_} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${_}u + local_id.x;
    let input_row = workgroup_id_x * ${_}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${L.getByIndices(`${L.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${_}u + local_id.x;
    let output_row = workgroup_id_y * ${_}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${T.setByIndices(`${T.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let $=fe.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/_),y:Math.ceil(u[0]/_)},programUniforms:[{type:12,data:$},...st(o,u)]}},getShaderSource:f}}return f=_=>{let $=be("a",r,o.length),L=rt("output",r,u.length);return`
  ${_.registerUniform("output_size","u32").declareVariables($,L)}

  ${Cp(i,n,$,L)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${L.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${L.setByOffset("global_idx",$.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let _=fe.size(s);return{outputs:[{dims:s,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...st(o,u)]}},getShaderSource:f}},_y=(e,t)=>{Ap(e.inputs,t.perm),e.compute(Rr(e.inputs[0],t.perm))},by=e=>Lt({perm:e.perm})}),zp,Bp,Lp,Mp,Np,Dp,Pp,Gp,Fp,Up,qr,wy,xy,$y,Ey,Sy,Ty,ky,Ay,Iy,Cy,a1=Fe(()=>{ct(),_t(),xt(),cf(),Wa(),zp={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Bp={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Lp={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Mp={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Np=(e,t)=>{let r=[];for(let n=t-e;n<t;++n)r.push(n);return r},Dp=(e,t)=>{let r=[],n=e.length;for(let s=0;s<n;s++)t.indexOf(s)===-1&&r.push(e[s]);let i=t.map(s=>e[s]);return[r,i]},Pp=(e,t)=>{let r=e.length+t.length,n=[],i=0;for(let s=0;s<r;s++)t.indexOf(s)===-1?n.push(e[i++]):n.push(1);return n},Gp=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},Fp=(e,t)=>{let r=[];if(!Gp(e,t)){for(let n=0;n<t;++n)e.indexOf(n)===-1&&r.push(n);e.forEach(n=>r.push(n))}return r},Up=(e,t,r,n,i,s,o)=>{let u=r[0].dims,d=fe.size(s),f=fe.size(o),h=be("_A",r[0].dataType,u),m=rt("output",i,s),g=64;d===1&&(g=256);let v=`
          var<workgroup> aBestValues : array<f32, ${g}>;
       `,_=$=>`
        ${$.registerUniform("reduceSize","u32").declareVariables(h,m)}
        ${v}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${$.mainStart(g)}

          let outputIndex = global_idx / ${g};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Lp[n]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${g}) {
           let candidate = f32(${h.getByOffset("offset + k")});
           bestValue = ${zp[n]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${g}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Bp[n]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${m.setByOffset("outputIndex",`${n==="mean"?`${m.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${m.type.storage}(${Mp[n]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${g}`,inputDependencies:["type"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:s,dataType:i}],dispatchGroup:{x:d},programUniforms:[{type:12,data:f}]})}},qr=(e,t,r,n)=>{let i=e.inputs.length===1?r:Dd(e.inputs,r),s=i.axes;s.length===0&&!i.noopWithEmptyAxes&&(s=e.inputs[0].dims.map((v,_)=>_));let o=fe.normalizeAxes(s,e.inputs[0].dims.length),u=o,d=e.inputs[0],f=Fp(u,e.inputs[0].dims.length);f.length>0&&(d=e.compute(Rr(e.inputs[0],f),{inputs:[0],outputs:[-1]})[0],u=Np(u.length,d.dims.length));let[h,m]=Dp(d.dims,u),g=h;i.keepDims&&(g=Pp(h,o)),e.compute(Up(t,i.cacheKey,[d],n,e.inputs[0].dataType,g,m),{inputs:[d]})},wy=(e,t)=>{qr(e,"ReduceMeanShared",t,"mean")},xy=(e,t)=>{qr(e,"ReduceL1Shared",t,"l1")},$y=(e,t)=>{qr(e,"ReduceL2Shared",t,"l2")},Ey=(e,t)=>{qr(e,"ReduceLogSumExpShared",t,"logSumExp")},Sy=(e,t)=>{qr(e,"ReduceMaxShared",t,"max")},Ty=(e,t)=>{qr(e,"ReduceMinShared",t,"min")},ky=(e,t)=>{qr(e,"ReduceProdShared",t,"prod")},Ay=(e,t)=>{qr(e,"ReduceSumShared",t,"sum")},Iy=(e,t)=>{qr(e,"ReduceSumSquareShared",t,"sumSquare")},Cy=(e,t)=>{qr(e,"ReduceLogSumShared",t,"logSum")}}),Hr,Vp,cu,Dd,jr,Wp,qp,Hp,jp,Kp,Xp,Yp,Qp,Zp,Jp,Kr,Oy,Ry,zy,By,Ly,My,Ny,Dy,Py,Gy,cf=Fe(()=>{ct(),_t(),Zt(),xt(),a1(),Hr=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},Vp=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],cu=(e,t,r,n,i,s,o=!1,u=!1)=>{let d=[],f=r[0].dims,h=f.length,m=fe.normalizeAxes(i,h),g=!u&&m.length===0;f.forEach(($,L)=>{g||m.indexOf(L)>=0?o&&d.push(1):d.push($)});let v=d.length,_=fe.size(d);return{name:e,shaderCache:t,getShaderSource:$=>{let L=[],T=be("_A",r[0].dataType,h),b=rt("output",s,v),N=n(T,b,m),B=N[2];for(let W=0,ae=0;W<h;W++)g||m.indexOf(W)>=0?(o&&ae++,B=`for(var j${W}: u32 = 0; j${W} < ${f[W]}; j${W}++) {
                  ${N[2].includes("last_index")?`let last_index = j${W};`:""}
                  ${T.indicesSet("input_indices",W,`j${W}`)}
                  ${B}
                }`):(L.push(`${T.indicesSet("input_indices",W,b.indicesGet("output_indices",ae))};`),ae++);return`

        ${$.registerUniform("output_size","u32").declareVariables(T,b)}

        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${T.type.indices};
          let output_indices = ${b.offsetToIndices("global_idx")};

          ${L.join(`
`)}
          ${N[0]}       // init ops for reduce max/min
          ${N[1]}
          ${B}
          ${N[3]}
          ${N.length===4?b.setByOffset("global_idx","value"):N.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:d,dataType:s}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:[{type:12,data:_},...st(f,d)]})}},Dd=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),Lt({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},jr=(e,t,r,n)=>{let i=e.inputs,s=i.length===1?r:Dd(i,r);e.compute(cu(t,{hint:s.cacheKey,inputDependencies:["rank"]},[i[0]],s.noopWithEmptyAxes&&s.axes.length===0?Vp:n,s.axes,i[0].dataType,s.keepDims,s.noopWithEmptyAxes),{inputs:[0]})},Wp=(e,t)=>{Hr(e.inputs),jr(e,"ReduceLogSum",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},qp=(e,t)=>{Hr(e.inputs),jr(e,"ReduceL1",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},Hp=(e,t)=>{Hr(e.inputs),jr(e,"ReduceL2",t,(r,n)=>[`var t = ${n.type.value}(0); var value = ${n.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},jp=(e,t)=>{Hr(e.inputs),jr(e,"ReduceLogSumExp",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},Kp=(e,t)=>{Hr(e.inputs),jr(e,"ReduceMax",t,(r,n,i)=>{let s=[];for(let o=0;o<r.rank;o++)(i.indexOf(o)>=0||i.length===0)&&s.push(r.indicesSet("input_indices",o,0));return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},Xp=(e,t)=>{Hr(e.inputs),jr(e,"ReduceMean",t,(r,n,i)=>{let s=1;for(let o=0;o<r.rank;o++)(i.indexOf(o)>=0||i.length===0)&&(s*=e.inputs[0].dims[o]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${n.type.value}(sum / ${s});`]})},Yp=(e,t)=>{Hr(e.inputs),jr(e,"ReduceMin",t,(r,n,i)=>{let s=[];for(let o=0;o<r.rank;o++)(i.indexOf(o)>=0||i.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},Qp=(e,t)=>{Hr(e.inputs),jr(e,"ReduceProd",t,(r,n)=>[`var value = ${n.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},Zp=(e,t)=>{Hr(e.inputs),jr(e,"ReduceSum",t,(r,n)=>[`var value = ${n.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},Jp=(e,t)=>{Hr(e.inputs),jr(e,"ReduceSumSquare",t,(r,n)=>[`var t = ${n.type.value}(0); var value = ${n.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Kr=(e,t,r)=>{if(t.length===0)return r;let n=1,i=1;for(let s=0;s<t.length;s++)t.indexOf(s)===-1?n*=e[s]:i*=e[s];return i<32&&n>1024},Oy=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Xp(e,t):wy(e,t)},Ry=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?qp(e,t):xy(e,t)},zy=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Hp(e,t):$y(e,t)},By=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?jp(e,t):Ey(e,t)},Ly=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Kp(e,t):Sy(e,t)},My=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Yp(e,t):Ty(e,t)},Ny=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Qp(e,t):ky(e,t)},Dy=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Zp(e,t):Ay(e,t)},Py=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Jp(e,t):Iy(e,t)},Gy=(e,t)=>{Kr(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Wp(e,t):Cy(e,t)}}),ed,Fy,Uy,Pd,n1=Fe(()=>{ct(),Zt(),cf(),ed=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Fy=(e,t)=>{ed(e.inputs);let r=(n,i,s)=>{let o=[];for(let u=0;u<n.rank;u++)(s.indexOf(u)>=0||s.length===0)&&o.push(`input_indices[${u}] = 0;`);return[`${o.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(cu("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Uy=(e,t)=>{ed(e.inputs);let r=(n,i,s)=>{let o=[];for(let u=0;u<n.rank;u++)(s.indexOf(u)>=0||s.length===0)&&o.push(`input_indices[${u}] = 0;`);return[`${o.join(`
`)}`,`var value = ${n.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${n.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${n.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]};e.compute(cu("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},Pd=e=>Lt(e)}),eh,Xo,th,rh,ah,ks,nh,Vy,pf=Fe(()=>{ct(),_t(),df(),xt(),eh=(e,t)=>{let r=e[0],n=e[1],i=e[2],s=e[3],o=e[4],u=e[5];if(o&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let d=r.dims[0],f=r.dims[1],h=r.dims[2];if(i.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(n.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(n.dims[0]!==h)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(i.dims[0]!==n.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let m=i.dims[0]/3,g=m,v=g;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let N of t.qkvHiddenSizes)if(N%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");m=t.qkvHiddenSizes[0],g=t.qkvHiddenSizes[1],v=t.qkvHiddenSizes[2]}let _=f;if(m!==g)throw new Error("qkv_hidden_sizes first element should be same as the second");if(i.dims[0]!==m+g+v)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let $=0;if(o){if(g!==v)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(o.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(o.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(o.dims[1]!==d)throw new Error('Input "past" second dimension must be batch_size');if(o.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(o.dims[4]!==g/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||($=o.dims[3])}let L=_+$,T=-1,b=0;if(s)throw new Error("Mask not supported");if(o)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==d||u.dims[1]!==t.numHeads||u.dims[2]!==f||u.dims[3]!==L)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:d,sequenceLength:f,pastSequenceLength:$,kvSequenceLength:_,totalSequenceLength:L,maxSequenceLength:T,inputHiddenSize:h,hiddenSize:m,vHiddenSize:v,headSize:Math.floor(m/t.numHeads),vHeadSize:Math.floor(v/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Xo=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,th=(e,t,r,n,i,s,o,u)=>{let d=Kt(o?1:s),f=64,h=s/d;h<f&&(f=32);let m=Math.ceil(s/d/f),g=[{type:12,data:t},{type:12,data:r},{type:12,data:n},{type:12,data:i},{type:12,data:h},{type:12,data:m}],v=lr(e.dataType,d),_=wr(1,d),$=["type"];o&&$.push("type"),u&&$.push("type");let L=T=>{let b=rt("x",e.dataType,e.dims,d),N=[b],B=o?be("seq_lens",o.dataType,o.dims):void 0;B&&N.push(B);let W=u?be("total_sequence_length_input",u.dataType,u.dims):void 0;W&&N.push(W);let ae=wr(e.dataType),Q=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${f}>;
  var<workgroup> thread_sum: array<f32, ${f}>;
  ${T.registerUniforms(Q).declareVariables(...N)}
  ${T.mainStart([f,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Xo(B,W,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${f}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${o?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${_}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${_}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(d){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${f}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${_}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${_}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(d){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${d}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${f}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${b.type.value}(${ae}(1.0) / ${ae}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${_}(x[offset + i]);
        x[offset + i] = ${b.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${o?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${b.type.value}(${ae}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${f};${v};${d}`,inputDependencies:$},getShaderSource:L,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:i,z:t*r},programUniforms:g})}},rh=(e,t,r,n,i,s,o,u,d)=>{let f=o+s.kvSequenceLength,h=[s.batchSize,s.numHeads,s.sequenceLength,f],m=e>1&&n,g=s.kvNumHeads?s.kvNumHeads:s.numHeads,v=m?[s.batchSize,g,f,s.headSize]:void 0,_=s.nReps?s.nReps:1,$=s.scale===0?1/Math.sqrt(s.headSize):s.scale,L=Kt(s.headSize),T=s.headSize/L,b=12,N={x:Math.ceil(f/b),y:Math.ceil(s.sequenceLength/b),z:s.batchSize*s.numHeads},B=[{type:12,data:s.sequenceLength},{type:12,data:T},{type:12,data:f},{type:12,data:s.numHeads},{type:12,data:s.headSize},{type:1,data:$},{type:12,data:o},{type:12,data:s.kvSequenceLength},{type:12,data:_}],W=m&&n&&fe.size(n.dims)>0,ae=["type","type"];W&&ae.push("type"),i&&ae.push("type"),u&&ae.push("type"),d&&ae.push("type");let Q=[{dims:h,dataType:t.dataType,gpuDataType:0}];m&&Q.push({dims:v,dataType:t.dataType,gpuDataType:0});let ge=ze=>{let Xe=be("q",t.dataType,t.dims,L),nt=be("key",r.dataType,r.dims,L),Je=[Xe,nt];if(W){let Oe=be("past_key",n.dataType,n.dims,L);Je.push(Oe)}i&&Je.push(be("attention_bias",i.dataType,i.dims));let F=u?be("seq_lens",u.dataType,u.dims):void 0;F&&Je.push(F);let R=d?be("total_sequence_length_input",d.dataType,d.dims):void 0;R&&Je.push(R);let te=rt("output",t.dataType,h),U=[te];m&&U.push(rt("present_key",t.dataType,v,L));let J=wr(1,L),$e=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;

  var<workgroup> tileQ: array<${Xe.type.storage}, ${b*b}>;
  var<workgroup> tileK: array<${Xe.type.storage}, ${b*b}>;
  ${ze.registerUniforms($e).declareVariables(...Je,...U)}
  ${ze.mainStart([b,b,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${_===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${_===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Xo(F,R,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${W&&m?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${m?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${J}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${W&&m?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${m?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${J}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(L){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${L}`)}})()};
        output[outputIdx] = ${te.type.value} (sum * uniforms.alpha) + ${i?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${L};${i!==void 0};${n!==void 0};${e}`,inputDependencies:ae},getRunData:()=>({outputs:Q,dispatchGroup:N,programUniforms:B}),getShaderSource:ge}},ah=(e,t,r,n,i,s,o=void 0,u=void 0)=>{let d=s+i.kvSequenceLength,f=i.nReps?i.nReps:1,h=i.vHiddenSize*f,m=e>1&&n,g=i.kvNumHeads?i.kvNumHeads:i.numHeads,v=m?[i.batchSize,g,d,i.headSize]:void 0,_=[i.batchSize,i.sequenceLength,h],$=12,L={x:Math.ceil(i.vHeadSize/$),y:Math.ceil(i.sequenceLength/$),z:i.batchSize*i.numHeads},T=[{type:12,data:i.sequenceLength},{type:12,data:d},{type:12,data:i.vHeadSize},{type:12,data:i.numHeads},{type:12,data:i.headSize},{type:12,data:h},{type:12,data:s},{type:12,data:i.kvSequenceLength},{type:12,data:f}],b=m&&n&&fe.size(n.dims)>0,N=["type","type"];b&&N.push("type"),o&&N.push("type"),u&&N.push("type");let B=[{dims:_,dataType:t.dataType,gpuDataType:0}];m&&B.push({dims:v,dataType:t.dataType,gpuDataType:0});let W=ae=>{let Q=be("probs",t.dataType,t.dims),ge=be("v",r.dataType,r.dims),ze=[Q,ge];b&&ze.push(be("past_value",n.dataType,n.dims));let Xe=o?be("seq_lens",o.dataType,o.dims):void 0;o&&ze.push(Xe);let nt=u?be("total_sequence_length_input",u.dataType,u.dims):void 0;u&&ze.push(nt);let Je=[rt("output",t.dataType,_)];m&&Je.push(rt("present_value",t.dataType,v));let F=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${$}u;
  var<workgroup> tileQ: array<${Q.type.value}, ${$*$}>;
  var<workgroup> tileV: array<${Q.type.value}, ${$*$}>;
  ${ae.registerUniforms(F).declareVariables(...ze,...Je)}
  ${ae.mainStart([$,$,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${f===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${f===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Xo(Xe,nt,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${b&&m?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${m?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${Q.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${b&&m?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${m?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${n!==void 0};${e}`,inputDependencies:N},getRunData:()=>({outputs:B,dispatchGroup:L,programUniforms:T}),getShaderSource:W}},ks=(e,t,r,n,i,s,o,u,d,f,h=void 0,m=void 0)=>{let g=Math.min(e.outputCount,1+(o?1:0)+(u?1:0)),v=g>1?f.pastSequenceLength:0,_=v+f.kvSequenceLength,$=d&&fe.size(d.dims)>0?d:void 0,L=[t,r];g>1&&o&&fe.size(o.dims)>0&&L.push(o),$&&L.push($),h&&L.push(h),m&&L.push(m);let T=e.compute(rh(g,t,r,o,$,f,v,h,m),{inputs:L,outputs:g>1?[-1,1]:[-1]})[0];e.compute(th(T,f.batchSize,f.numHeads,v,f.sequenceLength,_,h,m),{inputs:h&&m?[T,h,m]:[T],outputs:[]});let b=[T,n];g>1&&u&&fe.size(u.dims)>0&&b.push(u),h&&b.push(h),m&&b.push(m),e.compute(ah(g,T,n,u,f,v,h,m),{inputs:b,outputs:g>1?[0,2]:[0]})},nh=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],n=t.sequenceLength,i=t.inputHiddenSize,s=t.headSize,o=12,u={x:Math.ceil(t.headSize/o),y:Math.ceil(t.sequenceLength/o),z:t.batchSize*t.numHeads},d=[e.inputs[0],e.inputs[1],e.inputs[2]],f=[{type:12,data:n},{type:12,data:i},{type:12,data:s},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],h=m=>{let g=rt("output_q",d[0].dataType,r),v=rt("output_k",d[0].dataType,r),_=rt("output_v",d[0].dataType,r),$=be("input",d[0].dataType,d[0].dims),L=be("weight",d[1].dataType,d[1].dims),T=be("bias",d[2].dataType,d[2].dims),b=$.type.storage,N=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${o}u;
  var<workgroup> tileInput: array<${b}, ${o*o}>;
  var<workgroup> tileWeightQ: array<${b}, ${o*o}>;
  var<workgroup> tileWeightK: array<${b}, ${o*o}>;
  var<workgroup> tileWeightV: array<${b}, ${o*o}>;
  ${m.registerUniforms(N).declareVariables($,L,T,g,v,_)}
  ${m.mainStart([o,o,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${b}(0);
    var valueK = ${b}(0);
    var valueV = ${b}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:f}),getShaderSource:h},{inputs:d,outputs:[-1,-1,-1]})},Vy=(e,t)=>{let r=eh(e.inputs,t),[n,i,s]=nh(e,r);return ks(e,n,i,s,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),ih,sh,oh,Wy,i1=Fe(()=>{ea(),ct(),_t(),Zt(),xt(),ih=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(n,i,s)=>{let o=i.length;if(o!==n.length)throw new Error(`${s}: num dimensions != ${o}`);i.forEach((u,d)=>{if(u!==n[d])throw new Error(`${s}: dim[${d}] do not match`)})};if(e[0].dims.length>1){let n=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,n,"Invalid input scale"),r(e[2].dims,n,"Invalid input B"),r(e[3].dims,n,"Invalid input mean"),r(e[4].dims,n,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},sh=(e,t)=>{let{epsilon:r,spatial:n,format:i}=t,s=e[0].dims,o=n?Kt(s[s.length-1]):1,u=i==="NHWC"&&s.length>1?o:1,d=fe.size(s)/o,f=n,h=f?s.length:s,m=be("x",e[0].dataType,e[0].dims,o),g=be("scale",e[1].dataType,e[1].dims,u),v=be("bias",e[2].dataType,e[2].dims,u),_=be("inputMean",e[3].dataType,e[3].dims,u),$=be("inputVar",e[4].dataType,e[4].dims,u),L=rt("y",e[0].dataType,h,o),T=()=>{let N="";if(n)N=`let cOffset = ${s.length===1?"0u":i==="NHWC"?`outputIndices[${s.length-1}] / ${o}`:"outputIndices[1]"};`;else if(i==="NCHW")N=`
            ${L.indicesSet("outputIndices","0","0")}
            let cOffset = ${L.indicesToOffset("outputIndices")};`;else{N=`var cIndices = ${g.type.indices}(0);
                       cIndices[0] = outputIndices[${s.length-1}];`;for(let B=1;B<g.rank;B++)N+=`cIndices[${B}] = outputIndices[${B}];`;N+=`let cOffset = ${g.indicesToOffset("cIndices")};`}return N},b=N=>`
  const epsilon = ${r};
  ${N.registerUniform("outputSize","u32").declareVariables(m,g,v,_,$,L)}
  ${N.mainStart()}
  ${N.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${L.offsetToIndices(`global_idx * ${o}`)};
    ${T()}
    let scale = ${g.getByOffset("cOffset")};
    let bias = ${v.getByOffset("cOffset")};
    let inputMean = ${_.getByOffset("cOffset")};
    let inputVar = ${$.getByOffset("cOffset")};
    let x = ${m.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${L.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${n}_${o}`,inputDependencies:f?["rank","type","type","type","type"]:void 0},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f?[{type:12,data:d},...st(s)]:[{type:12,data:d}]})}},oh=e=>Lt(e),Wy=(e,t)=>{let{inputs:r,outputCount:n}=e,i=oh({...t,outputCount:n});if(Vt.webgpu.validateInputContent&&ih(r,i),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(sh(r,i))}}),uh,lh,qy,s1=Fe(()=>{_t(),xt(),uh=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},lh=e=>{let t=e[0].dims,r=e[0].dims[2],n=fe.size(t)/4,i=e[0].dataType,s=be("input",i,t,4),o=be("bias",i,[r],4),u=be("residual",i,t,4),d=rt("output",i,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:f=>`
  const channels = ${r}u / 4;
  ${f.declareVariables(s,o,u,d)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let value = ${s.getByOffset("global_idx")}
      + ${o.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}},qy=e=>{uh(e.inputs),e.compute(lh(e.inputs))}}),dh,Bt,Hy,jy,Ky,Xy,Yy,Qy,Zy,Jy,ev,fh,tv,rv,av,nv,ws,iv,su,sv,ov,uv,lv,dv,fv,cv,pv,hv,mv,gv,yv,vv,_v,bv,wv,td,xv,Gd,Fd,$v,Ev,Sv,ch,ph,Tv,hf=Fe(()=>{ct(),_t(),Zt(),xt(),dh=(e,t,r,n,i,s,o)=>{let u=Math.ceil(t/4),d="";typeof i=="string"?d=`${i}(a)`:d=i("a");let f=be("inputData",r,[u],4),h=rt("outputData",n,[u],4),m=[{name:"vec_size",type:"u32"}];return o&&m.push(...o),`
      ${e.registerUniforms(m).declareVariables(f,h)}

  ${s??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${f.getByOffset("global_idx")};
    ${h.setByOffset("global_idx",d)}
  }`},Bt=(e,t,r,n,i,s=e.dataType,o,u)=>{let d=[{type:12,data:Math.ceil(fe.size(e.dims)/4)}];return o&&d.push(...o),{name:t,shaderCache:{hint:i,inputDependencies:["type"]},getShaderSource:f=>dh(f,fe.size(e.dims),e.dataType,s,r,n,u),getRunData:f=>({outputs:[{dims:e.dims,dataType:s}],dispatchGroup:{x:Math.ceil(fe.size(f[0].dims)/64/4)},programUniforms:d})}},Hy=e=>{e.compute(Bt(e.inputs[0],"Abs","abs"))},jy=e=>{e.compute(Bt(e.inputs[0],"Acos","acos"))},Ky=e=>{e.compute(Bt(e.inputs[0],"Acosh","acosh"))},Xy=e=>{e.compute(Bt(e.inputs[0],"Asin","asin"))},Yy=e=>{e.compute(Bt(e.inputs[0],"Asinh","asinh"))},Qy=e=>{e.compute(Bt(e.inputs[0],"Atan","atan"))},Zy=e=>{e.compute(Bt(e.inputs[0],"Atanh","atanh"))},Jy=e=>Lt(e),ev=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(Bt(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},fh=e=>{let t,r,n=e.length>=2&&e[1].data!==0,i=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=n?e[1].getFloat32Array()[0]:-34028234663852886e22,r=i?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=n?e[1].getUint16Array()[0]:64511,r=i?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return Lt({min:t,max:r})},tv=(e,t)=>{let r=t||fh(e.inputs),n=wr(e.inputs[0].dataType);e.compute(Bt(e.inputs[0],"Clip",i=>`clamp(${i}, vec4<${n}>(uniforms.min), vec4<${n}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:n},{name:"max",type:n}]),{inputs:[0]})},rv=e=>{e.compute(Bt(e.inputs[0],"Ceil","ceil"))},av=e=>{e.compute(Bt(e.inputs[0],"Cos","cos"))},nv=e=>{e.compute(Bt(e.inputs[0],"Cosh","cosh"))},ws=e=>Lt(e),iv=(e,t)=>{let r=wr(e.inputs[0].dataType);e.compute(Bt(e.inputs[0],"Elu",n=>`elu_vf32(${n})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},su=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,sv=e=>{let t=wr(e.inputs[0].dataType);e.compute(Bt(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,su(t)))},ov=e=>{e.compute(Bt(e.inputs[0],"Exp","exp"))},uv=e=>{e.compute(Bt(e.inputs[0],"Floor","floor"))},lv=e=>{let t=wr(e.inputs[0].dataType);e.compute(Bt(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,su(t)))},dv=(e,t)=>{let r=wr(e.inputs[0].dataType);e.compute(Bt(e.inputs[0],"LeakyRelu",n=>`select(leaky_relu_alpha_ * ${n}, ${n}, ${n} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},fv=e=>{e.compute(Bt(e.inputs[0],"Not",t=>`!${t}`))},cv=e=>{e.compute(Bt(e.inputs[0],"Neg",t=>`-${t}`))},pv=e=>{e.compute(Bt(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},hv=e=>{let t=wr(e.inputs[0].dataType);e.compute(Bt(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},mv=e=>{e.compute(Bt(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},gv=e=>Lt(e),yv=(e,t)=>{let r=wr(e.inputs[0].dataType);e.compute(Bt(e.inputs[0],"HardSigmoid",n=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${n} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},vv=e=>{e.compute(Bt(e.inputs[0],"Sin","sin"))},_v=e=>{e.compute(Bt(e.inputs[0],"Sinh","sinh"))},bv=e=>{e.compute(Bt(e.inputs[0],"Sqrt","sqrt"))},wv=e=>{e.compute(Bt(e.inputs[0],"Tan","tan"))},td=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,xv=e=>{e.compute(Bt(e.inputs[0],"Tanh",td))},Gd=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${td("v")};
}
`,Fd=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,$v=e=>{let t=wr(e.inputs[0].dataType);e.compute(Bt(e.inputs[0],"FastGelu",Fd,Gd(t),void 0,e.inputs[0].dataType))},Ev=(e,t)=>{let r=wr(e.inputs[0].dataType);return e.compute(Bt(e.inputs[0],"ThresholdedRelu",n=>`select(vec4<${r}>(0.0), ${n}, ${n} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Sv=e=>{e.compute(Bt(e.inputs[0],"Log","log"))},ch=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,ph=e=>`quick_gelu_impl(${e})`,Tv=(e,t)=>{let r=wr(e.inputs[0].dataType);e.compute(Bt(e.inputs[0],"QuickGelu",ph,ch(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),hh,mh,kv,o1=Fe(()=>{_t(),xt(),hf(),hh=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},mh=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=be("input",e[0].dataType,e[0].dims,4),n=be("bias",e[0].dataType,[e[0].dims[2]],4),i=rt("output",e[0].dataType,t,4),s=fe.size(t)/4,o=lr(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,n,i)}

  ${su(o)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${i.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},kv=e=>{hh(e.inputs),e.compute(mh(e.inputs))}}),gh,yh,Xr,Av,Iv,Cv,Ov,Rv,zv,Bv,Lv,Mv,Nv,u1=Fe(()=>{ct(),_t(),xt(),gh=(e,t,r,n,i,s,o,u,d,f,h,m)=>{let g,v;typeof u=="string"?g=v=(b,N)=>`${u}((${b}),(${N}))`:typeof u=="function"?g=v=u:(g=u.scalar,v=u.vector);let _=rt("outputData",h,n.length,4),$=be("aData",d,t.length,4),L=be("bData",f,r.length,4),T;if(i)if(s){let b=fe.size(t)===1,N=fe.size(r)===1,B=t.length>0&&t[t.length-1]%4===0,W=r.length>0&&r[r.length-1]%4===0;b||N?T=_.setByOffset("global_idx",v(b?`${$.type.value}(${$.getByOffset("0")}.x)`:$.getByOffset("global_idx"),N?`${L.type.value}(${L.getByOffset("0")}.x)`:L.getByOffset("global_idx"))):T=`
            let outputIndices = ${_.offsetToIndices("global_idx * 4u")};
            let offsetA = ${$.broadcastedIndicesToOffset("outputIndices",_)};
            let offsetB = ${L.broadcastedIndicesToOffset("outputIndices",_)};
            ${_.setByOffset("global_idx",v(o||B?$.getByOffset("offsetA / 4u"):`${$.type.value}(${$.getByOffset("offsetA / 4u")}[offsetA % 4u])`,o||W?L.getByOffset("offsetB / 4u"):`${L.type.value}(${L.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else T=_.setByOffset("global_idx",v($.getByOffset("global_idx"),L.getByOffset("global_idx")));else{if(!s)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let b=(N,B,W="")=>{let ae=`aData[indexA${B}][componentA${B}]`,Q=`bData[indexB${B}][componentB${B}]`;return`
            let outputIndices${B} = ${_.offsetToIndices(`global_idx * 4u + ${B}u`)};
            let offsetA${B} = ${$.broadcastedIndicesToOffset(`outputIndices${B}`,_)};
            let offsetB${B} = ${L.broadcastedIndicesToOffset(`outputIndices${B}`,_)};
            let indexA${B} = offsetA${B} / 4u;
            let indexB${B} = offsetB${B} / 4u;
            let componentA${B} = offsetA${B} % 4u;
            let componentB${B} = offsetB${B} % 4u;
            ${N}[${B}] = ${W}(${g(ae,Q)});
          `};h===9?T=`
            var data = vec4<u32>(0);
            ${b("data",0,"u32")}
            ${b("data",1,"u32")}
            ${b("data",2,"u32")}
            ${b("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:T=`
            ${b("outputData[global_idx]",0)}
            ${b("outputData[global_idx]",1)}
            ${b("outputData[global_idx]",2)}
            ${b("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables($,L,_)}

        ${m??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${T}
      }`},yh=(e,t,r,n,i,s,o=r.dataType)=>{let u=r.dims.map($=>Number($)??1),d=n.dims.map($=>Number($)??1),f=!fe.areEqual(u,d),h=u,m=fe.size(u),g=!1,v=!1,_=[f];if(f){let $=ui.calcShape(u,d,!1);if(!$)throw new Error("Can't perform binary op on the given tensors");h=$.slice(),m=fe.size(h);let L=fe.size(u)===1,T=fe.size(d)===1,b=u.length>0&&u[u.length-1]%4===0,N=d.length>0&&d[d.length-1]%4===0;_.push(L),_.push(T),_.push(b),_.push(N);let B=1;for(let W=1;W<h.length;W++){let ae=u[u.length-W],Q=d[d.length-W];if(ae===Q)B*=ae;else break}B%4===0?(v=!0,g=!0):(L||T||b||N)&&(g=!0)}else g=!0;return _.push(g),{name:e,shaderCache:{hint:t+_.map($=>$.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:$=>gh($,u,d,h,g,f,v,i,r.dataType,n.dataType,o,s),getRunData:()=>({outputs:[{dims:h,dataType:o}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(fe.size(h)/4)},...st(u,d,h)]})}},Xr=(e,t,r,n,i,s)=>{e.compute(yh(t,i??"",e.inputs[0],e.inputs[1],r,n,s))},Av=e=>{Xr(e,"Add",(t,r)=>`${t}+${r}`)},Iv=e=>{Xr(e,"Div",(t,r)=>`${t}/${r}`)},Cv=e=>{Xr(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Ov=e=>{Xr(e,"Mul",(t,r)=>`${t}*${r}`)},Rv=e=>{let t=be("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Xr(e,"Pow",{scalar:(r,n)=>`pow_custom(${r},${n})`,vector:(r,n)=>`pow_vector_custom(${r},${n})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},zv=e=>{Xr(e,"Sub",(t,r)=>`${t}-${r}`)},Bv=e=>{Xr(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},Lv=e=>{Xr(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Mv=e=>{Xr(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Nv=e=>{Xr(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),vh,_h,bh,wh,Dv,Pv,l1=Fe(()=>{ct(),_t(),Zt(),xt(),vh=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,n=e[r],i=n.dataType,s=n.dims.length;e.forEach((o,u)=>{if(u!==r){if(o.dataType!==i)throw new Error("input tensors should be one type");if(o.dims.length!==s)throw new Error("input tensors should have the same shape");o.dims.forEach((d,f)=>{if(f!==t&&d!==n.dims[f])throw new Error("non concat dimensions must match")})}})},_h=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,bh=(e,t)=>{let r=e.length,n=[];for(let i=0;i<r;++i){let s=t.setByOffset("global_idx",e[i].getByIndices("indices"));r===1?n.push(s):i===0?n.push(`if (inputIndex == ${i}u) { ${s} }`):i===r-1?n.push(`else { ${s} }`):n.push(`else if (inputIndex == ${i}) { ${s} }`)}return n.join(`
`)},wh=(e,t,r,n)=>{let i=fe.size(r),s=new Array(e.length),o=new Array(e.length),u=0,d=[],f=[],h=[{type:12,data:i}];for(let $=0;$<e.length;++$)u+=e[$].dims[t],s[$]=u,f.push(e[$].dims.length),o[$]=be(`input${$}`,n,f[$]),d.push("rank"),h.push({type:12,data:s[$]});for(let $=0;$<e.length;++$)h.push(...st(e[$].dims));h.push(...st(r));let m=rt("output",n,r.length),g=m.indicesGet("indices",t),v=Array.from(Array(s.length).keys()).map($=>`uniforms.sizeInConcatAxis${$}`).join(","),_=$=>`

  ${(()=>{$.registerUniform("outputSize","u32");for(let L=0;L<e.length;L++)$.registerUniform(`sizeInConcatAxis${L}`,"u32");return $.declareVariables(...o,m)})()}

  ${_h(s.length,v)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${m.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${g});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${s.length}u>(${v});
      ${g} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${bh(o,m)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:r,dataType:n}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:h}),getShaderSource:_}},Dv=(e,t)=>{let r=e.inputs,n=r[0].dims,i=fe.normalizeAxis(t.axis,n.length);vh(r,i);let s=n.slice();s[i]=r.reduce((u,d)=>u+(d.dims.length>i?d.dims[i]:0),0);let o=r.filter(u=>fe.size(u.dims)>0);e.compute(wh(o,i,s,r[0].dataType),{inputs:o})},Pv=e=>Lt({axis:e.axis})}),xn,$n,En,mf,kn=Fe(()=>{ct(),_t(),xn=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},$n=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},En=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},mf=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,n]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:n}}else if(t==="Clip"){let[r,n]=e?.activation_params||[fy,cy];return{activation:t,clipMax:n,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),pr,Gv,gf=Fe(()=>{pr=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Gv=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Fv,d1=Fe(()=>{Fv=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),$s,yf,vf=Fe(()=>{ct(),_t(),xt(),kn(),$s=(e,t,r,n,i)=>{let s=n-r;return`
      ${Array.from({length:r}).map((o,u)=>`
      if (${at(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,at(i,u+s,n))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},yf=(e,t,r,n,i=!1,s)=>{let o=e[0].dims,u=e[1].dims,d=o[o.length-2],f=u[u.length-1],h=o[o.length-1],m=Kt(f),g=Kt(h),v=Kt(d),_=fe.size(r)/m/v,$=e.length>2,L=n?n.slice(0,-2):r.slice(0,-2),T=[fe.size(L),d,f],b=[{type:12,data:_},{type:12,data:d},{type:12,data:f},{type:12,data:h}];$n(t,b),b.push(...st(L,o,u)),$&&b.push(...st(e[2].dims)),b.push(...st(T));let N=B=>{let W=ff("batch_dims",e[0].dataType,L.length),ae=be("a",e[0].dataType,o.length,g),Q=be("b",e[1].dataType,u.length,m),ge=rt("output",e[0].dataType,T.length,m),ze=lr(ge.type.tensor),Xe=xn(t,ge.type.value,ze),nt=[ae,Q],Je="";if($){let te=i?m:1;nt.push(be("bias",e[2].dataType,e[2].dims.length,te)),Je=`${i?`value += bias[col / ${te}];`:`value += ${ge.type.value}(bias[row + i]);`}`}let F=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];En(t,F);let R=()=>{let te=`var a_data: ${ae.type.value};`;for(let U=0;U<g;U++)te+=`
              let b_data${U} = b[(b_offset + (k + ${U}) * uniforms.N + col) / ${m}];`;for(let U=0;U<v;U++){te+=`a_data = a[(a_offset + (row + ${U}) * uniforms.K + k) / ${g}];`;for(let J=0;J<g;J++)te+=`
            values[${U}] = fma(${Q.type.value}(a_data${g===1?"":`[${J}]`}), b_data${J}, values[${U}]);
`}return te};return`
  ${B.registerUniforms(F).registerInternalVariables(W).declareVariables(...nt,ge)}
  ${B.mainStart()}
    ${B.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${m})) * ${m};
    var index1 = global_idx / (uniforms.N / ${m});
    let stride1 = uniforms.M / ${v};
    let row = (index1 % stride1) * ${v};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${W.offsetToIndices("batch")};`}

    var a_indices: ${ae.type.indices};
    ${$s("a_indices",ae,ae.rank-2,W.rank,"batch_indices")}
    ${ae.indicesSet("a_indices",ae.rank-2,0)}
    ${ae.indicesSet("a_indices",ae.rank-1,0)}
    let a_offset = ${ae.indicesToOffset("a_indices")};

    var b_indices: ${Q.type.indices};
    ${$s("b_indices",Q,Q.rank-2,W.rank,"batch_indices")}
    ${Q.indicesSet("b_indices",Q.rank-2,0)}
    ${Q.indicesSet("b_indices",Q.rank-1,0)}
    let b_offset = ${Q.indicesToOffset("b_indices")};
    var values: array<${ge.type.value}, ${v}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${g}) {
      ${R()}
    }
    for (var i = 0u; i < ${v}u; i++) {
      var value = values[i];
      ${Je}
      ${Xe}
      let cur_indices = ${ge.type.indices}(batch, row + i, col);
      let offset = ${ge.indicesToOffset("cur_indices")};
      ${ge.setByOffset(`offset / ${m}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${m};${g};${v};${i}`,inputDependencies:$?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(_/64)},programUniforms:b}),getShaderSource:N}}}),xh,$h,Ud,rd,Eh,Vd,Sh,pu,_f=Fe(()=>{ct(),_t(),xt(),kn(),vf(),gf(),xh=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,$h=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Ud=(e,t,r="f32",n,i=!1,s=32,o=!1,u=32)=>{let d=t[1]*e[1],f=t[0]*e[0],h=i?d:s,m=i?s:d,g=h/t[0],v=s/t[1];if(!((i&&g===4&&e[1]===4||!i&&(g===3||g===4))&&h%t[0]===0&&s%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${i} is true, innerElementSize ${g} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${g} must be 3 or 4.
  tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}. tileInner ${s} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${g}<${r}>, ${h/g}>, ${m}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${f/e[0]}>, ${s}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${g};
const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${o?"0":"i32(globalId.z)"};
  ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${d};

  let num_tiles = ${o?`${Math.ceil(u/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${o?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${v};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${xh(i,n)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${v}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${n?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${g===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${$h(i,g)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},rd=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Eh=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Vd=(e,t,r="f32",n,i=!1,s=32,o=!1,u=32,d=!1)=>{let f=e[1]*t[1],h=e[0]*t[0],m=i?f:s,g=i?s:f;if(!(g%t[1]===0&&m%t[0]===0&&s%t[1]===0))throw new Error(`tileAHight ${g} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${m} must be divisible by workgroupSize[0]${t[0]}, tileInner ${s} must be divisible by workgroupSize[1]${t[1]}`);let v=g/t[1],_=m/t[0],$=s/t[1],L=d?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${f};
    let globalColStart = i32(workgroupId.x) * ${h};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${g}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${m}; inputCol = inputCol + ${t[0]}) {
          ${rd(i,n)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${s}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${n?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${i?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${f};

let tileRowA = i32(localId.y) * ${v};
let tileColA = i32(localId.x) * ${_};
let tileRowB = i32(localId.y) * ${$};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${v}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${_}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${rd(i,n)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${$}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${n?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Eh(i)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${m}>, ${g}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${h}>, ${s}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${s};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o?"0":"i32(globalId.z)"};
    ${n?`let batchIndices = ${n.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${o?`${Math.ceil(u/s)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${o?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${L}
  }
`},Sh=(e,t,r,n,i=!1)=>{let[s,o,u,d]=n,f=lr(n[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${pr(e,f)} {
      var value = ${pr(e,f)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${$s("aIndices",o,o.rank-2,s.rank,"batchIndices")}
        ${o.indicesSet("aIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("aIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${s.type.indices}) -> ${pr(e,f)} {
      var value = ${pr(e,f)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${$s("bIndices",u,u.rank-2,s.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${pr(e,f)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${i?"bias[colIn]":`${pr(e,f)}(bias[row])`};`:""}
        ${r}
        ${d.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},pu=(e,t,r,n,i=!1,s)=>{let o=e[0].dims,u=e[1].dims,d=o.slice(0,-2),f=u.slice(0,-2),h=n?n.slice(0,-2):r.slice(0,-2),m=fe.size(h),g=o[o.length-2],v=o[o.length-1],_=u[u.length-1],$=v%4===0&&_%4===0,L=g<=8?[4,1,1]:[4,4,1],T=[8,8,1],b=[Math.ceil(_/T[0]/L[0]),Math.ceil(g/T[1]/L[1]),Math.ceil(m/T[2]/L[2])],N=$?4:1,B=[...d,g,v/N],W=B.length,ae=[...f,v,_/N],Q=ae.length,ge=[m,g,_/N],ze=[{type:6,data:g},{type:6,data:_},{type:6,data:v}];$n(t,ze),ze.push(...st(h,B,ae));let Xe=["rank","rank"],nt=e.length>2;nt&&(ze.push(...st(e[2].dims)),Xe.push("rank")),ze.push(...st(ge));let Je=F=>{let R=h.length,te=ff("batchDims",e[0].dataType,R,1),U=lr(e[0].dataType),J=be("a",e[0].dataType,W,N),$e=be("b",e[1].dataType,Q,N),Oe=rt("result",e[0].dataType,ge.length,N),He=[J,$e];if(nt){let We=i?N:1;He.push(be("bias",e[2].dataType,e[2].dims.length,We))}let ie=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];En(t,ie);let me=lr(Oe.type.tensor),Ve=xn(t,Oe.type.value,me),de=Sh(N,nt,Ve,[te,J,$e,Oe],i);return`
  ${F.registerUniforms(ie).registerInternalVariables(te).declareVariables(...He,Oe)}
  ${de}
  ${$?Ud(L,T,U,te):Vd(L,T,U,te)}
                   `};return{name:"MatMul",shaderCache:{hint:`${L};${t.activation};${$};${i}`,inputDependencies:Xe},getRunData:()=>({outputs:[{dims:s?s(r):r,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:ze}),getShaderSource:Je}}}),Th,Uv,f1=Fe(()=>{ct(),$a(),xt(),kn(),gf(),d1(),_f(),Th=(e,t,r,n,i=!1,s,o=4,u=4,d=4,f="f32")=>{let h=ze=>{switch(ze){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${f}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${ze} is not supported.`)}},m=ze=>{switch(ze){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${ze} is not supported.`)}},g=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,v=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,_=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",$=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",L=e?"row":"col",T=e?"col":"row",b=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${L} / outWidth;
    let outCol = ${L} % outWidth;

    let WRow = ${T} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${T} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${T} % inChannels;
    var resData = ${pr(o,f)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${_} && xCol >= 0 && xCol < ${$}) {
      ${g}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${h(o)}
    }
    return resData;`,N=e?t&&n?`
    let col = colIn * ${o};
    ${b}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${b}
    }
    return ${pr(o,f)}(0.0);`:n&&r?`
    let col = colIn * ${o};
    ${b}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${b}
    }
    return ${pr(o,f)}(0.0);`,B=e?n&&r?m(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${m(u)}
    }
    return ${pr(u,f)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${m(u)}
    }
    return ${pr(u,f)}(0.0);`,W=pr(d,f),ae=pr(e?o:u,f),Q=pr(e?u:o,f),ge=xn(s,W,f);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${ae} {
      ${e?N:B}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${Q} {
      ${e?B:N}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${W}) {
      let col = colIn * ${d};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${v}
      ${Gv(i)}
      ${ge}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},Uv=(e,t,r,n,i,s,o,u,d)=>{let f=t.format==="NHWC",h=f?e[0].dims[3]:e[0].dims[1],m=r[0],g=f?r[2]:r[3],v=f?r[1]:r[2],_=f?r[3]:r[1],$=f&&(h%4===0||h%3===0)&&_%4===0,L=f?_:g*v,T=f?g*v:_,b=[8,8,1],N=n<=8?[4,1,1]:[4,4,1],B=[Math.ceil(L/b[0]/N[0]),Math.ceil(T/b[1]/N[1]),Math.ceil(m/b[2]/N[2])];Ot("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${B}`);let W=$?f&&h%4!==0?3:4:1,ae=b[1]*N[1],Q=b[0]*N[0],ge=Math.max(b[0]*W,b[1]),ze=n%ae===0,Xe=i%Q===0,nt=s%ge===0,Je=$?[W,4,4]:[1,1,1],F=[{type:6,data:n},{type:6,data:i},{type:6,data:s},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];$n(t,F),F.push(...st(e[0].dims,e[1].dims));let R=["rank","rank"];o&&(F.push(...st(e[2].dims)),R.push("rank")),F.push(...st(r));let te=U=>{let J=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];En(t,J);let $e=$?4:1,Oe=lr(e[0].dataType),He=`
      fn setOutputAtIndex(flatIndex : i32, value : ${$?`vec4<${Oe}>`:Oe}) {
        result[flatIndex] = ${$?`vec4<${Oe}>`:Oe}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${$?`vec4<${Oe}>`:Oe}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${$?"/ 4":""}, value);
      }`,ie=be("x",e[0].dataType,e[0].dims.length,W===3?1:W),me=be("w",e[1].dataType,e[1].dims.length,$e),Ve=[ie,me],de=rt("result",e[0].dataType,r.length,$e);if(o){let We=be("bias",e[2].dataType,e[2].dims.length,$e);Ve.push(We),He+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${$?`vec4<${Oe}>`:Oe} {
          return bias[coords.${f?"w":"y"}${$?"/ 4":""}];
        }`}return`
        ${Fv("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${U.registerUniforms(J).declareVariables(...Ve,de)}
        ${He}
        ${Th(f,ze,Xe,nt,o,t,Je[0],Je[1],Je[2],Oe)}
        ${$?Ud(N,b,Oe,void 0,!f,ge):Vd(N,b,Oe,void 0,!f,ge,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${W};${$};${ze};${Xe};${nt};${ae};${Q};${ge}`,inputDependencies:R},getRunData:()=>({outputs:[{dims:d?d(r):r,dataType:e[0].dataType}],dispatchGroup:{x:B[0],y:B[1],z:B[2]},programUniforms:F}),getShaderSource:te}}}),kh,ad,ps,Ah,nd,Ih,Vv,Wv,c1=Fe(()=>{ct(),$a(),_t(),xt(),kn(),gf(),kh=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},ad=e=>typeof e=="number"?[e,e,e]:e,ps=(e,t)=>t<=1?e:e+(e-1)*(t-1),Ah=(e,t,r,n=1)=>{let i=ps(t,n);return Math.floor((e[0]*(r-1)-r+i)/2)},nd=(e,t,r,n,i)=>{i==null&&(i=Ah(e,t[0],n[0]));let s=[0,0,0,r];for(let o=0;o<3;o++)e[o]+2*i>=t[o]&&(s[o]=Math.trunc((e[o]-t[o]+2*i)/n[o]+1));return s},Ih=(e,t,r,n,i,s,o,u,d,f)=>{let h,m,g,v;if(e==="VALID"&&(e=0),typeof e=="number"){h={top:e,bottom:e,left:e,right:e,front:e,back:e};let _=nd([t,r,n,1],[u,d,f],1,[i,s,o],e);m=_[0],g=_[1],v=_[2]}else if(Array.isArray(e)){if(!e.every(($,L,T)=>$===T[0]))throw Error(`Unsupported padding parameter: ${e}`);h={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let _=nd([t,r,n,1],[u,d,f],1,[i,s,o],e[0]);m=_[0],g=_[1],v=_[2]}else if(e==="SAME_UPPER"){m=Math.ceil(t/i),g=Math.ceil(r/s),v=Math.ceil(n/o);let _=(m-1)*i+u-t,$=(g-1)*s+d-r,L=(v-1)*o+f-n,T=Math.floor(_/2),b=_-T,N=Math.floor($/2),B=$-N,W=Math.floor(L/2),ae=L-W;h={top:N,bottom:B,left:W,right:ae,front:T,back:b}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:h,outDepth:m,outHeight:g,outWidth:v}},Vv=(e,t,r,n,i,s=!1,o="channelsLast")=>{let u,d,f,h,m;if(o==="channelsLast")[u,d,f,h,m]=e;else if(o==="channelsFirst")[u,m,d,f,h]=e;else throw new Error(`Unknown dataFormat ${o}`);let[g,,v,_,$]=t,[L,T,b]=ad(r),[N,B,W]=ad(n),ae=ps(v,N),Q=ps(_,B),ge=ps($,W),{padInfo:ze,outDepth:Xe,outHeight:nt,outWidth:Je}=Ih(i,d,f,h,L,T,b,ae,Q,ge),F=s?g*m:g,R=[0,0,0,0,0];return o==="channelsFirst"?R=[u,F,Xe,nt,Je]:o==="channelsLast"&&(R=[u,Xe,nt,Je,F]),{batchSize:u,dataFormat:o,inDepth:d,inHeight:f,inWidth:h,inChannels:m,outDepth:Xe,outHeight:nt,outWidth:Je,outChannels:F,padInfo:ze,strideDepth:L,strideHeight:T,strideWidth:b,filterDepth:v,filterHeight:_,filterWidth:$,effectiveFilterDepth:ae,effectiveFilterHeight:Q,effectiveFilterWidth:ge,dilationDepth:N,dilationHeight:B,dilationWidth:W,inShape:e,outShape:R,filterShape:t}},Wv=(e,t,r,n,i,s)=>{let o=s==="channelsLast";o?e[0].dims[3]:e[0].dims[1];let u=[64,1,1],d={x:r.map((L,T)=>T)},f=[Math.ceil(kh(d.x.map(L=>r[L]))/u[0]),1,1];Ot("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${f}`);let h=1,m=fe.size(r),g=[{type:12,data:m},{type:12,data:n},{type:12,data:i},{type:12,data:t.strides},{type:12,data:t.dilations}];$n(t,g),g.push(...st(e[0].dims,e[1].dims));let v=["rank","rank"],_=e.length===3;_&&(g.push(...st(e[2].dims)),v.push("rank")),g.push(...st(r));let $=L=>{let T=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:n.length},{name:"pads",type:"u32",length:i.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];En(t,T);let b=1,N=lr(e[0].dataType),B=be("x",e[0].dataType,e[0].dims.length,h),W=be("W",e[1].dataType,e[1].dims.length,b),ae=[B,W],Q=rt("result",e[0].dataType,r.length,b),ge="";if(_){let nt=be("bias",e[2].dataType,e[2].dims.length,b);ae.push(nt),ge+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${N} {
          return bias[${o?at("coords",4,5):at("coords",1,5)}];
        }`}let ze=pr(h,N),Xe=xn(t,ze,N);return`
            ${ge}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${B.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${W.getByIndices("aIndices")};
            }
          ${L.registerUniforms(T).declareVariables(...ae,Q)}
          ${L.mainStart()}
          ${L.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${Q.offsetToIndices("global_idx")};
              let batch = ${at("coords",0,B.rank)};
              let d2 = ${o?at("coords",B.rank-1,B.rank):at("coords",1,B.rank)};
              let xFRCCorner = vec3<u32>(${o?at("coords",1,B.rank):at("coords",2,B.rank)},
              ${o?at("coords",2,B.rank):at("coords",3,B.rank)},
              ${o?at("coords",3,B.rank):at("coords",4,B.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?at("uniforms.x_shape",1,B.rank):at("uniforms.x_shape",2,B.rank)};
              let xShapeZ = ${o?at("uniforms.x_shape",2,B.rank):at("uniforms.x_shape",3,B.rank)};
              let xShapeW = ${o?at("uniforms.x_shape",3,B.rank):at("uniforms.x_shape",4,B.rank)};
              let xShapeU = ${o?at("uniforms.x_shape",4,B.rank):at("uniforms.x_shape",1,B.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${o?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${o?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${o?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${_?"value = value + getBiasByOutputCoords(coords)":""};
              ${Xe}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${o};${h};${_}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:f[0],y:f[1],z:f[2]},programUniforms:g}),getShaderSource:$}}}),qv,Hv,p1=Fe(()=>{ct(),_t(),xt(),kn(),qv=(e,t,r,n)=>{let i=e.length>2,s=i?"value += b[output_channel];":"",o=e[0].dims,u=e[1].dims,d=t.format==="NHWC",f=d?r[3]:r[1],h=f/t.group,m=d&&h>=4?Kt(f):1,g=fe.size(r)/m,v=[{type:12,data:g},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:h}];$n(t,v),v.push(...st(o,[u[0],u[1],u[2],u[3]/m]));let _=i?["rank","rank","rank"]:["rank","rank"];v.push(...st([r[0],r[1],r[2],r[3]/m]));let $=L=>{let T=rt("output",e[0].dataType,r.length,m),b=lr(T.type.tensor),N=xn(t,T.type.value,b),B=be("x",e[0].dataType,o.length),W=be("w",e[1].dataType,u.length,m),ae=[B,W];i&&ae.push(be("b",e[2].dataType,e[2].dims,m));let Q=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];En(t,Q);let ge=d?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${B.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${W.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${B.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${W.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${L.registerUniforms(Q).declareVariables(...ae,T)}

  ${L.mainStart()}
    ${L.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${T.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${d?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${d?1:2}], outputIndices[${d?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${m} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${d?2:1}];

    var value: ${T.type.value} = ${T.type.value}(0);
    ${ge}
    ${s}
    ${N}
    ${T.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${m}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:v}),getShaderSource:$}},Hv=(e,t,r,n)=>{let i=e.length>2,s=Kt(r[3]),o=Kt(r[2]),u=fe.size(r)/s/o,d=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/s],f=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/s],h=[r[0],r[1],r[2],r[3]/s],m=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];$n(t,m),m.push(...st(d,f,h));let g=(o-1)*t.strides[1]+f[1],v=_=>{let $=rt("output",e[0].dataType,h.length,s),L=lr($.type.tensor),T=xn(t,$.type.value,L),b=be("x",e[0].dataType,d.length,s),N=be("w",e[1].dataType,f.length,s),B=[b,N];i&&B.push(be("b",e[2].dataType,e[2].dims,s));let W=i?"value += b[output_channel];":"",ae=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return En(t,ae),`
  ${_.registerUniforms(ae).declareVariables(...B,$)}
  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${b.type.value}, ${g}>;
    var values: array<${$.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${f[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${g}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${b.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${b.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${f[1]}; w_width++) {
          let w_val = ${N.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${W}
      ${T}
      ${$.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${s};${o};${g};${f[0]};${f[1]}`,inputDependencies:i?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:m}),getShaderSource:v}}}),Ch,Yo,Oh,Qo,Wd,id,Rh,zh,qd,h1=Fe(()=>{_t(),f1(),c1(),_f(),p1(),kn(),vf(),Wa(),Ch=(e,t,r,n,i,s)=>{let o=e[0],u=e.slice(s?1:2,s?3:4),d=u.length,f=t[0],h=t.slice(2).map((g,v)=>g+(g-1)*(r[v]-1)),m=u.map((g,v)=>g+n[v]+n[v+d]).map((g,v)=>Math.floor((g-h[v]+i[v])/i[v]));return m.splice(0,0,o),m.splice(s?3:1,0,f),m},Yo=[2,3,1,0],Oh=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[1]*t.group;if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let i=e[0].dims.length-2;if(t.dilations.length!==i)throw new Error(`dilations should be ${i}D`);if(t.strides.length!==i)throw new Error(`strides should be ${i}D`);if(t.pads.length!==i*2)throw new Error(`pads should be ${i*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Qo=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let s=2;s<t[1].dims.length;++s)r[s-2]===0&&(r[s-2]=t[1].dims[s]);let n=e.pads.slice();fu.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,n,e.format==="NHWC",e.autoPad);let i=Object.assign({},e);return Object.assign(i,{kernelShape:r,pads:n}),i},Wd=e=>{let t=mf(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],i=e.dilations,s=e.group,o=e.kernel_shape,u=e.pads,d=e.strides,f=e.w_is_const();return{autoPad:n,format:r,dilations:i,group:s,kernelShape:o,pads:u,strides:d,wIsConst:f,...t,cacheKey:`${e.format};${t.activation};`}},id=(e,t,r,n)=>{let i=r.format==="NHWC",s=Ch(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,i);if(r.group!==1){let ae=[t[0]];if(i){let Q=e.kernelCustomData.wT??e.compute(Rr(t[1],Yo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=Q),ae.push(Q)}else ae.push(t[1]);t.length===3&&ae.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&i&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(Hv(ae,r,s,n),{inputs:ae}):e.compute(qv(ae,r,s,n),{inputs:ae});return}let o=t.length===3,u=t[0].dims[i?1:2],d=t[0].dims[i?2:3],f=t[0].dims[i?3:1],h=t[1].dims[2],m=t[1].dims[3],g=s[i?1:2],v=s[i?2:3],_=s[i?3:1],$=i&&h===u&&m===d&&r.pads[0]===0&&r.pads[1]===0;if($||h===1&&m===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let ae=s[0],Q,ge,ze,Xe=[];if(i){let F=e.kernelCustomData.wT??e.compute(Rr(t[1],Yo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=F),$){let R=u*d*f;Q=t[0].reshape([1,ae,R]),ge=F.reshape([1,R,_]),ze=[1,ae,_]}else Q=t[0].reshape([ae,u*d,f]),ge=F.reshape([1,f,_]),ze=[ae,g*v,_];Xe.push(Q),Xe.push(ge)}else Q=t[0].reshape([ae,f,u*d]),ge=t[1].reshape([1,_,f]),ze=[ae,_,g*v],Xe.push(ge),Xe.push(Q);o&&Xe.push(t[2]);let nt=ze[2],Je=Xe[0].dims[Xe[0].dims.length-1];nt<8&&Je<8?e.compute(yf(Xe,r,s,ze,i,n),{inputs:Xe}):e.compute(pu(Xe,r,s,ze,i,n),{inputs:Xe});return}let L=!0,T=e.kernelCustomData.wT??e.compute(Rr(t[1],Yo),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=T);let b=[t[0],T];o&&b.push(t[2]);let N=i?g*v:_,B=i?_:g*v,W=h*m*f;e.compute(Uv(b,r,s,N,B,W,o,L,n),{inputs:b})},Rh=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let i=[0,t.pads[0],0,t.pads[1]],s=[1].concat(t.strides),o=[1].concat(t.dilations),u=[1].concat(t.kernelShape),d=Qo({...t,pads:i,strides:s,dilations:o,kernelShape:u},n);id(e,n,d,f=>r?[f[0],f[2],f[3]]:[f[0],f[1],f[3]])},zh=(e,t,r)=>{let n=r.format==="NHWC"?"channelsLast":"channelsFirst",i=Qo(r,t),s=r.autoPad==="NOTSET"?r.pads:r.autoPad,o=Vv(t[0].dims,t[1].dims,r.strides,r.dilations,s,!1,n);e.compute(Wv(t,i,o.outShape,[o.filterDepth,o.filterHeight,o.filterWidth],[o.padInfo.front,o.padInfo.top,o.padInfo.left],n))},qd=(e,t)=>{if(Oh(e.inputs,t),e.inputs[0].dims.length===3)Rh(e,t);else if(e.inputs[0].dims.length===5)zh(e,e.inputs,t);else{let r=Qo(t,e.inputs);id(e,e.inputs,r)}}}),jv,m1=Fe(()=>{ct(),$a(),_t(),xt(),jv=(e,t,r)=>{let n=e.length>2,i=t.outputShape,s=t.format==="NHWC",o=t.group,u=e[1].dims,d=u[2]/o,f=u[3],h=s?Kt(d):1,m=s&&f===1&&d>=4,g=m?Math.floor(d/4)*4:Math.floor(d/h)*h,v=d-g,_=s?Kt(f):1,$=s?f===1?h:_:1,L=fe.size(i)/_,T=[Math.ceil(L/64),1,1];Ot("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${T}`);let b=["rank","rank"],N=[t.strides[0],t.strides[1]],B=[t.kernelShape[s?1:2],t.kernelShape[s?2:3]],W=[t.dilations[0],t.dilations[1]],ae=[B[0]+(t.dilations[0]<=1?0:(t.kernelShape[s?1:2]-1)*(t.dilations[0]-1)),B[1]+(t.dilations[1]<=1?0:(t.kernelShape[s?2:3]-1)*(t.dilations[1]-1))],Q=[ae[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),ae[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],ge=[{type:12,data:L},{type:12,data:N},{type:12,data:B},{type:12,data:W},{type:12,data:ae},{type:6,data:Q},{type:12,data:g},{type:12,data:d},{type:12,data:f},...st(e[0].dims,e[1].dims)];n&&(ge.push(...st(e[2].dims)),b.push("rank")),ge.push(...st(i));let ze=Xe=>{let nt=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:N.length},{name:"filter_dims",type:"u32",length:B.length},{name:"dilations",type:"u32",length:B.length},{name:"effective_filter_dims",type:"u32",length:ae.length},{name:"pads",type:"i32",length:Q.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],Je=lr(e[0].dataType),F=s?1:2,R=s?2:3,te=s?3:1,U=be("W",e[1].dataType,e[1].dims.length,$),J=be("Dy",e[0].dataType,e[0].dims.length,h),$e=[J,U];n&&$e.push(be("bias",e[2].dataType,[i[te]].length,_));let Oe=rt("result",e[0].dataType,i.length,_),He=()=>{let Ve="";if(m)h===4?Ve+=`
        let xValue = ${J.getByOffset("x_offset")};
        let wValue = ${U.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:h===2?Ve+=`
          dotProd = dotProd + dot(vec4<${Je}>(${J.getByOffset("x_offset")}, ${J.getByOffset("x_offset + 1u")}), vec4<${Je}>(${U.getByOffset("w_offset")}, ${U.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:h===1&&(Ve+=`
          dotProd = dotProd + dot(vec4<${Je}>(${J.getByOffset("x_offset")}, ${J.getByOffset("x_offset + 1u")}, ${J.getByOffset("x_offset + 2u")}, ${J.getByOffset("x_offset + 3u")}), vec4<${Je}>(${U.getByOffset("w_offset")}, ${U.getByOffset("w_offset + 1u")}, ${U.getByOffset("w_offset + 2u")}, ${U.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(Ve+=`
                  let xValue = ${s?J.getByOffset(`${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h}`):J.get("batch","inputChannel","idyR","idyC")};
        `,h===1)Ve+=`
          let w_offset = ${U.indicesToOffset(`${U.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${U.getByOffset(`w_offset / ${$}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let de=0;de<h;de++)Ve+=`
            let wValue${de} = ${U.getByOffset(`${U.indicesToOffset(`${U.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${de}, wOutChannel)`)} / ${$}`)};
            dotProd = dotProd + xValue[${de}] * wValue${de};`;return Ve},ie=()=>{if(v===0)return"";if(!m)throw new Error(`packInputAs4 ${m} is not true.`);let Ve="";if(h===1){Ve+="dotProd = dotProd";for(let de=0;de<v;de++)Ve+=`
            + ${J.getByOffset(`x_offset + ${de}`)} * ${U.getByOffset(`w_offset + ${de}`)}`;Ve+=";"}else if(h===2){if(v!==2)throw new Error(`Invalid inputChannelsRemainder ${v}.`);Ve+=`
          let xValue = ${J.getByOffset("x_offset")};
          let wValue = ${U.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return Ve},me=`
            let outputIndices = ${Oe.offsetToIndices(`global_idx * ${_}`)};
            let batch = ${Oe.indicesGet("outputIndices",0)};
            let d1 = ${Oe.indicesGet("outputIndices",te)};
            let r = ${Oe.indicesGet("outputIndices",F)};
            let c = ${Oe.indicesGet("outputIndices",R)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${Oe.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${Je}(dyRCorner) + ${Je}(wR)) / ${Je}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${Je}(uniforms.Dy_shape[${F}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${Je}(dyCCorner) + ${Je}(wC)) / ${Je}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${Je}(uniforms.Dy_shape[${R}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${m?`
                var x_offset = ${J.indicesToOffset(`${J.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${h};
                var w_offset = ${U.indicesToOffset(`${U.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${$};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${m?4:h}) {
                  ${He()}
                  inputChannel = inputChannel + ${m?4:h};
                }
                ${ie()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${n?` + bias[d1 / ${_}]`:""};
            ${Oe.setByOffset("global_idx","value")};
          `;return`
    ${Xe.registerUniforms(nt).declareVariables(...$e,Oe)}
      ${Xe.mainStart()}
      ${Xe.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${me}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${h}${$}${_}${m}${v}`,inputDependencies:b},getRunData:()=>({dispatchGroup:{x:T[0],y:T[1],z:T[2]},outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],programUniforms:ge}),getShaderSource:ze}}}),Bh,Lh,Mh,sd,Kv,Nh,od,Dh,Xv,g1=Fe(()=>{m1(),kn(),Wa(),Bh=(e,t,r,n,i,s)=>(e-1)*t+r+(n-1)*i+1-s,Lh=(e,t,r,n,i)=>{let s=Math.floor(e/2);t==="SAME_UPPER"?(r[n]=s,r[i]=e-s):t==="SAME_LOWER"&&(r[n]=e-s,r[i]=s)},Mh=(e,t,r,n,i,s,o,u,d,f)=>{let h=e.length-2,m=f.length===0;d.length<h&&d.push(...Array(h-d.length).fill(0));let g=e[0],v=t[u?3:1]*i;for(let _=0,$=e.length-h-(u?1:0);_<h;++_,++$){let L=e[$],T=m?L*o[_]:f[_],b=Bh(L,o[_],s[_],t[$],r[_],T);Lh(b,n,s,_,_+h),m&&f.push(o[_]*(L-1)+d[_]+(t[$]-1)*r[_]+1-s[_]-s[_+h])}f.splice(0,0,g),f.splice(u?3:1,0,v)},sd=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((m,g)=>m*g,1)===0){r.length=0;for(let m=2;m<t[1].dims.length;++m)r.push(t[1].dims[m])}let n=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(n?3:1,0,t[1].dims[1]);let i=e.pads.slice(),s=e.outputShape.slice(),o=e.outputPadding.slice(),u=t[0].dims,d=e.dilations.slice();if(d.reduce((m,g)=>m+g,0)===0){let m=t[0].dims.length-2;d=new Array(m).fill(1)}let f=e.strides.slice();if(f.reduce((m,g)=>m+g,0)===0){let m=t[0].dims.length-2;f=new Array(m).fill(1)}Mh(u,r,d,e.autoPad,e.group,i,f,n,o,s);let h=Object.assign({},e);return Object.assign(h,{kernelShape:r,pads:i,outputPadding:o,outputShape:s,dilations:d,strides:f}),h},Kv=e=>{let t=mf(e),r=e.format,n=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],i=e.dilations,s=e.group,o=e.kernelShape,u=e.pads,d=e.strides,f=e.wIsConst(),h=e.outputPadding,m=e.outputShape;return{autoPad:n,format:r,dilations:i,group:s,kernelShape:o,outputPadding:h,outputShape:m,pads:u,strides:d,wIsConst:f,...t,cacheKey:`${e.format};${t.activation};`}},Nh=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],n=e[1].dims[0];if(r!==n)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==i))throw new Error("invalid bias");let s=e[0].dims.length-2;if(t.dilations.reduce((o,u)=>o+u,0)>0&&t.dilations.length!==s)throw new Error(`dilations should be ${s}D`);if(t.strides.reduce((o,u)=>o+u,0)>0&&t.strides.length!==s)throw new Error(`strides should be ${s}D`);if(t.pads.reduce((o,u)=>o+u,0)>0&&t.pads.length!==s*2)throw new Error(`pads should be ${s*2}D`);if(t.outputPadding.length!==s&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${s}D`);if(t.kernelShape.reduce((o,u)=>o+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},od=(e,t,r,n)=>{let i=e.kernelCustomData.wT??e.compute(Rr(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=i);let s=[t[0],i];t.length===3&&s.push(t[2]),e.compute(jv(s,r,n),{inputs:s})},Dh=(e,t)=>{let r=t.format==="NHWC",n=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&n.push(e.inputs[2]);let i=t.kernelShape;(i.length===0||i[0]===0)&&(i=[e.inputs[1].dims[2]]);let s=t.dilations;(s.length===0||s[0]===0)&&(s=[1]);let o=t.strides;(o.length===0||o[0]===0)&&(o=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],o=[1].concat(o),s=[1].concat(s),i=[1].concat(i);let d=t.outputPadding;d=[0].concat(d);let f=sd({...t,pads:u,strides:o,dilations:s,kernelShape:i,outputPadding:d},n);od(e,n,f,h=>r?[h[0],h[2],h[3]]:[h[0],h[1],h[3]])},Xv=(e,t)=>{if(Nh(e.inputs,t),e.inputs[0].dims.length===3)Dh(e,t);else{let r=sd(t,e.inputs);od(e,e.inputs,r)}}}),Ph,Yv,Qv,y1=Fe(()=>{ct(),_t(),Zt(),xt(),Ph=(e,t,r,n)=>{let i=fe.size(t),s=t.length,o=be("input",e,s),u=rt("output",e,s),d=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),f=fe.normalizeAxis(d,s),h=m=>{let g=` i32(${o.indicesGet("inputIndices","uniforms.axis")}) `,v=at("uniforms.input_shape","uniforms.axis",s),_=n.reverse?g+(n.exclusive?" + 1":""):"0",$=n.reverse?v:g+(n.exclusive?"":" + 1");return`
                ${m.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(o,u)}
                ${m.mainStart()}
                  ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${_};
                  let last : i32 = ${$};
                  for (var i : i32 = first; i < last; i++) {
                    ${o.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${o.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},{type:12,data:f},...st(t,t)]}),getShaderSource:h}},Yv=(e,t)=>{let r=e.inputs[0].dims,n=e.inputs[0].dataType,i=e.inputs[1];e.compute(Ph(n,r,i,t),{inputs:[0]})},Qv=e=>{let t=e.exclusive===1,r=e.reverse===1;return Lt({exclusive:t,reverse:r})}}),Gh,Fh,Uh,Zv,Jv,v1=Fe(()=>{ct(),_t(),Zt(),xt(),Gh=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},Fh=(e,t,r,n)=>{let i=[];i.push(`fn perm(i: ${n.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let s=0;s<t;++s)i.push(r.indicesSet("a",e[s],`i[${s}]`));return i.push("return a;}"),i.join(`
`)},Uh=(e,t)=>{let r,n,i,s,o,u,d=t.format==="NHWC",f=t.blocksize,h=t.mode==="DCR";d?([r,n,i,s]=e.dims,o=h?[r,n,i,f,f,s/f**2]:[r,n,i,s/f**2,f,f],u=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,n,i,s]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],o=h?[r,f,f,s/f**2,n,i]:[r,s/f**2,f,f,n,i],u=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let m=e.reshape(o),g=m.dims.length,v=e.dataType,_=be("a",v,g),$=rt("output",v,g),L=T=>`
  ${T.registerUniform("output_size","u32").declareVariables(_,$)}

  ${Fh(u,g,_,$)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:T=>{let b=d?[r,n*f,i*f,s/f**2]:[r,s/f**2,n*f,i*f],N=fe.size(b),B=m.dims,W=fe.sortBasedOnPerm(B,u);return{outputs:[{dims:b,dataType:T[0].dataType}],dispatchGroup:{x:Math.ceil(N/64)},programUniforms:[{type:12,data:N},...st(B,W)]}},getShaderSource:L}},Zv=(e,t)=>{Gh(e.inputs),e.compute(Uh(e.inputs[0],t))},Jv=e=>Lt({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Zo,hs,ud,Vh,Wh,qh,Hh,ld,jh,e_,t_,_1=Fe(()=>{ct(),_t(),Zt(),xt(),Zo="[a-zA-Z]|\\.\\.\\.",hs="("+Zo+")+",ud="^"+hs+"$",Vh="("+hs+",)*"+hs,Wh="^"+Vh+"$",qh=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},Hh=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,n]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(Wh)))throw new Error("Invalid LHS term");if(r.split(",").forEach((i,s)=>{let o=e[s].dims.slice();if(!i.match(RegExp(ud)))throw new Error("Invalid LHS term");let u=this.processTerm(i,!0,o,s);this.lhs.push(u)}),n==="")n+=[...this.symbolToInfo.entries()].filter(([i,s])=>s.count===1||i==="...").map(([i])=>i).join("");else if(!n.match(RegExp(hs)))throw new Error("Invalid RHS");n.match(RegExp(Zo,"g"))?.forEach(i=>{if(i==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let s=this.symbolToInfo.get(i);if(s===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(s.dimValue)}}),this.rhs=this.processTerm(n,!1,this.outputDims)}addSymbol(e,t,r){let n=this.symbolToInfo.get(e);if(n!==void 0){if(n.dimValue!==t&&n.count!==1)throw new Error("Dimension mismatch");n.count++,n.inputIndices.push(r)}else n={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,n)}processTerm(e,t,r,n=-1){let i=r.length,s=!1,o=[],u=0;if(!e.match(RegExp(ud))&&!t&&e!=="")throw new Error("Invalid LHS term");let d=e.match(RegExp(Zo,"g")),f=new qh(n);return d?.forEach((h,m)=>{if(h==="..."){if(s)throw new Error("Only one ellipsis is allowed per input term");s=!0;let g=i-d.length+1;if(g<0)throw new Error("Ellipsis out of bounds");if(o=r.slice(u,u+g),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=o;else throw new Error("Ellipsis must be specified in the LHS");for(let v=0;v<o.length;v++){let _=String.fromCharCode(48+v);f.addSymbol(_,m+v),this.addSymbol(_,r[u++],n)}}else f.addSymbol(h,m+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(h,r[u++],n)}),f}},ld=e=>e+"_max",jh=(e,t,r,n)=>{let i=e.map(f=>f.length).map((f,h)=>be(`input${h}`,t,f)),s=fe.size(n),o=rt("output",t,n.length),u=[...r.symbolToInfo.keys()].filter(f=>!r.rhs.symbolToIndices.has(f)),d=f=>{let h=[],m="var prod = 1.0;",g="var sum = 0.0;",v="sum += prod;",_=[],$=[],L=[],T=[],b=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((B,W)=>{if(r.rhs.symbolToIndices.has(W)){let ae=r.rhs.symbolToIndices.get(W)?.[0];ae!==void 0&&r.lhs.forEach((Q,ge)=>{if(B.inputIndices.includes(ge)){let ze=Q.symbolToIndices.get(W);if(ze===void 0)throw new Error("Invalid symbol error");ze.forEach(Xe=>{h.push(`${i[ge].indicesSet(`input${ge}Indices`,Xe,o.indicesGet("outputIndices",ae))}`)})}})}else r.lhs.forEach((ae,Q)=>{if(B.inputIndices.includes(Q)){let ge=ae.symbolToIndices.get(W);if(ge===void 0)throw new Error("Invalid symbol error");ge.forEach(ze=>{_.push(`${i[Q].indicesSet(`input${Q}Indices`,ze,`${W}`)}`)}),T.push(`prod *= ${i[Q].getByIndices(`input${Q}Indices`)};`)}}),$.push(`for(var ${W}: u32 = 0; ${W} < uniforms.${ld(W)}; ${W}++) {`),L.push("}")});let N=b?[...h,`let sum = ${i.map((B,W)=>B.getByIndices(`input${W}Indices`)).join(" * ")};`]:[...h,g,...$,..._,m,...T,v,...L];return`
            ${f.registerUniforms(u.map(B=>({name:`${ld(B)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...i,o)}

            ${f.mainStart()}
            ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${o.offsetToIndices("global_idx")};
            ${i.map((B,W)=>`var input${W}Indices: ${i[W].type.indices};`).join(`
`)}
            ${N.join(`
`)};
            ${o.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let f=u.filter(m=>r.symbolToInfo.has(m)).map(m=>({type:12,data:r.symbolToInfo.get(m)?.dimValue||0}));f.push({type:12,data:s});let h=e.map((m,g)=>[...st(m)]).reduce((m,g)=>m.concat(g),f);return h.push(...st(n)),{outputs:[{dims:n,dataType:t}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:h}},getShaderSource:d}},e_=(e,t)=>{let r=new Hh(e.inputs,t.equation),n=r.outputDims,i=e.inputs.map((s,o)=>s.dims);e.compute(jh(i,e.inputs[0].dataType,r,n))},t_=e=>{let t=e.equation.replace(/\s+/g,"");return Lt({equation:t})}}),Kh,dd,Xh,Yh,r_,b1=Fe(()=>{ct(),_t(),xt(),Kh=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=r.length<t.length?0:r.length-t.length,i=t.length<r.length?0:t.length-r.length;for(;n<r.length&&i<t.length;++n,++i)if(r[n]!==t[i]&&r[n]!==1&&t[i]!==1)throw new Error("Expand requires shape to be broadcastable to input")},dd=(e,t)=>{let r=e.length-t.length,n=[];for(let i=0;i<r;++i)n.push(e[i]);for(let i=0;i<t.length;++i)n.push(t[i]===1?e[i+r]:t[i]);return n},Xh=(e,t)=>e.length>t.length?dd(e,t):dd(t,e),Yh=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),n=Xh(t,r),i=e[0].dataType,s=i===9||fe.size(t)===1,o=i===9||t.length>0&&t[t.length-1]%4===0?4:1,u=s||n.length>0&&n[n.length-1]%4===0?4:1,d=Math.ceil(fe.size(n)/u),f=m=>{let g=be("input",i,t.length,o),v=rt("output",i,n.length,u),_;if(i===9){let $=(L,T,b="")=>`
          let outputIndices${T} = ${v.offsetToIndices(`outputOffset + ${T}u`)};
          let offset${T} = ${g.broadcastedIndicesToOffset(`outputIndices${T}`,v)};
          let index${T} = offset${T} / 4u;
          let component${T} = offset${T} % 4u;
          ${L}[${T}] = ${b}(${g.getByOffset(`index${T}`)}[component${T}]);
        `;_=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${$("data",0,"u32")}
        ${$("data",1,"u32")}
        ${$("data",2,"u32")}
        ${$("data",3,"u32")}
        ${v.setByOffset("global_idx","data")}
      }`}else _=`
        let outputIndices = ${v.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${g.broadcastedIndicesToOffset("outputIndices",v)};
        let data = ${v.type.value}(${g.getByOffset(`inputOffset / ${o}`)});
        ${v.setByOffset("global_idx","data")}
      }`;return`
    ${m.registerUniform("vec_size","u32").declareVariables(g,v)}
    ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${_}`},h=[{type:12,data:d},...st(t,n)];return{name:"Expand",shaderCache:{hint:`${n.length};${o}${u}`,inputDependencies:["rank"]},getShaderSource:f,getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:h})}},r_=e=>{Kh(e.inputs),e.compute(Yh(e.inputs),{inputs:[0]})}}),Qh,a_,w1=Fe(()=>{ct(),_t(),xt(),hf(),Qh=e=>{let t=e[0].dataType,r=fe.size(e[0].dims),n=fe.size(e[1].dims),i=n%4===0,s=o=>{let u=be("x",t,[1],4),d=be("bias",t,[1],4),f=rt("y",t,[1],4),h=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],m=v=>`
      let bias${v}_offset: u32 = (global_idx * 4 + ${v}) % uniforms.bias_size;
      let bias${v} = ${d.getByOffset(`bias${v}_offset / 4`)}[bias${v}_offset % 4];`,g=i?`
      let bias = ${d.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${m(0)}${m(1)}${m(2)}${m(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${o.registerUniforms(h).declareVariables(u,d,f)}

    ${Gd(wr(t))}

    ${o.mainStart(li)}
      ${o.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${g}
      let x_in = x + bias;
      ${f.setByOffset("global_idx",Fd("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${i}`,inputDependencies:["type","type"]},getShaderSource:s,getRunData:o=>({outputs:[{dims:o[0].dims,dataType:o[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:n}],dispatchGroup:{x:Math.ceil(r/li/4)}})}},a_=e=>{e.inputs.length<2||fe.size(e.inputs[1].dims)===0?$v(e):e.compute(Qh(e.inputs))}}),Zh,Jh,n_,i_,x1=Fe(()=>{ct(),_t(),Zt(),xt(),Zh=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Jh=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=r.length,s=fe.normalizeAxis(t.axis,i),o=r.slice(0);o.splice(s,1,...n);let u=r[s],d=e[0].dataType===9?4:1,f=Math.ceil(fe.size(o)/d),h=[{type:12,data:f},{type:6,data:u},{type:12,data:s},...st(e[0].dims,e[1].dims,o)],m=g=>{let v=be("data",e[0].dataType,e[0].dims.length,d),_=be("inputIndices",e[1].dataType,e[1].dims.length),$=rt("output",e[0].dataType,o.length,d),L=b=>{let N=n.length,B=`var indicesIndices${b}  = ${_.type.indices}(0);`;for(let W=0;W<N;W++)B+=`${N>1?`indicesIndices${b}[${W}]`:`indicesIndices${b}`} = ${o.length>1?`outputIndices${b}[uniforms.axis + ${W}]`:`outputIndices${b}`};`;B+=`
          var idx${b} = ${_.getByIndices(`indicesIndices${b}`)};
          if (idx${b} < 0) {
            idx${b} = idx${b} + uniforms.axisDimLimit;
          }
          var dataIndices${b} : ${v.type.indices};
        `;for(let W=0,ae=0;W<i;W++)W===s?(B+=`${i>1?`dataIndices${b}[${W}]`:`dataIndices${b}`} = u32(idx${b});`,ae+=N):(B+=`${i>1?`dataIndices${b}[${W}]`:`dataIndices${b}`} = ${o.length>1?`outputIndices${b}[${ae}]`:`outputIndices${b}`};`,ae++);return B},T;if(e[0].dataType===9){let b=(N,B,W="")=>`
          let outputIndices${B} = ${$.offsetToIndices(`outputOffset + ${B}u`)};
          ${L(B)};
          let offset${B} = ${v.indicesToOffset(`dataIndices${B}`)};
          let index${B} = offset${B} / 4u;
          let component${B} = offset${B} % 4u;
          ${N}[${B}] = ${W}(${v.getByOffset(`index${B}`)}[component${B}]);
        `;T=`
        let outputOffset = global_idx * ${d};
        var value = vec4<u32>(0);
        ${b("value",0,"u32")}
        ${b("value",1,"u32")}
        ${b("value",2,"u32")}
        ${b("value",3,"u32")}
        ${$.setByOffset("global_idx","value")}
      `}else T=`
      let outputIndices = ${$.offsetToIndices("global_idx")};
      ${L("")};
      let value = ${v.getByIndices("dataIndices")};
      ${$.setByOffset("global_idx","value")};
      `;return`
      ${g.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(v,_,$)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${T}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:h}),getShaderSource:m}},n_=e=>Lt({axis:e.axis}),i_=(e,t)=>{let r=e.inputs;Zh(r),e.compute(Jh(e.inputs,t))}}),em,s_,o_,$1=Fe(()=>{ct(),_t(),xt(),em=(e,t,r,n,i,s,o,u,d)=>{let f=[{type:12,data:s},{type:12,data:n},{type:12,data:i},{type:12,data:r},{type:12,data:o},{type:12,data:u},{type:12,data:d}],h=[s];f.push(...st(t.dims,h));let m=g=>{let v=be("indices_data",t.dataType,t.dims.length),_=rt("input_slice_offsets_data",12,1,1),$=[v,_],L=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:i.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${g.registerUniforms(L).declareVariables(...$)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${i.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${i.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:h,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:f}),getShaderSource:m},{inputs:[t],outputs:[-1]})[0]},s_=(e,t)=>{let r=e.inputs,n=r[0].dims,i=r[0].dataType,s=r[1].dims,o=s[s.length-1],u=fe.sizeToDimension(s,s.length-1),d=fe.sizeFromDimension(n,t.batchDims+o),f=fe.sizeToDimension(n,t.batchDims),h=fe.sizeFromDimension(n,t.batchDims),m=u/f,g=new Array(o),v=d;for(let B=0;B<o;++B)g[o-1-B]=v,v*=n[t.batchDims+o-1-B];let _=em(e,r[1],g,t.batchDims,n,u,m,h,o),$=t.batchDims+o;if($>n.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let L=s.slice(0,-1).concat(n.slice($)),T=fe.size(L),b=[{type:12,data:T},{type:12,data:d},...st(r[0].dims,_.dims,L)],N=B=>{let W=be("data",r[0].dataType,r[0].dims.length),ae=be("slice_offsets",12,_.dims.length),Q=rt("output",r[0].dataType,L.length);return`
          ${B.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(W,ae,Q)}
            ${B.mainStart()}
            ${B.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:L,dataType:i}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:b}),getShaderSource:N},{inputs:[r[0],_]})},o_=e=>({batchDims:e.batch_dims,cacheKey:""})}),tm,rm,u_,l_,E1=Fe(()=>{ct(),_t(),Zt(),xt(),tm=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=fe.normalizeAxis(t.quantizeAxis,e[0].dims.length),n=t.blockSize,i=e[0],s=e[2],o=e.length===4?e[3]:void 0;if(s.dims.length!==i.dims.length||!i.dims.map((u,d)=>d===r?Math.ceil(u/n)===s.dims[d]:u===s.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(o){if(o.dataType!==i.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(o.dims.length!==s.dims.length||!o.dims.map((u,d)=>u===s.dims[d]).reduce((u,d)=>u&&d,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},rm=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=r.length,s=fe.normalizeAxis(t.gatherAxis,i),o=fe.normalizeAxis(t.quantizeAxis,i),u=r.slice(0);u.splice(s,1,...n);let d=fe.size(u),f=e[2].dataType,h=e[0].dataType===22,m=[{type:12,data:d},{type:12,data:o},{type:12,data:s},{type:12,data:t.blockSize},...st(...e.map((v,_)=>v.dims),u)],g=v=>{let _=be("data",e[0].dataType,e[0].dims.length),$=be("inputIndices",e[1].dataType,e[1].dims.length),L=be("scales",e[2].dataType,e[2].dims.length),T=e.length>3?be("zeroPoint",e[3].dataType,e[3].dims.length):void 0,b=rt("output",f,u.length),N=[_,$,L];T&&N.push(T);let B=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${v.registerUniforms(B).declareVariables(...N,b)}
        ${v.mainStart()}
        let output_indices = ${b.offsetToIndices("global_idx")};
        var indices_indices = ${$.type.indices}(0);
        ${n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${b.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${$.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${b.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${_.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${b.indicesGet("output_indices","i")};
          ${_.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${$.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[s]};
        }
        ${_.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${b.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${_.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${_.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${_.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${L.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${L.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${L.getByIndices("scale_indices")};
        ${T?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${T.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${T.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${wr(f)}(quantized_data - zero_point) * scale;
        ${b.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((v,_)=>_!==1).map(v=>v.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(v,_)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:f}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:m}),getShaderSource:g}},u_=(e,t)=>{let r=e.inputs;tm(r,t),e.compute(rm(e.inputs,t))},l_=e=>Lt({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),am,nm,d_,f_,S1=Fe(()=>{ct(),_t(),Zt(),xt(),am=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},nm=(e,t)=>{let r=e[0].dims,n=e[0].dataType,i=r.length,s=e[1].dims,o=e[1].dataType,u=fe.normalizeAxis(t.axis,i),d=r[u],f=s.slice(0),h=fe.size(f),m=be("input",n,i),g=be("indicesInput",o,s.length),v=rt("output",n,f.length),_=[{type:12,data:h},{type:6,data:d},{type:12,data:u}];return _.push(...st(r,s,f)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:f,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:_}),getShaderSource:$=>`
      ${$.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(m,g,v)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${v.offsetToIndices("global_idx")};

      var idx = ${g.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${m.type.indices}(outputIndices);
      ${m.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${m.getByIndices("inputIndices")};

      ${v.setByOffset("global_idx","value")};
  }`}},d_=e=>Lt({axis:e.axis}),f_=(e,t)=>{let r=e.inputs;am(r),e.compute(nm(e.inputs,t))}}),im,sm,c_,p_,T1=Fe(()=>{ct(),_t(),xt(),im=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},sm=(e,t)=>{let r=e[0].dims.slice(),n=e[1].dims.slice(),[i,s,o]=dy.getShapeOfGemmResult(r,t.transA,n,t.transB,e.length===3?e[2].dims:void 0),u=[i,s];if(!u)throw new Error("Can't use gemm on the given tensors");let d=16,f=Math.ceil(s/d),h=Math.ceil(i/d),m=!0,g=fe.size(u),v=[{type:12,data:m?f:g},{type:12,data:i},{type:12,data:s},{type:12,data:o},{type:1,data:t.alpha},{type:1,data:t.beta}],_=["type","type"];e.length===3&&(v.push(...st(e[2].dims)),_.push("rank")),v.push(...st(u));let $=T=>{let b="";t.transA&&t.transB?b="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?b="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?b="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(b="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let N=t.alpha===1?"":"value *= uniforms.alpha;",B=be("a",e[0].dataType,e[0].dims),W=be("b",e[1].dataType,e[1].dims),ae=B.type.value,Q=null,ge=[B,W];e.length===3&&(Q=be("c",e[2].dataType,e[2].dims.length),ge.push(Q));let ze=rt("output",e[0].dataType,u.length);ge.push(ze);let Xe=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${T.registerUniforms(Xe).declareVariables(...ge)}

  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${ae}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${b}
    }

    ${N}
    ${Q!=null?`let cOffset = ${Q.broadcastedIndicesToOffset("vec2(m, n)",ze)}; value += ${ae}(uniforms.beta) * ${Q.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},L=T=>{let b=be("a",e[0].dataType,e[0].dims),N=be("b",e[1].dataType,e[1].dims),B=null,W=[b,N];e.length===3&&(B=be("c",e[2].dataType,e[2].dims.length),W.push(B));let ae=rt("output",e[0].dataType,u.length);W.push(ae);let Q=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],ge="",ze="";t.transA&&t.transB?(ze=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${N.type.value}(0);
      }
      `,ge="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(ze=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${N.type.value}(0);
      }
      `,ge="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(ze=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${N.type.value}(0);
      }
      `,ge="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(ze=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${N.type.value}(0);
      }
      `,ge="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let Xe=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${T.registerUniforms(Q).declareVariables(...W)}
  var<workgroup> tile_a: array<array<${b.type.storage}, ${d}>, ${d}>;
  var<workgroup> tile_b: array<array<${N.type.storage}, ${d}>, ${d}>;
  ${T.mainStart([d,d,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${d};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${d};
    let num_tiles = (uniforms.K - 1) / ${d} + 1;
    var k_start = 0u;
    var value = ${ae.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${ze}
      k_start = k_start + ${d};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${d}; k++) {
        ${ge}
      }
      workgroupBarrier();
    }

    ${Xe}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${B!=null?`let cOffset = ${B.broadcastedIndicesToOffset("vec2(m, n)",ae)}; value += ${ae.type.value}(uniforms.beta) * ${B.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return m?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:f*h},programUniforms:v}),getShaderSource:L}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:v}),getShaderSource:$}},c_=e=>{let t=e.transA,r=e.transB,n=e.alpha,i=e.beta;return{transA:t,transB:r,alpha:n,beta:i,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},p_=(e,t)=>{im(e.inputs),e.compute(sm(e.inputs,t))}}),da,ba,hn,mn,om,um,lm,dm,fm,cm,pm,hm,h_,m_,k1=Fe(()=>{ct(),_t(),Zt(),xt(),[da,ba,hn,mn]=[0,1,2,3],om=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},um=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,lm=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,dm=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,fm=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,cm=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${da}] = batch;
     indices[${ba}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${hn}] = u32(r);
            indices[${mn}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${hn}] = u32(clamp(r, 0, H - 1));
          indices[${mn}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${hn}] = gs_reflect(r, border[1], border[3]);
          indices[${mn}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,pm=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${da}], indices[${ba}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${da}], indices[${ba}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${da}], indices[${ba}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${da}], indices[${ba}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${da}], indices[${ba}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${da}], indices[${ba}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,hm=(e,t)=>{let r=be("x",e[0].dataType,e[0].dims.length),n=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],i=be("grid",e[1].dataType,n.length,2),s=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(s=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[da,ba,hn,mn]=[0,3,1,2]);let o=rt("output",e[0].dataType,s.length),u=r.type.value,d=fe.size(s),f=[{type:12,data:d},...st(e[0].dims,n,s)],h=m=>`
  ${m.registerUniform("output_size","u32").declareVariables(r,i,o)}
  ${um}
  ${lm(u)}
  ${dm(t)}
  ${fm(t)}
  ${cm(r,u,t)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${hn}]);
      let W_in = i32(uniforms.x_shape[${mn}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${o.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${da}], indices[${hn}], indices[${mn}]);
      let nxy = ${i.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${pm(o,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:m=>{let g=fe.size(s);return{outputs:[{dims:s,dataType:m[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:f}},getShaderSource:h}},h_=(e,t)=>{om(e.inputs),e.compute(hm(e.inputs,t))},m_=e=>Lt({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Sr,mm,g_,fd,gm,xs,y_,v_=Fe(()=>{ct(),_t(),Zt(),df(),pf(),xt(),Wa(),Sr=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,mm=(e,t)=>{let r=e[0],n=Sr(e,1),i=Sr(e,2),s=Sr(e,3),o=Sr(e,4),u=Sr(e,5),d=Sr(e,6),f=Sr(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let h=r.dims[0],m=r.dims[1],g=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],v=m,_=0,$=0,L=Math.floor(g/t.numHeads);if(d&&f&&fe.size(d.dims)&&fe.size(f.dims)){if(d.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==h||d.dims[1]!==t.numHeads||d.dims[3]!==L)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(f.dims[0]!==h||f.dims[1]!==t.numHeads||f.dims[3]!==L)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==f.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(f.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');_=d.dims[2],$=d.dims[2]}else if(d&&fe.size(d.dims)||f&&fe.size(f.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let T;if(n&&fe.size(n.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(n.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');T=2,v=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==L)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');T=5,v=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==L)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');T=0,v=n.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');T=3}if(s&&fe.size(s.dims)>0){if(s.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(n&&n.dims.length===5&&n.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let b=_+v,N=0;if(o&&fe.size(o.dims)>0){N=8;let Q=o.dims;throw Q.length===1?Q[0]===h?N=1:Q[0]===3*h+2&&(N=3):Q.length===2&&Q[0]===h&&Q[1]===b&&(N=5),N===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let B=!1,W=g;if(i&&fe.size(i.dims)>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(v!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');W=i.dims[2]}else{if(v!==i.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');W=i.dims[1]*i.dims[3],B=!0}}let ae=!1;if(o&&fe.size(o.dims)>0)throw new Error("Key padding mask is not supported");if(u&&fe.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==h||u.dims[1]!==t.numHeads||u.dims[2]!==m||u.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:h,sequenceLength:m,pastSequenceLength:_,kvSequenceLength:v,totalSequenceLength:b,maxSequenceLength:$,inputHiddenSize:0,hiddenSize:g,vHiddenSize:W,headSize:L,vHeadSize:Math.floor(W/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:N,scale:t.scale,broadcastResPosBias:ae,passPastInKv:B,qkvFormat:T}},g_=e=>Lt({...e}),fd=Lt({perm:[0,2,1,3]}),gm=(e,t,r,n,i,s,o)=>{let u=[n,i,s],d=fe.size(u),f=[{type:12,data:d},{type:12,data:o},{type:12,data:s}],h=m=>{let g=rt("qkv_with_bias",t.dataType,u),v=be("qkv",t.dataType,u),_=be("bias",r.dataType,u),$=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${m.registerUniforms($).declareVariables(v,_,g)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:f}),getShaderSource:h},{inputs:[t,r],outputs:[-1]})[0]},xs=(e,t,r,n,i,s,o,u)=>{let d=s;if(o&&fe.size(o.dims)>0){if(n===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return d=gm(e,s,o,t,n,r*i,u),d=d.reshape([t,n,r,i]),r===1||n===1?d:e.compute(Rr(d,fd.perm),{inputs:[d],outputs:[-1]})[0]}else return s.dims.length===3&&(d=s.reshape([t,n,r,i])),r===1||n===1?d:e.compute(Rr(d,fd.perm),{inputs:[d],outputs:[-1]})[0]},y_=(e,t)=>{let r=mm(e.inputs,t),n=e.inputs[0],i=Sr(e.inputs,1),s=Sr(e.inputs,2),o=Sr(e.inputs,3),u=Sr(e.inputs,4),d=Sr(e.inputs,5),f=Sr(e.inputs,6),h=Sr(e.inputs,7);if(n.dims.length===5)throw new Error("Packed QKV is not implemented");if(i?.dims.length===5)throw new Error("Packed KV is not implemented");let m=i&&s&&i.dims.length===4&&s.dims.length===4,g=xs(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,n,o,0);if(m)return ks(e,g,i,s,u,void 0,f,h,d,r);if(!i||!s)throw new Error("key and value must be provided");let v=xs(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,i,o,r.hiddenSize),_=xs(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,s,o,2*r.hiddenSize);ks(e,g,v,_,u,void 0,f,h,d,r)}}),ym,vm,_m,bm,Hd,__,b_,w_=Fe(()=>{ct(),_t(),Zt(),xt(),ym=e=>{if(!e||e.length<1)throw new Error("too few inputs")},vm=(e,t)=>{let r=[],n=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),n=r.length),Lt({numOutputs:n,axis:t.axis,splitSizes:r})},_m=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${at("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,bm=e=>{let t=e.length,r=[];for(let n=0;n<t;++n){let i=e[n].setByIndices("indices","input[global_idx]");t===1?r.push(i):n===0?r.push(`if (output_number == ${n}u) { ${i} }`):n===t-1?r.push(`else { ${i} }`):r.push(`else if (output_number == ${n}) { ${i} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Hd=(e,t)=>{let r=e[0].dims,n=fe.size(r),i=e[0].dataType,s=fe.normalizeAxis(t.axis,r.length),o=new Array(t.numOutputs),u=be("input",i,r.length),d=new Array(t.numOutputs),f=[],h=[],m=0,g=[{type:12,data:n}];for(let _=0;_<t.numOutputs;_++){m+=t.splitSizes[_],d[_]=m;let $=r.slice();$[s]=t.splitSizes[_],h.push($),o[_]=rt(`output${_}`,i,$.length),f.push({dims:h[_],dataType:e[0].dataType})}g.push({type:12,data:d},...st(r,...h));let v=_=>`
  ${_.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",d.length).declareVariables(u,...o)}
  ${_m(d.length)}
  ${bm(o)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",s)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${at("uniforms.size_in_split_axis","output_number - 1u",d.length)};
      ${u.indicesSet("indices",s,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:f,dispatchGroup:{x:Math.ceil(n/64)},programUniforms:g})}},__=(e,t)=>{ym(e.inputs);let r=e.inputs.length===1?t:vm(e.inputs,t);e.compute(Hd(e.inputs,r),{inputs:[0]})},b_=e=>{let t=e.axis,r=e.splitSizes,n=e.numOutputs<0?r.length:e.numOutputs;if(n!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return Lt({axis:t,numOutputs:n,splitSizes:r})}}),wm,hu,x_,$_=Fe(()=>{ct(),_t(),Zt(),xt(),wm=(e,t)=>{let[r,n,i,s]=e,{numHeads:o,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!fe.areEqual(n.dims,[])&&!fe.areEqual(n.dims,[1])&&n.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${n.dims.length}`);if(i.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${i.dims.length}`);if(s.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(!fe.areEqual(i.dims,s.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&o===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let d=r.dims[0],f=r.dims[r.dims.length-2],h=i.dims[0],m=fe.sizeFromDimension(r.dims,1)/f,g=u===0?i.dims[1]*2:m/o;if(u>g)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(n.dims.length===2){if(d!==n.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${n.dims[0]}`);if(f!==n.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${n.dims[1]}`)}if(g/2!==i.dims[1]&&u/2!==i.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${i.dims[1]}`);if(f>h)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},hu=(e,t)=>{let{interleaved:r,numHeads:n,rotaryEmbeddingDim:i,scale:s}=t,o=e[0].dims[0],u=fe.sizeFromDimension(e[0].dims,1),d=e[0].dims[e[0].dims.length-2],f=u/d,h=e[2].dims[1],m=i===0?h*2:f/n,g=new Array(o,d,f/m,m-h),v=fe.computeStrides(g),_=[{type:1,data:s},{type:12,data:g},{type:12,data:v},...e[0].dims.length===3?new Array({type:12,data:[u,f,m,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,m,d*m,1]}):[],...st(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],$=L=>{let T=be("input",e[0].dataType,e[0].dims.length),b=be("position_ids",e[1].dataType,e[1].dims.length),N=be("cos_cache",e[2].dataType,e[2].dims.length),B=be("sin_cache",e[3].dataType,e[3].dims.length),W=rt("output",e[0].dataType,e[0].dims.length);return L.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:g.length},{name:"global_strides",type:"u32",length:v.length},{name:"input_output_strides",type:"u32",length:v.length}]),`
        ${L.declareVariables(T,b,N,B,W)}

        ${L.mainStart(li)}
          let half_rotary_emb_dim = uniforms.${N.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${L.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${b.broadcastedIndicesToOffset("bsnh.xy",rt("",b.type.tensor,2))};
            let position_id =
                u32(${b.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${T.getByOffset("i")} * ${N.get("position_id","bsnh[3]")} -
                ${T.getByOffset("j")} * ${B.get("position_id","bsnh[3]")};
            ${W.setByOffset("i","re")}
            let im = ${T.getByOffset("i")} * ${B.get("position_id","bsnh[3]")} +
                ${T.getByOffset("j")} * ${N.get("position_id","bsnh[3]")};
            ${W.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${W.setByOffset("k",T.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:Lt({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(fe.size(g)/li)},programUniforms:_})}},x_=(e,t)=>{wm(e.inputs,t),e.compute(hu(e.inputs,t))}}),xm,$m,cd,Em,E_,A1=Fe(()=>{Zt(),ct(),pf(),v_(),w_(),Wa(),$_(),xt(),xm=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],n=e[1],i=e[2],s=e[3],o=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,d=r.dims[0],f=r.dims[1],h=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],m=f,g=0,v=!n||n.dims.length===0,_=Math.floor(v?h/(t.numHeads+2*t.kvNumHeads):h/t.numHeads);v&&(h=_*t.numHeads);let $=s&&s.dims.length!==0,L=o&&o.dims.length!==0;if($&&s.dims.length===4&&s.dims[0]===d&&s.dims[1]!==t.kvNumHeads&&s.dims[2]===t.kvNumHeads&&s.dims[3]===_)throw new Error("BSNH pastKey/pastValue is not supported");if($&&L){if(s.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(o.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=s.dims[2]}else if($||L)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let T=1;if(n&&n.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(n.dims.length<3||n.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(n.dims.length===3){if(r.dims[2]%n.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');m=n.dims[1]}else if(n.dims.length===5){if(n.dims[2]!==t.numHeads||n.dims[3]!==2||n.dims[4]!==_)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(i)throw new Error('Expect "value" be none when "key" has packed kv format.');m=n.dims[1]}else{if(n.dims[1]!==t.numHeads||n.dims[3]!==_)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');m=n.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');T=3}let b=0,N=!1,B=t.kvNumHeads?_*t.kvNumHeads:h;if(i&&i.dims.length>0){if(i.dims.length!==3&&i.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(i.dims.length===3){if(m!==i.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');B=i.dims[2]}else{if(m!==i.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');B=i.dims[1]*i.dims[3],N=!0}}let W=e.length>4?e[5]:void 0;if(W&&W.dims.length!==1&&W.dims[0]!==d)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:d,sequenceLength:f,pastSequenceLength:g,kvSequenceLength:m,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:h,vHiddenSize:B,headSize:_,vHeadSize:Math.floor(B/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:N,qkvFormat:T}},$m=Lt({perm:[0,2,1,3]}),cd=(e,t,r)=>{let n=t,i=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(n=t.reshape([r.batchSize,r.kvSequenceLength,i,r.headSize]),n=e.compute(Rr(n,$m.perm),{inputs:[n],outputs:[-1]})[0]),n},Em=(e,t,r,n)=>{let i=7,s=["type","type"],o=[e*t],u=e*t,d=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],f=h=>{let m=be("seq_lens",r.dataType,r.dims),g=be("total_seq_lens",n.dataType,n.dims),v=rt("pos_ids",i,o),_=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${h.registerUniforms(_).declareVariables(m,g,v)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${g.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${m.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${v.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${v.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${v.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:s},getRunData:()=>({outputs:[{dims:o,dataType:i}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:f}},E_=(e,t)=>{let r=xm(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let n=e.inputs[0],i=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,s=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,o=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,d=e.inputs.length>4?e.inputs[5]:void 0,f=e.inputs.length>5?e.inputs[6]:void 0,h=r.kvNumHeads?r.kvNumHeads:r.numHeads,m=Lt({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,h*r.headSize,h*r.headSize]}),[g,v,_]=!i&&!s?e.compute(Hd([n],m),{inputs:[n],outputs:[-1,-1,-1]}):[n,i,s],$,L;if(t.doRotary){let B=e.compute(Em(r.batchSize,r.sequenceLength,d,f),{inputs:[d,f],outputs:[-1]})[0],W=e.inputs[7],ae=e.inputs[8],Q=Lt({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),ge=[g,B,W,ae],ze=[-1];$=e.compute(hu(ge,Q),{inputs:ge,outputs:ze})[0],ge.splice(0,1,v);let Xe=Lt({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});L=e.compute(hu(ge,Xe),{inputs:ge,outputs:ze})[0]}let T=xs(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?$:g,void 0,0),b=cd(e,t.doRotary?L:v,r),N=cd(e,_,r);ks(e,T,b,N,void 0,void 0,o,u,void 0,r,d,f)}}),pd,Sm,Tm,S_,I1=Fe(()=>{ct(),_t(),Wa(),xt(),pd=(e,t,r,n,i,s,o,u)=>{let d=Kt(s),f=d===1?"f32":`vec${d}f`,h=d===1?"vec2f":`mat2x${d}f`,m=i*o,g=64;m===1&&(g=256);let v=[i,o,s/d],_=[i,o,2],$=["rank","type","type"],L=[];L.push(...st(v,_));let T=b=>{let N=be("x",t.dataType,3,d),B=be("scale",r.dataType,r.dims),W=be("bias",n.dataType,n.dims),ae=rt("output",1,3,2),Q=[N,B,W,ae];return`
  var<workgroup> workgroup_shared : array<${h}, ${g}>;
  const workgroup_size = ${g}u;
  ${b.declareVariables(...Q)}
  ${b.mainStart(g)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${f}(0);
    var squared_sum = ${f}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${f}(${N.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${h}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${Va("workgroup_shared[0][0]",d)} / f32(hight * ${d});
      let squared_sum_final = ${Va("workgroup_shared[0][1]",d)} / f32(hight * ${d});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${d};${u};${g}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:_,dataType:1}],dispatchGroup:{x:m},programUniforms:L}),getShaderSource:T},{inputs:[t,r,n],outputs:[-1]})[0]},Sm=(e,t,r)=>{let n=t[0].dims,i=n,s=2,o=n[0],u=n[1],d=fe.sizeFromDimension(n,s),f=Kt(d),h=fe.size(i)/f,m=pd(e,t[0],t[1],t[2],o,d,u,r.epsilon),g=[o,u,d/f],v=[o,u],_=["type","none"],$=L=>{let T=be("x",t[0].dataType,g.length,f),b=be("scale_shift",1,v.length,2),N=rt("output",t[0].dataType,g.length,f),B=[T,b,N];return`
  ${L.registerUniform("output_size","u32").declareVariables(...B)}
  ${L.mainStart()}
  ${L.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${N.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${b.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${T.getByOffset("global_idx")} * ${N.type.value}(scale_shift.x) + ${N.type.value}(scale_shift.y);
      ${N.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${f}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},...st(g,v,g)]}),getShaderSource:$},{inputs:[t[0],m]})},Tm=(e,t,r)=>{let n=t[0].dims,i=n,s=n[0],o=n[n.length-1],u=fe.sizeFromDimension(n,1)/o,d=Kt(o),f=fe.size(i)/d,h=[{type:12,data:u},{type:12,data:Math.floor(o/d)}],m=["type","type"],g=!1,v=[0,n.length-1];for(let T=0;T<n.length-2;T++)g=g||n[T+1]!==1,v.push(T+1);g=g&&n[n.length-1]!==1;let _=g?e.compute(Rr(e.inputs[0],v),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:n.length},(T,b)=>n[v[b]])),$=pd(e,_,t[1],t[2],s,u,o,r.epsilon),L=T=>{let b=lr(t[0].dataType),N=d===1?"vec2f":`mat${d}x2f`,B=Q=>{let ge=Q===0?"x":"y",ze=d===1?"f32":`vec${d}f`;switch(d){case 1:return`${b}(${ze}(scale.${ge}))`;case 2:return`vec2<${b}>(${ze}(scale[0].${ge}, scale[1].${ge}))`;case 4:return`vec4<${b}>(${ze}(scale[0].${ge}, scale[1].${ge}, scale[2].${ge}, scale[3].${ge}))`;default:throw new Error(`Not supported compoents ${d}`)}},W=be("input",t[0].dataType,t[0].dims,d),ae=rt("output",t[0].dataType,i,d);return`
  @group(0) @binding(0) var<storage, read> input : array<${W.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${N}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${ae.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${T.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${B(0)}, ${B(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(f/64)},programUniforms:h}),getShaderSource:L},{inputs:[t[0],$]})},S_=(e,t)=>{t.format==="NHWC"?Tm(e,e.inputs,t):Sm(e,e.inputs,t)}}),km,Am,T_,C1=Fe(()=>{ct(),_t(),xt(),km=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Am=(e,t,r)=>{let n=t.simplified,i=e[0].dims,s=e[1],o=!n&&e[2],u=i,d=fe.normalizeAxis(t.axis,i.length),f=fe.sizeToDimension(i,d),h=fe.sizeFromDimension(i,d),m=fe.size(s.dims),g=o?fe.size(o.dims):0;if(m!==h||o&&g!==h)throw new Error(`Size of X.shape()[axis:] == ${h}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${m} and bias size of ${g}`);let v=[];for(let W=0;W<i.length;++W)W<d?v.push(i[W]):v.push(1);let _=Kt(h),$=["type","type"],L=[{type:12,data:f},{type:1,data:h},{type:12,data:Math.floor(h/_)},{type:1,data:t.epsilon}];o&&$.push("type");let T=r>1,b=r>2,N=W=>{let ae=lr(e[0].dataType),Q=[be("x",e[0].dataType,e[0].dims,_),be("scale",s.dataType,s.dims,_)];o&&Q.push(be("bias",o.dataType,o.dims,_)),Q.push(rt("output",e[0].dataType,u,_)),T&&Q.push(rt("mean_data_output",1,v)),b&&Q.push(rt("inv_std_output",1,v));let ge=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${W.registerUniforms(ge).declareVariables(...Q)}
  ${W.mainStart()}
    ${W.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${Nd("f32",_)};
    var mean_square_vector = ${Nd("f32",_)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${ii(ae,_,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${Va("mean_vector",_)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${Va("mean_square_vector",_)} / uniforms.norm_size ${n?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${ii(ae,_,"x[j + offset]")};
      let f32scale = ${ii(ae,_,"scale[j]")};
      output[j + offset] = ${Q[0].type.value}((f32input ${n?"":"- mean"}) * inv_std_dev * f32scale
        ${o?`+ ${ii(ae,_,"bias[j]")}`:""}
      );
    }

    ${T?"mean_data_output[global_idx] = mean":""};
    ${b?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},B=[{dims:u,dataType:e[0].dataType}];return T&&B.push({dims:v,dataType:1}),b&&B.push({dims:v,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${_};${r};${n}`,inputDependencies:$},getRunData:()=>({outputs:B,dispatchGroup:{x:Math.ceil(f/64)},programUniforms:L}),getShaderSource:N}},T_=(e,t)=>{km(e.inputs),e.compute(Am(e.inputs,t,e.outputCount))}}),Im,k_,O1=Fe(()=>{_t(),vf(),_f(),Im=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},k_=e=>{Im(e.inputs);let t=ui.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],n=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&n<8)e.compute(yf(e.inputs,{activation:""},t));else{let i=t[t.length-2],s=fe.size(e.inputs[0].dims.slice(0,-2)),o=fe.size(e.inputs[1].dims.slice(0,-2));if(s!==1&&i===1&&o===1){let u=e.inputs[0].reshape([1,s,n]),d=e.inputs[1].reshape([1,n,r]),f=[1,s,r],h=[u,d];e.compute(pu(h,{activation:""},t,f),{inputs:h})}else e.compute(pu(e.inputs,{activation:""},t))}}}),Cm,Om,Rm,A_,I_,R1=Fe(()=>{ct(),_t(),Zt(),xt(),Cm=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],n=r.dims.length;if(r.dims[n-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let i=Math.floor((t.k+t.blockSize-1)/t.blockSize),s=t.blockSize/8*t.bits,o=e[1];if(!fe.areEqual(o.dims,[t.n,i,s]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(fe.size(u)!==t.n*i)throw new Error("scales input size error.");if(e.length===4){let d=e[3].dims,f=t.bits>4?t.n*i:t.n*Math.floor((i+1)/2);if(fe.size(d)!==f)throw new Error("zeroPoints input size error.")}},Om=(e,t)=>{let r=e[0].dims,n=r.length,i=r[n-2],s=t.k,o=t.n,u=r.slice(0,n-2),d=fe.size(u),f=e[1].dims[2]/4,h=e[0].dataType,m=Kt(t.k),g=Kt(f),v=Kt(o),_=u.concat([i,o]),$=i>1&&o/v%2===0?2:1,L=fe.size(_)/v/$,T=64,b=[],N=[d,i,s/m],B=fe.convertShape(e[1].dims).slice();B.splice(-1,1,f/g),b.push(...st(N)),b.push(...st(B)),b.push(...st(e[2].dims)),e.length===4&&b.push(...st(fe.convertShape(e[3].dims)));let W=[d,i,o/v];b.push(...st(W));let ae=Q=>{let ge=N.length,ze=be("a",e[0].dataType,ge,m),Xe=be("b",12,B.length,g),nt=be("scales",e[2].dataType,e[2].dims.length),Je=[ze,Xe,nt],F=e.length===4?be("zero_points",12,e[3].dims.length):void 0;F&&Je.push(F);let R=W.length,te=rt("output",e[0].dataType,R,v),U=lr(e[0].dataType),J=(()=>{switch(m){case 1:return`array<${U}, 8>`;case 2:return`mat4x2<${U}>`;case 4:return`mat2x4<${U}>`;default:throw new Error(`${m}-component is not supported.`)}})(),$e=()=>{let ie=`
          // reuse a data
            var input_offset = ${ze.indicesToOffset(`${ze.type.indices}(batch, row, word_offset)`)};
            var a_data: ${J};
            for (var j: u32 = 0; j < ${8/m}; j++) {
              a_data[j] = ${ze.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let me=0;me<v*$;me++)ie+=`
            b_value = ${g===1?`b${me}_data`:`b${me}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${J}(${Array.from({length:4},(Ve,de)=>`${U}(b_value_lower[${de}]), ${U}(b_value_upper[${de}])`).join(", ")});
            b_dequantized_values = ${m===1?`${J}(${Array.from({length:8},(Ve,de)=>`(b_quantized_values[${de}] - ${F?`zero_point${me}`:"zero_point"}) * scale${me}`).join(", ")});`:`(b_quantized_values - ${J}(${Array(8).fill(`${F?`zero_point${me}`:"zero_point"}`).join(",")})) * scale${me};`};
            workgroup_shared[local_id.x * ${$} + ${Math.floor(me/v)}]${v>1?`[${me%v}]`:""} += ${Array.from({length:8/m},(Ve,de)=>`${m===1?`a_data[${de}] * b_dequantized_values[${de}]`:`dot(a_data[${de}], b_dequantized_values[${de}])`}`).join(" + ")};
          `;return ie},Oe=()=>{let ie=`
            var col_index = col * ${v};
            ${F?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${U}(8);`}
            `;for(let me=0;me<v*$;me++)ie+=`
            let scale${me} = ${nt.getByOffset("col_index * nBlocksPerCol + block")};
            ${F?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${F.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${me} = ${U}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return ie},He=()=>{let ie=`col_index = col * ${v};`;for(let me=0;me<v*$;me++)ie+=`
            let b${me}_data = ${Xe.getByIndices(`${Xe.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return ie+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${J};
            var b_dequantized_values: ${J};`,ie};return`
        var<workgroup> workgroup_shared: array<${te.type.value}, ${$*T}>;
        ${Q.declareVariables(...Je,te)}
        ${Q.mainStart([T,1,1])}
          let output_indices = ${te.offsetToIndices(`(global_idx / ${T}) * ${$}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${T}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/m};
            ${Oe()}
            for (var word: u32 = 0; word < ${f}; word += ${g}) {
              ${He()}
              for (var i: u32 = 0; i < ${g}; i++) {
                ${$e()}
                word_offset += ${8/m};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${$}) {
            var output_value: ${te.type.value} = ${te.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${T}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${$};
            }
            ${te.setByIndices(`${te.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${m};${g};${v};${$};${T}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:h}],dispatchGroup:{x:L},programUniforms:b}),getShaderSource:ae}},Rm=(e,t)=>{let r=e[0].dims,n=r.length,i=r[n-2],s=t.k,o=t.n,u=r.slice(0,n-2),d=fe.size(u),f=e[1].dims[2]/4,h=e[0].dataType,m=Kt(t.k),g=Kt(f),v=u.concat([i,o]),_=128,$=o%8===0?8:o%4===0?4:1,L=_/$,T=L*g*8,b=T/m,N=T/t.blockSize,B=fe.size(v)/$,W=[],ae=[d,i,s/m],Q=fe.convertShape(e[1].dims).slice();Q.splice(-1,1,f/g),W.push(...st(ae)),W.push(...st(Q)),W.push(...st(e[2].dims)),e.length===4&&W.push(...st(fe.convertShape(e[3].dims)));let ge=[d,i,o];W.push(...st(ge));let ze=Xe=>{let nt=ae.length,Je=be("a",e[0].dataType,nt,m),F=be("b",12,Q.length,g),R=be("scales",e[2].dataType,e[2].dims.length),te=[Je,F,R],U=e.length===4?be("zero_points",12,e[3].dims.length):void 0;U&&te.push(U);let J=ge.length,$e=rt("output",e[0].dataType,J),Oe=lr(e[0].dataType),He=()=>{switch(m){case 1:return`
          let a_data0 = vec4<${Oe}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${Oe}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${Oe}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${Oe}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${m}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${Je.type.value}, ${b}>;
        var<workgroup> inter_results: array<array<${$e.type.value}, ${L}>, ${$}>;
        ${Xe.declareVariables(...te,$e)}
        ${Xe.mainStart([L,$,1])}
          let output_indices = ${$e.offsetToIndices(`workgroup_index * ${$}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${N} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${b};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${b}; a_offset += ${_})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${Je.getByIndices(`${Je.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${Je.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${N} + local_id.x;
            ${U?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${U.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${Oe}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${Oe}(8);`}
            let scale = ${R.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${F.getByIndices(`${F.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/m};
            for (var i: u32 = 0; i < ${g}; i++) {
              ${He()}
              let b_value = ${g===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${Oe}>(${Array.from({length:4},(ie,me)=>`${Oe}(b_value_lower[${me}]), ${Oe}(b_value_upper[${me}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${Oe}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(ie,me)=>`${`dot(a_data${me}, b_dequantized_values[${me}])`}`).join(" + ")};
              word_offset += ${8/m};
            }
            workgroupBarrier();
          }

          if (local_idx < ${$}) {
            var output_value: ${$e.type.value} = ${$e.type.value}(0);
            for (var b = 0u; b < ${L}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${$e.setByIndices(`${$e.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${m};${g};${L};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:v,dataType:h}],dispatchGroup:{x:B},programUniforms:W}),getShaderSource:ze}},A_=(e,t)=>{Cm(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Rm(e.inputs,t)):e.compute(Om(e.inputs,t))},I_=e=>Lt(e)}),zm,Bm,Lm,Mm,Nm,Dm,Pm,Gm,C_,z1=Fe(()=>{ct(),_t(),xt(),zm=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Bm=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
            k = i32(${e.indicesGet("indices",i)}) - ${at("uniforms.pads",i,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${at("uniforms.x_shape",i,t)})) {
              break;
            }
            offset += k * i32(${at("uniforms.x_strides",i,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${n}
            value = x[offset];
          }
      `},Lm=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${at("uniforms.pads",i,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${at("uniforms.x_shape",i,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${at("uniforms.x_shape",i,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${at("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Mm=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${at("uniforms.pads",i,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${at("uniforms.x_shape",i,t)})) {
                  k = i32(${at("uniforms.x_shape",i,t)}) - 1;
                }
                offset += k * i32(${at("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Nm=(e,t,r)=>{let n="";for(let i=t-1;i>=0;--i)n+=`
                k = i32(${e.indicesGet("indices",i)}) - ${at("uniforms.pads",i,r)};
                if (k < 0)  {
                  k += i32(${at("uniforms.x_shape",i,t)}]);
                }
                if (k >= i32(${at("uniforms.x_shape",i,t)})) {
                  k -= i32(${at("uniforms.x_shape",i,t)});
                }
                offset += k * i32(${at("uniforms.x_strides",i,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${n}
              value = x[offset];
          `},Dm=(e,t,r)=>{switch(r.mode){case 0:return Bm(e,t,r.pads.length);case 1:return Lm(e,t,r.pads.length);case 2:return Mm(e,t,r.pads.length);case 3:return Nm(e,t,r.pads.length);default:throw new Error("Invalid mode")}},Pm=(e,t)=>{let r=fe.padShape(e[0].dims.slice(),t.pads),n=e[0].dims,i=fe.size(r),s=[{type:12,data:i},{type:6,data:t.pads}],o=e.length>=3&&e[2].data;t.mode===0&&s.push({type:o?e[2].dataType:1,data:t.value}),s.push(...st(e[0].dims,r));let u=["rank"],d=f=>{let h=rt("output",e[0].dataType,r.length),m=be("x",e[0].dataType,n.length),g=m.type.value,v=Dm(h,n.length,t),_=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&_.push({name:"constant_value",type:o?g:"f32"}),`
            ${f.registerUniforms(_).declareVariables(m,h)}
            ${f.mainStart()}
            ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${h.offsetToIndices("global_idx")};

            var value = ${g}(0);
            ${v}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${o}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(fe.size(r)/64)},programUniforms:s}),getShaderSource:d}},Gm=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),n=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,i=e[0].dims.length,s=new Int32Array(2*i).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let d=0;d<u.length;d++)s[Number(u[d])]=Number(r[d]),s[Number(u[d])+i]=Number(r[d+u.length])}else r.forEach((u,d)=>s[Number(d)]=Number(u));let o=[];return s.forEach(u=>o.push(u)),{mode:t.mode,value:n,pads:o}}else return t},C_=(e,t)=>{zm(e.inputs);let r=Gm(e.inputs,t);e.compute(Pm(e.inputs,r),{inputs:[0]})}}),ms,hd,md,gd,yd,Fm,Um,vd,_d,O_,R_,bd,z_,B_,wd,L_,M_,N_,D_,B1=Fe(()=>{ea(),ct(),_t(),xt(),ms=e=>{if(Vt.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},hd=(e,t,r)=>{let n=t.format==="NHWC",i=e.dims.slice();n&&i.splice(1,0,i.pop());let s=Object.hasOwnProperty.call(t,"dilations"),o=t.kernelShape.slice(),u=t.strides.slice(),d=s?t.dilations.slice():[],f=t.pads.slice();fu.adjustPoolAttributes(r,i,o,u,d,f);let h=fu.computePoolOutputShape(r,i,u,d,o,f,t.autoPad),m=Object.assign({},t);s?Object.assign(m,{kernelShape:o,strides:u,pads:f,dilations:d,cacheKey:t.cacheKey}):Object.assign(m,{kernelShape:o,strides:u,pads:f,cacheKey:t.cacheKey});let g=h.slice();return g.push(g.splice(1,1)[0]),[m,n?g:h]},md=(e,t)=>{let r=t.format==="NHWC",n=fe.size(e),i=fe.size(t.kernelShape),s=[{type:12,data:n},{type:12,data:i}],o=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],d=t.strides[t.strides.length-1],f=t.pads[t.pads.length/2-1],h=t.pads[t.pads.length-1],m=!!(f+h);s.push({type:12,data:u},{type:12,data:d},{type:12,data:f},{type:12,data:h}),o.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let g=!1;if(t.kernelShape.length===2){let v=t.kernelShape[t.kernelShape.length-2],_=t.strides[t.strides.length-2],$=t.pads[t.pads.length/2-2],L=t.pads[t.pads.length-2];g=!!($+L),s.push({type:12,data:v},{type:12,data:_},{type:12,data:$},{type:12,data:L}),o.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[s,o,!0,m,g]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=fe.computeStrides(t.kernelShape);s.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),o.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let d=t.pads.reduce((f,h)=>f+h);return[s,o,!!d,!1,!1]}},gd=(e,t,r,n,i,s,o,u,d,f,h,m)=>{let g=i.format==="NHWC",v=t.type.value,_=rt("output",t.type.tensor,n);if(i.kernelShape.length<=2){let $="",L="",T="",b=r-(g?2:1);if(h?$=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${b}] < 0 || xIndices[${b}]
                      >= uniforms.x_shape[${b}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`:$=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${s}
                }`,i.kernelShape.length===2){let N=r-(g?3:2);m?L=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${N}] = indices[${N}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${N}] < 0 || xIndices[${N}] >= uniforms.x_shape[${N}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:L=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${N}] = indices[${N}] * uniforms.sh - uniforms.phStart + j;
                `,T=`
              }
            `}return`
            ${e.registerUniforms(d).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var value = ${v}(${u});
              var pad = 0;
              ${L}
              ${$}
              ${T}
              ${o}

              output[global_idx] = value;
            }`}else{if(g)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let $=i.kernelShape.length,L=i.pads.length,T="";return f?T=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${s}
              }`:T=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${s}
            `,`
            ${e.registerUniforms(d).declareVariables(t,_)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${_.offsetToIndices("global_idx")};
              var xIndices = ${_.offsetToIndices("global_idx")};

              var offsets: array<u32, ${$}>;

              var value = ${v}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${$-1}u; j++) {
                  offsets[j] = offset / ${at("uniforms.kernelStrides","j",$)};
                  offset -= offsets[j] * ${at("uniforms.kernelStrides","j",$)};
                }
                offsets[${$-1}] = offset;

                isPad = false;
                for (var j = ${r-$}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${at("uniforms.strides",`j - ${r-$}u`,$)}
                    + offsets[j - ${r-$}u] - ${at("uniforms.pads","j - 2u",L)};
                  ${T}
              }
              ${o}

              output[global_idx] = value;
            }`}},yd=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,Fm=e=>`${yd(e)};${e.countIncludePad}`,Um=e=>`${yd(e)};${e.storageOrder};${e.dilations}`,vd=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),_d=(e,t,r,n)=>{let[i,s]=hd(t,n,r),o=be("x",t.dataType,t.dims.length),u=o.type.value,d="value += x_val;",f="";i.countIncludePad?f+=`value /= ${u}(uniforms.kernelSize);`:f+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[h,m,g,v,_]=md(s,i);h.push(...st(t.dims,s));let $=["rank"];return{name:e,shaderCache:{hint:`${n.cacheKey};${g};${v};${_}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(fe.size(s)/64)},programUniforms:h}),getShaderSource:L=>gd(L,o,t.dims.length,s.length,i,d,f,0,m,g,v,_)}},O_=e=>{let t=e.count_include_pad!==0,r=vd(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let n={countIncludePad:t,...r,cacheKey:""};return{...n,cacheKey:Fm(n)}},R_=(e,t)=>{ms(e.inputs),e.compute(_d("AveragePool",e.inputs[0],!1,t))},bd={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},z_=e=>{let t=e.format;return{format:t,...bd,cacheKey:t}},B_=(e,t)=>{ms(e.inputs),e.compute(_d("GlobalAveragePool",e.inputs[0],!0,t))},wd=(e,t,r,n)=>{let[i,s]=hd(t,n,r),o=`
      value = max(x_val, value);
    `,u="",d=be("x",t.dataType,t.dims.length),f=["rank"],[h,m,g,v,_]=md(s,i);return h.push(...st(t.dims,s)),{name:e,shaderCache:{hint:`${n.cacheKey};${g};${v};${_}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:s,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(fe.size(s)/64)},programUniforms:h}),getShaderSource:$=>gd($,d,t.dims.length,s.length,i,o,u,t.dataType===10?-65504:-1e5,m,g,v,_)}},L_=(e,t)=>{ms(e.inputs),e.compute(wd("MaxPool",e.inputs[0],!1,t))},M_=e=>{let t=e.storage_order,r=e.dilations,n=vd(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(n.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let i={storageOrder:t,dilations:r,...n,cacheKey:""};return{...i,cacheKey:Um(i)}},N_=e=>{let t=e.format;return{format:t,...bd,cacheKey:t}},D_=(e,t)=>{ms(e.inputs),e.compute(wd("GlobalMaxPool",e.inputs[0],!0,t))}}),Vm,Wm,P_,G_,L1=Fe(()=>{ct(),_t(),Zt(),xt(),Vm=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,n)=>r===e[2].dims[n]).reduce((r,n)=>r&&n,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((i,s)=>s===t.axis||i===e[0].dims[s]).reduce((i,s)=>i&&s,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],n=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/n)||t.blockSize>Math.ceil(r/(n-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},Wm=(e,t)=>{let r=fe.normalizeAxis(t.axis,e[0].dims.length),n=e[0].dataType,i=n===3,s=e[0].dims,o=e[1].dataType,u=fe.size(s),d=n===3||n===2,f=d?[Math.ceil(fe.size(e[0].dims)/4)]:e[0].dims,h=e[1].dims,m=e.length>2?e[2]:void 0,g=m?d?[Math.ceil(fe.size(m.dims)/4)]:m.dims:void 0,v=h.length===0||h.length===1&&h[0]===1,_=v===!1&&h.length===1,$=Kt(u),L=v&&(!d||$===4),T=L?$:1,b=L&&!d?$:1,N=be("input",d?12:n,f.length,b),B=be("scale",o,h.length),W=m?be("zero_point",d?12:n,g.length):void 0,ae=rt("output",o,s.length,T),Q=[N,B];W&&Q.push(W);let ge=[f,h];m&&ge.push(g);let ze=[{type:12,data:u/T},{type:12,data:r},{type:12,data:t.blockSize},...st(...ge,s)],Xe=nt=>{let Je=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${nt.registerUniforms(Je).declareVariables(...Q,ae)}
      ${nt.mainStart()}
          ${nt.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${ae.offsetToIndices("global_idx")};

          // Set input x
          ${d?`
            let input = ${N.getByOffset("global_idx / 4")};
            let x_vec = ${i?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${T===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${N.getByOffset("global_idx")};`};

          // Set scale input
          ${v?`let scale_value= ${B.getByOffset("0")}`:_?`
            let scale_index = ${ae.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${B.getByOffset("scale_index")};`:`
            var scale_indices: ${B.type.indices} = output_indices;
            let index = ${B.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${B.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${B.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${W?v?d?`
                let zero_point_input = ${W.getByOffset("0")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${W.getByOffset("0")}`:_?d?`
                let zero_point_index = ${ae.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${W.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${ae.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${W.getByOffset("zero_point_index")};`:d?`
                let zero_point_offset = ${B.indicesToOffset("scale_indices")};
                let zero_point_input = ${W.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${i?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${W.getByIndices("scale_indices")};`:`let zero_point_value = ${d?i?"i32":"u32":N.type.value}(0);`};
      // Compute and write output
      ${ae.setByOffset("global_idx",`${ae.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:W?["rank","rank","rank"]:["rank","rank"]},getShaderSource:Xe,getRunData:()=>({outputs:[{dims:s,dataType:o}],dispatchGroup:{x:Math.ceil(u/T/64),y:1,z:1},programUniforms:ze})}},P_=(e,t)=>{Vm(e.inputs,t),e.compute(Wm(e.inputs,t))},G_=e=>Lt({axis:e.axis,blockSize:e.blockSize})}),qm,Hm,F_,M1=Fe(()=>{ea(),ct(),xt(),qm=(e,t,r)=>{let n=e===t,i=e<t&&r<0,s=e>t&&r>0;if(n||i||s)throw new Error("Range these inputs' contents are invalid.")},Hm=(e,t,r,n)=>{let i=Math.abs(Math.ceil((t-e)/r)),s=[i],o=i,u=[{type:12,data:o},{type:n,data:e},{type:n,data:r},...st(s)],d=f=>{let h=rt("output",n,s.length),m=h.type.value,g=[{name:"outputSize",type:"u32"},{name:"start",type:m},{name:"delta",type:m}];return`
        ${f.registerUniforms(g).declareVariables(h)}
        ${f.mainStart()}
        ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${m}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${n}`},getShaderSource:d,getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u})}},F_=e=>{let t=0,r=0,n=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],n=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],n=e.inputs[2].getFloat32Array()[0]),Vt.webgpu.validateInputContent&&qm(t,r,n),e.compute(Hm(t,r,n,e.inputs[0].dataType),{inputs:[]})}}),jm,xd,$d,Km,U_,V_,N1=Fe(()=>{ct(),_t(),Zt(),xt(),jm=(e,t,r,n)=>{if(e!=="none"&&n!=="i32"&&n!=="u32"&&n!=="f32")throw new Error(`Input ${n} is not supported with reduction ${e}.`);let i=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,s=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return n==="i32"||n==="u32"?`atomicAdd(&${t}, bitcast<${n}>(${r}));`:`
              ${i}bitcast<${n}>(oldValue) + (${r})${s}`;case"max":return n==="i32"||n==="u32"?`atomicMax(&${t}, bitcast<${n}>(${r}));`:`
                ${i}max(bitcast<f32>(oldValue), (${r}))${s}`;case"min":return n==="i32"||n==="u32"?`atomicMin(&${t}, bitcast<${n}>(${r}));`:`${i}min(bitcast<${n}>(oldValue), (${r}))${s}`;case"mul":return`${i}(bitcast<${n}>(oldValue) * (${r}))${s}`;default:throw new Error(`Reduction ${e} is not supported.`)}},xd=(e,t)=>`${e===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[${t?"i - indices_start":"i"}];
    let dim_value = uniforms.output_shape[${t?"i - indices_start":"i"} + uniforms.last_index_dimension];`}
    
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));`,$d=(e,t,r)=>`for (var i = 0u; i < uniforms.num_updates_elements; i++) {
        let value = updates[uniforms.num_updates_elements * ${r?"global_idx":"idx"} + i];
        ${jm(e.reduction,"output[data_offset + i]","value",t)}
      }`,Km=(e,t)=>{let r=e[0].dims,n=e[1].dims,i=r,s=1,o=Math.ceil(fe.size(n)/s),u=n[n.length-1],d=fe.sizeFromDimension(r,u),f=fe.sizeFromDimension(n,0)/u,h=[{type:12,data:o},{type:12,data:u},{type:12,data:d},...st(e[1].dims,e[2].dims,i)],m=g=>{let v=be("indices",e[1].dataType,e[1].dims.length),_=be("updates",e[2].dataType,e[2].dims.length,s),$=t.reduction!=="none"&&t.reduction!==""?yy("output",e[0].dataType,i.length):rt("output",e[0].dataType,i.length,s);return`
      ${g.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(v,_,$)}
      ${g.mainStart()}
        ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    for (var i = 0; i < ${f}; i = i + 1) {
      for (var j = i + 1; j < ${f}; j = j + 1) {
        var index_i = i32(indices[i].x);
        var index_j = i32(indices[j].x);
        if (index_i == index_j) {
          hasDuplicates = true;
          break;
        }
      }
      if (hasDuplicates) {
        break;
      }
    }
  }

  if (${t.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    // Process each index-update pair individually when duplicates exist
    for (var idx = 0u; idx < ${f}u; idx++) {
      var data_offset = 0u;
      for (var i = 0u; i < uniforms.last_index_dimension; i++) {
        var index = i32(indices[idx * uniforms.last_index_dimension + i].x);
        ${xd(r.length,!1)}
      }
      ${$d(t,$.type.value,!1)}
    }
    return;
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  var indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${xd(r.length,!0)}
  }
  ${$d(t,$.type.value,!0)}
  }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:h}),getShaderSource:m}},U_=e=>Lt({reduction:e.reduction}),V_=(e,t)=>{e.compute(Km(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),Xm,Ym,Qm,Ed,Zm,Jm,eg,tg,rg,ag,ng,ig,Sd,sg,og,ug,lg,dg,W_,q_,D1=Fe(()=>{ct(),_t(),Zt(),xt(),Xm=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},Ym=(e,t,r)=>{t.every(i=>i>=0&&i<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let n=new Array(r).fill(1);return t.forEach((i,s)=>n[i]=e[s]),n},Qm=(e,t,r,n,i,s)=>{let[o,u,d]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],f=e[0].dims.length;if(o>0&&e.length>o&&e[o].dims.length>0)e[o].getFloat32Array().forEach(h=>s.push(h));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(h=>n.push(h)),n.length!==0&&n.length!==f&&r>=18&&n.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");Xm(n,t),t.axes.length>0&&Ym(n,t.axes,f).forEach((h,m)=>n[m]=h)}if(d>0&&e.length>d&&e[d].dims.length===1&&e[d].dims[0]>0&&(e[d].getBigInt64Array().forEach(h=>i.push(Number(h))),i.length!==0&&i.length!==f&&r>=18&&i.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof n<"u"&&typeof i<"u"&&n.length>0&&i.length>f)throw new Error("Resize requires only of scales or sizes to be specified")},Ed=(e,t,r,n)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${n}(big / (${r}));
  let fract = ${n}(big % (${r})) / ${n}(${r});
  return whole + fract;
`,Zm=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Ed("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Ed("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Jm=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",eg=(e,t,r)=>{let n=new Array(r).fill(0).concat(new Array(r).fill(1)),i=e.length===0?n:e.slice();return t.length>0?(t.forEach((s,o)=>{n[s]=i[o],n[o+r]=i[t.length+o]}),n):i},tg=(e,t,r,n)=>{let i=[];if(r.length>0)if(n.length>0){if(e.forEach(s=>i.push(s)),Math.max(...n)>e.length)throw new Error("axes is out of bound");n.forEach((s,o)=>i[s]=r[o])}else r.forEach(s=>i.push(s));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");i=e.map((s,o)=>Math.round(s*t[o]))}return i},rg=(e,t,r)=>{let n=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(s=>t[s]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(s=>t[s]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let i=e.slice();return r.axes.length>0?(r.axes.forEach(s=>t[s]=n),r.axes.forEach(s=>i[s]=Math.round(e[s]*t[s]))):(t.fill(n,0,t.length),i.forEach((s,o)=>i[o]=Math.round(s*t[o]))),i},ag=(e,t,r,n,i)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${at("uniforms.scales","i",n)};
        var roi_low = ${at("uniforms.roi","i",i)};
        var roi_hi = ${at("uniforms.roi",`i + ${t.length}`,i)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${at("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${at("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,ng=(e,t,r,n,i,s,o)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${n.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${at("uniforms.scales","i",i)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${at("uniforms.roi","i",s)};
          var roi_hi = ${at("uniforms.roi",`i + ${r.length}`,s)};
          var input_shape_i = ${at("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${at("uniforms.output_shape","i",n.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${o} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,ig=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${at("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Sd=(e,t,r,n)=>e.rank>n?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",sg=(e,t,r,n,i)=>{let[s,o,u,d]=r.length===2?[-1,0,1,-1]:[0,2,3,1],f=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${f} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(row, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${Sd(e,d,s,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${f} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${f} = originalIndices[${o}];
      var col:${f} = originalIndices[${u}];
      ${n?`if (row < 0 || row > (${r[o]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${i};
      }`:""};
      row = max(0, min(row, ${r[o]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${s}])`:"0"};
      var x11: ${f} = getInputValue(batch, channel, row1, col1);
      var x12: ${f} = getInputValue(batch, channel, row1, col2);
      var x21: ${f} = getInputValue(batch, channel, row2, col1);
      var x22: ${f} = getInputValue(batch, channel, row2, col2);
      var dx1: ${f} = abs(row - ${f}(row1));
      var dx2: ${f} = abs(${f}(row2) - row);
      var dy1: ${f} = abs(col - ${f}(col1));
      var dy2: ${f} = abs(${f}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},og=(e,t,r,n,i,s,o,u,d,f)=>{let h=r.length===2,[m,g]=h?[0,1]:[2,3],v=e.type.value,_=$=>{let L=$===m?"row":"col";return`
      fn ${L}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${v} {
        var output_index = ${t.indicesGet("output_indices",$)};
        var originalIdx: ${v} = getOriginalCoordinateFromResizedCoordinate(output_index, ${i[$]},
        ${n[$]}, ${r[$]}, ${s[$]}, ${s[$]} + ${r.length});
        var fractOriginalIdx: ${v} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[$]} - 1))) {
          return ${d};
        }
        var data: array<${v}, 4> = array<${v}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${L}: ${v} = originalIdx + ${v}(i);
          if (${L} < 0 || ${L} >= ${r[$]}) {
            ${f?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${d};`:`${L} = max(0, min(${L}, ${r[$]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",$,`u32(${L})`)};
          data[i + 1] = ${$===m?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(m)};
    ${_(g)};
  fn getCubicInterpolationCoefs(s: ${v}) -> array<${v}, 4> {
    var absS = abs(s);
    var coeffs: array<${v}, 4> = array<${v}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${v} = 1.0 - absS;
    var twoMinusAbsS: ${v} = 2.0 - absS;
    var onePlusAbsS: ${v} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${v}, 4>, coefs: array<${v}, 4>) -> ${v} {
    var coefsSum: ${v} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${v} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},ug=(e,t,r,n,i)=>{let[s,o,u,d,f]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],h=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${h} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",o,`max(0, min(depth, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",d,`max(0, min(width, ${r[d]} - 1))`)};
      ${Sd(e,f,s,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${h} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${h} = originalIndices[${o}];
      var height:${h} = originalIndices[${u}];
      var width:${h} = originalIndices[${d}];
      ${n?`if (depth < 0 || depth > (${r[o]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[d]} - 1)) {
      return ${i};
        }`:""};

    depth = max(0, min(depth, ${r[o]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[d]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${f}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${s}])`:"0"};

      var x111: ${h} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${h} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${h} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${h} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${h} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${h} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${h} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${h} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${h} = abs(depth - ${h}(depth1));
      var dx2: ${h} = abs(${h}(depth2) - depth);
      var dy1: ${h} = abs(height - ${h}(height1));
      var dy2: ${h} = abs(${h}(height2) - height);
      var dz1: ${h} = abs(width - ${h}(width1));
      var dz2: ${h} = abs(${h}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},lg=(e,t,r,n,i,s)=>{let o=e.dims,u=eg(s,t.axes,o.length),d=tg(o,n,i,t.axes),f=n.slice();n.length===0&&(f=o.map((b,N)=>b===0?1:d[N]/b),t.keepAspectRatioPolicy!=="stretch"&&(d=rg(o,f,t)));let h=rt("output",e.dataType,d.length),m=be("input",e.dataType,o.length),g=fe.size(d),v=o.length===d.length&&o.every((b,N)=>b===d[N]),_=t.coordinateTransformMode==="tf_crop_and_resize",$=t.extrapolationValue,L=m.type.value,T=b=>`
      ${v?"":`
      ${Zm(t.coordinateTransformMode,L)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${ig(m,o)};
              ${Jm(t.nearestMode,r,L)};
              ${ng(m,h,o,d,f.length,u.length,_)};
              `;case"linear":return`
              ${ag(h,o,d,f.length,u.length)};
              ${(()=>{if(o.length===2||o.length===4)return`${sg(m,h,o,_,$)}`;if(o.length===3||o.length===5)return`${ug(m,h,o,_,$)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(o.length===2||o.length===4)return`${og(m,h,o,d,f,u,t.cubicCoeffA,_,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${b.registerUniform("output_size","u32").registerUniform("scales","f32",f.length).registerUniform("roi","f32",u.length).declareVariables(m,h)}
      ${b.mainStart()}
        ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${v?"output[global_idx] = input[global_idx];":`
        let output_indices = ${h.offsetToIndices("global_idx")};
        var input_indices: ${m.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${m.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${o.length===2||o.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${f.length>0?t.mode==="cubic"?f:f.length:""}|${i.length>0?i:""}|${u.length>0?u:""}|${v}|${t.mode==="nearest"?o.length:o}`,inputDependencies:["rank"]},getShaderSource:T,getRunData:()=>({outputs:[{dims:d,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},{type:1,data:f},{type:1,data:u},...st(o,d)]})}},dg=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},W_=(e,t)=>{let r=[],n=[],i=[],s=dg(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");Qm(e.inputs,t,s,r,n,i),e.compute(lg(e.inputs[0],t,s,r,n,i),{inputs:[0]})},q_=e=>{let t=e.antialias,r=e.axes,n=e.coordinateTransformMode,i=e.cubicCoeffA,s=e.excludeOutside!==0,o=e.extrapolationValue,u=e.keepAspectRatioPolicy,d=e.mode,f=e.nearestMode===""?"simple":e.nearestMode;return Lt({antialias:t,axes:r,coordinateTransformMode:n,cubicCoeffA:i,excludeOutside:s,extrapolationValue:o,keepAspectRatioPolicy:u,mode:d,nearestMode:f})}}),fg,cg,H_,P1=Fe(()=>{ct(),_t(),xt(),fg=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],n=e[2];if(t.dataType!==r.dataType||t.dataType!==n.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let i=t.dims[t.dims.length-1],s=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==i)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==s)throw new Error("Skip must have the same sequence length as input");if(n.dims.length!==1)throw new Error("Gamma must be 1D");if(n.dims[n.dims.length-1]!==i)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let o=e[3];if(o.dims.length!==1)throw new Error("Beta must be 1D");if(o.dims[o.dims.length-1]!==i)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let o=e[4];if(o.dims.length!==1)throw new Error("Bias must be 1D");if(o.dims[o.dims.length-1]!==i)throw new Error("Bias must have the same hidden size as input")}},cg=(e,t,r,n)=>{let i=t.simplified,s=e[0].dims,o=fe.size(s),u=s,d=o,f=s.slice(-1)[0],h=n?s.slice(0,-1).concat(1):[],m=!i&&e.length>3,g=e.length>4,v=n&&r>1,_=n&&r>2,$=r>3,L=64,T=Kt(f),b=[{type:12,data:d},{type:12,data:T},{type:12,data:f},{type:1,data:t.epsilon}],N=W=>{let ae=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],Q=[be("x",e[0].dataType,e[0].dims,T),be("skip",e[1].dataType,e[1].dims,T),be("gamma",e[2].dataType,e[2].dims,T)];m&&Q.push(be("beta",e[3].dataType,e[3].dims,T)),g&&Q.push(be("bias",e[4].dataType,e[4].dims,T)),Q.push(rt("output",e[0].dataType,u,T)),v&&Q.push(rt("mean_output",1,h)),_&&Q.push(rt("inv_std_output",1,h)),$&&Q.push(rt("input_skip_bias_sum",e[0].dataType,u,T));let ge=lr(e[0].dataType),ze=lr(1,T);return`

      ${W.registerUniforms(ae).declareVariables(...Q)}
      var<workgroup> sum_shared : array<${ze}, ${L}>;
      var<workgroup> sum_squared_shared : array<${ze}, ${L}>;

      ${W.mainStart([L,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${L};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${L};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${L-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${g?"bias[offset1d + i]":ge+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${$?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${ii(ge,T,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${L};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${Va("sum",T)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${Va("square_sum",T)} / f32(uniforms.hidden_size) ${i?"":"- mean * mean"} + uniforms.epsilon);
        ${v?"mean_output[global_idx] = mean;":""}
        ${_?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${i?"":`- ${ge}(mean)`}) *
            ${ge}(inv_std_dev) * gamma[offset1d + i]
            ${m?"+ beta[offset1d + i]":""};
        }
      }`},B=[{dims:u,dataType:e[0].dataType}];return r>1&&B.push({dims:h,dataType:1}),r>2&&B.push({dims:h,dataType:1}),r>3&&B.push({dims:s,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${T};${v};${_};${$}`,inputDependencies:e.map((W,ae)=>"type")},getShaderSource:N,getRunData:()=>({outputs:B,dispatchGroup:{x:Math.ceil(d/f)},programUniforms:b})}},H_=(e,t)=>{fg(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(cg(e.inputs,t,e.outputCount,!1),{outputs:r})}}),pg,gs,hg,Td,mg,gg,j_,K_,G1=Fe(()=>{ct(),_t(),Zt(),xt(),pg=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,n)=>{if(e[n+1].dataType!==6&&e[n+1].dataType!==7)throw new Error(`Input ${n} must be an array of int32 or int64`)})},gs=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(n=>r.push(Number(n)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(n=>r.push(Number(n)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},hg=(e,t)=>{if(e.length>1){let r=gs(e,1),n=gs(e,2),i=gs(e,3);return i.length===0&&(i=[...Array(e[0].dims.length).keys()]),Lt({starts:r,ends:n,axes:i})}else return t},Td=(e,t,r,n,i)=>{let s=e;return e<0&&(s+=r[n[t]]),i[t]<0?Math.max(0,Math.min(s,r[n[t]]-1)):Math.max(0,Math.min(s,r[n[t]]))},mg=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${at("uniforms.input_shape","i",r.length)};
            let steps_i = ${at("uniforms.steps","i",r.length)};
            let signs_i = ${at("uniforms.signs","i",r.length)};
            let starts_i = ${at("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,gg=(e,t)=>{let r=e[0].dims,n=fe.size(r),i=t.axes.length>0?fe.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],s=gs(e,4);s.forEach(T=>T!==0||(()=>{throw new Error("step cannot be 0")})),s.length===0&&(s=Array(i.length).fill(1));let o=t.starts.map((T,b)=>Td(T,b,r,i,s)),u=t.ends.map((T,b)=>Td(T,b,r,i,s));if(i.length!==o.length||i.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(i.length!==r.length)for(let T=0;T<r.length;++T)i.includes(T)||(o.splice(T,0,0),u.splice(T,0,r[T]),s.splice(T,0,1));let d=s.map(T=>Math.sign(T));s.forEach((T,b,N)=>{if(T<0){let B=(u[b]-o[b])/T,W=o[b],ae=W+B*s[b];o[b]=ae,u[b]=W,N[b]=-T}});let f=r.slice(0);i.forEach((T,b)=>{f[T]=Math.ceil((u[T]-o[T])/s[T])});let h={dims:f,dataType:e[0].dataType},m=rt("output",e[0].dataType,f.length),g=be("input",e[0].dataType,e[0].dims.length),v=fe.size(f),_=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:o.length},{name:"signs",type:"i32",length:d.length},{name:"steps",type:"u32",length:s.length}],$=[{type:12,data:v},{type:12,data:o},{type:6,data:d},{type:12,data:s},...st(e[0].dims,f)],L=T=>`
      ${T.registerUniforms(_).declareVariables(g,m)}
        ${mg(g,m,r)}
        ${T.mainStart()}
          ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${m.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${m.setByOffset("global_idx",g.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${d.length}_${o.length}_${s.length}`,inputDependencies:["rank"]},getShaderSource:L,getRunData:()=>({outputs:[h],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:$})}},j_=(e,t)=>{pg(e.inputs,t);let r=hg(e.inputs,t);e.compute(gg(e.inputs,r),{inputs:[0]})},K_=e=>{let t=e.starts,r=e.ends,n=e.axes;return Lt({starts:t,ends:r,axes:n})}}),yg,vg,X_,Y_,F1=Fe(()=>{ct(),_t(),Zt(),Wa(),xt(),yg=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},vg=(e,t)=>{let r=e.inputs[0],n=r.dims,i=fe.size(n),s=n.length,o=fe.normalizeAxis(t.axis,s),u=o<n.length-1,d,f=[];u?(f=Array.from({length:s},(Q,ge)=>ge),f[o]=s-1,f[s-1]=o,d=e.compute(Rr(r,f),{inputs:[r],outputs:[-1]})[0]):d=r;let h=d.dims,m=h[s-1],g=i/m,v=Kt(m),_=m/v,$=64;g===1&&($=256);let L=(Q,ge)=>ge===4?`max(max(${Q}.x, ${Q}.y), max(${Q}.z, ${Q}.w))`:ge===2?`max(${Q}.x, ${Q}.y)`:ge===3?`max(max(${Q}.x, ${Q}.y), ${Q}.z)`:Q,T=be("x",d.dataType,d.dims,v),b=rt("result",d.dataType,d.dims,v),N=T.type.value,B=lr(d.dataType)==="f32"?`var threadMax = ${N}(-3.402823e+38f);`:`var threadMax = ${N}(-65504.0h);`,W=Q=>`
      var<workgroup> rowMaxShared : ${N};
      var<workgroup> rowSumShared : ${N};
      var<workgroup> threadShared : array<${N}, ${$}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${N} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${N}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${Q.registerUniform("packedCols","i32").declareVariables(T,b)}
      ${Q.mainStart($)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${$};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${B}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${N}(${L("threadShared[0]",v)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${N}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${N}(${Va("threadShared[0]",v)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,ae=e.compute({name:"Softmax",shaderCache:{hint:`${v};${$}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:h,dataType:d.dataType}],dispatchGroup:{x:g},programUniforms:[{type:6,data:_}]}),getShaderSource:W},{inputs:[d],outputs:[u?-1:0]})[0];u&&e.compute(Rr(ae,f),{inputs:[ae]})},X_=(e,t)=>{yg(e.inputs),vg(e,t)},Y_=e=>Lt({axis:e.axis})}),kd,_g,bg,wg,Q_,U1=Fe(()=>{ct(),_t(),xt(),kd=e=>Array.from(e.getBigInt64Array(),Number),_g=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(kd(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},bg=(e,t)=>{let r=[];for(let n=0;n<e.length;++n)r.push(e[n]*t[n]);return r},wg=(e,t)=>{let r=e[0].dims,n=t??kd(e[1]),i=bg(r,n),s=fe.size(i),o=e[0].dataType,u=be("input",o,r.length),d=rt("output",o,i.length),f=h=>`
      const inputShape = ${u.indices(...r)};
      ${h.registerUniform("output_size","u32").declareVariables(u,d)}
      ${h.mainStart()}
      ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${d.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${d.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${d.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:[{type:12,data:s},...st(e[0].dims,i)]}),getShaderSource:f}},Q_=e=>{_g(e.inputs),e.compute(wg(e.inputs),{inputs:[0]})}}),xg,$g,Z_,V1=Fe(()=>{ct(),_t(),xt(),xg=(e,t,r,n,i)=>{let s=rt("output_data",i,r.length,4),o=be("a_data",t[1].dataType,t[1].dims.length,4),u=be("b_data",t[2].dataType,t[2].dims.length,4),d=be("c_data",t[0].dataType,t[0].dims.length,4),f,h=(m,g,v)=>`select(${g}, ${m}, ${v})`;if(!n)f=s.setByOffset("global_idx",h(o.getByOffset("global_idx"),u.getByOffset("global_idx"),d.getByOffset("global_idx")));else{let m=(g,v,_="")=>{let $=`a_data[index_a${v}][component_a${v}]`,L=`b_data[index_b${v}][component_b${v}]`,T=`bool(c_data[index_c${v}] & (0xffu << (component_c${v} * 8)))`;return`
            let output_indices${v} = ${s.offsetToIndices(`global_idx * 4u + ${v}u`)};
            let offset_a${v} = ${o.broadcastedIndicesToOffset(`output_indices${v}`,s)};
            let offset_b${v} = ${u.broadcastedIndicesToOffset(`output_indices${v}`,s)};
            let offset_c${v} = ${d.broadcastedIndicesToOffset(`output_indices${v}`,s)};
            let index_a${v} = offset_a${v} / 4u;
            let index_b${v} = offset_b${v} / 4u;
            let index_c${v} = offset_c${v} / 4u;
            let component_a${v} = offset_a${v} % 4u;
            let component_b${v} = offset_b${v} % 4u;
            let component_c${v} = offset_c${v} % 4u;
            ${g}[${v}] = ${_}(${h($,L,T)});
          `};i===9?f=`
            var data = vec4<u32>(0);
            ${m("data",0,"u32")}
            ${m("data",1,"u32")}
            ${m("data",2,"u32")}
            ${m("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:f=`
            ${m("output_data[global_idx]",0)}
            ${m("output_data[global_idx]",1)}
            ${m("output_data[global_idx]",2)}
            ${m("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(d,o,u,s)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${f}
      }`},$g=e=>{let t=e[1].dims,r=e[2].dims,n=e[0].dims,i=e[1].dataType,s=!(fe.areEqual(t,r)&&fe.areEqual(r,n)),o=t,u=fe.size(t);if(s){let f=ui.calcShape(ui.calcShape(t,r,!1),n,!1);if(!f)throw new Error("Can't perform where op on the given tensors");o=f,u=fe.size(o)}let d=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:f=>xg(f,e,o,s,i),getRunData:()=>({outputs:[{dims:o,dataType:i}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:d},...st(n,t,r,o)]})}},Z_=e=>{e.compute($g(e.inputs))}}),J_,W1=Fe(()=>{n1(),pf(),i1(),s1(),o1(),u1(),l1(),h1(),g1(),y1(),v1(),_1(),b1(),w1(),x1(),$1(),E1(),S1(),T1(),k1(),A1(),I1(),C1(),O1(),R1(),v_(),z1(),B1(),L1(),M1(),N1(),cf(),D1(),$_(),P1(),G1(),F1(),w_(),U1(),Wa(),hf(),V1(),J_=new Map([["Abs",[Hy]],["Acos",[jy]],["Acosh",[Ky]],["Add",[Av]],["ArgMax",[Uy,Pd]],["ArgMin",[Fy,Pd]],["Asin",[Xy]],["Asinh",[Yy]],["Atan",[Qy]],["Atanh",[Zy]],["Attention",[Vy]],["AveragePool",[R_,O_]],["BatchNormalization",[Wy]],["BiasAdd",[qy]],["BiasSplitGelu",[kv]],["Cast",[ev,Jy]],["Ceil",[rv]],["Clip",[tv]],["Concat",[Dv,Pv]],["Conv",[qd,Wd]],["ConvTranspose",[Xv,Kv]],["Cos",[av]],["Cosh",[nv]],["CumSum",[Yv,Qv]],["DepthToSpace",[Zv,Jv]],["DequantizeLinear",[P_,G_]],["Div",[Iv]],["Einsum",[e_,t_]],["Elu",[iv,ws]],["Equal",[Cv]],["Erf",[sv]],["Exp",[ov]],["Expand",[r_]],["FastGelu",[a_]],["Floor",[uv]],["FusedConv",[qd,Wd]],["Gather",[i_,n_]],["GatherElements",[f_,d_]],["GatherBlockQuantized",[u_,l_]],["GatherND",[s_,o_]],["Gelu",[lv]],["Gemm",[p_,c_]],["GlobalAveragePool",[B_,z_]],["GlobalMaxPool",[D_,N_]],["Greater",[Bv]],["GreaterOrEqual",[Mv]],["GridSample",[h_,m_]],["GroupQueryAttention",[E_]],["HardSigmoid",[yv,gv]],["InstanceNormalization",[S_]],["LayerNormalization",[T_]],["LeakyRelu",[dv,ws]],["Less",[Lv]],["LessOrEqual",[Nv]],["Log",[Sv]],["MatMul",[k_]],["MatMulNBits",[A_,I_]],["MaxPool",[L_,M_]],["Mul",[Ov]],["MultiHeadAttention",[y_,g_]],["Neg",[cv]],["Not",[fv]],["Pad",[C_]],["Pow",[Rv]],["QuickGelu",[Tv,ws]],["Range",[F_]],["Reciprocal",[pv]],["ReduceMin",[My]],["ReduceMean",[Oy]],["ReduceMax",[Ly]],["ReduceSum",[Dy]],["ReduceProd",[Ny]],["ReduceL1",[Ry]],["ReduceL2",[zy]],["ReduceLogSum",[Gy]],["ReduceLogSumExp",[By]],["ReduceSumSquare",[Py]],["Relu",[hv]],["Resize",[W_,q_]],["RotaryEmbedding",[x_]],["ScatterND",[V_,U_]],["Sigmoid",[mv]],["Sin",[vv]],["Sinh",[_v]],["Slice",[j_,K_]],["SkipLayerNormalization",[H_]],["Split",[__,b_]],["Sqrt",[bv]],["Softmax",[X_,Y_]],["Sub",[zv]],["Tan",[wv]],["Tanh",[xv]],["ThresholdedRelu",[Ev,ws]],["Tile",[Q_]],["Transpose",[_y,by]],["Where",[Z_]]])}),e0,q1=Fe(()=>{ea(),$a(),xt(),e0=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,n,i){fa(e.programInfo.name);let s=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let f of t)u.push({binding:u.length,resource:{buffer:f.buffer}});for(let f of r)u.push({binding:u.length,resource:{buffer:f.buffer}});i&&u.push({binding:u.length,resource:i});let d=s.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let f={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:d,dispatchGroup:n};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(f)}o.setPipeline(e.computePipeline),o.setBindGroup(0,d),o.dispatchWorkgroups(...n),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Jr(e.programInfo.name)}dispose(){}build(e,t){fa(e.name);let r=this.backend.device,n=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(f=>{r.features.has(f.feature)&&n.push(`enable ${f.extension};`)});let i=vy(t,this.backend.device.limits),s=e.getShaderSource(i),o=`${n.join(`
`)}
${i.additionalImplementations}
${s}`,u=r.createShaderModule({code:o,label:e.name});Ot("verbose",()=>`[WebGPU] ${e.name} shader code: ${o}`);let d=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Jr(e.name),{programInfo:e,computePipeline:d,uniformVariablesInfo:i.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,n=typeof e=="number"?1:e.z||1,i=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=i&&r<=i&&n<=i)return[t,r,n];let s=t*r*n,o=Math.ceil(Math.sqrt(s));if(o>i){if(o=Math.ceil(Math.cbrt(s)),o>i)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[o,o,o]}else return[o,o,1]}}}),t0={};di(t0,{WebGpuBackend:()=>r0});var Eg,Sg,Tg,r0,H1=Fe(()=>{ea(),ct(),$a(),py(),r1(),W1(),q1(),Eg=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let n=0;n<e.length;++n){let i=e[n].dataType;switch(t[n]){case"none":{r.push("");break}case"type":{r.push(`${i}`);break}case"rank":{let s=e[n].dims.length;r.push(`${i};${s}`);break}case"dims":{let s=e[n].dims.join(",");r.push(`${i};${s}`);break}default:throw new Error(`unsupported input dependency: ${t[n]}`)}}return r.join("|")},Sg=(e,t,r)=>{let n=e.name;return e.shaderCache?.hint&&(n+="["+e.shaderCache.hint+"]"),n+=":"+r+`:${Eg(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,n},Tg=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},r0=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],n={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},i=s=>t.features.has(s)&&r.push(s)&&!0;i("chromium-experimental-timestamp-query-inside-passes")||i("timestamp-query"),i("shader-f16"),i("subgroups"),this.device=await t.requestDevice(n),this.adapterInfo=new Tg(t.info||await t.requestAdapterInfo()),this.gpuDataManager=gy(this),this.programManager=new e0(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,uf(e.logLevel,!!e.debug),this.device.onuncapturederror=s=>{s.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${s.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;fa(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let n=0;n<t.length/2;n++){let i=r[n],s=i.kernelId,o=this.kernels.get(s),u=o.kernelType,d=o.kernelName,f=i.programName,h=i.inputTensorViews,m=i.outputTensorViews,g=t[n*2],v=t[n*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=g);let _=Number(g-this.queryTimeBase),$=Number(v-this.queryTimeBase);if(!Number.isSafeInteger(_)||!Number.isSafeInteger($))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:h.map(L=>({dims:L.dims,dataType:xa(L.dataType)})),outputsMetadata:m.map(L=>({dims:L.dims,dataType:xa(L.dataType)})),kernelId:s,kernelType:u,kernelName:d,programName:f,startTime:_,endTime:$});else{let L="";h.forEach((b,N)=>{L+=`input[${N}]: [${b.dims}] | ${xa(b.dataType)}, `});let T="";m.forEach((b,N)=>{T+=`output[${N}]: [${b.dims}] | ${xa(b.dataType)}, `}),console.log(`[profiling] kernel "${s}|${u}|${d}|${f}" ${L}${T}execution time: ${$-_} ns`)}uu("GPU",`${f}::${g}::${v}`)}e.unmap(),this.pendingQueries.delete(e)}),Jr()}run(e,t,r,n,i,s){fa(e.name);let o=[];for(let b=0;b<t.length;++b){let N=t[b].data;if(N===0)continue;let B=this.gpuDataManager.get(N);if(!B)throw new Error(`no GPU data for input: ${N}`);o.push(B)}let{outputs:u,dispatchGroup:d,programUniforms:f}=e.getRunData(t),h=r.length===0?u.map((b,N)=>N):r;if(h.length!==u.length)throw new Error(`Output size ${h.length} must be equal to ${u.length}.`);let m=[],g=[];for(let b=0;b<u.length;++b){if(!Number.isInteger(h[b])||h[b]<-3||h[b]>=s)throw new Error(`Invalid output index: ${h[b]}`);if(h[b]===-3)continue;let N=h[b]===-1,B=h[b]===-2,W=N||B?i(u[b].dataType,u[b].dims):n(h[b],u[b].dataType,u[b].dims);if(m.push(W),W.data===0)continue;let ae=this.gpuDataManager.get(W.data);if(!ae)throw new Error(`no GPU data for output: ${W.data}`);if(N&&this.temporaryData.push(ae),B){let Q=this.kernelPersistentData.get(this.currentKernelId);Q||(Q=[],this.kernelPersistentData.set(this.currentKernelId,Q)),Q.push(ae)}g.push(ae)}if(o.length!==t.length||g.length!==m.length){if(g.length===0)return Jr(e.name),m;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let v;if(f){let b=0,N=[];f.forEach(Q=>{let ge=typeof Q.data=="number"?[Q.data]:Q.data;if(ge.length===0)return;let ze=Q.type===10?2:4,Xe,nt;Q.type===10?(nt=ge.length>4?16:ge.length>2?8:ge.length*ze,Xe=ge.length>4?16:ze*ge.length):(nt=ge.length<=2?ge.length*ze:16,Xe=16),b=Math.ceil(b/nt)*nt,N.push(b);let Je=Q.type===10?8:4;b+=ge.length>4?Math.ceil(ge.length/Je)*Xe:ge.length*ze});let B=16;b=Math.ceil(b/B)*B;let W=new ArrayBuffer(b);f.forEach((Q,ge)=>{let ze=N[ge],Xe=typeof Q.data=="number"?[Q.data]:Q.data;if(Q.type===6)new Int32Array(W,ze,Xe.length).set(Xe);else if(Q.type===12)new Uint32Array(W,ze,Xe.length).set(Xe);else if(Q.type===10)new Uint16Array(W,ze,Xe.length).set(Xe);else if(Q.type===1)new Float32Array(W,ze,Xe.length).set(Xe);else throw new Error(`Unsupported uniform type: ${xa(Q.type)}`)});let ae=this.gpuDataManager.create(b,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(ae.buffer,0,W,0,b),this.gpuDataManager.release(ae.id),v={offset:0,size:b,buffer:ae.buffer}}let _=this.programManager.normalizeDispatchGroupSize(d),$=_[1]===1&&_[2]===1,L=Sg(e,t,$),T=this.programManager.getArtifact(L);if(T||(T=this.programManager.build(e,_),this.programManager.setArtifact(L,T),Ot("info",()=>`[artifact] key: ${L}, programName: ${e.name}`)),f&&T.uniformVariablesInfo){if(f.length!==T.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${T.uniformVariablesInfo.length}, got ${f.length} in program "${T.programInfo.name}".`);for(let b=0;b<f.length;b++){let N=f[b],B=N.type,W=typeof N.data=="number"?1:N.data.length,[ae,Q]=T.uniformVariablesInfo[b];if(B!==ae||W!==Q)throw new Error(`Uniform variable ${b} mismatch: expect type ${ae} with size ${Q}, got type ${B} with size ${W} in program "${T.programInfo.name}".`)}}if(Ot("info",()=>`[ProgramManager] run "${e.name}" (key=${L}) with ${_[0]}x${_[1]}x${_[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let b={kernelId:this.currentKernelId,programName:T.programInfo.name,inputTensorViews:t,outputTensorViews:m};this.pendingKernels.push(b),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(b)}return this.programManager.run(T,o,g,_,v),Jr(e.name),m}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,n){let i=J_.get(e);if(!i)throw new Error(`kernel not implemented: ${e}`);let s={kernelType:e,kernelName:n,kernelEntry:i[0],attributes:[i[1],r]};this.kernels.set(t,s)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let n=this.kernels.get(e);if(!n)throw new Error(`kernel not created: ${e}`);let i=n.kernelType,s=n.kernelName,o=n.kernelEntry,u=n.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${i}] ${s}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),Ot("info",()=>`[WebGPU] Start to run kernel "[${i}] ${s}"...`);let d=this.env.debug;this.temporaryData=[];try{return d&&this.device.pushErrorScope("validation"),o(t,u[1]),0}catch(f){return r.push(Promise.resolve(`[WebGPU] Kernel "[${i}] ${s}" failed. ${f}`)),1}finally{d&&r.push(this.device.popErrorScope().then(f=>f?`GPU validation error for kernel "[${i}] ${s}": ${f.message}`:null));for(let f of this.temporaryData)this.gpuDataManager.release(f.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,n){let i=this.sessionExternalDataMapping.get(e);i||(i=new Map,this.sessionExternalDataMapping.set(e,i));let s=i.get(t),o=this.gpuDataManager.registerExternalBuffer(r,n,s);return i.set(t,[o,r]),o}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let n=await Md(this,e,t);return lf(n.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){Ot("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){Ot("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){Ot("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let n=0;n<r;n++){let i=this.getComputePassEncoder(),s=e[n];this.writeTimestamp(this.pendingDispatchNumber*2),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[n]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),a0={};di(a0,{init:()=>n0});var Jo,kg,n0,j1=Fe(()=>{ct(),$a(),_t(),t1(),Jo=class i0{constructor(t,r,n,i){this.module=t,this.dataType=r,this.data=n,this.dims=i}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=fe.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=fe.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=fe.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=fe.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(fe.size(t)!==fe.size(this.dims))throw new Error("Invalid new shape");return new i0(this.module,this.dataType,this.data,t)}},kg=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let n=e.PTR_SIZE,i=r/e.PTR_SIZE,s=n===4?"i32":"i64";this.opKernelContext=Number(e.getValue(n*i++,s));let o=Number(e.getValue(n*i++,s));this.outputCount=Number(e.getValue(n*i++,s)),this.customDataOffset=Number(e.getValue(n*i++,"*")),this.customDataSize=Number(e.getValue(n*i++,s));let u=[];for(let d=0;d<o;d++){let f=Number(e.getValue(n*i++,s)),h=Number(e.getValue(n*i++,"*")),m=Number(e.getValue(n*i++,s)),g=[];for(let v=0;v<m;v++)g.push(Number(e.getValue(n*i++,s)));u.push(new Jo(e,f,h,g))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(o=>typeof o=="number"?this.inputs[o]:o)??this.inputs,n=t?.outputs??[],i=(o,u,d)=>new Jo(this.module,u,this.output(o,d),d),s=(o,u)=>{let d=wn(o,u);if(!d)throw new Error(`Unsupported data type: ${o}`);let f=d>0?this.backend.gpuDataManager.create(d).id:0;return new Jo(this.module,o,f,u)};return this.backend.run(e,r,n,i,s,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let n=this.module.PTR_SIZE,i=n===4?"i32":"i64",s=this.module.stackAlloc((1+t.length)*n);this.module.setValue(s,t.length,i);for(let o=0;o<t.length;o++)this.module.setValue(s+n*(o+1),t[o],i);return this.module._JsepOutput(this.opKernelContext,e,s)}catch(n){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${n}`)}finally{this.module.stackRestore(r)}}},n0=async(e,t,r,n)=>{let i=t.jsepInit;if(!i)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let s=(H1(),Ts(t0)).WebGpuBackend,o=new s;await o.initialize(r,n),i("webgpu",[o,u=>o.alloc(Number(u)),u=>o.free(u),(u,d,f,h=!1)=>{if(h)Ot("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(d)}, size=${Number(f)}`),o.memcpy(Number(u),Number(d));else{Ot("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(d)}, size=${Number(f)}`);let m=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(f));o.upload(Number(d),m)}},async(u,d,f)=>{Ot("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${d}, size=${f}`),await o.download(Number(u),()=>t.HEAPU8.subarray(Number(d)>>>0,Number(d+f)>>>0))},(u,d,f)=>o.createKernel(u,Number(d),f,t.UTF8ToString(t._JsepGetNodeName(Number(d)))),u=>o.releaseKernel(u),(u,d,f,h)=>{Ot("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${f}, kernel=${u}, contextDataOffset=${d}`);let m=new kg(t,o,Number(d));return o.computeKernel(Number(u),m,h)},()=>o.captureBegin(),()=>o.captureEnd(),()=>o.replay()])}else{let s=new my(r);i("webnn",[s,()=>s.reserveTensorId(),o=>s.releaseTensorId(o),async(o,u,d,f,h)=>s.ensureTensor(o,u,d,f,h),(o,u)=>{s.uploadTensor(o,u)},async(o,u)=>s.downloadTensor(o,u)])}}}),Ag,bf,wf,Ga,Ig,Ad,mu,xf,$f,Id,Ef,Sf,Tf,s0=Fe(()=>{Zw(),Jw(),ct(),Tn(),af(),ly(),Ag=(e,t)=>{Gt()._OrtInit(e,t)!==0&&Nt("Can't initialize onnxruntime.")},bf=async e=>{Ag(e.wasm.numThreads,du(e.logLevel))},wf=async(e,t)=>{Gt().asyncInit?.();{let r=(j1(),Ts(a0)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let n=e.webgpu.adapter;if(n){if(typeof n.limits!="object"||typeof n.features!="object"||typeof n.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let i=e.webgpu.powerPreference;if(i!==void 0&&i!=="low-power"&&i!=="high-performance")throw new Error(`Invalid powerPreference setting: "${i}"`);let s=e.webgpu.forceFallbackAdapter;if(s!==void 0&&typeof s!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${s}"`);if(n=await navigator.gpu.requestAdapter({powerPreference:i,forceFallbackAdapter:s}),!n)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",Gt(),e,n)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",Gt(),e)}}},Ga=new Map,Ig=e=>{let t=Gt(),r=t.stackSave();try{let n=t.PTR_SIZE,i=t.stackAlloc(2*n);t._OrtGetInputOutputCount(e,i,i+n)!==0&&Nt("Can't get session input/output count.");let s=n===4?"i32":"i64";return[Number(t.getValue(i,s)),Number(t.getValue(i+n,s))]}finally{t.stackRestore(r)}},Ad=(e,t)=>{let r=Gt(),n=r.stackSave(),i=0;try{let s=r.PTR_SIZE,o=r.stackAlloc(2*s);r._OrtGetInputOutputMetadata(e,t,o,o+s)!==0&&Nt("Can't get session input/output metadata.");let u=Number(r.getValue(o,"*"));i=Number(r.getValue(o+s,"*"));let d=r.HEAP32[i/4];if(d===0)return[u,0];let f=r.HEAPU32[i/4+1],h=[];for(let m=0;m<f;m++){let g=Number(r.getValue(i+8+m*s,"*"));h.push(g!==0?r.UTF8ToString(g):Number(r.getValue(i+8+(m+f)*s,"*")))}return[u,d,h]}finally{r.stackRestore(n),i!==0&&r._OrtFree(i)}},mu=e=>{let t=Gt(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},xf=async(e,t)=>{let r,n,i=Gt();Array.isArray(e)?[r,n]=e:e.buffer===i.HEAPU8.buffer?[r,n]=[e.byteOffset,e.byteLength]:[r,n]=mu(e);let s=0,o=0,u=0,d=[],f=[],h=[];try{if([o,d]=await uy(t),t?.externalData&&i.mountExternalData){let B=[];for(let W of t.externalData){let ae=typeof W=="string"?W:W.path;B.push(of(typeof W=="string"?W:W.data).then(Q=>{i.mountExternalData(ae,Q)}))}await Promise.all(B)}for(let B of t?.executionProviders??[])if((typeof B=="string"?B:B.name)==="webnn"){if(i.shouldTransferToMLTensor=!1,typeof B!="string"){let W=B,ae=W?.context,Q=W?.gpuDevice,ge=W?.deviceType,ze=W?.powerPreference;ae?i.currentContext=ae:Q?i.currentContext=await i.webnnCreateMLContext(Q):i.currentContext=await i.webnnCreateMLContext({deviceType:ge,powerPreference:ze})}else i.currentContext=await i.webnnCreateMLContext();break}s=await i._OrtCreateSession(r,n,o),i.webgpuOnCreateSession?.(s),s===0&&Nt("Can't create a session."),i.jsepOnCreateSession?.(),i.currentContext&&(i.webnnRegisterMLContext(s,i.currentContext),i.currentContext=void 0,i.shouldTransferToMLTensor=!0);let[m,g]=Ig(s),v=!!t?.enableGraphCapture,_=[],$=[],L=[],T=[],b=[];for(let B=0;B<m;B++){let[W,ae,Q]=Ad(s,B);W===0&&Nt("Can't get an input name."),f.push(W);let ge=i.UTF8ToString(W);_.push(ge),L.push(ae===0?{name:ge,isTensor:!1}:{name:ge,isTensor:!0,type:xa(ae),shape:Q})}for(let B=0;B<g;B++){let[W,ae,Q]=Ad(s,B+m);W===0&&Nt("Can't get an output name."),h.push(W);let ge=i.UTF8ToString(W);$.push(ge),T.push(ae===0?{name:ge,isTensor:!1}:{name:ge,isTensor:!0,type:xa(ae),shape:Q});{if(v&&t?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let ze=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[ge]??"cpu",Xe=i.webnnIsGraphOutput;if(ze==="cpu"&&Xe&&Xe(s,ge)){b.push("ml-tensor-cpu-output");continue}if(ze!=="cpu"&&ze!=="cpu-pinned"&&ze!=="gpu-buffer"&&ze!=="ml-tensor")throw new Error(`Not supported preferred output location: ${ze}.`);if(v&&ze!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${ze}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(ze)}}let N=null;return b.some(B=>B==="gpu-buffer"||B==="ml-tensor"||B==="ml-tensor-cpu-output")&&(u=i._OrtCreateBinding(s),u===0&&Nt("Can't create IO binding."),N={handle:u,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(B=>B==="ml-tensor-cpu-output"?"ml-tensor":B).map(B=>Bd(B))}),Ga.set(s,[s,f,h,N,v,!1]),[s,_,$,L,T]}catch(m){throw f.forEach(g=>i._OrtFree(g)),h.forEach(g=>i._OrtFree(g)),u!==0&&i._OrtReleaseBinding(u)!==0&&Nt("Can't release IO binding."),s!==0&&i._OrtReleaseSession(s)!==0&&Nt("Can't release session."),m}finally{i._free(r),o!==0&&i._OrtReleaseSessionOptions(o)!==0&&Nt("Can't release session options."),d.forEach(m=>i._free(m)),i.unmountExternalData?.()}},$f=e=>{let t=Gt(),r=Ga.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[n,i,s,o,u]=r;o&&(u&&t._OrtClearBoundOutputs(o.handle)!==0&&Nt("Can't clear bound outputs."),t._OrtReleaseBinding(o.handle)!==0&&Nt("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),i.forEach(d=>t._OrtFree(d)),s.forEach(d=>t._OrtFree(d)),t._OrtReleaseSession(n)!==0&&Nt("Can't release session."),Ga.delete(e)},Id=async(e,t,r,n,i,s,o=!1)=>{if(!e){t.push(0);return}let u=Gt(),d=u.PTR_SIZE,f=e[0],h=e[1],m=e[3],g=m,v,_;if(f==="string"&&(m==="gpu-buffer"||m==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(o&&m!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${s} when enableGraphCapture is true.`);if(m==="gpu-buffer"){let T=e[2].gpuBuffer;_=wn(bn(f),h);{let b=u.jsepRegisterBuffer;if(!b)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');v=b(n,s,T,_)}}else if(m==="ml-tensor"){let T=e[2].mlTensor;_=wn(bn(f),h);let b=u.webnnRegisterMLTensor;if(!b)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');v=b(n,T,bn(f),h)}else{let T=e[2];if(Array.isArray(T)){_=d*T.length,v=u._malloc(_),r.push(v);for(let b=0;b<T.length;b++){if(typeof T[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);u.setValue(v+b*d,Yr(T[b],r),"*")}}else{let b=u.webnnIsGraphInput,N=u.webnnIsGraphOutput;if(f!=="string"&&b&&N){let B=u.UTF8ToString(i);if(b(n,B)||N(n,B)){let W=bn(f);_=wn(W,h),g="ml-tensor";let ae=u.webnnCreateTemporaryTensor,Q=u.webnnUploadTensor;if(!ae||!Q)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let ge=await ae(n,W,h);Q(ge,new Uint8Array(T.buffer,T.byteOffset,T.byteLength)),v=ge}else _=T.byteLength,v=u._malloc(_),r.push(v),u.HEAPU8.set(new Uint8Array(T.buffer,T.byteOffset,_),v)}else _=T.byteLength,v=u._malloc(_),r.push(v),u.HEAPU8.set(new Uint8Array(T.buffer,T.byteOffset,_),v)}}let $=u.stackSave(),L=u.stackAlloc(4*h.length);try{h.forEach((b,N)=>u.setValue(L+N*d,b,d===4?"i32":"i64"));let T=u._OrtCreateTensor(bn(f),v,_,L,h.length,Bd(g));T===0&&Nt(`Can't create tensor for input/output. session=${n}, index=${s}.`),t.push(T)}finally{u.stackRestore($)}},Ef=async(e,t,r,n,i,s)=>{let o=Gt(),u=o.PTR_SIZE,d=Ga.get(e);if(!d)throw new Error(`cannot run inference. invalid session id: ${e}`);let f=d[0],h=d[1],m=d[2],g=d[3],v=d[4],_=d[5],$=t.length,L=n.length,T=0,b=[],N=[],B=[],W=[],ae=o.stackSave(),Q=o.stackAlloc($*u),ge=o.stackAlloc($*u),ze=o.stackAlloc(L*u),Xe=o.stackAlloc(L*u);try{[T,b]=oy(s);for(let R=0;R<$;R++)await Id(r[R],N,W,e,h[t[R]],t[R],v);for(let R=0;R<L;R++)await Id(i[R],B,W,e,m[n[R]],$+n[R],v);for(let R=0;R<$;R++)o.setValue(Q+R*u,N[R],"*"),o.setValue(ge+R*u,h[t[R]],"*");for(let R=0;R<L;R++)o.setValue(ze+R*u,B[R],"*"),o.setValue(Xe+R*u,m[n[R]],"*");if(g&&!_){let{handle:R,outputPreferredLocations:te,outputPreferredLocationsEncoded:U}=g;if(h.length!==$)throw new Error(`input count from feeds (${$}) is expected to be always equal to model's input count (${h.length}).`);for(let J=0;J<$;J++){let $e=t[J];await o._OrtBindInput(R,h[$e],N[J])!==0&&Nt(`Can't bind input[${J}] for session=${e}.`)}for(let J=0;J<L;J++){let $e=n[J];i[J]?.[3]?o._OrtBindOutput(R,m[$e],B[J],0)!==0&&Nt(`Can't bind pre-allocated output[${J}] for session=${e}.`):o._OrtBindOutput(R,m[$e],0,U[$e])!==0&&Nt(`Can't bind output[${J}] to ${te[J]} for session=${e}.`)}Ga.set(e,[f,h,m,g,v,!0])}o.jsepOnRunStart?.(f),o.webnnOnRunStart?.(f);let nt;g?nt=await o._OrtRunWithBinding(f,g.handle,L,ze,T):nt=await o._OrtRun(f,ge,Q,$,Xe,L,ze,T),nt!==0&&Nt("failed to call OrtRun().");let Je=[],F=[];for(let R=0;R<L;R++){let te=Number(o.getValue(ze+R*u,"*"));if(te===B[R]){Je.push(i[R]);continue}let U=o.stackSave(),J=o.stackAlloc(4*u),$e=!1,Oe,He=0;try{o._OrtGetTensorData(te,J,J+u,J+2*u,J+3*u)!==0&&Nt(`Can't access output tensor data on index ${R}.`);let ie=u===4?"i32":"i64",me=Number(o.getValue(J,ie));He=o.getValue(J+u,"*");let Ve=o.getValue(J+u*2,"*"),de=Number(o.getValue(J+u*3,ie)),We=[];for(let zt=0;zt<de;zt++)We.push(Number(o.getValue(Ve+zt*u,ie)));o._OrtFree(Ve)!==0&&Nt("Can't free memory for tensor dims.");let Dt=We.reduce((zt,Mt)=>zt*Mt,1);Oe=xa(me);let Ut=g?.outputPreferredLocations[n[R]];if(Oe==="string"){if(Ut==="gpu-buffer"||Ut==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let zt=[];for(let Mt=0;Mt<Dt;Mt++){let Et=o.getValue(He+Mt*u,"*"),Jt=o.getValue(He+(Mt+1)*u,"*"),er=Mt===Dt-1?void 0:Jt-Et;zt.push(o.UTF8ToString(Et,er))}Je.push([Oe,We,zt,"cpu"])}else if(Ut==="gpu-buffer"&&Dt>0){let zt=o.jsepGetBuffer;if(!zt)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let Mt=zt(He),Et=wn(me,Dt);if(Et===void 0||!nf(Oe))throw new Error(`Unsupported data type: ${Oe}`);$e=!0,Je.push([Oe,We,{gpuBuffer:Mt,download:o.jsepCreateDownloader(Mt,Et,Oe),dispose:()=>{o._OrtReleaseTensor(te)!==0&&Nt("Can't release tensor.")}},"gpu-buffer"])}else if(Ut==="ml-tensor"&&Dt>0){let zt=o.webnnEnsureTensor,Mt=o.webnnIsGraphInputOutputTypeSupported;if(!zt||!Mt)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(wn(me,Dt)===void 0||!sf(Oe))throw new Error(`Unsupported data type: ${Oe}`);if(!Mt(e,Oe,!1))throw new Error(`preferredLocation "ml-tensor" for ${Oe} output is not supported by current WebNN Context.`);let Et=await zt(e,He,me,We,!1);$e=!0,Je.push([Oe,We,{mlTensor:Et,download:o.webnnCreateMLTensorDownloader(He,Oe),dispose:()=>{o.webnnReleaseTensorId(He),o._OrtReleaseTensor(te)}},"ml-tensor"])}else if(Ut==="ml-tensor-cpu-output"&&Dt>0){let zt=o.webnnCreateMLTensorDownloader(He,Oe)(),Mt=Je.length;$e=!0,F.push((async()=>{let Et=[Mt,await zt];return o.webnnReleaseTensorId(He),o._OrtReleaseTensor(te),Et})()),Je.push([Oe,We,[],"cpu"])}else{let zt=vu(Oe),Mt=new zt(Dt);new Uint8Array(Mt.buffer,Mt.byteOffset,Mt.byteLength).set(o.HEAPU8.subarray(He,He+Mt.byteLength)),Je.push([Oe,We,Mt,"cpu"])}}finally{o.stackRestore(U),Oe==="string"&&He&&o._free(He),$e||o._OrtReleaseTensor(te)}}g&&!v&&(o._OrtClearBoundOutputs(g.handle)!==0&&Nt("Can't clear bound outputs."),Ga.set(e,[f,h,m,g,v,!1]));for(let[R,te]of await Promise.all(F))Je[R][2]=te;return Je}finally{o.webnnOnRunEnd?.(f),o.stackRestore(ae),N.forEach(nt=>o._OrtReleaseTensor(nt)),B.forEach(nt=>o._OrtReleaseTensor(nt)),W.forEach(nt=>o._free(nt)),T!==0&&o._OrtReleaseRunOptions(T),b.forEach(nt=>o._free(nt))}},Sf=e=>{let t=Gt(),r=Ga.get(e);if(!r)throw new Error("invalid session id");let n=r[0],i=t._OrtEndProfiling(n);i===0&&Nt("Can't get an profile file name."),t._OrtFree(i)},Tf=e=>{let t=[];for(let r of e){let n=r[2];!Array.isArray(n)&&"buffer"in n&&t.push(n.buffer)}return t}}),Fa,Mr,ri,ys,vs,eu,Cd,tu,gn,yn,Cg,u0,l0,d0,f0,c0,p0,h0,m0=Fe(()=>{ea(),s0(),Tn(),tf(),Fa=()=>!!Vt.wasm.proxy&&typeof document<"u",ri=!1,ys=!1,vs=!1,tu=new Map,gn=(e,t)=>{let r=tu.get(e);r?r.push(t):tu.set(e,[t])},yn=()=>{if(ri||!ys||vs||!Mr)throw new Error("worker not ready")},Cg=e=>{switch(e.data.type){case"init-wasm":ri=!1,e.data.err?(vs=!0,Cd[1](e.data.err)):(ys=!0,Cd[0]()),eu&&(URL.revokeObjectURL(eu),eu=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=tu.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}}},u0=async()=>{if(!ys){if(ri)throw new Error("multiple calls to 'initWasm()' detected.");if(vs)throw new Error("previous call to 'initWasm()' failed.");if(ri=!0,Fa())return new Promise((e,t)=>{Mr?.terminate(),iy().then(([r,n])=>{try{Mr=n,Mr.onerror=s=>t(s),Mr.onmessage=Cg,Cd=[e,t];let i={type:"init-wasm",in:Vt};!i.in.wasm.wasmPaths&&(r||zd)&&(i.in.wasm.wasmPaths={wasm:new URL("/live-music-projection/assets/ort-wasm-simd-threaded.jsep-CLPRrI3A.wasm",import.meta.url).href}),Mr.postMessage(i),eu=r}catch(i){t(i)}},t)});try{await rf(Vt.wasm),await bf(Vt),ys=!0}catch(e){throw vs=!0,e}finally{ri=!1}}},l0=async e=>{if(Fa())return yn(),new Promise((t,r)=>{gn("init-ep",[t,r]);let n={type:"init-ep",in:{epName:e,env:Vt}};Mr.postMessage(n)});await wf(Vt,e)},d0=async e=>Fa()?(yn(),new Promise((t,r)=>{gn("copy-from",[t,r]);let n={type:"copy-from",in:{buffer:e}};Mr.postMessage(n,[e.buffer])})):mu(e),f0=async(e,t)=>{if(Fa()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return yn(),new Promise((r,n)=>{gn("create",[r,n]);let i={type:"create",in:{model:e,options:{...t}}},s=[];e instanceof Uint8Array&&s.push(e.buffer),Mr.postMessage(i,s)})}else return xf(e,t)},c0=async e=>{if(Fa())return yn(),new Promise((t,r)=>{gn("release",[t,r]);let n={type:"release",in:e};Mr.postMessage(n)});$f(e)},p0=async(e,t,r,n,i,s)=>{if(Fa()){if(r.some(o=>o[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(i.some(o=>o))throw new Error("pre-allocated output tensor is not supported for proxy.");return yn(),new Promise((o,u)=>{gn("run",[o,u]);let d=r,f={type:"run",in:{sessionId:e,inputIndices:t,inputs:d,outputIndices:n,options:s}};Mr.postMessage(f,Tf(d))})}else return Ef(e,t,r,n,i,s)},h0=async e=>{if(Fa())return yn(),new Promise((t,r)=>{gn("end-profiling",[t,r]);let n={type:"end-profiling",in:e};Mr.postMessage(n)});Sf(e)}}),Od,Og,g0,K1=Fe(()=>{ea(),m0(),ct(),ef(),ly(),Od=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},Og=e=>{switch(e[3]){case"cpu":return new Pr(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!nf(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:n,dispose:i}=e[2];return Pr.fromGpuBuffer(r,{dataType:t,dims:e[1],download:n,dispose:i})}case"ml-tensor":{let t=e[0];if(!sf(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:n,dispose:i}=e[2];return Pr.fromMLTensor(r,{dataType:t,dims:e[1],download:n,dispose:i})}default:throw new Error(`invalid data location: ${e[3]}`)}},g0=class{async fetchModelAndCopyToWasmMemory(e){return d0(await of(e))}async loadModel(e,t){fa();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await f0(r,t),Jr()}async dispose(){return c0(this.sessionId)}async run(e,t,r){fa();let n=[],i=[];Object.entries(e).forEach(m=>{let g=m[0],v=m[1],_=this.inputNames.indexOf(g);if(_===-1)throw new Error(`invalid input '${g}'`);n.push(v),i.push(_)});let s=[],o=[];Object.entries(t).forEach(m=>{let g=m[0],v=m[1],_=this.outputNames.indexOf(g);if(_===-1)throw new Error(`invalid output '${g}'`);s.push(v),o.push(_)});let u=n.map((m,g)=>Od(m,()=>`input "${this.inputNames[i[g]]}"`)),d=s.map((m,g)=>m?Od(m,()=>`output "${this.outputNames[o[g]]}"`):null),f=await p0(this.sessionId,i,u,o,d,r),h={};for(let m=0;m<f.length;m++)h[this.outputNames[o[m]]]=s[m]??Og(f[m]);return Jr(),h}startProfiling(){}endProfiling(){h0(this.sessionId)}}}),y0={};di(y0,{OnnxruntimeWebAssemblyBackend:()=>Kd,initializeFlags:()=>jd,wasmBackend:()=>v0});var jd,Kd,v0,X1=Fe(()=>{ea(),m0(),K1(),jd=()=>{(typeof Vt.wasm.initTimeout!="number"||Vt.wasm.initTimeout<0)&&(Vt.wasm.initTimeout=0);let e=Vt.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),Vt.wasm.simd=!1),typeof Vt.wasm.proxy!="boolean"&&(Vt.wasm.proxy=!1),typeof Vt.wasm.trace!="boolean"&&(Vt.wasm.trace=!1),typeof Vt.wasm.numThreads!="number"||!Number.isInteger(Vt.wasm.numThreads)||Vt.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)Vt.wasm.numThreads=1;else{let t=typeof navigator>"u"?Bw("node:os").cpus().length:navigator.hardwareConcurrency;Vt.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Kd=class{async init(e){jd(),await u0(),await l0(e)}async createInferenceSessionHandler(e,t){let r=new g0;return await r.loadModel(e,t),r}},v0=new Kd});ea();ea();ea();var Y1="1.22.0";{let e=(X1(),Ts(y0)).wasmBackend;ni("webgpu",e,5),ni("webnn",e,5),ni("cpu",e,10),ni("wasm",e,10)}Object.defineProperty(Vt.versions,"web",{value:Y1,enumerable:!0});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 *//**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ai(e){return e.replace(/\.\d+$/,"")}function Q1(e,t){return e.map(r=>r==="batch"?t:r===-1?1:r)}class _0{constructor(t){this.path=t,this.session=null,this.hStateInfo={}}async init(){this.session=await Jd.create(this.path),this.hStateInfo={};for(let t=0;t<this.session.inputNames.length;t++){const r=this.session.inputNames[t],n=this.session.inputMetadata[t];if(ai(r).startsWith("h")){const i=n.shape.map(s=>s===-1?1:s);this.hStateInfo[r]=i}}this.createState()}createState(t=1){if(!this.session)throw new Error("Call init() first");const r={};for(const[n,i]of Object.entries(this.hStateInfo)){const s=Q1(i,t),o=s.reduce((d,f)=>d*f,1),u=new Float32Array(o);r[n]=new Pr("float32",u,s)}return r}async call(t,r){if(!this.session)throw new Error("Call init() first");const n={};for(const[d,f]of Object.entries(t)){if(ai(d).startsWith("h"))continue;const h=this.session.inputNames.indexOf(d);if(h===-1)throw new Error(`Unknown input '${d}'`);const g=this.session.inputMetadata[h].shape.map(v=>v==="batch"||v===-1?1:v);n[d]=new Pr("float32",Float32Array.from(f),g)}for(const[d,f]of Object.entries(r))n[d]=f;const i=await this.session.run(n),s={},o={},u=Object.entries(i).filter(([d])=>ai(d).startsWith("h")).reduce((d,[f])=>{const h=ai(f);return d[h]||(d[h]=[]),d[h].push(f),d},{});for(const d of Object.keys(this.hStateInfo)){const f=ai(d),h=u[f];if(!h||h.length===0)throw new Error(`No output hidden state matches input hidden state base '${f}'`);let m=h.find(g=>g===d);m||(m=h[0]),o[d]=i[m]}for(const[d,f]of Object.entries(i))ai(d).startsWith("h")||(s[d]=Array.from(f.data));return{outputs:s,nextState:o}}}function b0(e,t,r,n=40){let i=null,s=null,o=null,u=!1;async function d(){e.session||await e.init(),i=e.createState()}async function f(){try{const v=t(),{outputs:_,nextState:$}=await e.call(v,i);i=$,s=r(_)}catch(v){console.error("streamRnn step error:",v)}}async function h(){u||(u=!0,i||await d(),o=setInterval(f,1e3/n))}function m(){u&&(clearInterval(o),o=null,u=!1)}h();function g(){return s}return g.stop=m,g}class kf{constructor(){this.running=!1}run(){}trigger(t,r){let n=!1,i=setInterval(()=>{(n||!this.running)&&clearInterval(i),t()&&(n=!0,r())},100)}blendTo(t){t.out(o0)}}const Z1=new _0("models/smooth_peak.onnx"),Ua=b0(Z1,()=>({x:a.fft}),e=>e.output[0]),J1=new _0("models/momentum.onnx"),Dr=b0(J1,()=>({x:a.fft}),e=>e.output[0]),ex={smoothPeak:Ua,momentum:Dr};class tx extends kf{run(){this.blendTo(solid(0,0,0,1))}}class rx extends kf{run(){let t=osc(7,.1).mask(shape(2,.5,()=>Dr()*.033+Ua()*.1)).mask(shape(4,.8,()=>Dr()*.03+Ua()*.1)).brightness(()=>-.4+.5*Dr());this.blendTo(t),this.trigger(()=>Dr()==1,()=>{let r=time;t.blend(src(o0),()=>.2+Ua()*.3).color(()=>1-.8*Math.sin(.1*(time-r)),1,1).modulate(noise(10),()=>(time-r)*.005).scale(()=>1+1e-4*(time-r)).rotate(()=>.001*(time-r)).out()})}}class ax extends kf{run(){speed=.0222;let t=osc(48,()=>-.1-.5*Dr(),0).thresh([.3,.7].fast(.75),0).color(0,0,1).add(osc(28,()=>.1+.2*Dr(),0).thresh([.3,.7].fast(.75),0).rotate(3.14/4).color(1,0,0).modulateScale(osc(()=>Ua()*.8+Dr(),-.01,0).thresh([.3,.7].fast(.75),0))).diff(osc(28,()=>.1+.3*Dr(),0).thresh([.3,.7].fast(.5),0).rotate(3.14/2).color(1,0,1).modulateScale(osc(()=>64+Ua()*.8+Dr()*5,-.015,0).thresh([.3,.7].fast(.5),0))).modulateRotate(osc(54,-.005,0).thresh([.3,.7].fast(.25),0)).modulateScale(osc(44,-.02,0).thresh([.3,.7].fast(.25),0)).colorama(()=>Math.sin(time/27)*.01222+9.89).scale(()=>Ua()*.1+2.122).brightness(()=>-.2*Dr());t.out(),this.trigger(()=>Dr()==1,()=>{let r=time;t.blend(src(o0),()=>.1+.3*Ua()).modulate(noise(10),()=>(time-r)*.005).scale(()=>1-.001*(time-r)).rotate(()=>.01*(time-r)).out()})}}const gu=[tx,ax,rx],nx=["p"],ix=["i","/"],sx=["a"],ox=["s","j"],ux=["d","delete","backspace"],ru=1,As={textElementBorder:!1,textElementBorderColor:"#ffffff"},lx=document.getElementById("text"),dx=document.getElementById("visual"),Es=document.getElementById("edit-panel"),fx=document.getElementById("edit-panel-header"),Rg=document.getElementById("metrics-monitor");let Af=!1,yu={x:0,y:0};fx.addEventListener("mousedown",e=>{const t=document.activeElement.tagName.toLowerCase();t==="input"||t==="label"||(Af=!0,yu.x=e.clientX-Es.offsetLeft,yu.y=e.clientY-Es.offsetTop,e.stopPropagation())});document.addEventListener("mousemove",e=>{Af&&(Es.style.right="",Es.style.left=`${e.clientX-yu.x}px`,Es.style.top=`${e.clientY-yu.y}px`)});document.addEventListener("mouseup",()=>{Af=!1});window.controlValues=As;const zg=document.getElementById("textElementBorder"),Bg=document.getElementById("textElementBorderColor");function If(){document.querySelectorAll(".text-element").forEach(t=>{As.textElementBorder?t.style.boxShadow=`inset 0 0 0 1px ${As.textElementBorderColor}`:t.style.boxShadow="none"})}zg.addEventListener("change",()=>{As.textElementBorder=zg.checked,If()});Bg.addEventListener("input",()=>{As.textElementBorderColor=Bg.value,If()});const Ss=["scale","opacity","rotate"];let si=0,Zr=!1;const cx=new Cw({canvas:dx,detectAudio:!0,enableStreamCapture:!1});let Rd=null;const w0=e=>{a.setBins(24),a.setCutoff(1),a.setSmooth(0),speed=1,Rd!==null&&(Rd.running=!1);let t=new e;t.running=!0,t.run(),Rd=t};function x0(){const e=window.devicePixelRatio||1;cx.setResolution(window.innerWidth*e,window.innerHeight*e)}x0();window.addEventListener("resize",x0);window.addEventListener("load",()=>{!isNaN(ru)&&ru>=0&&ru<gu.length&&w0(gu[ru])});let oi=[],Qr=null;document.body.addEventListener("keydown",e=>{if(document.activeElement.tagName.toLowerCase()==="textarea")return;let r=e.key.toLowerCase(),n=parseInt(r);nx.includes(r)&&hx(),ix.includes(r)&&E0(),isNaN(n)||n>=0&&n<gu.length&&w0(gu[n]),Zr&&(sx.includes(r)&&gx(),ox.includes(r)&&px(),ux.includes(r)&&mx(Qr))});function $0(e){si=e,document.getElementById("current-transformation-indicator").textContent=Ss[si]}function px(){$0((si+1)%Ss.length)}function E0(){Zr=!Zr,$0(0),document.body.classList.toggle("edit-mode",Zr),Zr?a.show():a.hide()}function hx(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(e=>{console.error(`Error attempting fullscreen: ${e.message}`)})}function Xd(e){Qr!==e&&(Qr&&Qr.classList.remove("selected-text-element"),Qr=e,oi=oi.filter(t=>t!==e),oi.unshift(e),Qr&&Qr.classList.add("selected-text-element"))}function mx(e){e!==null&&(e.remove(),oi=oi.filter(t=>t!==Qr),Qr=oi[0]||null,Qr&&Qr.classList.add("selected-text-element"))}function gx(){const e="text",t=document.createElement("div");t.className="text-element",t.style.left="100px",t.style.top="100px",t.style.transform="rotate(0deg) scale(1)",t.innerHTML=`
    <span>${e}</span>
    <textarea name="text">${e}</textarea>
  `;let r=!1,n,i,s,o,u=0,d=1,f=1;t.addEventListener("mousedown",m=>{Zr&&(r=!0,n=m.clientX,i=m.clientY,s=parseFloat(t.style.left),o=parseFloat(t.style.top),Xd(t),m.preventDefault(),m.stopPropagation())}),document.addEventListener("mousemove",m=>{if(!Zr||!r)return;const g=m.clientX-n,v=m.clientY-i;t.style.left=`${s+g}px`,t.style.top=`${o+v}px`}),document.addEventListener("mouseup",()=>{r=!1}),t.addEventListener("wheel",m=>{Zr&&(m.preventDefault(),Ss[si]==="rotate"?(u+=m.deltaY<0?-1:1,h()):Ss[si]==="scale"?(d+=m.deltaY<0?.025:-.025,d=Math.max(.9,d),h()):Ss[si]==="opacity"&&(f+=m.deltaY<0?.05:-.05,f=Math.min(1,Math.max(.1,f)),t.style.opacity=f))});function h(){t.style.transform=`rotate(${u}deg) scale(${d})`}t.addEventListener("dblclick",()=>{Zr&&(t.classList.add("editing"),t.querySelector("textarea").focus())}),t.querySelector("textarea").addEventListener("blur",()=>{const m=t.querySelector("textarea").value;t.querySelector("span").textContent=m,t.classList.remove("editing")}),t.addEventListener("click",()=>{Zr&&(document.querySelectorAll(".text-element").forEach(m=>m.classList.remove("selected")),t.classList.add("selected"))}),lx.appendChild(t),If(),Xd(t)}document.body.addEventListener("mousedown",()=>{Zr&&Xd(null)});function S0(){Rg.innerHTML="";for(const[e,t]of Object.entries(ex)){const r=document.createElement("div");let n=t();typeof n=="number"&&(n=n.toFixed(3)),r.textContent=`${e}: ${n}`,Rg.appendChild(r)}}S0();setInterval(S0,100);E0();
