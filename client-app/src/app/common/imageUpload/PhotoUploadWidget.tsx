import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Grid, Header } from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import { Cropper } from "react-cropper";

interface Props {
    loading: boolean;
    uploadPhoto: (file:Blob) => void;
}

export default function PhotoUploadWidget({loading, uploadPhoto}: Props){
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if(cropper) {
            cropper.getCroppedCanvas().toBlob(blob=> uploadPhoto(blob!));
        }
    }

    useEffect(()=> {
        return ()=> {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files])

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header sub color="teal" content='Step 1 - Add photo'/>
                <PhotoWidgetDropzone setFiles={setFiles}></PhotoWidgetDropzone>
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={4}>
                <Header sub color="teal" content='Step 2 - resize Image'/>
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper = {setCropper} imagePreview={files[0].preview}/>
                )}
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={4}>
                    <Header sub color="teal" content='Step 3 - Preview and Upload'/>
                    {files && files.length > 0 && 
                    <>
                        <div className='image-preview' style={{minHeight: 200, overflow: 'hidden'}}/>
                        <ButtonGroup widths={2}>
                            <Button loading={loading} onClick={onCrop} positive icon='check'></Button>
                            <Button disabled= {loading} onClick={() => setFiles([])} icon='close'></Button>
                        </ButtonGroup>
                    </>}
            </Grid.Column>
        </Grid>
    )
}