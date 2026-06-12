import type { Evento, EventoFormValues } from '../interfaces/evento';

const STORAGE_KEY = 'sistema-eventos-local-cache';

const buildImageUrl = (id: string | number) => `https://picsum.photos/seed/evento-${id}/800/500`;

const EVENTOS_SEMILLA: Evento[] = [
  {
    id: '1',
    titulo: 'Feria Internacional',
    descripcion: 'Encuentro ferial con expositores, actividades culturales y espacios para negocios y emprendimiento.',
    fecha: '2026-08-15',
    ubicacion: 'Recinto Ferial Alalay, Cochabamba',
    categoria: 'General',
    imagen: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    estado: true,
  },
  {
    id: '2',
    titulo: 'Conferencia de Desarrollo Web',
    descripcion: 'Jornada técnica sobre React, TypeScript, arquitectura frontend y buenas prácticas de desarrollo moderno.',
    fecha: '2026-08-22',
    ubicacion: 'Campus Universitario UCB',
    categoria: 'Tecnología',
    imagen: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    estado: true,
  },
  {
    id: '3',
    titulo: 'Concierto de Rock',
    descripcion: 'Noche de música en vivo con bandas invitadas, sonido profesional y un ambiente de alto impacto.',
    fecha: '2026-09-05',
    ubicacion: 'Estadio Sudamericano',
    categoria: 'Entretenimiento',
    imagen: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    estado: true,
  },
  {
    id: '4',
    titulo: 'Maratón 10K',
    descripcion: 'Competencia deportiva abierta al público con circuito urbano, hidratación y premiación para ganadores.',
    fecha: '2026-09-19',
    ubicacion: 'Avenida Aroma, Cochabamba',
    categoria: 'Deportes',
    imagen: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=80',
    estado: true,
  },
  {
    id: '5',
    titulo: 'Festival Gastronómico',
    descripcion: 'Muestra culinaria con cocina regional, degustaciones, chefs invitados y experiencias para toda la familia.',
    fecha: '2026-10-03',
    ubicacion: 'Plaza Principal 14 de Septiembre',
    categoria: 'Gastronomía',
    imagen: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    estado: true,
  },
  {
    id: '6',
    titulo: 'Torneo de E-Sports',
    descripcion: 'Competencia de videojuegos con rondas clasificatorias, finales en vivo y premios para los mejores equipos.',
    fecha: '2026-10-17',
    ubicacion: 'Centro de Convenciones Santa Cruz',
    categoria: 'Videojuegos',
    imagen: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    estado: true,
  },
  {
    id: '7',
    titulo: 'Cumbre de Emprendimiento',
    descripcion: 'Espacio de networking, charlas de inversión y asesoría para proyectos innovadores y startups locales.',
    fecha: '2026-11-07',
    ubicacion: 'Hotel Cochabamba',
    categoria: 'Negocios',
    imagen: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    estado: true,
  },
  {
    id: '8',
    titulo: 'Feria de Tecnología Educativa',
    descripcion: 'Exhibición de herramientas digitales, laboratorios interactivos y soluciones para el aprendizaje moderno.',
    fecha: '2026-11-21',
    ubicacion: 'Universidad Mayor de San Simón',
    categoria: 'Educación',
    imagen: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    estado: true,
  },
  {
    id: '9',
    titulo: 'Encuentro de Fotografía Urbana',
    descripcion: 'Ruta fotográfica guiada con prácticas de composición, iluminación y edición en espacios de ciudad.',
    fecha: '2026-12-05',
    ubicacion: 'Centro Histórico de La Paz',
    categoria: 'Arte',
    imagen: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    estado: true,
  },
  {
    id: '10',
    titulo: 'Expo Innovación y Robótica',
    descripcion: 'Muestra de prototipos, automatización, robots educativos y soluciones tecnológicas para distintos sectores.',
    fecha: '2026-12-19',
    ubicacion: 'Pabellón Ferial Julio León Prado',
    categoria: 'Innovación',
    imagen: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    estado: true,
  },
];

const withDelay = <T>(operation: () => T): Promise<T> =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => {
      try {
        resolve(operation());
      } catch (error) {
        reject(error);
      }
    }, 500);
  });

const readLocalEvents = (): Evento[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const rawEvents = localStorage.getItem(STORAGE_KEY);

  if (!rawEvents) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawEvents) as Evento[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveLocalEvents = (events: Evento[]) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

const makeLocalEvent = (values: EventoFormValues, id?: string | number): Evento => ({
  id: id ?? String(Date.now()),
  ...values,
});

export const obtenerEventos = async (): Promise<Evento[]> => {
  return withDelay(() => {
    const localEvents = readLocalEvents();

    if (localEvents.length > 0) {
      return localEvents;
    }

    saveLocalEvents(EVENTOS_SEMILLA);
    return EVENTOS_SEMILLA;
  });
};

export const crearEvento = async (evento: EventoFormValues): Promise<Evento> => {
  return withDelay(() => {
    const storedEvents = readLocalEvents();
    const createdEvent = makeLocalEvent({
      ...evento,
      imagen: evento.imagen.trim() || buildImageUrl(Date.now()),
    });

    const nextEvents = [...storedEvents, createdEvent];
    saveLocalEvents(nextEvents);
    return createdEvent;
  });
};

export const actualizarEvento = async (id: string | number, evento: EventoFormValues): Promise<Evento> => {
  return withDelay(() => {
    const storedEvents = readLocalEvents();
    const updatedEvent = makeLocalEvent(
      {
        ...evento,
        imagen: evento.imagen.trim() || buildImageUrl(id),
      },
      id
    );

    const nextEvents = storedEvents.map((item) => (String(item.id) === String(id) ? updatedEvent : item));
    saveLocalEvents(nextEvents);
    return updatedEvent;
  });
};

export const eliminarEvento = async (id: string | number): Promise<void> => {
  return withDelay(() => {
    const storedEvents = readLocalEvents().filter((item) => String(item.id) !== String(id));
    saveLocalEvents(storedEvents);
  });
};