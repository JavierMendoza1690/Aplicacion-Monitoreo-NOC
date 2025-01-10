//*--------------------------DEPENDENCIAS------------------------------------

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'node:fs'

//Esta clase si implementará lo especificado en la capa de dominio
//Recuerde que la capa de dominio unicamente establecía por medio de una clase abstracta como debia implementarse


//*--------------------CLASE FILE SYSTEM DATA SOURCE-----------------------
//En esta se especificarán como almacenar los logs por medio del file system
export class FileSystemDataSource implements LogDataSource {
    
    // ruta donde se almacenarán los paths (DIRECTORIO)
    private readonly logPath        = 'logs/';
    //ruta todos los paths
    private readonly allLogsPath    = 'logs/logs-all.log';
    //ruta problemas medios
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    //ruta logs problemas criticos
    private readonly highLogsPath   = 'logs/logs-high.log';


    //*constructor
    constructor(){
        //llamando funcion que crea directorios establecidos en path
        this.createLogsFiles();
    }
    //metodo llamado por el constructor
    private createLogsFiles = () =>{
        //verificando si el directorio NO existe
        if( !fs.existsSync(this.logPath)){
            //creando el directorio en caso de no existir
            fs.mkdirSync(this.logPath)
        }

        //creando un arreglo con todas las rutas
        const pathsAuxiliar = [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ];

        //realizando un foreach con el arreglo anterior

        pathsAuxiliar.forEach(path =>{
            //si existe el directorio especificado termina la funcion
            if( fs.existsSync(path) ) return;
            //si no existe el directorio lo crea y escribe un ''
            fs.writeFileSync(path, '');
        })
    }

    //metodo implementado de la clase abastrabta
    //recibe como argumento la informacion que se almacenará en el log
    async saveLog(newLog: LogEntity): Promise<void> {
        
        //Plantilla de lo que se guardara en el FileSystem
        const logAsJson = `${ JSON.stringify(newLog)}\n`

        //appendFileSync agrega contenido en la ultima linea del archivo si existe el archivo
       
        //agregando el log al path general
        fs.appendFileSync(this.allLogsPath, logAsJson);
        
        //verificando si la severidad del log es baja-> no hace nada
        if( newLog.level === LogSeverityLevel.low) return;      //LogSeverityLevel es la enumeracion

        //verificando si la severidad es media ->almacenamos el log en la ruta media tambien
        if( newLog.level === LogSeverityLevel.medium){
            fs.appendFileSync(this.mediumLogsPath, logAsJson);
        }else{
            // si no es baja ni media debe ser severidad alta
            fs.appendFileSync(this.highLogsPath, logAsJson);
        }

    }

    // Metodo encargado de manejar la logija para retornar los logs del metodo getLogs
    //recibe como argumento el path donde se guardan los logs
    private getLogsFromFile = ( path:string ): LogEntity[] =>{
        const content = fs.readFileSync( path, 'utf-8');
        //creando un array dividido por cada salto de linea
        //realizando un map al array anterior
        //luego llama al metodo estatico fromJson en la clase LogEntity
        const logs = content.split('\n').map(log =>LogEntity.fromJson(log))
        
        return logs;
    }

    //metodo implementado de la clase abstracta LogDataSource
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch( severityLevel ){
            
            case LogSeverityLevel.low:
                //enviando como argumento la ruta donde se guardan todos los logs
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                //enviando como argumento ruta donde se guardan los logs de severidad media
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                //enviando como argumento ruta donde se guardan los logs de severidad alta
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error(`${ severityLevel } not implemented`)
        }
    }

}
