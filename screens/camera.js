import React, { Component } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class PickImage extends Component {
  state = {
    image: null,
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({
          image: result.uri,
        });
        console.log(result.uri);
        this.uploadImage(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
      </View>
    );
  }
  uploadImage = async(uri)=>{
    const data = new FormData()
    let FileName = uri.split('/')[uri.split('/').length-1]
    let type = `image/${uri.split('.')[uri.split('.').length -1]}`
    const fileToUpload = {
        uri : uri,
        name : FileName,
        type : type,
    };
    data.append("digit", fileToUpload);
    fetch("",{
        method : "POST",
        body : data,
        headers : {
            "content-type":"multipart/form-data"
        },
    })
        .then((response) => response.json())
        .then((result) => {
            console.log("Success:",result)
        })
        .catch((error) => {
            console.error("Error:",error)
        })
    } 
}


    


