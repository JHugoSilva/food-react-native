import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useContext, useCallback } from "react";
import { CartContext } from "../../context/cart";
import { useFocusEffect } from '@react-navigation/native'
import { styles } from "./aba-home.style";

import icons from "../../constants/icons";
import TextBox from "../../components/textbox/textbox";
import Categorias from "../../components/categorias/categorias";
import Banners from "../../components/banners/banners";
import Restaurante from "../../components/restaurante/restaurante";
import api from "../../constants/api";

function AbaHome(props) {

  const { itens } = useContext(CartContext)

  const [busca, setBusca] = useState('')
  const [categorias, setCategorias] = useState([])
  const [banners, setBanners] = useState([])
  const [destaques, setDestaques] = useState([])
  const [qtdItem, setQtdItem] = useState(0)

  async function loadCategory() {
    
    try {

      const response = await api.get('/categorias')

      if (response.data) {
        setCategorias(response.data)
      }

    } catch (error) {
      if (error.response?.data.error) {
        Alert.alert(error.response?.data.error)
      } else {
        Alert.alert("Ocorreu um erro. Tente novamente mais tarde.")
      }
    }
  }

  async function loadBanner() {
    
    try {

      const response = await api.get('/banners')

      if (response.data) {
        setBanners(response.data)
      }

    } catch (error) {
      if (error.response?.data.error) {
        Alert.alert(error.response?.data.error)
      } else {
        Alert.alert("Ocorreu um erro. Tente novamente mais tarde.")
      }
    }
  }

  async function loadDestaques() {
    
    try {

      const response = await api.get('/empresas/destaques')

      if (response.data) {
        setDestaques(response.data)
      }

    } catch (error) {
      if (error.response?.data.error) {
        Alert.alert(error.response?.data.error)
      } else {
        Alert.alert("Ocorreu um erro. Tente novamente mais tarde.")
      }
    }
  }

  async function removeFavorito(id){
    try {

      const response = await api.delete(`/empresas/${id}/favoritos`)

      if (response.data) {
       
        loadDestaques()
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
       
        loadDestaques()
      }

    } catch (error) {
      if (error.response?.data.error) {
        Alert.alert(error.response?.data.error)
      } else {
        Alert.alert("Ocorreu um erro. Tente novamente mais tarde.")
      }
    }
  }

  function search(termo){
    props.navigation.navigate('busca',{
      busca:termo
    })
    
  }

  function searchCategoria(id){
    props.navigation.navigate('busca',{
      id_categoria:id
    })
    
  }


  function searchBanner(id){
    props.navigation.navigate('busca',{
      id_banner:id
    })
    
  }

  function openPedido(){
    props.navigation.navigate('meu-pedido')
  }

  function openCardapio(id){
    props.navigation.navigate('cardapio',{
      id_empresa: id
    })
  }

  useEffect(()=>{
    loadCategory()
    loadBanner()
    loadDestaques()
  },[])

  useFocusEffect(useCallback(()=>{
    setQtdItem(itens.length)
  },[itens]))

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <Image source={icons.logo} style={styles.logo} />
        <TouchableOpacity onPress={openPedido}>
          <Image source={icons.cart} style={styles.cart} />
          <Text style={styles.cartQtd}>{qtdItem}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.busca}>
        <TextBox placeholder="O que vamos comer hoje?" 
          onChangeText={(text) => setBusca(text)} 
          value={busca} 
          returnKeyType="search"
          onSubmit={search}/>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        <Categorias dados={categorias} onClick={searchCategoria}/>
        <Banners dados={banners} onClick={searchBanner}/>

        <View>
          <Text style={styles.destaques}>Destaques</Text>
        </View>
        {destaques.map((restaurante, index) => {
          return (
            <View key={index}>
              <Restaurante
                logotipo={{ uri: restaurante.ICONE }}
                id_empresa={restaurante.ID_EMPRESA}
                nome={restaurante.NOME}
                endereco={restaurante.ENDERECO}
                icone={restaurante.favorito == 'S' ? icons.favoritoFullLike : icons.favoritoFullUnLike}
                onPress={openCardapio}
                onClickIcon={restaurante.favorito == 'S' ? removeFavorito : addFavorito}
              />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

export default AbaHome;
