import { View, Text, StyleSheet } from 'react-native';

function NewPost() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear posteo</Text>
      <Text> formulario para crear un posteo</Text>
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
});

export default NewPost;
