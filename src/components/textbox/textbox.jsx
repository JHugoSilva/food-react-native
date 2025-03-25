import { Text, TextInput } from "react-native";
import { styles } from "./textbox.style";

function TextBox(props) {
    return <>
    { props.label && <Text style={styles.label}>{props.label}</Text> }
        <TextInput 
            style={styles.input} 
            onChangeText={(text)=> props.onChangeText(text)} 
            value={props.value} 
            placeholder={props.placeholder} 
            secureTextEntry={props.isPassword} 
            returnKeyType={props.returnKeyType ? props.returnKeyType : 'default'}
            onSubmitEditing={(value) => props.onSubmit && props.onSubmit(value.nativeEvent.text)}
            />
    </>
}

export default TextBox