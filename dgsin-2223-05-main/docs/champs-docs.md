# Champs API Usage

Esto es un documento explicando el funcionamiento de las llamadas de mi API.


# Recurso base 

.../api/v1/champs

## Ejemplo de un dato:

```console
{ "Name": "Akali", "Class": "Assassin", "Role": "TOP", "Tier": "C", "Score": 39.63, "Trend": -1.51, "WinP": 45.92, "RoleP": 23.5, "PickP": 2.55, "BanP": 13.02, "KDA": 1.28 }
 ```

## Acceder a todos los campeones:


GET .../api/v1/champs

```console
[ { "Name": "Aatrox", "Class": "Fighter", "Role": "TOP", "Tier": "S", "Score": 58.73, "Trend": -31.86, "WinP": 47.68, "RoleP": 91.63, "PickP": 6.62, "BanP": 11.98, "KDA": 1.86 }, { "Name": "Ahri", "Class": "Mage", "Role": "MID", "Tier": "S", "Score": 57.18, "Trend": 4.55, "WinP": 49.5, "RoleP": 94.65, "PickP": 5.81, "BanP": 1.73, "KDA": 2.35 }, { "Name": "Akali", "Class": "Assassin", "Role": "MID", "Tier": "S", "Score": 65.49, "Trend": 4.33, "WinP": 48.41, "RoleP": 75.74, "PickP": 8.11, "BanP": 13.02, "KDA": 2.63 }, { "Name": "Akali", "Class": "Assassin", "Role": "TOP", "Tier": "C", "Score": 39.63, "Trend": -1.51, "WinP": 45.92, "RoleP": 23.5, "PickP": 2.55, "BanP": 13.02, "KDA": 1.28 }, { "Name": "Akshan", "Class": "Marksman", "Role": "MID", "Tier": "A", "Score": 49.39, "Trend": 0.34, "WinP": 51.62, "RoleP": 66.03, "PickP": 2.75, "BanP": 3.79, "KDA": 2.12 }, { "Name": "Caitlyn", "Class": "Marksman", "Role": "ADC", "Tier": "S", "Score": 58.92, "Trend": 0.73, "WinP": 51.92, "RoleP": 33.11, "PickP": 14.56, "BanP": 4.87, "KDA": 3.02 }, { "Name": "Braum", "Class": "Support", "Role": "SUPPORT", "Tier": "A", "Score": 51.37, "Trend": -0.21, "WinP": 50.57, "RoleP": 13.82, "PickP": 6.41, "BanP": 1.98, "KDA": 2.99 }, { "Name": "Olaf", "Class": "Fighter", "Role": "JUNGLE", "Tier": "S", "Score": 59.73, "Trend": -1.91, "WinP": 52.15, "RoleP": 14.64, "PickP": 7.95, "BanP": 10.23, "KDA": 2.81 }, { "Name": "Thresh", "Class": "Support", "Role": "SUPPORT", "Tier": "S", "Score": 60.15, "Trend": 2.43, "WinP": 51.87, "RoleP": 19.93, "PickP": 7.14, "BanP": 3.77, "KDA": 2.95 }, { "Name": "Lulu", "Class": "Support", "Role": "SUPPORT", "Tier": "A", "Score": 52.68, "Trend": -0.93, "WinP": 50.59, "RoleP": 20.02, "PickP": 4.98, "BanP": 2.36, "KDA": 3.08 }, { "Name": "Pyke", "Class": "Fighter", "Role": "JUNGLE", "Tier": "S", "Score": 63.12, "Trend": 2.05, "WinP": 50.92, "RoleP": 34.88, "PickP": 17.26, "BanP": 8.67, "KDA": 2.97 }, { "Name": "Jinx", "Class": "Marksman", "Role": "ADC", "Tier": "S", "Score": 58.73, "Trend": 0.91, "WinP": 51.29, "RoleP": 28.45, "PickP": 11.76, "BanP": 5.12, "KDA": 3.25 } ]

 ```

 Respuesta: 200 OK


## Acceder a un campeón en concreto en todos sus roles:


GET .../api/v1/champs/Akali

```console

[ { "Name": "Akali", "Class": "Assassin", "Role": "MID", "Tier": "S", "Score": 65.49, "Trend": 4.33, "WinP": 48.41, "RoleP": 75.74, "PickP": 8.11, "BanP": 13.02, "KDA": 2.63 }, { "Name": "Akali", "Class": "Assassin", "Role": "TOP", "Tier": "C", "Score": 39.63, "Trend": -1.51, "WinP": 45.92, "RoleP": 23.5, "PickP": 2.55, "BanP": 13.02, "KDA": 1.28 } ]
 ```
Respuesta: 200 OK

## Acceder aun campeón en concreto en un rol en concreto:


GET .../api/v1/champs/Akali/Top

```console
{ "Name": "Akali", "Class": "Assassin", "Role": "TOP", "Tier": "C", "Score": 39.63, "Trend": -1.51, "WinP": 45.92, "RoleP": 23.5, "PickP": 2.55, "BanP": 13.02, "KDA": 1.28 }
 ```

Respuesta: 200 OK

## Crear un campeon nuevo:


POST .../api/v1/champs

```console
{ "Name": "Yuumi", "Class": "support", "Role": "MID", "Tier": "S", "Score": 65.49, "Trend": 14.33, "WinP": 58.41, "RoleP": 75.74, "PickP": 8.11, "BanP": 13.02, "KDA": 2.63 }
 ```

Respuesta: 201 Created
 
## Crear un campeon nuevo en un rol ya existente:

POST .../api/v1/champs

```console
{ "Name": "Akali", "Class": "Assasin", "Role": "MID", "Tier": "S", "Score": 65.49, "Trend": 14.33, "WinP": 58.41, "RoleP": 75.74, "PickP": 8.11, "BanP": 13.02, "KDA": 2.63 }
 ```
Respuesta: 409 Conflict


## Actualizar un campeón con conflicto de datos


PUT .../api/v1/champs/:Akali/:Mid

```console
{ "Name": "Akali", "Class": "Assassin", "Role": "MID", "Tier": "S", "Score": 99.99, "Trend": 4.33, "WinP": 48.41, "RoleP": 75.74, "PickP": 8.11, "BanP": 113.02, "KDA": 2.63 }
 ```
Respuesta: 422 Unprocessable Entity



## Actualizar un campeón no existente :


PUT .../api/v1/champs/:Nunu/:Mid

```console
{ "Name": "Nunu", "Class": "Tank", "Role": "MID", "Tier": "S", "Score": 99.99, "Trend": 4.33, "WinP": 48.41, "RoleP": 75.74, "PickP": 8.11, "BanP": 13.02, "KDA": 2.63 }
 ```
Respuesta: 404 Not Found

## Actualizar un campeón en una posición existente:


PUT .../api/v1/champs/:name/:role

```console
{ "Name": "Akali", "Class": "Assassin", "Role": "MID", "Tier": "S", "Score": 99.99, "Trend": 4.33, "WinP": 48.41, "RoleP": 75.74, "PickP": 8.11, "BanP": 13.02, "KDA": 2.63 }
 ```
Respuesta: 200 OK


## Eliminar un campeón en una posición existente:


DELETE .../api/v1/champs/:Akali/:Top

```console

 ```
Respuesta: 204 No Content

## Eliminar todos los campeones:


DELETE .../api/v1/champs/

```console

 ```
Respuesta: 204 No Content

