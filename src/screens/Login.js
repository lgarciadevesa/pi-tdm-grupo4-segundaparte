import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { auth } from '../firebase/config';

function Login(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function onSubmit() {

    if (email === '') {
      setError('Ingresá un email');
      return;
    }

    if (password === '') {
      setError('Ingresá una contraseña');
      return;
    }

    if (email.includes('@') === false) {
      setError('Email mal formateado');
      return;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        setError('');
        props.navigation.navigate('HomeMenu', { screen: 'Home' });
      })
      .catch(error => {
        setError('Credenciales incorrectas');
      });

  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Formulario de login</Text>

      <TextInput
        style={styles.field}
        keyboardType='email-address'
        placeholder='Email'
        onChangeText={text => {
          setEmail(text);
          setError('');
        }}
        value={email}
      />

      <TextInput
        style={styles.field}
        keyboardType='default'
        placeholder='Contraseña'
        secureTextEntry={true}
        onChangeText={text => {
          setPassword(text);
          setError('');
        }}
        value={password}
      />

      <Pressable
        style={styles.boton}
        onPress={() => onSubmit()}
      >
        <Text style={styles.botonTexto}>Entrar en la app</Text>
      </Pressable>

      {
        error !== ''
        ?
        <Text style={styles.error}>{error}</Text>
        :
        null
      }

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

  field: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    marginVertical: 10,
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

  error: {
    marginBottom: 10,
  },

});

export default Login;