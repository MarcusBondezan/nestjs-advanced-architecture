import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";

import { Alarm } from "../alarm";
import { AlarmSeverity } from "../alarm-severity";
import { AlarmItem } from "../alarm-item";
import { AlarmCreatedEvent } from "../events/alarm-created.event";

@Injectable()
export class AlarmFactory {
  create(
    name:string, 
    severity: string,
    triggeredAt: Date,
    items: Array<{ name: string; type: string; }>
  ) {
    const alarmId = randomUUID();

    const alarm = new Alarm(alarmId);
    alarm.name = name;
    alarm.severity = new AlarmSeverity(severity as AlarmSeverity['value']);
    alarm.triggeredAt = triggeredAt;
    
    items.forEach((item) => alarm.addAlarmItem(new AlarmItem(randomUUID(), item.name, item.type)));

    alarm.apply(new AlarmCreatedEvent(alarm), { skipHandler: true });

    return alarm;
  }
}