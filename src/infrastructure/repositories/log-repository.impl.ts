import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";

//* Clase encargada de implementar la clase abstracta LogRepository en la capa de dominio
//recuerde que en la capa de dominio solo se hace el cuerpo de lo necesario pero no se ejecutan acciones

//*----------------------CLASE-----------------------------

export class LogRepositoryImp implements LogRepository{

    // private logDataSource: LogDataSource;
    //*Generando inyeccion de dependencias en el constructor
    constructor(
        //recibe una inyeccion de dependencias del LogDataSource
        //Este codigo equivale a recibir el argumento como argumento del constructor y establecerlo
        //a una propiedad del mismo nombre (ahorrando codigo)
        //se envia el obeto que implementó el logDatasource en la capa interfase (ejemplo FILESYSTEM)
        private readonly logDataSource: LogDataSource   
    ){}

    //*Implementando metodos abstractos del LOG-REPOSITORY
    async saveLog(log: LogEntity): Promise<void> {
        //llama al elemento que implementó la clase abstracta
       this.logDataSource.saveLog( log );
    }
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        //llama al elemento que implementó la clase abatracta
       return this.logDataSource.getLogs( severityLevel )
    }

}