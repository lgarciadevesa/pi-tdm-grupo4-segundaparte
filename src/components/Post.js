import { View, Text, Pressable, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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

      <View style={styles.acciones}>
        <Pressable onPress={() => likear()}>
          <Text style={styles.like}>
            <FontAwesome
              name="heart"
              size={16}
              color={props.post.data.likes.includes(auth.currentUser.email) ? '#D85A30' : '#B4927F'}
            /> {props.post.data.likes.length} Me gusta
          </Text>
        </Pressable>

        <Pressable onPress={() => props.navigation.navigate('Comentarios', {
          id: props.post.id,
          description: props.post.data.description,
          owner: props.post.data.owner,
          likesCount: props.post.data.likes.length
        })}>
          <Text style={styles.comentar}>
            <FontAwesome name="comment-o" size={16} color="#993C1D" /> Comentar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#F5C4B3',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  owner: {
    fontWeight: 'bold',
    color: '#993C1D',
    marginBottom: 5,
  },
  descripcion: {
    color: '#4A1B0C',
    marginBottom: 10,
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  like: {
    color: '#D85A30',
    fontWeight: 'bold',
  },
  comentar: {
    color: '#993C1D',
    fontWeight: 'bold',
  },
});

export default Post;
