# External Internal Drag - Syncfusion Scheduler

An Angular application demonstrating the **Syncfusion Scheduler** component with **Syncfusion DataGrid**, featuring external and internal drag-and-drop functionality. This sample showcases efficient event management and resource scheduling in a calendar interface.

## Features

* Syncfusion Scheduler component with event management
* Syncfusion DataGrid for data display and management
* External drag-and-drop from grid to scheduler
* Internal drag-and-drop within scheduler for event rescheduling
* Resource scheduling capabilities
* Responsive Angular 22 application
* Material Design 3 theme integration

## Prerequisites

* Node.js (v18 or higher)
* npm (v10 or higher)

## Run

### Installation

```powershell
npm install
```

### Start Development Server

```powershell
npm start
```

The application will be available at `http://localhost:4200/`

## Build

```powershell
npm run build
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the development server |
| `npm run build` | Build the production application |
| `npm run watch` | Build in watch mode for development |

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── app.ts              # Root component
│   │   ├── app.routes.ts       # Route configuration
│   │   ├── app.html            # Root template
│   │   ├── app.css             # Global styles
│   │   └── components/
│   │       └── scheduler/      # Scheduler component
│   ├── main.ts                 # Application entry point
│   ├── index.html              # HTML template
│   └── styles.css              # Global stylesheets
├── angular.json                # Angular CLI configuration
├── package.json                # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Technology Stack

* **Angular** 22.1.0
* **TypeScript** 5.6+
* **Syncfusion EJ2 Scheduler** 34.2.2
* **Syncfusion EJ2 Grids** 34.2.9
* **Syncfusion Material3 Theme** 34.2.2
* **RxJS** 7.8.0

## Documentation

For detailed information on Syncfusion Scheduler features and API, visit the [Scheduler documentation](https://help.syncfusion.com/scheduler-sdk/angular/schedule/getting-started) and [Data Grid documentation](https://ej2.syncfusion.com/angular/documentation/grid/getting-started).
