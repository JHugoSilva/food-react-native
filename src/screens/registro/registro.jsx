import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./registro.style"
import Header from "../../components/header/header"
import TextBox from "../../components/textbox/textbox"
import Button from "../../components/button/button"
import { useState } from "react"


function Register(props) {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    return <>
        <View style={styles.container}>
            <ScrollView style={styles.scrollView} automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
                <Header text="Criar sua conta." />
                <View style={styles.formGroup}>
                    <View style={styles.form}>
                        <TextBox label="Nome completo" onChangeText={(text) => setNome(text)} value={nome}/>
                    </View>
                    <View style={styles.form}>
                        <TextBox label="E-mail" onChangeText={(text) => setEmail(text)} value={email} />
                    </View>
                    <View style={styles.form}>
                        <TextBox label="Senha" isPassword={true} onChangeText={(text) => setPassword(text)} value={password} />
                    </View>
                    <View style={styles.form}>
                        <TextBox label="Confirme a Senha" isPassword={true} onChangeText={(text) => setPasswordConfirm(text)} value={passwordConfirm}/>
                    </View>
                    <View style={styles.form}>
                        <Button text="Próximo passo" onPress={()=>props.navigation.navigate('register2',{
                            nome:nome,
                            email:email,
                            senha:password
                        })}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    </>
}

export default Register