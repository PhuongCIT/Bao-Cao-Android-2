import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import React, { useLayoutEffect, useEffect, useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import domainURL from "../domain";
// import { useToast } from "react-native-toast-notifications";
const ProfileScreen = () => {
  const { userId, setUserId } = useContext(UserType);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: {
        backgroundColor: "#F5EECC",
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      headerRight: () => (
        <Pressable
          onPress={logout}
          style={{
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            marginRight: 25,
          }}
        >
          <AntDesign name="logout" size={24} color="red" />
          <Text style={{ fontSize: 12, color: "red" }}>Logout</Text>
        </Pressable>
      ),
    });
  }, []);
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${domainURL}/profile/${userId}`);
        const { user } = response.data;
        // console.log("User ==>  ", user);

        setUser(user);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    navigation.replace("Login");
  };
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await axios.get(`${domainURL}/orders/${userId}`);
  //       const orders = response.data.orders;
  //       setOrders(orders);

  //       setLoading(false);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   fetchOrders();
  // }, []);

  // console.log("orders", orders);

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{user?.name}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("MyOrder")}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Your orders</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate("MyAccount")}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Your Account</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
