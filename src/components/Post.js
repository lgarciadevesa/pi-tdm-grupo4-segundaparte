import { View, Text, Pressable, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { db, auth } from '../firebase/config';

function Post(props) {
  function likear() {
    if (props.post.data.likes.includes(auth.currentUser.email)) {
      db.collection('posts')
        .doc(props.post.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() => { })
        .catch(e => console.log(e));
    } else {
      db.collection('posts')
        .doc(props.post.id)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(() => { })
        .catch(e => console.log(e));
    }
  }
  return (
    <View style={styles.post}>
      <Text style={styles.owner}>{props.post.data.owner}</Text>
      <Text style={styles.descripcion}>{props.post.data.description}</Text>

      <Pressable onPress={() => likear()}>
        <Text style={styles.like}>Me gusta</Text>
      </Pressable>
      <Text>{props.post.data.likes.length} likes</Text>

      <Pressable onPress={() => props.navigation.navigate('Comentarios', { id: props.post.id })}>
        <Text style={styles.like}>Comentar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
  },
  owner: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descripcion: {
    marginBottom: 10,
  },
  like: {
    color: '#007bff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default Post;
