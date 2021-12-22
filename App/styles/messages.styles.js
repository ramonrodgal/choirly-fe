import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingTop: 5,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#BC9C22",
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 12,
  },
  messagesContainer: {
    flex: 7,
    paddingTop: 30,
    marginTop: 25,
    width: 360,
  },
  //MESSAGE CARD
  messageCard: {
    marginTop: 10,
    backgroundColor: "#EDE5DA",
    borderRadius: 15,
  },
  titleContainer: {
    backgroundColor: "#B2DED9",
    flexDirection: "row",
    padding: 5,
    paddingLeft: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  messageTitleText: {
    fontWeight: "700",
    color: "black",
  },
  messageContainer: {
    justifyContent: "flex-start",
    padding: 10,
  },
  messageBody: {
    color: "black",
    fontSize: 12,
    backgroundColor: "#EBE2D8",
  },
  comments: {
    fontSize: 12,
    padding: 5,
    paddingLeft: 10,
  },
  icon: {
    height: 30,
    width: 30,
    marginLeft: 20,
    marginTop: 7,
  },
});

export default styles;
