import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
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
  function borrarPosteo(id) {
    db.collection('posts').doc(id).delete();
  }

  function logout() {
    auth.signOut();
    props.navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi perfil</Text>

      <View style={styles.datos}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.email}>{auth.currentUser.email}</Text>
      </View>

      <Text style={styles.subtitulo}>Mis posteos</Text>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postOwner}>{item.data.owner}</Text>
            <Text style={styles.postText}>{item.data.description}</Text>
            <Text style={styles.likes}>
              <FontAwesome name="heart" size={14} color="red" /> {item.data.likes.length} likes
            </Text>
            <Pressable style={styles.botonEliminar} onPress={() => borrarPosteo(item.id)}>
              <Text style={styles.botonTexto}>Eliminar</Text>
            </Pressable>
          </View>
        )}
      />

      <Pressable style={styles.boton} onPress={() => logout()}>
        <Text style={styles.botonTexto}>Cerrar sesión</Text>
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
  datos: {
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
    color: '#555',
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
  postOwner: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  postText: {
    fontSize: 16,
    marginBottom: 5,
  },
  likes: {
    marginTop: 5,
    marginBottom: 5,
  },
  botonEliminar: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    alignSelf: 'flex-end',
  },
  boton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginVertical: 15,
  },
  botonTexto: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Profile;
