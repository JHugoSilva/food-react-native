import { ActivityIndicator, Text, TouchableOpacity } from "react-native"
import { styles } from "./button.style"

function Button(props){
    return <>
        <TouchableOpacity style={[styles.btn, props.isLoading ? styles.loading : ""]} disabled={props.isLoading} onPress={props.onPress}>
            {
                props.isLoading ? <ActivityIndicator color={styles.loadingColor}/> : <Text style={styles.text}>{props.text}</Text>
            }
        </TouchableOpacity>
    </> 
}

export default Button