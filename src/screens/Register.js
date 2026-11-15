import { View, Text, Pressable, StyleSheet } from 'react-native';

function Register(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Formulario de registro</Text>

      <Pressable onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.link}>Ya tengo cuenta</Text>
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
  link: {
    color: '#007bff',
    textAlign: 'center',
  },
});

export default Register;
