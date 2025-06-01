import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-yellow-400 text-gray-100 text-center py-5">
    <p>© 2023 Solar Savings Simulation. Todos os direitos reservados.</p>
    <p>
      Desenvolvido por{" "}
      <a
        href="#"
        target="_blank"
        className="underline text-gray-100"
      >
        Seu Nome
      </a>
    </p>
  </footer>
);

export default Footer;
