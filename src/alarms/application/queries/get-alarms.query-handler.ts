import { Alarm } from "src/alarms/domain/alarm";
import { GetAlarmsQuery } from "./get-alarms.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AlarmRepository } from "../ports/alarm.repository";

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler implements IQueryHandler<GetAlarmsQuery, Alarm[]> {

  constructor(
    private readonly alarmRepository: AlarmRepository,
  ) {}

  execute(query: GetAlarmsQuery): Promise<Alarm[]> {
    return this.alarmRepository.findAll();
  }

}