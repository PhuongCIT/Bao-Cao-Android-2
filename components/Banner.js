import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";

const { width } = Dimensions.get("window");
const Banner = () => {
  const BannerData = [
    {
      _id: 1,
      coverImageUri:
        "https://cdn.dribbble.com/users/6833689/screenshots/15371974/mockupsssss_4x.jpg",
      cornerLabelColor: "#FFD300",
      cornerLabelText: "GOTY",
    },
    {
      _id: 2,
      coverImageUri:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
      cornerLabelColor: "#0080ff",
      cornerLabelText: "NEW",
    },
    {
      _id: 3,
      coverImageUri:
        "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
      cornerLabelColor: "#2ECC40",
      cornerLabelText: "-75%",
    },
    {
      _id: 4,
      coverImageUri:
        "https://static.vecteezy.com/system/resources/previews/020/737/706/original/web-banner-or-horizontal-template-design-with-special-offer-on-mobile-phones-for-advertising-concept-vector.jpg",
      cornerLabelColor: "#2ECC40",
      cornerLabelText: "-20%",
    },
  ];

  const renderItem = (data) => (
    <View key={data.coverImageUri} style={styles.cardContainer}>
      <Pressable onPress={() => alert(data._id)}>
        <View style={styles.cardWrapper}>
          <Image style={styles.card} source={{ uri: data.coverImageUri }} />
          <View
            style={[
              styles.cornerLabel,
              { backgroundColor: data.cornerLabelColor },
            ]}
          >
            <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        pagination={PaginationLight}
        renderItem={renderItem}
        data={BannerData}
        loop
        autoplay
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width,
  },
  cardWrapper: {
    // borderRadius: 8,
    overflow: "hidden",
  },
  card: {
    width: width * 1,
    height: width * 0.4,
  },
  cornerLabel: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});
export default Banner;
