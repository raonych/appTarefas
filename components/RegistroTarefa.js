import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from './Firebase';
import { createTarefa } from './Api';

const RegistroTarefaScreen = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataLimite, setDataLimite] = useState('');

  const handleRegister = async () => {
    const tarefaData = {
        titulo,
        descricao,
        dataLimite
    }
    try {
      const tarefa = await createTarefa(tarefaData)
      Alert.alert('Sucesso! 🎉', 'Tarefa cadastrado com sucesso!', [
      { text: 'OK', onPress: () => navigation.replace('Home') }
      ]);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível cadastrar a Tarefa. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Cadastro de Tarefas</Text>
      <TextInput style={styles.input} placeholder="Titulo" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.input} placeholder="descricao" value={descricao} onChangeText={setDescricao} />
      <TextInput style={styles.input}  placeholder="Data Limite" value={dataLimite} onChangeText={setDataLimite} />
      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: { width: '80%', padding: 10, borderWidth: 1, marginVertical: 5 },
});

export default RegistroTarefaScreen;
