import { View, Text, Pressable, StyleSheet } from 'react-native';

function Login(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Formulario de login</Text>

      <Pressable style={styles.boton} onPress={() => props.navigation.navigate('HomeMenu', { screen: 'Home' })}>
        <Text style={styles.botonTexto}>Entrar en la app</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate('Register')}>
        <Text style={styles.link}>Ir al registro</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 10,
  },
  botonTexto: {
    color: '#fff',
    textAlign: 'center',
  },
  link: {
    color: '#007bff',
    textAlign: 'center',
  },
});

export default Login;
