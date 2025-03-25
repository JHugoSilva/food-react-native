import { Alert, FlatList, Image, Text, View } from "react-native";
import icons from "../../constants/icons";
import { styles } from "./aba-pedidos.style";
import Pedido from "../../components/pedido/pedido";
import { useLinkProps } from "@react-navigation/native";
import { useEffect, useState } from "react";
import api from "../../constants/api";

function AbaPedidos(props){

    const [pedidos, setPedidos] = useState([])

    function detalhePedido(id){
        props.navigation.navigate('detalhe-pedido',{
            id_pedido:id
        })
    }

    const loadPedidos = async () => {
        try {
            
            const response = await api.get('/pedidos')

            if (response.data) {
                setPedidos(response.data)
            }

        } catch (error) {
            if (error.response?.data.error) {
                Alert.alert(error.response?.data.error)
            } else {
                Alert.alert("Ocorreu um erro. Tente novamente mais tarde.")
            }
        }
    }

    useEffect(()=>{
        loadPedidos()
    },[pedidos])
    return <View style={styles.container}>
       <FlatList
       data={pedidos}
       keyExtractor={(pedido) => pedido.ID_PEDIDO}
       showsVerticalScrollIndicator={false}
       renderItem={({item})=>{
        return <Pedido
            key={item.ID_PEDIDO}
            nome={item.NOME}
            preco={item.VL_TOTAL}
            status={item.descricao_status}
            data_entrega={item.DT_PEDIDO}
            logotipo={item.ICONE}
            id_pedido={item.ID_PEDIDO}
            obs={item.obs}
            color={item.cor}
            onClickPedido = {detalhePedido}
        />
       }}

       contentContainerStyle ={ styles.containerList }

       ListEmptyComponent={ () => {
        return <View style={styles.empty}>
            <Image source={icons.empty}/>
            <Text style={styles.emptyText}>Nenhum nenhum encontrado.</Text>
        </View>
       }}
       />
    </View>
}

export default AbaPedidos