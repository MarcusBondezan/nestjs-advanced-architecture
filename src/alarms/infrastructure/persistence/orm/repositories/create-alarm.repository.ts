import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmEntity } from "../entities/alarm.entity";
import { AlarmMapper } from "../mappers/alarm.mapper";
import { CreateAlarmRepository } from "src/alarms/application/ports/create-alarm.repository";

export class OrmCreateAlarmRepository implements CreateAlarmRepository {

  constructor(
    @InjectRepository(AlarmEntity)
    private readonly alarmRepository: Repository<AlarmEntity>
  ) {}

  async save(alarm: Alarm): Promise<Alarm> {
    const entity = AlarmMapper.toPersistence(alarm);
    const savedEntity = await this.alarmRepository.save(entity);
    return AlarmMapper.toDomain(savedEntity);
  }

}