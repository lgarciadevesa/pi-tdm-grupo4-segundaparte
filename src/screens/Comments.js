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
            <View style={styles.posteo}>
                <Text style={styles.owner}>Publicado por {owner}</Text>
                <Text style={styles.titulo}>{description}</Text>
                <Text style={styles.likes}>
                    <FontAwesome name="heart" size={16} color="#D85A30" /> {likesCount} Me gusta
                </Text>
            </View>

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
                placeholder='Escribí un comentario'
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
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#FFF8F0',
    },
    posteo: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: '#FAECE7',
        marginBottom: 15,
    },
    owner: {
        color: '#993C1D',
        marginBottom: 5,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4A1B0C',
        marginBottom: 5,
    },
    likes: {
        color: '#D85A30',
        fontWeight: 'bold',
    },
    comentario: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#F5C4B3',
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    comentarioOwner: {
        fontWeight: 'bold',
        color: '#993C1D',
        marginBottom: 5,
    },
    field: {
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#F5C4B3',
        borderStyle: 'solid',
        borderRadius: 8,
        backgroundColor: '#fff',
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#D85A30',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});

export default Comments;
