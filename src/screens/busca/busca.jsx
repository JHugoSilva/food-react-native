import { Alert, FlatList, Image, Text, View } from "react-native";
import Restaurante from "../../components/restaurante/restaurante";
import icons from "../../constants/icons";
import { styles } from "./busca.style";
import { useEffect, useState } from "react";
import api from "../../constants/api";

function Busca(props){

    const busca = props.route.params.busca 
    const id_categoria = props.route.params.id_categoria
    const id_banner = props.route.params.id_banner 

    const [restaurantes, setRestaurantes] = useState([])
    
    const removeFavorito = async (id) => {
        try {
            const response = await api.delete(`/empresas/${id}/favoritos`)
            if (response.data) {
                loadSearch()
            }
            
        } catch (error) {
            if (error.response?.data.error) {
                Alert.alert(error.response?.data.error)
            } else {
                Alert.alert("Ocorreu um erro. Tente novamente mais tarde.")
            }
        }
    }

    const addFavorito = async (id) => {
        try {            
            const response = await api.post(`/empresas/${id}/favoritos`)
            
            if (response.data) {
                loadSearch()
            }
            
        } catch (error) {
            if (error.response?.data.error) {
                Alert.alert(error.response?.data.error)
            } else {
                Alert.alert("Ocorreu um erro. Tente novamente mais tarde.")
            }
        }
    }

    const openCardapio = async (id) => {
        props.navigation.navigate('cardapio',{
            id_empresa:id
        })
    }

    const loadSearch = async () => {
        try {

            const response = await api.get('/empresas', {
                params: {
                    busca:busca,
                    id_categoria:id_categoria,
                    id_banner:id_banner
                }
            })

            if (response.data) {
                setRestaurantes(response.data)
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
        loadSearch()
    },[restaurantes])

    return <View style={styles.container}>
    <FlatList
    data={restaurantes}
    keyExtractor={(restaurante) => restaurante.ID_EMPRESA}
    showsVerticalScrollIndicator={false}
    renderItem={({item})=>{
     return <Restaurante
        id_empresa={item.ID_EMPRESA}
         nome={item.NOME}
         endereco={item.ENDERECO}
         logotipo={{uri: item.ICONE}}
         icone={item.favorito == 'S' ? icons.favoritoFullLike : icons.favoritoFullUnLike}
         onPress={openCardapio}
         onClickIcon={item.favorito == 'S' ? removeFavorito : addFavorito }
     />
    }}

    contentContainerStyle ={ styles.containerList }

    ListEmptyComponent={ () => {
     return <View style={styles.empty}>
         <Image source={icons.empty}/>
         <Text style={styles.emptyText}>Nenhum restaurante encontrado.</Text>
     </View>
    }}
    />
 </View>
}

export default Busca