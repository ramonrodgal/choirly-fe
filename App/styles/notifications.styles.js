import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    paddingTop: 0,
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  topName: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    fontSize: 18,
  },
  cardContainer: {
    backgroundColor: "#EBE2D8",
    marginVertical: 10,
    borderRadius: 8,
    padding: 8,
    fontSize: 12,
    width: 360,
  },
});

export default styles;
