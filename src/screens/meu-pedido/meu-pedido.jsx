import { Alert, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./meu-pedido.style";
import Produto from "../../components/produto/produto";
import Button from "../../components/button/button";
import { useEffect, useState,useContext } from "react";
import { CartContext } from "../../context/cart";
import { useNavigation } from "@react-navigation/native";
import api from "../../constants/api";

//TELA CHECKOUT
function DetalhePedido(props) {

  const nav = useNavigation()
  const { itens, setItens, entrega, empresa, subTotal, total, calculaValores } = useContext(CartContext)

  function onClickDelete(id_item) {
    const itensNovo = itens.filter((item) => {
      return item.id_item != id_item
    })
    setItens(itensNovo)
  }

  const clickLimpar = () => {
    setItens([])
    props.navigation.goBack()
  }

  const enviarPedido = async () => {
    try {

      const pedido = {
        id_empresa: empresa,
        vl_subtotal: subTotal,
        vl_taxa_entrega: entrega,
        vl_total: total,
        itens: itens
      }

      const response = await api.post('/pedidos', pedido)

      if (response.data) {
        clickLimpar()
      }
      
    } catch (error) {
      if (error.response?.data.error) {
        Alert.alert(error.response?.data.error)
      } else {
        Alert.alert('Ocorreu um erro. Tente novamente mais tarde')
      }
    }
  }

  useEffect(()=>{
    calculaValores()
    nav.setOptions({
      headerRight: () => {
        return <TouchableOpacity onPress={clickLimpar}>
            <Text style={styles.btnLimpar}>Limpar</Text>
        </TouchableOpacity>
    }
    })
  },[])

  return (
    <View style={styles.container}>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id_item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Produto
              key={item.id_item}
              id_produto={item.ID_PRODUTO}
              foto={{ uri: item.foto }}
              nome={item.nome}
              descricao={item.descricao}
              obs={item.observacao}
              valor={item.vl_total}
              id_item={item.id_item}
              qtd={item.qtd}
              onClickDelete={onClickDelete}
            />
          );
        }}
      />
      <View>
        <View style={styles.valores}>
          <Text style={styles.total}>Resumo dos valores</Text>
        </View>
        <View style={styles.valores}>
          <Text style={styles.valor}>Subtotal</Text>
          <Text style={styles.valor}>{
            new Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL'}).format(subTotal)
            }</Text>
        </View>

        <View style={styles.valores}>
          <Text style={styles.valor}>Taxa de entrega</Text>
          <Text style={styles.valor}>{
            new Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL'}).format(entrega)
            }</Text>
        </View>

        <View style={styles.valores}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>{
            new Intl.NumberFormat('pt-BR', { style:'currency', currency:'BRL'}).format(total)
            }</Text>
        </View>
      </View>
      <View style={styles.containerBtn}>
        <Button text="Finalizar Pedido" onPress={enviarPedido}/>
      </View>
    </View>
  );
}

export default DetalhePedido;
