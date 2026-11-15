import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { auth, db } from '../firebase/config';

function Register(props) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function onSubmit() {

        if (username === '') {
            setError('El nombre de usuario es obligatorio');
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {

                db.collection('users').add({
                    email: auth.currentUser.email,
                    username: username,
                    createdAt: Date.now()
                })
                    .then(() => {
                        setError('');
                        props.navigation.navigate('Login');
                    })
                    .catch(error => {
                        setError(error.message);
                    });

            })
            .catch(error => {
                setError(error.message);
            });
    }

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Formulario de registro</Text>

            <TextInput
                style={styles.field}
                keyboardType='email-address'
                placeholder='Email'
                onChangeText={text => {
                    setEmail(text);
                    setError('');
                }}
                value={email}
            />

            <TextInput
                style={styles.field}
                keyboardType='default'
                placeholder='Nombre de usuario'
                onChangeText={text => {
                    setUsername(text);
                    setError('');
                }}
                value={username}
            />

            <TextInput
                style={styles.field}
                keyboardType='default'
                placeholder='Contraseña'
                secureTextEntry={true}
                onChangeText={text => {
                    setPassword(text);
                    setError('');
                }}
                value={password}
            />

            <Pressable style={styles.boton} onPress={() => onSubmit()}>
                <Text style={styles.botonTexto}>Registrarme</Text>
            </Pressable>

            {
                error !== ''
                ?
                <Text style={styles.error}>{error}</Text>
                :
                null
            }

            <Pressable onPress={() => props.navigation.navigate('Login')}>
                <Text style={styles.link}>Ya tengo cuenta</Text>
            </Pressable>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    field: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    boton: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        marginBottom: 10,
    },
    botonTexto: {
        color: '#fff',
        textAlign: 'center',
    },
    link: {
        color: '#007bff',
        textAlign: 'center',
    },
    error: {
        marginBottom: 10,
    },
});

export default Register;