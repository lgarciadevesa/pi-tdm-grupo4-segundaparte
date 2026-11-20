import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../firebase/config';
import Post from '../components/Post';

function Home(props) {
  const [posteos, setPosteos] = useState([]);

  useEffect(() => {
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
      docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setPosteos(posts)
      }
    )
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <FontAwesome name="cutlery" size={18} color="#fff" />
        </View>
        <Text style={styles.titulo}>Sabores</Text>
      </View>

      {posteos.length === 0 ? (
        <Text style={styles.vacio}>Todavía no hay posteos</Text>
      ) : (
        <FlatList
          data={posteos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Post post={item} navigation={props.navigation} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 20,
    backgroundColor: '#FFF8F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#D85A30',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A1B0C',
  },
  vacio: {
    color: '#993C1D',
  },
});

export default Home;
