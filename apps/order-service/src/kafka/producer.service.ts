import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  });

  private readonly producer: Producer = this.kafka.producer();

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
    Logger.log(`✅ Message produced to topic ${record.topic}`);
  }

  async onModuleInit() {
    await this.producer.connect();
    Logger.log('✅ Kafka Producer connected');
  }
  
  async onApplicationShutdown() {
    await this.producer.disconnect();
    Logger.log('✅ Kafka Producer disconnected');
  }
}
