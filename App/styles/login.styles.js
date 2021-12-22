import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  logoContainer: {
    flex: 2,
    top: 70,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    height: 50,
    width: "70%",
    backgroundColor: "#2F4550",
  },
  input: {
    flex: 1,
    backgroundColor: "#2F4550",
    padding: 10,
    paddingBottom: 15,
    borderRadius: 25,
    marginTop: 5,
    color: "white",
  },
  buttonContainer: {
    flex: 1,
    width: "60%",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#B2DED9",
    width: "100%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "#586F7C",
    marginTop: 25,
    borderRadius: 15,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  logo: {
    width: 300,
    height: 300,
  },
});

export default styles;
