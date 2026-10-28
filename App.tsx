import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type Role = 'Student / Studentin' | 'Lehrerin / Lehrer';

export default function App() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen}>
        <StatusBar style="light" />
        {selectedRole === 'Student / Studentin' ? (
          <StudentHomeScreen onBack={() => setSelectedRole(null)} />
        ) : selectedRole ? (
          <View style={styles.nextScreen}>
            <Text accessibilityRole="header" style={styles.nextTitle}>
              Willkommen
            </Text>
            <Text style={styles.nextDescription}>{selectedRole}</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Zurück zur Rollenauswahl"
              onPress={() => setSelectedRole(null)}
              style={({ pressed }) => [
                styles.roleButton,
                styles.backButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.backButtonText}>Zurück</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.content}
            accessibilityLanguage="de-DE"
          >
            <Text accessibilityRole="header" style={styles.prompt}>
              Sind Sie ein...
            </Text>
            <View style={styles.options}>
              <RoleButton
                label={'Student /\nStudentin'}
                accessibilityLabel="Student oder Studentin"
                onPress={() => setSelectedRole('Student / Studentin')}
              />
              <RoleButton
                label={'Lehrerin /\nLehrer'}
                accessibilityLabel="Lehrerin oder Lehrer"
                onPress={() => setSelectedRole('Lehrerin / Lehrer')}
              />
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

type StudentHomeScreenProps = {
  onBack: () => void;
};

type LessonKind = 'alphabet' | 'numbers' | 'words';

function StudentHomeScreen({ onBack }: StudentHomeScreenProps) {
  const [studentPage, setStudentPage] = useState<
    'start' | 'learn' | LessonKind
  >('start');

  if (studentPage === 'learn') {
    return (
      <LearningOptionsScreen
        onHome={() => setStudentPage('start')}
        onSelectLesson={setStudentPage}
      />
    );
  }

  if (studentPage !== 'start') {
    return (
      <LessonIntroScreen
        lesson={studentPage}
        onBack={() => setStudentPage('learn')}
      />
    );
  }

  return (
    <View style={styles.studentScreen} accessibilityLanguage="de-DE">
      <View style={styles.studentHeader}>
        <View style={styles.homeMark} accessibilityElementsHidden>
          <View style={styles.homeRoof} />
          <View style={styles.homeBody}>
            <View style={styles.homeDoor} />
          </View>
        </View>
        <Text style={styles.homeLabel}>HOME</Text>
        <Text accessibilityRole="header" style={styles.studentTitle}>
          START BRAILLE{'\n'}LERNEN &amp; ÜBEN
        </Text>
      </View>

      <View style={styles.studentActions}>
        <Pressable
          accessibilityRole="button"
          accessibilityHint="Öffnet die Lernoptionen"
          onPress={() => setStudentPage('learn')}
          style={({ pressed }) => [
            styles.studentActionButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.studentActionText}>Lernen</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityHint="Öffnet die Übungsoptionen"
          style={({ pressed }) => [
            styles.studentActionButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.studentActionText}>Üben</Text>
        </Pressable>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Zurück zur Rollenauswahl"
        onPress={onBack}
        style={({ pressed }) => [
          styles.studentBackButton,
          styles.startBackButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.studentBackText}>Zurück</Text>
      </Pressable>
    </View>
  );
}

type LearningOptionsScreenProps = {
  onHome: () => void;
  onSelectLesson: (lesson: LessonKind) => void;
};

function LearningOptionsScreen({
  onHome,
  onSelectLesson,
}: LearningOptionsScreenProps) {
  return (
    <View style={styles.studentScreen} accessibilityLanguage="de-DE">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Zurück zum Start"
        onPress={onHome}
        style={styles.studentHeader}
      >
        <View style={styles.homeMark} accessibilityElementsHidden>
          <View style={styles.homeRoof} />
          <View style={styles.homeBody}>
            <View style={styles.homeDoor} />
          </View>
        </View>
        <Text style={styles.homeLabel}>HOME</Text>
      </Pressable>

      <Text accessibilityRole="header" style={styles.learningTitle}>
        START BRAILLE{'\n'}LERNEN
      </Text>

      <View style={styles.learningOptions}>
        <Pressable
          accessibilityRole="button"
          accessibilityHint="Öffnet die Einführung zum Alphabetlernen"
          onPress={() => onSelectLesson('alphabet')}
          style={({ pressed }) => [
            styles.learningOption,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.learningOptionText}>Alphabete lernen</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityHint="Öffnet die Einführung zum Zahlenlernen"
          onPress={() => onSelectLesson('numbers')}
          style={({ pressed }) => [
            styles.learningOption,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.learningOptionText}>Zahlen lernen</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityHint="Öffnet die Einführung zum Wörterlernen"
          onPress={() => onSelectLesson('words')}
          style={({ pressed }) => [
            styles.learningOption,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.learningOptionText}>Wörter lernen</Text>
        </Pressable>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Zurück zum Start"
        onPress={onHome}
        style={({ pressed }) => [
          styles.studentBackButton,
          styles.learningBackButton,
          pressed && styles.pressed,
        ]}
      >
        <Text style={styles.studentBackText}>Zurück</Text>
      </Pressable>
    </View>
  );
}

type LessonIntroScreenProps = {
  lesson: LessonKind;
  onBack: () => void;
};

const lessonContent: Record<LessonKind, { title: string; description: string }> = {
  alphabet: {
    title: 'Alphabete lernen',
    description:
      'Hier werden Sie die Alphabete von A bis Z erkunden. Das Kästchen in Blindenschrift zeigt die entsprechende Zahl, die Sie lernen werden.',
  },
  numbers: {
    title: 'Zahlen lernen',
    description:
      'Hier werden Sie die Zahlen von 1 bis 9 erkunden. Das Kästchen in Blindenschrift zeigt die entsprechende Zahl, die Sie lernen werden.',
  },
  words: {
    title: 'Wörter lernen',
    description:
      'Hier werden Sie die Alphabete von A bis Z erkunden. Das Kästchen in Blindenschrift zeigt die entsprechende Zahl, die Sie lernen werden.',
  },
};

function LessonIntroScreen({ lesson, onBack }: LessonIntroScreenProps) {
  const { title, description } = lessonContent[lesson];

  return (
    <View style={styles.lessonScreen} accessibilityLanguage="de-DE">
      <View style={styles.lessonHeader}>
        <Text accessibilityRole="header" style={styles.lessonTitle}>
          {title}
        </Text>
      </View>

      <View style={styles.lessonDescriptionContainer}>
        <Text style={styles.lessonDescription}>{description}</Text>
      </View>

      <View style={styles.lessonNavigation}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Zurück zu den Lernoptionen"
          onPress={onBack}
          style={({ pressed }) => [
            styles.lessonNavigationButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.lessonNavigationText}>Zurück</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Nächste Lektion, noch nicht verfügbar"
          accessibilityState={{ disabled: true }}
          disabled
          style={styles.lessonNavigationButton}
        >
          <Text style={styles.lessonNavigationText}>Nächste</Text>
        </Pressable>
      </View>
    </View>
  );
}

type RoleButtonProps = {
  label: string;
  accessibilityLabel: string;
  onPress: () => void;
};

function RoleButton({
  label,
  accessibilityLabel,
  onPress,
}: RoleButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Wählt diese Rolle aus"
      onPress={onPress}
      style={({ pressed }) => [
        styles.roleButton,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.roleButtonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0A2B91',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 76,
  },
  prompt: {
    color: '#FFE52B',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 47,
    textAlign: 'center',
  },
  options: {
    width: '100%',
    alignItems: 'center',
    gap: 57,
  },
  roleButton: {
    width: '90%',
    minHeight: 116,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: '#FFE52B',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  roleButtonText: {
    color: '#0A2B91',
    fontSize: 38,
    fontWeight: '700',
    lineHeight: 47,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.78,
  },
  nextScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  nextTitle: {
    color: '#FFE52B',
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
  },
  nextDescription: {
    color: '#FFFFFF',
    fontSize: 26,
    marginTop: 18,
    marginBottom: 48,
    textAlign: 'center',
  },
  backButton: {
    width: '90%',
    minHeight: 72,
  },
  backButtonText: {
    color: '#0A2B91',
    fontSize: 28,
    fontWeight: '700',
  },
  studentScreen: {
    flex: 1,
    paddingHorizontal: 32,
  },
  studentHeader: {
    alignItems: 'center',
    paddingTop: 12,
  },
  homeMark: {
    width: 30,
    height: 31,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 2,
  },
  homeRoof: {
    position: 'absolute',
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFE52B',
  },
  homeBody: {
    width: 24,
    height: 19,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#FFE52B',
  },
  homeDoor: {
    width: 6,
    height: 10,
    backgroundColor: '#0A2B91',
  },
  homeLabel: {
    color: '#FFE52B',
    fontSize: 15,
    lineHeight: 20,
  },
  studentTitle: {
    marginTop: 27,
    color: '#FFE52B',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 34,
    textAlign: 'center',
  },
  studentActions: {
    flex: 1,
    alignItems: 'center',
    gap: 40,
    paddingTop: 60,
  },
  studentActionButton: {
    width: '100%',
    minHeight: 82,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#FFE52B',
  },
  studentActionText: {
    color: '#0A2B91',
    fontSize: 34,
    fontWeight: '700',
  },
  studentBackButton: {
    minWidth: 112,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -1,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: '#898B36',
  },
  startBackButton: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  studentBackText: {
    color: '#0A2B91',
    fontSize: 27,
    fontWeight: '500',
  },
  learningTitle: {
    marginTop: 27,
    color: '#FFE52B',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 34,
    textAlign: 'center',
  },
  learningOptions: {
    flex: 1,
    gap: 36,
    paddingTop: 31,
  },
  learningOption: {
    minHeight: 78,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#FFE52B',
    paddingHorizontal: 8,
  },
  learningOptionText: {
    color: '#0A2B91',
    fontSize: 23,
    fontWeight: '700',
    textAlign: 'center',
  },
  learningBackButton: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  lessonScreen: {
    flex: 1,
    paddingHorizontal: 9,
  },
  lessonHeader: {
    alignItems: 'center',
    marginTop: 50,
    borderTopWidth: 1,
    borderTopColor: '#FFE52B',
    paddingTop: 7,
  },
  lessonTitle: {
    color: '#FFE52B',
    fontSize: 29,
    fontWeight: '700',
    textAlign: 'center',
  },
  lessonDescriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  lessonDescription: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
  },
  lessonNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    marginBottom: 32,
  },
  lessonNavigationButton: {
    flex: 1,
    minHeight: 51,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#FFE52B',
    paddingHorizontal: 8,
  },
  lessonNavigationText: {
    color: '#0A2B91',
    fontSize: 29,
    fontWeight: '400',
  },
});
