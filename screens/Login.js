import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  StatusBar,
  FlatList,
  RefreshControl,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useEffect } from "react";

export default function Login(params) {
  const [weatherData, setWeatherData] = useState();
  StatusBar.setBarStyle("light-content");

  async function getWeather(city = "London") {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be34bce58d100edcccbd5177b4b4dc89`
    )
      .then((response) => response.json())
      .then((response) => {
        setWeatherData(response);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const weatherImage = [
    { weather: "overcast clouds", img: require("../assets/clouds.png") },
    { weather: "broken clouds", img: require("../assets/cloudy.png") },
    { weather: "few clouds", img: require("../assets/cloudy-day.png") },
    { weather: "clear sky", img: require("../assets/cloudy-day.png") },
  ];
  
  const cities = ["Accra", "Kumasi", "London", "Florida", "Abidjan"];

  function FTC(temp) {
    return temp - 273.15;
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#19172b",
        flex: 1,
        paddingTop: 55,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          borderRadius: 25,
          backgroundColor: "#211f30",
          padding: 20,
          height: 200,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>Today</Text>
          <View>
            <Text style={{ color: "white" }}>{new Date().toDateString()}</Text>
            <Text style={{ color: "grey", textTransform: "capitalize" }}>
              {weatherData?.weather[0].description}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 70 }}>
            {FTC(weatherData?.main.temp).toFixed(1)}
            <Text style={{ color: "orange", fontSize: 40 }}>C</Text>
          </Text>
          <Image
            style={{ width: 100, height: 100, marginRight: 20 }}
            source={
              weatherImage.find(
                (item) => weatherData?.weather[0].description === item?.weather
              )?.img
            }
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="location-outline" color="white" />
          <Text style={{ color: "white", paddingLeft: 10 }}>
            {weatherData?.name}
          </Text>
        </View>
      </View>
      <FlatList
        data={cities}
        ListEmptyComponent={
          <View>
            <Text style={{ color: "white" }}>Nothing here</Text>
          </View>
        }
        contentContainerStyle={{ paddingTop: 20 }}
        refreshControl={
          <RefreshControl
            tintColor="white"
            onRefresh={() => {}}
            refreshing={false}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              getWeather(item);
            }}
            style={{
              padding: 20,
              borderRadius: 10,
              backgroundColor: "#211f30",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>{item}</Text>
            <Ionicons
              name={
                item === weatherData?.name
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={18}
              color="white"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
