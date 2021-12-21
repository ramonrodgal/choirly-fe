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
  //-------------------------TITLE
  titleContainer: {
    marginTop: 10,
    flex: 0.5,
    width: "100%",

    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: "#BD7D1E",
  },
  //----------------------------FORM CONTAINER
  formContainer: {
    flex: 8,
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 30,
    width: 280,
    padding: 8,
    borderRadius: 5,
  },
  inputDesc: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 150,
    width: 280,
    padding: 8,
    borderRadius: 5,
  },
  label: {
    color: "black",
    padding: 0,
    marginTop: 20,
    fontSize: 12,
    fontWeight: "600",
    alignItems: "center",
  },
  chars: {
    fontSize: 10,
  },
  //------------------------------BUTTON
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#BC9C22",
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
    marginBottom: 8,
    marginTop: 10,
  },
});

export default styles;
