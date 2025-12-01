/**
 * Base de datos de candidatos de I CODE
 * Centraliza toda la información de los miembros
 */

const candidatos = [
    {
        id: 'franklin-figueroa',
        nombre: 'Franklin Figueroa Pérez',
        cargo: 'Presidente',
        imagen: './resource/img/candidatos/FIGUEROA PEREZ, Franklin.webp',
        descripcionCorta: 'Estudiante comprometido con la innovación y el desarrollo estudiantil.',
        biografia: `Franklin es un estudiante de Ingeniería de Sistemas con amplia experiencia 
        en liderazgo estudiantil y desarrollo de proyectos tecnológicos. Su visión es transformar 
        la experiencia universitaria mediante la implementación de soluciones innovadoras.`,
        experiencia: [
            'Desarrollo de SIMALAB - Sistema de gestión de laboratorios',
            'Participación en hackathons nacionales',
            'Delegado estudiantil 2023-2024'
        ],
        habilidades: [
            'Liderazgo y gestión de equipos',
            'Desarrollo de software',
            'Pensamiento estratégico',
            'Comunicación efectiva'
        ],
        propuestas: [
            'Digitalización de procesos administrativos',
            'Implementación de sistema de tickets para impresiones',
            'Mejora de infraestructura tecnológica'
        ],
        redes: {
            facebook: '#',
            instagram: '#',
            linkedin: '#',
            github: 'https://github.com/Inmortal175'
        }
    },
    {
        id: 'vicepresidente',
        nombre: 'Nombre Completo', // TODO: Actualizar
        cargo: 'Vicepresidente',
        imagen: './resource/img/candidatos/img1.webp',
        descripcionCorta: 'Comprometido con el bienestar estudiantil.',
        biografia: 'Descripción completa del candidato...',
        experiencia: [],
        habilidades: [],
        propuestas: [],
        redes: {}
    },
    {
        id: 'orlando-nilupu',
        nombre: 'Orlando Paul Nilupu Palomino',
        cargo: 'Coordinador Académico',
        imagen: './resource/img/candidatos/img2.webp',
        descripcionCorta: 'Enfocado en la excelencia académica.',
        biografia: 'Estudiante destacado con pasión por mejorar la calidad educativa...',
        experiencia: [],
        habilidades: [],
        propuestas: [],
        redes: {}
    },
    {
        id: 'coordinador-actas',
        nombre: 'Nombre Completo', // TODO: Actualizar
        cargo: 'Coordinador de Actas y Acuerdos',
        imagen: './resource/img/candidatos/img1.webp',
        descripcionCorta: 'Organización y transparencia.',
        biografia: 'Descripción completa del candidato...',
        experiencia: [],
        habilidades: [],
        propuestas: [],
        redes: {}
    },
    {
        id: 'coordinador-economia',
        nombre: 'Nombre Completo', // TODO: Actualizar
        cargo: 'Coordinador de Economía y Desarrollo',
        imagen: './resource/img/candidatos/img2.webp',
        descripcionCorta: 'Gestión eficiente de recursos.',
        biografia: 'Descripción completa del candidato...',
        experiencia: [],
        habilidades: [],
        propuestas: [],
        redes: {}
    },
    {
        id: 'roy-gomez',
        nombre: 'Roy Brayam Gomez Prado',
        cargo: 'Coordinador de Prensa y Propaganda',
        imagen: './resource/img/candidatos/img1.webp',
        descripcionCorta: 'Comunicación estratégica y difusión.',
        biografia: 'Experto en comunicación digital y gestión de redes sociales...',
        experiencia: [],
        habilidades: [],
        propuestas: [],
        redes: {}
    },
    {
        id: 'jhony-sulca',
        nombre: 'Jhony Alberto Sulca Mendoza',
        cargo: 'Coordinador de Relaciones Públicas',
        imagen: './resource/img/candidatos/img2.webp',
        descripcionCorta: 'Construcción de alianzas estratégicas.',
        biografia: 'Especialista en relaciones interpersonales y networking...',
        experiencia: [],
        habilidades: [],
        propuestas: [],
        redes: {}
    },
    {
        id: 'angel-huamani',
        nombre: 'Angel Omar Huamaní Gutierrez',
        cargo: 'Coordinador de Deportes (1)',
        imagen: './resource/img/candidatos/img1.webp',
        descripcionCorta: 'Promoción de vida saludable.',
        biografia: 'Deportista comprometido con el bienestar físico estudiantil...',
        experiencia: [],
        habilidades: [],
        propuestas: [],
        redes: {}
    },
    {
        id: 'oscar-bautista',
        nombre: 'Oscar Abel Bautista Ayala',
        cargo: 'Coordinador de Deportes (2)',
        imagen: './resource/img/candidatos/img2.webp',
        descripcionCorta: 'Fomento del deporte competitivo.',
        biografia: 'Apasionado por los deportes y la competencia sana...',
        experiencia: [],
        habilidades: [],
        propuestas: [],
        redes: {}
    },
    {
        id: 'fredy-bonilla',
        nombre: 'Fredy Arturo Bonilla Rey',
        cargo: 'Coordinador de Eventos Culturales',
        imagen: './resource/img/candidatos/img1.webp',
        descripcionCorta: 'Promoción del arte y la cultura.',
        biografia: 'Gestor cultural con experiencia en organización de eventos...',
        experiencia: [],
        habilidades: [],
        propuestas: [],
        redes: {}
    },
    {
        id: 'ana-rodrigo',
        nombre: 'Ana Gabriela Rodrigo Cutipa',
        cargo: 'Vocalía',
        imagen: './resource/img/candidatos/img2.webp',
        descripcionCorta: 'Voz estudiantil activa.',
        biografia: 'Representante comprometida con escuchar y transmitir las necesidades estudiantiles...',
        experiencia: [],
        habilidades: [],
        propuestas: [],
        redes: {}
    }
];

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = candidatos;
}
