import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import TinderCard from 'react-tinder-card'
import { ImageBackground, ScrollView, Text, View } from 'react-native'

import { Image } from 'expo-image';



// ...

const axios = require('axios');

export default function App() {
  // Create a single supabase client for interacting with your database
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [id, setId] = useState(0)

  async function fetchData() {

    fetch('https://cxagipbndazmimlmnjwo.functions.supabase.co/get_recipe', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4YWdpcGJuZGF6bWltbG1uandvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwODY2OTUsImV4cCI6MTk5MjY2MjY5NX0.8ARVS6xSpSDEHri8j7uM3dDi8Fi-JLrWCSMX7gtQkyM',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: '{"name":"Functions"}'
    }).then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        //Success

        setId(responseJson.data[0].id)
        setTitle(responseJson.data[0].title)
        setDescription(responseJson.data[0].description)
        if (responseJson.data[0].image_url != null) {
          setImage({ uri: responseJson.data[0].image_url })
        } else {
          setImage("https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png")
        }

      })
      //If response is not in json then in error
      .catch((error) => {
        //Error
        alert(JSON.stringify(error));
        console.error(error);
      });

  }

  useEffect(() => {
    fetchData()
  })

  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }

  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }

  useEffect(() => {
    console.info('image', image)
  }, [image])

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Approva le ricette</Text>
      <View style={styles.cardContainer}>
        <Image
          style={styles.image}
          source={image}
          placeholder={blurhash}
          contentFit="cover"
          transition={1000}
        />
        <StatusBar style="auto" />
      </View>

      <View style={{ padding: 10, height: 320 }}>
        <ScrollView>

          <Text >{description}</Text>
        </ScrollView>
      </View>

      <View style={{ padding: 10, height: 80, flexDirection: 'row' }}>
        <Button
          onPress={() => {
            fetch('https://cxagipbndazmimlmnjwo.functions.supabase.co/set_approval', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4YWdpcGJuZGF6bWltbG1uandvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwODY2OTUsImV4cCI6MTk5MjY2MjY5NX0.8ARVS6xSpSDEHri8j7uM3dDi8Fi-JLrWCSMX7gtQkyM',
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: '{"recipe_id":' + id + ', "approved": 2}'
            }).then((response) => {
              alert("Approvata ricetta con ID: " + id)
              fetchData();
            });
          }}
          title="Approva"
          buttonStyle={{ backgroundColor: 'rgba(127, 220, 103, 1)' }}
          containerStyle={{
            height: 40,
            marginLeft: 20,
            marginRight: 20,
            marginVertical: 10,
          }}
          titleStyle={{
            color: 'white',
            marginHorizontal: 20,
          }}
        />
        <Button
          onPress={() => {
            fetch('https://cxagipbndazmimlmnjwo.functions.supabase.co/set_approval', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4YWdpcGJuZGF6bWltbG1uandvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcwODY2OTUsImV4cCI6MTk5MjY2MjY5NX0.8ARVS6xSpSDEHri8j7uM3dDi8Fi-JLrWCSMX7gtQkyM',
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: '{"recipe_id": ' + id + ', "approved": 1}'
            }).then((response) => {
              alert("Disapprovata ricetta con ID: " + id)
              fetchData()
            });
          }}
          title="Disapprova"
          buttonStyle={{ backgroundColor: 'red' }}
          containerStyle={{
            height: 40,
            marginLeft: 20,
            marginRight: 20,
            marginVertical: 10,
          }}
          titleStyle={{
            color: 'white',
            marginHorizontal: 20,
          }}
        />
      </View>
    </View>
  );
}


const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 50,
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
  header: {
    color: '#000',
    fontSize: 30,
    marginBottom: 30,
  },
  cardContainer: {
    width: '90%',
    maxWidth: 260,
    height: 300,
  },
  card: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 250,
    height: 300,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 20,
  },
  cardTitle: {
    position: 'absolute',
    bottom: 0,
    margin: 10,
    color: '#fff',
  },
  infoText: {
    height: 28,
    justifyContent: 'center',
    display: 'flex',
    zIndex: -100,
  }
}