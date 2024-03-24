import { Logger } from "@nestjs/common";
import { CommandHandler, EventBus, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { CreateAlarmCommand } from "./create-alarm.command";
import { AlarmFactory } from "src/alarms/domain/factories/alarm.factory";
import { AlarmCreatedEvent } from "src/alarms/domain/events/alarm-created.event";
import { CreateAlarmRepository } from "../ports/create-alarm.repository";

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler implements ICommandHandler<CreateAlarmCommand> {
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly eventPublisher: EventPublisher,
    private readonly alarmFactory: AlarmFactory,
  ){}

  async execute(command: CreateAlarmCommand): Promise<any> {
    this.logger.debug(`Processing "CreateAlarmCommand": ${JSON.stringify(command)}`);
    const alarm = this.alarmFactory.create(
      command.name, 
      command.severity,
      command.triggeredAt,
      command.items,
    );

    //Merging the publisher context with the aggregate instance will allow us to use the 
    //apply method of the aggregate to apply the event *to* the aggregate, and then
    //*commit* the changes to the event store. This is a crucial step as otherwise the
    //event would **never** reach the event store!
    this.eventPublisher.mergeObjectContext(alarm);
    alarm.commit();

    return alarm;
  }
  
}