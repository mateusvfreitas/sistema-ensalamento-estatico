# Classroom Allocation System Frontend

An Angular-based web application for managing and optimizing classroom allocation in educational institutions.

## 🚀 Features

- Interactive classroom management interface
- Course and class block scheduling dashboard
- Room attribute configuration
- User management system with role-based access
- Group-based room organization
- Responsive Material Design interface
- Real-time validation and error handling
- Search and filter capabilities

## 📋 Prerequisites

- Node.js (Latest LTS Version)
- Angular CLI
- Modern web browser (Chrome recommended)
- Backend API running

## 🔧 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
ng serve
```
4. Navigate to http://localhost:4200
## 🛠️ Tech Stack
- Framework: Angular 14
- UI Library: Angular Material
- State Management: Angular Services
- Build Tool: Angular CLI
- Testing: Karma & Jasmine
- Other Tools:
  - RxJS
  - TypeScript
  - SCSS
  - Angular Forms
## 📦 Project Structure
```plaintext
src/app/
├── atributo/           # Room attribute management
├── bloco-aula/         # Class block management
├── curso/              # Course management
├── grupo-sala/         # Room group management
├── horario/            # Schedule management
├── sala/              # Classroom management
├── usuario/           # User management
├── shared/            # Shared components & interceptors
└── utils/             # Utility services & functions
 ```

## 🔍 Key Features Details
### Room Management
- Interactive room creation and editing
- Attribute assignment interface
- Room grouping functionality
- Capacity and equipment tracking
### Schedule Management
- Visual schedule builder
- Conflict detection
- Time slot management
- Schedule optimization integration
### User Interface
- Material Design components
- Responsive layout
- Dark theme support
- Interactive data tables
- Real-time search and filtering
## 🧪 Development
### Development Server
```bash
ng serve
 ```

### Running Tests
```bash
ng test
 ```

### Building for Production
```bash
ng build --configuration production
 ```

## 🔧 Configuration
The application can be configured through environment files:

- environment.ts - Development configuration
- environment.prod.ts - Production configuration
## 🧪 Testing
The project includes:

- Unit tests using Karma/Jasmine
- Component testing
- Service testing
- End-to-end testing capabilities
## ✨ Contributors
- Mateus Vieira Freitas
- Gabriel Kuhnen Brylkowski
