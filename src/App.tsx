import { DataProvider } from './context/DataContext';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
    return (
        <DataProvider>
            <div className="min-h-screen bg-gray-50">
                <Dashboard />
            </div>
        </DataProvider>
    );
}

export default App;
