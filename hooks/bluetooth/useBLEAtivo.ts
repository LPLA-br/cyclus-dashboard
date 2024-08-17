import { manager } from "./BLEInstanciaServico";
import { useEffect } from "react";
import escanearConectar from "./escanearConectar";

/* Verificação de atividade
*  do bluetooth do dispositivo
*  móvel. Depende de escanearConectar()
* */
function useBLEAtivo()
{

  useEffect(() =>
  {
    const subscription = manager.onStateChange(state => 
    {
      if (state === 'PoweredOn')
      {
        escanearConectar();
        subscription.remove();
      }
    }, true);

  return () => subscription.remove();
  }, [manager]);

  return;
}

export default useBLEAtivo;
