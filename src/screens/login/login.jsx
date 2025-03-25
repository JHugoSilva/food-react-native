import { Alert, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./login.style"
import Header from "../../components/header/header"
import TextBox from "../../components/textbox/textbox"
import Button from "../../components/button/button"
import { useContext, useEffect, useState } from "react"
import api from '../../constants/api'
import { loadUsuario, salvaUsuario } from "../../storage/storage.usuario"
import { AuthContext } from "../../context/auth"

function Login(props) {

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[isLoading, setIsLoading] = useState(false)

    const { user, setUser } = useContext(AuthContext)

    const processLogin = async () => {
        
       try {
            setIsLoading(true)
            const response = await api.post('/usuarios/login',{
                email:email,
                senha:password
            })
            if (response.data) {
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
                await salvaUsuario(response.data);
                setUser(response.data)
            }
            setIsLoading(false)
        } catch (error) {
           setIsLoading(false)
           await salvaUsuario({})
        if (error.response?.data.error) {
            Alert.alert(error.response?.data.error)
        } else {
            Alert.alert("Ocorreu um erro. Tente novamente mais tarde.")
        }
       }
        
    }

    async function carregarDados() {
        try {
            const usuario = await loadUsuario()
            if (usuario.token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${usuario.token}`
                setUser(usuario)
            }            
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        carregarDados()
    },[])

    return <View style={styles.container}>
        <Header text="Acesse sua conta." />
        <View style={styles.formGroup}>
            <View style={styles.form}>
                <TextBox label="E-mail" onChangeText={(text)=>setEmail(text)} value={email} />
            </View>
            <View style={styles.form}>
                <TextBox label="Senha" onChangeText={(text) => setPassword(text)} value={password} isPassword={true} />
            </View>
            <View style={styles.form}>
                <Button text="Acessar" onPress={processLogin} isLoading={isLoading}/>
            </View>
        </View>
        <View style={styles.footer}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('register')} >
                <Text style={styles.footerText}>Criar minha conta.</Text>
            </TouchableOpacity>
        </View>
    </View>
}

export default Login