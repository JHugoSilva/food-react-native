import { Alert, ScrollView, View } from "react-native";
import { styles } from "./registro.style";
import Header from "../../components/header/header";
import TextBox from "../../components/textbox/textbox";
import Button from "../../components/button/button";
import { useContext, useState } from "react";
import api from "../../constants/api";
import { salvaUsuario } from "../../storage/storage.usuario";
import { AuthContext } from "../../context/auth";

function Register(props) {

  const { user , setUser } = useContext(AuthContext)

  const nome = props.route.params.nome;
  const email = props.route.params.email;
  const senha = props.route.params.senha;

  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUF] = useState("");
  const [cep, setCep] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function processarNovaConta() {
    try {
      setIsLoading(true);
      const response = await api.post("/usuarios/registro", {
        nome: nome,
        email: email,
        senha: senha,
        endereco: endereco,
        complemento: complemento,
        bairro: bairro,
        cidade: cidade,
        uf: uf,
        cep: cep,
      });

      if (response.data) {
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        await salvaUsuario(response.data)
        setUser(response.data)
      }
      setIsLoading(false);

      Alert.alert("Conta criada com sucesso");
    } catch (error) {
      setIsLoading(false);
      if (error.response?.data.error) {
        Alert.alert(error.response?.data.error);
      } else {
        Alert.alert("Ocorreu um erro. Tente novamente mais tarde.");
      }
    }
  }

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
        >
          <Header text="Informe seu endereço." />
          <View style={styles.formGroup}>
            <View style={styles.formHorizontal}>
              <View style={styles.form70}>
                <TextBox
                  label="Endereço"
                  onChangeText={(text) => setEndereco(text)}
                  value={endereco}
                />
              </View>
              <View style={styles.form30}>
                <TextBox
                  label="Compl."
                  onChangeText={(text) => setComplemento(text)}
                  value={complemento}
                />
              </View>
            </View>

            <View style={styles.form}>
              <TextBox
                label="Bairro"
                onChangeText={(text) => setBairro(text)}
                value={bairro}
              />
            </View>
            <View style={styles.form}>
              <View style={styles.formHorizontal}>
                <View style={styles.form70}>
                  <TextBox
                    label="Cidade"
                    onChangeText={(text) => setCidade(text)}
                    value={cidade}
                  />
                </View>
                <View style={styles.form30}>
                  <TextBox
                    label="UF"
                    onChangeText={(text) => setUF(text)}
                    value={uf}
                  />
                </View>
              </View>
            </View>
            <View style={styles.form}>
              <TextBox
                label="Cep"
                onChangeText={(text) => setCep(text)}
                value={cep}
              />
            </View>
            <View style={styles.form}>
              <Button
                text="Criar minha conta"
                onPress={processarNovaConta}
                isLoading={isLoading}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default Register;
