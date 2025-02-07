import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingTop: 0,
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
  iconContainer: {
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
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
  filesContainer: {
    flex: 4,
    paddingTop: 5,
    width: 360,
    marginTop: 20,
  },
  fileContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#B8DBD9",
    marginVertical: 10,
    padding: 8,
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,
  },
  button: {
    backgroundColor: "#BD7D1E",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    margin: 5,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 14,
  },
  downloadContainer: {
    alignSelf: "flex-end",
    marginLeft: 10,
  },
});

export default styles;
