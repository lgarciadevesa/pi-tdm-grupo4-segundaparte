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
  function logout() {
    auth.signOut();
    props.navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <FontAwesome name="user" size={22} color="#D85A30" />
        </View>
        <View>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{auth.currentUser.email}</Text>
        </View>
      </View>

      <Text style={styles.subtitulo}>Mis recetas ({posts.length})</Text>

      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postText}>{item.data.description}</Text>
            <Text style={styles.likes}>
              <FontAwesome name="heart" size={14} color="#D85A30" /> {item.data.likes.length} Me gusta
            </Text>
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
    paddingTop: 20,
    backgroundColor: '#FFF8F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FAECE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A1B0C',
  },
  email: {
    fontSize: 14,
    color: '#993C1D',
    marginTop: 2,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A1B0C',
    marginBottom: 10,
  },
  post: {
    borderWidth: 1,
    borderColor: '#F5C4B3',
    borderStyle: 'solid',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 5,
  },
  postText: {
    fontSize: 16,
    color: '#4A1B0C',
    marginBottom: 8,
  },
  likes: {
    color: '#D85A30',
    fontWeight: 'bold',
  },
  boton: {
    borderWidth: 1,
    borderColor: '#A32D2D',
    borderRadius: 8,
    paddingVertical: 10,
    marginVertical: 15,
  },
  botonTexto: {
    color: '#A32D2D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Profile;
