import { Text, View } from "react-native";
import { Stack } from "expo-router";

import { useEffect, useState } from "react";
import { manager } from "@/hooks/bluetooth/BLEInstanciaServico";

import requisitarPermissaoBluetooth from "@/hooks/bluetooth/requisitarPermissaoBluetooth";
import verificarDisponibilidadeBluetooth from "@/hooks/bluetooth/verificarDisponibilidadeBluetooth";
import escanearConectar from "@/hooks/bluetooth/escanearConectar";

export default function Bluetooth()
{
  const [ dados, setDados ] = useState<string>("nada");

  useEffect( ()=>
  {

    requisitarPermissaoBluetooth()
    .then( ( permBLE: boolean )=>
    {
      verificarDisponibilidadeBluetooth( escanearConectar, setDados );
    })
    .catch( (reason) =>
    {
      if ( typeof reason == "string" )
      {
        console.log( "solicitação falhou, Detalhes: ", reason );
      }
      else
      {
        console.log( "solicitação de permissão não funcionou." );
      }
    });
    
  }, [manager] );

  return (
    <View>
      <Stack.Screen options={{title:"CONIUNGERE"}} />
      <Text>
        { dados }
      </Text>
    </View>
  );
}

