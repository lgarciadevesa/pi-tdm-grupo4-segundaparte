import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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
                        auth.signOut();
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

            <View style={styles.logoContenedor}>
                <View style={styles.logo}>
                    <FontAwesome name="cutlery" size={28} color="#fff" />
                </View>
            </View>

            <Text style={styles.titulo}>Crear cuenta</Text>
            <Text style={styles.subtitulo}>Sumate a la mesa</Text>

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

            <View style={styles.filaLink}>
                <Text style={styles.textoLogin}>¿Ya tenés cuenta? </Text>
                <Pressable onPress={() => props.navigation.navigate('Login')}>
                    <Text style={styles.link}>Iniciá sesión</Text>
                </Pressable>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFF8F0',
    },
    logoContenedor: {
        alignItems: 'center',
        marginBottom: 10,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#D85A30',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#4A1B0C',
        textAlign: 'center',
    },
    subtitulo: {
        color: '#993C1D',
        textAlign: 'center',
        marginBottom: 20,
    },
    field: {
        height: 40,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#F5C4B3',
        borderStyle: 'solid',
        borderRadius: 8,
        backgroundColor: '#fff',
        marginVertical: 6,
    },
    boton: {
        backgroundColor: '#D85A30',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
    },
    botonTexto: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    filaLink: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    textoLogin: {
        color: '#993C1D',
    },
    link: {
        color: '#D85A30',
        fontWeight: 'bold',
    },
    error: {
        color: '#A32D2D',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default Register;
