# Creación de un servidor Misskey con Kubernetes/TrueNAS

Esta guía describe cómo configurar Misskey utilizando Kubernetes y HelmChart.

:::danger

¡No vuelvas a crear la base de datos con el dominio/nombre de host del servidor una vez que hayas empezado a utilizarla!

:::

## Escala TrueCharts y TrueNAS

Los HelmCharts de Misskey se publican en TrueCharts para su uso con TrueNAS Scale, pero también se pueden instalar como HelmCharts.

El sitio [TrueCharts](https://truecharts.org/charts/description_list) contiene documentación sobre todos los gráficos disponibles e instrucciones de instalación.

También puedes hacer preguntas en el servidor [Discord](https://discord.gg/Ax9ZgzKx9t) de TrueCharts si no estás seguro.

Misskey está actualmente en período de _incubación_.

:::tip{label='前提条件'}

- Escalar TrueNas
- Clústeres Kubernetes y Helm

:::

## Escalando TrueNas

Sigue las instrucciones de la [Guía TrueCharts](https://truecharts.org/manual/guides/Adding-TrueCharts/).

Añade la rama _incubadora_ e instala Misskey.

Asegúrate de cambiar el campo URL en la configuración.

TrueCharts utiliza Traefik por defecto para exponer sus servicios al mundo exterior a través de Https, pero se puede utilizar otro software haciéndolo manualmente.

## Configuración Manual con Helm

Si no estás utilizando TrueNAS Scale, puede utilizar Helm para instalar Misskey.

Asegúrate de reemplazar la `url:` en `misskey:` en values.yaml.

Las demás áreas deben reescribirse según sea necesario.

Este gráfico no soporta actualmente TLS dentro del contenedor Misskey. Para asegurar el acceso al servidor, se recomienda el uso de un proxy inverso.

```
helm repo add TrueCharts https://charts.truecharts.org
helm repo update
helm install misskey TrueCharts/misskey
```

## Actualizaciones de Misskey

Para actualizar Misskey, utiliza la funcionalidad de actualización integrada de TrueNAS Scale o, si estás ejecutando kubernetes manualmente, utiliza [helm repo update](https://helm.sh/docs/helm/helm_ repo_update/) o [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/).

Se recomienda encarecidamente hacer una copia de seguridad de los datos antes de actualizar, en vista de los posibles problemas.
