import { Image, Text, View } from "react-native";
import icons from "../../constants/icons";
import { styles } from "./header.style";

function Header(props){
    return <View style={styles.header}>
        <Image style={styles.logo} source={icons.logo}/>
        <Text style={styles.title}>{props.text}</Text>
    </View>
}

export default Header