# Visitor Management System (VMS)

A modern, comprehensive visitor management system built with React, TypeScript, and Tailwind CSS. This system digitizes visitor registration, tracking, and management processes for organizations.

## 🚀 Features

### Core Functionality
- **Visitor Registration**: Complete visitor information capture with validation
- **Real-time Check-in/Check-out**: Track visitor arrival and departure times
- **Host Management**: Manage host database with department organization
- **Advanced Reporting**: Generate detailed reports with filtering and export capabilities
- **Admin Dashboard**: Analytics and insights with visual data representation
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

### Key Capabilities
- Real-time visitor status tracking
- Duration calculation for visits
- Advanced search and filtering
- CSV export functionality
- Professional UI/UX design
- Type-safe development with TypeScript
- Comprehensive error handling

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form validation and management
- **Zod** - Schema validation
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and consistency
- **PostCSS** - CSS processing
- **TypeScript Compiler** - Type checking

### State Management
- React Hooks (useState, useEffect)
- Context API ready for scaling
- Local storage integration

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/UI components
│   ├── AdminDashboard.tsx
│   ├── CheckInOut.tsx
│   ├── HostManagement.tsx
│   ├── Reports.tsx
│   ├── VisitorForm.tsx
│   └── VisitorTable.tsx
├── features/            # Feature-based modules
│   ├── visitor-registration/
│   ├── check-in-out/
│   ├── visitor-management/
│   ├── host-management/
│   ├── reports/
│   └── admin-dashboard/
├── database/            # Database models and services
│   ├── models/
│   ├── services/
│   └── sql/
├── shared/              # Shared utilities
│   ├── hooks/
│   ├── services/
│   ├── types/
│   └── utils/
├── models/              # Data models
├── pages/               # Page components
├── services/            # Business logic services
├── types/               # TypeScript type definitions
└── lib/                 # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Saranshaga/visitor-management-system.git
cd visitor-management-system
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
```

## 📊 Database Schema

The system uses the following data models:

### Visitors Table
- VisitorID (Primary Key)
- FirstName, LastName
- Company, ContactNumber, Email
- CreatedDate

### Hosts Table
- HostID (Primary Key)
- FirstName, LastName
- Department, ContactNumber

### Visits Table
- VisitID (Primary Key)
- VisitorID (Foreign Key)
- HostID (Foreign Key)
- Purpose, CheckInTime, CheckOutTime
- Status ('Checked In' | 'Checked Out')

## 🎯 Usage

### Registering a Visitor
1. Navigate to the "Register Visitor" tab
2. Fill in visitor information
3. Select a host from the dropdown
4. Specify the purpose of visit
5. Submit the form

### Check-in/Check-out Process
1. Go to "Check In/Out" tab
2. Search for the visitor
3. Click check-in to record arrival
4. Click check-out when visitor leaves

### Generating Reports
1. Access the "Reports" tab
2. Select date range and filters
3. Generate report
4. Export to CSV if needed

## 🔒 Security Features

- Type-safe data handling
- Input validation and sanitization
- XSS protection through React
- Secure data storage practices
- Access control ready architecture

## 🚀 Deployment

The application can be deployed to various platforms:

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the build folder or connect via Git
- **AWS S3 + CloudFront**: Static website hosting
- **Firebase Hosting**: Google's hosting platform

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_APP_TITLE=Visitor Management System
VITE_API_URL=your_api_endpoint_here
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📈 Future Enhancements

- Real-time notifications
- Mobile app development
- Advanced analytics
- ID card scanning integration
- Automated host notifications
- Visitor photo capture
- Backend API integration
- Database optimization

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

**Saransh Agarwal**
- GitHub: [@Saranshaga](https://github.com/Saranshaga)
- LinkedIn: [Your LinkedIn Profile]
- Email: your.email@example.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Radix UI for accessible components
- All contributors and testers

## 📞 Support

For support, email your.email@example.com or create an issue in this repository.

---

**Built with ❤️ using React, TypeScript, and modern web technologies**