# Academic Enrollment Utilities

This repository contains a set of utilities related to the academic enrollment information of the students.

The repository contains the following utilities:

- repositories to get the academic enrollment data of the students (courses and components with its grades)
- algorithms for average calculator feature
- algorithms for the academic performance feature

## Docs

The project uses TypeDoc to generate the documentation. To generate the documentation, run the following command:

```bash
npm run docs
```

The documentation will be generated in the `docs` folder. To see the documentation, open the `index.html` file in the `docs` folder. It's recommended to use live server VS Code extension to see the documentation.

## Setup and installation

### Using NPM Link

To use the library in another project without publishing it, you can use the `npm link` command. To do this, follow the next steps:

1. Clone the repository
2. Run `npm install` in the root folder of the repository
3. Run `npm link` in the root folder of the repository
4. Go to the project where you want to use the library
5. Run `npm link @uninorte/enrollment-utils` in the root folder of the project
6. Now you can use the library in the project

## Library Usage

It is recommended to use the unit tests as a guide to use the library. The unit tests are located in the `tests` folder.

The library exposes 4 modules:

- common
- repositories
- domain-logic
- entities

Example of importing these modules

```typescript
import { AcademicInfo } from "@uninorte/enrollment-utils/entities";
import { computeFinalGradeOfCourse } from "@uninorte/enrollment-utils/domain-logic";
```

### Notes

Before using the repository module, remember to setup the logger:

```typescript
import { AppLogger, ILogger } from "@uninorte/enrollment-utils/repositories";

// Dummy logger
export class LogLevelLogger implements ILogger {
  error(message: string, meta: { [key: string]: any } = {}) {
    console.error(message, meta);
  }

  warn(message: string, meta: { [key: string]: any } = {}) {
    console.warn(message, meta);
  }

  info(message: string, meta: { [key: string]: any } = {}) {
    console.info(message, meta);
  }

  debug(message: string, meta: { [key: string]: any } = {}) {
    console.debug(message, meta);
  }
}

export function setupLogger(name = "") {
  const logLevelLogger = new LogLevelLogger();
  AppLogger.getAppLogger().setLogger(logLevelLogger);

  const myLogger = AppLogger.getAppLogger().createContextLogger("setup");
  myLogger.info(`app logger for ${name} created`);
}

// The singleton AppLogger it's just for the enrollment utils module and it's not shared with other modules

setupLogger("enrollment-utils");
```
