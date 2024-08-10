import { FlatList } from "react-native"
import { Guildline } from "src/interface/guideline/guideline"
import GuildlineItem from "src/screens/GuildLineScreen/GuildlineItem/GuildlineItem"

const MapGuidelines = ({ data, onPress, onUpdate }: { data: Guildline[], onPress: (item: Guildline) => void, onUpdate: (item: Guildline) => void }) => {
    return <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
            <GuildlineItem item={item} index={index} onPress={() => onPress(item)} onUpdate={() => onUpdate(item)} />
        )}
        scrollEnabled={false}
        maxToRenderPerBatch={3}
        initialNumToRender={4}
        

    />
}

export default MapGuidelines