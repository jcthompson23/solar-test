window.addEventListener("load",function(){
    console.log("indice..");
    let EX;
    let actual=0;
    let total;
    let to;
    let g={};    
    let msgs={};
    let api={};
    let err=[];

    let escenas=["portada","pregunta1","pregunta2","pregunta3","pregunta4","pregunta5","pregunta6","pregunta7","resumen","resultado"];
    window.escenaActual=function(){
        return escenas[actual];
    }
    window.getGlobal=function(gvar){
        if(arguments.length==0){
            return g;
        }else{
            return g[gvar]
        }        
    }

    msg=new msgPost(recive);

    $(".barrasuperior").addClass("ocultar")
    cargarjs(["./json/indice.js"],function(){        
        EX=excel(ajson); 
        console.log(EX)       
        total=EX.ITM[idioma].length;
        iniciar();
        
    })
    function resize() {
        if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
            var evt = document.createEvent('UIEvents');
            evt.initUIEvent('resize', true, false, window, 0);
            window.dispatchEvent(evt);
        } else {
            window.dispatchEvent(new Event('resize'));
            setTimeout(function(){
                window.dispatchEvent(new Event('resize'));
            },10)
        }
    }
    $(window).on("resize",function(){
        if(to)clearTimeout(to)
        $(".avance").css("opacity",0)
        gsap.set(".avance",{width:"0%"})
        to=setTimeout(function(){            
            mueveAvance();
            $(".avance").css("opacity",1)
        },500)        
    })
    function generarIframes(){
        let htmls="";
        for(let i in EX.ITM[idioma]){
            htmls+=`<iframe class="frm" n="${Number(i)}" src="${"./"+EX.ITM[idioma][Number(i)].carpeta+"/"+EX.ITM[idioma][Number(i)].archivo}"></iframe>`
        }
        $(".temas").html(htmls);
        for(let i=0;i<total;i++){
           // console.log(i,(i*100)+"vw")
            gsap.set(".frm[n='"+i+"']",{x:(i*100)+"vw"})
        }
        gsap.set(".frm[n='0']",{opacity:0})
    }
    function iniciar(){
        generarIframes();
        asignaEventos();
        gsap.set(".avance",{width:"0%"})
        ir(0);
        gsap.to(".frm[n='0']",{opacity:1,delay:3,onComplete:function(){
            $(".barrasuperior").css("opacity",0)
            $(".barrasuperior").removeClass("ocultar")
            gsap.to(".barrasuperior",{opacity:1})
        }})        
    }
    function asignaEventos(){
        $(".siguiente").off("click").on("click",function(){
            ir(actual+1)
        })
        $(".atras").off("click").on("click",function(){
            ir(actual-1)
        })
        $(".flecha").off("click").on("click",function(){
            if($(".red3").css("display")=="none"){
                $(".red3").css("display","block");
            }else{
                $(".red3").css("display","none");
            }
        })
    }
    function mueveAvance(){
        let p = ((actual/(total-1))*100)
        gsap.to(".avance",{width:p+"%"})
    }
    function ir(n){
        console.log("ir - ",EX.ITM[idioma][n].archivo)
        if(n<0 || n>=total) return 0;
        $(".siguiente,.atras,.pie,.barrasuperior").removeClass("nodisplay")
        let modo={
            "vacio":()=>{ $(".siguiente,.atras,.pie,.barrasuperior").addClass("nodisplay") },
            "navegacion":()=>{ $(".siguiente,.atras").addClass("nodisplay") },
            "siguiente":()=>{ $(".siguiente").addClass("nodisplay") },
            "atras":()=>{ $(".atras").addClass("nodisplay") } 
        }
        if(modo[EX.ITM[idioma][n].modo])modo[EX.ITM[idioma][n].modo]();
    
        for(let i=0;i<total;i++){
            //console.log(i,((i-n)*100));
            gsap.to(".frm[n='"+i+"']",{x:((i-n)*100)+"vw"})
        }

        actual=n;

        mueveAvance();
        validasiguiente();
    }
    function validasiguiente(){
        //console.log("actual - ",actual)
        switch(actual){
            case 1:  // Nombre de la página: Portada
                if(g.aplicacion){
                    console.log("aplicacion - ",g.aplicacion)
                    $(".siguiente").removeClass("nodisplay")
                }else{
                    $(".siguiente").addClass("nodisplay")    
                }
            break;
            case 2: // Nombre de la página: Pregunta 1
                if(g.modulo){
                    console.log("modulo - ",g.modulo)
                    $(".siguiente").removeClass("nodisplay")
                }else{
                    $(".siguiente").addClass("nodisplay")    
                }
            break;
            case 3:  // Nombre de la página: Pregunta 2
                if(g.area){
                    console.log("area - ",g.area)
                    $(".siguiente").removeClass("nodisplay")
                }else{
                    $(".siguiente").addClass("nodisplay")    
                }
            break;
            case 4: // Nombre de la página: Pregunta 3
                if(g.orientacion_sol){
                    console.log("orientacion_sol - ",g.orientacion_sol)
                    $(".siguiente").removeClass("nodisplay")
                }else{
                    $(".siguiente").addClass("nodisplay")    
                }
            break;
            case 5:     // Nombre de la página: Pregunta 4            
                if(g.orientacion_lugar){
                    console.log("orientacion_lugar - ",g.orientacion_lugar)
                    if((g.aplicacion=="ventana" || g.aplicacion=="barandal" || g.aplicacion=="fachada") && 
                       (
                        (g.orientacion_sol=="derecha" && g.orientacion_lugar=="frente") ||
                        (g.orientacion_sol=="frente" && g.orientacion_lugar=="izquierda") ||
                        (g.orientacion_sol=="izquierda" && g.orientacion_lugar=="atras") ||
                        (g.orientacion_sol=="atras" && g.orientacion_lugar=="derecha")
                       ) 
                    ){
                        $(".siguiente").addClass("nodisplay")
                        msg.reenvia(msgs["S5"],JSON.stringify({"file":nombreArchivoCompleto,"cmd":"showexepcion","soy":"indice"}))
                    }else{
                        $(".siguiente").removeClass("nodisplay")
                    }                    
                }else{
                    $(".siguiente").addClass("nodisplay")    
                }
            break;
            case 6: // Nombre de la página: Pregunta 5
                if(g.estado && g.ciudad){
                    console.log("estado,ciudad - ",g.estado,g.ciudad)
                    $(".siguiente").removeClass("nodisplay")
                }else{
                    $(".siguiente").addClass("nodisplay")    
                }
            break;
            case 7: // Nombre de la página: Pregunta 6
                if(g.monto && g.tarifa){
                    console.log("monto,tarifa - ",g.monto,g.tarifa)
                    $(".siguiente").removeClass("nodisplay")
                }else{
                    $(".siguiente").addClass("nodisplay")    
                }
            break;
            case 8: // Nombre de la página: Pregunta 7
                $(".siguiente").addClass("nodisplay")
                msg.reenvia(msgs["S8"],JSON.stringify({"file":nombreArchivoCompleto,"cmd":"getG","soy":"indice","valor":g,"err":err}))
            break;
            case 9: // Nombre de la página: Resultados
                $(".siguiente").addClass("nodisplay")
                msg.reenvia(msgs["S9"],JSON.stringify({"file":nombreArchivoCompleto,"cmd":"getApi","soy":"indice","valor":api}))
            break;
        }
    }
    function opacarPlantilla(){
        $(".pie,.barrasuperior").addClass("nop")
        $(".siguiente,.atras").addClass("nop2")
    }
    function normalPlantilla(){
        $(".pie,.barrasuperior").removeClass("nop") 
        $(".pie,.barrasuperior").css("opacity",0)   
        
        $(".siguiente,.atras").css("opacity",0)  
        $(".siguiente,.atras").removeClass("nop2")

        gsap.to([".pie",".barrasuperior"],{opacity:1,delay:0});
        gsap.to([".siguiente",".atras"],{opacity:1,delay:0});
    }
    function strLimpio(str){
        str=String(str).toLowerCase();
        str=str.split("á").join("a");
        str=str.split("é").join("e");
        str=str.split("í").join("i");
        str=str.split("ó").join("o");
        str=str.split("ú").join("u");
        str=str.split("ñ").join("n");
        return str;
    }
    function resetall(){
        g=null;
        g={};
        
        $("iframe").each(function(){
            let s = $(this).attr("src");
            let n = $(this).attr("n");
            
            if(n>0){     
                gsap.to("iframe[n='"+n+"']",{opacity:0,duration:.2})
                gsap.to("iframe[n='"+n+"']",{opacity:1,delay:2,duration:1})           
                       
                $(this).attr("src",`${"./"+EX.ITM[idioma][Number(n)].carpeta+"/"+EX.ITM[idioma][Number(n)].archivo}`);
            }
        });
    }
    function recive(d){
        if(validaMsg(d)){
            let data=JSON.parse(d.data);
            //console.log(data)
            //console.log(data.soy)
            msgs[data.soy]=d;
            let acciones={
                "ir":()=>{if(data.reset){resetall()};ir(data.val)},
                "opacaPlantilla":()=>{ opacarPlantilla() },
                "normalPlantilla":()=>{ setTimeout(()=>{normalPlantilla()},1800) },
                "get":()=>{msg.reenvia(d,{"cmd":"get","var":data.var,"valor":g[data.var]})},
                "set":()=>{g[data.var]=data.valor;if(data.var=="estado"){g["estado2"]=data.valor2};if(data.var=="ciudad"){g["ciudad2"]=data.valor2};validasiguiente();api=""},
                "getG":()=>{msg.reenvia(d,{"cmd":"getG","soy":"indice","valor":g})},
                "getApi":()=>{},
                "calc":()=>{
                    console.log("Calc...")
                    
                    const url = 'https://vitro.fly.dev/api/process';
                    const token = '13e3d21a-eeef-42ac-9f76-0ed895466f44';
                    const data = {
                        "modulo": g.modulo+"-bfgg",
                        "aplicacion": strLimpio(g.aplicacion),
                        "orientacion_sol": strLimpio(g.orientacion_sol),
                        "orientacion_lugar": strLimpio(g.orientacion_lugar),
                        "area_disponible": g.area,
                        "estado": strLimpio(g.estado2),
                        "ciudad": strLimpio(g.ciudad2),
                        "tarifa": strLimpio(g.tarifa),
                        "monto_bimestral": g.monto,
                        "nombre": "Test",
                        "telefono": "6671555555",
                        "correo": "test@gmail.com"
                    };
                    const datastr=JSON.stringify(data);
                    const datastrlen=datastr.length;
                    
                    console.log(datastr)
                    console.log(datastrlen)
            
                    fetch(url, {
                        method: 'POST',	  	  
                        redirect: 'follow',
                        //mode: 'no-cors',
                        //credentials: 'include',	
                        //referrer: "*",
                        //referrerPolicy: "no-referrer",		
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            //'Access-Control-Allow-Origin': 'http://127.0.0.1:5500/',				
                            //'Accept': 'application/json, text/plain, */*',
                            //'Access-Control-Allow-Credentials': 'true',
                            'Content-Length':`${datastrlen}`
                        },
                        body:datastr,
                    })
                    .then(response => response.json())
                    .then((data) => {
                        console.log(data);
                        err=null;
                        err=[];
                        if( data["detail"] && data["detail"].length>0 ){
                            for(let i in data["detail"]){
                                i = Number(i);
                                let f = data["detail"][i];
                                err[i]=f.loc[2]
                            }
                            iziToast.error({
                                title: 'Error',
                                message: err,
                            });
                            msg.reenvia(d,JSON.stringify({"file":nombreArchivoCompleto,"cmd":"calc","soy":"indice","valor":err,"accion":"err"}))
                        }else if(data["estatus"]){   
                            api=data;
                            if(data["estatus"]=="ok"){                                
                                msg.reenvia(d,JSON.stringify({"file":nombreArchivoCompleto,"cmd":"calc","soy":"indice","valor":api,"accion":"ok"}))
                                ir(9);
                                /*
                                iziToast.success({
                                    title: 'OK',
                                    message: 'Correcto',
                                });
                                */
                            }else{                                
                                msg.reenvia(d,JSON.stringify({"file":nombreArchivoCompleto,"cmd":"calc","soy":"indice","valor":api,"accion":"err"})) 
                                iziToast.error({
                                    title: 'Error',
                                    message: JSON.stringify(api),
                                });                               
                            }                                     
                        }                        
                    })
                    .catch(error => {
                        console.error(error);
                        iziToast.error({
                            title: 'Error',
                            message: error,
                        });
                    });
                }
            }
            if(acciones[data.cmd])acciones[data.cmd]();
        }
    }
})

