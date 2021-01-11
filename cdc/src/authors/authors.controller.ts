import { Body, Controller, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './interface/Author';

@Controller('authors')
export class AuthorsController {
    constructor(private authorService: AuthorsService){}

    @Post()
    create(@Body() author: Author){
        this.authorService.create(author);
        
    }

}
