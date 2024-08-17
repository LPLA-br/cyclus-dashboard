import { manager } from "./BLEInstanciaServico";
import { useEffect } from "react";
import escanearConectar from "./escanearConectar";

/** Verificação de atividade
*  do bluetooth do dispositivo
*  móvel.
*  Requer uma callback que inicie
*  a conexão e leia os dados e
*  um setter de um useState()
*  para emitir os dados recebidos.
* */
function verificarDisponibilidadeBluetooth( iniciadorConexao: ( setterResposta: Function ) => void, setterResposta: Function  )
{

  useEffect(() =>
  {
    const subscription = manager.onStateChange(state => 
    {
      if (state === 'PoweredOn')
      {
        escanearConectar( setterResposta );
        subscription.remove();
      }
    }, true);

  return () => subscription.remove();
  }, [manager]);


  return;
}

export default verificarDisponibilidadeBluetooth;
