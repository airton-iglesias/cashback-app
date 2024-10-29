import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import FeedPost from "@/components/feedPost";
import { useEffect, useRef, useState } from "react";

type postTypes = {
    id: string;
    title: string;
    location: string;
    discount: string;
    type: string;
    source: string;
};

const screenHeight = Dimensions.get("window").height;
const generateUniqueId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const FeedScreen = () => {
    const [posts, setPosts] = useState<postTypes[]>([]);
    const [activePostId, setActivePostId] = useState<string>("");
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const initialPosts: postTypes[] = [
                {
                    id: "",
                    title:
                        "Fitness Center 1 aaaaaaaa aaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    location: "Beja, Portugal",
                    discount: "30%",
                    type: "video",
                    source: "https://i.imgur.com/6Y8qkha.mp4",
                },
                {
                    id: "",
                    title: "Shopping Center 2",
                    location: "Beja, Portugal",
                    discount: "60%",
                    type: "video",
                    source: "https://i.imgur.com/UEcSu7s.mp4",
                },
                {
                    id: "",
                    title: "Barbearia Center 3",
                    location: "Beja, Portugal",
                    discount: "10%",
                    type: "image",
                    source: "https://i.imgur.com/vuz4ufK.png",
                },
                {
                    id: "",
                    title: "Sorveteria Center 4",
                    location: "Beja, Portugal",
                    discount: "40%",
                    type: "video",
                    source: "https://i.imgur.com/A4lgwI1.mp4",
                },
                {
                    id: "",
                    title: "Shopping Center 4",
                    location: "Beja, Portugal",
                    discount: "20%",
                    type: "video",
                    source: "https://i.imgur.com/4NcYs4h.mp4",
                },
            ];

            const postsWithIds = initialPosts.map((post) => ({
                ...post,
                id: generateUniqueId(),
            }));

            setPosts(postsWithIds);
            setActivePostId(postsWithIds[0]?.id);
        };

        fetchPosts();
    }, []);

    const viewabilityConfigCallbackPairs = useRef([
        {
            viewabilityConfig: { itemVisiblePercentThreshold: 80 },
            onViewableItemsChanged: ({ changed, viewableItems }: any) => {
                if (viewableItems.length > 0 && viewableItems[0].isViewable) {
                    setActivePostId(viewableItems[0].item.id);
                }
            },
        },
    ]);

    const onEndReached = () => {
        const newPosts = posts.map((post) => ({
            ...post,
            id: generateUniqueId().toString(),
        }));

        setPosts((currentPosts) => [...currentPosts, ...newPosts]);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({ item }) => (
                    <FeedPost
                        post={item}
                        activePostID={activePostId}
                        setIsMuted={() => setIsMuted(!isMuted)}
                        isMuted={isMuted}
                    />
                )}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                pagingEnabled
                viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                showsVerticalScrollIndicator={false}
                onEndReached={onEndReached}
                onEndReachedThreshold={3}
                disableIntervalMomentum={true}
                windowSize={4}
                scrollEventThrottle={16}
                initialNumToRender={2}
                maxToRenderPerBatch={2}
                decelerationRate={"fast"}
                snapToAlignment={"start"}
                snapToInterval={screenHeight}
                removeClippedSubviews={false}
                contentContainerStyle={{ paddingBottom: 50 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
    },
});

export default FeedScreen;
