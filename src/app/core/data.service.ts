import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';
import { Reader } from 'app/models/reader';
import { allReaders, allBooks } from 'app/data';
import { Book } from 'app/models/book';

@Injectable()
export class DataService {
  mostPopularBook: Book = allBooks[0];

  constructor(private loggerService: LoggerService, private http: HttpClient) {}

  // getAllReaders(): Reader[] {
  //   return allReaders;
  // }

  getAllReaders(): Observable<Reader[]> {
    // return this.http.get<Reader[]>('/api/readers');

    // test request with error url
    return this.http.get<Reader[]>('/api/errors/500');
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Book[] {
    return allBooks;
  }

  getBookById(id: number): Book {
    return allBooks.find(book => book.bookID === id);
  }

  setMostPopularBook(book: Book): void {
    this.mostPopularBook = book;
  }
}
