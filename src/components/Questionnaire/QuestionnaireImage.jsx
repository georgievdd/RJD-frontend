import { Button, Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import classes from './DropzoneButton.module.css';
import { useFileLoad } from '../../hooks';
import { useEffect, useRef } from 'react';

export function QuestionnaireImage({setImage, ...props}) {

  const openRef = useRef(null);
  const Img = useFileLoad();

  useEffect(() => {
    if (Img.imgUrl) setImage(Img.imgUrl);
  }, [Img.imgUrl]);

  return (
    <div className={classes.wrapper}>
      {Img.imgUrl && <img src={Img.imgUrl} className={classes.image}/>}
      {!Img.imgUrl &&
      <Dropzone
        openRef={openRef}
        className={classes.dropzone}
        onDrop={(files) => {Img.handleFile(files[0])}} //setImage(files[0])
        onReject={(files) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        {...props}
        >
        <Group w='100%' justify="center" gap="0" mih={220} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
              stroke={1.5}
              />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
              stroke={1.5}
              />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
              stroke={1.5}
              />
          </Dropzone.Idle>
          <div style={{width: '80%'}}>
            <Text size='xs' inline mb={40}>
            Перетащите изображения сюда или нажмите, чтобы выбрать файлы <i>.svg</i> <i>.png</i> <i>.jpg</i>
            </Text>
          </div>
        </Group>
      </Dropzone>}
      <Group justify="center" mt={-20}>
        <Button onClick={() => openRef.current?.()} radius={2}>Выбрать</Button>
      </Group>
    </div>
  );
}