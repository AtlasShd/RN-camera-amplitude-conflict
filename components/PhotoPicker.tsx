import type { ListRenderItemInfo } from 'react-native';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { CameraView } from 'expo-camera';

type SetImageType = (image: string | null) => void;

type PropsType = {
  setIsVisible: (isVisible: boolean) => void;
  setImage: Dispatch<SetStateAction<string | null>> | SetImageType;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
  prereqCameraText?: string;
  prereqPhotosText?: string;
};

const keyExtractor = (item: { id: string }) => item.id;

export function PhotoPicker({
  setIsVisible,
  setImage,
  setIsLoading,
  prereqCameraText,
  prereqPhotosText,
}: PropsType) {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [previewAssets] = useState<
    {
      id: string;
    }[]
  >([
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
  ]);
  const { bottom } = useSafeAreaInsets();

  const savePhoto = useCallback(
    (imageString: string) => {
      setIsVisible(false);
      setIsLoading?.(true);
      setImage(imageString);
    },
    [setIsVisible, setIsLoading, setImage],
  );

  const makePhoto = useCallback(async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        aspect: [4, 3],
        exif: false,
        quality: 1,
      });

      if (!result.canceled) {
        savePhoto(result.assets[0].uri);
      }
    } catch (e) {
      console.error(e, 'make photo');
    }
  }, [savePhoto]);

  const pickPhotos = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: true,
        aspect: [4, 3],
        exif: false,
        quality: 1,
      });

      if (!result.canceled) {
        savePhoto(result.assets[0].uri);
      }
    } catch (e) {
      console.error(e, 'picker photo');
    }
  }, [savePhoto]);

  useEffect(() => {
    (async () => {
      const { granted, canAskAgain } =
        await ImagePicker.getCameraPermissionsAsync();

      if (!granted && canAskAgain) {
        const newGranted = await new Promise<boolean>((resolve) => {
          if (prereqCameraText) {
            Alert.alert('Prepare for the Camera access', prereqCameraText, [
              {
                text: 'Continue',
                async onPress() {
                  try {
                    const result =
                      await ImagePicker.requestCameraPermissionsAsync();
                    resolve(result.granted);
                  } catch {
                    resolve(false);
                  }
                },
              },
            ]);
          } else {
            (async () => {
              try {
                const result =
                  await ImagePicker.requestCameraPermissionsAsync();
                resolve(result.granted);
              } catch {
                resolve(false);
              }
            })();
          }
        });
        setHasCameraPermission(newGranted);
      } else {
        setHasCameraPermission(granted);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ListHeaderComponent = useCallback(
    () => (
      <TouchableOpacity
        onPress={makePhoto}
        style={styles.cameraBtn}
        containerStyle={styles.contCameraBtn}
      >
        {hasCameraPermission ? (
          <CameraView facing='back' style={styles.camera} />
        ) : (
          <TouchableOpacity
            style={styles.cameraPlug}
            containerStyle={styles.cameraPlugCont}
            onPress={() =>
              Alert.alert(
                'Access to camera',
                'Please provide access to the Camera in the device settings in order to take a photo',
                [
                  { text: 'Cancel', style: 'destructive' },
                  { text: 'Open Settings', onPress: Linking.openSettings },
                ],
              )
            }
          >
            <Text style={styles.cameraPlugText}>
              Permission to access the Camera has not been granted
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    ),
    [makePhoto, hasCameraPermission],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<{ id: string }>) => (
      <View style={styles.assetBtn}></View>
    ),
    [savePhoto],
  );

  return (
    <View style={[styles.container, { marginBottom: bottom }]}>
      <View style={styles.content}>
        <View style={styles.photoLine}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollLine}
            data={previewAssets}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles.flatList}
          />
        </View>
        <TouchableOpacity
          containerStyle={styles.contOpen}
          style={styles.open}
          onPress={pickPhotos}
        >
          <Text style={styles.openText}>Open Photos</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.cancel}
        containerStyle={styles.contCancel}
        onPress={() => setIsVisible(false)}
      >
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    rowGap: 8,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 14,
    height: 148,
  },
  photoLine: {
    height: 96,
    padding: 8,
  },
  scrollLine: {
    gap: 8,
  },
  flatList: {
    borderRadius: 6,
    overflow: 'hidden',
  },
  cameraBtn: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 6,
    overflow: 'hidden',
  },
  assetBtn: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: 'gray',
  },
  contCameraBtn: {
    flex: 1,
  },
  pictureCorner: {
    position: 'absolute',
    top: 7,
    right: 7,
    zIndex: 2,
  },
  camera: {
    flex: 1,
  },
  cameraPlug: {},
  cameraPlugCont: {
    flex: 1,
    backgroundColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlugText: {
    fontSize: 11,
    textAlign: 'center',
  },
  galleryPlug: {},
  galleryPlugCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    overflow: 'hidden',
  },
  galleryPlugText: {
    fontSize: 11,
    textAlign: 'center',
    padding: 3,
  },
  contOpen: {
    alignItems: 'center',
  },
  open: {
    height: 52,
    justifyContent: 'center',
  },
  openText: {
    color: '#5642D1',
    fontSize: 17,
    lineHeight: 22,
  },
  contCancel: {
    height: 56,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 14,
  },
  cancel: {
    flex: 1,
    justifyContent: 'center',
  },
  cancelText: {
    color: '#FF0000',
    fontSize: 17,
    lineHeight: 22,
  },
});
