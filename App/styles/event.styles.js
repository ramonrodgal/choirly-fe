import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    paddingTop: 0,
  },
  eventCard: {
    marginTop: 10,
    backgroundColor: "#EDE5DA",
    width: 360,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  eventTitle: {
    backgroundColor: "#B2DED9",
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: "center",
  },
  eventTitleText: {
    fontWeight: "700",
    color: "black",
  },
  eventContainer: {
    backgroundColor: "#EDE5DA",
    padding: 10,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  eventBody: {
    color: "black",
    fontSize: 12,
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 20,
  },
  responseButtonContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  notGoingButton: {
    backgroundColor: "#C25527",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "row",
    width: 120,
    alignContent: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 20,
  },
  goingButton: {
    backgroundColor: "#BC9C22",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "row",
    width: 120,
    alignContent: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  addCommentContainer: {
    width: 360,
    marginTop: 20,
  },
  commentBoxContainer: {
    backgroundColor: "white",
    height: 100,
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EBE2D8",
  },
  buttonContainer: {
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  commentsContainer: {
    paddingTop: 5,
  },
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
