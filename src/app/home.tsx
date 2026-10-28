import { router } from 'expo-router';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const lessons = [
  { label: 'Alphabete lernen', href: '/alphabete' },
  { label: 'Zahlen lernen', href: '/zahlen' },
  { label: 'Wörter lernen', href: '/woerter' },
] as const;

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.home} accessibilityRole="header">
            <Text style={styles.homeIcon} accessibilityElementsHidden>⌂</Text>
            <Text style={styles.homeLabel}>HOME</Text>
          </View>
          <Text style={styles.title} accessibilityRole="header">
            START BRAILLE{`\n`}LERNEN
          </Text>
        </View>

        <View style={styles.lessons}>
          {lessons.map(({ label, href }) => (
            <Pressable
              key={label}
              accessibilityRole="button"
              accessibilityHint={`Öffnet die Lektion ${label}`}
              onPress={() => router.navigate(href)}
              style={({ pressed }) => [styles.lessonButton, pressed && styles.pressed]}
            >
              <Text style={styles.lessonText}>{label}</Text>
            </Pressable>
          ))}
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
  lessons: { flex: 1, alignItems: 'stretch', gap: 42, paddingTop: 42 },
  lessonButton: { height: 89, alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: '#FFD914' },
  pressed: { opacity: 0.82 },
  lessonText: { color: '#003FA7', fontSize: 24, fontWeight: '800' },
});
