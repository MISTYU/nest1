import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { database } from './config'
import { DataBaseModule } from './modules/database/database.module'

@Module({
  imports: [DataBaseModule.forRoot(database)],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
