import { Controller, Get, Post, Body } from '@nestjs/common';
import { AlarmsFacade } from '../../application/alarms.facade';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { CreateAlarmCommand } from 'src/alarms/application/commands/create-alarm.command';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsFacade: AlarmsFacade) {}

  @Post()
  create(@Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmsFacade.create(
      new CreateAlarmCommand(createAlarmDto.name, createAlarmDto.severity),
    );
  }

  @Get()
  findAll() {
    return this.alarmsFacade.findAll();
  }

}
