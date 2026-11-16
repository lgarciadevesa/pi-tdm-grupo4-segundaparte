import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';


function NewPost(props) {
  const [descripcion, setDescripcion] = useState('');

  function onSubmit() {
    if (descripcion === '') {
      return;
    }

    db.collection('posts').add({
      owner: auth.currentUser.email,
      description: descripcion,
      createdAt: Date.now(),
      likes: []
    })
      .then(() => {
        setDescripcion('');
        props.navigation.navigate('Home');
      })
      .catch(e => console.log(e));
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear posteo</Text>

      <TextInput
        style={styles.field}
        keyboardType='default'
        placeholder='Escribí tu posteo...'
        onChangeText={text => setDescripcion(text)}
        value={descripcion}
      />

      <Pressable style={styles.button} onPress={() => onSubmit()}>
        <Text style={styles.buttonText}>Publicar</Text>
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
  field: {
    height: 40,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#28a745',
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
  }
});

export default NewPost;
