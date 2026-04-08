// contrato de la peticion
interface ApiResponse<T> {
    data:T | null;  //esto es el cuerpo del body en caso tal de que salga bien
    error:string | null; //error en caso tal de que salga mal
    status:number;  //codigo http [200, 400, 401, 500]
}

// primera funcion que espera una respuesta generica con manejo de errores
async function apiRequest<T>(url:string): Promise<ApiResponse<T>>{
    // intenta hacer la peticion
    try {
        const res = await fetch(url);

        if (!res.ok) {
            return {
                data:null,
                error: `Error a la hora de hacer la peticion: ${res.statusText}`,
                status: res.status
            }
        }

        const body: unknown = await res.json();

        if (body === null || body === undefined) {
            return{
                data:null,
                error: "Error en la petición",
                status: res.status
            };
        }

        return {
            data:body as T,
            error:null,
            status:res.status
        }
    } catch (error) {
        //se nos cayo el internet
        return{
            data:null,
            error:"fallo la conexion total, compre internet",
            status: 500
        };
    }
}

// url base
const baseUrl = "https://rickandmortyapi.com/api" 

// clase generica
// la clase recibe un dato que se definira despues
class ApiService<T> {
    // constructor que recibe el endpoint
    constructor(private endpoint: string) {}

    // metodo que obtiene todos los datos
    async getAll(): Promise<ApiResponse<T[]>> { 
        return apiRequest<T[]>(this.endpoint);
    }

    // metodo que obtiene un dato por id
    async getOne(id: number | string): Promise<ApiResponse<T>> { 
        return apiRequest<T>(`${this.endpoint}/${id}`);
    }
}

//interfaces
interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
}

interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
}

//instancias
const characterService = new ApiService<Character>(`${baseUrl}/character`);

// es como definir al codigo en donde va a buscar la informacion y que tipo de informacion va a recibir
const locationService = new ApiService<Location>(`${baseUrl}/location`);



// Pruebas

// obtener todos los personajes
characterService.getAll().then(response => {
    console.log("Recibimos los personajes", response.status);
});

// obtener un personaje por id
characterService.getOne(1).then(response => {
    console.log("Personaje 1:", response.data?.name);
});

// lo mismo pero obtiene del id 2
characterService.getOne(2).then(response =>{
    console.log("Personaje 2", response.data?.name)
});

// obtener un personaje que no existe para probar el try catch
characterService.getOne(10000000000000).then(response =>{
    console.log("random", response.data?.name)
    console.log("Status:", response.status);
    console.log("Mensaje:", response.error); 
});

// obtener una ubicacion por id
locationService.getOne(3).then(response => {
    console.log("ubicacion 3:", response.data?.name);
    console.log("tipo:", response.data?.type);
})


