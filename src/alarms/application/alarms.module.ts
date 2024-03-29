import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmsFacade } from './alarms.facade';
import { AlarmsController } from '../presenters/http/alarms.controller';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from './queries/get-alarms.query-handler';
import { AlarmCreatedEventHandler } from './event-handlers/alarm-created.event-handler';
import { AcknowledgeAlarmCommandHandler } from './commands/acknowledge-alarm.command-handler';
import { AlarmAcknowledgedEventHandler } from './event-handlers/alarm-acknowledged.event-handler';
import { CascadingAlarmsSaga } from './sagas/cascading-alarms.saga';
import { NotifyFacilitySupervisorCommandHandler } from './commands/notify-facility-supervisor.command-handler';
import { UnacknowledgedAlarmsSaga } from './sagas/unacknowledged-alarms.saga';

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsFacade, 
    AlarmFactory, 
    CreateAlarmCommandHandler, 
    GetAlarmsQueryHandler,
    AlarmCreatedEventHandler,
    AcknowledgeAlarmCommandHandler,
    AlarmAcknowledgedEventHandler,
    CascadingAlarmsSaga,
    NotifyFacilitySupervisorCommandHandler,
    UnacknowledgedAlarmsSaga,
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
