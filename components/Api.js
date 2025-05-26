const API_URL = 'http://localhost:8000/tarefas';
import { Alert } from 'react-native';
import { auth } from './Firebase';

const getToken = async () => {
  const user = auth.currentUser;
  if (user) return await user.getIdToken();
  throw new Error('Usuário não autenticado');
};

export const fetchTarefas = async () => {
  try {
    const token = await getToken();
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error.message);
    Alert.alert('Erro', `Não foi possível buscar as tarefas: ${error.message}`);
  }
};

export const createTarefa = async (tarefaData) => {
  try {
    const token = await getToken();
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tarefaData),
    });

    if (response.status === 201 || response.status === 204) {
      Alert.alert('Sucesso!', 'Tarefa cadastrada com sucesso!');
      return {};
    }

    const textResponse = await response.text();
    let responseData;

    try {
      responseData = JSON.parse(textResponse);
    } catch {
      console.warn('Resposta não é um JSON válido.');
      responseData = null;
    }

    throw new Error(responseData?.message || 'Erro desconhecido na API');
  } catch (error) {
    console.error('Erro ao cadastrar tarefa:', error.message);
    Alert.alert('Erro ao cadastrar', `Detalhes: ${error.message}`);
    return null;
  }
};

export const deleteTarefa = async (tarefaId, setTarefas) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/${tarefaId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const textResponse = await response.text();
    let responseData;

    try {
      responseData = JSON.parse(textResponse);
    } catch {
      console.warn('Resposta não é um JSON válido.');
      responseData = null;
    }

    if (response.ok && responseData?.success) {
      Alert.alert('Sucesso!', responseData.message);
      setTarefas((prev) => prev.filter((t) => t.id !== tarefaId));
    } else {
      throw new Error(responseData?.message || 'Erro ao excluir a tarefa');
    }
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error.message);
    Alert.alert('Erro ao excluir', `Detalhes: ${error.message}`);
  }
};

export const updateTarefa = async (tarefaId, updatedData, navigation) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/${tarefaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      Alert.alert('Sucesso!', 'Tarefa atualizada com sucesso!');
      navigation?.navigate?.('Home');
    } else {
      const textResponse = await response.text();
      let responseData;

      try {
        responseData = JSON.parse(textResponse);
      } catch {
        console.warn('Resposta não é um JSON válido.');
        responseData = null;
      }

      throw new Error(responseData?.message || 'Erro ao atualizar a tarefa');
    }
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error.message);
    Alert.alert('Erro ao atualizar', `Detalhes: ${error.message}`);
  }
};
