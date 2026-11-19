import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

function Comments(props) {
    const { id } = props.route.params
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
            <Text style={styles.titulo}>Comentarios del posteo</Text>

            <FlatList
                data={comentarios}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <Text>{item.data.owner}: {item.data.comment}</Text>}
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
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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