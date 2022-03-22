import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Category controller (e2e)', () => {
  let app: INestApplication;
 

  beforeAll(async () => {
   
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/categories (post), category without name.', async () => {
    const response = await request(app.getHttpServer())
      .post('/categories')
      .send({nome:''})    
    
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toEqual(['nome should not be empty'])
  });

  it('/categories (post) - 200', async () => {
      
    const response =  await request(app.getHttpServer())
      .post('/categories')
      .send({nome:'Teste'})
    
    expect(response.statusCode).toBe(200)    
  });

  it('/categories (post) - 400 duplicate category', async () => {
    
    await request(app.getHttpServer())
      .post('/categories')
      .send({nome:'repete'})
    
    const response =  await request(app.getHttpServer())
      .post('/categories')
      .send({nome:'repete'})
    
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toEqual('Categoria já cadastrada')    
  });

});
