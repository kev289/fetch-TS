# Ejercicio: The Universal Data Fetcher

> **Objetivo:** Construir un sistema genérico en TypeScript para consumir cualquier API REST de forma reutilizable y segura.

---

## Contexto

Vas a consumir una API pública. Puedes elegir una de estas:

- **JSONPlaceholder** → `https://jsonplaceholder.typicode.com`
- **Rick & Morty API** → `https://rickandmortyapi.com/api`

---

## Parte 1 — La Interfaz `ApiResponse<T>`

Crea una interfaz genérica que represente **cualquier respuesta** que pueda devolver tu sistema.

**Debe contener:**
- El dato que esperas recibir (puede no existir)
- El código de estado HTTP
- Un posible mensaje de error

```ts
// Pista: usa genéricos (<T>) para que sirva con cualquier tipo de dato
interface ApiResponse<T> {
  // ¿Qué campos necesitas aquí?
}
```

> Recuerda que `data` puede ser `null` si algo falla, y `error` puede ser `null` si todo va bien.

---

## Parte 2 — La Función `fetchData<T>`

Crea una función genérica que reciba una URL y devuelva tu interfaz anterior.

**Requisitos:**
- Usa `fetch` nativo
- Envuelve todo en `try/catch`
- Valida si `response.ok` es `true` antes de parsear el JSON
- Si `response.ok` es `false`, devuelve el error con el `status` correspondiente

```ts
async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  // Tu implementación aquí
}
```

**Preguntas guía:**
- ¿Qué pasa si el servidor responde con un `404`? ¿`response.ok` es `true` o `false`?
- ¿Qué diferencia hay entre un error de red y un error HTTP?

---

## Parte 3 — La Clase `ApiService<T>` (Reto)

Esta es la parte de investigación. Crea una clase genérica que encapsule la lógica de acceso a un recurso específico de la API.

**Debe:**
1. Recibir el endpoint base en el **constructor**
2. Tener un método `getAll()` que traiga todos los registros
3. Tener un método `getOne(id)` que traiga un solo registro por ID

```ts
class ApiService<T> {
  // ¿Cómo defines el constructor para recibir el endpoint?

  async getAll(): Promise<ApiResponse<T[]>> {
    // Usa tu función fetchData aquí
  }

  async getOne(id: number): Promise<ApiResponse<T>> {
    // ¿Cómo construyes la URL con el id?
  }
}
```

**Preguntas guía:**
- ¿Cómo concatenas el `id` al `endpoint` base?
- ¿Puedes reutilizar `fetchData` dentro de la clase?

---

## Parte 4 — Ponlo a prueba

Define al menos **dos tipos** de datos (puedes inventarlos o tomarlos de la API elegida) y crea instancias de `ApiService` para cada uno.

```ts
// Ejemplo de estructura (no es la respuesta, solo la forma)
type Usuario = {
  id: number;
  name: string;
  // ...
};

// Crea el servicio y llama a sus métodos
const usuarioService = new ApiService<Usuario>('...');
```

**¿Qué debes verificar?**
- Que `getAll()` retorna un arreglo de datos
- Que `getOne(1)` retorna un solo objeto
- Que si usas un ID inválido (ej: `99999`), el error se maneja correctamente

---

## Links útiles

- [JSONPlaceholder Docs](https://jsonplaceholder.typicode.com/)
- [Rick & Morty API Docs](https://rickandmortyapi.com/documentation)
- [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [MDN — Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN — Response.ok](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)
