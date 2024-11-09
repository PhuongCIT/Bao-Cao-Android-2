import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import ProductItem from "../components/ProductItem";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import debounce from "lodash.debounce";

const ITEMS_PER_PAGE = 5;

const SearchProduct = () => {
  const route = useRoute();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(route.params?.search || "");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0); // New state for total count

  const fetchProduct = async (query, pageNum) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      const dataResponse = response.data;

      const filteredData = dataResponse.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setTotalCount(filteredData.length); // Update total count

      const paginatedData = filteredData.slice(0, pageNum * ITEMS_PER_PAGE);
      setData(paginatedData);
      setHasMore(paginatedData.length < filteredData.length);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const debouncedFetchProduct = useCallback(debounce(fetchProduct, 500), []);

  useFocusEffect(
    useCallback(() => {
      setSearchQuery("");
      setData([]);
      setPage(1);
      setHasMore(true);
      setTotalCount(0); // Reset total count on screen focus
      setLoading(false);
    }, [])
  );

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
    setData([]);
    setPage(1);
    debouncedFetchProduct(query, 1);
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProduct(searchQuery, nextPage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.searchContainer}>
          <AntDesign
            style={styles.searchIcon}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput
            placeholder="Search product"
            style={styles.textInput}
            value={searchQuery}
            onChangeText={handleSearchQueryChange}
          />
        </Pressable>
      </View>

      {loading && page === 1 && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      <Text style={styles.resultText}>
        Search Results: {data.length} of {totalCount}
      </Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {data.length === 0 && !loading && !error && searchQuery && (
        <Text style={styles.noDataText}>No Data Found....</Text>
      )}

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductItem item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : !hasMore ? (
            <Text style={styles.endText}>No more items</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#FE9900",
    alignItems: "center",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
    width: "90%",
  },
  searchIcon: {
    paddingRight: 10,
  },
  textInput: {
    flex: 1,
    height: "100%",
  },
  resultText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
    marginVertical: 10,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "red",
  },
  listContent: {
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  endText: {
    textAlign: "center",
    fontSize: 14,
    color: "gray",
    marginVertical: 10,
  },
});

export default SearchProduct;
