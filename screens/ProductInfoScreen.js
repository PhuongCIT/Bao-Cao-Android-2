import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const navigation = useNavigation();
  const [addedToCart, setAddedToCart] = useState(false);
  const height = (width * 100) / 100;
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 1000);
  };

  const cart = useSelector((state) => state.cart.cart);

  const renderImage = (item, index) => {
    console.log("Image URL: ", item);
    const uri = typeof item === "string" ? item : item.uri;
    return (
      <ImageBackground
        style={{
          width,
          height,
          marginTop: 25,
          resizeMode: "contain",
        }}
        source={{ uri }}
        key={index}
      >
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#C60C30",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "600",
                fontSize: 12,
              }}
            >
              20% off
            </Text>
          </View>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <MaterialCommunityIcons
              name="share-variant"
              size={24}
              color="black"
            />
          </View>
        </View>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#E0E0E0",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: "auto",
            marginLeft: 20,
            marginBottom: 20,
          }}
        >
          <AntDesign name="hearto" size={24} color="black" />
        </View>
      </ImageBackground>
    );
  };

  const carouselData = route.params.carouselImages;

  // console.log("carouselData Images: ", carouselData);
  // console.log("Carousel Images: ", route.params);

  return (
    <>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Array.isArray(carouselData)
            ? carouselData.map((item, index) => renderImage(item, index))
            : renderImage(carouselData, 0)}
        </ScrollView>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {route?.params?.title}
          </Text>

          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
            $ {route?.params?.price}
          </Text>
        </View>

        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Text>Color: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {route?.params?.color ?? "Normal"}
          </Text>
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Text>Size: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {route?.params?.size ?? "Normal"}
          </Text>
        </View>

        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
            Total :<Text style={{ color: "red" }}> ${route.params.price}</Text>
          </Text>
          <Text style={{ color: "red" }}>
            FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              alignItems: "center",
              gap: 5,
            }}
          >
            <Ionicons name="location" size={24} color="black" />

            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Delivery to Ho Chi Minh City
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: "white",
          height: 50,
          flexDirection: "row",
          borderRadius: 20,
          padding: 5,
          alignItems: "",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={() => addItemToCart(route?.params?.item)}
          style={{
            backgroundColor: "#FFC72C",
            marginLeft: 20,
            borderRadius: 20,
            width: 150,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {addedToCart ? (
            <View>
              <Text>Added to Cart</Text>
            </View>
          ) : (
            <Text>Add to Cart</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("Cart");
            addItemToCart(route?.params?.item);
          }}
          style={{
            backgroundColor: "#FF4C4C",
            width: 150,
            marginRight: 20,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Buy Now</Text>
        </Pressable>
      </View>
    </>
  );
};

export default ProductInfoScreen;
