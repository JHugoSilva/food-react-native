import { Alert, FlatList, Image, Text, View } from "react-native";
import { restaurantes } from "../../constants/dados";
import Restaurante from "../../components/restaurante/restaurante";
import icons from "../../constants/icons";
import { styles } from "./aba-favoritos.style";
import api from "../../constants/api";
import { useEffect, useState } from "react";

function AbaFavoritos(props){

    const [favoritos, setFavoritos] = useState([])

    function openCardapio(id){
      props.navigation.navigate('cardapio',{
        id_empresa: id
      })
    }

    async function loadFavoritos() {
    
        try {
    
          const response = await api.get('/usuarios/favoritos')
          
          if (await response.data) {
            setFavoritos(response.data)
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
            loadFavoritos()
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
        loadFavoritos()
      },[favoritos])

    return <View style={styles.container}>
       <FlatList
       data={favoritos}
       keyExtractor={(item) => item.ID_EMPRESA.toString()}
       showsVerticalScrollIndicator={false}
       renderItem={({item})=>{
        return <Restaurante 
            id_empresa={item.ID_EMPRESA}
            nome={item.NOME}
            endereco={item.ENDERECO}
            logotipo={{uri: item.ICONE}}
            icone={icons.remove}
            onPress={openCardapio}
            onClickIcon={removeFavorito}
        />
       }}

       contentContainerStyle ={ styles.containerList }

       ListEmptyComponent={ () => {
        return <View style={styles.empty}>
            <Image source={icons.empty}/>
            <Text style={styles.emptyText}>Nenhum favorito encontrado.</Text>
        </View>
       }}
       />
    </View>
}

export default AbaFavoritos