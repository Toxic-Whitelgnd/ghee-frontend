import React, { ReactNode } from 'react'
import NavBar from '../components/navbar/NavBar'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Footer from '../components/footer/Footer';
import ContactButton from '../components/floatingButton/FloatingButton';

interface MainLayoutProps {
    children: ReactNode; 
  }
  
  const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
      <>
      <div>
        
      </div>
        <NavBar />  
        <div className="main-content">
          {children} 
        </div>
        <Footer />
        <ContactButton />
      </>
    );
  };
  
  export default MainLayout;
