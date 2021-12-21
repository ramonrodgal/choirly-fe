import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: "#EBE2D8",
    width: "100%",
    padding: 10,
  },
  postButton: {
    backgroundColor: "#BD7D1E",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 145,
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  avatarContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 75,
    marginRight: 15,
  },
  formContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderColor: "#D4D4D4",
    borderStyle: "dotted",
  },
  bodyContainer: {
    borderBottomWidth: 1,
    borderColor: "#D4D4D4",
    borderStyle: "dotted",
    height: 200,
    flexWrap: "wrap",
    overflow: "scroll",
  },
  confirmContainer: {
    alignContent: "center",
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
