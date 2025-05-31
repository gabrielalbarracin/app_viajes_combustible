export const conductores = [
  {
    codigo: 'COND001',
    nombre: 'Juan',
    apellido: 'Pérez',
    dni: '25789456',
    fechaNacimiento: new Date('1985-06-15'),
    licenciaConducir: {
      numero: 'LIC123456',
      categoria: 'Profesional',
      fechaVencimiento: new Date('2024-12-31')
    },
    telefono: '1123456789',
    email: 'juan.perez@email.com',
    direccion: {
      calle: 'Av. Rivadavia',
      numero: '1234',
      ciudad: 'Buenos Aires',
      provincia: 'Buenos Aires',
      codigoPostal: '1406'
    }
  },
  {
    codigo: 'COND002',
    nombre: 'María',
    apellido: 'González',
    dni: '27896543',
    fechaNacimiento: new Date('1988-03-22'),
    licenciaConducir: {
      numero: 'LIC789012',
      categoria: 'Profesional',
      fechaVencimiento: new Date('2024-10-15')
    },
    telefono: '1187654321',
    email: 'maria.gonzalez@email.com',
    direccion: {
      calle: 'Corrientes',
      numero: '4567',
      ciudad: 'Buenos Aires',
      provincia: 'Buenos Aires',
      codigoPostal: '1414'
    }
  },
  {
    codigo: 'COND003',
    nombre: 'Carlos',
    apellido: 'González',
    dni: '30789123',
    fechaNacimiento: new Date('1981-08-22'),
    licenciaConducir: {
      numero: 'B987654321',
      categoria: 'Profesional',
      fechaVencimiento: new Date('2024-10-15')
    },
    telefono: '1156789012',
    email: 'carlos.gonzalez@email.com',
    direccion: {
      calle: 'San Martín',
      numero: '567',
      ciudad: 'Córdoba',
      provincia: 'Córdoba',
      codigoPostal: '5000'
    }
  },
  {
    codigo: 'COND004',
    nombre: 'Miguel',
    apellido: 'Rodríguez',
    dni: '25123456',
    fechaNacimiento: new Date('1978-03-10'),
    licenciaConducir: {
      numero: 'C456789012',
      categoria: 'Profesional',
      fechaVencimiento: new Date('2025-06-30')
    },
    telefono: '1167890123',
    email: 'miguel.rodriguez@email.com',
    direccion: {
      calle: 'Belgrano',
      numero: '890',
      ciudad: 'Rosario',
      provincia: 'Santa Fe',
      codigoPostal: '2000'
    }
  },
  {
    codigo: 'COND005',
    nombre: 'Roberto',
    apellido: 'Fernández',
    dni: '32456789',
    fechaNacimiento: new Date('1985-11-28'),
    licenciaConducir: {
      numero: 'D789012345',
      categoria: 'Profesional',
      fechaVencimiento: new Date('2024-08-15')
    },
    telefono: '1178901234',
    email: 'roberto.fernandez@email.com',
    direccion: {
      calle: 'San Juan',
      numero: '1234',
      ciudad: 'Mendoza',
      provincia: 'Mendoza',
      codigoPostal: '5500'
    }
  },
  {
    codigo: 'COND006',
    nombre: 'Diego',
    apellido: 'Martínez',
    dni: '27890123',
    fechaNacimiento: new Date('1983-07-14'),
    licenciaConducir: {
      numero: 'E234567890',
      categoria: 'Profesional',
      fechaVencimiento: new Date('2025-03-31')
    },
    telefono: '1189012345',
    email: 'diego.martinez@email.com',
    direccion: {
      calle: 'Rivadavia',
      numero: '567',
      ciudad: 'Mar del Plata',
      provincia: 'Buenos Aires',
      codigoPostal: '7600'
    }
  },
  {
    codigo: 'COND007',
    nombre: 'Luis',
    apellido: 'Sánchez',
    dni: '31234567',
    fechaNacimiento: new Date('1987-09-05'),
    licenciaConducir: {
      numero: 'F345678901',
      categoria: 'Profesional',
      fechaVencimiento: new Date('2024-12-15')
    },
    telefono: '1190123456',
    email: 'luis.sanchez@email.com',
    direccion: {
      calle: 'Mitre',
      numero: '890',
      ciudad: 'Bariloche',
      provincia: 'Río Negro',
      codigoPostal: '8400'
    }
  },
  {
    codigo: 'COND008',
    nombre: 'Pablo',
    apellido: 'López',
    dni: '29567890',
    fechaNacimiento: new Date('1984-12-20'),
    licenciaConducir: {
      numero: 'G456789012',
      categoria: 'Profesional',
      fechaVencimiento: new Date('2025-09-30')
    },
    telefono: '1123456789',
    email: 'pablo.lopez@email.com',
    direccion: {
      calle: 'Sarmiento',
      numero: '123',
      ciudad: 'Salta',
      provincia: 'Salta',
      codigoPostal: '4400'
    }
  },
  {
    codigo: 'COND009',
    nombre: 'Martín',
    apellido: 'Silva',
    dni: '33890123',
    fechaNacimiento: new Date('1990-02-15'),
    licenciaConducir: {
      numero: 'H567890123',
      categoria: 'Profesional',
      fechaVencimiento: new Date('2025-01-31')
    },
    telefono: '1134567890',
    email: 'martin.silva@email.com',
    direccion: {
      calle: 'Urquiza',
      numero: '456',
      ciudad: 'Tucumán',
      provincia: 'Tucumán',
      codigoPostal: '4000'
    }
  }
];

export const estados = [
  { codigo: 'PEND', descripcion: 'Pendiente' },
  { codigo: 'PROG', descripcion: 'Programado' },
  { codigo: 'ENCU', descripcion: 'En Curso' },
  { codigo: 'COMP', descripcion: 'Completado' },
  { codigo: 'CANC', descripcion: 'Cancelado' }
];

export const destinos = [
  {
    codigo: 'DEST001',
    descripcion: 'Estación de Servicio Norte',
    provincia: 'Buenos Aires',
    ciudad: 'San Isidro',
    direccion: 'Av. del Libertador 15678',
    codigoPostal: '1642',
    coordenadas: {
      latitud: -34.4747,
      longitud: -58.5283
    },
    telefono: '1147890123',
    horarioAtencion: '24 horas'
  },
  {
    codigo: 'DEST002',
    descripcion: 'Estación de Servicio Sur',
    provincia: 'Buenos Aires',
    ciudad: 'Quilmes',
    direccion: 'Av. Calchaquí 3456',
    codigoPostal: '1878',
    coordenadas: {
      latitud: -34.7283,
      longitud: -58.2569
    },
    telefono: '1147895678',
    horarioAtencion: '06:00 - 22:00'
  },
  {
    codigo: 'DEST003',
    descripcion: 'Estación de Servicio Oeste',
    provincia: 'Buenos Aires',
    ciudad: 'Morón',
    direccion: 'Av. Rivadavia 18900',
    codigoPostal: '1708',
    coordenadas: {
      latitud: -34.6498,
      longitud: -58.6156
    },
    telefono: '1147899012',
    horarioAtencion: '24 horas'
  },
  {
    codigo: 'BUE',
    descripcion: 'Terminal de Retiro',
    provincia: 'Buenos Aires',
    ciudad: 'Buenos Aires',
    direccion: 'Av. Antártida Argentina s/n',
    codigoPostal: '1104',
    coordenadas: {
      latitud: -34.5833,
      longitud: -58.3733
    },
    telefono: '0800-333-0300',
    horarioAtencion: '24 horas'
  },
  {
    codigo: 'CBA',
    descripcion: 'Terminal de Ómnibus',
    provincia: 'Córdoba',
    ciudad: 'Córdoba',
    direccion: 'Bv. Juan D. Perón 380',
    codigoPostal: '5000',
    coordenadas: {
      latitud: -31.4135,
      longitud: -64.1811
    },
    telefono: '0351-428-4141',
    horarioAtencion: '24 horas'
  },
  {
    codigo: 'ROS',
    descripcion: 'Terminal Mariano Moreno',
    provincia: 'Santa Fe',
    ciudad: 'Rosario',
    direccion: 'Cafferata 702',
    codigoPostal: '2000',
    coordenadas: {
      latitud: -32.9468,
      longitud: -60.6393
    },
    telefono: '0341-472-1290',
    horarioAtencion: '24 horas'
  },
  {
    codigo: 'MDZ',
    descripcion: 'Terminal del Sol',
    provincia: 'Mendoza',
    ciudad: 'Mendoza',
    direccion: 'Av. de Acceso Este s/n',
    codigoPostal: '5500',
    coordenadas: {
      latitud: -32.8908,
      longitud: -68.8272
    },
    telefono: '0261-431-3001',
    horarioAtencion: '24 horas'
  },
  {
    codigo: 'MDQ',
    descripcion: 'Terminal Sur',
    provincia: 'Buenos Aires',
    ciudad: 'Mar del Plata',
    direccion: 'Av. Luro 4150',
    codigoPostal: '7600',
    coordenadas: {
      latitud: -38.0055,
      longitud: -57.5426
    },
    telefono: '0223-451-0106',
    horarioAtencion: '24 horas'
  },
  {
    codigo: 'BRC',
    descripcion: 'Terminal San Carlos',
    provincia: 'Río Negro',
    ciudad: 'Bariloche',
    direccion: '12 de Octubre y Moreno',
    codigoPostal: '8400',
    coordenadas: {
      latitud: -41.1335,
      longitud: -71.3103
    },
    telefono: '0294-442-2106',
    horarioAtencion: '6:00 a 23:00'
  },
  {
    codigo: 'SLA',
    descripcion: 'Terminal Central',
    provincia: 'Salta',
    ciudad: 'Salta',
    direccion: 'Av. Hipólito Yrigoyen 339',
    codigoPostal: '4400',
    coordenadas: {
      latitud: -24.7829,
      longitud: -65.4232
    },
    telefono: '0387-431-0569',
    horarioAtencion: '24 horas'
  },
  {
    codigo: 'TUC',
    descripcion: 'Terminal Tafí Viejo',
    provincia: 'Tucumán',
    ciudad: 'San Miguel de Tucumán',
    direccion: 'Av. Sáenz Peña 1000',
    codigoPostal: '4000',
    coordenadas: {
      latitud: -26.8083,
      longitud: -65.2176
    },
    telefono: '0381-430-1000',
    horarioAtencion: '24 horas'
  },
  {
    codigo: 'USH',
    descripcion: 'Terminal Malvinas',
    provincia: 'Tierra del Fuego',
    ciudad: 'Ushuaia',
    direccion: 'Av. Maipú 1451',
    codigoPostal: '9410',
    coordenadas: {
      latitud: -54.8019,
      longitud: -68.3030
    },
    telefono: '02901-42-1412',
    horarioAtencion: '6:00 a 22:00'
  },
  {
    codigo: 'IGR',
    descripcion: 'Terminal Internacional',
    provincia: 'Misiones',
    ciudad: 'Puerto Iguazú',
    direccion: 'Av. Victoria Aguirre 591',
    codigoPostal: '3370',
    coordenadas: {
      latitud: -25.5972,
      longitud: -54.5786
    },
    telefono: '03757-42-1994',
    horarioAtencion: '24 horas'
  }
];

export const combustibles = [
  { codigo: 'NAF', descripcion: 'Nafta' },
  { codigo: 'GAS', descripcion: 'Gasoil' },
  { codigo: 'PRE', descripcion: 'Premium' },
  { codigo: 'SUP', descripcion: 'Super' }
]; 