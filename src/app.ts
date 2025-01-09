import { Server } from "./presentation/server";



//* Declarando funcion autoinvocada que llama al main
(async()=>{
    main();
})();

//* Creando funcion main
function main (){
    //llamando al metodo estatico start() de la clase Server
    Server.start();
}