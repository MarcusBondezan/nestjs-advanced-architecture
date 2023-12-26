Let's firstly create some folders in our alarms resource. We'll create 4 new folders: application, domain, infrastructure and presenters.

## application folder
Will contain the application services, facades, handlers and other application specific components. All of them represent the application layers. It will communicate with the data access components, message brokers and other external systems through interfaces called ports.


## domain folder
Will contain the domain models, value objects, domain events and other domain specific components which all represents the domain layer.


## infrastructure folder
Will contain the data access components, message brokers and other external systems which represents the infrastructure layer. It will implement the interfaces (ports) defined by the application layer.

## presenters folder
Will contain the controllers, gateways and other user facing components or APIs. Sometimes, the presenters folder is also called the user interface folder.
