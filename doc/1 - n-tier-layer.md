## Presentation
Or User Presentation Layer. It's the top most layer and present data to users in a user-friendly format. It handles user input displays information and forwards requests to lower layers.
Exemplaes: web browsers, mobile apps and desktop interfaces.

## Application
Or Business Logic Layer. Contains the core business logic. It processes requests from the presentation layer, performs business rules, calculations and manages data flow. It does not handler data storage or retrieval.

## Domain
Or Data Model Layer. It represents the core entities and business objects of the application. It encapsulates business logic independently of data storage technology, defining the fundamental rules of the applications domain.

## Data Access
Or Persistent Layer. It handles data storage and retrieval operations. It interacts with databases, file systems or external services to save and fetch data shielding the rest of the application from data storage details.

---

NestJS most commonly uses de 3 layer architecture because it's the most common use of the framework. You can see some examples of it in the website documentation page. In this type of architecture we have:

## Controllers
The Controllers Layer handles incoming requests and returns responses to the client.

## Services
The Services Layers consists of the business logic of the application.

## Data Access
Handles data storage and retrieval.

The 3-tier architecture works really well for medium to large scale applications that require a clear separation of concerns, modularity and scalability. It's a good choice when the focus is on organizing the application into layers with defined responsibilities.

When your team prioritizes a more domain centric design, you may want to consider a different architecture, such as the onion or hexagonal architecture patterns. These architectures are well-suited for complex domain modeling and domain driven design. Allowing the application to evolve independently of external factors.