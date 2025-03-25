import { Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./aba-perfil.styles"
import icons from "../../constants/icons"
import { useContext } from "react"
import { AuthContext } from "../../context/auth"
import { salvaUsuario } from "../../storage/storage.usuario"
import api from "../../constants/api"


function Perfil(){

    const { setUser } = useContext(AuthContext)

    const logout = () => {
        api.defaults.headers.common['Authorization'] = ""
        salvaUsuario({})
        setUser({})
    }

    return <View style={styles.container}>
        <TouchableOpacity style={[styles.item, styles.borderTop]}>
            <View style={styles.containerIcone}>
                <Image source={icons.endereco} style={styles.icone}/>
            </View>
            <View style={styles.textos}>
                <Text style={styles.titulo}>Endereço</Text>
                <Text style={styles.subtitulo}>Meu endereço de entrega</Text>
            </View>
            <View style={styles.containerIcone}>
                <Image source={icons.more} style={styles.more}/>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
            <View style={styles.containerIcone}>
                <Image source={icons.dados} style={styles.icone}/>
            </View>
            <View style={styles.textos}>
                <Text style={styles.titulo}>Meus dados</Text>
                <Text style={styles.subtitulo}>Informações da minha conta</Text>
            </View>
            <View style={styles.containerIcone}>
                <Image source={icons.more} style={styles.more}/>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={logout}>
            <View style={styles.containerIcone}>
                <Image source={icons.logout} style={styles.icone}/>
            </View>
            <View style={styles.textos} >
                <Text style={styles.titulo}>Desconectar</Text>
                <Text style={styles.subtitulo}>Desconectar seu usuário desse aparelho</Text>
            </View>
            <View style={styles.containerIcone}>
                <Image source={icons.more} style={styles.more}/>
            </View>
        </TouchableOpacity>
    </View>
}

export default Perfil