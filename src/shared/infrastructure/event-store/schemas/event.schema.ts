import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaTypes } from "mongoose";

export type EventDocument = HydratedDocument<Event>;

@Schema({
  timestamps: {
    createdAt: true,
    updatedAt: false,
  },
})
export class Event {
  @Prop()
  //The id of the stream to which the event belongs. This usually equals the Aggregate ID, which can be
  // prefixed with AggregateType as well.
  streamId: string; 

  @Prop()
  //The event type
  type: string;

  @Prop()
  //The position of the event in the stream
  position: number;

  @Prop({
    type: SchemaTypes.Mixed,
  })
  //The event payload
  data: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);

/*
* Creating a unique index on the streamId and position fields. This is essential as we want to make sure we'll never have two
* event with the same position in the same stream, which could occur if we had multiple operations happening in the same time
* on the same aggregate and in parallel. By creating an unique index, we're making sure that the database will throw an error
* if we try to insert an Event in the same `position`. Consequently, preventing us from corrupting our event stream and leaving
* us with a consistent state.
* This position will also represent the version of the aggregate. So we'll need to make sure that we always increment it by 1
* when we append a new event to the stream.
*/
EventSchema.index({ streamId: 1, position: 1 }, { unique: true });