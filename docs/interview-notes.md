# Developer Interview Notes

## Git

Git is a distributed version-control system used to track changes to source code.

Git is the version-control software.
GitHub is a platform used to host Git repositories.

## Dependencies

dependencies are packages generally required by the application at runtime.

devDependencies contain tools mainly needed during development, testing, or compilation.

## Express

Express is a web framework for Node.js used to build web servers and APIs.

## Middleware

Middleware is a function that executes during the request-response lifecycle.

Examples:
- JSON parsing
- authentication
- logging
- error handling
- CORS

## Git Remote

A remote repository is a version of the Git repository hosted on another system such as GitHub.

"origin" is the conventional default name for the primary remote repository.

## Git Branch

A branch is an independent line of development that allows developers to build features or fixes without immediately changing the main branch.

## PostgreSQL

PostgreSQL is a relational database management system.

Relational databases organize data into tables and use relationships between tables.

## Connection Pool

A connection pool maintains reusable database connections instead of creating a new database connection for every request.

## Environment Variables

Environment variables are used to store configuration outside the source code.

Examples include database URLs, API keys, ports, and secret keys.

Sensitive environment variables should not be committed to Git.


## Referential integrity 

Referential integrity means relationships between tables remain valid. A foreign key prevents a child record from referencing a parent record that does not exist.

## Type definitions:

TypeScript type-definition files describe the types exposed by JavaScript libraries. Packages under @types provide type information for libraries that do not include their own TypeScript definitions. They are usually installed as development dependencies because they are used for type checking rather than application runtime.