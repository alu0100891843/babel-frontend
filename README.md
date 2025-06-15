# BabelFrontend

This SPA project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Prerequisites

### Prerequisites
- Node.js (version 20.9.0 or higher)
- Angular CLI (version 17.3.17 or higher)
- npm

1. Clone the repository
```bash
git clone https://github.com/alu0100891843/babel-frontend.git
cd babel-frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run start
```

* Using Visual Studio Code

  If you're using Visual Studio Code, you can press **F5** to start debugging the application.


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Build Options
- `ng build --prod` - Production build with optimizations
- `ng build --watch` - Build and watch for changes
- `ng build --configuration development` - Development build

## Testing

### Running cypress tests

Run `npm run e2e` to execute cypress tests via the Cypress Test Runner. This will open the Cypress GUI where you can select and run tests interactively.
Run `npm run e2e:headless` to execute cypress tests in headless mode. This will run all tests without opening the Cypress GUI, suitable for CI/CD pipelines.

### Test Coverage
Run `ng test --code-coverage` to generate test coverage reports.

## Linting

Run `ng lint` to check code quality and style guidelines.

## Project Structure

```
src/
├── app/                          # Application source code
│   ├── app.component.*          # Root component files
│   ├── app.config.ts            # Application configuration
│   ├── pages/                   # Feature pages
│   │   └── candidates/          # Candidates management page
│   │       ├── candidates.component.*
│   │       └── dialogs/         # Modal dialogs for candidates
│   │           └── form/        # Candidate form dialog
│   └── shared/                  # Shared components and utilities
│       ├── components/          # Reusable UI components
│       │   └── table/           # Generic table component
│       └── form-validators/     # Custom form validators
│           └── service/         # Validation services
├── assets/                      # Static assets (images, fonts, etc.)
├── constants/                   # Application constants
│   └── constants.ts
├── environments/                # Environment configuration files
│   └── environment.ts
├── models/                      # TypeScript interfaces and models
│   └── candidate/               # Candidate models
│       ├── candidate.ts
│       └── rq-create-candidate.ts
├── services/                    # HTTP services and business logic
│   ├── candidates.service.*     # Candidates API service
│   └── parent/                  # Base/parent services
│       └── api.service.ts       # Generic API service
├── styles.scss                  # Global SCSS styles
├── main.ts                      # Main Application file
├── index.html                   # Main HTML file
└── favicon.ico                  # Application favicon
```

