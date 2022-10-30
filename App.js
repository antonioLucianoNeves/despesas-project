import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';


export default function App() {

  const [objetos, setarObjetos] = useState([{
      nomes:['Futebol', 'Hotel', 'Janta'],
      valores:[10,50,50]
  }]);

  const [valorDevido, setValorDevido] = useState(0);

  const [nomeDespesa, setNomeDespesa] = useState('');

  const [valorDespesa, setValorDespesa] = useState(0);


  useEffect(()=>{
    //Somar valores
    var valorAtual = 0;

    for(let i = 0; i < objetos[0].valores.length; i++){
        valorAtual+=objetos[0].valores[i];
    }
    setValorDevido(valorAtual);
  },[])

  useEffect(()=>{
    //Somar valores
    atualizarValores();
  },[])

  const atualizarValores = ()=>{
      var valorAtual = 0;

    for(let i = 0; i < objetos[0].valores.length; i++){
      valorAtual+=objetos[0].valores[i];
  }
    setValorDevido(valorAtual);
  }

  const addDespesa = ()=>{
     setarObjetos([{nomes:[...objetos[0].nomes,nomeDespesa],valores:[...objetos[0].valores,valorDespesa]}]);
     setValorDevido(parseInt(valorDevido)+ parseInt(valorDespesa));

     setNomeDespesa("");
     setValorDespesa("");
  }

  const deletarDespesa = (index) => {

      setarObjetos([
        {
          nomes: objetos[0].nomes.filter(function(e,val){
             if(val !== index){
               return true;
             }
             else{
               return false;
             }
          }),
          valores: objetos[0].valores.filter(function(e,val){
            if(val !== index){
              return true;
            }
            else{
              setValorDevido(valorDevido-e);
              return false;
            }
        }),
        }
      ])
  }

  return (
    <View>
        <SafeAreaView style={styles.container}>
          <View style={{flex: 1}}>
            <Text style={{fontSize:30, color:'white'}}>Bem-Vindo, Usuário!</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontSize:20, color:'white'}}>Total de Gastos: R$ {valorDevido},00</Text>
          </View>

          <View>
            <TextInput value={nomeDespesa} onChangeText={(text)=>setNomeDespesa(text)} style={{width:'100%', heigth:30, backgroundColor:'white'}}placeholder="Nome despesa"></TextInput>
          </View>
          <View>
            <TextInput value={valorDespesa} onChangeText={(text)=>setValorDespesa(text)} style={{width:'100%', heigth:30, backgroundColor:'white', marginBottom:10 ,marginTop:10}}placeholder="Valor despesa"></TextInput>
          </View>
          <View>
            <Button onPress={()=>addDespesa()} title='Adicionar Despesa' ></Button>
          </View>
        </SafeAreaView>
        <View style={styles.containerDados}>
          {
          objetos[0].nomes.map(function(e, val){
            return (
              <View style={{borderBottomColor:'gray', borderBottomWidth:1, marginBottom:10, paddingBottom:10, paddingLeft:10, flexDirection:'row', justifyContent:'space-between'}}>
                <Text>{e}:R${objetos[0].valores[val]},00</Text>

                <TouchableOpacity onPress={()=> deletarDespesa(val)}><AntDesign name="delete" size={22} color="black"/></TouchableOpacity>
              
              </View>
            )
          })
          }
        </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#33CCFF',
    height:270
  },
  containerDados:{
    padding:30,
  }
});
