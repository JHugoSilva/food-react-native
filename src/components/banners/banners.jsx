import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./banners.style"

function Banners(props){
    return <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {
                props.dados.map((banner, index)=>{
                    return <View style={styles.banner} key={index}>
                        <TouchableOpacity onPress={() => props.onClick(banner.ID_BANNER)}>
                            <Image source={{ uri: banner.ICONE }} style={styles.icone}/>
                        </TouchableOpacity>
                    </View> 
                    
                })
            }
        </ScrollView>
    </View>
}

export default Banners