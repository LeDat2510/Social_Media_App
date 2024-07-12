import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Dialog, Portal } from 'react-native-paper'
import { deletePostData } from '../controllers/userControllers';

const DialogPopup = ({ visible, hideDialog, item }) => {

    const [visibleDialog, setVisibleDialog] = useState(false);

    useEffect(() => {
        setVisibleDialog(visible);
    }, [visible]);

    const handleDelete = async () => {
        await deletePostData(item.idpost); 
        hideDialog();
        Alert.alert("Xóa bài viết thành công");
    }

    return (
        <Portal>
            <Dialog visible={visibleDialog} onDismiss={hideDialog} style={{ backgroundColor: '#ffffff' }}>
                <Dialog.Icon icon="alert" />
                <Dialog.Title style={{ textAlign: 'center' }}>
                    'Xóa Bài Viết ?'
                </Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">
                        'Bài viết sẽ không thể hoàn tác lại sau khi xóa. Bạn có chắc chứ ?'
                    </Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Hủy</Button>
                    <Button onPress={() => handleDelete()}>Xóa</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default DialogPopup