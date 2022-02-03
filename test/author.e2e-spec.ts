import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { rm } from 'fs/promises'

describe('Category controller (e2e)', () => {
  let app: INestApplication;
 

  beforeAll(async () => {    
    await rm(__dirname + '/../cdc-test')
   
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
    describe('/authors (Post)', () =>{

        it('should check is body is passed', async () => {
            const response = await request(app.getHttpServer())
            .post('/authors')
            .send({nome:''})    
            
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toEqual(['nome should not be empty', 'email must be an email','descricao should not be empty'])
        });
        
        it('should failed by invalid email', async () => {
          const response = await request(app.getHttpServer())
          .post('/authors')
          .send({ nome:'John Doe',
                  email: 'johndoe.com',
                  descricao:'teste'})    
          
          expect(response.statusCode).toBe(400)
          expect(response.body.message).toEqual(['email must be an email'])
       });
        
        it('should create an author', async () => {
            const response = await request(app.getHttpServer())
            .post('/authors')
            .send({ nome:'John Doe',
                    email: 'john@doe.com',
                    descricao:'teste'})    
            
            expect(response.statusCode).toBe(200)
            expect(response.body.createdAt).toBeDefined()
        });

        it('should not create an author with same email', async () => {
          await request(app.getHttpServer())
          .post('/authors')
          .send({ nome:'John Doe',
                  email: 'john@doe.com',
                  descricao:'teste'})
          
          const response = await request(app.getHttpServer())
          .post('/authors')
          .send({ nome:'John Doe',
                  email: 'john@doe.com',
                  descricao:'teste'})    
          
          expect(response.statusCode).toBe(400)
          expect(response.body.message).toBe('Email already in use')
        });
    })
});
