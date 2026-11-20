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
      <Text style={styles.titulo}>Nueva receta</Text>
      <Text style={styles.subtitulo}>Contale a la comunidad qué cocinaste</Text>

      <TextInput
        style={styles.field}
        keyboardType='default'
        placeholder='¿Qué cocinaste hoy?'
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
    paddingTop: 20,
    backgroundColor: '#FFF8F0',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A1B0C',
  },
  subtitulo: {
    color: '#993C1D',
    marginBottom: 10,
  },
  field: {
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#F5C4B3',
    borderStyle: 'solid',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#D85A30',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default NewPost;
