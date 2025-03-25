import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./detalhe-produto.style";
import icons from "../../constants/icons";
import Button from "../../components/button/button";
import api from "../../constants/api";
import { useContext, useEffect, useState } from "react";

import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { CartContext } from "../../context/cart";

function DetalheProduto(props) {

  const id_empresa = props.route.params.id_empresa
  const vl_taxa_entrega = props.route.params.vl_taxa_entrega
  const id_produto = props.route.params.id_produto

  const [produto, setProduto ] = useState({})
  const [qtd, setQtd ] = useState(1)
  const [observacao, setObservacao ] = useState("")

  const { addItem, setEmpresa, setEntrega } = useContext(CartContext)

  const alterarQtd = (valor) => {
    if (qtd + valor < 1) return
     setQtd(qtd + valor)
  }

  const addProductCart = () => {
    const item = {
      id_item: uuidv4(),
      id_produto: id_produto,
      foto: produto.ICONE,
      nome: produto.NOME,
      descricao: produto.DESCRICAO,
      obs: observacao,
      qtd: qtd,
      vl_unitario: produto.VL_PRODUTO,
      vl_total: qtd * produto.VL_PRODUTO
    }

    setEmpresa(id_empresa)
    setEntrega(vl_taxa_entrega)
    addItem(item)

    props.navigation.goBack()
    
  }

  const loadProduto = async (id_empresa, id_produto) => {
    try {
      
      const response = await api.get(`/empresas/${id_empresa}/produtos/${id_produto}`)

      if (response.data) {
        setProduto(response.data)
      }

    } catch (error) {
      if (error.response?.data.error) {
        Alert.alert(error.response?.data.error)
      } else {
        Alert.alert('Ocorreu um erro. Tente novamente mais tarde.')
      }
    }
  }

  useEffect(()=>{
    loadProduto(id_empresa, id_produto)
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.containerFoto}>
        <Image
          source={{ uri: produto.ICONE }}
          style={styles.foto}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.containerBack} onPress={props.navigation.goBack}>
          <Image source={icons.back2} style={styles.back2} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <View style={styles.headerTextos}>
          <Text style={styles.nome}>{produto.NOME}</Text>
          <Text style={styles.descricao}>{produto.DESCRICAO}</Text>
          <Text style={styles.valor}>{
            new Intl.NumberFormat('pt-BR',{ style: 'currency', currency:'BRL'}).format(produto.VL_PRODUTO)
            }</Text>
        </View>
      </View>
      <View style={styles.headerObs}>
        <Text style={styles.descricao}>Observação</Text>
        <TextInput style={styles.multiline} multiline={true} numberOfLines={5} onChangeText={(text)=>setObservacao(text)}/>
      </View>
      <View style={styles.footer}>
      <TouchableOpacity onPress={()=>alterarQtd(-1)}>
        <Image source={icons.menos} style={styles.imgQtd}/>
      </TouchableOpacity>
        <Text style={styles.qtd}>{qtd}</Text>
      <TouchableOpacity onPress={()=>alterarQtd(1)}>
        <Image source={icons.mais} style={styles.imgQtd}/>
      </TouchableOpacity>

      <View style={styles.footerBtn}>
        <Button text="Inserir" onPress={addProductCart}/>
      </View>
      </View>
    </View>
  );
}

export default DetalheProduto;
