import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
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
        <Image
          style={styles.logo}
          source={require('../../assets/logo.jpg')}
          resizeMode='contain'
        />
        <Text style={styles.titulo}>Home</Text>
      </View>

      {posteos.length === 0 ? (
        <Text>Todavía no hay posteos</Text>
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
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 38,
    height: 38,
    marginRight: 10,
    borderRadius: 6,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Home;
