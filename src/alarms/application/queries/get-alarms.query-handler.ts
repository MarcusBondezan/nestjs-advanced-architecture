import { Alarm } from "src/alarms/domain/alarm";
import { GetAlarmsQuery } from "./get-alarms.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindAlarmsRepository } from "../ports/find-alarms.repository";
import { AlarmReadModel } from "src/alarms/domain/read-models/alarm.read-model";

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]> {

  constructor(
    private readonly alarmRepository: FindAlarmsRepository,
  ) {}

  execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
    return this.alarmRepository.findAll();
  }

}