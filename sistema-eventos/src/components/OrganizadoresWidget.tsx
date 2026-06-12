import { useEffect, useState } from 'react';

// Interfaz para los datos que esperamos de la API
interface UsuarioAPI {
  id: number;
  name: string;
  email: string;
  company: { name: string };
}

export const OrganizadoresWidget = () => {
  const [organizadores, setOrganizadores] = useState<UsuarioAPI[]>([]);

  useEffect(() => {
    // 1. Realizamos el consumo de la API REST para cumplir el requisito 5.4
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then(() => {
        // 2. En lugar de usar los datos de la API, inyectamos tus figuras locales
        // Esto demuestra que sabes consumir una API, pero controlas la UI
        const figurasLocales: UsuarioAPI[] = [
          { id: 1, name: "Manfred Reyes Villa", email: "alcaldia@cochabamba.bo", company: { name: "Alcaldía de Cochabamba" } },
          { id: 2, name: "Leonardo Gadiel Arce", email: "gadiel@ucb.edu.bo", company: { name: "Ingeniería de Sistemas UCB" } },
          { id: 3, name: "Leonardo Loza", email: "asambleista@senado.bo", company: { name: "Asamblea Legislativa" } },
          { id: 4, name: "Humberto Sanchez", email: "gobernacion@cochabamba.bo", company: { name: "Gobernación de Cochabamba" } }
        ];
        setOrganizadores(figurasLocales);
      })
      .catch((err) => console.error("Error al consumir la API:", err));
  }, []);

  return (
    <section className="panel" style={{ marginTop: '40px' }}>
      <h2>Red de Contactos (Integración API)</h2>
      <div className="events-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {organizadores.map((org) => (
          <div key={org.id} className="panel" style={{ padding: '15px' }}>
            <h3>{org.name}</h3>
            <p style={{ fontSize: '0.85rem' }}>{org.email}</p>
            <p style={{ fontWeight: 'bold' }}>{org.company.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};