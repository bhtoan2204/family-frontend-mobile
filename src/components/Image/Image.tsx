import React from 'react'
import { Image, ImageSourcePropType, ImageStyle, ImagePropsBase, StyleProp } from 'react-native'
import FamilyImage from '../../assets/images/diversity.png'


interface ImageProps {
    imageUrl: string;
    defaultImage: ImageSourcePropType;
    style?: ImageStyle;
    className?: ImagePropsBase['className'];
}

const ImageComponent: React.FC<ImageProps> = ({ imageUrl, defaultImage, style, className }) => {
    const [loading, setLoading] = React.useState(true);
    const [isValid, setIsValid] = React.useState<boolean | null>(null);

    React.useEffect(() => {
        fetch(imageUrl)
            .then(res => {
                setIsValid(res.status === 200);
                setLoading(false);
            })
            .catch(() => {
                // Xử lý lỗi nếu có
                setIsValid(false);
                setLoading(false);
            });
    }, [imageUrl]);


    if (loading || isValid === false) {
        return <Image source={defaultImage} style={style}
            className={className}
        />;
    }

    return <Image source={{ uri: imageUrl }} style={style} />;
}

export default ImageComponent