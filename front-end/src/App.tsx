// frontend/src/App.tsx

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 1. GARANTIR QUE AS IMPORTAÇÕES ESTÃO CORRETAS
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

// Importação do Contexto de Autenticação
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/use-auth';

// Importação dos seus Componentes e Páginas
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProductDetailPage from './pages/ProductDetailPage';
import SearchResultsPage from './pages/SearchResultsPage';
import SearchBar from './components/SearchBar';
import CategoryMenu from './components/CategoryMenu';
import CategoryPage from './pages/CategoryPage';

// --- COMPONENTE HEADER ---
function Header() {
  const { token, logout } = useAuth();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold', fontSize: '24px', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Viva Mix Store
          </Link>
        </Typography>
        <Box sx={{ ml: 2 }}><CategoryMenu /></Box>
        <SearchBar />
        <Button component={Link} to="/admin" color="inherit" sx={{ ml: 2 }}>Admin</Button>
        {token && <Button color="inherit" onClick={logout} sx={{ ml: 1 }}>Sair</Button>}
      </Toolbar>
    </AppBar>
  );
}

// --- COMPONENTE APP ---
function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          {/* O Header agora está dentro de todos os providers necessários */}
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/produto/:id" element={<ProductDetailPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route 
                path="/admin" 
                element={<ProtectedRoute><AdminPage /></ProtectedRoute>} 
              />
            </Routes>
          </main>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
