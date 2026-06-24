import React, {useCallback, useRef} from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text as RNText,
  View,
} from 'react-native';
import {
  Card,
  Button,
  Divider,
  Text,
  Title,
  Paragraph,
} from 'react-native-paper';
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet';
import recentNews from '../data/recentNews.json';
import recentArticles from '../data/recentArticles.json';
import trending from '../data/trending.json';
import Counter from '../components/Counter';

const renderArticle = ({item}: any) => (
  <Card mode="contained" style={styles.cardWidth}>
    <Card.Cover source={{uri: item.image}} />
    <Card.Content>
      <Title>{item.title}</Title>
      <Paragraph numberOfLines={3}>{item.content}</Paragraph>
    </Card.Content>
  </Card>
);

const renderDivider = () => <Divider style={styles.divider} />;

const showNotImplementedAlert = () => Alert.alert('Not implemented yet');

const HomeScreen = () => {
  const trendingSheetRef = useRef<BottomSheetModal>(null);

  const openTrendingSheet = useCallback(() => {
    trendingSheetRef.current?.present();
  }, []);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}>
      <Counter />
      <View style={styles.header}>
        {/* NativeWind smoke test — news (green) */}
        <View className="self-center rounded-xl bg-brand-300 px-4 py-3">
          <RNText className="font-bold text-white">NativeWind ✓ news (green)</RNText>
        </View>
        {/* <Text variant="titleLarge" style={styles.headerTitle}>
          Trending
        </Text> */}
        <Button mode="contained-tonal" onPress={openTrendingSheet}>
          See All
        </Button>
      </View>
      <BottomSheetModal ref={trendingSheetRef} snapPoints={['50%', '90%']}>
        <BottomSheetView style={styles.sheetContent}>
          <Text variant="titleLarge" style={styles.sheetTitle}>
            All Trending
          </Text>
          {trending.data.map((item: any) => (
            <Text key={item.id ?? item.title} style={styles.sheetItem}>
              {item.title}
            </Text>
          ))}
        </BottomSheetView>
      </BottomSheetModal>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={trending.data}
        renderItem={renderArticle}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Recent News
        </Text>
        <Button mode="contained-tonal" onPress={showNotImplementedAlert}>
          See All
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recentNews.data}
        renderItem={renderArticle}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Recent Articles
        </Text>
        <Button mode="contained-tonal" onPress={showNotImplementedAlert}>
          See All
        </Button>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={recentArticles.data}
        renderItem={renderArticle}
        ItemSeparatorComponent={renderDivider}
        contentContainerStyle={styles.contentContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  divider: {
    backgroundColor: 'transparent',
    width: 16,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
  },
  cardWidth: {
    width: 270,
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 12,
  },
  sheetTitle: {
    marginBottom: 8,
  },
  sheetItem: {
    fontSize: 16,
  },
});

export default HomeScreen;
