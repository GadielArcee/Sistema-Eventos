Sistema de Eventos - UCB
Este es el proyecto final para la materia de Tecnologías Web II. Básicamente, es una aplicación web para gestionar eventos donde puedes listar, crear, editar y eliminar eventos dependiendo de si entras como administrador o como usuario normal.

¿Qué tiene el sistema?
Lo hice pensando en que sea una SPA (Single Page Application) rápida y fácil de usar. Las funciones principales son:

Login y roles: Cada usuario tiene su propio acceso. Si entras como 'admin', tienes permiso para modificar todo; si entras como 'joaquin', solo puedes ver los eventos.

Gestión de eventos: Puedes crear eventos nuevos, editarlos o borrarlos. Todo se guarda en el navegador (local storage) para que no se pierda nada al recargar.

Validaciones: Me aseguré de que no se puedan crear eventos con campos vacíos o fechas pasadas, para que la info siempre esté bien.

Diseño: Todo es responsive, así que se ve bien tanto en el celular como en la computadora.

Integración API: Consumo una API pública para mostrar una sección de "Comentarios de la Comunidad" y así cumplir con los requisitos de la materia.

Tecnologías
Está hecho con lo básico y necesario para que funcione bien:

React + TypeScript

Vite

CSS puro (sin frameworks pesados)

React Router para la navegación

Cómo probarlo localmente
Si quieres correrlo en tu compu, solo necesitas tener instalado Node.js y seguir estos pasos:

Clonar el repo:
git clone https://github.com/GadielArcee/Sistema-Eventos.git

Entrar a la carpeta e instalar todo:
npm install

Arrancar el proyecto:
npm run dev

Sobre mí
Mi nombre es Leonardo Gadiel Arce, estudiante de Ingeniería de Sistemas en la UCB. Cualquier duda sobre el código, aquí estoy.
