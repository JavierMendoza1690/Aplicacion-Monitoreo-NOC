import { error } from "console";
import { CheckService } from "../domain/use-cases/chekcs/check-service";
import { CronService } from "./cron/cron-service";

//* Esta clase está en la capa presentation porque solo se encarga de mostrar contenido, no se desea ejecutar logica 
//* Clase que se encarga de enviar argumentos a la clase check-service para que ella ejecute toda la logica 

export class Server{
    
    public static start(){
        console.log('Server Started...');
        
        // Llamando al metodo estatico createJob dentro de la clase CronService
        //se encarga de importar el paquete de terceros desacoplado
        CronService.createJob(
            '*/5 * * * * *',
            //segundo argumento del metodo estatico createJob
        () => {
            const url = 'https://google.com'
            //creando instancia del useCases CheckService
            const checkServiceObj = new CheckService(
                ()=>console.log(`${url} is up`),
                (error)=>console.log(error)
            );
            checkServiceObj.execute( url )
        }

        );


    }


}


