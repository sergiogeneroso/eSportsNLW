import React from 'react';
import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation} from '@react-navigation/native'

import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { Background } from '../../components/background';

import logoImg from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';


export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  
  const navigation = useNavigation();

  function handleOpenGame({ id, title, bannerUrl}: GameCardProps){
    navigation.navigate('game', { id, title, bannerUrl });  
  }
  
  useEffect(()=>{
    fetch('http://192.168.0.104:3333/games')
    .then(response => response.json())
    .then(data => setGames(data))
  }
  ,[]);
  
  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image 
        source={logoImg}
        style={styles.logo}
        />

        <Heading 
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          renderItem={({item}) => (
            <GameCard 
            data={item}
            onPress={() => handleOpenGame(item)}
            />
          )}
        />

      </SafeAreaView>
    </Background>
  );
}