// ==================================================================
// ToolHub — catálogo de herramientas (fuente única de datos)
// ==================================================================
const CATEGORIES = ['Todas','Texto','Calculadoras','Fecha y hora','Utilidades'];

const TOOLS = [
  // ---- Texto ----
  {id:'palabras', cat:'Texto', ico:'✍️', name:'Contador de palabras', desc:'Palabras, caracteres, frases y tiempo de lectura.'},
  {id:'mayusculas', cat:'Texto', ico:'🔠', name:'Convertidor de mayúsculas', desc:'MAYÚSCULAS, minúsculas, Tipo Título y más.'},

  // ---- Calculadoras ----
  {id:'imc', cat:'Calculadoras', ico:'⚖️', name:'Calculadora de IMC', desc:'Tu índice de masa corporal al instante.'},
  {id:'porcentaje', cat:'Calculadoras', ico:'📊', name:'Calculadora de porcentajes', desc:'Porcentajes, aumentos y descuentos.'},
  {id:'propina', cat:'Calculadoras', ico:'🧾', name:'Calculadora de propina', desc:'Divide la cuenta y calcula la propina justa.'},
  {id:'descuento', cat:'Calculadoras', ico:'🏷️', name:'Calculadora de descuentos', desc:'Precio final tras una rebaja o promoción.'},
  {id:'regladetres', cat:'Calculadoras', ico:'➗', name:'Regla de tres', desc:'Resuelve proporciones directas al instante.'},
  {id:'numerosaletras', cat:'Calculadoras', ico:'🔢', name:'Números a letras', desc:'Convierte cifras a texto (para cheques y facturas).'},

  // ---- Fecha y hora ----
  {id:'edad', cat:'Fecha y hora', ico:'🎂', name:'Calculadora de edad', desc:'Tu edad exacta en años, meses y días.'},
  {id:'fechas', cat:'Fecha y hora', ico:'📅', name:'Días entre fechas', desc:'Cuenta los días entre dos fechas.'},
  {id:'cuentaregresiva', cat:'Fecha y hora', ico:'⏳', name:'Cuenta regresiva', desc:'Tiempo restante hasta una fecha importante.'},

  // ---- Utilidades ----
  {id:'password', cat:'Utilidades', ico:'🔐', name:'Generador de contraseñas', desc:'Claves seguras y aleatorias en un clic.'},
  {id:'qr', cat:'Utilidades', ico:'🔳', name:'Generador de QR', desc:'Convierte texto o enlaces en código QR.'},
  {id:'moneda', cat:'Utilidades', ico:'💱', name:'Conversor de moneda', desc:'Dólar, peso, euro y más con tasas del día.'},
  {id:'unidades', cat:'Utilidades', ico:'📐', name:'Conversor de unidades', desc:'Longitud, peso, temperatura y volumen.'},
  {id:'romanos', cat:'Utilidades', ico:'🏛️', name:'Números romanos', desc:'Convierte entre romanos y arábigos.'},
];
