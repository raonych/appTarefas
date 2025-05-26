import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button} from 'react-native';
import { fetchTarefas } from './Api';
const HomeScreen = ({ navigation }) =>{
   
  const [tarefas, setTarefas] = useState([]);

  useEffect(()=>{
    const fetchData = async ()=>{
      const tarefasData = await fetchTarefas();
      setTarefas(tarefasData);
    }
    fetchData();
  },[])
  return (
  <View style={styles.container}>
    <Text>Bem-vindo!</Text>
    <Button title="Perfil" onPress={() => navigation.navigate('Perfil')} />
    {tarefas == undefined
    ?
    (<Text>Você ainda não possui tarefas</Text>) 

    : tarefas.map((tarefa) =>(
      <View key={tarefa.id}>
        <Text>{tarefa.titulo}</Text>
        <Text>{tarefa.descricao}</Text>
        <Text>{tarefa.concluido ? 'Concluído' : 'Pendente'}</Text>
      </View>
    ))}
    <Button title="Nova Tarefa" onPress={() => navigation.navigate('RegistroTarefa')} />
  </View>

)
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: 150, height: 150, marginTop: 20 }
});

export default HomeScreen;