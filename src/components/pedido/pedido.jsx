import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./pedidos.style";

function Pedido(props) {

  const dt = new Date(props.data_entrega)

  return (
    <TouchableOpacity style={styles.pedido} onPress={() => props.onClickPedido(props.id_pedido)}>
      <Image source={{ uri: props.logotipo }} style={styles.logotipo} />
      <View style={styles.textos}>
        <Text style={styles.nome}>{props.nome}</Text>
        <View style={styles.containerValor}>
          <Text style={styles.valor}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(props.preco)}
          </Text>
          <Text style={styles.valor}>{dt.toLocaleDateString()}</Text>
        </View>
        <Text style={styles.valor}>Pedido: {props.id_pedido}</Text>
        <Text style={{ color: props.color }}>{props.status}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default Pedido;
