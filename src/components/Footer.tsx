import React from "react";
import "../app/styles/footer.scss";

const Footer: React.FC = () => (
  <footer className="footer-root">
    <div className="footer-grid">
      <div className="footer-section">
        <p className="footer-title">Produtos</p>
        <div className="footer-links">
          <a className="footer-link" href="">
            Todos os Produtos
          </a>
        </div>
      </div>
      <div className="footer-section">
        <p className="footer-title">Sobre Nós</p>
        <div className="footer-links">
          <a className="footer-link" href="">
            Projetos
          </a>
          <a className="footer-link" href="">
            Nossa História
          </a>
          <a className="footer-link" href="">
            Unidades
          </a>
          <a className="footer-link" href="">
            Sustentabilidade
          </a>
          <a className="footer-link" href="">
            Pessoas
          </a>
          <a className="footer-link" href="">
            Glossário
          </a>
          <a className="footer-link" href="">
            Blog
          </a>
        </div>
      </div>
      <div className="footer-section contato-section">
        <p className="footer-title">Contato</p>
        <div className="footer-contact">
          <div className="footer-contact-item">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M451 374c-15.88-16-54.34-39.35-73-48.76-24.3-12.24-26.3-13.24-45.4.95-12.74 9.47-21.21 17.93-36.12 14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48 5.41-23.23 14.79-36c13.22-18 12.22-21 .92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9 44 119.9 47 108.83 51.6A160.15 160.15 0 0083 65.37C67 76 58.12 84.83 51.91 98.1s-9 44.38 23.07 102.64 54.57 88.05 101.14 134.49S258.5 406.64 310.85 436c64.76 36.27 89.6 29.2 102.91 23s22.18-15 32.83-31a159.09 159.09 0 0013.8-25.8C465 391.17 468 391.17 451 374z"
              ></path>
            </svg>
            <a className="footer-link" href="">
              (65) 3325-6501
            </a>
          </div>
          <div className="footer-contact-item">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M256 48c-79.5 0-144 61.39-144 137 0 87 96 224.87 131.25 272.49a15.77 15.77 0 0025.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137z"
              ></path>
              <circle
                cx="256"
                cy="192"
                r="48"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
              ></circle>
            </svg>
            <a
              href=""
              target="_blank"
              className="footer-link"
              style={{ lineHeight: "1rem" }}
            >
              Chegar na matriz
            </a>
          </div>
          <a className="footer-link" href="">
            Dúvidas Frequentes
          </a>
          <div className="footer-badges">
            <a className="block" target="_blank" href=""></a>
            <a className="block" target="_blank" href=""></a>
            <a className="block" target="_blank" href=""></a>
            <a className="block" target="_blank" href=""></a>
            <a className="block" target="_blank" href=""></a>
            <a className="block" target="_blank" href=""></a>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <a className="footer-privacy" href="">
        Termos e Políticas de Privacidade
      </a>
      <p className="footer-copyright">
        © 2024 simulador Energia Solar - Todos os direitos reservados.
      </p>
      <a href="" target="_blank" className="footer-created">
        <span>CREATED BY 
          <a href="https://github.com/GustaDaHora" target="_blank" rel="noopener noreferrer">GUSTAVO DA HORA</a>
        </span>
      </a>
    </div>
  </footer>
);

export default Footer;
