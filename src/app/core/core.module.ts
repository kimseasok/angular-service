import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggerService } from './logger.service';
import { DataService } from './data.service';
import { PlainLoggerService } from './plain-logger.service';
import { throwIfAlreadyLoaded } from 'app/core/module-import-guard';
import { BookTrackerErrorHandlerService } from './book-tracker-error-handler.service';
import { BookResolverService } from './book-resolver.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddHeaderInterceptor } from './add-header-interceptor.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [
    LoggerService,
    DataService,
    BookResolverService,
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
