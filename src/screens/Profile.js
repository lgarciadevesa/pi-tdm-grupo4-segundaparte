import { View, Text, Pressable, StyleSheet } from 'react-native';

function Profile(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi perfil</Text>

      <Pressable style={styles.boton} onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.botonTexto}>Desloguearse</Text>
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
    backgroundColor: '#dc3545',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  botonTexto: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Profile;
