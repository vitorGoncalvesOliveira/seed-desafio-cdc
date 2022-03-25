import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { rm } from 'fs/promises'

describe('Book controller (e2e)', () => {
    let app: INestApplication;
   
  
    beforeAll(async () => {    
      await rm(__dirname + '/../cdc-test')
     
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
    });

    describe('/Book (Post)', () =>{
  
      it('should check if book has title', async () => {
              const response = await request(app.getHttpServer())
              .post('/books')
              .send({title:''})    
              
              expect(response.statusCode).toBe(400)
              expect(response.body.message).toEqual(
                [
                 "titulo must be longer than or equal to 1 characters",
                 "sumario should not be empty",
                 "resume must be longer than or equal to 1 characters",
                 "preco must not be less than 20",
                 "page must not be less than 100",
                 "isbn should not be empty",
                 "data_publicacao should not be empty",
                 "category should not be empty",
                 "author should not be empty"])
      });

      it('should check if book has less than 100 page', async () => {
            const response = await request(app.getHttpServer())
            .post('/books')
            .send({
              "titulo": "Teste doido II",
              "sumario": "Volume 2 do teste doido",
              "resume": "olha que beleza",
              "preco": 21.9,
              "page": 99,
              "isbn": "asd12345",
              "data_publicacao": "2022-02-02T14:00:00",  
              "category": {
                  "id": 1,
                 "nome": "Humor"
              },
              "author": {
                 "id": 1,
                 "nome": "jonh Doe",
                 "email": "john@doe.com"
              }
             })    
            
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toEqual(
              [
               "page must not be less than 100"
              ])
      });

      it('should check if book price is less than 20', async () => {
          const response = await request(app.getHttpServer())
          .post('/books')
          .send({
            "titulo": "Teste doido II",
            "sumario": "Volume 2 do teste doido",
            "resume": "olha que beleza",
            "preco": 19.9,
            "page": 100,
            "isbn": "asd12345",
            "data_publicacao": "2022-02-02T14:00:00",  
            "category": {
                "id": 1,
               "nome": "Humor"
            },
            "author": {
               "id": 1,
               "nome": "jonh Doe",
               "email": "john@doe.com"
            }
           })    
          
          expect(response.statusCode).toBe(400)
          expect(response.body.message).toEqual(
            [
             "preco must not be less than 20"
            ])
      });

      it('should create a new book', async () => {
        await request(app.getHttpServer())
        .post('/author')
        .send({
          "nome": "jonh Doe",
          "email": "john@doe.com"
        })

        await request(app.getHttpServer())
        .post('/category')
        .send({
          "nome": "Humor"
        })

        const response = await request(app.getHttpServer())
        .post('/books')
        .send({
          "titulo": "Teste doido II",
          "sumario": "Volume 2 do teste doido",
          "resume": "olha que beleza",
          "preco": 21,
          "page": 100,
          "isbn": "asd12345",
          "data_publicacao": "2022-02-02T14:00:00",  
          "category": {
             "nome": "Humor"
          },
          "author": {
             
             "nome": "jonh Doe",
             "email": "john@doe.com"
          }
         })    
        
        expect(response.statusCode).toBe(200)       
    });
         
  });

});
  