import { router } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ZahlenScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title} accessibilityRole="header">
          Zahlen lernen
        </Text>

        <Text style={styles.description}>
          Hier werden Sie die{`\n`}Zahlen von 1 bis 9{`\n`}erkunden. Das{`\n`}Kästchen in{`\n`}Blindenschrift zeigt die{`\n`}entsprechende Zahl,{`\n`}die Sie lernen werden.
        </Text>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Zurück"
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>Zurück</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Nächste"
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Nächste</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0040A8' },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 36 },
  title: { color: '#FFD914', fontSize: 31, fontWeight: '800', textAlign: 'center' },
  description: { flex: 1, color: '#FFFFFF', fontSize: 26, fontWeight: '800', lineHeight: 36, textAlign: 'center', textAlignVertical: 'center', paddingTop: 64, paddingHorizontal: 2 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', gap: 16, paddingBottom: 18 },
  button: { flex: 1, height: 58, alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: '#FFD914' },
  pressed: { opacity: 0.82 },
  buttonText: { color: '#0040A8', fontSize: 27, fontWeight: '700' },
});
