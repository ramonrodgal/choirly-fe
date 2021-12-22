import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    paddingTop: 0,
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
  date: {
    fontSize: 12,
    color: "#586F7C",
  },
  buttonAccept: {
    borderRadius: 25,
    backgroundColor: "#BC9C22",
    color: "black",
    margin: 10,
    padding: 8,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    alignSelf: "center",
  },
  buttonReject: {
    borderRadius: 25,
    backgroundColor: "#BD611E",
    color: "black",
    margin: 10,
    padding: 8,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    width: 250,
    alignSelf: "center",
  },
});

export default styles;
