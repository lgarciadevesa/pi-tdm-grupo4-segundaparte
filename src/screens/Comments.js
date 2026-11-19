import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

function Comments(props) {
    const { id, description, owner, likesCount } = props.route.params
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        db.collection('comments').where('postId', '==', id).onSnapshot(
            docs => {
                let comments = [];
                docs.forEach(doc => {
                    comments.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                setComentarios(comments)
            }
        )
    }, [])

    function onSubmit() {
        if (comentario === '') {
            return;
        }

        db.collection('comments').add({
            postId: id,
            owner: auth.currentUser.email,
            comment: comentario,
            createdAt: Date.now()
        })
            .then(() => {
                setComentario('');
            })
            .catch(e => console.log(e));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.owner}>Publicado por: {owner}</Text>
            <Text style={styles.titulo}>Comentarios del posteo: "{description}"</Text>
            <Text style={styles.likes}>
                <FontAwesome name="heart" size={16} color="red" /> {likesCount} likes
            </Text>

            <FlatList
                data={comentarios}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.comentario}>
                        <Text style={styles.comentarioOwner}>{item.data.owner}:</Text>
                        <Text>{item.data.comment}</Text>
                    </View>
                )}
            />

            <TextInput
                style={styles.field}
                keyboardType='default'
                placeholder='Escribí tu comentario...'
                onChangeText={text => setComentario(text)}
                value={comentario}
            />

            <Pressable style={styles.button} onPress={() => onSubmit()}>
                <Text style={styles.buttonText}>Comentar</Text>
            </Pressable>
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
    owner: {
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 5,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    likes: {
        textAlign: 'right',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    comentario: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginBottom: 10,
    },
    comentarioOwner: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    field: {
        height: 40,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#28a745',
    },
    buttonText: {
        color: '#fff',
    }
});

export default Comments;