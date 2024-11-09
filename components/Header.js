import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Header = () => {
  return (
    <View
      style={{
        backgroundColor: "#FE9900",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 7,
          gap: 10,
          backgroundColor: "white",
          borderRadius: 13,
          height: 38,
          flex: 1,
        }}
      >
        <AntDesign
          style={{ paddingLeft: 10 }}
          name="search1"
          size={22}
          color="black"
        />
        <TextInput placeholder="Search Amazon.in" />
      </Pressable>
    </View>
  );
};

export default Header;
