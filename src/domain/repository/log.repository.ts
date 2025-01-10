//* Una clase abstracta es aquella que no se puede implementar, las clases abstractas pueden ser heredadas, similar a las interfaces, pero estas si pueden contener metodos desarrollados tienen metodos implementados
//* un metodo abstracto no se puede desarrollar, es una firma para que una clase que extienda de esta la desarrolle

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogRepository{
    //log entity viene de la clase entidad, es decir recibe una instancia de la clase Log entity
    // Este metodo se encargará de desarrollar  como se guardará el Log
    //no se desarrolla en esta clase debido a que estamos en la capa de dominio, losdatasources deben ir en capas de infraestructura o DB
    abstract saveLog( log: LogEntity): Promise<void>;

    //Clase que deberá retornar un arreglo de logs
    //recibe como argumento un nivel de severidad listado  en ../entities/log.entity;
    //debemos guardar ser independientes del datasource que si conecta con DB, recuerde que estamos en capa de dominio, no debemos desarrollar en esta capa
    abstract getLogs( severirtLevel: LogSeverityLevel):Promise<LogEntity[]>;
}