import { LoggerService } from './logger.service';
import { DataService } from './data.service';

export function dataServiceFactory(logger: LoggerService) {
  const dataService: DataService = new DataService(logger);

  // do more stuff to config the service if neccessary.

  logger.log('Creating a new data service with a factory function');

  return dataService;
}
