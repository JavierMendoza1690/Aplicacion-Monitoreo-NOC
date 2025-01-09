
//* La clase CheckService está en la carpeta de dominio porque es contiene ejecución de codigo, recuerde que los useCases son encargados de ejecutar acciones en la logica de negocios, todo lo que sean acciones de ejecución deben ser useCases

//* La clase se encarga de manejar la peticion URL que se  envia por parametro al metodo execute


//* Interface para clase CheckService
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

// declarando los tipos de la inyeccion de dependencias
type SuccessCallback = ( ) => void;
type ErrorCallback = ( error:string ) => void;

export class CheckService implements CheckServiceUseCase {
    
    //*Inyeccion de dependencias
    //El constructor recibe argumentos, que con solo recibirlos se volverán atributos de la clase, importante colocar  sus modificadores de acceso
    constructor(
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
            // se llamará la función successCallback que se pasa como argumento al constructor al llegar a este punto
            this.successCallback(); 
            
            return true;
        } catch (error) {
            //llama a la funcion errorCallback, que se pasó al constructor como argumento, al hacer la inyeccion de dependencias, recibe un string como argumento
            this.errorCallback(`Ocurrió un error ${error}`)
            //retorna falso si falló
            return false;
        }
    }
}
