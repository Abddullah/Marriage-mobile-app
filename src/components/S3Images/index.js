import React, { useState } from 'react';
import { Image, Text } from 'react-native';
import AWS from "aws-sdk";
import { env } from '../../../env'
import FastImage from 'react-native-fast-image';
import { decode as atob, encode as btoa } from 'base-64'
import { URL, URLSearchParams } from 'react-native-url-polyfill';
const s3 = new AWS.S3({
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    region:'us-east-1'
});

export default class S3Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }
    }
    componentDidMount() {
        let path = new URL(this.props.photo)
        path = path.pathname.replace('/', '')
        console.log(path)
        const params = {
            Bucket: env.AWS_PHOTOS_BUCKET,
            // Bucket: env.AWS_BUCKET_FOR_PIC ,
            Key: path,
        };
        s3.getObject(params, (err, data) => {
            if (err) {
                console.log(err), 'here is here';
            } else {
                this.setState({
                    image: this.arrayBufferToBase64(data.Body)
                }, () => console.log())
            }
        });
    }
    arrayBufferToBase64 = buffer => {
        let binary = '';
        let bytes = new Uint8Array(buffer);
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };
    render() {
        return (
            // <Text>{this.props.photo}</Text>
            <FastImage
                source={{
                    uri:
                        'data:image/jpeg;base64,' +
                        this.state.image, //data.data in your case
                }}
                style={[this.props.styles]}
            />
        )
    }
}
