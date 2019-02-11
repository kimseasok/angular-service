import { Component, OnInit } from '@angular/core';

import { Book } from 'app/models/book';
import { allBooks, allReaders } from 'app/data';
import { Reader } from 'app/models/reader';
import { LoggerService } from 'app/core/logger.service';
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(
    private loggerService: LoggerService,
    private dataService: DataService
  ) {
    this.loggerService.log('Creating the Dashboard');
  }

  ngOnInit() {
    this.allBooks = this.dataService.getAllBooks();
    // this.allReaders = this.dataService.getAllReaders();
    this.dataService
      .getAllReaders()
      .subscribe(
        data => (this.allReaders = data),
        err => this.loggerService.error(err),
        () => this.loggerService.log('All done!')
      );
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.loggerService.log('Done dashboard initialization');
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }
}
