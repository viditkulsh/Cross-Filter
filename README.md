# Amazon-Style Business Intelligence Dashboard

A modern, responsive business intelligence dashboard built with React and TypeScript, featuring dynamic cross-filtering capabilities inspired by Amazon's design principles.

## 🚀 Features

### Core Functionality
- **Dynamic Cross-Filtering**: Apply multiple filters simultaneously with real-time data updates
- **Interactive Data Table**: Sortable columns, pagination, and responsive design
- **Visual Analytics**: Custom bar and pie charts for data distribution
- **Real-time Metrics**: Live statistics cards showing filtered vs total records
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### User Experience
- **Amazon-Inspired UI**: Clean, professional interface following Amazon's design language
- **Multi-Select Filters**: Advanced dropdown filters with search functionality
- **Loading States**: Smooth loading animations and error handling
- **Performance Optimized**: Efficient data processing and rendering

## 📊 Dataset

The dashboard works with two sample datasets located in the `public` folder:

- **`dataset_small.csv`** (10K records): Contains columns `number`, `mod3`, `mod4`, `mod5`, `mod6`
- **`dataset_large.csv`** (50K records): Contains columns `number`, `mod350`, `mod8000`, `mod20002`

### Data Format
Both datasets follow a simple CSV structure with numeric data that demonstrates the filtering capabilities across different column types and value ranges.

## 🛠️ Technology Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icon library

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FilterComponent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the dashboard

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx    # Main dashboard layout
│   ├── FilterPanel.tsx  # Filter controls sidebar
│   ├── DataTable.tsx    # Interactive data table
│   ├── MultiSelect.tsx  # Multi-select dropdown component
│   ├── MetricsCards.tsx # Statistics cards
│   ├── ChartPanel.tsx   # Data visualization charts
│   ├── Pagination.tsx   # Table pagination
│   ├── LoadingScreen.tsx# Loading state component
│   └── ErrorScreen.tsx  # Error handling component
├── context/
│   └── DataContext.tsx  # Global state management
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎯 Key Components

### DataContext
Manages global application state including:
- CSV data loading and parsing
- Filter state management
- Real-time data filtering
- Error handling and loading states

### Dashboard
The main layout component that orchestrates:
- Header with metrics and controls
- Sidebar filter panel
- Main content area with charts and table

### FilterPanel
Advanced filtering interface featuring:
- Multi-select dropdowns for each data column
- Search functionality within filters
- Visual indication of selected values
- Clear all filters capability

### DataTable
Professional data table with:
- Column sorting (ascending/descending)
- Pagination with customizable page sizes
- Responsive design for mobile devices
- Performance optimization for large datasets

## 🎨 Design Philosophy

### Amazon-Inspired Design
- **Clean and Professional**: Minimal design with focus on functionality
- **Orange Accent Color**: Using Amazon's signature orange (#f97316)
- **Consistent Typography**: Professional font hierarchy
- **Intuitive Navigation**: User-friendly interface patterns

### Responsive Layout
- **Mobile-First**: Optimized for mobile devices
- **Progressive Enhancement**: Enhanced features for larger screens
- **Grid System**: Flexible layout using CSS Grid and Flexbox

## 🔧 Customization

### Adding New Datasets
1. Place your CSV file in the `public` folder
2. Update the file path in `DataContext.tsx`
3. The dashboard will automatically adapt to new column structures

### Styling
- Modify Tailwind classes in components for quick styling changes
- Add custom CSS in `index.css` for advanced styling
- Color scheme can be updated by changing the orange theme color

### Extending Functionality
- Add new chart types in `ChartPanel.tsx`
- Implement additional filter types in `FilterPanel.tsx`
- Add new metrics in `MetricsCards.tsx`

## 📈 Performance Features

- **Memoization**: React.useMemo for expensive calculations
- **Efficient Filtering**: Optimized filter algorithms
- **Lazy Loading**: Components load only when needed
- **Pagination**: Handles large datasets efficiently

## 🧪 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or support, please open an issue in the repository.

---

Built with ❤️ using React and TypeScript
