import { Logger } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateAlarmCommand } from "./create-alarm.command";
import { AlarmFactory } from "src/alarms/domain/factories/alarm.factory";
import { AlarmCreatedEvent } from "src/alarms/domain/events/alarm-created.event";
import { CreateAlarmRepository } from "../ports/create-alarm.repository";

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler implements ICommandHandler<CreateAlarmCommand> {
  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  constructor(
    private readonly createAlarmRepository: CreateAlarmRepository,
    private readonly alarmFactory: AlarmFactory,
    private readonly eventBus: EventBus,
  ){}

  async execute(command: CreateAlarmCommand): Promise<any> {
    this.logger.debug(`Processing "CreateAlarmCommand": ${JSON.stringify(command)}`);
    const alarm = this.alarmFactory.create(
      command.name, 
      command.severity,
      command.triggeredAt,
      command.items,
    );

    // This is not yet the best way to dispatch events.
    // Domain events should be dispatched from the aggregate root, inside the domain layer.
    // We'll cover this in the upcoming lessons.
    this.eventBus.publish(new AlarmCreatedEvent(alarm));

    return this.createAlarmRepository.save(alarm);
  }
  
}