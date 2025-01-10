
//* La entidad es una imagen de lo que se guardará en la base de datos (sin ser base de datos), tiene solo información fundamental que manejará nuestra aplicación

//* No manejará metodos, solo información en duro


//* ---------------------ENUMERACIÓN-------------------
//Enums son una característica de TypeScript que te permite definir un conjunto de constantes con nombres significativos
export enum LogSeverityLevel{
    low     = 'low',
    medium  = 'medium',
    high    = 'high',
}


//*----------------------CLASE----------------------
export class LogEntity{
    //* Generando atributos
    public level: LogSeverityLevel; //Enum
    public message: string;
    public createdAt: Date;

    //* Constructor, inicialización de atributos
    constructor( message: string, level: LogSeverityLevel){
        this.message = message;
        this.level = level;
        this.createdAt = new Date();

    }

    //funcion encargada de recibir string con JSON
    //convertirlo en un objeto ts valido y retornarlo
    static fromJson = ( json:string ):LogEntity =>{
        //JSON.parse es el opuesto a stringify, es decir pasa un JSON a objeto
        const {message, level, createdAt} = JSON.parse(json);
        
        //agregando validaciones
        if( !message ) throw new Error('Message is required');
        if( !level) throw new Error(' level is required');

        //creando una instancia de la clase
        const log = new LogEntity(message, level);
        //forzando la fecha leida en el argumento de la función
        log.createdAt = new Date(createdAt);

        //retornarndo el log realizado
        return log;
    }

}