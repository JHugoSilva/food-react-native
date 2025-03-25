import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./categorias.style"

function Categorias(props){

    return <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {
                props.dados.map((categoria, index)=>{
                    return <View style={styles.categoria} key={index}>
                        <TouchableOpacity onPress={ () => props.onClick(categoria.ID_CATEGORIA)}>
                            <Image source={{uri:categoria.ICONE}} style={styles.icone}/>
                            <Text style={styles.descricao}>{categoria.CATEGORIA}</Text>
                        </TouchableOpacity>
                    </View> 
                    
                })
            }
        </ScrollView>
    </View>
}

export default Categorias