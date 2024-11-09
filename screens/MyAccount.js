import { View, Text, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import domainURL from "../domain";
import { UserType } from "../UserContext";

const MyAccount = () => {
  const { userId, setUserId } = useContext(UserType);
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

  return (
    <View style={{ padding: 10, flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{user?.name}</Text>
      </View>
      <Pressable
        style={{
          padding: 10,
          backgroundColor: "#E0E0E0",
          borderRadius: 25,
        }}
      >
        <Text style={{ textAlign: "center" }}>Account Management</Text>
      </Pressable>
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 30,
          flexDirection: "row",
          fontWeight: "500",
        }}
      >
        <Text>Name</Text>
        <Text style={{ marginHorizontal: 30, fontWeight: "500" }}>
          {user?.name}
        </Text>
      </View>
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 30,
          flexDirection: "row",
          fontWeight: "500",
        }}
      >
        <Text>Email</Text>
        <Text style={{ marginHorizontal: 30, fontWeight: "500" }}>
          {user?.email}
        </Text>
      </View>
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 30,
          flexDirection: "row",
          fontWeight: "500",
        }}
      >
        <Text>mobile No</Text>
        <Text style={{ marginHorizontal: 30, fontWeight: "500" }}>
          {user?.addresses[0].mobileNo}
        </Text>
      </View>
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 30,
          flexDirection: "row",
          fontWeight: "500",
        }}
      >
        <Text>Treet</Text>
        <Text style={{ marginHorizontal: 30, fontWeight: "500" }}>
          {user?.addresses[0].street}
        </Text>
      </View>
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 30,
          flexDirection: "row",
          fontWeight: "500",
        }}
      >
        <Text>Country</Text>
        <Text style={{ marginHorizontal: 30, fontWeight: "500" }}>
          {user?.addresses[0].country}
        </Text>
      </View>
    </View>
  );
};

export default MyAccount;
