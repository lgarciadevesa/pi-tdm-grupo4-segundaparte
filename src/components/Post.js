import { View, Text, StyleSheet } from 'react-native';

function Post(props) {
  let likes = 0;
  if (props.post.data.likes) {
    likes = props.post.data.likes.length;
  }

  return (
    <View style={styles.post}>
      <Text style={styles.owner}>{props.post.data.owner}</Text>
      <Text style={styles.descripcion}>{props.post.data.description}</Text>
      <Text>{likes} likes</Text>
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
});

export default Post;
