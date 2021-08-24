import React, { useContext, useState, useCallback } from 'react';
import {
    View,
    RefreshControl,
    ScrollView,
    StatusBar,
    FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../../../styles';
import { MatchContext } from '../../../hooks/providers/Match';
import { Item } from './components/item';

export const Matches = ({ navigation }) => {
    const { matches, doGetMatches } = useContext(MatchContext);
    const [loading, setloading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            console.log('matches didmount');
            getMatches();
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, []),
    );

    const getMatches = () => {
        setloading(true);
        doGetMatches()
            .then((ret) => {
                setloading(false);
            })
            .catch(() => {
                setloading(false);
            });
    };

    return (
        <SafeAreaView
            style={[styles.flex, styles.bgWhite]}
            edges={['right', 'top', 'left']}>
            <StatusBar barStyle="dark-content" />
            {
                matches.length ? (
                    <FlatList
                        data={matches}
                        keyExtractor={(m) => m._id}
                        renderItem={(m) => (
                            <Item m={m.item} navigation={navigation} />
                        )}
                    />
                ) : null
            }
            {
                matches.length === 0 && loading === true ? (
                    <View
                        style={[
                            styles.flex,
                            styles.justify_center,
                            styles.items_center,
                        ]}>
                        <Paragraph>loading...</Paragraph>
                    </View>
                ) : null
            }
            {
                matches.length === 0 && loading === false ? (
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                colors={['#9Bd35A', '#689F38']}
                                refreshing={loading}
                                onRefresh={getMatches}
                            />
                        }
                        contentContainerStyle={[
                            styles.flex,
                            styles.justify_center,
                            styles.items_center,
                        ]}>
                        <View>
                            <Paragraph style={[styles.bold, styles.center]}>
                                No Match found!
                            </Paragraph>
                            <Paragraph>Go to events and add you match.</Paragraph>
                        </View>
                    </ScrollView>
                ) : null
            }

            {/* {matches.length > 0 && loading === false ? (
                <FlatList
                    data={matches}
                    keyExtractor={(m) => m._id}
                    renderItem={(m) => (
                        <Item m={m.item} navigation={navigation} />
                    )}
                />
            ) : matches.length === 0 && loading === true ? (
                <View
                    style={[
                        styles.flex,
                        styles.justify_center,
                        styles.items_center,
                    ]}>
                    <Paragraph>loading...</Paragraph>
                </View>
            ) : (
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            colors={['#9Bd35A', '#689F38']}
                            refreshing={loading}
                            onRefresh={getMatches}
                        />
                    }
                    contentContainerStyle={[
                        styles.flex,
                        styles.justify_center,
                        styles.items_center,
                    ]}>
                    <View>
                        <Paragraph style={[styles.bold, styles.center]}>
                            No Match found!
                        </Paragraph>
                        <Paragraph>Go to events and add you match.</Paragraph>
                    </View>
                </ScrollView>
            )} */}
        </SafeAreaView>
    );
};
