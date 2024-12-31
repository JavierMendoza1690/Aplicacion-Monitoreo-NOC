import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";

export class Server {
  constructor() {
    // TODO
  }

  public static start() {
    console.log("Server started...");

    // * Llamando a cron adaptado
    CronService.createJob(
      "*/5 * * * * *", 
      () => {
        const url = 'https://google.com';
        new CheckService(
          () => console.log(`${url} is up`),
          (error) =>console.log('Error', error)
        ).execute(url);
        // new CheckService().execute('http://localhost:3000/posts#');
      });

  }
}
