import { Alert, FlatList, Text, View } from "react-native";
import { styles } from "./detalhe-pedido.style";
import Produto from "../../components/produto/produto";
import api from "../../constants/api";
import { useEffect, useState } from "react";

function DetalhePedido(props) {

  const id_pedido = props.route.params.id_pedido
  const [pedido, setPedido] = useState({})

  const loadingPedido = async() => {
    try {
      
      const response = await api.get(`/pedidos/${id_pedido}`)
      
      if (response.data) {
        setPedido(response.data)
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
    
    loadingPedido()
  },[])

  return (
    <View style={styles.container}>
      
      <View style={styles.containerPedido}>
        <Text style={styles.textPedido}>Pedido: {id_pedido}</Text>
      </View>
      <FlatList
        data={pedido.itens}
        keyExtractor={(item) => item.ID_ITEM}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
         
          return <Produto
            key={item.ID_ITEM}
            foto={{uri: item.ICONE }}
            nome={item.NOME}
            qtd={item.QTD}
            obs={item.OBS}
            descricao={item.DESCRICAO}
            valor={item.VL_TOTAL}
          />
        }}
      />
      <View>
        <View style={styles.valores}>
            <Text style={styles.total}>Resumo dos valores</Text>
        </View>
        <View style={styles.valores}>
            <Text style={styles.valor}>Subtotal</Text>
            <Text style={styles.valor}>{
              new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(pedido.VL_SUBTOTAL)
              }</Text>
        </View>

        <View style={styles.valores}>
            <Text style={styles.valor}>Taxa de entrega</Text>
            <Text style={styles.valor}>{
               new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(pedido.VL_TAXA_ENTREGA)
              }</Text>
        </View>

        <View style={styles.valores}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>{
               new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(pedido.VL_SUBTOTAL + pedido.VL_TAXA_ENTREGA)
              }</Text>
        </View>
      </View>
    </View>
  );
}

export default DetalhePedido;
