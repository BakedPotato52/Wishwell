# E-commerce Website

A comprehensive e-commerce web application built with modern technologies to provide seamless online shopping experience.

## Overview

This e-commerce platform enables customers to browse products, manage shopping carts, process orders, and handle payments in a user-friendly interface.

## Features

### Core Functionality
- **Product Catalog**: Browse and search through product listings
- **Shopping Cart**: Add, remove, and modify items before checkout
- **User Management**: Registration, authentication, and profile management
- **Order Processing**: Complete order lifecycle from cart to delivery
- **Payment Integration**: Secure payment processing (to be implemented)

### Additional Features
- Responsive design for mobile and desktop
- Real-time inventory updates
- Order history and tracking
- Product reviews and ratings
- Search and filtering capabilities

## Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js |
| Backend | Firebase |
| Database | Firestore |
| Authentication | Firebase Auth |
| Hosting | Vercel/Firebase Hosting |
| Payment | To be implemented |

## Getting Started

### Prerequisites
- Node.js (v22)
- npm
- Firebase account

### Installation

1. **Clone the repository**
    ```bash
    git clone <repository-url>
    cd wishwell
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Configure environment variables**
    ```bash
    cp .env.example .env.local
    ```
    Update the following variables:
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    ```

4. **Run the application**
    ```bash
    npm run dev
    ```

5. **Access the application**
    Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ecommerce-website/
├── components/          # Reusable UI components
├── pages/              # Next.js pages and API routes
├── lib/                # Utility functions and configurations
├── styles/             # CSS and styling files
├── public/             # Static assets
├── firebase/           # Firebase configuration and functions
└── types/              # TypeScript type definitions
```

## API Endpoints

### Products
- `GET /api/products` - Fetch all products
- `GET /api/products/[id]` - Fetch single product
- `POST /api/products` - Create new product (admin)

### Users
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/[id]` - Get specific order

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm start
```

### Code Style
- ESLint configuration included
- Prettier for code formatting
- TypeScript for type safety

## Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Vercel
```bash
vercel deploy
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

## Roadmap

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Advanced search and filtering
- [ ] Product recommendations
- [ ] Admin dashboard
- [ ] Mobile app development
- [ ] Multi-language support

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation wiki

## License

This project is licensed under the MIT License - see the LICENSE file for details.
