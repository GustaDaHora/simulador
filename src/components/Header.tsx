import React from "react";
import Image from "next/image";

const Header: React.FC = () => (
  <header>
    <div className="upper-header">
      <a href="#" className="upper-nav">
        <Image src="/simulador/support.svg" alt="Suporte" width={20} height={20} />
        <span>Perguntas Frequentes</span>
      </a>
      <a
        href="tel:+556533256501"
        className="upper-nav"
      >
        <Image src="/simulador/call.svg" alt="Telefone" width={20} height={20} />
        <span>(65) 3325-6501</span>
      </a>
    </div>

    <div className="lower-header">
      <a href="#" className="logo">
        <Image src="/simulador/bulb.svg" alt="Logo Synergy" width={50} height={50} />
        <span>Synergy</span>
      </a>

      <nav className="nav-menu">
        <a href="#" className="nav-link">
          Produtos
        </a>
        <a href="#" className="nav-link">
          Sobre nós
        </a>
        <a href="#" className="nav-link">
          Unidades
        </a>
        <button className="menu-button">
          <Image src="/simulador/menu.svg" alt="Menu" width={20} height={20} />
        </button>
      </nav>
    </div>
  </header>
);

export default Header;
