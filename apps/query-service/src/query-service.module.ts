import { Module } from '@nestjs/common';
import { QueryServiceService } from './query-service.service';
import { QueryServiceResolver } from './query-service.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { join } from 'path';
import { DrizzleModule } from 'apps/drizzle/drizzle.module';

@Module({
  imports: [
    DrizzleModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'apps/query-service/src/graphql.ts'),
        outputAs: 'class',
      },
    }),
  ],
  providers: [QueryServiceResolver, QueryServiceService],
})
export class QueryServiceModule {}
