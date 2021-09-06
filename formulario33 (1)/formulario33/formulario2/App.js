import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, ScrollView, Button, Alert, Modal, } from 'react-native';
//import ModalDropdown from 'react-native-modal-dropdown';
import { Picker } from '@react-native-picker/picker';
import config from './config/config.json';

import Listitem from './src/pages/Listitem/index';

export default function App() {

  // Varieis da entradas dos inputs 
  const [horainicial, onChangeNumber] = useState(null);
  const [horafinal, onChangeNumber2] = useState(null);
  const [difhora, onChangeNumber3] = useState(null);
  const [peso, onChangeNumber4] = useState(null);
  const [texto, onChangeTexto] = useState(null);
  const [message, setMessage] = useState(null);

  const [tarefa, setSelectedValue] = useState(null);
  const [material, setSelectedValue2] = useState(null);


  var [useponto, setUsePonto] = useState([]);


  // variaveis do formulario modal 
  const [selectedequipamento, setSelectedEquipamento] = useState(null);
  const [selectedturno, setSelectedTurno] = useState(null);
  const [continicial, onChangeTeste2] = useState(null);
  const [contfinal, onChangeTeste] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  //Enviar dados formulario para o backend

  async function resgisterUser() {
    console.log(config.urlRootNode)
    let reqs = await fetch(config.urlRootNode + 'create', {
      method: 'POST',
      headers: {

        'Accept': 'aplication/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nameTarefa: tarefa,
        nameHorainicial: horainicial,
        nameHorafinal: horafinal,
        nameDifhora: difhora,
        namePeso: peso,
        nameTexto: texto,
        nameMaterial: material,
      })
    });
    let ress = await reqs.json();
    setMessage(ress);
  }


  async function resgisterPonto() {
    console.log(config.urlRootNode)
    let reqs = await fetch(config.urlRootNode + 'insert', {
      method: 'POST',
      headers: {

        'Accept': 'aplication/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nameEquipamento: selectedequipamento,
        nameTurno: selectedturno,
        nameContinicial: continicial,
        nameContfinal: contfinal,
      })
    });
    let ress = await reqs.json();
    setMessage(ress);
    
    
  }

  
  async function resgisterTeste() {
    console.log(config.urlRootNode)
    let reqs = await fetch(config.urlRootNode + 'teste', {
      method: 'POST',
      headers: {

        'Accept': 'aplication/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        teste:'alo',
      })
    });
    let ress = await reqs.json();
    console.log(ress[0].id);
    ress.map(pontos => {
      let temp={
        id: pontos.id,
        tag:pontos.equipamentos,
        description:pontos.turnos,
        time1:pontos.contInicial,
        time2:pontos.contFinal
      }
      useponto.push(temp)
    })
    setUsePonto(useponto)

    console.log(useponto)
  }

  //Variavel da Flastlist
  {/*  const tarefas = [
    {
      id: 1,
      tag: 'TAG: CD-051 CAMINHÃO BASCULANTE 6X4',
      time1: 'Contador Inicial: 1056',
      time2: 'Contador Final: 1056',
    },

  ];//*/}

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <Text styles={styles.title}> Informação do Formulario </Text>

        {message && (
          <Text>{message}</Text>
        )}


        {/*  View que contendo a Flatlist onde e feita a renderização */}

        {/* <Text>{texto}</Text>*/}

        <FlatList
          //Renderização da flatlist
          horizontal
          data={useponto}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Listitem
              data={item}
            />
          )}
        />
        <Text styles={styles.title}> Formulario de Apontamento de Tarefa </Text>
        <View style={styles.picker}>

          {/* <ModalDropdown style={styles.dropdown} options={['Tarefa', 'Calcario', 'Ferro', 'Ouro', 'Cobre', 'Uranio']}>

        </ModalDropdown>*/}

          {/*  View que contendo a picker da lista de tarefas*/}
          <Picker

            // picker lista de materiais
            mode="dropdown"
            selectedValue={tarefa}
            style={{ height: 50, width: 375, margin: 10, }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Selecione Tarefa" value="" />
            <Picker.Item label="Extração de Calcario" value="Extração de Calcario" />
            <Picker.Item label="Transporte de Ferro" value="Transporte de Ferro" />
            <Picker.Item label="Descarga de Cobre" value="Descarga de Cobre" />
            <Picker.Item label="Carregamento de Ouro" value="Carregamento de Ouro" />
            <Picker.Item label="Trataemnto do Titanio" value="Trataemnto do Titanio" />
            <Picker.Item label="Controle do Uranio" value="Controle do Uranio" />

          </Picker>
        </View>
        {/*  View que contem os inputs de entrada de horas inicial, final, e diferencial */}

        <View style={styles.container3}>

          <TextInput
            //Input da hora inicial
            style={styles.input}
            onChangeText={onChangeNumber}
            value={horainicial}
            placeholderTextColor="#121212"
            placeholder=" Hora inicial"
            keyboardType="numeric"
          />

          <TextInput
            //Input da hora final
            style={styles.input}
            onChangeText={onChangeNumber2}
            value={horafinal}
            placeholderTextColor="#121212"
            placeholder=" Hora Final"
            keyboardType="numeric"
          />

          <TextInput
            //Input do deferencial de hora
            style={styles.input}
            onChangeText={onChangeNumber3}
            value={difhora}
            placeholderTextColor="#121212"
            placeholder=" Dif.Hora"
            keyboardType="numeric"
          />

        </View>
        <View style={styles.picker}>
          {/*  View que contem o input de entrada e saida de peso e a picker com as lista de materiais  */}

          <TextInput
            //Input da entrada de peso
            style={styles.input}
            onChangeText={onChangeNumber4}
            value={peso}
            placeholderTextColor="#121212"
            placeholder=" Peso"
            keyboardType="numeric"
          />

          <Picker
            // picker lista de materiais
            mode="dropdown"
            selectedValue={material}
            style={{ height: 50, width: 375, margin: 10, }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue2(itemValue)}
          >
            <Picker.Item label="Selecione Material" value="" />
            <Picker.Item label="Calcario" value="Calcario" />
            <Picker.Item label="Ferro" value="Ferro" />
            <Picker.Item label="Cobre" value="Cobre" />
            <Picker.Item label="Ouro" value="Ouro" />
            <Picker.Item label="Titanio" value="Titanio" />
            <Picker.Item label="Uranio" value="Uranio" />
          </Picker>

        </View>
        <View style={styles.container4}>
          {/*  View que contem o input do campo de observaçao  */}
          <TextInput
            style={styles.input2}
            multiline
            numberOfLines={3}
            onChangeText={onChangeTexto}
            value={texto}
            placeholderTextColor="#121212"
            placeholder=" Observação: "
            keyboardType="default"
          />
        </View>

        <View style={styles.fixToText}
        //View dos buttons 
        >

          <Button
            title="Iniciar "
            color="green"
            onPress={resgisterUser}
          />
          <Button
            title="Registro "
            color="red"
            onPress={() => setModalVisible(true)}
          />
          <Button
            title="sair"
            color="gray"
            onPress={() => Alert.alert('Tarefa Finalizado')}
          />
        </View>


        <View style={styles.centeredView}>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >

            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <Picker
                  // picker lista de materiais
                  selectedValue={selectedequipamento}
                  style={{ height: 50, width: 375, margin: 10, }}
                  onValueChange={(itemValue, itemIndex) => setSelectedEquipamento(itemValue)}
                >
                  <Picker.Item label="Selecione equipamento" value="" />
                  <Picker.Item label="CD-051 CAMINHÃO BASCULANTE 6X4"
                    value="CD-051 CAMINHÃO BASCULANTE 6X4" />
                  <Picker.Item label="CD-059 CAMINHÃO transporte 6X4"
                    value="CD-059 CAMINHÃO transporte 6X4" />
                  <Picker.Item label="CD-060 Carro de vistoria"
                    value="CD-060 Carro de vistoria" />
                  <Picker.Item label="CD-055 Escavadeira"
                    value="CD-055 Escavadeira" />
                </Picker>


                <Picker
                  // picker lista de materiais
                  selectedValue={selectedturno}
                  style={{ height: 50, width: 375, margin: 10, }}
                  onValueChange={(itemValue, itemIndex) => setSelectedTurno(itemValue)}
                >
                  <Picker.Item label="Selecione Turno" value="" />
                  <Picker.Item label="1ª Turno" value="1ª Turno" />
                  <Picker.Item label="2ª Turno" value="2ª Turno" />
                  <Picker.Item label="3ª Turno" value="3ª Turno" />

                </Picker>

                <TextInput
                  //Input da Cont.inicial
                  style={styles.input3}
                  onChangeText={onChangeTeste2}
                  value={continicial}
                  placeholderTextColor="#121212"
                  placeholder=" Cont.inicial"
                  keyboardType="numeric"
                />

                <TextInput
                  //Input da Cont.final
                  style={styles.input3}
                  onChangeText={onChangeTeste}
                  value={contfinal}
                  placeholderTextColor="#121212"
                  placeholder=" Cont.final"
                  keyboardType="numeric"
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <Button
                    title="Salvar "
                    color="green"
                    onPress={() =>
                     { resgisterPonto()
                      resgisterTeste()
                      setModalVisible(!modalVisible)
                      
                    }}
                  />
                  <Button
                    title="Cancelar "
                    color="red"
                    onPress={() => Alert.alert('Tarefa Finalizado') }
                  />
                </View>

              </View>
            </View>
          </Modal>

        </View>



      </ScrollView>

    </View>

  );
}
// todos os objetos de estilização da tela do formularios
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',


  },
  title: {
    fontSize: 18,

    fontWeight: 'bold',
    padding: 18,
  },
  container3: {
    flex: 1,
    alignItems: 'center',
    //marginBottom: 480,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  picker: {
    flex: 1,
    //marginBottom: 480,
    backgroundColor: 'white',
  },

  input: {
    height: 40,
    margin: 7,
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 2,
    color: 'black',
    width: 118,
  },
  input2: {
    height: 100,
    margin: 7,
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 2,
    color: 'black',
    width: 377,
  },
  input3: {
    height: 40,
    margin: 7,
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    borderRadius: 2,
    color: 'black',
    width: 118,
    flexDirection: 'row',
    flexWrap: "wrap",
  },

  scrollView: {



  },
  fixToText: {
    flex: 1,
    marginTop: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

});
