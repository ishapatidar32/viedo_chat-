
import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './page/Landingpage.jsx'
import './App.css'
import  AuthenticationContext  from './contexts/autontication.jsx';
import { AuthProvider } from './contexts/authcontent.jsx';
function App() {
   return (
   
    <Router>
       <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthenticationContext />} />
      </Routes>
      </AuthProvider>
    </Router>
  
   );
}

export default App
