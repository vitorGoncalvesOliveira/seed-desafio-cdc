import { Injectable } from '@nestjs/common';
import { Author } from './interface/Author';

@Injectable()
export class AuthorsService {
    private readonly authors: Author[] = [];

    create(author: Author){
        this.authors.push(author);
    }
    

}

