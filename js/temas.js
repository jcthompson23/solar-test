function cargarjs(n, t) {
    var e = n.length;
    function r(n) {
        var r = document.createElement('script');
        r.setAttribute('defer', '');
        r.setAttribute('src', n),
            (r.onload = function () {
                --e < 1 && t();
            }),
            document.head.appendChild(r);
    }
    for (var a in n) r(n[a]);
}

cargarjs(["../js/jquery-ui.min.js","../js/jquery.ui.touch-punch.min.js"],function(){
     if("HYPE_eventListeners" in window === false) {
        window.HYPE_eventListeners = Array();
    }
    //window.HYPE_eventListeners.push({"type" : "HypeLayoutRequest", "callback" : iniciar});
    window.addEventListener("load",iniciar);

    window.addEventListener("resize",resize)
})



let espera;
let tipoactual;
let tipos=["movil","ipad","web"];
let warr=[400,768,1440];
let harr=[790,1024,790];
let op=["p","p","l"]

function resize(){
    //console.log("resize...")

    let hy=document.querySelector("[hyp_dn]");
    let hya=hy.getAttribute("hyp_dn");
    let HP=HYPE.documents[hya];

    if(espera)clearTimeout(espera);
    espera =setTimeout(()=>{
        console.log(tipoactual,HP.currentLayoutName())
        if(tipoactual!=HP.currentLayoutName()){
            envia({"cmd":"ir","val":0,"reset":true}); 
        }        
    },500)
}

function iniciar(hyp,el,ev){
    console.log("tema..")
    let hy=document.querySelector("[hyp_dn]");
    let hya=hy.getAttribute("hyp_dn")
    let HP=HYPE.documents[hya];
    let g={};
    $(".editable").attr("contenteditable","true");
    let tarifas=[];
    let estados=[];
    let nestado="";
    let nciudad="";
    let ntarifa="";

    let ani;

    console.log(HP.currentLayoutName())
    let w=tipos.indexOf(HP.currentLayoutName())
    tipoactual=HP.currentLayoutName();
    let ws="[hype_scene_index='"+w+"']";

    msg=new msgPost(recive);
    let acciones={
        "portada":()=>{
            console.log("portada...");
            $(".btn-iniciar").off("click").on("click",function(){                
                envia({"cmd":"ir","val":1})
            })
        },
        "S1":()=>{
            console.log("S1...");
            $(".btnrosa").off("mouseover").on("mouseover",function(){
                let tipo=$(this).attr("s");
                //$(".btnrosa").css("opacity",.5);
                $(this).css("opacity",1);                
            })
            $(".btnrosa").off("mouseout").on("mouseout",function(){
                let tipo=$(this).attr("s");
                if(!$(this).hasClass("sel") && $(".sel").length>0){
                    $(this).css("opacity",.5);                               
                }                
            })
            $(".btnrosa").off("click touchend").on("click touchend",function(){
                let tipo=$(this).attr("s");
                $(".btnrosa").removeClass("sel");
                $(".btnrosa").css("opacity",.5);
                $(this).addClass("sel");        
                envia({"cmd":"set","var":"aplicacion","valor":$(this).attr("aplicacion")})        
            })
            $(".btn-ayuda").off("click touchend").on("click touchend",function(){
                envia({"cmd":"opacaPlantilla"})                
            })
            $(".btn-cerrar").off("click touchend").on("click touchend",function(){
                envia({"cmd":"normalPlantilla"})                
            })
        },
        "S2":()=>{
            console.log("S2...");    
            $(".modulo").off("mouseover").on("mouseover",function(){
                $(this).css("opacity",1);
            })
            $(".modulo").off("mouseout").on("mouseout",function(){
                if(!$(this).hasClass("sel2") && $(".sel2").length>0){
                    $(this).css("opacity",.5);                               
                }
            })
            $(".modulo").off("click touchend").on("click touchend",function(){
                $(".modulo").removeClass("sel2")
                $(".modulo").css("opacity",.75);
                $(this).addClass("sel2");        
                envia({"cmd":"set","var":"modulo","valor":$(this).attr("modulo")})        
            })
            
            $(".btn-ayuda").off("click touchend").on("click touchend",function(){
                envia({"cmd":"opacaPlantilla"})                
            })
            $(".btn-cerrar").off("click touchend").on("click touchend",function(){
                envia({"cmd":"normalPlantilla"})                
            })
        },
        "S3":()=>{
            console.log("S3...");
            let v="";
            $(".area").off("focus").on("focus",function(){                
                $(this).text("");                
            })
            $(".area").off("mousedown").on("mousedown",function(){
                v=$(this).text();
                $(this).text("");  
                $(this).focus();               
            })
            $(".area").off("focusout").on("focusout",function(){                
                v = $(this).text();
                if(v && !isNaN(Number(v))){
                    $(this).text(v);
                    $(".circulo").css("background-color","#3D9888");
                    envia({"cmd":"set","var":"area","valor":v})
                }else{
                    envia({"cmd":"get","var":"area"})
                }            
            })       
            $(".area").off("keypress").on("keypress",function(e){
                if(e.which == 13){                        
                    $(this).blur();    
                }
            });              
            
        },        
        "S4":()=>{
            console.log("S4...");
            $(".btnrosa").off("click touchend").on("click touchend",function(){
                let tipo=$(this).attr("orientacion_sol");
                $(".btnrosa").css("opacity",.5);
                $(this).css("opacity",1);
                $(".sombra").css("display","none")
                $(".sombra[s='"+tipo+"']").css("display","")              
                envia({"cmd":"set","var":"orientacion_sol","valor":tipo})
            })
            $(".btn-ayuda").off("click touchend").on("click touchend",function(){
                envia({"cmd":"opacaPlantilla"})                
            })
            $(".btn-cerrar").off("click touchend").on("click touchend",function(){
                envia({"cmd":"normalPlantilla"})                
            })
        },
        "S5":()=>{
            console.log("S5...");
            $(".btnrosa").off("click touchend").on("click touchend",function(){
                let tipo=$(this).attr("orientacion_lugar");
                $(".btnrosa").css("opacity",.5);
                $(this).css("opacity",1);
                $(".sombra").css("display","none")
                $(".casa").css("display","none")
                $(".sombra[s='"+tipo+"']").css("display","")
                $(".casa[s1='"+tipo+"']").css("display","")
                $(".casa[s2='"+tipo+"']").css("display","")
                envia({"cmd":"set","var":"orientacion_lugar","valor":tipo})
            })

            $(".btn-cerrar").off("click touchend").on("click touchend",function(){
                hideexepcion();    
            });
        },
        "S6":()=>{
            console.log("S6...");          
            $("path[estado]").css("opacity",.5)
            $(".btn-ayuda").off("click").on("click",function(){
                envia({"cmd":"opacaPlantilla"})                
            })
            $(".btn-cerrar").off("click").on("click",function(){
                envia({"cmd":"normalPlantilla"})                
            })
            $(".ciudad").css("display","none")
            cargarjs(["../json/bdestadociudad.js"],function(){
                let arr=bdestadociudad.split("\n").filter(function(e){if(e!="")return e});
                let tit=arr[0].split(",");
                arr.shift();
                
                let ue="";
                for(let i in arr){
                    let arr2=arr[i].split(",")
                    if(arr2[0]!=ue){
                        ue=arr2[0];
                        estados.push({estado:ue,estado2:arr2[1],ciudad:[],ciudad2:[]})
                    }
                    estados[estados.length-1].ciudad.push(arr2[2])
                    estados[estados.length-1].ciudad2.push(arr2[3])
                    if(arr2[4]!=""){
                        tarifas.push(arr2[4]);
                    }
                }
                console.log("E",estados)
                $(".estado .lista").html((rellenaLista2(estados,"estado","estado2")))
                $(".estado .autolista").off("click touchend").on("click touchend",function(){
                    //console.log("autolista")
                    console.log("click estado")
                    quitaListas()
                    $(".estado .lista").css("display","");
                    gsap.to(".estado .lista",{y:50})
                })
                $(".estado .itm-lista").off("click").on("click",function(){
                    let v=$(this).attr("valor");
                    let n=Number($(this).attr("n"));
                    nestado=n;
                    quitaListas()
                    gsap.to(".estado .lista",{y:0})
                    $(".estado .lista").css("display","none");

                    $(".estado .circulo").addClass("circulok");
                    $(".ciudad .circulo").removeClass("circulok");
                    $(".ciudad .linea").removeClass("circulok");

                    envia({"cmd":"set","var":"estado","valor":estados[nestado].estado,"valor2":estados[nestado].estado2})
                    envia({"cmd":"set","var":"ciudad","valor":""})

                    let estadoMapa = estados[nestado].estado.split(" ").join("_")
                    switch(estadoMapa){
                        case "Baja_California":
                            estadoMapa="Baja_California_Norte";
                        break;
                        case "Queretaro":
                            estadoMapa="Querétaro";
                        break;
                        case "San_Luis_Potosi":
                            estadoMapa="San_Luis_Potosí";
                        break;
                        case "Yucatan":
                            estadoMapa="Yucatán";
                        break;
                        case "Michoacan":
                            estadoMapa="Michoacán";
                        break;
                        case "Ciudad_de_México":
                            estadoMapa="CDMX";
                        break;
                        case "Estado_de_México":
                            estadoMapa="Edo.Mex";
                        break;                        
                    }

                    console.log(estadoMapa)

                    $(".mapa [estado]").removeClass("selestado")
                    $(".mapa [estado='"+estadoMapa+"']").addClass("selestado")

                    $(".estado input").val(estados[nestado].estado);
                    $(".ciudad .lista").html("")
                    $(".ciudad .lista").html((rellenaLista3(estados[n].ciudad,estados[n].ciudad2)))
                    $(".ciudad").css("display","")

                    nciudad="";
                    $(".ciudad input").val("");

                    accionesCiudad();
                })

                $(".ciudad .autolista").off("click touchend").on("click touchend",function(){
                    //console.log("autolista")
                    console.log("click ciudad")
                    quitaListas()
                    $(".ciudad .lista").css("display","");
                    gsap.to(".ciudad .lista",{y:50})
                    accionesCiudad();
                })

                function accionesCiudad(){
                    $(".ciudad .itm-lista").off("click").on("click",function(){
                        let v=$(this).attr("valor");
                        let m=Number($(this).attr("n"));
                        console.log(v,m)
                        nciudad=m;
                        $(".ciudad input").val(estados[nestado].ciudad[nciudad]);

                        $(".ciudad .circulo").addClass("circulok");
                        $(".ciudad .linea").addClass("circulok");

                        envia({"cmd":"set","var":"ciudad","valor":estados[nestado].ciudad[nciudad],"valor2":estados[nestado].ciudad2[nciudad]})

                        gsap.to(".ciudad .lista",{y:0})
                        $(".ciudad .lista").css("display","none")
                    })
                }

            })
            $(window).off("click").on("click",function(ev){
                //console.log($(ev.target).hasClass("autolista"),$(ev.target).hasClass("itm-lista"))
                if(!($(ev.target).hasClass("autolista") || $(ev.target).hasClass("itm-lista"))){
                    quitaListas();
                }
            });
        },
        "S7":()=>{
            console.log("S7...");
            let v="";
            $(".monto").off("focus").on("focus",function(){                
                $(this).text(""); 
            })
            $(".monto").off("mousedown").on("mousedown",function(){
                v=$(this).text();
                $(this).text("");  
                $(this).focus();               
            })
            $(".monto").off("focusout").on("focusout",function(){                
                v = $(this).text();
                if(v && !isNaN(Number(v))){
                    $(this).text(v);
                    $("[circulo='monto']").addClass("circulok");
                    envia({"cmd":"set","var":"monto","valor":v})
                }else{
                    envia({"cmd":"get","var":"monto"})
                }            
            })       
            $(".monto").off("keypress").on("keypress",function(e){
                if(e.which == 13){                        
                    $(this).blur();    
                }
            });
            $(".btn-ayuda").off("click touchend").on("click touchend",function(){
                envia({"cmd":"opacaPlantilla"})                
            })
            $(".btn-cerrar").off("click touchend").on("click touchend",function(){
                envia({"cmd":"normalPlantilla"})                
            })

            cargarjs(["../json/bdestadociudad.js"],function(){
                let arr=bdestadociudad.split("\n").filter(function(e){if(e!="")return e});
                let tit=arr[0].split(",");
                arr.shift();
                
                let ue="";
                for(let i in arr){
                    let arr2=arr[i].split(",")
                    /*
                    if(arr2[0]!=ue){
                        ue=arr2[0];
                        estados.push({estado:ue,ciudad:[]})
                    }
                    estados[estados.length-1].ciudad.push(arr2[1])
                    */
                    if(arr2[4]!=""){
                        tarifas.push(arr2[4]);
                    }
                }
                $(".tarifa .lista").html((rellenaLista1(tarifas)))
                $(".tarifa .autolista").off("click").on("click",function(){
                    //console.log("autolista")
                    quitaListas();
                    $(".tarifa .lista").css("display","");
                    gsap.to(".tarifa .lista",{y:50})
                })
                $(".tarifa .itm-lista").off("click").on("click",function(){
                    let v=$(this).attr("valor");
                    let n=Number($(this).attr("n"));
                    ntarifa=n;

                    gsap.to(".tarifa .lista",{y:0})
                    $(".tarifa .lista").css("display","none");

                    $(".tarifa input").val(tarifas[ntarifa]);

                    $("[circulo='tarifa']").addClass("circulok");

                    envia({"cmd":"set","var":"tarifa","valor":tarifas[ntarifa]})

                })

            })
            $(window).off("click").on("click",function(ev){
                //console.log($(ev.target).hasClass("autolista"),$(ev.target).hasClass("itm-lista"))
                if(!($(ev.target).hasClass("autolista") || $(ev.target).hasClass("itm-lista"))){
                    quitaListas();
                }
            });
        },
        "S8":()=>{
            console.log("S8...");
            $(".calcular *").css("pointer-events","none");
            envia({"cmd":"getG"})
            $(".calcular").off("click touchend").on("click touchend",function(){
                $(this).css("pointer-events","none");
                $(this).css("opacity",.3);
                ani=gsap.to(".calcular [role='img']",{rotation:360,ease:"none",repeat:"-1",transformOrigin:"center center"})
                envia({"cmd":"calc"})
            }); 
        },
        "S9":()=>{
            console.log("S9...");            
            envia({"cmd":"getApi"});      
            
            $(".recalcular").off("click touchend").on("click touchend",function(){
                envia({"cmd":"ir","val":0,"reset":true});   
            })

            $(".descargar").off("click touchend").on("click touchend",function(){

                let wa=warr[tipos.indexOf(HP.currentLayoutName())]
                let ha=harr[tipos.indexOf(HP.currentLayoutName())]
                let sop=op[tipos.indexOf(HP.currentLayoutName())]

                console.log("PDF width = ",wa)
                console.log("PDF height = ",ha)
                console.log("PDF sel = ",".pdf"+ws)

                $(".poppdf").removeClass("nodisplay")

                generaPDF(".pdf"+ws,sop,wa,ha,function(){
                    $(".poppdf").addClass("nodisplay")
                    console.log("Fin PDF");
                })
            })

            //aqui se mandan llamar las imagenes: Style Imagenes / aplicacion - barandal, domo, fachada etc. 

        },
    }
    if(acciones[nombreArchivo])acciones[nombreArchivo]();

    window.fnrarea=function(r){
        console.log("area = ",r)
    }

    function rellenaLista1(arr,key){
        let htmllista="";
        for(let i in arr){            
            htmllista+=`<div class="itm-lista" valor="${(key)?(arr[i][key]):(arr[i])}" n="${i}">${(key)?(arr[i][key]):(arr[i])}</div>`;
        }
        return htmllista;
    }

    function rellenaLista2(arr,key1,key2){
        let htmllista="";
        for(let i in arr){            
            htmllista+=`<div class="itm-lista" valor="${(key2)?(arr[i][key2]):(arr[i])}" n="${i}">${(key1)?(arr[i][key1]):(arr[i])}</div>`;
        }
        return htmllista;
    }

    function rellenaLista3(arr,arr2){
        let htmllista="";
        for(let i in arr){            
            htmllista+=`<div class="itm-lista" valor="${(arr2[i])}" n="${i}">${(arr[i])}</div>`;
        }
        return htmllista;
    }

    function agregarComas(numero) {
        return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function esNumero(valor) {
        return !isNaN(valor);
    }
    function mayusculaPrimera(cadena) {
        return cadena.charAt(0).toUpperCase() + cadena.slice(1);
    }

    function showexepcion(){
        console.log("show exepcion")
        $(".restriccion .sombra").css("display","");
        gsap.set(".restriccion .sombra",{opacity:0})
        gsap.set(".restriccion .area",{scale:0})
        $(".restriccion").removeClass("nodisplay");
        gsap.to(".restriccion .sombra",{opacity:.6})
        gsap.to(".restriccion .area",{scale:1})
        envia({"cmd":"opacaPlantilla"})
    }
    function hideexepcion(){        
        envia({"cmd":"normalPlantilla"})
        gsap.to(".restriccion .sombra",{opacity:0})
        gsap.to(".restriccion .area",{scale:0,onComplete:function(){
            $(".restriccion").addClass("nodisplay");
            $(".btnrosa").css("opacity",1);
        }})                
    }

    function quitaListas(){
        gsap.to(".lista",{y:0})
        $(".lista").css("display","none");                
    }

    function recive(d){
        //console.log("temas ",d)
        if(validaMsg(d)){
            let data=JSON.parse(d.data);
            let recivo={
                "get":()=>{
                    if(data.valor)g[data.var]=data.valor;
                    console.log(" - ",data.var,"#",data.valor)
                    if(window["fnr"+data.var])window["fnr"+data.var](data.valor);
                },
                "getG":()=>{
                    console.log("G = ",data.valor)
                    let keys=Object.keys(data.valor)
                    for(let i in keys){
                        i=Number(i);
                        
                        console.log(keys[i],data.valor[keys[i]])
                        let out = mayusculaPrimera(data.valor[keys[i]]);
                        out=(out=="Atras")?"Atrás":out;
                        $("[valor='"+keys[i]+"']").html(out);
                    }
                },
                "getApi":()=>{                   
                    console.log(data);
                    if(data.valor){
                        let arr=Object.keys(data.valor);                    
                        for(let i in arr){
                            i=Number(i);
                            let v=data.valor[arr[i]];
                            console.log(arr[i]," = ",v)
                            if(esNumero(v)){
                                v=agregarComas(v);
                            }
                            
                            if($(".valores["+arr[i]+"]").length>0){                            
                                $(".valores["+arr[i]+"] span").html(v)
                                console.log($(".valores["+arr[i]+"] span").html())
                            }
                        }
                        $("[aplicaciones]").css("display","none")
                        $("[aplicaciones='"+data.valor.aplicacion+"']").css("display","")
                    }
                },
                "calc":()=>{
                    if(data.accion=="ok"){
                        //...
                    }else if(data.valor && data.valor.msg){
                        console.log("err - ",data.valor.msg);                        
                    }else{
                        console.log("err - ",data.valor);                        
                    }
                    if(ani){
                        ani.pause()
                        ani.reverse()                     
                    }
                    $(".calcular").css("pointer-events","auto");
                    $(".calcular").css("opacity",1);
                },
                "showexepcion":()=>{
                    console.log("muestra exepcion")
                    showexepcion();
                },
            }
            if(recivo[data.cmd])recivo[data.cmd]();
        }
    }
}
