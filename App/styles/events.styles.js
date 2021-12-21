import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingTop: 0,
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  topContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: "40%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  choirLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    width: "60%",
    flexDirection: "column",
  },
  title: {
    fontWeight: "700",
    color: "#BD7D1E",
  },
  choirInfo: {
    color: "black",
    fontSize: 13,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#BC9C22",
    padding: 4,
    borderRadius: 50,
    alignContent: "center",
    justifyContent: "center",
    width: 140,
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 12,
    padding: 10,
    alignSelf: "center",
  },
  eventsContainer: {
    flex: 6,
    paddingTop: 5,
    marginTop: 40,
  },
  eventCard: {
    marginTop: 10,
    backgroundColor: "#EDE5DA",
    borderRadius: 15,
  },
  eventTitle: {
    height: 35,
    backgroundColor: "#B2DED9",
    flexDirection: "row",
  },
  iconContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 30,
    width: 30,
  },
  titleContainer: {
    width: "90%",
    justifyContent: "center",
    paddingLeft: 5,
  },
  eventTitleText: {
    fontWeight: "700",
    color: "black",
  },
  eventContainer: {
    paddingLeft: 40,
    justifyContent: "flex-start",
  },
  eventBody: {
    color: "black",
    fontSize: 12,
  },
});

export default styles;
