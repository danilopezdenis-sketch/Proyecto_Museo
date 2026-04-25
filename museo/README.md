Museo



Aplicación web full-stack para la gestión de un museo: obras, artistas, salas, exposiciones e historial de eventos.

**URL de la aplicación:** [https://proyecto-museo-5fsr-j39rakv6c-danilopezdenis-2392s-projects.vercel.app/](https://proyecto-museo-5fsr-j39rakv6c-danilopezdenis-2392s-projects.vercel.app/)

## 

###### **Descripción de la aplicación**

El sistema permite gestionar la colección completa de un museo. Desde el panel principal se puede consultar el estado general de las obras, ver alertas de piezas en restauración o prestadas, y acceder al historial de eventos recientes.

Las funcionalidades principales son:

* **Gestión de obras**: inventario completo con estado, técnica, dimensiones, sala asignada y exposición. Incluye imagen de cada pieza.
* **Gestión de artistas**: ficha completa con biografía y listado de todas sus obras en la colección.
* **Historial de eventos**: registro flexible en MongoDB de restauraciones, préstamos, traslados e inspecciones de cada obra, con metadatos variables según el tipo de evento.
* **Configuración**: gestión de salas y exposiciones del museo.
* **Dashboard**: panel de control con contadores, alertas activas y últimos eventos registrados.

###### &#x20;

###### 

###### **Diagrama ER** 


<img width="867" height="435" alt="image" src="https://github.com/user-attachments/assets/eb45c9fb-f89a-4d5f-9313-ffa683137877" />


 

###### **Relaciones**

* `obras.id\\\_artista` -> `artistas.id` (N:1) - una obra tiene un artista, un artista puede tener muchas obras
* `obras.id\\\_sala` -> `salas.id` (N:1) - una obra está en una sala, una sala alberga muchas obras
* `obras.id\\\_exposicion` -> `exposiciones.id` (N:1) - una obra puede pertenecer a una exposición









###### **Capturas de las bases de datos**



**MySQL --- artistas**

<img width="656" height="280" alt="image" src="https://github.com/user-attachments/assets/b2d7483b-7987-4b58-b25a-faa6463b484f" />


**MySQL --- salas**

<img width="798" height="253" alt="image" src="https://github.com/user-attachments/assets/a64e3132-3bd6-4a80-b7fb-5f284982c3a3" />


**MySQL --- exposiciones**

<img width="807" height="252" alt="image" src="https://github.com/user-attachments/assets/87fc1c16-ffed-442c-9c58-1106d8018cd0" />


**MySQL --- Obras**

<img width="1125" height="457" alt="image" src="https://github.com/user-attachments/assets/bacaae79-4942-4595-a99c-2e21fdc1fc89" />



**MongoDB --- eventos**
<img width="1219" height="224" alt="image" src="https://github.com/user-attachments/assets/4ad5b5a6-7171-4811-bc10-2b510d536909" />





###### 

###### 

###### 

###### 

###### 



###### **Listado de rutas**



|Ruta|Método|Descripción|
|-|-|-|
|`/`|GET|Dashboard — contadores, alertas y últimos eventos|
|`/obras`|GET|Listado de obras con buscador y 4 filtros combinados|
|`/obras/\\\[id]`|GET|Ficha completa de una obra con su historial de eventos|
|`/obras/nueva`|GET/POST|Formulario de alta de nueva obra|
|`/obras/editar/\\\[id]`|GET/POST|Formulario de edición de obra con datos precargados|
|`/artistas`|GET|Listado de artistas con buscador|
|`/artistas/\\\[id]`|GET|Ficha del artista con todas sus obras en la colección|
|`/artistas/nuevo`|GET/POST|Formulario de alta de nuevo artista|
|`/artistas/editar/\\\[id]`|GET/POST|Formulario de edición de artista|
|`/historial`|GET|Log de eventos MongoDB con filtro por tipo|
|`/historial/nuevo`|GET/POST|Formulario para registrar nuevo evento|
|`/configuracion/salas`|GET/POST|CRUD de salas del museo|
|`/configuracion/exposiciones`|GET/POST|CRUD de exposiciones|
|`/api/obras`|GET, POST|API REST — listado y creación de obras|
|`/api/obras/\\\[id]`|GET, PUT, DELETE|API REST — lectura, edición y borrado de obra|
|`/api/artistas`|GET, POST|API REST — listado y creación de artistas|
|`/api/artistas/\\\[id]`|GET, PUT, DELETE|API REST — lectura, edición y borrado de artista|
|`/api/historial`|GET, POST|API REST — listado y creación de eventos|
|`/api/historial/\\\[id]`|PUT, DELETE|API REST — edición y borrado de evento|







###### Filtros implementados

En el listado de obras (`/obras`) se pueden combinar simultáneamente:

1. **Buscador** por título o nombre de artista
2. **Estado** — Expuesta / En Depósito / En Restauración / Prestada
3. **Sala** — filtro por sala del museo
4. **Artista** — filtro por autor
5. **Exposición** — filtro por exposición activa o pasada





## 



## 

## 

