import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {PubSub} from '@google-cloud/pubsub'
import {uuid} from 'uuidv4';
const fs = require('fs')


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Fitness')
  .setDescription('Fitness API')
  .setVersion('1.0')
  .addTag('Gym')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));
  SwaggerModule.setup('/', app, document);
 
  const pubsub = new PubSub({
          projectId: 'nestjs-341309',
          credentials: {
              client_email: 'pubsublab@nestjs-341309.iam.gserviceaccount.com',
              private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC5IuLKukx6lSIw\n5JEWlewKc7FY10s97kHDFAFzXd/AALRRWH6JYGRrI9xkfW8Sna8xtoRe2qs6syJy\nUwZOimDXV/YwNPu88yCx/RB1zhzfUJhld4ArseAp9d6rWUBNCvqv0lf8i+JGoQFF\nkkm5LpARzT7sjbvvN4Budw1fBighpkJcbS8omabQAatZm9th7pwVz5BoqrVUlrA/\neb8vdtSF3tePuIa/AkakJ94WGr8apmaBzOM8bxxLSqVD8OE7PPMjHdFZ+EtftDz1\nuJOgNWRLWoR3q8DXQnwWKQ4me/qkpVDUySTwHNE46A2S/03yZNsdmgKR8mhMvNsU\n9Z6UOa8tAgMBAAECggEADaPc2rvcG6H2OWz1pZjZIbIBbH68O+1caf+E1deiPxau\nMloXRI7WBzDGsZ6uOsxkVoDQgt6QhAwjqxGj4tB+Lw97g3S74WF2VLbE6jEL3oYl\nHECwMEf0MJM9WxmBy8tVyfNw6RnzS2ncWqBbDyo3kiAxlSMiKA9KRpk94nTlKwlh\nBcnLMStd4gNDoCUD35z1vIxYfIo6JyJwox/X9fybt7o9jm0OQ1kM8B4QkWQZdlaL\n6wdVKFn2X794o3RF0gRj97Cf9zUx5+ywlm3hCDIzErV5XAv/6B+Dl6TDsOfK2b70\nmKUt6v1NnDlHpD/fdc0wjpvbKMmef8Z0y5GsIRmVTwKBgQD1cVTJhL/lwKpoit6q\nlr0sfOg2n5Id4NWPn0NNYlzJSM7vDY2YnNe4U3igr84YkCkKGLooy+d++GJ6yIkz\nreJix46e3g4lbl6xjI3G/Mbo/2eaoU/MzFCGOci8Q2VsSuv7iDTX7fA3Pm8iR+af\nnos93dnpprI6o0uCQ15PG3sqywKBgQDBGX8KveEsiO5bQQNVSkmRPLM7TlIAHjsH\ndxJBPsUSI799lnfFQuN4K8iSp9/dQmkYJSSjf9G49j0bj7B1NGCipRCN3s/srSWx\n18rI7FHdJbGJtrAmMRigQQoe2QP1oOlgWSFM3fNqa1rJA+sS68RII3FuHLPFJDWk\n87XP5QX25wKBgBuw96HsykG/pPo6gLi6XQmB5ikTg8a/MRkNHOjEKjfDcSVjYBBR\n0bzIHhny+8ulqButgoNLzghzOZkkuuYLvjjqztp5rxrmAuUBOJW0uzRabHPzsy8l\n9gfOySkEaZL4OPud+GhMPgfdkWhKuGhV2NvYBdfoqL8Y4VIHC8LdFN5VAoGAVhap\n3v4cf6Bks+ZeOA4wkkG/nncic88GfiOFzfTQI3AwlSsaJqXVh+PtPgT990T+Wbdl\niEcaFx4gzELZZsd9NcXlhXqKtHfVUF5mmAFT1gZSCpWaHszQr9GPU4VpEH82zK+v\n+vcQ6KcICIpoqTzXe1nh3jeJpiCokevdaNwwNo0CgYAQR3FbzrOEyOs4pMlPlwaN\nc81GR4lvNtypNzy5F8pH0Sh8iM1TUQV4uF5TPxpp33TGoH3lRADP9pHgghvXKr1d\nWDVIsIwfhFy2r3HwxvvQKP3ANn9Ijnfjscw/hcdwkRTm0gdicx/mVn1Sv2jx9ZDJ\no/gqdFNrDqsWCX6pX6DihQ==\n-----END PRIVATE KEY-----\n'
	  }});

 app.use(function(request, response, next) {
    const question = pubsub.topic('message_receiver')
    const answer = pubsub.topic('message_sender')

    let id = uuid()
    question.publish(Buffer.from(id)).then(x => {
          console.log('Request published whith id ' + id)
        })
    let subscription = answer.subscription('message_sender-sub')
    subscription.on('message', resp => {
      let message = resp.data.toString()
      let parsed = JSON.parse(message)
      if (parsed[id] == true) {
        console.log('Received positive response for ' + id)
        next()
        subscription.close()
      }
      else if (parsed[id] == false) {
        console.log('Received negative response for ' + id )
        response.status(400).json({error: true, message})
        subscription.close()
      }
    })
  })


  await app.listen(3000);
}
bootstrap();
