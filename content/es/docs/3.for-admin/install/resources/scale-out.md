# Escalando Misskey

A medida que aumenta el número de usuarios, se hace necesario mejorar las especificaciones del servidor o aumentar el número de servidores para gestionar la carga.Este artículo presenta consejos sobre cómo escalar tu servidor o instancia de Misskey.

## Replicación PostgreSQL

La replicación PostgreSQL le permite distribuir la carga de la base de datos entre varios servidores
Para más información sobre la replicación, consulta la documentación de PostgreSQL.
Misskey soporta replicación PostgreSQL y puede ser configurado en el archivo de configuración como se indica a continuación.(Extracto)

```yml
# Establece a true if replication is used
dbReplications: true

# Configura todos los esclavos (slaves) para replicar la BD
dbSlaves:
  -
    host: foo 
    port: 5432
    db: misskey
    user: xxxxx
    pass: xxxxx
  -
    host: bar
    port: 5432
    db: misskey
    user: xxxxx
    pass: xxxxx
```

Con esta configuración, cuando Misskey emita una consulta de lectura a la base de datos, seleccionará aleatoriamente réplicas de la base de datos de los `dbSlaves` configurados y enviará la consulta a uno de ellos, distribuyendo así la carga de la base de datos.

## Partición de Redis basada en roles

Misskey utiliza Redis para una variedad de propósitos, incluyendo:

- Gestión de colas de trabajos
- Gestión de límites de peticiones
- Caché
- Almacenamiento de notificaciones y otra información
- Publicación y suscripción de los eventos globales

Misskey puede ser configurado para usar un servidor Redis diferente para cada uno de estos usos, permitiendo que la carga sea distribuida a través de múltiples  servidores.
Configura lo siguiente en el archivo de configuración.(Extracto)

```yml
redisForPubsub:
  host: foo
  port: 6379
  #family: 0  # 0=Both, 4=IPv4, 6=IPv6
  #pass: example-pass
  #prefix: example-prefix
  #db: 1

redisForJobQueue:
  host: bar
  port: 6379
  #family: 0  # 0=Both, 4=IPv4, 6=IPv6
  #pass: example-pass
  #prefix: example-prefix
  #db: 1
```

Actualmente, además de la configuración principal de Redis, también puedes configurar Redis para "Pub/Sub para Eventos Globales" y "Gestión de Colas de Trabajos" como se ha descrito anteriormente.

## Deshabilitar gráficos remotos

Si no necesitas gráficos como los de actividad para usuarios remotos individuales o gráficos para servidores remotos individuales, desactivar su generación mejorará el rendimiento.
Para ello, desactiva las opciones "Generar gráficos de usuarios remotos" y "Generar gráficos de servidores remotos" en el panel de control.
