import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { AlarmsFacade } from '../../application/alarms.facade';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { CreateAlarmCommand } from 'src/alarms/application/commands/create-alarm.command';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsFacade: AlarmsFacade) {}

  @Post()
  create(@Body() createAlarmDto: CreateAlarmDto) {
    return this.alarmsFacade.create(
      new CreateAlarmCommand(
        createAlarmDto.name, 
        createAlarmDto.severity,
        createAlarmDto.triggeredAt,
        createAlarmDto.items,
      ),
    );
  }

  @Get()
  findAll() {
    return this.alarmsFacade.findAll();
  }

  @Patch(':id/acknowledge')
  acknowledge(@Param('id') id: string) {
    return this.alarmsFacade.acknowledge(id);
  }

}
