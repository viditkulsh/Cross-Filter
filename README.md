
# Cross-Filter Intelligence Dashboard 🚀

A stunning business intelligence dashboard with Amazon-style dynamic cross-filters, built with React + TypeScript + Vite.

## ✨ Features

- 🎯 **Dynamic Cross-Filters**: Amazon-style filtering where selecting one filter updates others and the dataset
- ⚡ **Lightning Fast**: CSV parsing with papaparse and optimized rendering
- 📊 **Beautiful Data Table**: Virtualized, paginated table with smooth animations
- 🎨 **Modern UI/UX**: Gradient design with glass-morphism effects and Tailwind CSS
- 🔄 **Smart Dropdowns**: Multi-select, searchable dropdowns with cross-filter logic
- 🧪 **Tested**: Comprehensive unit tests with Jest + React Testing Library
- 📱 **Responsive**: Mobile-friendly layout that works on all devices
- 🛡️ **Error Handling**: Robust error boundaries and loading states
- 🎭 **Animations**: Smooth fade-ins, slide-ins, and micro-interactions

## 🎨 Design Highlights

- **Gradient Color Scheme**: Beautiful blue-to-purple gradients throughout
- **Glass-morphism Effects**: Modern frosted glass UI components
- **Smooth Animations**: CSS animations with proper timing and easing
- **Interactive Elements**: Hover effects, focus states, and visual feedback
- **Professional Typography**: Inter font with proper weight hierarchy
- **Accessible Design**: WCAG compliant colors and interactive elements

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## 📂 Project Structure

```
/src
  /components
    FilterDropdown.tsx    # Enhanced multi-select dropdown with cross-filtering
    DataTable.tsx         # Beautiful data table with virtual scrolling
    Pagination.tsx        # Smart pagination with ellipsis support
  /context
    DataContext.tsx       # Global state management with React Context
  /utils
    csvParser.ts          # CSV parsing and modulo column generation
    filterUtils.ts        # Filter application logic
  /tests
    FilterDropdown.test.tsx
    DataTable.test.tsx
    filterUtils.test.ts
  App.tsx                 # Main dashboard component
  main.tsx               # Entry point with error boundary
  index.css              # Global styles with CSS custom properties
/public
  dataset_small.csv       # Sample dataset (50+ rows)
```

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript (strict mode)
- **Build Tool**: Vite (lightning fast HMR)
- **Styling**: Tailwind CSS with custom gradients
- **State Management**: React Context API
- **Data Processing**: papaparse for CSV parsing
- **Testing**: Jest + React Testing Library
- **Type Safety**: Full TypeScript coverage

## 🎯 How It Works

1. **Data Loading**: CSV is parsed and modulo columns (mod3, mod4, mod5, mod6) are computed
2. **Cross-Filtering**: When you select values in one filter, other filters update to show only valid combinations
3. **Real-time Updates**: The data table and pagination update instantly as filters change
4. **Performance**: Uses React.useMemo and useCallback for optimal rendering
5. **Error Handling**: Graceful error states with retry mechanisms

## 🌟 Key Components

### FilterDropdown
- Custom dropdown with search functionality
- Shows available vs. filtered-out options
- Visual indicators for cross-filter status
- Bulk select/clear actions

### DataTable
- Virtual scrolling for performance
- Responsive design with horizontal scroll
- Animated row entries
- Smart pagination controls

### Context Provider
- Centralized state management
- Efficient filter application
- Memoized derived data

## 🚀 Deployment

This project is ready for deployment on:

- **Vercel**: `npm run build` then deploy dist folder
- **Netlify**: Direct GitHub integration supported
- **Any static host**: Build outputs standard HTML/CSS/JS

## 🎨 Customization

The design system uses CSS custom properties for easy theming:

```css
:root {
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --shadow-soft: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  /* ... more variables */
}
```

## 🧪 Testing

Run the test suite to verify functionality:

```bash
npm test
```

Tests cover:
- Filter logic and cross-filtering behavior
- Data table rendering and interactions
- CSV parsing and data transformation
- Component integration

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🤝 Contributing

This project follows best practices for:
- Code organization and separation of concerns
- TypeScript strict mode compliance
- Accessibility and responsive design
- Performance optimization
- Error handling and user experience

---

**Built with ❤️ using modern web technologies and best practices.**
