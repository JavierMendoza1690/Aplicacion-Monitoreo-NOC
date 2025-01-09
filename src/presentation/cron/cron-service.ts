import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

//* CLASE ENCARGADA DE LLAMAR EL PAQUETE DE TERCEROS PARA  NO ACOPLAR CODIGO A NUESTRA APLICACION

export class CronService {
    static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
        
        //Se encarga de llamar al paquete de terceros, 
        // primer argumento: cronTime string para configurar tiempo del tick
        //onTick: callback que se ejecutará cuando pase el tiempo configurado en el primer argumento
        const job = new CronJob(cronTime, onTick);
        job.start(); 

        //retorna job por si se necesita hacer una parada del servicio
        return job; //por si necesito hacer un job stop
    }
}
