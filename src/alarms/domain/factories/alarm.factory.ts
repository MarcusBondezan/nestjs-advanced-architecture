import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";

import { Alarm } from "../alarm";
import { AlarmSeverity } from "../alarm-severity";

@Injectable()
export class AlarmFactory {
  create(name:string, severity: string) {
    const alarmId = randomUUID();
    const alarmSeverity = new AlarmSeverity(severity as AlarmSeverity['value']);
    return new Alarm(alarmId, name, alarmSeverity);
  }
}