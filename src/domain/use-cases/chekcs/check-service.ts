
//* La clase CheckService está en la carpeta de dominio porque es contiene ejecución de codigo, recuerde que los useCases son encargados de ejecutar acciones en la logica de negocios, todo lo que sean acciones de ejecución deben ser useCases

import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

//* Clase que se encarga de manejar la peticion URL que se  envia por parametro al metodo execute


//* Interface para clase CheckService
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

// declarando los tipos de la inyeccion de dependencias
type SuccessCallback = (( ) => void | undefined);
type ErrorCallback = (( error:string ) => void | undefined);

export class CheckService implements CheckServiceUseCase {
    
    //*Inyeccion de dependencias
    //El constructor recibe argumentos, que con solo recibirlos se volverán atributos de la clase, importante colocar  sus modificadores de acceso
    constructor(
        // se llama al repositorio para poder recibir cualquiera sin importar el datasources
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ){}


    //* Metodo execute se encarga de hacer la petición al url y manejarla
    async execute(url: string): Promise<boolean> {
        try {
            // hace el fetch del url
            const req = await fetch(url);
            //verifica si el url no se pudo leer correctamente
            if (!req.ok) {
                //genera el throw new Error
                throw new Error(`Error on check service ${url}`);
            }

            //*----------- Creando instancia log de LogEntity-------------
           
            const log = new LogEntity(`Service ${url} working`, LogSeverityLevel.low)
            
            //*--------------------Guardando el log----------------
            //la clase logRepository, que se recibio como inyeccion es la que implementa los metodos abstractos del logRepository
            //en la capa de dominio
            this.logRepository.saveLog( log )
            
            // se llamará la función successCallback que se pasa como argumento al constructor al llegar a este punto
            // si el primer termino existe ejecuta el que va despues de &&
            this.successCallback && this.successCallback(); 
            
            return true;
        } catch (error) {

            
            const errorMessage = `${url} is not ok. ${error}`;
            // Creando un log con el mensaje de error
            const log = new LogEntity( errorMessage, LogSeverityLevel.high )
            
            //guardando el log en LogRepository
            this.logRepository.saveLog(log);

            //llama a la funcion errorCallback, que se pasó al constructor como argumento, al hacer la inyeccion de dependencias, recibe un string como argumento
            
            this.errorCallback && this.errorCallback(`Ocurrió un error ${error}`)
            //retorna falso si falló
            return false;
        }
    }
}
