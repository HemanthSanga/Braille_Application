import { router } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function StartScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.home} accessibilityRole="header">
            <Text style={styles.homeIcon} accessibilityElementsHidden>⌂</Text>
            <Text style={styles.homeLabel}>HOME</Text>
          </View>
          <Text style={styles.title} accessibilityRole="header">
            START BRAILLE{`\n`}LERNEN & ÜBEN
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityHint="Öffnet die Lernoptionen"
            onPress={() => router.replace('/home')}
            style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
          >
            <Text style={styles.actionText}>Lernen</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityHint="Öffnet die Übungsoptionen"
            style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
          >
            <Text style={styles.actionText}>Üben</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityHint="Zurück"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          >
            <Text style={styles.buttonText}>Zurück</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0040A8' },
  content: { flex: 1, paddingHorizontal: 32 },
  header: { alignItems: 'center', paddingTop: 43 },
  home: { alignItems: 'center' },
  homeIcon: { color: '#FFD914', fontSize: 58, fontWeight: '900', height: 52, lineHeight: 52 },
  homeLabel: { color: '#FFD914', fontSize: 16, lineHeight: 20 },
  title: { marginTop: 34, color: '#FFD914', fontSize: 31, fontWeight: '800', lineHeight: 41, textAlign: 'center' },
  actions: { flex: 1, alignItems: 'stretch', gap: 42, paddingTop: 42 },
  actionButton: { height: 89, alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: '#FFD914' },
  button: { width: 155, height: 58, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: '#FFD914' },
  pressed: { opacity: 0.82 },
  actionText: { color: '#003FA7', fontSize: 30, fontWeight: '800' },
  buttonText: { color: '#0040A8', fontSize: 27, fontWeight: '700' },
});
