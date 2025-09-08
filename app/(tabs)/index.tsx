import * as React from "react";
import { Alert, SafeAreaView, View, StyleSheet, Keyboard } from "react-native";
import {
  Provider as PaperProvider,
  Appbar,
  TextInput,
  Button,
  Text,
} from "react-native-paper";

export default function App() {
  const [gas, setGas] = React.useState("");
  const [eth, setEth] = React.useState("");
  const [result, setResult] = React.useState(null); // {percent, tip}

  function toNumber(s) {
    // aceita "4,59" ou "4.59"
    if (typeof s !== "string") return NaN;
    return parseFloat(s.replace(",", "."));
  }

  function validateAndCalc() {
    const g = toNumber(gas);
    const e = toNumber(eth);

    if (!gas || !eth || isNaN(g) || isNaN(e) || g <= 0 || e <= 0) {
      Alert.alert(
        "Atenção!",
        "Obrigatório informar o valor da gasolina e do etanol, ambos maiores que 0."
      );
      setResult(null);
      return;
    }

    const percent = (e / g) * 100;
    const tip =
      percent <= 70
        ? "Recomendamos o uso do Etanol"
        : "Recomendamos o uso da Gasolina";

    setResult({ percent, tip });
    Keyboard.dismiss();
  }

  return (
    <PaperProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.Content title="Calculadora Flex" />
        </Appbar.Header>

        <View style={styles.container}>
          <TextInput
            label="Preço da Gasolina"
            value={gas}
            onChangeText={setGas}
            keyboardType="numeric" // requisito (b)
            returnKeyType="done"
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Preço do Etanol"
            value={eth}
            onChangeText={setEth}
            keyboardType="numeric" // requisito (b)
            returnKeyType="done"
            mode="outlined"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={validateAndCalc}
            style={styles.button}
          >
            CALCULAR
          </Button>

          {result && (
            <View style={styles.resultBox}>
              <Text variant="bodyMedium">
                {`${result.percent.toFixed(0)}% `}
                {result.tip}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  input: { backgroundColor: "white" },
  button: { marginTop: 8 },
  resultBox: { marginTop: 12, alignItems: "center" },
});
