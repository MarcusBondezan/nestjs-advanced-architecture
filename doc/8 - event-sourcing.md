# Event Sourcing

It's an architectural pattern utilized in software development and distributed systems, where the state of an application is determined by a sequence of events rather then storing the current state as a single record in a database. In event sourcing, each "change" to the application state is captured as an `immutable event`. These events represent meaningful actions or facts that have occurred within the system. Instead of updating the state directly, new events are appended to an `event store` in chronological order. This is fundamentally different from the traditional approach, where the current state is stored in a database and updated whenever a change occurs. Some key characteristics of event sourcing are:

- **Immutable events**: Events cannot be altered or deleted once stored, ensuring an auditable record of all changes made to the application's state over time.
- **Event Store**: Events are stored in an event store, which is an append-only log of events. The event store is the single source of truth for the application's state.
- **State Reconstruction**: The application's state can be reconstructed by replaying all events from the event store. This allows for a comprehensive historical view of the application's state and supports features like time travel debugging and auditing.

## Benefits

- **Auditability**: Event Sourcing provides a complete history of all changes made to the application's state over time. This allows us to easily audit the system and understand how the state has evolved (where errors might have occurred / etc).
- **Time Travel Debugging**: gives us the ability to replay events and enables developers to "time travel" and debug the application at any point in the past, simplifying issue diagnosis and resolution.
- **Scalability**: Event Sourcing allows us to scale the read and write side of the application independently.

## Cons

- **Complexity**: Event Sourcing is a complex pattern that requires a lot of boilerplate code to implement. This can make the project difficult to understand and maintain so always consider the tradeoffs before using this pattern.
- **Eventual Consistency**: The read-side of the application is eventually consistent with the write-side. This means that there might be a delay between the time an event is written to the event store and the time it is processed by the read-side.

## Processing Events

There are two strategies to process the events, push and pull.

- **Push**: the implemented strategy in this course. Here, we are going to watch for new MongoDB documents or events. Whenever a new document is inserted (pushed) into the collection, our application will receive a signal with the new document payload passed in with it. Than we can use that document to recreate the event instance and add it to the event bus.

- **Pull**: instead of subscribing to tje collection watchers, we would periodically "poll" the database for new events to determine what event are new.