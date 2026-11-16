import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post';

function Home() {
  const [posteos, setPosteos] = useState([]);

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
      }
    )
  }, [])

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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Home;
