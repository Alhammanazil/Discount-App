# Discount App

A modern web application for discount management built with Vue.js 3, Vite, and Material Design 3. This project demonstrates professional frontend development with CRUD operations, state management, and responsive UI.

## Features

- **View Discounts**: Display all discounts with pagination and sorting
- **Create Discount**: Add new discounts with percentage or fixed amount
- **Update Discount**: Edit existing discount details
- **Delete Discount**: Remove single or multiple discounts
- **Search & Filter**: Find discounts by name and filter by outlet
- **Dynamic API Configuration**: Change API URL on-the-fly via settings modal
- **Real-time Updates**: Immediate data refresh after operations
- **Responsive Design**: Mobile-friendly interface with modern UI

## Technology Stack

| Category             | Technology                  |
| -------------------- | --------------------------- |
| **Frontend**         | Vue.js 3 (Composition API)  |
| **Build Tool**       | Vite                        |
| **State Management** | Pinia                       |
| **Routing**          | Vue Router                  |
| **HTTP Client**      | Axios                       |
| **Styling**          | CSS3 with Material Design 3 |
| **API**              | crudcrud.com REST API       |

## Project Structure

```
src/
├── components/
│   ├── Alert.vue
│   ├── ConfirmModal.vue
│   ├── DiscountModal.vue
│   └── ApiSettingsModal.vue
├── pages/
│   └── DiscountListPage.vue
├── router/
│   └── index.js
├── services/
│   └── api.js
├── stores/
│   └── discountStore.js
├── assets/
│   └── images/
│       └── logo.png
├── App.vue
└── main.js
```

## Quick Start

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## API Configuration

The application uses crudcrud.com as the default API backend. To use a custom API:

1. Update the API URL in `src/services/api.js`
2. Or use the in-app API Settings modal to change it dynamically
3. URL is persisted in localStorage

### API Endpoints

```
GET    /diskon           # Fetch all discounts
GET    /diskon/{id}      # Get discount by ID
POST   /diskon           # Create new discount
PUT    /diskon/{id}      # Update discount
DELETE /diskon/{id}      # Delete discount
```

### Data Structure

```json
{
  "_id": "string",
  "nama": "string",
  "diskon": "number",
  "type": "%|Rp",
  "outlet": "string",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Key Features Details

### Discount Types

- **Percentage (%)**: Discount as percentage value
- **Fixed Amount (Rp)**: Discount as Indonesian Rupiah amount

### UI Components

- **DiscountListPage**: Main application interface with table, pagination, and toolbar
- **DiscountModal**: Form for creating and editing discounts with outlet dropdown
- **ConfirmModal**: Confirmation dialog for delete operations
- **Alert**: Toast notifications for success and error messages
- **ApiSettingsModal**: Dynamic API URL configuration with validation

## Development

### Environment Variables

Create `.env` file for custom configuration:

```
VITE_API_BASE_URL=https://your-api.com/api/endpoint
```

### Performance

- Lazy pagination (10 items per page default)
- Efficient filtering and sorting with computed properties
- Minified and optimized production build
- CSS scoped to prevent style conflicts
