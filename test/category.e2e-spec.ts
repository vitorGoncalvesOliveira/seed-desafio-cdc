import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Category controller (e2e)', () => {
  let app: INestApplication;
 

  beforeEach(async () => {
   
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/categories (post)', async () => {
    const response = await request(app.getHttpServer())
      .post('/categories')
      .send({nome:''})    
    
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toEqual(['nome should not be empty'])
  });
});
