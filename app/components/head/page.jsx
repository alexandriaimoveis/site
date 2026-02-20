import { BsPinMapFill } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";

export default function Head() {
  return (
    <section className="px-6 py-2 align-center shadow-md" style={{ backgroundColor: '#E59C24', color: '#FFFFFF' }}>

      <ul className="flex space-x-8 justify-center text-xs">
        <li>
          <span className="flex items-center gap-2">
            <BsPinMapFill />
            <span>São Lourenço/MG</span>
          </span>
        </li>

        <li>
          <span className="flex items-center gap-2">
            <BsWhatsapp />
            (35) 98426-5018
          </span>
        </li>

        <li>
          <span className="flex items-center gap-2">
            <BsEnvelope />
            contato@alexandriaimoveis.com.br
          </span>
        </li>
      </ul>
    </section>
  );
}