# 📱 React Native Users App – Prueba Técnica

Este proyecto es una aplicación móvil construida con **React Native**, desarrollada como parte de una **prueba técnica**. La app consume datos de la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) y permite visualizar una lista de usuarios y sus detalles.

## 📂 Estructura del Proyecto

El repositorio está dividido en **dos carpetas principales**:

1. **`pruebatecnica/`**  
   - Usa **React 19** y **Expo SDK 53**
   - Contiene el código principal de la aplicación
   - Compatible con **Expo Go**

2. **`pruebatecnicatest/`**  
   - Usa **React 18** y **Expo SDK 52**
   - Se creó exclusivamente para ejecutar **pruebas unitarias** con `jest-expo`, ya que actualmente solo es compatible con versiones anteriores de React Native

Esta separación fue una **decisión técnica clave** para garantizar compatibilidad total con el ecosistema de testing en React Native.

## 🚀 Tecnologías Utilizadas

- **React Native 0.74**
- **Expo SDK 53 / 52**
- **React 19 / 18**
- **TypeScript**
- **Zustand** – estado global simple y eficiente
- **React Navigation** – navegación entre pantallas
- **Axios** – consumo de APIs
- **Styled-components** – estilos CSS-in-JS
- **Jest** + **React Native Testing Library** – pruebas unitarias

## 📦 Instalación rápida

Requiere **Node.js**, **Expo CLI v6+** y dependencias estándar de React Native.

```bash
cd pruebatecnica
npm install
npx expo start
```

Para ejecutar pruebas unitarias:

```bash
cd pruebatecnicatest
npm install
npm test
```

## 🗂️ Estructura de Carpetas (pruebatecnica)

```
pruebatecnica/
├── src/
│   ├── api/             # Configuración de Axios
│   ├── components/      # Componentes reutilizables
│   ├── store/           # Zustand store
│   ├── screens/         # Pantallas (Home, Details, etc.)
│   ├── navigation/      # Stack y navegación
│   └── types/           # Tipos globales TypeScript
├── App.tsx              # Punto de entrada
└── package.json
```

## ✅ Funcionalidades

- Carga de usuarios desde una API pública
- Visualización de detalles individuales
- Navegación fluida entre pantallas
- Manejo de errores y estados de carga
- Pruebas unitarias básicas

## 🧪 Pruebas

```bash
cd pruebatecnicatest
npm test
```

El entorno de pruebas se configuró en una carpeta separada para asegurar compatibilidad con `jest-expo` y versiones compatibles de React Native.

## 📌 Enfoque y Decisiones Técnicas

- 🧠 **Zustand** fue elegido por su simplicidad y bajo overhead para manejar estado global sin boilerplate.
- 📱 Se utilizó **Expo SDK 53 y React 19** para compatibilidad con **Expo Go**.
- 🔬 El entorno de pruebas usa **React 18 y SDK 52** para evitar conflictos con `jest-expo`.
- 🧭 Navegación con `@react-navigation/native-stack` para manejo eficiente de rutas.
- 🧱 Arquitectura desacoplada para facilitar mantenimiento, escalabilidad y buenas prácticas.

## 📝 Licencia

MIT

⚙️ Consideraciones técnicas y retos enfrentados

Durante el desarrollo de esta prueba técnica se presentaron varios retos importantes que llevaron a tomar decisiones clave en cuanto a estructura, versiones y herramientas:

1. ✅ Compatibilidad con Expo Go
	•	El proyecto original utilizaba React 18 y Expo SDK 52, lo cual resultaba incompatible con Expo Go, ya que esta app solo soporta versiones activas del SDK (en este caso, SDK 53).
	•	Se decidió migrar el proyecto a Expo SDK 53 y actualizar a React 19 para asegurar compatibilidad total con Expo Go y mantener la app usable en dispositivos físicos sin necesidad de un build personalizado.

2. 🔀 Separación del entorno de pruebas
	•	Para mantener pruebas unitarias usando React 18 y SDK 52, se manejaron dos entornos en carpetas separadas:
	•	Una carpeta principal (react-native-users) actualizada para producción y pruebas en dispositivos.
	•	Otra carpeta secundaria (react-native-users-test) con versiones estables compatibles con Jest y Testing Library.
	•	Esta separación permitió desarrollar con lo último de Expo, sin perder la capacidad de ejecutar pruebas automáticas.

3. 🧶 Manejo de errores al instalar dependencias
	•	Se presentaron errores relacionados con expo-status-bar y metro, generados por conflictos de dependencias y uso de versiones obsoletas del expo-cli.
	•	Se resolvieron:
	•	Migrando al nuevo expo-cli moderno (6.3.10 o superior).
	•	Alineando las versiones de todas las dependencias al SDK 53 oficialmente soportado.

4. 🔍 Debugging profundo
	•	El error persistente Cannot find module 'metro/src/ModuleGraph/worker/importLocationsPlugin' fue solucionado reinstalando el proyecto desde cero.
	•	Se confirmó que muchos de estos errores eran causados por:
	•	Uso de expo-cli antiguo.
	•	Instalaciones previas corruptas (node_modules o package-lock.json).
	•	Dependencias con versiones no compatibles en package.json.

5. 📁 Decisiones de arquitectura
	•	Se optó por mantener una estructura modular por carpetas: api, screens, components, store, navigation, etc., para facilitar pruebas, reutilización y escalabilidad.
	•	Se seleccionó Zustand como gestor de estado por su simplicidad y bajo acoplamiento, ideal para apps pequeñas a medianas