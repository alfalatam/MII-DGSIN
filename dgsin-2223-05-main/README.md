

# DGSIN-2223-05

## Equipo
- Alfonso Alarcón Tamayo


## Descripción del proyecto
Este proyecto tiene como objetivo recabar información de una base de datos de campeones del videojuego League of Legends. La idea es poder gestionar los campeones del juego, y poder acceder a estadísticas de estos,también lo he relacionado con otras APIs externas para obtener información personalizada y ayudar a nuevos jugadores a decirirse a usar un campeón nuevo.

## Repositorio
El repositorio de este proyecto se encuentra en: [https://github.com/mii-dgsin/dgsin-2223-05](https://github.com/mii-dgsin/dgsin-2223-05)

## URL del proyecto
El proyecto está desplegado en la siguiente URL: [https://dgsin-2223-05.ew.r.appspot.com/](https://dgsin-2223-05.ew.r.appspot.com/)

## APIs
- API Estadísticas campeones del league of legends (https://dgsin-2223-05.ew.r.appspot.com/api/v1/champs): Esta API contiene todas las llamadas al backend generado por Alfonso Alarcón Tamayo.



Alfonso Alarcón Tamayo - Ejemplo fuente de datos

-Datos: league-of-legends-stats-s13
-Fuente de información: [league-of-legends-stats-s13](https://www.kaggle.com/datasets/vivovinco/league-of-legends-stats-s13).

- Ejemplo de la Fuente de Datos:


| Name    | Class | Role | Tier | Score | Trend | WinP  | RoleP | PickP | BanP  |
|---------|-------|------|------|-------|-------|-------|-------|-------|-------|
| Elise | Mage  | MID  | S    | 9.21  | 0.5   | 63.22 | 88.04 | 12.60  | 12.50  |


## Integraciones:
-API externa: https://ddragon.leagueoflegends.com/cdn/13.12.1/data/en_US/champion.json

-API externa via proxy:https://api.pandascore.co/lol/items?token=1kh6pyhk3I2w4ulvwCHu3Bnvi7XvmztWQXflj8Ipr53rTG9yUrM

## Especificaciones de las integraciones:

Para la integración con la API Externa se ha usado la librería request. Con ella accedo a la información de la base de datos de campeones
y más concretamente a la información de sus estadisticas, que luego utilizare para mostrar en un grafico el numero de campeones en cada
dificultad.

Para la API del proxy hago una petición y obtengo un listado de los hechizos disponibles en el juego y  muestro el valor de este con el icono correspondiente del hechizo

## Acceso a los tests de Postman: Link a los tests

[https://documenter.getpostman.com/view/27553404/2s946eAYw4](https://documenter.getpostman.com/view/27553404/2s946eAYw4).