import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';

function Profile(props) {

  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState([]);
  useEffect(() => {

    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {

        docs.forEach(doc => {
          setUsername(doc.data().username);
        });

      });

    db.collection('posts')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot(docs => {

        let posteos = [];

        docs.forEach(doc => {
          posteos.push({
            id: doc.id,
            data: doc.data()
          });
        });

        setPosts(posteos);

      });

  }, []);

  function logout() {
    auth.signOut();
    props.navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi perfil</Text>

      <View style={styles.datos}>
        <Text style={styles.username}>Usuario: {username}</Text>
        <Text style={styles.email}>Email: {auth.currentUser.email}</Text>
      </View>

      <Text style={styles.subtitulo}>Mis posteos</Text>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text>{item.data.description}</Text>
            <Text style={styles.likes}>
              Likes: {item.data.likes.length}
            </Text>
          </View>
        )}
      />

      <Pressable style={styles.boton} onPress={() => logout()}>
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
    marginVertical: 10,
  },
  botonTexto: {
    color: '#fff',
    textAlign: 'center',
  },
  datos: {
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    marginTop: 5,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  post: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 6,
    padding: 10,
    marginVertical: 5,
  },
  likes: {
    marginTop: 5,
  },
});

export default Profile;
