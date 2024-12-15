import React from "react";
import { useNavigate } from "react-router-dom"; // Хук для навигации
import "./Header.css";

const Header = () => {
  const navigate = useNavigate(); // Инициализация хука

  return (
    <header>
      <nav className="header-fixed-block">
        <button className="logo-button" onClick={() => navigate("/")}>
          Главная
        </button>
        <button className="logo-button" onClick={() => navigate("/catalog")}>
          Каталог
        </button>
        <button className="logo-button" onClick={() => navigate("/autorisation")}>
          Личный кабинет
        </button>
        <button className="logo-button" onClick={() => navigate("/cart")}>
          Корзина
        </button>
      </nav>
    </header>
  );
};

export default Header;
