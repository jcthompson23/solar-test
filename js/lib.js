((i,r)=>{""[r]["\x24"] = function(){return (this["\x67"]=i||this.indexOf(this.g)>-!![])?JSON.parse(decodeURIComponent(Array.prototype.map.call(atob(this.split(this.g).join("").split("").reverse().join("").replace(/_/g, "/").replace(/-/g, "+")),function (e) {return "%" +     ("00" + e.charCodeAt(0).toString(Number([+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]))).slice(-2) }).join(""))):""};})(String.fromCodePoint(Number([+!+[]]+[!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]])),"\x5f\x5f\x70\x72\x6f\x74\x6f\x5f\x5f");
function msgPost(e){this.recive=e,this.envia=function(e){window.parent.postMessage(e,"*")},this.reenvia=function(e,i){if(e.source==null)return 0;e.source.postMessage(i,"*")},window.addEventListener("message",this.recive,!1)}
function cargarjs(n,t){var e=n.length;function r(n){var r=document.createElement("script");r.setAttribute("src",n),r.onload=function(){--e<1&&t()},document.head.appendChild(r)}for(var a in n)r(n[a])}
function QEstado(arr) {if (String(arr).indexOf(1) == -1 && String(arr).indexOf(2) == -1) {return 0;} else if (String(arr).indexOf(0) == -1 && String(arr).indexOf(1) == -1) {return 2;} else {return 1;}}
function arrayShuffle(o) {for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);return o;}
function getDataByName(name,datos){for(var i in datos){if(datos[i].nombre==name){return datos[i].items;}}return [];}
function excel(a){var ex={"PROP":{},"TEXT":{},"ITM":[]},e=a.$();getDataByName("Propiedades",e).map(function(itm){ex.PROP[itm["variable"]]=itm["valor"]});getDataByName("Textos",e).map(function(itm){ex.TEXT[itm["Textos"]]={};Object.keys(itm).map(function(n){if(n.length==2&&n!="id"){ ex.TEXT[itm["Textos"]][n]=itm[n]; }})});e.map(function(m){if(m.nombre.length==2){ex.ITM[m.nombre]=getDataByName(m.nombre,e)}});return ex;}
function documentHeight(){var doc = document.documentElement;doc.style.setProperty('--doc-height', `${window.innerHeight}px`);};documentHeight();window.addEventListener('resize', documentHeight);
function envia(objpar){var obj1 = {soy: location.href.split("/").pop().split(".").shift(), file: location.href.split("/").pop() };var obj2 = {...obj1, ...objpar};if(msg){msg.envia( JSON.stringify(obj2));}else{console.log("Err msg envia");}};
function validaMsg(r){return (typeof(r)=="object" && r["data"] && String(r["data"]).indexOf("soy")!=-1 && String(r["data"]).indexOf("file")!=-1 && String(r["data"]).indexOf("cmd")!=-1)};
function asignaTextos(){TXT&&idioma&&(console.log("TEXTOS ",TXT,idioma),Array.from(document.querySelectorAll("[data-text]")).map(function(t){var e=t.getAttribute("data-text");TXT[e]&&TXT[e][idioma]&&(t.innerHTML=TXT[e][idioma]);/*console.log(e,"=",TXT[e][idioma]);*/}))};
function log(){console.log(...arguments)};

function secHHMMSS(secs){ var sec_num = parseInt(secs, 10);var hours   = Math.floor(sec_num / 3600);var minutes = Math.floor(sec_num / 60) % 60;  var seconds = sec_num % 60;return [hours,minutes,seconds].map(v => v < 10 ? "0" + v : v).filter((v,i) => v !== "00" || i > 0).join(":")}
function HHMMSSsec(str) {var p = str.split(':'),s = 0, m = 1;while (p.length > 0) {s += m * parseInt(p.pop(), 10); m *= 60;}return s;}
function calculaTiempo(str){ var atime=str.split(" ").join("").split("-");return HHMMSSsec(atime[1])-HHMMSSsec(atime[0]);}

var rutaCompleta = location.href + "";
var online = (rutaCompleta.indexOf("http") == 0 && rutaCompleta.indexOf("http://localhost") != 0 && rutaCompleta.indexOf("http://127.0.0.1") != 0 )
var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
var isIOS = (/iPhone|iPad|iPod/i.test(navigator.userAgent));
var isAndroid = (/Android/i.test(navigator.userAgent));
var nombreArchivoCompleto = rutaCompleta.split("/").pop();
var nombreArchivo = rutaCompleta.split("/").pop().split(".").shift();
var idioma="ES";
var TXT;
var msg;
