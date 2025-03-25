import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Produto from '../../components/produto/produto'
import { styles } from "./cardapio.style";
import icons from "../../constants/icons";
import { useEffect, useState } from "react";
import api from '../../constants/api'

function Cardapio(props) {

  const id_empresa = props.route.params.id_empresa

  const [cardapio, setCardapio] = useState({ categorias:[]})
  const [favorito, setFavorito] = useState("N")


  const loadCardapio = async (id) => {
    try {
      
      const response = await api.get(`/empresas/${id}/cardapio`) 
      
      if (response.data) {
        setCardapio(response.data)
        setFavorito(response.data.favorito)
      }

    } catch (error) {
      if (error.response?.data.error) {
        Alert.alert(error.response?.data.error)
      } else {
        Alert.alert('Ocorreu um erro. Tente novamente mais tarde.')
      }
    }
  }

  const clickFavorito = async () => {
    favorito == 'S' ? await removeFavorito(id_empresa): await addFavorito(id_empresa)
  }

  const clickProduto = async (id) => {
    props.navigation.navigate('detalhe-produto',{
      id_produto:id,
      id_empresa:id_empresa,
      vl_taxa_entrega: cardapio.VL_TAXA_ENTREGA
    })
  }

  async function removeFavorito(id){
    try {

      const response = await api.delete(`/empresas/${id}/favoritos`)

      if (response.data) {
       
        setFavorito('N')
      }

    } catch (error) {
      if (error.response?.data.error) {
        Alert.alert(error.response?.data.error)
      } else {
        Alert.alert("Ocorreu um erro. Tente novamente mais tarde.")
      }
    }
  }

  async function addFavorito(id){
    try {

      const response = await api.post(`/empresas/${id}/favoritos`)
      if (response.data) {
       
        setFavorito('S')
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
    loadCardapio(id_empresa)
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.containerFoto}>
        <Image
          source={{uri: cardapio.FOTO }}
          style={styles.foto}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.containerBack} onPress={props.navigation.goBack}>
          <Image source={icons.back2} style={styles.back2} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <View style={styles.headerTextos}>
          <Text style={styles.nome}>{cardapio.NOME}</Text>
          <Text style={styles.taxa}>Taxa de entrega: {
            new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(cardapio.VL_TAXA_ENTREGA)
          }
          </Text>
        </View>
        <TouchableOpacity onPress={clickFavorito}>
          <Image style={styles.favorito} source={favorito == 'S' ? icons.favoritoFullLike : icons.favoritoFullUnLike} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.location}>
          <Image style={styles.locationImg} source={icons.location} />
          <Text style={styles.endereco}>
           {cardapio.ENDERECO} - {cardapio.BAIRRO} - {cardapio.CIDADE} - {cardapio.UF}
          </Text>
        </View>
        {cardapio.categorias?.map((cat) => {
          return (
            <View key={cat.ID_CATEGORIA} style={styles.containerProduto}>
              <Text style={styles.categoria}>{cat.CATEGORIA}</Text> 
                {
                  cat.itens?.map((item) => {
                    return(
                      <Produto
                        key={item.ID_PRODUTO}
                        id_produto={item.ID_PRODUTO}
                        foto={{ uri: item.ICONE }}
                        nome={item.NOME}
                        descricao={item.DESCRICAO}
                        valor={item.VL_PRODUTO}
                        onClick={clickProduto}
                      />
                    ) 
                  })
                }
            </View>
            
          );
        }
        
        )}
      </ScrollView>
    </View>
  );
}

export default Cardapio;
