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
    flex: 1,
    marginTop: 10,
    // borderWidth: 1,
    // borderColor: 'yellow'
  },
  choirLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  messageContainer: {
    flex: 2,
    alignContent: "center",
    // justifyContent: 'center',
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: 'red',
    marginTop: 10,
  },
  title: {
    fontWeight: "700",
    color: "#BD7D1E",
  },
  input: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 100,
    width: 350,
    padding: 10,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: "#B2DED9",
    width: 100,
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  blueButton: {
    backgroundColor: "#B2DED9",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },

  requestContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'blue',
    alignItems: "center",
  },
  button: {
    backgroundColor: "#BC9C22",
    width: "60%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  confirmation: {
    flex: 1,
    alignItems: "center",
    fontSize: 10,
    //     borderWidth: 1,
    // borderColor: 'green',
  },
});

export default styles;
