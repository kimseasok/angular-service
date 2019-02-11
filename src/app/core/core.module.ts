import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import { LoggerService } from './logger.service';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    // { provide: LoggerService, useClass: PlainLoggerService },
    // {
    //   provide: LoggerService,
    //   useValue: {
    //     log: message => console.log(`MESSAGE: ${message}`),
    //     error: message => console.error(message)
    //   }
    // },
    // {
    //   provide: DataService,
    //   useFactory: dataServiceFactory,
    //   deps: [LoggerService]
    // }
    DataService,
    LoggerService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
