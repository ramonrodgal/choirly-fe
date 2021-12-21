import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
    paddingTop: 0,
    width: "100%",
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  topContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginTop: 5,
  },
  arrow: {
    width: 30,
    height: 30,
    alignSelf: "flex-start",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 75,
  },
  // MESSAGE
  messageContainer: {
    marginTop: 10,
  },
  titleContainer: {
    backgroundColor: "#B2DED9",
    padding: 8,
  },
  messageTitleText: {
    fontWeight: "700",
    color: "black",
  },
  postedBy: {
    fontSize: 10,
    color: "black",
    marginBottom: 10,
  },
  bodyContainer: {
    backgroundColor: "#EBE2D8",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 8,
  },
  messageBody: {
    color: "black",
    fontSize: 12,
  },

  // -------------------MENU
  addCommentContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#CBCBCB",
    marginVertical: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
  },
  icon: {
    marginRight: 3,
  },
  iconCom: {
    marginRight: 3,
    marginLeft: 20,
  },

  // -------------------NEW COMMENT CONTTAINER
  newCommentContainer: {
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    width: 340,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
  },
  button: {
    backgroundColor: "#BC9C22",
    width: 60,
    padding: 7,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 12,
  },

  //---------------------------------COMMENT CARD
  commentCard: {
    backgroundColor: "#EBE2D8",
    marginBottom: 10,
    borderRadius: 8,
    padding: 5,
    width: 360,
  },
  menuIcons: {
    margin: 5,
  },
  author: {
    color: "#2F4550",
    fontWeight: "700",
  },
  date: {
    fontSize: 10,
  },
  body: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  iconTrash: {
    marginRight: 15,
  },
});

export default styles;
