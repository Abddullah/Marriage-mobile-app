import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import styles from '../../styles';
import {useConnections} from '../../hooks/providers/connections';
import Accepts from './components/Accepts';

const Connections = () => {
    const {connections} = useConnections();

    return (
        <LinearGradient
            colors={['#0A2841', '#20525D']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.container}>
            {connections &&
                connections.accepts &&
                Object.values(connections.accepts).map((item, index) => (
                    <Accepts key={index} item={item} />
                ))}
        </LinearGradient>
    );
};

export default Connections;
