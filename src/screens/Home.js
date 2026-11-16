import { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';

function Home() {
  const [posteos, setPosteos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
      docs =>{
        let posts = [];
        docs.forEach( doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setPosteos(posts)
        setLoading(false)
      }
    )
  }, [])

  if (loading) {
    return (
      <View style={styles.cargando}>
        <ActivityIndicator size='large' color='green' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Home</Text>

      {posteos.length === 0 ? (
        <Text>Todavía no hay posteos</Text>
      ) : (
        <FlatList
          data={ posteos }
          keyExtractor={ item => item.id.toString() }
          renderItem={ ({item}) => <Post post={item}/> }
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
    marginTop: 20,
  },
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Home;
