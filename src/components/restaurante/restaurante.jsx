import { Image, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./restaurante.style"

function Restaurante(props){
    return <TouchableOpacity style={styles.restaurante} onPress={()=>props.onPress(props.id_empresa)}>
        <Image source={props.logotipo} style={styles.logotipo}/>
        <View style={styles.textos}>
            <Text style={styles.nome}>{props.nome}</Text>
            <Text style={styles.endereco}>{props.endereco}</Text>
        </View>
        <TouchableOpacity onPress={()=>props.onClickIcon(props.id_empresa)}>
            <Image source={props.icone} style={styles.favorito} /> 
        </TouchableOpacity>
    </TouchableOpacity>
}

export default Restaurante