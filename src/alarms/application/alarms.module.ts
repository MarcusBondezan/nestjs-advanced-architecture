import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsFacade } from './alarms.facade';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from './queries/get-alarms.query-handler';

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsFacade, 
    AlarmFactory, 
    CreateAlarmCommandHandler, 
    GetAlarmsQueryHandler
  ],
})
export class AlarmsModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    }
  }
}
